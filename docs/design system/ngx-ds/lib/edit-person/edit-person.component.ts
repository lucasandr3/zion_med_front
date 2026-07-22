import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2, Input, SimpleChanges, HostBinding, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'edit-person',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="editor-container">
      <h3 *ngIf="isTitle">Editor (simples) — cole do Excel e mantenha tabelas</h3>
      
      <div
  *ngIf="isMenu"
  [ngClass]="{
    'bg-[#2b2b2b] border-[#3d3d3d] text-gray-200': this.themeClass === 'dark',
    'bg-white border-gray-300 text-gray-800': this.themeClass === 'light'
  }"
  class="toolbar flex items-center gap-1 px-2 py-1 border rounded-md text-sm select-none transition-colors duration-300"
>
  <!-- Grupo 1 -->
  <button data-cmd="bold" class="toolbar-btn font-bold pl-1 pr-1">B</button>
  <button data-cmd="italic" class="toolbar-btn italic pl-1 pr-1">I</button>
  <button data-cmd="underline" class="toolbar-btn underline pl-1 pr-1">U</button>
  <button data-cmd="strikeThrough" class="toolbar-btn line-through pl-1 pr-1">S</button>

  <!-- <div class="toolbar-divider"></div> -->

  <!-- <button data-cmd="code" class="toolbar-btn">&lt;/&gt;</button>
  <button data-cmd="quote" class="toolbar-btn">"</button> -->

  <!-- <div class="toolbar-divider"></div> -->

  <!-- <button data-cmd="insertUnorderedList" class="toolbar-btn">•</button>
  <button data-cmd="insertOrderedList" class="toolbar-btn">1.</button> -->

  <!-- <select
    id="heading"
    [ngClass]="{
      'bg-[#2b2b2b] border-[#3d3d3d] text-gray-200': this.themeClass === 'dark',
      'bg-white border-gray-300 text-gray-800': this.themeClass === 'light'
    }"
    class="rounded px-2 py-1 text-xs focus:outline-none border transition-colors"
  >
    <option value="">Normal</option>
    <option value="h1">Título 1</option>
    <option value="h2">Título 2</option>
    <option value="h3">Título 3</option>
  </select> -->

  <!-- <div class="toolbar-divider"></div> -->

  <!-- <button id="btn-link" class="toolbar-btn">🔗</button> -->
  <!-- <button id="btn-image" class="toolbar-btn">🖼️</button> -->

  <!-- <div class="toolbar-divider"></div> -->

  <!-- <button id="btn-color" class="toolbar-btn">A</button> -->
  <!-- <button id="btn-bg" class="toolbar-btn">🩸</button> -->

  <div class="toolbar-divider"></div>

  <button data-cmd="justifyLeft" class="toolbar-btn pl-1 pr-1">☰</button>
  <button data-cmd="justifyCenter" class="toolbar-btn pl-1 pr-1">≡</button>
  <button data-cmd="justifyRight" class="toolbar-btn pl-1 pr-1">☷</button>
  <button data-cmd="justifyFull" class="toolbar-btn pl-1 pr-1">⇔</button>

  <div class="toolbar-divider"></div>

  <button id="btn-insert-table" class="toolbar-btn pl-1 pr-1">▦</button>
  <!-- <button id="btn-clear-format" class="toolbar-btn">✕</button> -->
</div>


      <div 
        #editor 
        id="editor" 
        class="editor" 
        [attr.contenteditable]="!isreadOnly">
      </div>

      <p class="hint" *ngIf="isBaseboard">
        Dica: selecione uma célula/linha da planilha, copie e cole. 
        Suporta colagem com HTML (Excel fornece HTML) ou colagem de texto com tabulações/CSV.
      </p>
    </div>
  `,
    styles: [`
    :host {
      display: block;
      transition: background 0.3s, color 0.3s;
    }

    /* ======== TEMA CLARO ======== */
    :host.light {
      background: #f9f9f9;
      color: #222;
    }

    :host.light .editor {
      background: #fff;
      border: 1px solid #ccc;
      color: #222;
    }

    :host.light .toolbar button {
      background: #f5f5f5;
      border: 1px solid #ccc;
      color: #222;
    }

    /* ======== TEMA ESCURO ======== */
    :host.dark {
      background: #1e1e1e;
      color: #f1f1f1;
    }

    :host.dark .editor {
      background: #2b2b2b;
      border: 1px solid #444;
      color: #f1f1f1;
    }

    :host.dark .toolbar button {
      background: #3a3a3a;
      border: 1px solid #555;
      color: #f1f1f1;
    }

    /* ======== ESTILO BASE ======== */
    .editor-container {
      margin: 20px auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    h3 {
      margin-bottom: 20px;
    }

    .toolbar {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
      flex-wrap: wrap;
    }

    .toolbar button:hover {
      background: #8881;
    }

    .editor {
      min-height: auto;
      padding: 15px;
      border-radius: 4px;
      outline: none;
      transition: background 0.3s, color 0.3s, border-color 0.3s;
    }

    .editor:focus {
      border-color: #4CAF50;
      box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
    }

    .hint {
      margin-top: 10px;
      font-size: 14px;
    }

    :host ::ng-deep .editor table {
      border-collapse: collapse;
      width: auto;
      margin: 10px 0;
    }

    :host ::ng-deep .editor table td,
    :host ::ng-deep .editor table th {
      border: 1px solid #777;
      padding: 8px;
      min-width: 50px;
    }

    :host ::ng-deep .editor table th {
      background-color: rgba(255,255,255,0.1);
      font-weight: bold;
    }
  `]
})
export class EditPersonComponent implements OnInit, AfterViewInit {

    @ViewChild('editor') editorRef!: ElementRef<HTMLDivElement>;

    @Input() content: string = '';
    @Input() isTitle: boolean = false;
    @Input() isMenu: boolean = false;
    @Input() isBaseboard: boolean = false;
    @Input() isreadOnly: boolean = false;

    @Output() valueText = new EventEmitter<any>();
    

    private editor!: HTMLDivElement;
    private isInternalChange = true;

    @HostBinding('class') themeClass = 'light';

    constructor(private renderer: Renderer2) { }

    ngOnInit(): void {
        this.applyTheme();

        // 🔁 (Opcional) Atualiza tema se mudar no localStorage
        window.addEventListener('storage', (event) => {
            if (event.key === 'color-scheme') {
                this.applyTheme();
            }
        });
    }

    private applyTheme(): void {
        const theme = localStorage.getItem('color-scheme');
        this.themeClass = theme === 'dark' ? 'dark' : 'light';
    }

    ngAfterViewInit(): void {
        this.editor = this.editorRef.nativeElement;

        if (this.content) {
            this.editor.innerHTML = this.content;
        }

        this.setupEditor();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['content'] && !changes['content'].firstChange && this.editor && !this.isInternalChange) {
            this.editor.innerHTML = changes['content'].currentValue || '';
        }
    }

    private setupEditor(): void {
        document.querySelectorAll('[data-cmd]').forEach((btn: Element) => {
            this.renderer.listen(btn, 'click', () => {
                const cmd = btn.getAttribute('data-cmd');
                if (cmd) {
                    document.execCommand(cmd, false);
                    this.editor.focus();
                }
            });
        });

        const btnInsertTable = document.getElementById('btn-insert-table');
        if (btnInsertTable) {
            this.renderer.listen(btnInsertTable, 'click', () => {
                const html = this.makeTableHTML([['', '', ''], ['', '', ''], ['', '', '']]);
                this.insertHTMLAtCursor(html);
                this.editor.focus();
            });
        }

        const btnClearFormat = document.getElementById('btn-clear-format');
        if (btnClearFormat) {
            this.renderer.listen(btnClearFormat, 'click', () => {
                document.execCommand('removeFormat', false);
                this.editor.focus();
            });
        }

        const btnExport = document.getElementById('btn-export');
        if (btnExport) {
            this.renderer.listen(btnExport, 'click', () => {
                const html = this.editor.innerHTML;
                const win = window.open('', '_blank');
                if (win) {
                    win.document.write(`<!doctype html><meta charset="utf-8"><title>Export</title><body>${html}</body>`);
                    win.document.close();
                }
            });
        }

        this.renderer.listen(this.editor, 'paste', (ev: ClipboardEvent) => {
            ev.preventDefault();
            const clipboard = ev.clipboardData;
            if (!clipboard) return;

            const html = clipboard.getData('text/html');
            const plain = clipboard.getData('text/plain');

            if (html && this.looksLikeTableHTML(html)) {
                const clean = this.sanitizePastedHTML(html);
                this.insertHTMLAtCursor(clean);
                return;
            }

            if (plain) {
                const asTable = this.plainTextToTableHTML(plain);
                if (asTable) {
                    this.insertHTMLAtCursor(asTable);
                    return;
                }
            }

            this.insertHTMLAtCursor(this.escapeHtml(plain));
        });

        this.renderer.listen(this.editor, 'keydown', (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
                e.preventDefault();
                document.execCommand('bold');
            }
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
                e.preventDefault();
                document.execCommand('italic');
            }
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
                e.preventDefault();
                document.execCommand('underline');
            }
        });

        this.renderer.listen(this.editor, 'keyup', (value: any) => {
            // console.log(value.target.innerHTML);
            this.valueText.emit(value.target.innerHTML);
            // this.emitEditorValue(value.target.innerHTML);
        });
    }


    private insertHTMLAtCursor(html: string): void {
        const success = document.execCommand('insertHTML', false, html);
        if (!success) {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                range.deleteContents();

                const temp = document.createElement('div');
                temp.innerHTML = html;
                const frag = document.createDocumentFragment();
                let node;
                while ((node = temp.firstChild)) {
                    frag.appendChild(node);
                }
                range.insertNode(frag);

                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            } else {
                this.editor.insertAdjacentHTML('beforeend', html);
            }
        }
    }

    private makeTableHTML(rows: string[][]): string {
        let s = '<table>';
        rows.forEach((r: string[]) => {
            s += '<tr>';
            r.forEach((c: string) => s += `<td contenteditable="true">${this.escapeHtml(c)}</td>`);
            s += '</tr>';
        });
        s += '</table>';
        return s;
    }

    private escapeHtml(s: string | null | undefined): string {
        if (s == null) return '';
        const div = document.createElement('div');
        div.textContent = s;
        return div.innerHTML;
    }

    private looksLikeTableHTML(str: string): boolean {
        return /<table|<tbody|<tr|<td|class="?Mso|xl:/i.test(str);
    }

    private plainTextToTableHTML(text: string): string | null {
        const rows = text.split(/\r\n|\n|\r/).filter((r: string) => r.trim() !== '');
        if (rows.length === 0) return null;

        const delimiter = rows.some((r: string) => r.indexOf('\t') > -1)
            ? '\t'
            : (rows[0].indexOf(',') > -1 ? ',' : null);

        if (!delimiter) return null;

        const data = rows.map((r: string) =>
            r.split(delimiter).map((c: string) => c.replace(/^"|"$/g, '').trim())
        );

        return this.makeTableHTML(data);
    }

    private sanitizePastedHTML(htmlString: string): string {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const ALLOWED = new Set(['TABLE', 'TBODY', 'THEAD', 'TR', 'TD', 'TH', 'COL', 'COLGROUP', 'SPAN', 'DIV', 'P', 'BR', 'B', 'STRONG', 'I', 'EM', 'U', 'A']);
        const ALLOWED_ATTRS = new Set(['colspan', 'rowspan', 'align']);

        const cleanNode = (node: Node): Node | DocumentFragment | null => {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.cloneNode(true);
            }
            if (node.nodeType !== Node.ELEMENT_NODE) {
                return null;
            }

            const element = node as Element;
            const name = element.nodeName.toUpperCase();

            if (!ALLOWED.has(name)) {
                const frag = document.createDocumentFragment();
                Array.from(element.childNodes).forEach((ch: ChildNode) => {
                    const c = cleanNode(ch);
                    if (c) frag.appendChild(c);
                });
                return frag;
            }

            const el = document.createElement(name.toLowerCase());
            if (name === 'TD' || name === 'TH') el.setAttribute('contenteditable', 'true');

            Array.from(element.attributes || []).forEach((attr: Attr) => {
                const n = attr.name.toLowerCase();
                if (ALLOWED_ATTRS.has(n)) el.setAttribute(n, attr.value);
            });

            Array.from(element.childNodes).forEach((ch: ChildNode) => {
                const c = cleanNode(ch);
                if (c) el.appendChild(c);
            });

            return el;
        };

        const firstTable = doc.querySelector('table');
        if (firstTable) {
            const cleaned = cleanNode(firstTable);
            const container = document.createElement('div');
            if (cleaned) container.appendChild(cleaned);
            return container.innerHTML;
        }

        const cleanedBody = cleanNode(doc.body);
        if (cleanedBody) {
            const tmp = document.createElement('div');
            tmp.appendChild(cleanedBody);
            return tmp.innerHTML;
        }

        return '';
    }

    // private emitEditorValue(value: any): void {
    //     // this.isInternalChange = true;
    //     // const value = this.editor.innerHTML.trim();
    //     console.log(value);
    //     this.valueText.emit(value);
    // }
}
