import {
  LinkBioService
} from "./chunk-YFYVZLKB.js";
import {
  PublicPageBodyService
} from "./chunk-IQRZ5S5Y.js";
import {
  absoluteMediaUrl
} from "./chunk-RHN4EKXH.js";
import {
  LoadingService,
  ZmSkeletonListComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-7WBHVE2H.js";
import {
  FlatpickrDirective,
  provideFlatpickrDefaults,
  require_pt
} from "./chunk-C34MPJIL.js";
import {
  ToastService
} from "./chunk-EZUVP6MG.js";
import {
  CheckboxControlValueAccessor,
  CheckboxRequiredValidator,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RadioControlValueAccessor,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-USROZ7PW.js";
import {
  environment
} from "./chunk-IBJWGIJV.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  HttpClient,
  Injectable,
  ViewChild,
  __spreadProps,
  __spreadValues,
  __toESM,
  catchError,
  inject,
  map,
  of,
  setClassMetadata,
  signal,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵcomponentInstance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-GRLISYEV.js";

// src/app/paginas/formulario-publico/formulario-publico-show.component.ts
var import_pt = __toESM(require_pt());

// src/app/core/services/formulario-publico.service.ts
var BASE = `${environment.apiUrl}/api/v1`;
function extractLogoHref(v) {
  if (v == null)
    return null;
  if (typeof v === "string") {
    const s = v.trim();
    return s || null;
  }
  if (Array.isArray(v)) {
    for (const item of v) {
      const x = extractLogoHref(item);
      if (x)
        return x;
    }
    return null;
  }
  if (typeof v === "object") {
    const o = v;
    for (const k of ["original_url", "url", "href", "full_url", "fullUrl", "path", "logo_url", "logoUrl"]) {
      const x = o[k];
      if (typeof x === "string" && x.trim())
        return x.trim();
    }
  }
  return null;
}
function nestRecord(v) {
  return v && typeof v === "object" && !Array.isArray(v) ? v : null;
}
function pushClinicLogoCandidates(candidates, obj) {
  if (!obj)
    return;
  candidates.push(obj["logo_url"], obj["logo"], obj["logo_path"], obj["clinic_logo"], obj["clinic_logo_url"], obj["clinic_logo_path"], obj["logoUrl"], obj["clinicLogoUrl"], obj["brand_logo"], obj["brand_logo_url"]);
  const media = obj["media"];
  if (Array.isArray(media))
    candidates.push(...media);
}
function pickPublicFormLogoUrl(d) {
  const candidates = [
    d["logo_url"],
    d["clinic_logo_url"],
    d["clinic_logo"],
    d["clinic_logo_path"],
    d["logo"],
    d["logoUrl"],
    d["clinicLogoUrl"]
  ];
  pushClinicLogoCandidates(candidates, nestRecord(d["clinic"]));
  pushClinicLogoCandidates(candidates, nestRecord(d["clinica"]));
  pushClinicLogoCandidates(candidates, nestRecord(d["company"]));
  pushClinicLogoCandidates(candidates, nestRecord(d["empresa"]));
  const template = nestRecord(d["template"]);
  if (template) {
    candidates.push(template["clinic_logo_url"], template["logo_url"], template["logo"]);
    pushClinicLogoCandidates(candidates, nestRecord(template["clinic"]));
    pushClinicLogoCandidates(candidates, nestRecord(template["clinica"]));
  }
  const attrs = nestRecord(d["attributes"]);
  if (attrs) {
    pushClinicLogoCandidates(candidates, attrs);
  }
  for (const v of candidates) {
    const href = extractLogoHref(v);
    if (href) {
      return absoluteMediaUrl(href) ?? href;
    }
  }
  return null;
}
function extractPublicLinkBioSlug(d) {
  const tryStr = (v) => typeof v === "string" && v.trim() ? v.trim() : null;
  const fromClinicLike = (r) => {
    if (!r)
      return null;
    return tryStr(r["link_bio_slug"]) ?? tryStr(r["clinic_slug"]) ?? tryStr(r["public_slug"]) ?? tryStr(r["public_link_slug"]) ?? tryStr(r["bio_slug"]) ?? tryStr(r["slug"]);
  };
  const nested = [
    nestRecord(d["clinic"]),
    nestRecord(d["clinica"]),
    nestRecord(d["organization"]),
    nestRecord(d["empresa"]),
    nestRecord(d["attributes"]),
    nestRecord(nestRecord(d["template"])?.["clinic"]),
    nestRecord(nestRecord(d["template"])?.["clinica"])
  ];
  for (const r of nested) {
    const s = fromClinicLike(r);
    if (s)
      return s;
  }
  return tryStr(d["link_bio_slug"]) ?? tryStr(d["clinic_slug"]) ?? tryStr(d["public_slug"]) ?? tryStr(d["public_link_slug"]) ?? tryStr(d["bio_slug"]) ?? tryStr(d["slug"]);
}
var FormularioPublicoService = class _FormularioPublicoService {
  http = inject(HttpClient);
  linkBio = inject(LinkBioService);
  getByToken(token) {
    return this.http.get(`${BASE}/formulario-publico/${encodeURIComponent(token)}`).pipe(switchMap((r) => {
      const raw = r.data;
      const rec = raw;
      const picked = pickPublicFormLogoUrl(rec);
      const slug = extractPublicLinkBioSlug(rec);
      if (picked) {
        return of(__spreadProps(__spreadValues({}, raw), { logo_url: picked }));
      }
      if (!slug) {
        return of(__spreadProps(__spreadValues({}, raw), { logo_url: null }));
      }
      return this.linkBio.getPublicBySlug(slug).pipe(map((pub) => {
        const lu = pub.clinic?.logo_url;
        const resolved = lu != null && String(lu).trim() !== "" ? absoluteMediaUrl(String(lu).trim()) ?? String(lu).trim() : null;
        return __spreadProps(__spreadValues({}, raw), { logo_url: resolved });
      }), catchError(() => of(__spreadProps(__spreadValues({}, raw), { logo_url: null }))));
    }));
  }
  submit(token, payload) {
    return this.http.post(`${BASE}/formulario-publico/${encodeURIComponent(token)}/submit`, payload).pipe(map((r) => r.data));
  }
  validatePerson(token, body) {
    return this.http.post(`${BASE}/formulario-publico/${encodeURIComponent(token)}/validate-person`, body).pipe(map((r) => r.data));
  }
  static \u0275fac = function FormularioPublicoService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormularioPublicoService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FormularioPublicoService, factory: _FormularioPublicoService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormularioPublicoService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/paginas/formulario-publico/formulario-publico-show.component.ts
var _c0 = ["publicForm"];
var _c1 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.value;
function FormularioPublicoShowComponent_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "img", 18);
    \u0275\u0275listener("error", function FormularioPublicoShowComponent_Conditional_1_Conditional_4_Template_img_error_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onClinicLogoError());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r2.clinicLogoDisplayUrl(), \u0275\u0275sanitizeUrl)("alt", "");
  }
}
function FormularioPublicoShowComponent_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.clinicNameInitial());
  }
}
function FormularioPublicoShowComponent_Conditional_1_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 15);
    \u0275\u0275element(1, "circle", 19)(2, "line", 20)(3, "line", 21)(4, "line", 22)(5, "line", 23)(6, "line", 24)(7, "line", 25)(8, "line", 26)(9, "line", 27);
    \u0275\u0275elementEnd();
  }
}
function FormularioPublicoShowComponent_Conditional_1_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 16);
    \u0275\u0275element(1, "path", 28);
    \u0275\u0275elementEnd();
  }
}
function FormularioPublicoShowComponent_Conditional_1_Conditional_14_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate2(" ", ctx_r2.requiredFieldsFilled, " de ", ctx_r2.requiredFieldsTotal, " obrigat\xF3rios ");
  }
}
function FormularioPublicoShowComponent_Conditional_1_Conditional_14_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Nenhum campo obrigat\xF3rio ");
  }
}
function FormularioPublicoShowComponent_Conditional_1_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 29)(2, "span", 30);
    \u0275\u0275text(3, "Progresso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 31);
    \u0275\u0275conditionalCreate(5, FormularioPublicoShowComponent_Conditional_1_Conditional_14_Conditional_5_Template, 1, 2)(6, FormularioPublicoShowComponent_Conditional_1_Conditional_14_Conditional_6_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 32);
    \u0275\u0275element(8, "div", 33);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r2.requiredFieldsTotal > 0 ? 5 : 6);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", ctx_r2.progressPercent, "%");
  }
}
function FormularioPublicoShowComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 2)(1, "div", 7)(2, "div", 8)(3, "div", 9);
    \u0275\u0275conditionalCreate(4, FormularioPublicoShowComponent_Conditional_1_Conditional_4_Template, 2, 2, "div", 10)(5, FormularioPublicoShowComponent_Conditional_1_Conditional_5_Template, 2, 1, "div", 11);
    \u0275\u0275elementStart(6, "div")(7, "p", 12);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 13);
    \u0275\u0275text(10, "Formul\xE1rio por Gestgo");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "button", 14);
    \u0275\u0275listener("click", function FormularioPublicoShowComponent_Conditional_1_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDark());
    });
    \u0275\u0275conditionalCreate(12, FormularioPublicoShowComponent_Conditional_1_Conditional_12_Template, 10, 0, ":svg:svg", 15)(13, FormularioPublicoShowComponent_Conditional_1_Conditional_13_Template, 2, 0, ":svg:svg", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(14, FormularioPublicoShowComponent_Conditional_1_Conditional_14_Template, 9, 3, "div", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.clinicLogoDisplayUrl() ? 4 : 5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.data.clinic_name ?? "Cl\xEDnica");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.dark ? 12 : 13);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.personFormUnlocked() ? 14 : -1);
  }
}
function FormularioPublicoShowComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "zm-skeleton-list", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("rows", 8);
  }
}
function FormularioPublicoShowComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 35)(2, "p", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.erro);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.data.person_link.description);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 39);
    \u0275\u0275text(1, "Informe seu c\xF3digo de acesso e data de nascimento para continuar.");
    \u0275\u0275elementEnd();
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.personGateErro);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_1_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 48);
    \u0275\u0275element(1, "path", 49)(2, "path", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Validando\u2026 ");
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_1_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Continuar para o formul\xE1rio ");
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "h1", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, FormularioPublicoShowComponent_Conditional_5_Conditional_1_Conditional_3_Template, 2, 1, "p", 39)(4, FormularioPublicoShowComponent_Conditional_5_Conditional_1_Conditional_4_Template, 2, 0, "p", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, FormularioPublicoShowComponent_Conditional_5_Conditional_1_Conditional_5_Template, 2, 1, "div", 40);
    \u0275\u0275elementStart(6, "div", 41)(7, "label", 42);
    \u0275\u0275text(8, "C\xF3digo da pessoa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function FormularioPublicoShowComponent_Conditional_5_Conditional_1_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.personCode, $event) || (ctx_r2.personCode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 41)(11, "label", 44);
    \u0275\u0275text(12, "Data de nascimento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function FormularioPublicoShowComponent_Conditional_5_Conditional_1_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.personBirthDate, $event) || (ctx_r2.personBirthDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275element(14, "div", 46);
    \u0275\u0275elementStart(15, "button", 47);
    \u0275\u0275listener("click", function FormularioPublicoShowComponent_Conditional_5_Conditional_1_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.validarIdentificacao());
    });
    \u0275\u0275conditionalCreate(16, FormularioPublicoShowComponent_Conditional_5_Conditional_1_Conditional_16_Template, 4, 0)(17, FormularioPublicoShowComponent_Conditional_5_Conditional_1_Conditional_17_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.data.template.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.data.person_link && ctx_r2.data.person_link.description ? 3 : 4);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.personGateErro ? 5 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.personCode);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(9, _c1));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.personBirthDate);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(10, _c1));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.validandoPerson);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.validandoPerson ? 16 : 17);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.data.template.description);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 51);
    \u0275\u0275text(1, "Ol\xE1, ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, ". Preencha os campos abaixo.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.personValidatedName);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.erro);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 74);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 66);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Conditional_1_Conditional_2_Template, 2, 0, "span", 74);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("for", "field_" + f_r6.name_key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", f_r6.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(f_r6.required ? 2 : -1);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 75);
    \u0275\u0275twoWayListener("ngModelChange", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_2_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.valores[f_r6.name_key], $event) || (ctx_r2.valores[f_r6.name_key] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("id", "field_" + f_r6.name_key);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.valores[f_r6.name_key]);
    \u0275\u0275property("name", f_r6.name_key)("required", f_r6.required);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "textarea", 76);
    \u0275\u0275twoWayListener("ngModelChange", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_3_Template_textarea_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.valores[f_r6.name_key], $event) || (ctx_r2.valores[f_r6.name_key] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("id", "field_" + f_r6.name_key);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.valores[f_r6.name_key]);
    \u0275\u0275property("name", f_r6.name_key)("required", f_r6.required);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 77);
    \u0275\u0275twoWayListener("ngModelChange", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_4_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.valores[f_r6.name_key], $event) || (ctx_r2.valores[f_r6.name_key] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("id", "field_" + f_r6.name_key);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.valores[f_r6.name_key]);
    \u0275\u0275property("name", f_r6.name_key)("required", f_r6.required);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 78);
    \u0275\u0275twoWayListener("ngModelChange", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_5_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.valores[f_r6.name_key], $event) || (ctx_r2.valores[f_r6.name_key] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("id", "field_" + f_r6.name_key);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.valores[f_r6.name_key]);
    \u0275\u0275property("name", f_r6.name_key)("required", f_r6.required)("altInput", true)("convertModelValue", true);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_6_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 74);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 71)(1, "input", 79);
    \u0275\u0275twoWayListener("ngModelChange", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_6_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r11);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.valores[f_r6.name_key], $event) || (ctx_r2.valores[f_r6.name_key] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 80);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 81);
    \u0275\u0275element(4, "polyline", 82);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span", 83);
    \u0275\u0275text(6);
    \u0275\u0275conditionalCreate(7, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_6_Conditional_7_Template, 2, 0, "span", 74);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const f_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("id", "field_" + f_r6.name_key);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.valores[f_r6.name_key]);
    \u0275\u0275property("name", f_r6.name_key)("required", f_r6.required);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", f_r6.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(f_r6.required ? 7 : -1);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_7_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 86);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r13 = ctx.$implicit;
    \u0275\u0275property("value", opt_r13.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r13.label);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 72)(1, "select", 84);
    \u0275\u0275twoWayListener("ngModelChange", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_7_Template_select_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.valores[f_r6.name_key], $event) || (ctx_r2.valores[f_r6.name_key] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(2, "option", 85);
    \u0275\u0275text(3, "Selecione");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_7_For_5_Template, 2, 2, "option", 86, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const f_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("id", "field_" + f_r6.name_key);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.valores[f_r6.name_key]);
    \u0275\u0275property("name", f_r6.name_key)("required", f_r6.required);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.getFieldOptions(f_r6));
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 89)(1, "input", 90);
    \u0275\u0275twoWayListener("ngModelChange", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_8_For_2_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r14);
      const f_r6 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.valores[f_r6.name_key], $event) || (ctx_r2.valores[f_r6.name_key] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 91);
    \u0275\u0275element(3, "span", 92);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 93);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const opt_r15 = ctx.$implicit;
    const f_r6 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("fp-radio-selected", ctx_r2.valores[f_r6.name_key] === opt_r15.value);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.valores[f_r6.name_key]);
    \u0275\u0275property("name", f_r6.name_key)("value", opt_r15.value)("required", f_r6.required);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(opt_r15.label);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 87);
    \u0275\u0275repeaterCreate(1, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_8_For_2_Template, 6, 7, "label", 88, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("fp-radio-grid-single", ctx_r2.getFieldOptions(f_r6).length === 1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.getFieldOptions(f_r6));
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 96)(1, "span", 98);
    \u0275\u0275text(2, "Arquivo selecionado \u2014 enviaremos junto com o formul\xE1rio.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 99);
    \u0275\u0275listener("click", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_9_Conditional_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r17);
      const f_r6 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.clearFile(f_r6.name_key));
    });
    \u0275\u0275text(4, "Remover");
    \u0275\u0275elementEnd()();
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 94)(1, "input", 95);
    \u0275\u0275listener("change", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_9_Template_input_change_1_listener($event) {
      \u0275\u0275restoreView(_r16);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onFileSelected($event, f_r6.name_key));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_9_Conditional_2_Template, 5, 0, "div", 96);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 97);
  }
  if (rf & 2) {
    const f_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("id", "field_" + f_r6.name_key);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.valores[f_r6.name_key] ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("name", f_r6.name_key)("ngModel", ctx_r2.valores[f_r6.name_key])("required", f_r6.required);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 100);
    \u0275\u0275text(1, "Assine com o dedo (celular) ou mouse (computador) no espa\xE7o abaixo.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "canvas", 101);
    \u0275\u0275listener("mousedown", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_10_Template_canvas_mousedown_2_listener($event) {
      \u0275\u0275restoreView(_r18);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.startSignature($event, f_r6.name_key));
    })("mousemove", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_10_Template_canvas_mousemove_2_listener($event) {
      \u0275\u0275restoreView(_r18);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.moveSignature($event, f_r6.name_key));
    })("mouseup", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_10_Template_canvas_mouseup_2_listener() {
      \u0275\u0275restoreView(_r18);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.endSignature(f_r6.name_key));
    })("mouseleave", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_10_Template_canvas_mouseleave_2_listener() {
      \u0275\u0275restoreView(_r18);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.endSignature(f_r6.name_key));
    })("touchstart", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_10_Template_canvas_touchstart_2_listener($event) {
      \u0275\u0275restoreView(_r18);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.startSignature($event, f_r6.name_key));
    })("touchmove", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_10_Template_canvas_touchmove_2_listener($event) {
      \u0275\u0275restoreView(_r18);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      ctx_r2.moveSignature($event, f_r6.name_key);
      return \u0275\u0275resetView($event.preventDefault());
    })("touchend", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_10_Template_canvas_touchend_2_listener() {
      \u0275\u0275restoreView(_r18);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.endSignature(f_r6.name_key));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 97);
    \u0275\u0275elementStart(4, "div", 102)(5, "span", 98);
    \u0275\u0275text(6, "Escreva sua assinatura no campo acima");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 99);
    \u0275\u0275listener("click", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_10_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r18);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.clearSignature(f_r6.name_key));
    });
    \u0275\u0275text(8, "Limpar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const f_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "signature_" + f_r6.name_key);
    \u0275\u0275advance();
    \u0275\u0275property("name", f_r6.name_key)("ngModel", ctx_r2.valores[f_r6.name_key])("required", f_r6.required);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 75);
    \u0275\u0275twoWayListener("ngModelChange", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_11_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r19);
      const f_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.valores[f_r6.name_key], $event) || (ctx_r2.valores[f_r6.name_key] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("id", "field_" + f_r6.name_key);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.valores[f_r6.name_key]);
    \u0275\u0275property("name", f_r6.name_key)("required", f_r6.required);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275conditionalCreate(1, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Conditional_1_Template, 3, 3, "label", 66);
    \u0275\u0275conditionalCreate(2, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_2_Template, 1, 4, "input", 67)(3, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_3_Template, 1, 4, "textarea", 68)(4, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_4_Template, 1, 4, "input", 69)(5, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_5_Template, 1, 6, "input", 70)(6, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_6_Template, 8, 6, "label", 71)(7, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_7_Template, 6, 4, "div", 72)(8, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_8_Template, 3, 2, "div", 73)(9, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_9_Template, 4, 5)(10, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_10_Template, 9, 4)(11, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Case_11_Template, 1, 4, "input", 67);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_14_0;
    const f_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.fieldType(f_r6) !== "checkbox" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_14_0 = ctx_r2.fieldType(f_r6)) === "text" ? 2 : tmp_14_0 === "textarea" ? 3 : tmp_14_0 === "number" ? 4 : tmp_14_0 === "date" ? 5 : tmp_14_0 === "checkbox" ? 6 : tmp_14_0 === "select" ? 7 : tmp_14_0 === "radio" ? 8 : tmp_14_0 === "file" ? 9 : tmp_14_0 === "signature" ? 10 : 11);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "h1", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, FormularioPublicoShowComponent_Conditional_5_Conditional_2_Conditional_3_Template, 2, 1, "p", 39);
    \u0275\u0275conditionalCreate(4, FormularioPublicoShowComponent_Conditional_5_Conditional_2_Conditional_4_Template, 5, 1, "p", 51);
    \u0275\u0275elementStart(5, "p", 52);
    \u0275\u0275text(6, " Seus dados ser\xE3o utilizados apenas para as finalidades deste formul\xE1rio e em conformidade com a LGPD. ");
    \u0275\u0275elementStart(7, "a", 53);
    \u0275\u0275text(8, "Pol\xEDtica de Privacidade");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, ". ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 54)(11, "span", 55);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14, "Campos obrigat\xF3rios");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(15, FormularioPublicoShowComponent_Conditional_5_Conditional_2_Conditional_15_Template, 2, 1, "div", 40);
    \u0275\u0275elementStart(16, "form", 56, 0);
    \u0275\u0275listener("ngSubmit", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_Template_form_ngSubmit_16_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.enviar());
    });
    \u0275\u0275elementStart(18, "div", 57)(19, "p", 58);
    \u0275\u0275text(20, "Identifica\xE7\xE3o de quem envia ");
    \u0275\u0275elementStart(21, "span", 59);
    \u0275\u0275text(22, "(opcional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 60)(24, "div", 61)(25, "label", 62);
    \u0275\u0275text(26, "Seu nome");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.submitterName, $event) || (ctx_r2.submitterName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 61)(29, "label", 64);
    \u0275\u0275text(30, "Seu e-mail");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "input", 65);
    \u0275\u0275twoWayListener("ngModelChange", function FormularioPublicoShowComponent_Conditional_5_Conditional_2_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.submitterEmail, $event) || (ctx_r2.submitterEmail = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275element(32, "div", 46);
    \u0275\u0275repeaterCreate(33, FormularioPublicoShowComponent_Conditional_5_Conditional_2_For_34_Template, 12, 2, "div", 41, \u0275\u0275componentInstance().trackByKey, true);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.data.template.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.data.template.description ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.personValidatedName ? 4 : -1);
    \u0275\u0275advance(11);
    \u0275\u0275conditional(ctx_r2.erro ? 15 : -1);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.submitterName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.submitterEmail);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.data.fields);
  }
}
function FormularioPublicoShowComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275conditionalCreate(1, FormularioPublicoShowComponent_Conditional_5_Conditional_1_Template, 18, 11)(2, FormularioPublicoShowComponent_Conditional_5_Conditional_2_Template, 35, 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.personLinkRequired() && !ctx_r2.personGateOk ? 1 : 2);
  }
}
function FormularioPublicoShowComponent_Conditional_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 48);
    \u0275\u0275element(1, "path", 49)(2, "path", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Enviando\u2026 ");
  }
}
function FormularioPublicoShowComponent_Conditional_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 105);
    \u0275\u0275element(1, "polyline", 106);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Enviar formul\xE1rio ");
  }
}
function FormularioPublicoShowComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "footer", 6)(1, "div", 103)(2, "button", 104);
    \u0275\u0275conditionalCreate(3, FormularioPublicoShowComponent_Conditional_6_Conditional_3_Template, 4, 0)(4, FormularioPublicoShowComponent_Conditional_6_Conditional_4_Template, 3, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.enviando);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.enviando ? 3 : 4);
  }
}
var FormularioPublicoShowComponent = class _FormularioPublicoShowComponent {
  ngForm;
  token = "";
  data = null;
  valores = {};
  /** Par de valor + rótulo para select/radio. A API pode enviar:
   *  - string[]                         → ["Sim","Não"]
   *  - { options: string[] }            → { options: ["Sim","Não"] }
   *  - string (separada por , ou \n)    → "Sim,Não"
   *  - string JSON                      → "[\"Sim\",\"Não\"]"
   */
  getFieldOptions(f) {
    let raw = f.options;
    if (!raw)
      return [];
    if (raw && typeof raw === "object" && !Array.isArray(raw) && "options" in raw) {
      raw = raw["options"];
    }
    if (typeof raw === "string") {
      const str = raw.trim();
      if (str.startsWith("[") || str.startsWith("{")) {
        try {
          raw = JSON.parse(raw);
        } catch {
        }
      }
      if (typeof raw === "string") {
        raw = str.split(/\n|,/).map((s) => s.trim()).filter(Boolean);
      }
    }
    if (Array.isArray(raw)) {
      return raw.map((o) => {
        if (typeof o === "string")
          return { value: o, label: o };
        if (o && typeof o === "object") {
          const obj = o;
          const label = String(obj["label"] ?? obj["name"] ?? obj["value"] ?? obj["text"] ?? "");
          const value = String(obj["value"] ?? obj["id"] ?? obj["label"] ?? obj["name"] ?? label);
          return { value, label: label || value };
        }
        return { value: String(o), label: String(o) };
      });
    }
    return [];
  }
  /** Tipo do campo normalizado (minúsculo) para o template. */
  fieldType(f) {
    const t = (f.type ?? "").toLowerCase();
    if (t === "anexo" || t === "attachment")
      return "file";
    return t;
  }
  submitterName = "";
  submitterEmail = "";
  /** Formulários com vínculo à ficha (código + nascimento). */
  personGateOk = false;
  personCode = "";
  personBirthDate = "";
  personGateErro = "";
  validandoPerson = false;
  personValidatedName = null;
  showSkeleton;
  enviando = false;
  erro = "";
  dark = false;
  /** Se a URL da logo existir mas a imagem falhar (404, CORS, host interno). */
  logoImageFailed = signal(false, ...ngDevMode ? [{ debugName: "logoImageFailed" }] : []);
  route = inject(ActivatedRoute);
  router = inject(Router);
  formularioService = inject(FormularioPublicoService);
  loadingService = inject(LoadingService);
  toast = inject(ToastService);
  publicPageBody = inject(PublicPageBodyService);
  constructor() {
    this.token = this.route.snapshot.paramMap.get("token") ?? "";
  }
  ngOnInit() {
    this.publicPageBody.enterPublicPage();
    try {
      this.dark = localStorage.getItem("gestgo_form_dark_mode") === "1";
    } catch {
    }
    if (!this.token) {
      this.showSkeleton = signal(false).asReadonly();
      this.erro = "Link inv\xE1lido.";
      return;
    }
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.formularioService.getByToken(this.token));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (d) => {
        this.logoImageFailed.set(false);
        this.data = d;
        this.personGateOk = !d.person_link?.enabled;
        this.personCode = "";
        this.personBirthDate = "";
        this.personGateErro = "";
        this.personValidatedName = null;
        d.fields.forEach((f) => {
          const ft = this.fieldType(f);
          if (ft === "checkbox")
            this.valores[f.name_key] = false;
          else
            this.valores[f.name_key] = "";
        });
      },
      error: (err) => {
        this.erro = err.error?.message ?? "Formul\xE1rio n\xE3o encontrado ou n\xE3o dispon\xEDvel.";
      }
    });
  }
  toggleDark() {
    this.dark = !this.dark;
    try {
      localStorage.setItem("gestgo_form_dark_mode", this.dark ? "1" : "0");
    } catch {
    }
  }
  personLinkRequired() {
    return !!this.data?.person_link?.enabled;
  }
  personFormUnlocked() {
    return !this.personLinkRequired() || this.personGateOk;
  }
  validarIdentificacao() {
    this.personGateErro = "";
    if (!this.personCode.trim() || !this.personBirthDate) {
      this.personGateErro = "Preencha o c\xF3digo e a data de nascimento.";
      return;
    }
    this.validandoPerson = true;
    this.formularioService.validatePerson(this.token, { code: this.personCode.trim(), birth_date: this.personBirthDate }).subscribe({
      next: (r) => {
        this.validandoPerson = false;
        this.personGateOk = true;
        this.personValidatedName = r.name;
      },
      error: (err) => {
        this.validandoPerson = false;
        const msg = err.error?.errors ? Object.values(err.error.errors).flat().join(" ") : err.error?.message;
        this.personGateErro = msg ?? "C\xF3digo ou data de nascimento n\xE3o conferem.";
      }
    });
  }
  enviar() {
    if (!this.data || this.enviando)
      return;
    if (!this.personFormUnlocked())
      return;
    if (this.ngForm && !this.ngForm.valid)
      return;
    this.enviando = true;
    this.erro = "";
    const normalized = Object.fromEntries(Object.entries(this.valores).map(([k, v]) => [
      k,
      v instanceof Date ? v.toISOString().slice(0, 10) : v
    ]));
    const payload = __spreadValues({
      _submitter_name: this.submitterName || void 0,
      _submitter_email: this.submitterEmail || void 0
    }, normalized);
    if (this.personLinkRequired()) {
      payload["_person_code"] = this.personCode.trim();
      payload["_person_birth_date"] = this.personBirthDate;
    }
    this.formularioService.submit(this.token, payload).subscribe({
      next: (r) => {
        this.enviando = false;
        this.toast.success("Enviado com sucesso", "Seu formul\xE1rio foi recebido.");
        this.router.navigate(["/f/sucesso"], {
          state: {
            protocol_number: r.protocol_number,
            clinic_name: this.data?.clinic_name,
            clinic_logo_url: this.data?.logo_url ?? null
          }
        });
      },
      error: (err) => {
        this.enviando = false;
        this.erro = err.error?.message ?? (err.error?.errors ? Object.values(err.error.errors).flat().join(" ") : "N\xE3o foi poss\xEDvel enviar. Tente novamente.");
        this.toast.error("N\xE3o foi poss\xEDvel enviar", this.erro);
      }
    });
  }
  trackByKey(_index, f) {
    return f.name_key;
  }
  clinicLogoDisplayUrl() {
    if (this.logoImageFailed())
      return null;
    const u = this.data?.logo_url;
    return u != null && String(u).trim() !== "" ? String(u) : null;
  }
  onClinicLogoError() {
    this.logoImageFailed.set(true);
  }
  clinicNameInitial() {
    const n = (this.data?.clinic_name ?? "Z").trim();
    return n ? n.charAt(0).toUpperCase() : "Z";
  }
  /** Campos obrigatórios (para barra de progresso). */
  get requiredFieldsTotal() {
    return this.data?.fields.filter((f) => f.required).length ?? 0;
  }
  get requiredFieldsFilled() {
    if (!this.data)
      return 0;
    return this.data.fields.filter((f) => f.required && this.isFieldFilled(f)).length;
  }
  get progressPercent() {
    const t = this.requiredFieldsTotal;
    if (t <= 0)
      return 100;
    return Math.round(this.requiredFieldsFilled / t * 100);
  }
  isFieldFilled(f) {
    const v = this.valores[f.name_key];
    const t = this.fieldType(f);
    switch (t) {
      case "checkbox":
        return v === true;
      case "number":
        if (v === "" || v === null || v === void 0)
          return false;
        return !Number.isNaN(Number(v));
      case "date":
        return v instanceof Date || typeof v === "string" && v.trim().length > 0;
      case "signature":
        return typeof v === "string" && v.length > 80;
      case "file":
        return typeof v === "string" && v.startsWith("data:") && v.length > 64;
      case "select":
      case "radio":
        return typeof v === "string" && v.trim().length > 0;
      default:
        return String(v ?? "").trim().length > 0;
    }
  }
  /** Inicia desenho da assinatura no canvas. */
  startSignature(e, key) {
    e.preventDefault();
    const canvas = this.getSignatureCanvas(key);
    if (!canvas)
      return;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    ctx.strokeStyle = this.dark ? "#d4c9bb" : "#1e1b18";
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    const pos = this.getSignaturePoint(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    canvas._signing = true;
  }
  /** Desenha na assinatura. */
  moveSignature(e, key) {
    e.preventDefault();
    const canvas = this.getSignatureCanvas(key);
    if (!canvas || !canvas._signing)
      return;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    const pos = this.getSignaturePoint(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }
  /** Finaliza traço da assinatura e atualiza o valor (base64). */
  endSignature(key) {
    const canvas = this.getSignatureCanvas(key);
    if (canvas) {
      canvas._signing = false;
      this.valores[key] = canvas.toDataURL("image/png");
    }
  }
  /** Obtém canvas da assinatura pelo name_key. */
  getSignatureCanvas(key) {
    return typeof document !== "undefined" ? document.getElementById("signature_" + key) : null;
  }
  getSignaturePoint(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e instanceof TouchEvent && e.touches.length) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    const me = e;
    return { x: (me.clientX - rect.left) * scaleX, y: (me.clientY - rect.top) * scaleY };
  }
  static FILE_MAX_BYTES = 15 * 1024 * 1024;
  onFileSelected(event, key) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) {
      this.valores[key] = "";
      return;
    }
    if (file.size > _FormularioPublicoShowComponent.FILE_MAX_BYTES) {
      this.toast.error("Arquivo grande demais", "Escolha um arquivo de at\xE9 15 MB.");
      input.value = "";
      this.valores[key] = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const r = reader.result;
      this.valores[key] = typeof r === "string" ? r : "";
    };
    reader.onerror = () => {
      this.toast.error("Erro ao ler arquivo", "Tente outro arquivo.");
      input.value = "";
      this.valores[key] = "";
    };
    reader.readAsDataURL(file);
  }
  clearFile(key) {
    this.valores[key] = "";
    const el = typeof document !== "undefined" ? document.getElementById("field_" + key) : null;
    if (el?.type === "file")
      el.value = "";
  }
  /** Limpa o canvas e atualiza o valor da assinatura. */
  clearSignature(key) {
    const canvas = this.getSignatureCanvas(key);
    if (!canvas)
      return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    this.valores[key] = "";
  }
  ngOnDestroy() {
    this.publicPageBody.leavePublicPage();
  }
  static \u0275fac = function FormularioPublicoShowComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormularioPublicoShowComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormularioPublicoShowComponent, selectors: [["app-formulario-publico-show"]], viewQuery: function FormularioPublicoShowComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.ngForm = _t.first);
    }
  }, features: [\u0275\u0275ProvidersFeature([
    provideFlatpickrDefaults({
      locale: import_pt.Portuguese,
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "d/m/Y",
      allowInput: true,
      disableMobile: true,
      static: true
    })
  ])], decls: 7, vars: 7, consts: [["publicForm", "ngForm"], [1, "form-publico-page"], [1, "fp-sticky-header"], [1, "fp-scroll"], [1, "fp-container"], [1, "fp-container", "zm-content-enter"], [1, "fp-footer"], [1, "fp-header-inner"], [1, "fp-header-row"], [1, "fp-brand"], [1, "fp-logo", "fp-logo--img"], ["aria-hidden", "true", 1, "fp-logo"], [1, "fp-clinic-name"], [1, "fp-sub"], ["type", "button", "aria-label", "Alternar tema claro ou escuro", 1, "fp-icon-btn", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true", 1, "fp-theme-icon"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true", 1, "fp-theme-icon", "fp-theme-moon"], [1, "fp-progress-block"], ["loading", "lazy", 3, "error", "src", "alt"], ["cx", "12", "cy", "12", "r", "5"], ["x1", "12", "y1", "1", "x2", "12", "y2", "3"], ["x1", "12", "y1", "21", "x2", "12", "y2", "23"], ["x1", "4.22", "y1", "4.22", "x2", "5.64", "y2", "5.64"], ["x1", "18.36", "y1", "18.36", "x2", "19.78", "y2", "19.78"], ["x1", "1", "y1", "12", "x2", "3", "y2", "12"], ["x1", "21", "y1", "12", "x2", "23", "y2", "12"], ["x1", "4.22", "y1", "19.78", "x2", "5.64", "y2", "18.36"], ["x1", "18.36", "y1", "5.64", "x2", "19.78", "y2", "4.22"], ["d", "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"], [1, "fp-progress-labels"], [1, "fp-progress-hint"], [1, "fp-progress-count"], [1, "fp-progress-track"], [1, "fp-progress-fill"], [3, "rows"], [1, "fp-error-card"], [1, "fp-error-text"], [1, "fp-title-block"], [1, "fp-title"], [1, "fp-lead"], [1, "fp-banner-error"], [1, "fp-field-group", "fp-field-animate"], ["for", "fpPersonCode", 1, "fp-field-label"], ["id", "fpPersonCode", "type", "text", "name", "fpPersonCode", "placeholder", "Ex.: P-000001", "autocomplete", "off", 1, "fp-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["for", "fpPersonBirth", 1, "fp-field-label"], ["id", "fpPersonBirth", "type", "date", "name", "fpPersonBirth", 1, "fp-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["aria-hidden", "true", 1, "fp-section-div"], ["type", "button", 1, "fp-submit-btn", 2, "margin-top", "0.5rem", 3, "click", "disabled"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true", 1, "fp-spin"], ["d", "M21 12a9 9 0 11-18 0 9 9 0 0118 0z", "opacity", ".25"], ["d", "M21 12a9 9 0 00-9-9"], [1, "fp-lead", 2, "font-size", "0.95rem"], [1, "fp-lgpd-note"], ["routerLink", "/privacidade", "target", "_blank", "rel", "noopener", 1, "fp-link"], [1, "fp-required-legend"], [1, "fp-asterisk"], ["id", "formulario-publico-form", 1, "fp-form", 3, "ngSubmit"], [1, "fp-preenchedora"], [1, "fp-preenchedora-title"], [1, "fp-optional"], [1, "fp-preenchedora-grid"], [1, "fp-field-group"], ["for", "submitterName", 1, "fp-field-label"], ["id", "submitterName", "type", "text", "name", "submitterName", "placeholder", "Nome para contato", "autocomplete", "name", 1, "fp-input", 3, "ngModelChange", "ngModel"], ["for", "submitterEmail", 1, "fp-field-label"], ["id", "submitterEmail", "type", "email", "name", "submitterEmail", "placeholder", "email@exemplo.com", "autocomplete", "email", 1, "fp-input", 3, "ngModelChange", "ngModel"], [1, "fp-field-label", 3, "for"], ["type", "text", 1, "fp-input", 3, "id", "ngModel", "name", "required"], ["rows", "4", 1, "fp-input", "fp-textarea", 3, "id", "ngModel", "name", "required"], ["type", "number", 1, "fp-input", 3, "id", "ngModel", "name", "required"], ["type", "text", "mwlFlatpickr", "", "placeholder", "dd/mm/aaaa", 1, "fp-input", 3, "id", "ngModel", "name", "required", "altInput", "convertModelValue"], [1, "fp-check-row"], [1, "fp-select-wrap"], [1, "fp-radio-grid", 3, "fp-radio-grid-single"], ["aria-hidden", "true", 1, "fp-required"], ["type", "text", 1, "fp-input", 3, "ngModelChange", "id", "ngModel", "name", "required"], ["rows", "4", 1, "fp-input", "fp-textarea", 3, "ngModelChange", "id", "ngModel", "name", "required"], ["type", "number", 1, "fp-input", 3, "ngModelChange", "id", "ngModel", "name", "required"], ["type", "text", "mwlFlatpickr", "", "placeholder", "dd/mm/aaaa", 1, "fp-input", 3, "ngModelChange", "id", "ngModel", "name", "required", "altInput", "convertModelValue"], ["type", "checkbox", 1, "fp-check-native", 3, "ngModelChange", "id", "ngModel", "name", "required"], ["aria-hidden", "true", 1, "fp-check-box"], ["viewBox", "0 0 12 12", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", 1, "fp-check-svg"], ["points", "2 6 5 9 10 3"], [1, "fp-check-label"], ["spellcheck", "false", "autocomplete", "off", 1, "fp-input", "fp-select", 3, "ngModelChange", "id", "ngModel", "name", "required"], ["value", ""], [3, "value"], [1, "fp-radio-grid"], [1, "fp-radio-option", 3, "fp-radio-selected"], [1, "fp-radio-option"], ["type", "radio", 1, "fp-visually-hidden", 3, "ngModelChange", "ngModel", "name", "value", "required"], ["aria-hidden", "true", 1, "fp-radio-dot"], [1, "fp-radio-dot-inner"], [1, "fp-radio-label-text"], [1, "fp-file-wrap"], ["type", "file", "accept", "image/*,application/pdf,.pdf,.doc,.docx,.heic,.heif", 1, "fp-input", "fp-file-input", 3, "change", "id"], [1, "fp-file-actions"], ["type", "hidden", 3, "name", "ngModel", "required"], [1, "fp-field-hint"], ["type", "button", 1, "fp-link-btn", 3, "click"], [1, "fp-sig-help"], ["width", "400", "height", "120", 1, "fp-sig-canvas", 3, "mousedown", "mousemove", "mouseup", "mouseleave", "touchstart", "touchmove", "touchend", "id"], [1, "fp-sig-footer"], [1, "fp-footer-inner"], ["type", "submit", "form", "formulario-publico-form", 1, "fp-submit-btn", 3, "disabled"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "aria-hidden", "true", 1, "fp-submit-icon"], ["points", "20 6 9 17 4 12"]], template: function FormularioPublicoShowComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275conditionalCreate(1, FormularioPublicoShowComponent_Conditional_1_Template, 15, 4, "header", 2);
      \u0275\u0275elementStart(2, "div", 3);
      \u0275\u0275conditionalCreate(3, FormularioPublicoShowComponent_Conditional_3_Template, 2, 1, "div", 4);
      \u0275\u0275conditionalCreate(4, FormularioPublicoShowComponent_Conditional_4_Template, 4, 1, "div", 4);
      \u0275\u0275conditionalCreate(5, FormularioPublicoShowComponent_Conditional_5_Template, 3, 1, "div", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, FormularioPublicoShowComponent_Conditional_6_Template, 5, 2, "footer", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("dark", ctx.dark);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.showSkeleton() && ctx.data ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showSkeleton() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.showSkeleton() && ctx.erro && !ctx.data ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.showSkeleton() && ctx.data ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.showSkeleton() && ctx.data && ctx.personFormUnlocked() ? 6 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, CheckboxRequiredValidator, NgModel, NgForm, FlatpickrDirective, ZmSkeletonListComponent, RouterLink], styles: [`@import "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Instrument+Serif:ital,wght@0,400&display=swap";



[_nghost-%COMP%] {
  display: block;
  font-family:
    "DM Sans",
    system-ui,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  --fp-cream-50: #faf8f4;
  --fp-cream-100: #f3ede3;
  --fp-cream-200: #e8dece;
  --fp-cream-400: #c9b49a;
  --fp-cream-600: #9e7f5e;
  --fp-ink-800: #1e1b18;
  --fp-ink-900: #110f0d;
  --fp-brand-400: #4a7c6e;
  --fp-brand-500: #3a6b5d;
  --fp-brand-600: #2d5549;
  --fp-danger: #e57373;
  --fp-bg-page: var(--fp-cream-50);
  --fp-bg-header: color-mix(in srgb, var(--fp-cream-50) 92%, transparent);
  --fp-border: var(--fp-cream-200);
}
.form-publico-page[_ngcontent-%COMP%] {
  min-height: 100vh;
  background: var(--fp-bg-page);
  color: var(--fp-ink-800);
  --c-border: var(--fp-border);
  --c-surface: #ffffff;
  --c-soft: var(--fp-cream-100);
  --skeleton-base: #e4dcd4;
  --skeleton-highlight: #f2ebe3;
}
.form-publico-page.dark[_ngcontent-%COMP%] {
  --fp-bg-page: #0f0e0c;
  --fp-bg-header: color-mix(in srgb, #0f0e0c 92%, transparent);
  --fp-border: #2e2a24;
  color: #f0ebe3;
  --c-border: #2e2a24;
  --c-surface: #1a1815;
  --c-soft: #141210;
  --skeleton-base: #2a2622;
  --skeleton-highlight: #3a342e;
}
.fp-sticky-header[_ngcontent-%COMP%] {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--fp-bg-header);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--fp-border);
}
.fp-header-inner[_ngcontent-%COMP%] {
  max-width: 32rem;
  margin: 0 auto;
  padding: 0.75rem 1rem 0.75rem;
}
.fp-header-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.fp-brand[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}
.fp-logo[_ngcontent-%COMP%] {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  background: var(--fp-ink-900);
  color: #fff;
  font-family:
    "Instrument Serif",
    Georgia,
    serif;
  font-size: 0.9375rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.fp-logo--img[_ngcontent-%COMP%] {
  padding: 2px;
  background: #fff;
  overflow: hidden;
}
.fp-logo--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  border-radius: 0.55rem;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-logo--img[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--fp-border);
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-logo[_ngcontent-%COMP%] {
  background: var(--fp-cream-100);
  color: var(--fp-ink-900);
}
.fp-clinic-name[_ngcontent-%COMP%] {
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.25;
  color: var(--fp-ink-800);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 14rem;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-clinic-name[_ngcontent-%COMP%] {
  color: var(--fp-cream-100);
}
.fp-sub[_ngcontent-%COMP%] {
  font-size: 0.6875rem;
  color: var(--fp-cream-600);
  margin: 0;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-sub[_ngcontent-%COMP%] {
  color: #a89880;
}
.fp-icon-btn[_ngcontent-%COMP%] {
  border: none;
  background: transparent;
  padding: 0.5rem;
  border-radius: 9999px;
  cursor: pointer;
  color: var(--fp-cream-600);
  transition: background 0.15s, opacity 0.15s;
  flex-shrink: 0;
}
.fp-icon-btn[_ngcontent-%COMP%]:hover {
  background: var(--fp-cream-100);
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-icon-btn[_ngcontent-%COMP%]:hover {
  background: rgba(255, 255, 255, 0.06);
}
.fp-theme-icon[_ngcontent-%COMP%] {
  width: 1rem;
  height: 1rem;
  display: block;
  color: #fbbf24;
}
.fp-theme-moon[_ngcontent-%COMP%] {
  color: var(--fp-cream-600);
}
.fp-progress-block[_ngcontent-%COMP%] {
  padding-top: 0.5rem;
}
.fp-progress-labels[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.375rem;
}
.fp-progress-hint[_ngcontent-%COMP%] {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--fp-cream-600);
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-progress-hint[_ngcontent-%COMP%] {
  color: #a89880;
}
.fp-progress-count[_ngcontent-%COMP%] {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--fp-brand-500);
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-progress-count[_ngcontent-%COMP%] {
  color: var(--fp-brand-400);
}
.fp-progress-track[_ngcontent-%COMP%] {
  height: 0.375rem;
  border-radius: 9999px;
  background: var(--fp-cream-200);
  overflow: hidden;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-progress-track[_ngcontent-%COMP%] {
  background: #2a2620;
}
.fp-progress-fill[_ngcontent-%COMP%] {
  height: 100%;
  border-radius: 9999px;
  background: var(--fp-brand-500);
  transition: width 0.35s ease;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-progress-fill[_ngcontent-%COMP%] {
  background: var(--fp-brand-400);
}
.fp-scroll[_ngcontent-%COMP%] {
  padding-bottom: 6.5rem;
}
.fp-container[_ngcontent-%COMP%] {
  max-width: 32rem;
  margin: 0 auto;
  padding: 1.5rem 1rem 0;
}
.fp-error-card[_ngcontent-%COMP%] {
  border-radius: 1rem;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid var(--fp-border);
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-error-card[_ngcontent-%COMP%] {
  background: #1a1814;
}
.fp-error-text[_ngcontent-%COMP%] {
  font-size: 0.875rem;
  color: var(--fp-cream-600);
  margin: 0;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-error-text[_ngcontent-%COMP%] {
  color: #a89880;
}
.fp-title-block[_ngcontent-%COMP%] {
  margin-bottom: 1.5rem;
  animation: _ngcontent-%COMP%_fpFadeUp 0.4s ease both;
}
.fp-title[_ngcontent-%COMP%] {
  font-family:
    "Instrument Serif",
    Georgia,
    serif;
  font-size: 1.75rem;
  font-weight: 400;
  font-style: normal;
  font-synthesis: none;
  line-height: 1.15;
  color: var(--fp-ink-800);
  margin: 0;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-title[_ngcontent-%COMP%] {
  color: var(--fp-cream-100);
}
.fp-lead[_ngcontent-%COMP%] {
  font-size: 0.8125rem;
  color: var(--fp-cream-600);
  margin: 0.5rem 0 0;
  line-height: 1.5;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-lead[_ngcontent-%COMP%] {
  color: #a89880;
}
.fp-lgpd-note[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  color: var(--fp-cream-400);
  margin: 0.75rem 0 0;
  line-height: 1.5;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-lgpd-note[_ngcontent-%COMP%] {
  color: #7a6a58;
}
.fp-link[_ngcontent-%COMP%] {
  color: var(--fp-brand-500);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-link[_ngcontent-%COMP%] {
  color: var(--fp-brand-400);
}
.fp-required-legend[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 0.75rem;
  font-size: 0.6875rem;
  color: var(--fp-cream-400);
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-required-legend[_ngcontent-%COMP%] {
  color: #7a6a58;
}
.fp-asterisk[_ngcontent-%COMP%] {
  color: #f87171;
}
.fp-banner-error[_ngcontent-%COMP%] {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  background: rgba(229, 115, 115, 0.12);
  color: #c62828;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-banner-error[_ngcontent-%COMP%] {
  color: #ff8a80;
  background: rgba(229, 115, 115, 0.15);
}
.fp-form[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.fp-preenchedora[_ngcontent-%COMP%] {
  border-radius: 0.875rem;
  padding: 0.875rem 1rem;
  background: var(--fp-cream-100);
  border: 1.5px solid var(--fp-cream-200);
  margin-bottom: 0.25rem;
  animation: _ngcontent-%COMP%_fpFadeUp 0.4s 0.06s ease both;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-preenchedora[_ngcontent-%COMP%] {
  background: #1a1814;
  border-color: #2e2a24;
}
.fp-preenchedora-title[_ngcontent-%COMP%] {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fp-cream-600);
  margin: 0 0 0.75rem;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-preenchedora-title[_ngcontent-%COMP%] {
  color: #a89880;
}
.fp-optional[_ngcontent-%COMP%] {
  font-weight: 400;
  text-transform: none;
  letter-spacing: normal;
  opacity: 0.85;
}
.fp-preenchedora-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}
@media (min-width: 480px) {
  .fp-preenchedora-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr 1fr;
  }
}
.fp-section-div[_ngcontent-%COMP%] {
  height: 1px;
  background: var(--fp-border);
  margin: 1.25rem 0 1.5rem;
}
.fp-field-group[_ngcontent-%COMP%] {
  margin-bottom: 1.25rem;
}
.fp-field-animate[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_fpFadeUp 0.4s ease both;
}
.fp-field-group[_ngcontent-%COMP%]:nth-child(1) {
  animation-delay: 0.02s;
}
.fp-field-group[_ngcontent-%COMP%]:nth-child(2) {
  animation-delay: 0.04s;
}
.fp-field-group[_ngcontent-%COMP%]:nth-child(3) {
  animation-delay: 0.06s;
}
.fp-field-group[_ngcontent-%COMP%]:nth-child(n+4) {
  animation-delay: 0.08s;
}
.fp-field-label[_ngcontent-%COMP%] {
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--fp-ink-800);
  margin-bottom: 0.375rem;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-field-label[_ngcontent-%COMP%] {
  color: #f0ebe3;
}
.fp-required[_ngcontent-%COMP%] {
  color: var(--fp-danger);
  margin-left: 2px;
}
.fp-field-hint[_ngcontent-%COMP%] {
  font-size: 0.6875rem;
  color: var(--fp-cream-600);
  margin-top: 0.375rem;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-field-hint[_ngcontent-%COMP%] {
  color: #7a6550;
}
.fp-input[_ngcontent-%COMP%], 
.fp-select[_ngcontent-%COMP%] {
  width: 100%;
  padding: 0.75rem 0.875rem;
  border-radius: 0.75rem;
  border: 1.5px solid var(--fp-cream-200);
  font-family: inherit;
  font-size: 0.875rem;
  color: var(--fp-ink-800);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    background-color 0.2s;
  -webkit-appearance: none;
}
.fp-input[_ngcontent-%COMP%] {
  background-color: #fff;
}
.fp-textarea[_ngcontent-%COMP%] {
  resize: vertical;
  min-height: 5.5rem;
  line-height: 1.45;
}
.fp-file-wrap[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.fp-file-input[_ngcontent-%COMP%] {
  padding: 0.55rem 0.75rem;
  cursor: pointer;
}
.fp-file-input[_ngcontent-%COMP%]::file-selector-button {
  margin-right: 0.75rem;
  padding: 0.4rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--fp-cream-200);
  background: var(--fp-cream-50, #faf8f5);
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--fp-ink-800);
  cursor: pointer;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-file-input[_ngcontent-%COMP%]::file-selector-button {
  border-color: #2e2a24;
  background: #25221c;
  color: #f0ebe3;
}
.fp-file-actions[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.75rem;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-input[_ngcontent-%COMP%] {
  background-color: #1a1814;
  border-color: #2e2a24;
  color: #f0ebe3;
}
.fp-input[_ngcontent-%COMP%]::placeholder {
  color: #9e9488;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-input[_ngcontent-%COMP%]::placeholder {
  color: #6b6358;
}
.fp-input[_ngcontent-%COMP%]:focus, 
.fp-select[_ngcontent-%COMP%]:focus {
  border-color: var(--fp-brand-500);
  box-shadow: 0 0 0 3px rgba(58, 107, 93, 0.12);
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-input[_ngcontent-%COMP%]:focus, 
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-select[_ngcontent-%COMP%]:focus {
  border-color: var(--fp-brand-400);
  box-shadow: 0 0 0 3px rgba(74, 124, 110, 0.15);
}
.fp-select-wrap[_ngcontent-%COMP%] {
  position: relative;
}
.fp-select[_ngcontent-%COMP%] {
  cursor: pointer;
  padding-right: 2.25rem;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239e7f5e' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.875rem center;
  background-size: 12px 8px;
  text-decoration: none;
  text-decoration-line: none;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-select[_ngcontent-%COMP%] {
  background-color: #1a1814;
  border-color: #2e2a24;
  color: #f0ebe3;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234a7c6e' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}
.fp-visually-hidden[_ngcontent-%COMP%] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.fp-radio-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}
.fp-radio-grid-single[_ngcontent-%COMP%] {
  grid-template-columns: 1fr;
}
.fp-radio-option[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.6875rem 0.875rem;
  border-radius: 0.75rem;
  cursor: pointer;
  border: 1.5px solid var(--fp-cream-200);
  background: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--fp-ink-800);
  transition: border-color 0.15s, background 0.15s;
  -webkit-user-select: none;
  user-select: none;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-radio-option[_ngcontent-%COMP%] {
  background: #1a1814;
  border-color: #2e2a24;
  color: #f0ebe3;
}
.fp-radio-option[_ngcontent-%COMP%]:hover {
  border-color: var(--fp-cream-400);
  background: var(--fp-cream-50);
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-radio-option[_ngcontent-%COMP%]:hover {
  border-color: var(--fp-brand-400);
  background: #1e1c18;
}
.fp-radio-selected[_ngcontent-%COMP%] {
  border-color: var(--fp-brand-500);
  background: #f0f7f5;
  color: var(--fp-brand-600);
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-radio-selected[_ngcontent-%COMP%] {
  border-color: var(--fp-brand-400);
  background: #12201c;
  color: #7bbfb0;
}
.fp-radio-dot[_ngcontent-%COMP%] {
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  border: 2px solid var(--fp-cream-400);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.fp-radio-selected[_ngcontent-%COMP%]   .fp-radio-dot[_ngcontent-%COMP%] {
  border-color: var(--fp-brand-500);
}
.fp-radio-dot-inner[_ngcontent-%COMP%] {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--fp-brand-500);
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.15s, transform 0.15s;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-radio-dot-inner[_ngcontent-%COMP%] {
  background: var(--fp-brand-400);
}
.fp-radio-selected[_ngcontent-%COMP%]   .fp-radio-dot-inner[_ngcontent-%COMP%] {
  opacity: 1;
  transform: scale(1);
}
.fp-radio-label-text[_ngcontent-%COMP%] {
  text-align: left;
  line-height: 1.3;
}
.fp-check-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
}
.fp-check-native[_ngcontent-%COMP%] {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}
.fp-check-box[_ngcontent-%COMP%] {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.375rem;
  border: 2px solid var(--fp-cream-400);
  flex-shrink: 0;
  margin-top: 0.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, border-color 0.15s;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-check-box[_ngcontent-%COMP%] {
  border-color: #8a7a68;
}
.fp-check-svg[_ngcontent-%COMP%] {
  width: 0.75rem;
  height: 0.75rem;
  color: #fff;
  opacity: 0;
}
.fp-check-native[_ngcontent-%COMP%]:checked    + .fp-check-box[_ngcontent-%COMP%] {
  background: var(--fp-brand-500);
  border-color: var(--fp-brand-500);
}
.fp-check-native[_ngcontent-%COMP%]:checked    + .fp-check-box[_ngcontent-%COMP%]   .fp-check-svg[_ngcontent-%COMP%] {
  opacity: 1;
}
.fp-check-native[_ngcontent-%COMP%]:focus-visible    + .fp-check-box[_ngcontent-%COMP%] {
  box-shadow: 0 0 0 3px rgba(58, 107, 93, 0.2);
}
.fp-check-label[_ngcontent-%COMP%] {
  font-size: 0.8125rem;
  line-height: 1.45;
  color: var(--fp-ink-800);
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-check-label[_ngcontent-%COMP%] {
  color: #f0ebe3;
}
.fp-sig-help[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  color: var(--fp-cream-600);
  margin: 0 0 0.75rem;
  line-height: 1.45;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-sig-help[_ngcontent-%COMP%] {
  color: #a89880;
}
.fp-sig-canvas[_ngcontent-%COMP%] {
  display: block;
  width: 100%;
  max-width: 100%;
  height: 7.5rem;
  border-radius: 0.75rem;
  border: 1.5px solid var(--fp-cream-200);
  background: #fff;
  cursor: crosshair;
  touch-action: none;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-sig-canvas[_ngcontent-%COMP%] {
  background: #1a1814;
  border-color: #2e2a24;
}
.fp-sig-footer[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.fp-link-btn[_ngcontent-%COMP%] {
  border: none;
  background: transparent;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: inherit;
  color: var(--fp-cream-600);
  cursor: pointer;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  transition: color 0.15s, background 0.15s;
}
.fp-link-btn[_ngcontent-%COMP%]:hover {
  color: #ef5350;
  background: rgba(239, 83, 80, 0.08);
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-link-btn[_ngcontent-%COMP%]:hover {
  background: rgba(239, 83, 80, 0.12);
}
.fp-footer[_ngcontent-%COMP%] {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
  background: var(--fp-bg-header);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 1px solid var(--fp-border);
  padding: 1rem;
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
.fp-footer-inner[_ngcontent-%COMP%] {
  max-width: 32rem;
  margin: 0 auto;
}
.fp-submit-btn[_ngcontent-%COMP%] {
  width: 100%;
  padding: 0.9375rem 1rem;
  border: none;
  border-radius: 0.875rem;
  background: var(--fp-ink-800);
  color: #fff;
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition:
    background 0.15s,
    transform 0.1s,
    opacity 0.2s;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-submit-btn[_ngcontent-%COMP%] {
  background: #f0ebe3;
  color: var(--fp-ink-900);
}
.fp-submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #2d2a26;
}
.form-publico-page.dark[_ngcontent-%COMP%]   .fp-submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #fff;
}
.fp-submit-btn[_ngcontent-%COMP%]:active:not(:disabled) {
  transform: scale(0.99);
}
.fp-submit-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.fp-submit-icon[_ngcontent-%COMP%] {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}
.fp-spin[_ngcontent-%COMP%] {
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  animation: _ngcontent-%COMP%_fpSpin 0.7s linear infinite;
}
@keyframes _ngcontent-%COMP%_fpFadeUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes _ngcontent-%COMP%_fpSpin {
  to {
    transform: rotate(360deg);
  }
}
/*# sourceMappingURL=formulario-publico-show.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormularioPublicoShowComponent, [{
    type: Component,
    args: [{ selector: "app-formulario-publico-show", standalone: true, imports: [CommonModule, FormsModule, FlatpickrDirective, ZmSkeletonListComponent, RouterLink], providers: [
      provideFlatpickrDefaults({
        locale: import_pt.Portuguese,
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d/m/Y",
        allowInput: true,
        disableMobile: true,
        static: true
      })
    ], template: `<div class="form-publico-page" [class.dark]="dark">
  @if (!showSkeleton() && data) {
    <header class="fp-sticky-header">
      <div class="fp-header-inner">
        <div class="fp-header-row">
          <div class="fp-brand">
            @if (clinicLogoDisplayUrl()) {
              <div class="fp-logo fp-logo--img">
                <img [src]="clinicLogoDisplayUrl()!" [alt]="''" loading="lazy" (error)="onClinicLogoError()" />
              </div>
            } @else {
              <div class="fp-logo" aria-hidden="true">{{ clinicNameInitial() }}</div>
            }
            <div>
              <p class="fp-clinic-name">{{ data.clinic_name ?? 'Cl\xEDnica' }}</p>
              <p class="fp-sub">Formul\xE1rio por Gestgo</p>
            </div>
          </div>
          <button type="button" (click)="toggleDark()" class="fp-icon-btn" aria-label="Alternar tema claro ou escuro">
            @if (dark) {
              <svg class="fp-theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            } @else {
              <svg class="fp-theme-icon fp-theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            }
          </button>
        </div>
        @if (personFormUnlocked()) {
          <div class="fp-progress-block">
            <div class="fp-progress-labels">
              <span class="fp-progress-hint">Progresso</span>
              <span class="fp-progress-count">
                @if (requiredFieldsTotal > 0) {
                  {{ requiredFieldsFilled }} de {{ requiredFieldsTotal }} obrigat\xF3rios
                } @else {
                  Nenhum campo obrigat\xF3rio
                }
              </span>
            </div>
            <div class="fp-progress-track">
              <div class="fp-progress-fill" [style.width.%]="progressPercent"></div>
            </div>
          </div>
        }
      </div>
    </header>
  }

  <div class="fp-scroll">
    @if (showSkeleton()) {
      <div class="fp-container">
        <zm-skeleton-list [rows]="8" />
      </div>
    }
    @if (!showSkeleton() && erro && !data) {
      <div class="fp-container">
        <div class="fp-error-card">
          <p class="fp-error-text">{{ erro }}</p>
        </div>
      </div>
    }
    @if (!showSkeleton() && data) {
      <div class="fp-container zm-content-enter">
        @if (personLinkRequired() && !personGateOk) {
          <div class="fp-title-block">
            <h1 class="fp-title">{{ data.template.name }}</h1>
            @if (data.person_link && data.person_link.description) {
              <p class="fp-lead">{{ data.person_link.description }}</p>
            } @else {
              <p class="fp-lead">Informe seu c\xF3digo de acesso e data de nascimento para continuar.</p>
            }
          </div>
          @if (personGateErro) {
            <div class="fp-banner-error">{{ personGateErro }}</div>
          }
          <div class="fp-field-group fp-field-animate">
            <label class="fp-field-label" for="fpPersonCode">C\xF3digo da pessoa</label>
            <input id="fpPersonCode" type="text" [(ngModel)]="personCode" name="fpPersonCode" [ngModelOptions]="{ standalone: true }" class="fp-input" placeholder="Ex.: P-000001" autocomplete="off" />
          </div>
          <div class="fp-field-group fp-field-animate">
            <label class="fp-field-label" for="fpPersonBirth">Data de nascimento</label>
            <input id="fpPersonBirth" type="date" [(ngModel)]="personBirthDate" name="fpPersonBirth" [ngModelOptions]="{ standalone: true }" class="fp-input" />
          </div>
          <div class="fp-section-div" aria-hidden="true"></div>
          <button type="button" class="fp-submit-btn" style="margin-top: 0.5rem" (click)="validarIdentificacao()" [disabled]="validandoPerson">
            @if (validandoPerson) {
              <svg class="fp-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25" />
                <path d="M21 12a9 9 0 00-9-9" />
              </svg>
              Validando\u2026
            } @else {
              Continuar para o formul\xE1rio
            }
          </button>
        } @else {
        <div class="fp-title-block">
          <h1 class="fp-title">{{ data.template.name }}</h1>
          @if (data.template.description) {
            <p class="fp-lead">{{ data.template.description }}</p>
          }
          @if (personValidatedName) {
            <p class="fp-lead" style="font-size: 0.95rem">Ol\xE1, <strong>{{ personValidatedName }}</strong>. Preencha os campos abaixo.</p>
          }
          <p class="fp-lgpd-note">
            Seus dados ser\xE3o utilizados apenas para as finalidades deste formul\xE1rio e em conformidade com a LGPD.
            <a routerLink="/privacidade" target="_blank" rel="noopener" class="fp-link">Pol\xEDtica de Privacidade</a>.
          </p>
          <div class="fp-required-legend">
            <span class="fp-asterisk">*</span>
            <span>Campos obrigat\xF3rios</span>
          </div>
        </div>

        @if (erro) {
          <div class="fp-banner-error">{{ erro }}</div>
        }

        <form #publicForm="ngForm" id="formulario-publico-form" (ngSubmit)="enviar()" class="fp-form">
          <div class="fp-preenchedora">
            <p class="fp-preenchedora-title">Identifica\xE7\xE3o de quem envia <span class="fp-optional">(opcional)</span></p>
            <div class="fp-preenchedora-grid">
              <div class="fp-field-group">
                <label for="submitterName" class="fp-field-label">Seu nome</label>
                <input id="submitterName" type="text" [(ngModel)]="submitterName" name="submitterName" class="fp-input" placeholder="Nome para contato" autocomplete="name" />
              </div>
              <div class="fp-field-group">
                <label for="submitterEmail" class="fp-field-label">Seu e-mail</label>
                <input id="submitterEmail" type="email" [(ngModel)]="submitterEmail" name="submitterEmail" class="fp-input" placeholder="email@exemplo.com" autocomplete="email" />
              </div>
            </div>
          </div>

          <div class="fp-section-div" aria-hidden="true"></div>

          @for (f of data.fields; track trackByKey($index, f)) {
            <div class="fp-field-group fp-field-animate">
              @if (fieldType(f) !== 'checkbox') {
                <label [for]="'field_' + f.name_key" class="fp-field-label">
                  {{ f.label }}
                  @if (f.required) {
                    <span class="fp-required" aria-hidden="true">*</span>
                  }
                </label>
              }

              @switch (fieldType(f)) {
                @case ('text') {
                  <input [id]="'field_' + f.name_key" type="text" [(ngModel)]="valores[f.name_key]" [name]="f.name_key" class="fp-input" [required]="f.required" />
                }
                @case ('textarea') {
                  <textarea [id]="'field_' + f.name_key" [(ngModel)]="valores[f.name_key]" [name]="f.name_key" class="fp-input fp-textarea" rows="4" [required]="f.required"></textarea>
                }
                @case ('number') {
                  <input [id]="'field_' + f.name_key" type="number" [(ngModel)]="valores[f.name_key]" [name]="f.name_key" class="fp-input" [required]="f.required" />
                }
                @case ('date') {
                  <input
                    [id]="'field_' + f.name_key"
                    type="text"
                    mwlFlatpickr
                    [(ngModel)]="valores[f.name_key]"
                    [name]="f.name_key"
                    class="fp-input"
                    [required]="f.required"
                    placeholder="dd/mm/aaaa"
                    [altInput]="true"
                    [convertModelValue]="true"
                  />
                }
                @case ('checkbox') {
                  <label class="fp-check-row">
                    <input [id]="'field_' + f.name_key" type="checkbox" [(ngModel)]="valores[f.name_key]" [name]="f.name_key" class="fp-check-native" [required]="f.required" />
                    <span class="fp-check-box" aria-hidden="true">
                      <svg class="fp-check-svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="2 6 5 9 10 3" />
                      </svg>
                    </span>
                    <span class="fp-check-label">
                      {{ f.label }}
                      @if (f.required) {
                        <span class="fp-required" aria-hidden="true">*</span>
                      }
                    </span>
                  </label>
                }
                @case ('select') {
                  <div class="fp-select-wrap">
                    <select
                      [id]="'field_' + f.name_key"
                      [(ngModel)]="valores[f.name_key]"
                      [name]="f.name_key"
                      class="fp-input fp-select"
                      [required]="f.required"
                      spellcheck="false"
                      autocomplete="off"
                    >
                      <option value="">Selecione</option>
                      @for (opt of getFieldOptions(f); track opt.value) {
                        <option [value]="opt.value">{{ opt.label }}</option>
                      }
                    </select>
                  </div>
                }
                @case ('radio') {
                  <div class="fp-radio-grid" [class.fp-radio-grid-single]="getFieldOptions(f).length === 1">
                    @for (opt of getFieldOptions(f); track opt.value) {
                      <label class="fp-radio-option" [class.fp-radio-selected]="valores[f.name_key] === opt.value">
                        <input
                          type="radio"
                          [(ngModel)]="valores[f.name_key]"
                          [name]="f.name_key"
                          [value]="opt.value"
                          [required]="f.required"
                          class="fp-visually-hidden"
                        />
                        <span class="fp-radio-dot" aria-hidden="true"><span class="fp-radio-dot-inner"></span></span>
                        <span class="fp-radio-label-text">{{ opt.label }}</span>
                      </label>
                    }
                  </div>
                }
                @case ('file') {
                  <div class="fp-file-wrap">
                    <input
                      type="file"
                      [id]="'field_' + f.name_key"
                      class="fp-input fp-file-input"
                      (change)="onFileSelected($event, f.name_key)"
                      accept="image/*,application/pdf,.pdf,.doc,.docx,.heic,.heif"
                    />
                    @if (valores[f.name_key]) {
                      <div class="fp-file-actions">
                        <span class="fp-field-hint">Arquivo selecionado \u2014 enviaremos junto com o formul\xE1rio.</span>
                        <button type="button" class="fp-link-btn" (click)="clearFile(f.name_key)">Remover</button>
                      </div>
                    }
                  </div>
                  <input type="hidden" [name]="f.name_key" [ngModel]="valores[f.name_key]" [required]="f.required" />
                }
                @case ('signature') {
                  <p class="fp-sig-help">Assine com o dedo (celular) ou mouse (computador) no espa\xE7o abaixo.</p>
                  <canvas
                    [id]="'signature_' + f.name_key"
                    width="400"
                    height="120"
                    class="fp-sig-canvas"
                    (mousedown)="startSignature($event, f.name_key)"
                    (mousemove)="moveSignature($event, f.name_key)"
                    (mouseup)="endSignature(f.name_key)"
                    (mouseleave)="endSignature(f.name_key)"
                    (touchstart)="startSignature($event, f.name_key)"
                    (touchmove)="moveSignature($event, f.name_key); $event.preventDefault()"
                    (touchend)="endSignature(f.name_key)"
                  ></canvas>
                  <input type="hidden" [name]="f.name_key" [ngModel]="valores[f.name_key]" [required]="f.required" />
                  <div class="fp-sig-footer">
                    <span class="fp-field-hint">Escreva sua assinatura no campo acima</span>
                    <button type="button" class="fp-link-btn" (click)="clearSignature(f.name_key)">Limpar</button>
                  </div>
                }
                @default {
                  <input [id]="'field_' + f.name_key" type="text" [(ngModel)]="valores[f.name_key]" [name]="f.name_key" class="fp-input" [required]="f.required" />
                }
              }
            </div>
          }
        </form>
        }
      </div>
    }
  </div>

  @if (!showSkeleton() && data && personFormUnlocked()) {
    <footer class="fp-footer">
      <div class="fp-footer-inner">
        <button type="submit" form="formulario-publico-form" class="fp-submit-btn" [disabled]="enviando">
          @if (enviando) {
            <svg class="fp-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25" />
              <path d="M21 12a9 9 0 00-9-9" />
            </svg>
            Enviando\u2026
          } @else {
            <svg class="fp-submit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Enviar formul\xE1rio
          }
        </button>
      </div>
    </footer>
  }
</div>
`, styles: [`@import "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Instrument+Serif:ital,wght@0,400&display=swap";

/* src/app/paginas/formulario-publico/formulario-publico-show.component.css */
:host {
  display: block;
  font-family:
    "DM Sans",
    system-ui,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  --fp-cream-50: #faf8f4;
  --fp-cream-100: #f3ede3;
  --fp-cream-200: #e8dece;
  --fp-cream-400: #c9b49a;
  --fp-cream-600: #9e7f5e;
  --fp-ink-800: #1e1b18;
  --fp-ink-900: #110f0d;
  --fp-brand-400: #4a7c6e;
  --fp-brand-500: #3a6b5d;
  --fp-brand-600: #2d5549;
  --fp-danger: #e57373;
  --fp-bg-page: var(--fp-cream-50);
  --fp-bg-header: color-mix(in srgb, var(--fp-cream-50) 92%, transparent);
  --fp-border: var(--fp-cream-200);
}
.form-publico-page {
  min-height: 100vh;
  background: var(--fp-bg-page);
  color: var(--fp-ink-800);
  --c-border: var(--fp-border);
  --c-surface: #ffffff;
  --c-soft: var(--fp-cream-100);
  --skeleton-base: #e4dcd4;
  --skeleton-highlight: #f2ebe3;
}
.form-publico-page.dark {
  --fp-bg-page: #0f0e0c;
  --fp-bg-header: color-mix(in srgb, #0f0e0c 92%, transparent);
  --fp-border: #2e2a24;
  color: #f0ebe3;
  --c-border: #2e2a24;
  --c-surface: #1a1815;
  --c-soft: #141210;
  --skeleton-base: #2a2622;
  --skeleton-highlight: #3a342e;
}
.fp-sticky-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--fp-bg-header);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--fp-border);
}
.fp-header-inner {
  max-width: 32rem;
  margin: 0 auto;
  padding: 0.75rem 1rem 0.75rem;
}
.fp-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.fp-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}
.fp-logo {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  background: var(--fp-ink-900);
  color: #fff;
  font-family:
    "Instrument Serif",
    Georgia,
    serif;
  font-size: 0.9375rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.fp-logo--img {
  padding: 2px;
  background: #fff;
  overflow: hidden;
}
.fp-logo--img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  border-radius: 0.55rem;
}
.form-publico-page.dark .fp-logo--img {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--fp-border);
}
.form-publico-page.dark .fp-logo {
  background: var(--fp-cream-100);
  color: var(--fp-ink-900);
}
.fp-clinic-name {
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.25;
  color: var(--fp-ink-800);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 14rem;
}
.form-publico-page.dark .fp-clinic-name {
  color: var(--fp-cream-100);
}
.fp-sub {
  font-size: 0.6875rem;
  color: var(--fp-cream-600);
  margin: 0;
}
.form-publico-page.dark .fp-sub {
  color: #a89880;
}
.fp-icon-btn {
  border: none;
  background: transparent;
  padding: 0.5rem;
  border-radius: 9999px;
  cursor: pointer;
  color: var(--fp-cream-600);
  transition: background 0.15s, opacity 0.15s;
  flex-shrink: 0;
}
.fp-icon-btn:hover {
  background: var(--fp-cream-100);
}
.form-publico-page.dark .fp-icon-btn:hover {
  background: rgba(255, 255, 255, 0.06);
}
.fp-theme-icon {
  width: 1rem;
  height: 1rem;
  display: block;
  color: #fbbf24;
}
.fp-theme-moon {
  color: var(--fp-cream-600);
}
.fp-progress-block {
  padding-top: 0.5rem;
}
.fp-progress-labels {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.375rem;
}
.fp-progress-hint {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--fp-cream-600);
}
.form-publico-page.dark .fp-progress-hint {
  color: #a89880;
}
.fp-progress-count {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--fp-brand-500);
}
.form-publico-page.dark .fp-progress-count {
  color: var(--fp-brand-400);
}
.fp-progress-track {
  height: 0.375rem;
  border-radius: 9999px;
  background: var(--fp-cream-200);
  overflow: hidden;
}
.form-publico-page.dark .fp-progress-track {
  background: #2a2620;
}
.fp-progress-fill {
  height: 100%;
  border-radius: 9999px;
  background: var(--fp-brand-500);
  transition: width 0.35s ease;
}
.form-publico-page.dark .fp-progress-fill {
  background: var(--fp-brand-400);
}
.fp-scroll {
  padding-bottom: 6.5rem;
}
.fp-container {
  max-width: 32rem;
  margin: 0 auto;
  padding: 1.5rem 1rem 0;
}
.fp-error-card {
  border-radius: 1rem;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid var(--fp-border);
}
.form-publico-page.dark .fp-error-card {
  background: #1a1814;
}
.fp-error-text {
  font-size: 0.875rem;
  color: var(--fp-cream-600);
  margin: 0;
}
.form-publico-page.dark .fp-error-text {
  color: #a89880;
}
.fp-title-block {
  margin-bottom: 1.5rem;
  animation: fpFadeUp 0.4s ease both;
}
.fp-title {
  font-family:
    "Instrument Serif",
    Georgia,
    serif;
  font-size: 1.75rem;
  font-weight: 400;
  font-style: normal;
  font-synthesis: none;
  line-height: 1.15;
  color: var(--fp-ink-800);
  margin: 0;
}
.form-publico-page.dark .fp-title {
  color: var(--fp-cream-100);
}
.fp-lead {
  font-size: 0.8125rem;
  color: var(--fp-cream-600);
  margin: 0.5rem 0 0;
  line-height: 1.5;
}
.form-publico-page.dark .fp-lead {
  color: #a89880;
}
.fp-lgpd-note {
  font-size: 0.75rem;
  color: var(--fp-cream-400);
  margin: 0.75rem 0 0;
  line-height: 1.5;
}
.form-publico-page.dark .fp-lgpd-note {
  color: #7a6a58;
}
.fp-link {
  color: var(--fp-brand-500);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.form-publico-page.dark .fp-link {
  color: var(--fp-brand-400);
}
.fp-required-legend {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 0.75rem;
  font-size: 0.6875rem;
  color: var(--fp-cream-400);
}
.form-publico-page.dark .fp-required-legend {
  color: #7a6a58;
}
.fp-asterisk {
  color: #f87171;
}
.fp-banner-error {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  background: rgba(229, 115, 115, 0.12);
  color: #c62828;
}
.form-publico-page.dark .fp-banner-error {
  color: #ff8a80;
  background: rgba(229, 115, 115, 0.15);
}
.fp-form {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.fp-preenchedora {
  border-radius: 0.875rem;
  padding: 0.875rem 1rem;
  background: var(--fp-cream-100);
  border: 1.5px solid var(--fp-cream-200);
  margin-bottom: 0.25rem;
  animation: fpFadeUp 0.4s 0.06s ease both;
}
.form-publico-page.dark .fp-preenchedora {
  background: #1a1814;
  border-color: #2e2a24;
}
.fp-preenchedora-title {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fp-cream-600);
  margin: 0 0 0.75rem;
}
.form-publico-page.dark .fp-preenchedora-title {
  color: #a89880;
}
.fp-optional {
  font-weight: 400;
  text-transform: none;
  letter-spacing: normal;
  opacity: 0.85;
}
.fp-preenchedora-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}
@media (min-width: 480px) {
  .fp-preenchedora-grid {
    grid-template-columns: 1fr 1fr;
  }
}
.fp-section-div {
  height: 1px;
  background: var(--fp-border);
  margin: 1.25rem 0 1.5rem;
}
.fp-field-group {
  margin-bottom: 1.25rem;
}
.fp-field-animate {
  animation: fpFadeUp 0.4s ease both;
}
.fp-field-group:nth-child(1) {
  animation-delay: 0.02s;
}
.fp-field-group:nth-child(2) {
  animation-delay: 0.04s;
}
.fp-field-group:nth-child(3) {
  animation-delay: 0.06s;
}
.fp-field-group:nth-child(n+4) {
  animation-delay: 0.08s;
}
.fp-field-label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--fp-ink-800);
  margin-bottom: 0.375rem;
}
.form-publico-page.dark .fp-field-label {
  color: #f0ebe3;
}
.fp-required {
  color: var(--fp-danger);
  margin-left: 2px;
}
.fp-field-hint {
  font-size: 0.6875rem;
  color: var(--fp-cream-600);
  margin-top: 0.375rem;
}
.form-publico-page.dark .fp-field-hint {
  color: #7a6550;
}
.fp-input,
.fp-select {
  width: 100%;
  padding: 0.75rem 0.875rem;
  border-radius: 0.75rem;
  border: 1.5px solid var(--fp-cream-200);
  font-family: inherit;
  font-size: 0.875rem;
  color: var(--fp-ink-800);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    background-color 0.2s;
  -webkit-appearance: none;
}
.fp-input {
  background-color: #fff;
}
.fp-textarea {
  resize: vertical;
  min-height: 5.5rem;
  line-height: 1.45;
}
.fp-file-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.fp-file-input {
  padding: 0.55rem 0.75rem;
  cursor: pointer;
}
.fp-file-input::file-selector-button {
  margin-right: 0.75rem;
  padding: 0.4rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--fp-cream-200);
  background: var(--fp-cream-50, #faf8f5);
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--fp-ink-800);
  cursor: pointer;
}
.form-publico-page.dark .fp-file-input::file-selector-button {
  border-color: #2e2a24;
  background: #25221c;
  color: #f0ebe3;
}
.fp-file-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.75rem;
}
.form-publico-page.dark .fp-input {
  background-color: #1a1814;
  border-color: #2e2a24;
  color: #f0ebe3;
}
.fp-input::placeholder {
  color: #9e9488;
}
.form-publico-page.dark .fp-input::placeholder {
  color: #6b6358;
}
.fp-input:focus,
.fp-select:focus {
  border-color: var(--fp-brand-500);
  box-shadow: 0 0 0 3px rgba(58, 107, 93, 0.12);
}
.form-publico-page.dark .fp-input:focus,
.form-publico-page.dark .fp-select:focus {
  border-color: var(--fp-brand-400);
  box-shadow: 0 0 0 3px rgba(74, 124, 110, 0.15);
}
.fp-select-wrap {
  position: relative;
}
.fp-select {
  cursor: pointer;
  padding-right: 2.25rem;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239e7f5e' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.875rem center;
  background-size: 12px 8px;
  text-decoration: none;
  text-decoration-line: none;
}
.form-publico-page.dark .fp-select {
  background-color: #1a1814;
  border-color: #2e2a24;
  color: #f0ebe3;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234a7c6e' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}
.fp-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.fp-radio-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}
.fp-radio-grid-single {
  grid-template-columns: 1fr;
}
.fp-radio-option {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.6875rem 0.875rem;
  border-radius: 0.75rem;
  cursor: pointer;
  border: 1.5px solid var(--fp-cream-200);
  background: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--fp-ink-800);
  transition: border-color 0.15s, background 0.15s;
  -webkit-user-select: none;
  user-select: none;
}
.form-publico-page.dark .fp-radio-option {
  background: #1a1814;
  border-color: #2e2a24;
  color: #f0ebe3;
}
.fp-radio-option:hover {
  border-color: var(--fp-cream-400);
  background: var(--fp-cream-50);
}
.form-publico-page.dark .fp-radio-option:hover {
  border-color: var(--fp-brand-400);
  background: #1e1c18;
}
.fp-radio-selected {
  border-color: var(--fp-brand-500);
  background: #f0f7f5;
  color: var(--fp-brand-600);
}
.form-publico-page.dark .fp-radio-selected {
  border-color: var(--fp-brand-400);
  background: #12201c;
  color: #7bbfb0;
}
.fp-radio-dot {
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  border: 2px solid var(--fp-cream-400);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.fp-radio-selected .fp-radio-dot {
  border-color: var(--fp-brand-500);
}
.fp-radio-dot-inner {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--fp-brand-500);
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.15s, transform 0.15s;
}
.form-publico-page.dark .fp-radio-dot-inner {
  background: var(--fp-brand-400);
}
.fp-radio-selected .fp-radio-dot-inner {
  opacity: 1;
  transform: scale(1);
}
.fp-radio-label-text {
  text-align: left;
  line-height: 1.3;
}
.fp-check-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
}
.fp-check-native {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}
.fp-check-box {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.375rem;
  border: 2px solid var(--fp-cream-400);
  flex-shrink: 0;
  margin-top: 0.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, border-color 0.15s;
}
.form-publico-page.dark .fp-check-box {
  border-color: #8a7a68;
}
.fp-check-svg {
  width: 0.75rem;
  height: 0.75rem;
  color: #fff;
  opacity: 0;
}
.fp-check-native:checked + .fp-check-box {
  background: var(--fp-brand-500);
  border-color: var(--fp-brand-500);
}
.fp-check-native:checked + .fp-check-box .fp-check-svg {
  opacity: 1;
}
.fp-check-native:focus-visible + .fp-check-box {
  box-shadow: 0 0 0 3px rgba(58, 107, 93, 0.2);
}
.fp-check-label {
  font-size: 0.8125rem;
  line-height: 1.45;
  color: var(--fp-ink-800);
}
.form-publico-page.dark .fp-check-label {
  color: #f0ebe3;
}
.fp-sig-help {
  font-size: 0.75rem;
  color: var(--fp-cream-600);
  margin: 0 0 0.75rem;
  line-height: 1.45;
}
.form-publico-page.dark .fp-sig-help {
  color: #a89880;
}
.fp-sig-canvas {
  display: block;
  width: 100%;
  max-width: 100%;
  height: 7.5rem;
  border-radius: 0.75rem;
  border: 1.5px solid var(--fp-cream-200);
  background: #fff;
  cursor: crosshair;
  touch-action: none;
}
.form-publico-page.dark .fp-sig-canvas {
  background: #1a1814;
  border-color: #2e2a24;
}
.fp-sig-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.fp-link-btn {
  border: none;
  background: transparent;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: inherit;
  color: var(--fp-cream-600);
  cursor: pointer;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  transition: color 0.15s, background 0.15s;
}
.fp-link-btn:hover {
  color: #ef5350;
  background: rgba(239, 83, 80, 0.08);
}
.form-publico-page.dark .fp-link-btn:hover {
  background: rgba(239, 83, 80, 0.12);
}
.fp-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
  background: var(--fp-bg-header);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 1px solid var(--fp-border);
  padding: 1rem;
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
.fp-footer-inner {
  max-width: 32rem;
  margin: 0 auto;
}
.fp-submit-btn {
  width: 100%;
  padding: 0.9375rem 1rem;
  border: none;
  border-radius: 0.875rem;
  background: var(--fp-ink-800);
  color: #fff;
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition:
    background 0.15s,
    transform 0.1s,
    opacity 0.2s;
}
.form-publico-page.dark .fp-submit-btn {
  background: #f0ebe3;
  color: var(--fp-ink-900);
}
.fp-submit-btn:hover:not(:disabled) {
  background: #2d2a26;
}
.form-publico-page.dark .fp-submit-btn:hover:not(:disabled) {
  background: #fff;
}
.fp-submit-btn:active:not(:disabled) {
  transform: scale(0.99);
}
.fp-submit-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.fp-submit-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}
.fp-spin {
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  animation: fpSpin 0.7s linear infinite;
}
@keyframes fpFadeUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fpSpin {
  to {
    transform: rotate(360deg);
  }
}
/*# sourceMappingURL=formulario-publico-show.component.css.map */
`] }]
  }], () => [], { ngForm: [{
    type: ViewChild,
    args: ["publicForm"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormularioPublicoShowComponent, { className: "FormularioPublicoShowComponent", filePath: "src/app/paginas/formulario-publico/formulario-publico-show.component.ts", lineNumber: 32 });
})();
export {
  FormularioPublicoShowComponent
};
//# sourceMappingURL=chunk-ZDNAII66.js.map
