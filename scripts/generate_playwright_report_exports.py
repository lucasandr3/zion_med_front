import json
import os
import zipfile
from datetime import datetime
from xml.sax.saxutils import escape


ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RESULTS_JSON = os.path.join(ROOT, "playwright-report", "results.json")
OUTPUT_XLSX = os.path.join(ROOT, "playwright-report", "playwright-results.xlsx")
OUTPUT_PDF = os.path.join(ROOT, "playwright-report", "playwright-results.pdf")


def flatten_specs(suites, parent_titles=None):
    parent_titles = parent_titles or []
    rows = []

    for suite in suites:
      suite_title = suite.get("title", "")
      next_titles = parent_titles + ([suite_title] if suite_title and not suite_title.endswith(".spec.ts") else [])

      for spec in suite.get("specs", []):
          title_parts = [part for part in next_titles if part] + [spec.get("title", "")]
          test_name = " > ".join(title_parts)

          tests = spec.get("tests", [])
          if not tests:
              rows.append(
                  {
                      "nome_teste": test_name,
                      "status": "unknown",
                      "mensagem_erro": "",
                      "screenshot": "",
                  }
              )
              continue

          for test in tests:
              final_result = test.get("results", [])[-1] if test.get("results") else {}
              status = final_result.get("status") or test.get("status") or "unknown"
              errors = final_result.get("errors", [])
              error_message = "\n\n".join(
                  err.get("message", "") or err.get("value", "") for err in errors if err
              ).strip()

              screenshot_path = ""
              for attachment in final_result.get("attachments", []):
                  name = (attachment.get("name") or "").lower()
                  content_type = (attachment.get("contentType") or "").lower()
                  path = attachment.get("path") or ""
                  if "screenshot" in name or content_type.startswith("image/"):
                      screenshot_path = path
                      break

              rows.append(
                  {
                      "nome_teste": test_name,
                      "status": status,
                      "mensagem_erro": error_message,
                      "screenshot": screenshot_path,
                  }
              )

      rows.extend(flatten_specs(suite.get("suites", []), next_titles))

    return rows


def col_letter(index):
    result = ""
    while index > 0:
        index, rem = divmod(index - 1, 26)
        result = chr(65 + rem) + result
    return result


def build_xlsx(rows, output_path):
    headers = ["Nome do teste", "Status", "Mensagem de erro", "Screenshot"]
    all_rows = [headers] + [
        [row["nome_teste"], row["status"], row["mensagem_erro"], row["screenshot"]]
        for row in rows
    ]

    shared_strings = []
    string_index = {}

    def shared_id(value):
        value = "" if value is None else str(value)
        if value not in string_index:
            string_index[value] = len(shared_strings)
            shared_strings.append(value)
        return string_index[value]

    sheet_rows = []
    for row_idx, row in enumerate(all_rows, start=1):
        cells = []
        for col_idx, value in enumerate(row, start=1):
            ref = f"{col_letter(col_idx)}{row_idx}"
            style = ' s="1"' if row_idx == 1 else ""
            cells.append(f'<c r="{ref}" t="s"{style}><v>{shared_id(value)}</v></c>')
        sheet_rows.append(f'<row r="{row_idx}">{"".join(cells)}</row>')

    cols = [
        '<col min="1" max="1" width="55" customWidth="1"/>',
        '<col min="2" max="2" width="15" customWidth="1"/>',
        '<col min="3" max="3" width="80" customWidth="1"/>',
        '<col min="4" max="4" width="65" customWidth="1"/>',
    ]

    worksheet = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        f'<cols>{"".join(cols)}</cols>'
        '<sheetData>'
        f'{"".join(sheet_rows)}'
        '</sheetData>'
        '</worksheet>'
    )

    shared = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        f'<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="{len(shared_strings)}" uniqueCount="{len(shared_strings)}">'
        + "".join(f"<si><t>{escape(text)}</t></si>" for text in shared_strings)
        + "</sst>"
    )

    styles = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font><sz val="11"/><name val="Calibri"/></font>
    <font><b/><sz val="11"/><name val="Calibri"/></font>
  </fonts>
  <fills count="2">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
  </fills>
  <borders count="1">
    <border><left/><right/><top/><bottom/><diagonal/></border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="2">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>
  </cellXfs>
  <cellStyles count="1">
    <cellStyle name="Normal" xfId="0" builtinId="0"/>
  </cellStyles>
</styleSheet>
"""

    workbook = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Resultados" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>
"""

    workbook_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>
</Relationships>
"""

    root_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>
"""

    content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>
</Types>
"""

    with zipfile.ZipFile(output_path, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", content_types)
        zf.writestr("_rels/.rels", root_rels)
        zf.writestr("xl/workbook.xml", workbook)
        zf.writestr("xl/_rels/workbook.xml.rels", workbook_rels)
        zf.writestr("xl/styles.xml", styles)
        zf.writestr("xl/sharedStrings.xml", shared)
        zf.writestr("xl/worksheets/sheet1.xml", worksheet)


def pdf_escape(text):
    return (
        text.replace("\\", "\\\\")
        .replace("(", "\\(")
        .replace(")", "\\)")
        .replace("\r", " ")
        .replace("\n", " ")
    )


def build_pdf(rows, output_path):
    lines = [
        "Relatorio Playwright",
        f"Gerado em: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        "",
    ]

    for index, row in enumerate(rows, start=1):
        lines.append(f"{index}. Nome do teste: {row['nome_teste']}")
        lines.append(f"   Status: {row['status']}")
        lines.append(f"   Mensagem de erro: {row['mensagem_erro'] or 'Sem erro'}")
        lines.append(f"   Screenshot: {row['screenshot'] or 'Sem screenshot'}")
        lines.append("")

    page_width = 595
    page_height = 842
    margin = 40
    line_height = 16
    max_lines = int((page_height - margin * 2) / line_height)

    pages = []
    current = []
    for line in lines:
        current.append(line)
        if len(current) >= max_lines:
            pages.append(current)
            current = []
    if current:
        pages.append(current)

    objects = []

    def add_object(content):
        objects.append(content)
        return len(objects)

    font_id = add_object("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    page_ids = []

    for page_lines in pages:
        content_lines = ["BT", "/F1 10 Tf", f"{margin} {page_height - margin} Td"]
        first = True
        for line in page_lines:
            if not first:
                content_lines.append(f"0 -{line_height} Td")
            content_lines.append(f"({pdf_escape(line)}) Tj")
            first = False
        content_lines.append("ET")
        stream = "\n".join(content_lines)
        content_id = add_object(f"<< /Length {len(stream.encode('latin-1', errors='replace'))} >>\nstream\n{stream}\nendstream")
        page_id = add_object(
            f"<< /Type /Page /Parent 0 0 R /MediaBox [0 0 {page_width} {page_height}] "
            f"/Resources << /Font << /F1 {font_id} 0 R >> >> /Contents {content_id} 0 R >>"
        )
        page_ids.append(page_id)

    kids = " ".join(f"{pid} 0 R" for pid in page_ids)
    pages_id = add_object(f"<< /Type /Pages /Kids [{kids}] /Count {len(page_ids)} >>")
    catalog_id = add_object(f"<< /Type /Catalog /Pages {pages_id} 0 R >>")

    for page_id in page_ids:
        objects[page_id - 1] = objects[page_id - 1].replace("/Parent 0 0 R", f"/Parent {pages_id} 0 R")

    pdf = ["%PDF-1.4"]
    offsets = [0]
    current_offset = len(pdf[0].encode("latin-1")) + 1

    for index, obj in enumerate(objects, start=1):
        serialized = f"{index} 0 obj\n{obj}\nendobj\n"
        pdf.append(serialized)
        offsets.append(current_offset)
        current_offset += len(serialized.encode("latin-1", errors="replace"))

    xref_offset = current_offset
    pdf.append(f"xref\n0 {len(objects) + 1}\n")
    pdf.append("0000000000 65535 f \n")
    for offset in offsets[1:]:
        pdf.append(f"{offset:010d} 00000 n \n")
    pdf.append(f"trailer\n<< /Size {len(objects) + 1} /Root {catalog_id} 0 R >>\nstartxref\n{xref_offset}\n%%EOF")

    with open(output_path, "wb") as fh:
        fh.write("".join(pdf).encode("latin-1", errors="replace"))


def main():
    with open(RESULTS_JSON, "r", encoding="utf-8") as fh:
        report = json.load(fh)

    rows = flatten_specs(report.get("suites", []))
    os.makedirs(os.path.dirname(OUTPUT_XLSX), exist_ok=True)
    build_xlsx(rows, OUTPUT_XLSX)
    build_pdf(rows, OUTPUT_PDF)

    print(f"Excel gerado em: {OUTPUT_XLSX}")
    print(f"PDF gerado em: {OUTPUT_PDF}")
    print(f"Total de linhas: {len(rows)}")


if __name__ == "__main__":
    main()
