import {
  LinkBioService
} from "./chunk-YFYVZLKB.js";
import {
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  EventEmitter,
  Input,
  NgClass,
  NgStyle,
  Output,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵcomponentInstance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-GRLISYEV.js";

// src/app/paginas/link-bio-public/link-bio-public-layouts.component.ts
var _c0 = (a0) => ["/f", a0];
var _forTrack0 = ($index, $item) => $item.title;
var _forTrack1 = ($index, $item) => $item.label;
var _forTrack2 = ($index, $item) => $item.name;
function LinkBioPublicLayoutsComponent_Case_0_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 29);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.clinic.logo_url, \u0275\u0275sanitizeUrl)("alt", ctx_r1.clinic.name);
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.clinicInitials, " ");
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.heroTaglineM2);
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275element(1, "br");
    \u0275\u0275elementStart(2, "em");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.soloNameParts.line1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.soloNameParts.emphasis);
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.clinic.name, " ");
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.clinic.short_description);
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275element(1, "span", 53);
    \u0275\u0275text(2, "Dispon\xEDvel para agendamento ");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275element(1, "span", 54);
    \u0275\u0275text(2, "Fora do hor\xE1rio de atendimento ");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "a", 55);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 56);
    \u0275\u0275element(3, "path", 57)(4, "path", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Agendar pelo WhatsApp ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("href", ctx_r1.whatsappUrl(), \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 39);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 59);
    \u0275\u0275element(2, "path", 60)(3, "polyline", 61);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " E-mail ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", "mailto:" + ctx_r1.clinic.contact_email, \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 40);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 59);
    \u0275\u0275element(2, "path", 62)(3, "circle", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Localiza\xE7\xE3o ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r1.clinic.maps_url, \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutsComponent_Case_0_For_45_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 71);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const mod_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(mod_r3.subtitle);
  }
}
function LinkBioPublicLayoutsComponent_Case_0_For_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 64);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 65);
    \u0275\u0275element(3, "rect", 66)(4, "line", 67)(5, "line", 68);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div", 69)(7, "p", 70);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, LinkBioPublicLayoutsComponent_Case_0_For_45_Conditional_9_Template, 2, 1, "p", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 72);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const mod_r3 = ctx.$implicit;
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(mod_r3.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(mod_r3.subtitle ? 9 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(mod_r3.available ? "Dispon\xEDvel" : "Indispon\xEDvel");
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_46_For_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 74)(1, "span", 75);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 76);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r4.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r4.text);
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_46_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LinkBioPublicLayoutsComponent_Case_0_Conditional_46_For_5_Conditional_0_Template, 5, 2, "div", 74);
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    \u0275\u0275conditional(row_r4.text !== "\u2013" ? 0 : -1);
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "p", 42);
    \u0275\u0275text(2, "Agenda");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 73);
    \u0275\u0275repeaterCreate(4, LinkBioPublicLayoutsComponent_Case_0_Conditional_46_For_5_Template, 1, 1, null, null, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.hoursGridArray);
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_47_For_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 81)(1, "div", 83);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 84);
    \u0275\u0275element(3, "path", 85)(4, "polyline", 86)(5, "line", 87)(6, "line", 88);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div", 69)(8, "p", 70);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 89);
    \u0275\u0275text(11, "Abrir documento");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 90);
    \u0275\u0275element(13, "polyline", 91);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("href", ctx_r1.hrefBio(link_r5.item), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(link_r5.item.label);
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_47_For_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 82)(1, "div", 83);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 84);
    \u0275\u0275element(3, "path", 92);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "div", 69)(5, "p", 70);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 89);
    \u0275\u0275text(8, "Preenchimento online");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(9, "svg", 90);
    \u0275\u0275element(10, "polyline", 91);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c0, ctx_r1.formToken(link_r5.item)));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(link_r5.item.name);
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_47_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LinkBioPublicLayoutsComponent_Case_0_Conditional_47_For_8_Conditional_0_Template, 14, 2, "a", 81)(1, LinkBioPublicLayoutsComponent_Case_0_Conditional_47_For_8_Conditional_1_Template, 11, 4, "a", 82);
  }
  if (rf & 2) {
    const link_r5 = ctx.$implicit;
    \u0275\u0275conditional(link_r5.type === "bio" ? 0 : 1);
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 77)(2, "p", 78);
    \u0275\u0275text(3, "Documentos");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "div", 79);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 80);
    \u0275\u0275text(6, "Preencha antes da primeira consulta");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, LinkBioPublicLayoutsComponent_Case_0_Conditional_47_For_8_Template, 2, 1, null, null, \u0275\u0275componentInstance().trackDoc, true);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.allDocs);
  }
}
function LinkBioPublicLayoutsComponent_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "button", 6);
    \u0275\u0275listener("click", function LinkBioPublicLayoutsComponent_Case_0_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onToggleDark());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 7);
    \u0275\u0275element(4, "circle", 8)(5, "line", 9)(6, "line", 10)(7, "line", 11)(8, "line", 12)(9, "line", 13)(10, "line", 14)(11, "line", 15)(12, "line", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "svg", 17);
    \u0275\u0275element(14, "path", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(15, "button", 19);
    \u0275\u0275listener("click", function LinkBioPublicLayoutsComponent_Case_0_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onShare());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(16, "svg", 20);
    \u0275\u0275element(17, "circle", 21)(18, "circle", 22)(19, "circle", 23)(20, "line", 24)(21, "line", 25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(22, "div", 26)(23, "div", 27)(24, "div", 28);
    \u0275\u0275conditionalCreate(25, LinkBioPublicLayoutsComponent_Case_0_Conditional_25_Template, 1, 2, "img", 29)(26, LinkBioPublicLayoutsComponent_Case_0_Conditional_26_Template, 1, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(27, LinkBioPublicLayoutsComponent_Case_0_Conditional_27_Template, 2, 1, "p", 30);
    \u0275\u0275elementStart(28, "h1", 31);
    \u0275\u0275conditionalCreate(29, LinkBioPublicLayoutsComponent_Case_0_Conditional_29_Template, 4, 2)(30, LinkBioPublicLayoutsComponent_Case_0_Conditional_30_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(31, LinkBioPublicLayoutsComponent_Case_0_Conditional_31_Template, 2, 1, "p", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 33)(33, "div", 34);
    \u0275\u0275conditionalCreate(34, LinkBioPublicLayoutsComponent_Case_0_Conditional_34_Template, 3, 0, "span", 35)(35, LinkBioPublicLayoutsComponent_Case_0_Conditional_35_Template, 3, 0, "span", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(36, LinkBioPublicLayoutsComponent_Case_0_Conditional_36_Template, 6, 1, "div", 37);
    \u0275\u0275elementStart(37, "div", 38);
    \u0275\u0275conditionalCreate(38, LinkBioPublicLayoutsComponent_Case_0_Conditional_38_Template, 5, 1, "a", 39);
    \u0275\u0275conditionalCreate(39, LinkBioPublicLayoutsComponent_Case_0_Conditional_39_Template, 5, 1, "a", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 41)(41, "p", 42);
    \u0275\u0275text(42, "Modalidades de atendimento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 43);
    \u0275\u0275repeaterCreate(44, LinkBioPublicLayoutsComponent_Case_0_For_45_Template, 12, 3, "div", 44, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(46, LinkBioPublicLayoutsComponent_Case_0_Conditional_46_Template, 6, 0, "div", 45);
    \u0275\u0275conditionalCreate(47, LinkBioPublicLayoutsComponent_Case_0_Conditional_47_Template, 9, 0, "div", 46);
    \u0275\u0275elementStart(48, "div", 47);
    \u0275\u0275element(49, "div", 48);
    \u0275\u0275elementStart(50, "span", 49);
    \u0275\u0275text(51, "Fichas digitais por");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "a", 50);
    \u0275\u0275text(53, "Gestgo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "span", 51);
    \u0275\u0275text(55, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "a", 52);
    \u0275\u0275text(57, "Privacidade");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("dark", ctx_r1.dark);
    \u0275\u0275advance(25);
    \u0275\u0275conditional(ctx_r1.clinic.logo_url ? 25 : 26);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.heroTaglineM2 ? 27 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.soloNameParts.emphasis ? 29 : 30);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.clinic.short_description ? 31 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.clinic.is_open_now === true ? 34 : ctx_r1.clinic.is_open_now === false ? 35 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.whatsappUrl() ? 36 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.clinic.contact_email ? 38 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.clinic.maps_url ? 39 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.modalitiesM2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.hasAnyHour ? 46 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.allDocs.length ? 47 : -1);
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 29);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.clinic.logo_url, \u0275\u0275sanitizeUrl)("alt", ctx_r1.clinic.name);
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.clinicInitials, " ");
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 102);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.m3BrandParts.plain);
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 103);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.clinic.short_description);
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 106);
    \u0275\u0275element(1, "span", 124);
    \u0275\u0275text(2, "Aberto para consultas ");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 107);
    \u0275\u0275element(1, "span", 125);
    \u0275\u0275text(2, "Fechado \xB7 Consulte hor\xE1rios ");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "a", 126);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 127);
    \u0275\u0275element(3, "path", 57)(4, "path", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Agendar consulta ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("href", ctx_r1.whatsappUrl(), \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 108);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 59);
    \u0275\u0275element(2, "path", 62)(3, "circle", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Localiza\xE7\xE3o ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r1.clinic.maps_url, \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 108);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 59);
    \u0275\u0275element(2, "rect", 128)(3, "path", 129)(4, "line", 130);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Instagram ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r1.instagramUrl, \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutsComponent_Case_1_For_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 114)(1, "p", 131);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const proc_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(proc_r7);
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Conditional_50_For_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 133)(1, "span", 134);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 135);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r8.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r8.text);
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Conditional_50_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LinkBioPublicLayoutsComponent_Case_1_Conditional_50_For_4_Conditional_0_Template, 5, 2, "div", 133);
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    \u0275\u0275conditional(row_r8.text !== "\u2013" ? 0 : -1);
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 115)(1, "p", 132);
    \u0275\u0275text(2, "Funcionamento");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, LinkBioPublicLayoutsComponent_Case_1_Conditional_50_For_4_Template, 1, 1, null, null, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.hoursGridArray);
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Conditional_51_For_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 137)(1, "div", 139);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 140);
    \u0275\u0275element(3, "path", 85)(4, "polyline", 86)(5, "line", 87)(6, "line", 88);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div", 69)(8, "p", 141);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 142);
    \u0275\u0275text(11, "Abrir documento");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 143);
    \u0275\u0275element(13, "polyline", 91);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("href", ctx_r1.hrefBio(link_r9.item), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(link_r9.item.label);
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Conditional_51_For_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 138)(1, "div", 139);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 140);
    \u0275\u0275element(3, "path", 85)(4, "polyline", 86)(5, "line", 87)(6, "line", 88);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div", 69)(8, "p", 141);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 142);
    \u0275\u0275text(11, "Preenchimento online");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 143);
    \u0275\u0275element(13, "polyline", 91);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c0, ctx_r1.formToken(link_r9.item)));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(link_r9.item.name);
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Conditional_51_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LinkBioPublicLayoutsComponent_Case_1_Conditional_51_For_9_Conditional_0_Template, 14, 2, "a", 137)(1, LinkBioPublicLayoutsComponent_Case_1_Conditional_51_For_9_Conditional_1_Template, 14, 4, "a", 138);
  }
  if (rf & 2) {
    const link_r9 = ctx.$implicit;
    \u0275\u0275conditional(link_r9.type === "bio" ? 0 : 1);
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 116)(1, "div", 110);
    \u0275\u0275element(2, "div", 111);
    \u0275\u0275elementStart(3, "p", 112);
    \u0275\u0275text(4, "Documentos");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "div", 111);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 136);
    \u0275\u0275text(7, "Preencha antes do seu procedimento");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, LinkBioPublicLayoutsComponent_Case_1_Conditional_51_For_9_Template, 2, 1, null, null, \u0275\u0275componentInstance().trackDoc, true);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.allDocs);
  }
}
function LinkBioPublicLayoutsComponent_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 5)(2, "button", 93);
    \u0275\u0275listener("click", function LinkBioPublicLayoutsComponent_Case_1_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onToggleDark());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 94);
    \u0275\u0275element(4, "circle", 8)(5, "line", 9)(6, "line", 10)(7, "line", 11)(8, "line", 12)(9, "line", 13)(10, "line", 14)(11, "line", 15)(12, "line", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "button", 95);
    \u0275\u0275listener("click", function LinkBioPublicLayoutsComponent_Case_1_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onShare());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 96);
    \u0275\u0275element(15, "circle", 21)(16, "circle", 22)(17, "circle", 23)(18, "line", 24)(19, "line", 25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(20, "div", 97)(21, "div", 98);
    \u0275\u0275conditionalCreate(22, LinkBioPublicLayoutsComponent_Case_1_Conditional_22_Template, 1, 2, "img", 29)(23, LinkBioPublicLayoutsComponent_Case_1_Conditional_23_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p", 99);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "h1", 100)(27, "span", 101);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "br");
    \u0275\u0275conditionalCreate(30, LinkBioPublicLayoutsComponent_Case_1_Conditional_30_Template, 2, 1, "span", 102);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(31, LinkBioPublicLayoutsComponent_Case_1_Conditional_31_Template, 2, 1, "p", 103);
    \u0275\u0275element(32, "div", 104);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 105)(34, "div", 34);
    \u0275\u0275conditionalCreate(35, LinkBioPublicLayoutsComponent_Case_1_Conditional_35_Template, 3, 0, "span", 106)(36, LinkBioPublicLayoutsComponent_Case_1_Conditional_36_Template, 3, 0, "span", 107);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(37, LinkBioPublicLayoutsComponent_Case_1_Conditional_37_Template, 6, 1, "div", 37);
    \u0275\u0275elementStart(38, "div", 38);
    \u0275\u0275conditionalCreate(39, LinkBioPublicLayoutsComponent_Case_1_Conditional_39_Template, 5, 1, "a", 108);
    \u0275\u0275conditionalCreate(40, LinkBioPublicLayoutsComponent_Case_1_Conditional_40_Template, 6, 1, "a", 108);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 109)(42, "div", 110);
    \u0275\u0275element(43, "div", 111);
    \u0275\u0275elementStart(44, "p", 112);
    \u0275\u0275text(45, "Procedimentos");
    \u0275\u0275elementEnd();
    \u0275\u0275element(46, "div", 111);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 113);
    \u0275\u0275repeaterCreate(48, LinkBioPublicLayoutsComponent_Case_1_For_49_Template, 3, 1, "div", 114, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(50, LinkBioPublicLayoutsComponent_Case_1_Conditional_50_Template, 5, 0, "div", 115);
    \u0275\u0275conditionalCreate(51, LinkBioPublicLayoutsComponent_Case_1_Conditional_51_Template, 10, 0, "div", 116);
    \u0275\u0275elementStart(52, "div", 117);
    \u0275\u0275element(53, "div", 118);
    \u0275\u0275elementStart(54, "div", 119)(55, "span", 120);
    \u0275\u0275text(56, "Fichas digitais por");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "a", 121);
    \u0275\u0275text(58, "Gestgo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "span", 122);
    \u0275\u0275text(60, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "a", 123);
    \u0275\u0275text(62, "Privacidade");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(22);
    \u0275\u0275conditional(ctx_r1.clinic.logo_url ? 22 : 23);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.brandSubtitleM3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.m3BrandParts.gold);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.m3BrandParts.plain ? 30 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.clinic.short_description ? 31 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.clinic.is_open_now === true ? 35 : 36);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.whatsappUrl() ? 37 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.clinic.maps_url ? 39 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.instagramUrl ? 40 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.proceduresM3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.hasAnyHour ? 50 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.allDocs.length ? 51 : -1);
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 154);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.clinic.short_description);
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 156);
    \u0275\u0275element(1, "span", 183);
    \u0275\u0275text(2, "Aberto agora ");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 157);
    \u0275\u0275element(1, "span", 184);
    \u0275\u0275text(2, "Fechado ");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_34_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" Desde ", ctx_r1.clinic.founded_year, " ");
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 158);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, LinkBioPublicLayoutsComponent_Case_2_Conditional_34_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r1.councilLineM4, "", ctx_r1.councilLineM4 && ctx_r1.clinic.founded_year ? " \xB7 " : "");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.clinic.founded_year ? 2 : -1);
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 160);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 56);
    \u0275\u0275element(2, "path", 57)(3, "path", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Marcar consulta ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r1.whatsappUrl(), \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 162);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 59);
    \u0275\u0275element(2, "path", 62)(3, "circle", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Como chegar ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r1.clinic.maps_url, \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 163);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 59);
    \u0275\u0275element(2, "path", 60)(3, "polyline", 61);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Contato ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", "mailto:" + ctx_r1.clinic.contact_email, \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutsComponent_Case_2_For_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 168);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 170);
    \u0275\u0275element(2, "path", 92);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r11 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", c_r11, " ");
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_54_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 187)(1, "p", 188);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const spec_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(spec_r12);
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 174)(1, "p", 185);
    \u0275\u0275text(2, "Especialidades");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 186);
    \u0275\u0275repeaterCreate(4, LinkBioPublicLayoutsComponent_Case_2_Conditional_54_For_5_Template, 3, 1, "div", 187, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.clinic.specialties_list);
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_55_For_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 189)(1, "span", 190);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 191);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r13.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r13.text);
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_55_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LinkBioPublicLayoutsComponent_Case_2_Conditional_55_For_4_Conditional_0_Template, 5, 2, "div", 189);
  }
  if (rf & 2) {
    const row_r13 = ctx.$implicit;
    \u0275\u0275conditional(row_r13.text !== "\u2013" ? 0 : -1);
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 175)(1, "p", 185);
    \u0275\u0275text(2, "Funcionamento");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, LinkBioPublicLayoutsComponent_Case_2_Conditional_55_For_4_Template, 1, 1, null, null, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.hoursGridArray);
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_56_For_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 193)(1, "div", 195);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 196);
    \u0275\u0275element(3, "path", 85)(4, "polyline", 86)(5, "line", 87)(6, "line", 88);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div", 69)(8, "p", 197);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 198);
    \u0275\u0275text(11, "Abrir documento");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 199);
    \u0275\u0275element(13, "polyline", 91);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("href", ctx_r1.hrefBio(link_r14.item), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(link_r14.item.label);
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_56_For_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 194)(1, "div", 195);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 196);
    \u0275\u0275element(3, "path", 85)(4, "polyline", 86)(5, "line", 87)(6, "line", 88);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div", 69)(8, "p", 197);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 198);
    \u0275\u0275text(11, "Preenchimento online");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 199);
    \u0275\u0275element(13, "polyline", 91);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c0, ctx_r1.formToken(link_r14.item)));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(link_r14.item.name);
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_56_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LinkBioPublicLayoutsComponent_Case_2_Conditional_56_For_8_Conditional_0_Template, 14, 2, "a", 193)(1, LinkBioPublicLayoutsComponent_Case_2_Conditional_56_For_8_Conditional_1_Template, 14, 4, "a", 194);
  }
  if (rf & 2) {
    const link_r14 = ctx.$implicit;
    \u0275\u0275conditional(link_r14.type === "bio" ? 0 : 1);
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 164)(1, "div", 77)(2, "p", 165);
    \u0275\u0275text(3, "Documentos");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "div", 166);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 192);
    \u0275\u0275text(6, "Preencha antes da sua consulta");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, LinkBioPublicLayoutsComponent_Case_2_Conditional_56_For_8_Template, 2, 1, null, null, \u0275\u0275componentInstance().trackDoc, true);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.allDocs);
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 176);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 200);
    \u0275\u0275element(2, "path", 62)(3, "circle", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span", 201);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.clinic.address);
  }
}
function LinkBioPublicLayoutsComponent_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 144)(1, "div", 5)(2, "button", 145);
    \u0275\u0275listener("click", function LinkBioPublicLayoutsComponent_Case_2_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onToggleDark());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 7);
    \u0275\u0275element(4, "circle", 8)(5, "line", 9)(6, "line", 10)(7, "line", 11)(8, "line", 12)(9, "line", 13)(10, "line", 14)(11, "line", 15)(12, "line", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "svg", 146);
    \u0275\u0275element(14, "path", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(15, "button", 147);
    \u0275\u0275listener("click", function LinkBioPublicLayoutsComponent_Case_2_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onShare());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(16, "svg", 148);
    \u0275\u0275element(17, "circle", 21)(18, "circle", 22)(19, "circle", 23)(20, "line", 24)(21, "line", 25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(22, "div", 149)(23, "div", 150);
    \u0275\u0275element(24, "div", 151);
    \u0275\u0275elementStart(25, "div")(26, "p", 152);
    \u0275\u0275text(27, "Odontologia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "h1", 153);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(30, LinkBioPublicLayoutsComponent_Case_2_Conditional_30_Template, 2, 1, "p", 154);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 155);
    \u0275\u0275conditionalCreate(32, LinkBioPublicLayoutsComponent_Case_2_Conditional_32_Template, 3, 0, "span", 156)(33, LinkBioPublicLayoutsComponent_Case_2_Conditional_33_Template, 3, 0, "span", 157);
    \u0275\u0275conditionalCreate(34, LinkBioPublicLayoutsComponent_Case_2_Conditional_34_Template, 3, 3, "span", 158);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 159);
    \u0275\u0275conditionalCreate(36, LinkBioPublicLayoutsComponent_Case_2_Conditional_36_Template, 5, 1, "a", 160);
    \u0275\u0275elementStart(37, "div", 161);
    \u0275\u0275conditionalCreate(38, LinkBioPublicLayoutsComponent_Case_2_Conditional_38_Template, 5, 1, "a", 162);
    \u0275\u0275conditionalCreate(39, LinkBioPublicLayoutsComponent_Case_2_Conditional_39_Template, 5, 1, "a", 163);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 164)(41, "div", 110)(42, "p", 165);
    \u0275\u0275text(43, "Conv\xEAnios aceitos");
    \u0275\u0275elementEnd();
    \u0275\u0275element(44, "div", 166);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 167);
    \u0275\u0275repeaterCreate(46, LinkBioPublicLayoutsComponent_Case_2_For_47_Template, 4, 1, "div", 168, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(48, "div", 169);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(49, "svg", 170);
    \u0275\u0275element(50, "circle", 171)(51, "line", 172)(52, "line", 173);
    \u0275\u0275elementEnd();
    \u0275\u0275text(53, " Particular e outros conv\xEAnios ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(54, LinkBioPublicLayoutsComponent_Case_2_Conditional_54_Template, 6, 0, "div", 174);
    \u0275\u0275conditionalCreate(55, LinkBioPublicLayoutsComponent_Case_2_Conditional_55_Template, 5, 0, "div", 175);
    \u0275\u0275conditionalCreate(56, LinkBioPublicLayoutsComponent_Case_2_Conditional_56_Template, 9, 0, "div", 164);
    \u0275\u0275conditionalCreate(57, LinkBioPublicLayoutsComponent_Case_2_Conditional_57_Template, 6, 1, "div", 176);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(58, "div", 177);
    \u0275\u0275element(59, "div", 178);
    \u0275\u0275elementStart(60, "span", 179);
    \u0275\u0275text(61, "Fichas digitais por");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "a", 180);
    \u0275\u0275text(63, "Gestgo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "span", 181);
    \u0275\u0275text(65, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "a", 182);
    \u0275\u0275text(67, "Privacidade");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("dark", ctx_r1.dark);
    \u0275\u0275advance(29);
    \u0275\u0275textInterpolate(ctx_r1.clinic.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.clinic.short_description ? 30 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.clinic.is_open_now === true ? 32 : ctx_r1.clinic.is_open_now === false ? 33 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.councilLineM4 || ctx_r1.clinic.founded_year ? 34 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.whatsappUrl() ? 36 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.clinic.maps_url ? 38 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.clinic.contact_email ? 39 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.conveniosM4);
    \u0275\u0275advance(8);
    \u0275\u0275conditional((ctx_r1.clinic.specialties_list == null ? null : ctx_r1.clinic.specialties_list.length) ? 54 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.hasAnyHour ? 55 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.allDocs.length ? 56 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.clinic.address ? 57 : -1);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_26_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 220);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r16 = ctx.$implicit;
    \u0275\u0275property("ngClass", t_r16.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r16.initials);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_26_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 221);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("+", ctx_r1.teamExtraCountM5);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, LinkBioPublicLayoutsComponent_Case_3_Conditional_26_For_1_Template, 2, 2, "div", 220, _forTrack2);
    \u0275\u0275conditionalCreate(2, LinkBioPublicLayoutsComponent_Case_3_Conditional_26_Conditional_2_Template, 2, 1, "div", 221);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.teamPreviewM5.slice(0, 3));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.teamM5.length > 3 ? 2 : -1);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 209);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.clinicInitials);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 156);
    \u0275\u0275element(1, "span", 183);
    \u0275\u0275text(2, "Aberto agora ");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 211);
    \u0275\u0275element(1, "span", 222);
    \u0275\u0275text(2, "Fechado ");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 213);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.clinic.short_description);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_34_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.extra.hero_tagline);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_34_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.teamM5.length, " especialista(s)");
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_34_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " \xB7 ");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_34_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Desde ", ctx_r1.clinic.founded_year);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 214);
    \u0275\u0275conditionalCreate(1, LinkBioPublicLayoutsComponent_Case_3_Conditional_34_Conditional_1_Template, 2, 1, "span")(2, LinkBioPublicLayoutsComponent_Case_3_Conditional_34_Conditional_2_Template, 2, 1, "span");
    \u0275\u0275conditionalCreate(3, LinkBioPublicLayoutsComponent_Case_3_Conditional_34_Conditional_3_Template, 2, 0, "span");
    \u0275\u0275conditionalCreate(4, LinkBioPublicLayoutsComponent_Case_3_Conditional_34_Conditional_4_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.extra.hero_tagline ? 1 : ctx_r1.teamM5.length ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.clinic.founded_year && (ctx_r1.extra.hero_tagline || ctx_r1.teamM5.length) ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.clinic.founded_year ? 4 : -1);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 160);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 56);
    \u0275\u0275element(2, "path", 57)(3, "path", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Falar com a recep\xE7\xE3o ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r1.whatsappUrl(), \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 215);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 59);
    \u0275\u0275element(2, "path", 62)(3, "circle", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Como chegar ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r1.clinic.maps_url, \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 216);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 59);
    \u0275\u0275element(2, "path", 60)(3, "polyline", 61);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Contato ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", "mailto:" + ctx_r1.clinic.contact_email, \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_40_For_6_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 227);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r17.credential);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_40_For_6_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 198);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r17.notes);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_40_For_6_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 228);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 229);
    \u0275\u0275element(2, "path", 57)(3, "path", 58);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r17 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("href", ctx_r1.waUrlForMember(m_r17.whatsapp), \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_40_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 223)(1, "div", 225);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 69)(4, "p", 226);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, LinkBioPublicLayoutsComponent_Case_3_Conditional_40_For_6_Conditional_6_Template, 2, 1, "p", 227);
    \u0275\u0275conditionalCreate(7, LinkBioPublicLayoutsComponent_Case_3_Conditional_40_For_6_Conditional_7_Template, 2, 1, "p", 198);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, LinkBioPublicLayoutsComponent_Case_3_Conditional_40_For_6_Conditional_8_Template, 4, 1, "a", 228);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r17 = ctx.$implicit;
    const $index_r18 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.teamAvatarColor($index_r18));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.initialsFromName(m_r17.name));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(m_r17.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(m_r17.credential ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(m_r17.notes ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.waUrlForMember(m_r17.whatsapp) ? 8 : -1);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_40_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 224);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Ver toda a equipe (+", ctx_r1.teamM5.length - 3, ") ");
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 217)(1, "div", 110)(2, "p", 165);
    \u0275\u0275text(3, "Nossa equipe");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "div", 166);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, LinkBioPublicLayoutsComponent_Case_3_Conditional_40_For_6_Template, 9, 6, "div", 223, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275conditionalCreate(7, LinkBioPublicLayoutsComponent_Case_3_Conditional_40_Conditional_7_Template, 2, 1, "button", 224);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.teamM5.slice(0, 8));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.teamM5.length > 3 ? 7 : -1);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_41_For_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 189)(1, "span", 190);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 230);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r19 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r19.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r19.text);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_41_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LinkBioPublicLayoutsComponent_Case_3_Conditional_41_For_4_Conditional_0_Template, 5, 2, "div", 189);
  }
  if (rf & 2) {
    const row_r19 = ctx.$implicit;
    \u0275\u0275conditional(row_r19.text !== "\u2013" ? 0 : -1);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 174)(1, "p", 185);
    \u0275\u0275text(2, "Funcionamento");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, LinkBioPublicLayoutsComponent_Case_3_Conditional_41_For_4_Template, 1, 1, null, null, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.hoursGridArray);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_42_For_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 193)(1, "div", 231);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 232);
    \u0275\u0275element(3, "path", 85)(4, "polyline", 86)(5, "line", 87)(6, "line", 88);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div", 69)(8, "p", 197);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 198);
    \u0275\u0275text(11, "Abrir documento");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 233);
    \u0275\u0275element(13, "polyline", 91);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r20 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("href", ctx_r1.hrefBio(link_r20.item), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(link_r20.item.label);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_42_For_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 194)(1, "div", 231);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 232);
    \u0275\u0275element(3, "path", 85)(4, "polyline", 86)(5, "line", 87)(6, "line", 88);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div", 69)(8, "p", 197);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 198);
    \u0275\u0275text(11, "Preenchimento online");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 233);
    \u0275\u0275element(13, "polyline", 91);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r20 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c0, ctx_r1.formToken(link_r20.item)));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(link_r20.item.name);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_42_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LinkBioPublicLayoutsComponent_Case_3_Conditional_42_For_8_Conditional_0_Template, 14, 2, "a", 193)(1, LinkBioPublicLayoutsComponent_Case_3_Conditional_42_For_8_Conditional_1_Template, 14, 4, "a", 194);
  }
  if (rf & 2) {
    const link_r20 = ctx.$implicit;
    \u0275\u0275conditional(link_r20.type === "bio" ? 0 : 1);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 164)(1, "div", 77)(2, "p", 165);
    \u0275\u0275text(3, "Documentos gerais");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "div", 166);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 192);
    \u0275\u0275text(6, "Preencha antes da sua primeira consulta");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, LinkBioPublicLayoutsComponent_Case_3_Conditional_42_For_8_Template, 2, 1, null, null, \u0275\u0275componentInstance().trackDoc, true);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.allDocs);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 176);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 200);
    \u0275\u0275element(2, "path", 62)(3, "circle", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span", 201);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.clinic.address);
  }
}
function LinkBioPublicLayoutsComponent_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 202)(1, "div", 5)(2, "button", 203);
    \u0275\u0275listener("click", function LinkBioPublicLayoutsComponent_Case_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onToggleDark());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 7);
    \u0275\u0275element(4, "circle", 8)(5, "line", 9)(6, "line", 10)(7, "line", 11)(8, "line", 12)(9, "line", 13)(10, "line", 14)(11, "line", 15)(12, "line", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "svg", 146);
    \u0275\u0275element(14, "path", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(15, "button", 204);
    \u0275\u0275listener("click", function LinkBioPublicLayoutsComponent_Case_3_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onShare());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(16, "svg", 148);
    \u0275\u0275element(17, "circle", 21)(18, "circle", 22)(19, "circle", 23)(20, "line", 24)(21, "line", 25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(22, "div", 205)(23, "div", 206)(24, "div", 207)(25, "div", 208);
    \u0275\u0275conditionalCreate(26, LinkBioPublicLayoutsComponent_Case_3_Conditional_26_Template, 3, 1)(27, LinkBioPublicLayoutsComponent_Case_3_Conditional_27_Template, 2, 1, "div", 209);
    \u0275\u0275elementEnd();
    \u0275\u0275element(28, "div", 210);
    \u0275\u0275conditionalCreate(29, LinkBioPublicLayoutsComponent_Case_3_Conditional_29_Template, 3, 0, "span", 156)(30, LinkBioPublicLayoutsComponent_Case_3_Conditional_30_Template, 3, 0, "span", 211);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "h1", 212);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(33, LinkBioPublicLayoutsComponent_Case_3_Conditional_33_Template, 2, 1, "p", 213);
    \u0275\u0275conditionalCreate(34, LinkBioPublicLayoutsComponent_Case_3_Conditional_34_Template, 5, 3, "p", 214);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 159);
    \u0275\u0275conditionalCreate(36, LinkBioPublicLayoutsComponent_Case_3_Conditional_36_Template, 5, 1, "a", 160);
    \u0275\u0275elementStart(37, "div", 161);
    \u0275\u0275conditionalCreate(38, LinkBioPublicLayoutsComponent_Case_3_Conditional_38_Template, 5, 1, "a", 215);
    \u0275\u0275conditionalCreate(39, LinkBioPublicLayoutsComponent_Case_3_Conditional_39_Template, 5, 1, "a", 216);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(40, LinkBioPublicLayoutsComponent_Case_3_Conditional_40_Template, 8, 1, "div", 217);
    \u0275\u0275conditionalCreate(41, LinkBioPublicLayoutsComponent_Case_3_Conditional_41_Template, 5, 0, "div", 174);
    \u0275\u0275conditionalCreate(42, LinkBioPublicLayoutsComponent_Case_3_Conditional_42_Template, 9, 0, "div", 164);
    \u0275\u0275conditionalCreate(43, LinkBioPublicLayoutsComponent_Case_3_Conditional_43_Template, 6, 1, "div", 176);
    \u0275\u0275elementStart(44, "div", 177);
    \u0275\u0275element(45, "div", 218);
    \u0275\u0275elementStart(46, "span", 179);
    \u0275\u0275text(47, "Fichas digitais por");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "a", 219);
    \u0275\u0275text(49, "Gestgo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "span", 181);
    \u0275\u0275text(51, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "a", 182);
    \u0275\u0275text(53, "Privacidade");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("dark", ctx_r1.dark);
    \u0275\u0275advance(26);
    \u0275\u0275conditional(ctx_r1.teamPreviewM5.length ? 26 : 27);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.clinic.is_open_now === true ? 29 : ctx_r1.clinic.is_open_now === false ? 30 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.clinic.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.clinic.short_description ? 33 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.extra.hero_tagline || ctx_r1.teamM5.length || ctx_r1.clinic.founded_year ? 34 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.whatsappUrl() ? 36 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.clinic.maps_url ? 38 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.clinic.contact_email ? 39 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.teamM5.length ? 40 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.hasAnyHour ? 41 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.allDocs.length ? 42 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.clinic.address ? 43 : -1);
  }
}
var LinkBioPublicLayoutsComponent = class _LinkBioPublicLayoutsComponent {
  linkBio = inject(LinkBioService);
  model;
  clinic;
  bioLinks = [];
  dark = false;
  allDocs = [];
  publicSlug = "";
  linkBioPreview = false;
  toggleDark = new EventEmitter();
  share = new EventEmitter();
  get extra() {
    const e = this.clinic.link_bio_extra;
    return e && typeof e === "object" ? e : {};
  }
  get hoursGridArray() {
    const grid = this.clinic.business_hours_grid;
    if (!grid || typeof grid !== "object")
      return [];
    const order = ["1", "2", "3", "4", "5", "6", "7"];
    return order.map((k) => grid[k]).filter(Boolean);
  }
  get hasAnyHour() {
    return this.hoursGridArray.some((d) => d.text !== "\u2013");
  }
  get clinicInitials() {
    const name = this.clinic.name?.trim() ?? "";
    if (!name)
      return "GG";
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1)
      return parts[0].slice(0, 2).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  /** Modelo 2: última palavra em itálico (ex.: Dra. Ana _Beatriz_) */
  get soloNameParts() {
    const name = this.clinic.name?.trim() ?? "";
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length <= 1)
      return { line1: name, emphasis: "" };
    return { line1: parts.slice(0, -1).join(" "), emphasis: parts[parts.length - 1] };
  }
  get heroTaglineM2() {
    return this.extra.hero_tagline ?? [this.clinic.specialties_list?.[0], this.extra.council_registration].filter(Boolean).join(" \xB7 ");
  }
  get modalitiesM2() {
    const m = this.extra.modalities;
    if (m?.length) {
      return m.map((x) => ({
        title: x.title,
        subtitle: x.subtitle,
        available: x.available !== false
      }));
    }
    return [
      {
        title: "Online",
        subtitle: "Atendimento remoto",
        available: true
      },
      {
        title: "Presencial",
        subtitle: this.clinic.address?.trim() || "Consult\xF3rio",
        available: true
      }
    ];
  }
  get brandSubtitleM3() {
    if (this.extra.brand_subtitle)
      return this.extra.brand_subtitle;
    const y = this.clinic.founded_year;
    return y ? `Est\xE9tica avan\xE7ada \xB7 Desde ${y}` : "Est\xE9tica avan\xE7ada";
  }
  get m3BrandParts() {
    const name = this.clinic.name?.trim() ?? "";
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length <= 1)
      return { gold: name, plain: "" };
    return { gold: parts[0], plain: parts.slice(1).join(" ") };
  }
  get proceduresM3() {
    const list = this.clinic.specialties_list ?? [];
    if (list.length)
      return list.slice(0, 12);
    return ["Botox", "Preenchimento", "Skincare", "Bioestimulador", "Laser", "Fios PDO"];
  }
  get conveniosM4() {
    const c = this.extra.convenios;
    if (c?.length)
      return c;
    return [];
  }
  get councilLineM4() {
    return this.extra.council_registration ?? "";
  }
  get instagramUrl() {
    if (this.extra.instagram_url?.trim())
      return this.extra.instagram_url.trim();
    const ig = this.bioLinks.find((l) => /instagram\.com/i.test(l.url));
    return ig?.url ?? "";
  }
  get teamM5() {
    return this.extra.team?.length ? this.extra.team : [];
  }
  get teamPreviewM5() {
    const colors = ["bg-indigo-500", "bg-emerald-500", "bg-orange-500", "bg-pink-500", "bg-cyan-500"];
    return this.teamM5.slice(0, 5).map((m, i) => ({
      name: m.name,
      initials: this.initialsFromName(m.name),
      color: colors[i % colors.length]
    }));
  }
  get teamExtraCountM5() {
    return Math.max(0, this.teamM5.length - 3);
  }
  initialsFromName(name) {
    const p = name.trim().split(/\s+/).filter(Boolean);
    if (!p.length)
      return "?";
    if (p.length === 1)
      return p[0].slice(0, 2).toUpperCase();
    return (p[0].charAt(0) + p[p.length - 1].charAt(0)).toUpperCase();
  }
  whatsappUrl(phone) {
    const raw = (phone ?? this.clinic.phone)?.replace(/\D/g, "") ?? "";
    const wa = raw.length >= 10 && raw.length <= 11 ? "55" + raw : raw;
    return wa ? `https://wa.me/${wa}` : "";
  }
  waUrlForMember(whatsapp) {
    if (!whatsapp?.trim())
      return "";
    const d = whatsapp.replace(/\D/g, "");
    if (!d)
      return "";
    const wa = d.length >= 10 && d.length <= 13 ? d : d;
    return `https://wa.me/${wa}`;
  }
  formToken(f) {
    const parts = f.public_url.split("/f/");
    return parts.length > 1 ? parts[1].split("?")[0] : "";
  }
  onToggleDark() {
    this.toggleDark.emit();
  }
  onShare() {
    this.share.emit();
  }
  trackDoc(_i, link) {
    return link.type === "bio" ? `b-${link.item.id}` : `f-${link.item.id}`;
  }
  hrefBio(link) {
    return this.linkBio.outboundBioLinkUrl(this.publicSlug, link, this.linkBioPreview);
  }
  teamAvatarColor(index) {
    const colors = ["bg-indigo-500", "bg-emerald-500", "bg-orange-500", "bg-pink-500", "bg-cyan-500"];
    return colors[index % colors.length];
  }
  static \u0275fac = function LinkBioPublicLayoutsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LinkBioPublicLayoutsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LinkBioPublicLayoutsComponent, selectors: [["app-link-bio-public-layouts"]], inputs: { model: "model", clinic: "clinic", bioLinks: "bioLinks", dark: "dark", allDocs: "allDocs", publicSlug: "publicSlug", linkBioPreview: "linkBioPreview" }, outputs: { toggleDark: "toggleDark", share: "share" }, decls: 4, vars: 1, consts: [[1, "lb-m2-root", 3, "dark"], [1, "lb-m3-root", "lb-m3-grid-bg"], [1, "lb-m4-root", "bg-gray-50", "dark:bg-[#0c0f14]", 3, "dark"], [1, "lb-m5-root", "bg-gray-50", "dark:bg-[#0c0d14]", 3, "dark"], [1, "lb-m2-root"], [1, "flex", "justify-end", "gap-2", "px-4", "pt-4", "absolute", "top-0", "right-0", "z-30"], ["type", "button", "aria-label", "Alternar tema", 1, "lb-icon-pill", "flex", "items-center", "px-3", "py-2", "rounded-full", "bg-black/10", "dark:bg-white/10", "backdrop-blur-sm", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "hidden", "dark:block", "w-[14px]", "h-[14px]", "text-amber-300"], ["cx", "12", "cy", "12", "r", "5"], ["x1", "12", "y1", "1", "x2", "12", "y2", "3"], ["x1", "12", "y1", "21", "x2", "12", "y2", "23"], ["x1", "4.22", "y1", "4.22", "x2", "5.64", "y2", "5.64"], ["x1", "18.36", "y1", "18.36", "x2", "19.78", "y2", "19.78"], ["x1", "1", "y1", "12", "x2", "3", "y2", "12"], ["x1", "21", "y1", "12", "x2", "23", "y2", "12"], ["x1", "4.22", "y1", "19.78", "x2", "5.64", "y2", "18.36"], ["x1", "18.36", "y1", "5.64", "x2", "19.78", "y2", "4.22"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "block", "dark:hidden", "w-[14px]", "h-[14px]", "text-[#7a4f2e]"], ["d", "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"], ["type", "button", "aria-label", "Compartilhar", 1, "lb-icon-pill", "flex", "items-center", "px-3", "py-2", "rounded-full", "bg-black/10", "dark:bg-white/10", "backdrop-blur-sm", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-[14px]", "h-[14px]", "text-[#7a4f2e]", "dark:text-white/70"], ["cx", "18", "cy", "5", "r", "3"], ["cx", "6", "cy", "12", "r", "3"], ["cx", "18", "cy", "19", "r", "3"], ["x1", "8.59", "y1", "13.51", "x2", "15.42", "y2", "17.49"], ["x1", "15.41", "y1", "6.51", "x2", "8.59", "y2", "10.49"], [1, "lb-wavy-top", "bg-[#f0e6d6]", "dark:bg-[#1a130b]", "pt-16", "pb-16", "px-6", "flex", "flex-col", "items-center", "text-center", "lb-anim-scale"], [1, "mb-5", "shadow-lg", "lb-photo-ring"], [1, "lb-photo-inner"], [3, "src", "alt"], [1, "text-[11px]", "font-semibold", "tracking-[.15em]", "uppercase", "text-[#5a9e72]", "dark:text-[#9ec9aa]", "mb-2"], [1, "lb-serif", "text-[30px]", "sm:text-[36px]", "text-[#7a4f2e]", "dark:text-[#f0e6d6]", "leading-tight"], [1, "text-[14px]", "text-[#b8865a]", "dark:text-[#d4a574]", "mt-3", "max-w-xs", "leading-relaxed"], [1, "w-full", "max-w-lg", "mx-auto", "px-4", "sm:px-6", "pb-14", "-mt-2"], [1, "flex", "justify-center", "mb-5", "lb-anim-f1"], [1, "inline-flex", "items-center", "gap-1.5", "px-4", "py-1.5", "rounded-full", "text-[11px]", "font-semibold", "bg-emerald-50", "text-emerald-700", "dark:bg-emerald-900/20", "dark:text-emerald-400"], [1, "inline-flex", "items-center", "gap-1.5", "px-4", "py-1.5", "rounded-full", "text-[11px]", "font-semibold", "bg-[#f0e6d6]", "text-[#b8865a]", "dark:bg-white/[.05]", "dark:text-[#d4a574]"], [1, "lb-anim-f2"], [1, "grid", "grid-cols-2", "gap-2.5", "mt-2.5", "lb-anim-f2"], [1, "flex", "items-center", "justify-center", "gap-2", "py-3", "rounded-xl", "bg-[#f0e6d6]", "dark:bg-white/[.05]", "hover:bg-[#e8dcc8]", "dark:hover:bg-white/[.08]", "text-[#7a4f2e]", "dark:text-[#f0e6d6]", "text-[13px]", "font-semibold", "no-underline", "transition-colors", 3, "href"], ["target", "_blank", "rel", "noopener noreferrer", 1, "flex", "items-center", "justify-center", "gap-2", "py-3", "rounded-xl", "bg-[#f0e6d6]", "dark:bg-white/[.05]", "hover:bg-[#e8dcc8]", "dark:hover:bg-white/[.08]", "text-[#7a4f2e]", "dark:text-[#f0e6d6]", "text-[13px]", "font-semibold", "no-underline", "transition-colors", 3, "href"], [1, "mt-5", "rounded-2xl", "bg-white", "dark:bg-white/[.04]", "border", "border-[#f0e6d6]", "dark:border-white/[.06]", "px-4", "pt-4", "pb-3", "lb-anim-f3"], [1, "text-[10px]", "font-semibold", "tracking-[.12em]", "uppercase", "text-[#b8865a]", "dark:text-[#d4a574]", "mb-3"], [1, "flex", "flex-col", "gap-2"], [1, "flex", "items-center", "gap-3", "py-2", "border-b", "border-[#f0e6d6]", "dark:border-white/[.05]", "last:border-0"], [1, "mt-3", "rounded-2xl", "bg-white", "dark:bg-white/[.04]", "border", "border-[#f0e6d6]", "dark:border-white/[.06]", "px-4", "pt-4", "pb-3", "lb-anim-f3"], [1, "mt-5", "lb-anim-f4"], [1, "mt-8", "pt-5", "border-t", "border-[#f0e6d6]", "dark:border-white/[.05]", "flex", "flex-wrap", "items-center", "justify-center", "gap-2", "lb-anim-f5"], [1, "w-[5px]", "h-[5px]", "rounded-full", "bg-[#5a9e72]", "opacity-60"], [1, "text-[11px]", "text-[#b8865a]", "dark:text-[#7a5c45]"], ["href", "https://gestgo.com.br", "target", "_blank", "rel", "noopener noreferrer", 1, "text-[11px]", "font-bold", "text-[#5a9e72]", "no-underline", "hover:opacity-75"], [1, "text-[#e8dcc8]", "dark:text-[#7a4f2e]", "text-[11px]"], ["routerLink", "/privacidade", 1, "text-[11px]", "text-[#b8865a]", "no-underline", "hover:text-[#7a4f2e]", "transition-colors"], [1, "w-[6px]", "h-[6px]", "rounded-full", "bg-emerald-500", "inline-block"], [1, "w-[6px]", "h-[6px]", "rounded-full", "bg-[#d4a574]", "inline-block"], ["target", "_blank", "rel", "noopener noreferrer", 1, "lb-wpp-btn", "w-full", "flex", "items-center", "justify-center", "gap-3", "py-4", "rounded-2xl", "bg-[#22c55e]", "hover:bg-[#16a34a]", "text-white", "font-semibold", "text-[15px]", "no-underline", "shadow-sm", 3, "href"], ["viewBox", "0 0 24 24", "fill", "white", 1, "w-5", "h-5"], ["d", "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"], ["d", "M12 0C5.373 0 0 5.373 0 12c0 2.108.549 4.09 1.508 5.814L0 24l6.335-1.489A11.926 11.926 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.5-5.198-1.375l-.372-.22-3.862.908.979-3.763-.242-.386A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4"], ["d", "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"], ["points", "22,6 12,13 2,6"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"], ["cx", "12", "cy", "10", "r", "3"], [1, "w-8", "h-8", "rounded-lg", "bg-[#deeee2]", "dark:bg-[#3a6b4a]/20", "flex", "items-center", "justify-center", "flex-shrink-0"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4", "text-[#5a9e72]"], ["x", "2", "y", "3", "width", "20", "height", "14", "rx", "2"], ["x1", "8", "y1", "21", "x2", "16", "y2", "21"], ["x1", "12", "y1", "17", "x2", "12", "y2", "21"], [1, "flex-1", "min-w-0"], [1, "text-[13px]", "font-semibold", "text-[#7a4f2e]", "dark:text-[#f0e6d6]"], [1, "text-[11px]", "text-[#b8865a]", "dark:text-[#d4a574]"], [1, "text-[11px]", "font-semibold", "text-[#5a9e72]", "bg-[#f3f7f4]", "dark:bg-[#3a6b4a]/20", "px-2", "py-0.5", "rounded-full"], [1, "grid", "grid-cols-1", "gap-1", "text-[12px]"], [1, "flex", "justify-between", "py-1.5", "border-b", "border-[#f0e6d6]", "dark:border-white/[.05]", "last:border-0"], [1, "text-[#7a4f2e]", "dark:text-[#d4a574]", "font-medium"], [1, "text-[#5a9e72]", "font-semibold"], [1, "flex", "items-center", "gap-3", "mb-1.5"], [1, "text-[10px]", "font-semibold", "tracking-[.12em]", "uppercase", "text-[#b8865a]", "dark:text-[#d4a574]", "whitespace-nowrap"], [1, "flex-1", "h-px", "bg-[#f0e6d6]", "dark:bg-white/[.06]"], [1, "text-[12px]", "text-[#b8865a]", "dark:text-[#d4a574]", "mb-3"], ["target", "_blank", "rel", "noopener noreferrer", 1, "lb-link-card", "flex", "items-center", "gap-3.5", "p-4", "rounded-2xl", "bg-white", "dark:bg-white/[.04]", "border", "border-[#f0e6d6]", "dark:border-white/[.06]", "mb-2.5", "no-underline", "group", "block", "text-inherit", 3, "href"], [1, "lb-link-card", "flex", "items-center", "gap-3.5", "p-4", "rounded-2xl", "bg-white", "dark:bg-white/[.04]", "border", "border-[#f0e6d6]", "dark:border-white/[.06]", "mb-2.5", "no-underline", "group", "block", "text-inherit", 3, "routerLink"], [1, "w-10", "h-10", "rounded-xl", "bg-[#f3f7f4]", "dark:bg-[#3a6b4a]/20", "flex", "items-center", "justify-center", "flex-shrink-0"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-[18px]", "h-[18px]", "text-[#5a9e72]"], ["d", "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"], ["points", "14 2 14 8 20 8"], ["x1", "16", "y1", "13", "x2", "8", "y2", "13"], ["x1", "16", "y1", "17", "x2", "8", "y2", "17"], [1, "text-[11px]", "text-[#b8865a]", "dark:text-[#d4a574]", "mt-0.5"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4", "text-[#e8dcc8]", "dark:text-[#7a4f2e]", "group-hover:text-[#5a9e72]", "transition-colors"], ["points", "9 18 15 12 9 6"], ["d", "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"], ["type", "button", "aria-label", "Alternar tema", 1, "lb-icon-pill", "flex", "items-center", "px-3", "py-2", "rounded-full", "border", "border-white/10", "backdrop-blur-sm", "bg-white/[.05]", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-[14px]", "h-[14px]", "text-amber-300"], ["type", "button", "aria-label", "Compartilhar", 1, "lb-icon-pill", "flex", "items-center", "px-3", "py-2", "rounded-full", "border", "border-white/10", "backdrop-blur-sm", "bg-white/[.05]", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-[14px]", "h-[14px]", "text-[#e8c97a]"], [1, "lb-m3-cover", "pt-16", "pb-12", "px-6", "flex", "flex-col", "items-center", "text-center", "relative", "lb-anim-f1"], [1, "logo-ring", "mb-5", "lb-logo-ring-m3", "relative", "z-[1]"], [1, "text-[10px]", "tracking-[.25em]", "uppercase", "text-[#e8c97a]/60", "mb-3", "font-light", "relative", "z-[1]"], [1, "lb-serif-m3", "text-[38px]", "sm:text-[48px]", "leading-[1.05]", "font-semibold", "relative", "z-[1]"], [1, "lb-gold-text"], [1, "text-[#e8e0d4]"], [1, "text-[13px]", "text-white/40", "mt-4", "max-w-xs", "leading-relaxed", "font-light", "tracking-wide", "relative", "z-[1]"], [1, "lb-gold-line", "w-24", "mt-6", "relative", "z-[1]"], [1, "w-full", "max-w-lg", "mx-auto", "px-4", "sm:px-6", "pb-14"], [1, "inline-flex", "items-center", "gap-1.5", "px-4", "py-1.5", "rounded-full", "text-[11px]", "font-medium", "border", "border-[#e8c97a]/20", "bg-[#e8c97a]/5", "text-[#e8c97a]"], [1, "inline-flex", "items-center", "gap-1.5", "px-4", "py-1.5", "rounded-full", "text-[11px]", "font-light", "border", "border-white/10", "text-white/30"], ["target", "_blank", "rel", "noopener noreferrer", 1, "flex", "items-center", "justify-center", "gap-2", "py-3", "px-3", "rounded-xl", "bg-white/[.05]", "border", "border-white/10", "text-white/60", "text-[13px]", "font-medium", "no-underline", "hover:bg-white/[.08]", 3, "href"], [1, "mt-6", "lb-anim-f3"], [1, "flex", "items-center", "gap-3", "mb-3"], [1, "lb-gold-line", "flex-1"], [1, "text-[10px]", "tracking-[.15em]", "uppercase", "text-[#e8c97a]/50", "font-light", "px-2"], [1, "grid", "grid-cols-3", "gap-2.5"], [1, "lb-service-card-m3", "p-3", "text-center"], [1, "mt-5", "rounded-2xl", "border", "border-[#e8c97a]/10", "bg-white/[.02]", "px-4", "pt-4", "pb-3", "lb-anim-f3"], [1, "mt-6", "lb-anim-f4"], [1, "mt-8", "pt-5", "flex", "flex-col", "items-center", "gap-2", "lb-anim-f5"], [1, "lb-gold-line", "w-16", "mb-1"], [1, "flex", "flex-wrap", "items-center", "justify-center", "gap-2"], [1, "text-[11px]", "text-white/25", "font-light"], ["href", "https://gestgo.com.br", "target", "_blank", "rel", "noopener noreferrer", 1, "text-[11px]", "font-medium", "text-[#e8c97a]/60", "no-underline", "hover:text-[#e8c97a]", "transition-colors"], [1, "text-white/15", "text-[11px]"], ["routerLink", "/privacidade", 1, "text-[11px]", "text-white/25", "no-underline", "hover:text-white/50", "transition-colors", "font-light"], [1, "w-[5px]", "h-[5px]", "rounded-full", "bg-[#e8c97a]", "lb-pulse-dot", "inline-block"], [1, "w-[5px]", "h-[5px]", "rounded-full", "bg-white/20", "inline-block"], ["target", "_blank", "rel", "noopener noreferrer", 1, "lb-cta-gold", "w-full", "flex", "items-center", "justify-center", "gap-3", "py-4", "rounded-2xl", "font-semibold", "text-[15px]", "no-underline", "tracking-wide", 3, "href"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "w-5", "h-5"], ["x", "2", "y", "2", "width", "20", "height", "20", "rx", "5"], ["d", "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"], ["x1", "17.5", "y1", "6.5", "x2", "17.51", "y2", "6.5"], [1, "text-[11px]", "font-medium", "text-white/80"], [1, "text-[10px]", "tracking-[.15em]", "uppercase", "text-[#e8c97a]/50", "font-light", "mb-3"], [1, "flex", "justify-between", "text-[13px]", "py-2", "border-b", "border-white/[.05]", "last:border-0"], [1, "text-white/70", "font-light"], [1, "text-[#e8c97a]", "font-medium"], [1, "text-[12px]", "text-white/30", "font-light", "mb-3", "text-center"], ["target", "_blank", "rel", "noopener noreferrer", 1, "flex", "items-center", "gap-3.5", "p-4", "rounded-2xl", "border", "border-[#e8c97a]/10", "bg-transparent", "mb-2.5", "no-underline", "group", "block", "text-inherit", "hover:bg-[#e8c97a]/5", "transition-colors", 3, "href"], [1, "flex", "items-center", "gap-3.5", "p-4", "rounded-2xl", "border", "border-[#e8c97a]/10", "bg-transparent", "mb-2.5", "no-underline", "group", "block", "text-inherit", "hover:bg-[#e8c97a]/5", "transition-colors", 3, "routerLink"], [1, "w-10", "h-10", "rounded-xl", "border", "border-[#e8c97a]/20", "bg-[#e8c97a]/5", "flex", "items-center", "justify-center", "flex-shrink-0"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5", 1, "w-[18px]", "h-[18px]", "text-[#e8c97a]"], [1, "text-[13px]", "font-medium", "text-white/80"], [1, "text-[11px]", "text-white/30", "font-light", "mt-0.5"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4", "text-white/20", "group-hover:text-[#e8c97a]", "transition-colors"], [1, "lb-m4-root", "bg-gray-50", "dark:bg-[#0c0f14]"], ["type", "button", "aria-label", "Alternar tema", 1, "lb-icon-pill", "flex", "items-center", "px-3", "py-2", "rounded-full", "bg-white/15", "backdrop-blur-sm", "border", "border-white/15", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "block", "dark:hidden", "w-[14px]", "h-[14px]", "text-white/80"], ["type", "button", "aria-label", "Compartilhar", 1, "lb-icon-pill", "flex", "items-center", "px-3", "py-2", "rounded-full", "bg-white/15", "backdrop-blur-sm", "border", "border-white/15", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-[14px]", "h-[14px]", "text-white/80"], [1, "lb-m4-cover", "pt-16", "pb-8", "px-5", "relative", "z-[1]"], [1, "flex", "items-center", "gap-4", "max-w-lg", "mx-auto", "relative", "z-[1]"], [1, "cross-logo", "shadow-lg", "lb-cross-logo"], [1, "text-[10px]", "font-semibold", "tracking-[.15em]", "uppercase", "text-white/50", "mb-1"], [1, "text-[26px]", "sm:text-[30px]", "font-extrabold", "text-white", "leading-tight", "tracking-tight"], [1, "text-[13px]", "text-white/60", "mt-0.5", "font-light"], [1, "flex", "flex-wrap", "items-center", "gap-3", "mt-4", "max-w-lg", "mx-auto", "relative", "z-[1]"], [1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-1", "rounded-full", "text-[11px]", "font-semibold", "bg-emerald-500/15", "text-emerald-300"], [1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-1", "rounded-full", "text-[11px]", "font-medium", "bg-white/10", "text-white/50"], [1, "text-[11px]", "text-white/40", "font-light"], [1, "w-full", "max-w-lg", "mx-auto", "px-4", "sm:px-6", "pb-14", "pt-5"], ["target", "_blank", "rel", "noopener noreferrer", 1, "lb-wpp-btn", "w-full", "flex", "items-center", "justify-center", "gap-3", "py-4", "rounded-2xl", "bg-[#22c55e]", "hover:bg-[#16a34a]", "text-white", "font-bold", "text-[15px]", "no-underline", 3, "href"], [1, "grid", "grid-cols-2", "gap-2.5", "mt-2.5"], ["target", "_blank", "rel", "noopener noreferrer", 1, "flex", "items-center", "justify-center", "gap-2", "py-3", "px-3", "rounded-xl", "bg-white", "dark:bg-white/[.05]", "border", "border-sky-100", "dark:border-white/[.06]", "hover:bg-sky-50", "dark:hover:bg-white/[.08]", "text-sky-700", "dark:text-sky-400", "text-[13px]", "font-semibold", "no-underline", 3, "href"], [1, "flex", "items-center", "justify-center", "gap-2", "py-3", "px-3", "rounded-xl", "bg-white", "dark:bg-white/[.05]", "border", "border-sky-100", "dark:border-white/[.06]", "hover:bg-sky-50", "dark:hover:bg-white/[.08]", "text-sky-700", "dark:text-sky-400", "text-[13px]", "font-semibold", "no-underline", 3, "href"], [1, "mt-5"], [1, "text-[10px]", "font-bold", "tracking-[.1em]", "uppercase", "text-gray-400", "dark:text-gray-600", "whitespace-nowrap"], [1, "flex-1", "h-px", "bg-gray-200", "dark:bg-white/[.06]"], [1, "grid", "grid-cols-2", "gap-2"], [1, "lb-conv-badge"], [1, "lb-conv-badge", "col-span-2", "justify-center"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4", "flex-shrink-0"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "16"], ["x1", "8", "y1", "12", "x2", "16", "y2", "12"], [1, "mt-5", "rounded-2xl", "bg-white", "dark:bg-white/[.03]", "border", "border-gray-100", "dark:border-white/[.05]", "px-4", "pt-4", "pb-3"], [1, "mt-3", "rounded-2xl", "bg-white", "dark:bg-white/[.03]", "border", "border-gray-100", "dark:border-white/[.05]", "px-4", "pt-4", "pb-3"], [1, "flex", "items-center", "gap-2", "mt-5"], [1, "mt-8", "pt-5", "border-t", "border-gray-200", "dark:border-white/[.05]", "flex", "flex-wrap", "items-center", "justify-center", "gap-2"], [1, "w-[5px]", "h-[5px]", "rounded-full", "bg-sky-500", "opacity-50"], [1, "text-[11px]", "text-gray-400", "dark:text-gray-600"], ["href", "https://gestgo.com.br", "target", "_blank", "rel", "noopener noreferrer", 1, "text-[11px]", "font-bold", "text-sky-500", "no-underline", "hover:opacity-75"], [1, "text-gray-300", "dark:text-gray-700", "text-[11px]"], ["routerLink", "/privacidade", 1, "text-[11px]", "text-gray-400", "no-underline", "hover:text-gray-600", "transition-colors"], [1, "w-[5px]", "h-[5px]", "rounded-full", "bg-emerald-400", "lb-pulse-dot", "inline-block"], [1, "w-[5px]", "h-[5px]", "rounded-full", "bg-white/30", "inline-block"], [1, "text-[10px]", "font-bold", "tracking-[.1em]", "uppercase", "text-gray-400", "dark:text-gray-600", "mb-3"], [1, "grid", "grid-cols-3", "gap-2"], [1, "text-center", "py-2.5", "px-1", "rounded-xl", "bg-sky-50", "dark:bg-sky-900/10"], [1, "text-[11px]", "font-semibold", "text-sky-700", "dark:text-sky-400"], [1, "flex", "justify-between", "text-[13px]", "py-2", "border-b", "border-gray-100", "dark:border-white/[.05]", "last:border-0"], [1, "font-medium", "text-gray-700", "dark:text-gray-300"], [1, "font-semibold", "text-sky-600", "dark:text-sky-400"], [1, "text-[12px]", "text-gray-400", "dark:text-gray-600", "mb-3"], ["target", "_blank", "rel", "noopener noreferrer", 1, "flex", "items-center", "gap-3.5", "p-4", "rounded-2xl", "bg-white", "dark:bg-white/[.03]", "border", "border-gray-100", "dark:border-white/[.05]", "mb-2.5", "no-underline", "group", "block", "text-inherit", "hover:translate-x-[3px]", "transition-transform", 3, "href"], [1, "flex", "items-center", "gap-3.5", "p-4", "rounded-2xl", "bg-white", "dark:bg-white/[.03]", "border", "border-gray-100", "dark:border-white/[.05]", "mb-2.5", "no-underline", "group", "block", "text-inherit", "hover:translate-x-[3px]", "transition-transform", 3, "routerLink"], [1, "w-10", "h-10", "rounded-xl", "bg-sky-50", "dark:bg-sky-900/15", "flex", "items-center", "justify-center", "flex-shrink-0"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-[18px]", "h-[18px]", "text-sky-500"], [1, "text-[13px]", "font-semibold", "text-gray-800", "dark:text-gray-200"], [1, "text-[11px]", "text-gray-400", "dark:text-gray-600", "mt-0.5"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4", "text-gray-300", "dark:text-gray-700", "group-hover:text-sky-400", "transition-colors"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-[13px]", "h-[13px]", "text-gray-400", "dark:text-gray-600", "flex-shrink-0"], [1, "text-[12px]", "text-gray-400", "dark:text-gray-600"], [1, "lb-m5-root", "bg-gray-50", "dark:bg-[#0c0d14]"], ["type", "button", "aria-label", "Alternar tema", 1, "lb-icon-pill", "flex", "items-center", "px-3", "py-2", "rounded-full", "bg-white/10", "backdrop-blur-sm", "border", "border-white/10", 3, "click"], ["type", "button", "aria-label", "Compartilhar", 1, "lb-icon-pill", "flex", "items-center", "px-3", "py-2", "rounded-full", "bg-white/10", "backdrop-blur-sm", "border", "border-white/10", 3, "click"], [1, "lb-m5-cover", "pt-16", "pb-10", "px-5", "relative", "z-[1]"], [1, "max-w-lg", "mx-auto", "relative", "z-[1]"], [1, "flex", "items-center", "gap-3", "mb-4", "flex-wrap"], [1, "flex", "-space-x-2"], [1, "lb-pro-avatar", "bg-indigo-500", "border-2", "border-[#1e1b4b]", "w-9", "h-9", "text-[12px]"], [1, "h-px", "flex-1", "bg-white/10", "min-w-[48px]"], [1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-1", "rounded-full", "text-[11px]", "font-medium", "bg-white/10", "text-white/40"], [1, "text-[28px]", "sm:text-[34px]", "font-extrabold", "text-white", "leading-tight", "tracking-tight"], [1, "text-[13px]", "text-white/50", "mt-1", "font-light"], [1, "text-[11px]", "text-white/30", "mt-1"], ["target", "_blank", "rel", "noopener noreferrer", 1, "flex", "items-center", "justify-center", "gap-2", "py-3", "px-3", "rounded-xl", "bg-white", "dark:bg-white/[.05]", "border", "border-gray-100", "dark:border-white/[.06]", "hover:bg-gray-50", "dark:hover:bg-white/[.08]", "text-gray-600", "dark:text-gray-400", "text-[13px]", "font-semibold", "no-underline", 3, "href"], [1, "flex", "items-center", "justify-center", "gap-2", "py-3", "px-3", "rounded-xl", "bg-white", "dark:bg-white/[.05]", "border", "border-gray-100", "dark:border-white/[.06]", "hover:bg-gray-50", "dark:hover:bg-white/[.08]", "text-gray-600", "dark:text-gray-400", "text-[13px]", "font-semibold", "no-underline", 3, "href"], [1, "mt-6"], [1, "w-[5px]", "h-[5px]", "rounded-full", "bg-indigo-500", "opacity-50"], ["href", "https://gestgo.com.br", "target", "_blank", "rel", "noopener noreferrer", 1, "text-[11px]", "font-bold", "text-indigo-500", "no-underline", "hover:opacity-75"], [1, "pro-avatar", "lb-pro-avatar", "border-2", "border-[#1e1b4b]", "w-9", "h-9", "text-[12px]", 3, "ngClass"], [1, "w-9", "h-9", "rounded-[12px]", "bg-white/10", "border-2", "border-[#1e1b4b]", "flex", "items-center", "justify-center", "text-white/60", "text-[11px]", "font-bold"], [1, "w-[5px]", "h-[5px]", "rounded-full", "bg-white/25", "inline-block"], [1, "lb-pro-card", "flex", "items-center", "gap-3.5", "p-4", "rounded-2xl", "bg-white", "dark:bg-white/[.03]", "border", "border-gray-100", "dark:border-white/[.05]", "mb-2.5"], ["type", "button", 1, "w-full", "py-3", "rounded-2xl", "border", "border-dashed", "border-gray-200", "dark:border-white/[.08]", "text-[13px]", "font-semibold", "text-gray-400", "dark:text-gray-600", "hover:border-indigo-300", "hover:text-indigo-400", "transition-colors", "bg-transparent"], [1, "lb-pro-avatar", 3, "ngClass"], [1, "text-[13px]", "font-bold", "text-gray-800", "dark:text-gray-200"], [1, "text-[11px]", "text-indigo-500", "dark:text-indigo-400", "font-semibold"], ["target", "_blank", "rel", "noopener noreferrer", 1, "flex-shrink-0", "w-8", "h-8", "rounded-xl", "bg-emerald-50", "dark:bg-emerald-900/20", "flex", "items-center", "justify-center", "no-underline", "hover:bg-emerald-100", "transition-colors", 3, "href"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "w-4", "h-4", "text-emerald-500"], [1, "font-semibold", "text-indigo-500", "dark:text-indigo-400"], [1, "w-10", "h-10", "rounded-xl", "bg-indigo-50", "dark:bg-indigo-900/20", "flex", "items-center", "justify-center", "flex-shrink-0"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-[18px]", "h-[18px]", "text-indigo-500"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4", "text-gray-300", "dark:text-gray-700", "group-hover:text-indigo-400", "transition-colors"]], template: function LinkBioPublicLayoutsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, LinkBioPublicLayoutsComponent_Case_0_Template, 58, 12, "div", 0)(1, LinkBioPublicLayoutsComponent_Case_1_Template, 63, 11, "div", 1)(2, LinkBioPublicLayoutsComponent_Case_2_Template, 68, 13, "div", 2)(3, LinkBioPublicLayoutsComponent_Case_3_Template, 54, 14, "div", 3);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional((tmp_0_0 = ctx.model) === 2 ? 0 : tmp_0_0 === 3 ? 1 : tmp_0_0 === 4 ? 2 : tmp_0_0 === 5 ? 3 : -1);
    }
  }, dependencies: [CommonModule, NgClass, RouterLink], styles: ['@import "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.lb-m2-root[_ngcontent-%COMP%] {\n  font-family:\n    "DM Sans",\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n  background: #faf6f1;\n  color: #2e2840;\n}\n.lb-m2-root.dark[_ngcontent-%COMP%] {\n  background: #0f0d0b;\n  color: #f3f7f4;\n}\n.lb-m2-root[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.lb-m2-root[_ngcontent-%COMP%]   .lb-serif[_ngcontent-%COMP%] {\n  font-family:\n    "Playfair Display",\n    ui-serif,\n    Georgia,\n    serif;\n}\n.lb-wavy-top[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n}\n.lb-wavy-top[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: -2px;\n  left: -5%;\n  width: 110%;\n  height: 60px;\n  background: #faf6f1;\n  border-radius: 50% 50% 0 0 / 100% 100% 0 0;\n}\n.lb-m2-root.dark[_ngcontent-%COMP%]   .lb-wavy-top[_ngcontent-%COMP%]::after {\n  background: #0f0d0b;\n}\n.lb-photo-ring[_ngcontent-%COMP%] {\n  width: 110px;\n  height: 110px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #9ec9aa,\n      #d4a574);\n  padding: 3px;\n  flex-shrink: 0;\n}\n.lb-photo-inner[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  background: #c8a882;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: "Playfair Display", serif;\n  font-size: 36px;\n  font-weight: 700;\n  color: #fff;\n  letter-spacing: -1px;\n  overflow: hidden;\n}\n.lb-photo-inner[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 50%;\n}\n.lb-link-card[_ngcontent-%COMP%] {\n  transition: transform 0.15s, background-color 0.15s;\n}\n.lb-link-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.lb-wpp-btn[_ngcontent-%COMP%] {\n  transition: filter 0.15s, transform 0.1s;\n}\n.lb-wpp-btn[_ngcontent-%COMP%]:hover {\n  filter: brightness(1.07);\n}\n.lb-wpp-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n.lb-icon-pill[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border: none;\n  background: transparent;\n  transition: opacity 0.15s;\n}\n.lb-icon-pill[_ngcontent-%COMP%]:hover {\n  opacity: 0.6;\n}\n@keyframes _ngcontent-%COMP%_lb-fade-in {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_lb-scale-in {\n  from {\n    opacity: 0;\n    transform: scale(0.94);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes _ngcontent-%COMP%_lb-shimmer {\n  0% {\n    background-position: 200% center;\n  }\n  100% {\n    background-position: -200% center;\n  }\n}\n@keyframes _ngcontent-%COMP%_lb-pulse-dot {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.3;\n  }\n}\n.lb-anim-scale[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_lb-scale-in 0.5s ease both;\n}\n.lb-anim-f1[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_lb-fade-in 0.6s ease both;\n}\n.lb-anim-f2[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_lb-fade-in 0.6s 0.1s ease both;\n}\n.lb-anim-f3[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_lb-fade-in 0.6s 0.2s ease both;\n}\n.lb-anim-f4[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_lb-fade-in 0.6s 0.3s ease both;\n}\n.lb-anim-f5[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_lb-fade-in 0.6s 0.4s ease both;\n}\n.lb-m3-root[_ngcontent-%COMP%] {\n  font-family:\n    "Outfit",\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n  background: #080608;\n  color: #e8e0d4;\n  min-height: 100vh;\n}\n.lb-m3-root[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.lb-m3-root[_ngcontent-%COMP%]   .lb-serif-m3[_ngcontent-%COMP%] {\n  font-family:\n    "Cormorant Garamond",\n    ui-serif,\n    Georgia,\n    serif;\n}\n.lb-m3-grid-bg[_ngcontent-%COMP%] {\n  background-image:\n    linear-gradient(rgba(200, 162, 64, 0.04) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(200, 162, 64, 0.04) 1px,\n      transparent 1px);\n  background-size: 40px 40px;\n}\n.lb-m3-cover[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      #1a1720 0%,\n      #080608 100%);\n  position: relative;\n  overflow: hidden;\n}\n.lb-m3-cover[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(\n      ellipse 80% 50% at 50% 0%,\n      rgba(200, 162, 64, 0.12) 0%,\n      transparent 70%);\n  pointer-events: none;\n}\n.lb-gold-text[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #c8a240,\n      #f0d080,\n      #c8a240,\n      #f0d080);\n  background-size: 300% auto;\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  animation: _ngcontent-%COMP%_lb-shimmer 4s linear infinite;\n}\n.lb-logo-ring-m3[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 20px;\n  border: 1px solid rgba(200, 162, 64, 0.35);\n  background: #1a1720;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: "Cormorant Garamond", serif;\n  font-size: 28px;\n  font-weight: 600;\n  color: #c8a240;\n  letter-spacing: 1px;\n  overflow: hidden;\n}\n.lb-logo-ring-m3[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.lb-gold-line[_ngcontent-%COMP%] {\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(200, 162, 64, 0.4),\n      transparent);\n}\n.lb-service-card-m3[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(200, 162, 64, 0.12);\n  border-radius: 16px;\n  transition: border-color 0.2s, transform 0.15s;\n}\n.lb-service-card-m3[_ngcontent-%COMP%]:hover {\n  border-color: rgba(200, 162, 64, 0.3);\n  transform: translateY(-2px);\n}\n.lb-cta-gold[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #c8a240,\n      #e8c97a,\n      #c8a240);\n  background-size: 200% auto;\n  color: #080608;\n  transition:\n    background-position 0.4s,\n    transform 0.1s,\n    filter 0.15s;\n}\n.lb-cta-gold[_ngcontent-%COMP%]:hover {\n  background-position: right center;\n  filter: brightness(1.05);\n}\n.lb-cta-gold[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n.lb-pulse-dot[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_lb-pulse-dot 2s ease-in-out infinite;\n}\n.lb-m4-root[_ngcontent-%COMP%] {\n  font-family:\n    "Plus Jakarta Sans",\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n  min-height: 100vh;\n}\n.lb-m4-cover[_ngcontent-%COMP%] {\n  background: #1565c0;\n  position: relative;\n  overflow: hidden;\n}\n.lb-m4-cover[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: -60px;\n  right: -60px;\n  width: 200px;\n  height: 200px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.06);\n}\n.lb-m4-cover[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: -40px;\n  left: -30px;\n  width: 140px;\n  height: 140px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.04);\n}\n.lb-cross-logo[_ngcontent-%COMP%] {\n  width: 68px;\n  height: 68px;\n  background: #fff;\n  border-radius: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  flex-shrink: 0;\n}\n.lb-cross-logo[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  width: 28px;\n  height: 9px;\n  background: #1565c0;\n  border-radius: 3px;\n}\n.lb-cross-logo[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  width: 9px;\n  height: 28px;\n  background: #1565c0;\n  border-radius: 3px;\n}\n.lb-m4-root.dark[_ngcontent-%COMP%]   .lb-cross-logo[_ngcontent-%COMP%] {\n  background: #1a2035;\n}\n.lb-m4-root.dark[_ngcontent-%COMP%]   .lb-cross-logo[_ngcontent-%COMP%]::before, \n.lb-m4-root.dark[_ngcontent-%COMP%]   .lb-cross-logo[_ngcontent-%COMP%]::after {\n  background: #60b8f8;\n}\n.lb-conv-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 12px;\n  border-radius: 12px;\n  background: #fff;\n  border: 1px solid #dbeffe;\n  font-size: 12px;\n  font-weight: 600;\n  color: #1565c0;\n  transition: border-color 0.15s, transform 0.15s;\n}\n.lb-conv-badge[_ngcontent-%COMP%]:hover {\n  border-color: #60b8f8;\n  transform: translateY(-1px);\n}\n.lb-m4-root.dark[_ngcontent-%COMP%]   .lb-conv-badge[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.04);\n  border-color: rgba(96, 184, 248, 0.15);\n  color: #60b8f8;\n}\n.lb-m5-root[_ngcontent-%COMP%] {\n  font-family:\n    "Manrope",\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n  min-height: 100vh;\n}\n.lb-m5-cover[_ngcontent-%COMP%] {\n  background: #1e1b4b;\n  position: relative;\n  overflow: hidden;\n}\n.lb-m5-cover[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: -80px;\n  right: -80px;\n  width: 220px;\n  height: 220px;\n  border-radius: 50%;\n  background: rgba(99, 102, 241, 0.2);\n}\n.lb-m5-cover[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: -50px;\n  left: 40%;\n  width: 160px;\n  height: 160px;\n  border-radius: 50%;\n  background: rgba(99, 102, 241, 0.1);\n}\n.lb-pro-avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 15px;\n  font-weight: 800;\n  color: #fff;\n  flex-shrink: 0;\n  letter-spacing: -0.5px;\n}\n.lb-pro-card[_ngcontent-%COMP%] {\n  transition: transform 0.15s, border-color 0.15s;\n}\n.lb-pro-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n/*# sourceMappingURL=link-bio-public-layouts.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LinkBioPublicLayoutsComponent, [{
    type: Component,
    args: [{ selector: "app-link-bio-public-layouts", standalone: true, imports: [CommonModule, RouterLink], template: `@switch (model) {
  @case (2) {
    <div class="lb-m2-root" [class.dark]="dark">
      <div class="flex justify-end gap-2 px-4 pt-4 absolute top-0 right-0 z-30">
        <button type="button" (click)="onToggleDark()" class="lb-icon-pill flex items-center px-3 py-2 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-sm" aria-label="Alternar tema">
          <svg class="hidden dark:block w-[14px] h-[14px] text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg class="block dark:hidden w-[14px] h-[14px] text-[#7a4f2e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        </button>
        <button type="button" (click)="onShare()" class="lb-icon-pill flex items-center px-3 py-2 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-sm" aria-label="Compartilhar">
          <svg class="w-[14px] h-[14px] text-[#7a4f2e] dark:text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
      </div>

      <div class="lb-wavy-top bg-[#f0e6d6] dark:bg-[#1a130b] pt-16 pb-16 px-6 flex flex-col items-center text-center lb-anim-scale">
        <div class="mb-5 shadow-lg lb-photo-ring">
          <div class="lb-photo-inner">
            @if (clinic.logo_url) {
              <img [src]="clinic.logo_url" [alt]="clinic.name" />
            } @else {
              {{ clinicInitials }}
            }
          </div>
        </div>
        @if (heroTaglineM2) {
          <p class="text-[11px] font-semibold tracking-[.15em] uppercase text-[#5a9e72] dark:text-[#9ec9aa] mb-2">{{ heroTaglineM2 }}</p>
        }
        <h1 class="lb-serif text-[30px] sm:text-[36px] text-[#7a4f2e] dark:text-[#f0e6d6] leading-tight">
          @if (soloNameParts.emphasis) {
            {{ soloNameParts.line1 }}<br /><em>{{ soloNameParts.emphasis }}</em>
          } @else {
            {{ clinic.name }}
          }
        </h1>
        @if (clinic.short_description) {
          <p class="text-[14px] text-[#b8865a] dark:text-[#d4a574] mt-3 max-w-xs leading-relaxed">{{ clinic.short_description }}</p>
        }
      </div>

      <div class="w-full max-w-lg mx-auto px-4 sm:px-6 pb-14 -mt-2">
        <div class="flex justify-center mb-5 lb-anim-f1">
          @if (clinic.is_open_now === true) {
            <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
              <span class="w-[6px] h-[6px] rounded-full bg-emerald-500 inline-block"></span>Dispon\xEDvel para agendamento
            </span>
          } @else if (clinic.is_open_now === false) {
            <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-semibold bg-[#f0e6d6] text-[#b8865a] dark:bg-white/[.05] dark:text-[#d4a574]">
              <span class="w-[6px] h-[6px] rounded-full bg-[#d4a574] inline-block"></span>Fora do hor\xE1rio de atendimento
            </span>
          }
        </div>

        @if (whatsappUrl()) {
          <div class="lb-anim-f2">
            <a [href]="whatsappUrl()" target="_blank" rel="noopener noreferrer" class="lb-wpp-btn w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold text-[15px] no-underline shadow-sm">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.108.549 4.09 1.508 5.814L0 24l6.335-1.489A11.926 11.926 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.5-5.198-1.375l-.372-.22-3.862.908.979-3.763-.242-.386A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
              Agendar pelo WhatsApp
            </a>
          </div>
        }

        <div class="grid grid-cols-2 gap-2.5 mt-2.5 lb-anim-f2">
          @if (clinic.contact_email) {
            <a [href]="'mailto:' + clinic.contact_email" class="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#f0e6d6] dark:bg-white/[.05] hover:bg-[#e8dcc8] dark:hover:bg-white/[.08] text-[#7a4f2e] dark:text-[#f0e6d6] text-[13px] font-semibold no-underline transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              E-mail
            </a>
          }
          @if (clinic.maps_url) {
            <a [href]="clinic.maps_url" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#f0e6d6] dark:bg-white/[.05] hover:bg-[#e8dcc8] dark:hover:bg-white/[.08] text-[#7a4f2e] dark:text-[#f0e6d6] text-[13px] font-semibold no-underline transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Localiza\xE7\xE3o
            </a>
          }
        </div>

        <div class="mt-5 rounded-2xl bg-white dark:bg-white/[.04] border border-[#f0e6d6] dark:border-white/[.06] px-4 pt-4 pb-3 lb-anim-f3">
          <p class="text-[10px] font-semibold tracking-[.12em] uppercase text-[#b8865a] dark:text-[#d4a574] mb-3">Modalidades de atendimento</p>
          <div class="flex flex-col gap-2">
            @for (mod of modalitiesM2; track mod.title) {
              <div class="flex items-center gap-3 py-2 border-b border-[#f0e6d6] dark:border-white/[.05] last:border-0">
                <div class="w-8 h-8 rounded-lg bg-[#deeee2] dark:bg-[#3a6b4a]/20 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-[#5a9e72]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[13px] font-semibold text-[#7a4f2e] dark:text-[#f0e6d6]">{{ mod.title }}</p>
                  @if (mod.subtitle) {
                    <p class="text-[11px] text-[#b8865a] dark:text-[#d4a574]">{{ mod.subtitle }}</p>
                  }
                </div>
                <span class="text-[11px] font-semibold text-[#5a9e72] bg-[#f3f7f4] dark:bg-[#3a6b4a]/20 px-2 py-0.5 rounded-full">{{ mod.available ? 'Dispon\xEDvel' : 'Indispon\xEDvel' }}</span>
              </div>
            }
          </div>
        </div>

        @if (hasAnyHour) {
          <div class="mt-3 rounded-2xl bg-white dark:bg-white/[.04] border border-[#f0e6d6] dark:border-white/[.06] px-4 pt-4 pb-3 lb-anim-f3">
            <p class="text-[10px] font-semibold tracking-[.12em] uppercase text-[#b8865a] dark:text-[#d4a574] mb-3">Agenda</p>
            <div class="grid grid-cols-1 gap-1 text-[12px]">
              @for (row of hoursGridArray; track row.label) {
                @if (row.text !== '\u2013') {
                  <div class="flex justify-between py-1.5 border-b border-[#f0e6d6] dark:border-white/[.05] last:border-0">
                    <span class="text-[#7a4f2e] dark:text-[#d4a574] font-medium">{{ row.label }}</span>
                    <span class="text-[#5a9e72] font-semibold">{{ row.text }}</span>
                  </div>
                }
              }
            </div>
          </div>
        }

        @if (allDocs.length) {
          <div class="mt-5 lb-anim-f4">
            <div class="flex items-center gap-3 mb-1.5">
              <p class="text-[10px] font-semibold tracking-[.12em] uppercase text-[#b8865a] dark:text-[#d4a574] whitespace-nowrap">Documentos</p>
              <div class="flex-1 h-px bg-[#f0e6d6] dark:bg-white/[.06]"></div>
            </div>
            <p class="text-[12px] text-[#b8865a] dark:text-[#d4a574] mb-3">Preencha antes da primeira consulta</p>
            @for (link of allDocs; track trackDoc($index, link)) {
              @if (link.type === 'bio') {
                <a [href]="hrefBio(link.item)" target="_blank" rel="noopener noreferrer" class="lb-link-card flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-white/[.04] border border-[#f0e6d6] dark:border-white/[.06] mb-2.5 no-underline group block text-inherit">
                  <div class="w-10 h-10 rounded-xl bg-[#f3f7f4] dark:bg-[#3a6b4a]/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-[18px] h-[18px] text-[#5a9e72]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[13px] font-semibold text-[#7a4f2e] dark:text-[#f0e6d6]">{{ link.item.label }}</p>
                    <p class="text-[11px] text-[#b8865a] dark:text-[#d4a574] mt-0.5">Abrir documento</p>
                  </div>
                  <svg class="w-4 h-4 text-[#e8dcc8] dark:text-[#7a4f2e] group-hover:text-[#5a9e72] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
              } @else {
                <a [routerLink]="['/f', formToken(link.item)]" class="lb-link-card flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-white/[.04] border border-[#f0e6d6] dark:border-white/[.06] mb-2.5 no-underline group block text-inherit">
                  <div class="w-10 h-10 rounded-xl bg-[#f3f7f4] dark:bg-[#3a6b4a]/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-[18px] h-[18px] text-[#5a9e72]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[13px] font-semibold text-[#7a4f2e] dark:text-[#f0e6d6]">{{ link.item.name }}</p>
                    <p class="text-[11px] text-[#b8865a] dark:text-[#d4a574] mt-0.5">Preenchimento online</p>
                  </div>
                  <svg class="w-4 h-4 text-[#e8dcc8] dark:text-[#7a4f2e] group-hover:text-[#5a9e72] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
              }
            }
          </div>
        }

        <div class="mt-8 pt-5 border-t border-[#f0e6d6] dark:border-white/[.05] flex flex-wrap items-center justify-center gap-2 lb-anim-f5">
          <div class="w-[5px] h-[5px] rounded-full bg-[#5a9e72] opacity-60"></div>
          <span class="text-[11px] text-[#b8865a] dark:text-[#7a5c45]">Fichas digitais por</span>
          <a href="https://gestgo.com.br" target="_blank" rel="noopener noreferrer" class="text-[11px] font-bold text-[#5a9e72] no-underline hover:opacity-75">Gestgo</a>
          <span class="text-[#e8dcc8] dark:text-[#7a4f2e] text-[11px]">\xB7</span>
          <a routerLink="/privacidade" class="text-[11px] text-[#b8865a] no-underline hover:text-[#7a4f2e] transition-colors">Privacidade</a>
        </div>
      </div>
    </div>
  }

  @case (3) {
    <div class="lb-m3-root lb-m3-grid-bg">
      <div class="flex justify-end gap-2 px-4 pt-4 absolute top-0 right-0 z-30">
        <button type="button" (click)="onToggleDark()" class="lb-icon-pill flex items-center px-3 py-2 rounded-full border border-white/10 backdrop-blur-sm bg-white/[.05]" aria-label="Alternar tema">
          <svg class="w-[14px] h-[14px] text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        </button>
        <button type="button" (click)="onShare()" class="lb-icon-pill flex items-center px-3 py-2 rounded-full border border-white/10 backdrop-blur-sm bg-white/[.05]" aria-label="Compartilhar">
          <svg class="w-[14px] h-[14px] text-[#e8c97a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
      </div>

      <div class="lb-m3-cover pt-16 pb-12 px-6 flex flex-col items-center text-center relative lb-anim-f1">
        <div class="logo-ring mb-5 lb-logo-ring-m3 relative z-[1]">
          @if (clinic.logo_url) {
            <img [src]="clinic.logo_url" [alt]="clinic.name" />
          } @else {
            {{ clinicInitials }}
          }
        </div>
        <p class="text-[10px] tracking-[.25em] uppercase text-[#e8c97a]/60 mb-3 font-light relative z-[1]">{{ brandSubtitleM3 }}</p>
        <h1 class="lb-serif-m3 text-[38px] sm:text-[48px] leading-[1.05] font-semibold relative z-[1]">
          <span class="lb-gold-text">{{ m3BrandParts.gold }}</span><br />
          @if (m3BrandParts.plain) {
            <span class="text-[#e8e0d4]">{{ m3BrandParts.plain }}</span>
          }
        </h1>
        @if (clinic.short_description) {
          <p class="text-[13px] text-white/40 mt-4 max-w-xs leading-relaxed font-light tracking-wide relative z-[1]">{{ clinic.short_description }}</p>
        }
        <div class="lb-gold-line w-24 mt-6 relative z-[1]"></div>
      </div>

      <div class="w-full max-w-lg mx-auto px-4 sm:px-6 pb-14">
        <div class="flex justify-center mb-5 lb-anim-f1">
          @if (clinic.is_open_now === true) {
            <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-medium border border-[#e8c97a]/20 bg-[#e8c97a]/5 text-[#e8c97a]">
              <span class="w-[5px] h-[5px] rounded-full bg-[#e8c97a] lb-pulse-dot inline-block"></span>Aberto para consultas
            </span>
          } @else {
            <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-light border border-white/10 text-white/30">
              <span class="w-[5px] h-[5px] rounded-full bg-white/20 inline-block"></span>Fechado \xB7 Consulte hor\xE1rios
            </span>
          }
        </div>

        @if (whatsappUrl()) {
          <div class="lb-anim-f2">
            <a [href]="whatsappUrl()" target="_blank" rel="noopener noreferrer" class="lb-cta-gold w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-[15px] no-underline tracking-wide">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.108.549 4.09 1.508 5.814L0 24l6.335-1.489A11.926 11.926 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.5-5.198-1.375l-.372-.22-3.862.908.979-3.763-.242-.386A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
              Agendar consulta
            </a>
          </div>
        }

        <div class="grid grid-cols-2 gap-2.5 mt-2.5 lb-anim-f2">
          @if (clinic.maps_url) {
            <a [href]="clinic.maps_url" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/[.05] border border-white/10 text-white/60 text-[13px] font-medium no-underline hover:bg-white/[.08]">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Localiza\xE7\xE3o
            </a>
          }
          @if (instagramUrl) {
            <a [href]="instagramUrl" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/[.05] border border-white/10 text-white/60 text-[13px] font-medium no-underline hover:bg-white/[.08]">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              Instagram
            </a>
          }
        </div>

        <div class="mt-6 lb-anim-f3">
          <div class="flex items-center gap-3 mb-3">
            <div class="lb-gold-line flex-1"></div>
            <p class="text-[10px] tracking-[.15em] uppercase text-[#e8c97a]/50 font-light px-2">Procedimentos</p>
            <div class="lb-gold-line flex-1"></div>
          </div>
          <div class="grid grid-cols-3 gap-2.5">
            @for (proc of proceduresM3; track proc) {
              <div class="lb-service-card-m3 p-3 text-center">
                <p class="text-[11px] font-medium text-white/80">{{ proc }}</p>
              </div>
            }
          </div>
        </div>

        @if (hasAnyHour) {
          <div class="mt-5 rounded-2xl border border-[#e8c97a]/10 bg-white/[.02] px-4 pt-4 pb-3 lb-anim-f3">
            <p class="text-[10px] tracking-[.15em] uppercase text-[#e8c97a]/50 font-light mb-3">Funcionamento</p>
            @for (row of hoursGridArray; track row.label) {
              @if (row.text !== '\u2013') {
                <div class="flex justify-between text-[13px] py-2 border-b border-white/[.05] last:border-0">
                  <span class="text-white/70 font-light">{{ row.label }}</span>
                  <span class="text-[#e8c97a] font-medium">{{ row.text }}</span>
                </div>
              }
            }
          </div>
        }

        @if (allDocs.length) {
          <div class="mt-6 lb-anim-f4">
            <div class="flex items-center gap-3 mb-3">
              <div class="lb-gold-line flex-1"></div>
              <p class="text-[10px] tracking-[.15em] uppercase text-[#e8c97a]/50 font-light px-2">Documentos</p>
              <div class="lb-gold-line flex-1"></div>
            </div>
            <p class="text-[12px] text-white/30 font-light mb-3 text-center">Preencha antes do seu procedimento</p>
            @for (link of allDocs; track trackDoc($index, link)) {
              @if (link.type === 'bio') {
                <a [href]="hrefBio(link.item)" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3.5 p-4 rounded-2xl border border-[#e8c97a]/10 bg-transparent mb-2.5 no-underline group block text-inherit hover:bg-[#e8c97a]/5 transition-colors">
                  <div class="w-10 h-10 rounded-xl border border-[#e8c97a]/20 bg-[#e8c97a]/5 flex items-center justify-center flex-shrink-0">
                    <svg class="w-[18px] h-[18px] text-[#e8c97a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[13px] font-medium text-white/80">{{ link.item.label }}</p>
                    <p class="text-[11px] text-white/30 font-light mt-0.5">Abrir documento</p>
                  </div>
                  <svg class="w-4 h-4 text-white/20 group-hover:text-[#e8c97a] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
              } @else {
                <a [routerLink]="['/f', formToken(link.item)]" class="flex items-center gap-3.5 p-4 rounded-2xl border border-[#e8c97a]/10 bg-transparent mb-2.5 no-underline group block text-inherit hover:bg-[#e8c97a]/5 transition-colors">
                  <div class="w-10 h-10 rounded-xl border border-[#e8c97a]/20 bg-[#e8c97a]/5 flex items-center justify-center flex-shrink-0">
                    <svg class="w-[18px] h-[18px] text-[#e8c97a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[13px] font-medium text-white/80">{{ link.item.name }}</p>
                    <p class="text-[11px] text-white/30 font-light mt-0.5">Preenchimento online</p>
                  </div>
                  <svg class="w-4 h-4 text-white/20 group-hover:text-[#e8c97a] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
              }
            }
          </div>
        }

        <div class="mt-8 pt-5 flex flex-col items-center gap-2 lb-anim-f5">
          <div class="lb-gold-line w-16 mb-1"></div>
          <div class="flex flex-wrap items-center justify-center gap-2">
            <span class="text-[11px] text-white/25 font-light">Fichas digitais por</span>
            <a href="https://gestgo.com.br" target="_blank" rel="noopener noreferrer" class="text-[11px] font-medium text-[#e8c97a]/60 no-underline hover:text-[#e8c97a] transition-colors">Gestgo</a>
            <span class="text-white/15 text-[11px]">\xB7</span>
            <a routerLink="/privacidade" class="text-[11px] text-white/25 no-underline hover:text-white/50 transition-colors font-light">Privacidade</a>
          </div>
        </div>
      </div>
    </div>
  }

  @case (4) {
    <div class="lb-m4-root bg-gray-50 dark:bg-[#0c0f14]" [class.dark]="dark">
      <div class="flex justify-end gap-2 px-4 pt-4 absolute top-0 right-0 z-30">
        <button type="button" (click)="onToggleDark()" class="lb-icon-pill flex items-center px-3 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/15" aria-label="Alternar tema">
          <svg class="hidden dark:block w-[14px] h-[14px] text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg class="block dark:hidden w-[14px] h-[14px] text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        </button>
        <button type="button" (click)="onShare()" class="lb-icon-pill flex items-center px-3 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/15" aria-label="Compartilhar">
          <svg class="w-[14px] h-[14px] text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
      </div>

      <div class="lb-m4-cover pt-16 pb-8 px-5 relative z-[1]">
        <div class="flex items-center gap-4 max-w-lg mx-auto relative z-[1]">
          <div class="cross-logo shadow-lg lb-cross-logo"></div>
          <div>
            <p class="text-[10px] font-semibold tracking-[.15em] uppercase text-white/50 mb-1">Odontologia</p>
            <h1 class="text-[26px] sm:text-[30px] font-extrabold text-white leading-tight tracking-tight">{{ clinic.name }}</h1>
            @if (clinic.short_description) {
              <p class="text-[13px] text-white/60 mt-0.5 font-light">{{ clinic.short_description }}</p>
            }
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-3 mt-4 max-w-lg mx-auto relative z-[1]">
          @if (clinic.is_open_now === true) {
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300">
              <span class="w-[5px] h-[5px] rounded-full bg-emerald-400 lb-pulse-dot inline-block"></span>Aberto agora
            </span>
          } @else if (clinic.is_open_now === false) {
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/10 text-white/50">
              <span class="w-[5px] h-[5px] rounded-full bg-white/30 inline-block"></span>Fechado
            </span>
          }
          @if (councilLineM4 || clinic.founded_year) {
            <span class="text-[11px] text-white/40 font-light">{{ councilLineM4 }}{{ councilLineM4 && clinic.founded_year ? ' \xB7 ' : '' }}@if (clinic.founded_year) { Desde {{ clinic.founded_year }} }</span>
          }
        </div>
      </div>

      <div class="w-full max-w-lg mx-auto px-4 sm:px-6 pb-14 pt-5">
        @if (whatsappUrl()) {
          <a [href]="whatsappUrl()" target="_blank" rel="noopener noreferrer" class="lb-wpp-btn w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-[15px] no-underline">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.108.549 4.09 1.508 5.814L0 24l6.335-1.489A11.926 11.926 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.5-5.198-1.375l-.372-.22-3.862.908.979-3.763-.242-.386A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
            Marcar consulta
          </a>
        }

        <div class="grid grid-cols-2 gap-2.5 mt-2.5">
          @if (clinic.maps_url) {
            <a [href]="clinic.maps_url" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white dark:bg-white/[.05] border border-sky-100 dark:border-white/[.06] hover:bg-sky-50 dark:hover:bg-white/[.08] text-sky-700 dark:text-sky-400 text-[13px] font-semibold no-underline">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Como chegar
            </a>
          }
          @if (clinic.contact_email) {
            <a [href]="'mailto:' + clinic.contact_email" class="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white dark:bg-white/[.05] border border-sky-100 dark:border-white/[.06] hover:bg-sky-50 dark:hover:bg-white/[.08] text-sky-700 dark:text-sky-400 text-[13px] font-semibold no-underline">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Contato
            </a>
          }
        </div>

        <div class="mt-5">
          <div class="flex items-center gap-3 mb-3">
            <p class="text-[10px] font-bold tracking-[.1em] uppercase text-gray-400 dark:text-gray-600 whitespace-nowrap">Conv\xEAnios aceitos</p>
            <div class="flex-1 h-px bg-gray-200 dark:bg-white/[.06]"></div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            @for (c of conveniosM4; track c) {
              <div class="lb-conv-badge">
                <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                {{ c }}
              </div>
            }
            <div class="lb-conv-badge col-span-2 justify-center">
              <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              Particular e outros conv\xEAnios
            </div>
          </div>
        </div>

        @if (clinic.specialties_list?.length) {
          <div class="mt-5 rounded-2xl bg-white dark:bg-white/[.03] border border-gray-100 dark:border-white/[.05] px-4 pt-4 pb-3">
            <p class="text-[10px] font-bold tracking-[.1em] uppercase text-gray-400 dark:text-gray-600 mb-3">Especialidades</p>
            <div class="grid grid-cols-3 gap-2">
              @for (spec of clinic.specialties_list!; track spec) {
                <div class="text-center py-2.5 px-1 rounded-xl bg-sky-50 dark:bg-sky-900/10">
                  <p class="text-[11px] font-semibold text-sky-700 dark:text-sky-400">{{ spec }}</p>
                </div>
              }
            </div>
          </div>
        }

        @if (hasAnyHour) {
          <div class="mt-3 rounded-2xl bg-white dark:bg-white/[.03] border border-gray-100 dark:border-white/[.05] px-4 pt-4 pb-3">
            <p class="text-[10px] font-bold tracking-[.1em] uppercase text-gray-400 dark:text-gray-600 mb-3">Funcionamento</p>
            @for (row of hoursGridArray; track row.label) {
              @if (row.text !== '\u2013') {
                <div class="flex justify-between text-[13px] py-2 border-b border-gray-100 dark:border-white/[.05] last:border-0">
                  <span class="font-medium text-gray-700 dark:text-gray-300">{{ row.label }}</span>
                  <span class="font-semibold text-sky-600 dark:text-sky-400">{{ row.text }}</span>
                </div>
              }
            }
          </div>
        }

        @if (allDocs.length) {
          <div class="mt-5">
            <div class="flex items-center gap-3 mb-1.5">
              <p class="text-[10px] font-bold tracking-[.1em] uppercase text-gray-400 dark:text-gray-600 whitespace-nowrap">Documentos</p>
              <div class="flex-1 h-px bg-gray-200 dark:bg-white/[.06]"></div>
            </div>
            <p class="text-[12px] text-gray-400 dark:text-gray-600 mb-3">Preencha antes da sua consulta</p>
            @for (link of allDocs; track trackDoc($index, link)) {
              @if (link.type === 'bio') {
                <a [href]="hrefBio(link.item)" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-white/[.03] border border-gray-100 dark:border-white/[.05] mb-2.5 no-underline group block text-inherit hover:translate-x-[3px] transition-transform">
                  <div class="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/15 flex items-center justify-center flex-shrink-0">
                    <svg class="w-[18px] h-[18px] text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[13px] font-semibold text-gray-800 dark:text-gray-200">{{ link.item.label }}</p>
                    <p class="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5">Abrir documento</p>
                  </div>
                  <svg class="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-sky-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
              } @else {
                <a [routerLink]="['/f', formToken(link.item)]" class="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-white/[.03] border border-gray-100 dark:border-white/[.05] mb-2.5 no-underline group block text-inherit hover:translate-x-[3px] transition-transform">
                  <div class="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/15 flex items-center justify-center flex-shrink-0">
                    <svg class="w-[18px] h-[18px] text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[13px] font-semibold text-gray-800 dark:text-gray-200">{{ link.item.name }}</p>
                    <p class="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5">Preenchimento online</p>
                  </div>
                  <svg class="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-sky-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
              }
            }
          </div>
        }

        @if (clinic.address) {
          <div class="flex items-center gap-2 mt-5">
            <svg class="w-[13px] h-[13px] text-gray-400 dark:text-gray-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span class="text-[12px] text-gray-400 dark:text-gray-600">{{ clinic.address }}</span>
          </div>
        }

        <div class="mt-8 pt-5 border-t border-gray-200 dark:border-white/[.05] flex flex-wrap items-center justify-center gap-2">
          <div class="w-[5px] h-[5px] rounded-full bg-sky-500 opacity-50"></div>
          <span class="text-[11px] text-gray-400 dark:text-gray-600">Fichas digitais por</span>
          <a href="https://gestgo.com.br" target="_blank" rel="noopener noreferrer" class="text-[11px] font-bold text-sky-500 no-underline hover:opacity-75">Gestgo</a>
          <span class="text-gray-300 dark:text-gray-700 text-[11px]">\xB7</span>
          <a routerLink="/privacidade" class="text-[11px] text-gray-400 no-underline hover:text-gray-600 transition-colors">Privacidade</a>
        </div>
      </div>
    </div>
  }

  @case (5) {
    <div class="lb-m5-root bg-gray-50 dark:bg-[#0c0d14]" [class.dark]="dark">
      <div class="flex justify-end gap-2 px-4 pt-4 absolute top-0 right-0 z-30">
        <button type="button" (click)="onToggleDark()" class="lb-icon-pill flex items-center px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10" aria-label="Alternar tema">
          <svg class="hidden dark:block w-[14px] h-[14px] text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg class="block dark:hidden w-[14px] h-[14px] text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        </button>
        <button type="button" (click)="onShare()" class="lb-icon-pill flex items-center px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10" aria-label="Compartilhar">
          <svg class="w-[14px] h-[14px] text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
      </div>

      <div class="lb-m5-cover pt-16 pb-10 px-5 relative z-[1]">
        <div class="max-w-lg mx-auto relative z-[1]">
          <div class="flex items-center gap-3 mb-4 flex-wrap">
            <div class="flex -space-x-2">
              @if (teamPreviewM5.length) {
                @for (t of teamPreviewM5.slice(0, 3); track t.name) {
                  <div class="pro-avatar lb-pro-avatar border-2 border-[#1e1b4b] w-9 h-9 text-[12px]" [ngClass]="t.color">{{ t.initials }}</div>
                }
                @if (teamM5.length > 3) {
                  <div class="w-9 h-9 rounded-[12px] bg-white/10 border-2 border-[#1e1b4b] flex items-center justify-center text-white/60 text-[11px] font-bold">+{{ teamExtraCountM5 }}</div>
                }
              } @else {
                <div class="lb-pro-avatar bg-indigo-500 border-2 border-[#1e1b4b] w-9 h-9 text-[12px]">{{ clinicInitials }}</div>
              }
            </div>
            <div class="h-px flex-1 bg-white/10 min-w-[48px]"></div>
            @if (clinic.is_open_now === true) {
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300">
                <span class="w-[5px] h-[5px] rounded-full bg-emerald-400 lb-pulse-dot inline-block"></span>Aberto agora
              </span>
            } @else if (clinic.is_open_now === false) {
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/10 text-white/40">
                <span class="w-[5px] h-[5px] rounded-full bg-white/25 inline-block"></span>Fechado
              </span>
            }
          </div>
          <h1 class="text-[28px] sm:text-[34px] font-extrabold text-white leading-tight tracking-tight">{{ clinic.name }}</h1>
          @if (clinic.short_description) {
            <p class="text-[13px] text-white/50 mt-1 font-light">{{ clinic.short_description }}</p>
          }
          @if (extra.hero_tagline || teamM5.length || clinic.founded_year) {
            <p class="text-[11px] text-white/30 mt-1">
              @if (extra.hero_tagline) {
                <span>{{ extra.hero_tagline }}</span>
              } @else if (teamM5.length) {
                <span>{{ teamM5.length }} especialista(s)</span>
              }
              @if (clinic.founded_year && (extra.hero_tagline || teamM5.length)) {
                <span> \xB7 </span>
              }
              @if (clinic.founded_year) {
                <span>Desde {{ clinic.founded_year }}</span>
              }
            </p>
          }
        </div>
      </div>

      <div class="w-full max-w-lg mx-auto px-4 sm:px-6 pb-14 pt-5">
        @if (whatsappUrl()) {
          <a [href]="whatsappUrl()" target="_blank" rel="noopener noreferrer" class="lb-wpp-btn w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-[15px] no-underline">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.108.549 4.09 1.508 5.814L0 24l6.335-1.489A11.926 11.926 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.5-5.198-1.375l-.372-.22-3.862.908.979-3.763-.242-.386A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
            Falar com a recep\xE7\xE3o
          </a>
        }

        <div class="grid grid-cols-2 gap-2.5 mt-2.5">
          @if (clinic.maps_url) {
            <a [href]="clinic.maps_url" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white dark:bg-white/[.05] border border-gray-100 dark:border-white/[.06] hover:bg-gray-50 dark:hover:bg-white/[.08] text-gray-600 dark:text-gray-400 text-[13px] font-semibold no-underline">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Como chegar
            </a>
          }
          @if (clinic.contact_email) {
            <a [href]="'mailto:' + clinic.contact_email" class="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white dark:bg-white/[.05] border border-gray-100 dark:border-white/[.06] hover:bg-gray-50 dark:hover:bg-white/[.08] text-gray-600 dark:text-gray-400 text-[13px] font-semibold no-underline">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Contato
            </a>
          }
        </div>

        @if (teamM5.length) {
          <div class="mt-6">
            <div class="flex items-center gap-3 mb-3">
              <p class="text-[10px] font-bold tracking-[.1em] uppercase text-gray-400 dark:text-gray-600 whitespace-nowrap">Nossa equipe</p>
              <div class="flex-1 h-px bg-gray-200 dark:bg-white/[.06]"></div>
            </div>
            @for (m of teamM5.slice(0, 8); track $index) {
              <div class="lb-pro-card flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-white/[.03] border border-gray-100 dark:border-white/[.05] mb-2.5">
                <div class="lb-pro-avatar" [ngClass]="teamAvatarColor($index)">{{ initialsFromName(m.name) }}</div>
                <div class="flex-1 min-w-0">
                  <p class="text-[13px] font-bold text-gray-800 dark:text-gray-200">{{ m.name }}</p>
                  @if (m.credential) {
                    <p class="text-[11px] text-indigo-500 dark:text-indigo-400 font-semibold">{{ m.credential }}</p>
                  }
                  @if (m.notes) {
                    <p class="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5">{{ m.notes }}</p>
                  }
                </div>
                @if (waUrlForMember(m.whatsapp)) {
                  <a [href]="waUrlForMember(m.whatsapp)" target="_blank" rel="noopener noreferrer" class="flex-shrink-0 w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center no-underline hover:bg-emerald-100 transition-colors">
                    <svg class="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.108.549 4.09 1.508 5.814L0 24l6.335-1.489A11.926 11.926 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.5-5.198-1.375l-.372-.22-3.862.908.979-3.763-.242-.386A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                  </a>
                }
              </div>
            }
            @if (teamM5.length > 3) {
              <button type="button" class="w-full py-3 rounded-2xl border border-dashed border-gray-200 dark:border-white/[.08] text-[13px] font-semibold text-gray-400 dark:text-gray-600 hover:border-indigo-300 hover:text-indigo-400 transition-colors bg-transparent">
                Ver toda a equipe (+{{ teamM5.length - 3 }})
              </button>
            }
          </div>
        }

        @if (hasAnyHour) {
          <div class="mt-5 rounded-2xl bg-white dark:bg-white/[.03] border border-gray-100 dark:border-white/[.05] px-4 pt-4 pb-3">
            <p class="text-[10px] font-bold tracking-[.1em] uppercase text-gray-400 dark:text-gray-600 mb-3">Funcionamento</p>
            @for (row of hoursGridArray; track row.label) {
              @if (row.text !== '\u2013') {
                <div class="flex justify-between text-[13px] py-2 border-b border-gray-100 dark:border-white/[.05] last:border-0">
                  <span class="font-medium text-gray-700 dark:text-gray-300">{{ row.label }}</span>
                  <span class="font-semibold text-indigo-500 dark:text-indigo-400">{{ row.text }}</span>
                </div>
              }
            }
          </div>
        }

        @if (allDocs.length) {
          <div class="mt-5">
            <div class="flex items-center gap-3 mb-1.5">
              <p class="text-[10px] font-bold tracking-[.1em] uppercase text-gray-400 dark:text-gray-600 whitespace-nowrap">Documentos gerais</p>
              <div class="flex-1 h-px bg-gray-200 dark:bg-white/[.06]"></div>
            </div>
            <p class="text-[12px] text-gray-400 dark:text-gray-600 mb-3">Preencha antes da sua primeira consulta</p>
            @for (link of allDocs; track trackDoc($index, link)) {
              @if (link.type === 'bio') {
                <a [href]="hrefBio(link.item)" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-white/[.03] border border-gray-100 dark:border-white/[.05] mb-2.5 no-underline group block text-inherit hover:translate-x-[3px] transition-transform">
                  <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-[18px] h-[18px] text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[13px] font-semibold text-gray-800 dark:text-gray-200">{{ link.item.label }}</p>
                    <p class="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5">Abrir documento</p>
                  </div>
                  <svg class="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-indigo-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
              } @else {
                <a [routerLink]="['/f', formToken(link.item)]" class="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-white/[.03] border border-gray-100 dark:border-white/[.05] mb-2.5 no-underline group block text-inherit hover:translate-x-[3px] transition-transform">
                  <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-[18px] h-[18px] text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[13px] font-semibold text-gray-800 dark:text-gray-200">{{ link.item.name }}</p>
                    <p class="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5">Preenchimento online</p>
                  </div>
                  <svg class="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-indigo-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
              }
            }
          </div>
        }

        @if (clinic.address) {
          <div class="flex items-center gap-2 mt-5">
            <svg class="w-[13px] h-[13px] text-gray-400 dark:text-gray-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span class="text-[12px] text-gray-400 dark:text-gray-600">{{ clinic.address }}</span>
          </div>
        }

        <div class="mt-8 pt-5 border-t border-gray-200 dark:border-white/[.05] flex flex-wrap items-center justify-center gap-2">
          <div class="w-[5px] h-[5px] rounded-full bg-indigo-500 opacity-50"></div>
          <span class="text-[11px] text-gray-400 dark:text-gray-600">Fichas digitais por</span>
          <a href="https://gestgo.com.br" target="_blank" rel="noopener noreferrer" class="text-[11px] font-bold text-indigo-500 no-underline hover:opacity-75">Gestgo</a>
          <span class="text-gray-300 dark:text-gray-700 text-[11px]">\xB7</span>
          <a routerLink="/privacidade" class="text-[11px] text-gray-400 no-underline hover:text-gray-600 transition-colors">Privacidade</a>
        </div>
      </div>
    </div>
  }
}
`, styles: ['@import "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";\n\n/* src/app/paginas/link-bio-public/link-bio-public-layouts.component.css */\n:host {\n  display: block;\n}\n.lb-m2-root {\n  font-family:\n    "DM Sans",\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n  background: #faf6f1;\n  color: #2e2840;\n}\n.lb-m2-root.dark {\n  background: #0f0d0b;\n  color: #f3f7f4;\n}\n.lb-m2-root h1,\n.lb-m2-root .lb-serif {\n  font-family:\n    "Playfair Display",\n    ui-serif,\n    Georgia,\n    serif;\n}\n.lb-wavy-top {\n  position: relative;\n  overflow: hidden;\n}\n.lb-wavy-top::after {\n  content: "";\n  position: absolute;\n  bottom: -2px;\n  left: -5%;\n  width: 110%;\n  height: 60px;\n  background: #faf6f1;\n  border-radius: 50% 50% 0 0 / 100% 100% 0 0;\n}\n.lb-m2-root.dark .lb-wavy-top::after {\n  background: #0f0d0b;\n}\n.lb-photo-ring {\n  width: 110px;\n  height: 110px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #9ec9aa,\n      #d4a574);\n  padding: 3px;\n  flex-shrink: 0;\n}\n.lb-photo-inner {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  background: #c8a882;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: "Playfair Display", serif;\n  font-size: 36px;\n  font-weight: 700;\n  color: #fff;\n  letter-spacing: -1px;\n  overflow: hidden;\n}\n.lb-photo-inner img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 50%;\n}\n.lb-link-card {\n  transition: transform 0.15s, background-color 0.15s;\n}\n.lb-link-card:hover {\n  transform: translateY(-2px);\n}\n.lb-wpp-btn {\n  transition: filter 0.15s, transform 0.1s;\n}\n.lb-wpp-btn:hover {\n  filter: brightness(1.07);\n}\n.lb-wpp-btn:active {\n  transform: scale(0.98);\n}\n.lb-icon-pill {\n  cursor: pointer;\n  border: none;\n  background: transparent;\n  transition: opacity 0.15s;\n}\n.lb-icon-pill:hover {\n  opacity: 0.6;\n}\n@keyframes lb-fade-in {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes lb-scale-in {\n  from {\n    opacity: 0;\n    transform: scale(0.94);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes lb-shimmer {\n  0% {\n    background-position: 200% center;\n  }\n  100% {\n    background-position: -200% center;\n  }\n}\n@keyframes lb-pulse-dot {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.3;\n  }\n}\n.lb-anim-scale {\n  animation: lb-scale-in 0.5s ease both;\n}\n.lb-anim-f1 {\n  animation: lb-fade-in 0.6s ease both;\n}\n.lb-anim-f2 {\n  animation: lb-fade-in 0.6s 0.1s ease both;\n}\n.lb-anim-f3 {\n  animation: lb-fade-in 0.6s 0.2s ease both;\n}\n.lb-anim-f4 {\n  animation: lb-fade-in 0.6s 0.3s ease both;\n}\n.lb-anim-f5 {\n  animation: lb-fade-in 0.6s 0.4s ease both;\n}\n.lb-m3-root {\n  font-family:\n    "Outfit",\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n  background: #080608;\n  color: #e8e0d4;\n  min-height: 100vh;\n}\n.lb-m3-root h1,\n.lb-m3-root .lb-serif-m3 {\n  font-family:\n    "Cormorant Garamond",\n    ui-serif,\n    Georgia,\n    serif;\n}\n.lb-m3-grid-bg {\n  background-image:\n    linear-gradient(rgba(200, 162, 64, 0.04) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(200, 162, 64, 0.04) 1px,\n      transparent 1px);\n  background-size: 40px 40px;\n}\n.lb-m3-cover {\n  background:\n    linear-gradient(\n      180deg,\n      #1a1720 0%,\n      #080608 100%);\n  position: relative;\n  overflow: hidden;\n}\n.lb-m3-cover::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(\n      ellipse 80% 50% at 50% 0%,\n      rgba(200, 162, 64, 0.12) 0%,\n      transparent 70%);\n  pointer-events: none;\n}\n.lb-gold-text {\n  background:\n    linear-gradient(\n      90deg,\n      #c8a240,\n      #f0d080,\n      #c8a240,\n      #f0d080);\n  background-size: 300% auto;\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  animation: lb-shimmer 4s linear infinite;\n}\n.lb-logo-ring-m3 {\n  width: 80px;\n  height: 80px;\n  border-radius: 20px;\n  border: 1px solid rgba(200, 162, 64, 0.35);\n  background: #1a1720;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: "Cormorant Garamond", serif;\n  font-size: 28px;\n  font-weight: 600;\n  color: #c8a240;\n  letter-spacing: 1px;\n  overflow: hidden;\n}\n.lb-logo-ring-m3 img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.lb-gold-line {\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(200, 162, 64, 0.4),\n      transparent);\n}\n.lb-service-card-m3 {\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(200, 162, 64, 0.12);\n  border-radius: 16px;\n  transition: border-color 0.2s, transform 0.15s;\n}\n.lb-service-card-m3:hover {\n  border-color: rgba(200, 162, 64, 0.3);\n  transform: translateY(-2px);\n}\n.lb-cta-gold {\n  background:\n    linear-gradient(\n      135deg,\n      #c8a240,\n      #e8c97a,\n      #c8a240);\n  background-size: 200% auto;\n  color: #080608;\n  transition:\n    background-position 0.4s,\n    transform 0.1s,\n    filter 0.15s;\n}\n.lb-cta-gold:hover {\n  background-position: right center;\n  filter: brightness(1.05);\n}\n.lb-cta-gold:active {\n  transform: scale(0.98);\n}\n.lb-pulse-dot {\n  animation: lb-pulse-dot 2s ease-in-out infinite;\n}\n.lb-m4-root {\n  font-family:\n    "Plus Jakarta Sans",\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n  min-height: 100vh;\n}\n.lb-m4-cover {\n  background: #1565c0;\n  position: relative;\n  overflow: hidden;\n}\n.lb-m4-cover::before {\n  content: "";\n  position: absolute;\n  top: -60px;\n  right: -60px;\n  width: 200px;\n  height: 200px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.06);\n}\n.lb-m4-cover::after {\n  content: "";\n  position: absolute;\n  bottom: -40px;\n  left: -30px;\n  width: 140px;\n  height: 140px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.04);\n}\n.lb-cross-logo {\n  width: 68px;\n  height: 68px;\n  background: #fff;\n  border-radius: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  flex-shrink: 0;\n}\n.lb-cross-logo::before {\n  content: "";\n  position: absolute;\n  width: 28px;\n  height: 9px;\n  background: #1565c0;\n  border-radius: 3px;\n}\n.lb-cross-logo::after {\n  content: "";\n  position: absolute;\n  width: 9px;\n  height: 28px;\n  background: #1565c0;\n  border-radius: 3px;\n}\n.lb-m4-root.dark .lb-cross-logo {\n  background: #1a2035;\n}\n.lb-m4-root.dark .lb-cross-logo::before,\n.lb-m4-root.dark .lb-cross-logo::after {\n  background: #60b8f8;\n}\n.lb-conv-badge {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 12px;\n  border-radius: 12px;\n  background: #fff;\n  border: 1px solid #dbeffe;\n  font-size: 12px;\n  font-weight: 600;\n  color: #1565c0;\n  transition: border-color 0.15s, transform 0.15s;\n}\n.lb-conv-badge:hover {\n  border-color: #60b8f8;\n  transform: translateY(-1px);\n}\n.lb-m4-root.dark .lb-conv-badge {\n  background: rgba(255, 255, 255, 0.04);\n  border-color: rgba(96, 184, 248, 0.15);\n  color: #60b8f8;\n}\n.lb-m5-root {\n  font-family:\n    "Manrope",\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n  min-height: 100vh;\n}\n.lb-m5-cover {\n  background: #1e1b4b;\n  position: relative;\n  overflow: hidden;\n}\n.lb-m5-cover::before {\n  content: "";\n  position: absolute;\n  top: -80px;\n  right: -80px;\n  width: 220px;\n  height: 220px;\n  border-radius: 50%;\n  background: rgba(99, 102, 241, 0.2);\n}\n.lb-m5-cover::after {\n  content: "";\n  position: absolute;\n  bottom: -50px;\n  left: 40%;\n  width: 160px;\n  height: 160px;\n  border-radius: 50%;\n  background: rgba(99, 102, 241, 0.1);\n}\n.lb-pro-avatar {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 15px;\n  font-weight: 800;\n  color: #fff;\n  flex-shrink: 0;\n  letter-spacing: -0.5px;\n}\n.lb-pro-card {\n  transition: transform 0.15s, border-color 0.15s;\n}\n.lb-pro-card:hover {\n  transform: translateY(-2px);\n}\n/*# sourceMappingURL=link-bio-public-layouts.component.css.map */\n'] }]
  }], null, { model: [{
    type: Input,
    args: [{ required: true }]
  }], clinic: [{
    type: Input,
    args: [{ required: true }]
  }], bioLinks: [{
    type: Input,
    args: [{ required: true }]
  }], dark: [{
    type: Input
  }], allDocs: [{
    type: Input
  }], publicSlug: [{
    type: Input
  }], linkBioPreview: [{
    type: Input
  }], toggleDark: [{
    type: Output
  }], share: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LinkBioPublicLayoutsComponent, { className: "LinkBioPublicLayoutsComponent", filePath: "src/app/paginas/link-bio-public/link-bio-public-layouts.component.ts", lineNumber: 19 });
})();

// src/app/paginas/link-bio-public/link-bio-public-layout-generic.component.ts
var _c02 = (a0) => ["/f", a0];
function LinkBioPublicLayoutGenericComponent_Conditional_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 33);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r0.clinic.cover_image_url, \u0275\u0275sanitizeUrl)("alt", ctx_r0.clinic.name);
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_12_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 34);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngStyle", ctx_r0.coverStyle());
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275conditionalCreate(1, LinkBioPublicLayoutGenericComponent_Conditional_12_Conditional_1_Template, 1, 2, "img", 33)(2, LinkBioPublicLayoutGenericComponent_Conditional_12_Conditional_2_Template, 1, 1, "div", 34);
    \u0275\u0275element(3, "div", 35)(4, "div", 36);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.coverMode === "banner" && ctx_r0.hasCoverImage && ctx_r0.clinic.cover_image_url ? 1 : 2);
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 14);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.clinic.logo_url, \u0275\u0275sanitizeUrl)("alt", ctx_r0.clinic.name);
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.clinicInitials);
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.clinic.short_description);
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.clinic.specialties_list[0]);
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1, "Cl\xEDnica");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275element(1, "span", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("closed", !ctx_r0.clinic.is_open_now);
    \u0275\u0275advance();
    \u0275\u0275classProp("closed", !ctx_r0.clinic.is_open_now);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.clinic.is_open_now ? "Aberta agora" : "Fechada agora", " ");
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Desde ", ctx_r0.clinic.founded_year);
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 39);
    \u0275\u0275element(2, "path", 40)(3, "path", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Falar pelo WhatsApp ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("href", ctx_r0.whatsappUrl(), \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_28_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 42);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 44);
    \u0275\u0275element(2, "path", 45)(3, "circle", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Como chegar ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r0.clinic.maps_url, \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_28_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 43);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 44);
    \u0275\u0275element(2, "path", 47)(3, "polyline", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Contato ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", "mailto:" + ctx_r0.clinic.contact_email, \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275conditionalCreate(1, LinkBioPublicLayoutGenericComponent_Conditional_28_Conditional_1_Template, 5, 1, "a", 42);
    \u0275\u0275conditionalCreate(2, LinkBioPublicLayoutGenericComponent_Conditional_28_Conditional_2_Template, 5, 1, "a", 43);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.clinic.maps_url ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.clinic.contact_email ? 2 : -1);
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "p", 49);
    \u0275\u0275text(2, "Hor\xE1rio de funcionamento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 50)(4, "span", 51);
    \u0275\u0275text(5, "Segunda a Sexta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 52);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 53)(9, "span", 54);
    \u0275\u0275text(10, "S\xE1bado e Domingo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 55);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.weekdayHoursText);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.weekendHoursText);
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_30_For_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 59)(1, "div", 61);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 62);
    \u0275\u0275element(3, "path", 63)(4, "polyline", 64)(5, "line", 65)(6, "line", 66);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div", 67)(8, "p", 68);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 69);
    \u0275\u0275text(11, "Abrir documento");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 70);
    \u0275\u0275element(13, "polyline", 71);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r0.hrefBioLink(link_r2.item), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(link_r2.item.label);
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_30_For_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 60)(1, "div", 61);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 62);
    \u0275\u0275element(3, "path", 63)(4, "polyline", 64)(5, "line", 72)(6, "line", 73);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div", 67)(8, "p", 68);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 69);
    \u0275\u0275text(11, "Preenchimento online");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 70);
    \u0275\u0275element(13, "polyline", 71);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c02, ctx_r0.formToken(link_r2.item)));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(link_r2.item.name);
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_30_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LinkBioPublicLayoutGenericComponent_Conditional_30_For_8_Conditional_0_Template, 14, 2, "a", 59)(1, LinkBioPublicLayoutGenericComponent_Conditional_30_For_8_Conditional_1_Template, 14, 4, "a", 60);
  }
  if (rf & 2) {
    const link_r2 = ctx.$implicit;
    \u0275\u0275conditional(link_r2.type === "bio" ? 0 : 1);
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 56)(2, "p", 49);
    \u0275\u0275text(3, "Documentos");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "div", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 58);
    \u0275\u0275text(6, "Preencha antes do seu atendimento ou procedimento");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, LinkBioPublicLayoutGenericComponent_Conditional_30_For_8_Template, 2, 1, null, null, \u0275\u0275componentInstance().trackDoc, true);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r0.allLinks);
  }
}
function LinkBioPublicLayoutGenericComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1, "Nenhum link dispon\xEDvel no momento.");
    \u0275\u0275elementEnd();
  }
}
var LinkBioPublicLayoutGenericComponent = class _LinkBioPublicLayoutGenericComponent {
  linkBioService = inject(LinkBioService);
  clinic;
  allLinks = [];
  publicSlug = "";
  linkBioPreview = false;
  dark = false;
  /** Dentro do iframe da landing (sem forçar 100vh). */
  embedMode = false;
  toggleDark = new EventEmitter();
  share = new EventEmitter();
  onToggleDark() {
    this.toggleDark.emit();
  }
  onShare() {
    this.share.emit();
  }
  hrefBioLink(link) {
    return this.linkBioService.outboundBioLinkUrl(this.publicSlug, link, this.linkBioPreview);
  }
  formToken(f) {
    const parts = f.public_url.split("/f/");
    return parts.length > 1 ? parts[1].split("?")[0] : "";
  }
  get hasCoverImage() {
    return !!this.clinic?.cover_image_url;
  }
  get hasCoverColor() {
    return !!this.clinic?.cover_color;
  }
  get hasCover() {
    if (this.coverMode === "none")
      return false;
    if (this.coverMode === "solid")
      return true;
    return this.hasCoverImage || this.hasCoverColor;
  }
  get coverMode() {
    const mode = this.clinic?.cover_mode;
    if (mode === "none" || mode === "solid" || mode === "banner")
      return mode;
    return "banner";
  }
  coverStyle() {
    const color = this.clinic?.cover_color ?? "#1a1a2e";
    return { "background-color": color };
  }
  accentHex() {
    return this.clinic?.accent_hex ?? "#1a1a2e";
  }
  themeVars() {
    return { "--accent": this.accentHex() };
  }
  get hoursGridArray() {
    const grid = this.clinic?.business_hours_grid;
    if (!grid || typeof grid !== "object")
      return [];
    const order = ["1", "2", "3", "4", "5", "6", "7"];
    return order.map((k) => grid[k]).filter(Boolean);
  }
  get hasAnyHour() {
    return this.hoursGridArray.some((d) => d.text !== "\u2013");
  }
  get weekdayHoursText() {
    const weekdays = this.hoursGridArray.slice(0, 5).map((d) => d.text).filter((t) => t && t !== "\u2013");
    if (!weekdays.length)
      return "Fechado";
    const first = weekdays[0];
    const allEqual = weekdays.every((h) => h === first);
    return allEqual ? first : "Hor\xE1rios vari\xE1veis";
  }
  get weekendHoursText() {
    const weekends = this.hoursGridArray.slice(5, 7).map((d) => d.text).filter((t) => t && t !== "\u2013");
    if (!weekends.length)
      return "Fechado";
    const first = weekends[0];
    const allEqual = weekends.every((h) => h === first);
    return allEqual ? first : "Hor\xE1rios vari\xE1veis";
  }
  get clinicInitials() {
    const name = this.clinic?.name?.trim() ?? "";
    if (!name)
      return "GG";
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1)
      return parts[0].slice(0, 2).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  whatsappUrl() {
    const phone = this.clinic?.phone?.replace(/\D/g, "") ?? "";
    const wa = phone.length >= 10 && phone.length <= 11 ? "55" + phone : phone;
    return wa ? `https://wa.me/${wa}` : "";
  }
  trackDoc(_i, link) {
    return link.type === "bio" ? link.item.id : `${link.item.id}_form`;
  }
  static \u0275fac = function LinkBioPublicLayoutGenericComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LinkBioPublicLayoutGenericComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LinkBioPublicLayoutGenericComponent, selectors: [["app-link-bio-public-layout-generic"]], inputs: { clinic: "clinic", allLinks: "allLinks", publicSlug: "publicSlug", linkBioPreview: "linkBioPreview", dark: "dark", embedMode: "embedMode" }, outputs: { toggleDark: "toggleDark", share: "share" }, decls: 42, vars: 20, consts: [[1, "page", 3, "ngStyle"], [1, "topbar"], ["type", "button", "aria-label", "Alternar tema", 1, "icon-pill", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "icon"], ["d", "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"], ["type", "button", "aria-label", "Compartilhar", 1, "icon-pill", 3, "click"], ["cx", "18", "cy", "5", "r", "3"], ["cx", "6", "cy", "12", "r", "3"], ["cx", "18", "cy", "19", "r", "3"], ["x1", "8.59", "y1", "13.51", "x2", "15.42", "y2", "17.49"], ["x1", "15.41", "y1", "6.51", "x2", "8.59", "y2", "10.49"], [1, "cover"], [1, "content"], [1, "avatar-wrap"], [1, "avatar-img", 3, "src", "alt"], [1, "avatar-fallback"], [1, "head"], [1, "subtitle"], [1, "meta"], [1, "chip"], [1, "status", 3, "closed"], [1, "meta-year"], [1, "divider"], ["target", "_blank", "rel", "noopener noreferrer", 1, "btn-wa", 3, "href"], [1, "secondary"], [1, "hours"], [1, "docs"], [1, "muted", "empty"], [1, "footer"], [1, "dot-static"], [1, "muted"], ["href", "https://gestgo.com.br", "target", "_blank", "rel", "noopener noreferrer"], ["routerLink", "/privacidade", "target", "_blank", "rel", "noopener noreferrer", 1, "muted"], [1, "cover-img", 3, "src", "alt"], [1, "cover-fill", 3, "ngStyle"], [1, "cover-pattern"], [1, "cover-line"], [1, "status"], [1, "dot"], ["viewBox", "0 0 24 24", "fill", "currentColor", 1, "wa-icon"], ["d", "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"], ["d", "M12 0C5.373 0 0 5.373 0 12c0 2.108.549 4.09 1.508 5.814L0 24l6.335-1.489A11.926 11.926 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zM12 22c-1.89 0-3.663-.5-5.198-1.375l-.372-.22-3.862.908.979-3.763-.242-.386A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"], ["target", "_blank", "rel", "noopener noreferrer", 1, "sec-btn", 3, "href"], [1, "sec-btn", 3, "href"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "sec-icon"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"], ["cx", "12", "cy", "10", "r", "3"], ["d", "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"], ["points", "22,6 12,13 2,6"], [1, "section-title"], [1, "hour-row"], [1, "hour-label", "strong"], [1, "hour-value"], [1, "hour-row", "muted-row"], [1, "hour-label"], [1, "hour-value", "muted-value"], [1, "docs-head"], [1, "line"], [1, "docs-sub"], ["target", "_blank", "rel", "noopener noreferrer", 1, "doc-card", 3, "href"], [1, "doc-card", 3, "routerLink"], [1, "doc-icon-wrap"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "doc-icon"], ["d", "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"], ["points", "14 2 14 8 20 8"], ["x1", "16", "y1", "13", "x2", "8", "y2", "13"], ["x1", "16", "y1", "17", "x2", "8", "y2", "17"], [1, "doc-text"], [1, "doc-title"], [1, "doc-sub"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "arrow"], ["points", "9 18 15 12 9 6"], ["x1", "12", "y1", "18", "x2", "12", "y2", "12"], ["x1", "9", "y1", "15", "x2", "15", "y2", "15"]], template: function LinkBioPublicLayoutGenericComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275listener("click", function LinkBioPublicLayoutGenericComponent_Template_button_click_2_listener() {
        return ctx.onToggleDark();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(3, "svg", 3);
      \u0275\u0275element(4, "path", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(5, "button", 5);
      \u0275\u0275listener("click", function LinkBioPublicLayoutGenericComponent_Template_button_click_5_listener() {
        return ctx.onShare();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(6, "svg", 3);
      \u0275\u0275element(7, "circle", 6)(8, "circle", 7)(9, "circle", 8)(10, "line", 9)(11, "line", 10);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(12, LinkBioPublicLayoutGenericComponent_Conditional_12_Template, 5, 1, "div", 11);
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(13, "div", 12)(14, "div", 13);
      \u0275\u0275conditionalCreate(15, LinkBioPublicLayoutGenericComponent_Conditional_15_Template, 1, 2, "img", 14)(16, LinkBioPublicLayoutGenericComponent_Conditional_16_Template, 2, 1, "div", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 16)(18, "h1");
      \u0275\u0275text(19);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(20, LinkBioPublicLayoutGenericComponent_Conditional_20_Template, 2, 1, "p", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 18);
      \u0275\u0275conditionalCreate(22, LinkBioPublicLayoutGenericComponent_Conditional_22_Template, 2, 1, "span", 19)(23, LinkBioPublicLayoutGenericComponent_Conditional_23_Template, 2, 0, "span", 19);
      \u0275\u0275conditionalCreate(24, LinkBioPublicLayoutGenericComponent_Conditional_24_Template, 3, 5, "span", 20);
      \u0275\u0275conditionalCreate(25, LinkBioPublicLayoutGenericComponent_Conditional_25_Template, 2, 1, "span", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275element(26, "div", 22);
      \u0275\u0275conditionalCreate(27, LinkBioPublicLayoutGenericComponent_Conditional_27_Template, 5, 1, "a", 23);
      \u0275\u0275conditionalCreate(28, LinkBioPublicLayoutGenericComponent_Conditional_28_Template, 3, 2, "div", 24);
      \u0275\u0275conditionalCreate(29, LinkBioPublicLayoutGenericComponent_Conditional_29_Template, 13, 2, "div", 25);
      \u0275\u0275conditionalCreate(30, LinkBioPublicLayoutGenericComponent_Conditional_30_Template, 9, 0, "div", 26)(31, LinkBioPublicLayoutGenericComponent_Conditional_31_Template, 2, 0, "p", 27);
      \u0275\u0275elementStart(32, "div", 28);
      \u0275\u0275element(33, "span", 29);
      \u0275\u0275elementStart(34, "span", 30);
      \u0275\u0275text(35, "Fichas digitais por");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "a", 31);
      \u0275\u0275text(37, "Gestgo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "span", 30);
      \u0275\u0275text(39, "\xB7");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "a", 32);
      \u0275\u0275text(41, "Privacidade");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("dark", ctx.dark)("page-embed", ctx.embedMode);
      \u0275\u0275property("ngStyle", ctx.themeVars());
      \u0275\u0275advance();
      \u0275\u0275classProp("topbar-no-cover", !ctx.hasCover);
      \u0275\u0275advance(11);
      \u0275\u0275conditional(ctx.hasCover ? 12 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("avatar-over-cover", ctx.hasCover);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.clinic.logo_url ? 15 : 16);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.clinic.name);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.clinic.short_description ? 20 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((ctx.clinic.specialties_list == null ? null : ctx.clinic.specialties_list.length) ? 22 : 23);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.clinic.is_open_now !== null && ctx.clinic.is_open_now !== void 0 ? 24 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.clinic.founded_year ? 25 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.clinic.phone ? 27 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.clinic.maps_url || ctx.clinic.contact_email ? 28 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasAnyHour ? 29 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.allLinks.length ? 30 : 31);
    }
  }, dependencies: [CommonModule, NgStyle, RouterLink], styles: ['@import "https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&display=swap";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n}\n*[_ngcontent-%COMP%], \n*[_ngcontent-%COMP%]::before, \n*[_ngcontent-%COMP%]::after {\n  box-sizing: border-box;\n}\n.page[_ngcontent-%COMP%] {\n  --accent: #1a6fbf;\n  min-height: 100vh;\n  background: #f9fafb;\n  color: #111827;\n  font-family:\n    "Geist Sans",\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n  --c-border: #e5e7eb;\n  --c-surface: #ffffff;\n  --c-soft: #f3f4f6;\n  --skeleton-base: #e2e8f0;\n  --skeleton-highlight: #f8fafc;\n}\n.page.dark[_ngcontent-%COMP%] {\n  background: #0a0c0f;\n  color: #f9fafb;\n  --c-border: rgba(255, 255, 255, 0.1);\n  --c-surface: #13161c;\n  --c-soft: #0d1016;\n  --skeleton-base: #252b36;\n  --skeleton-highlight: #3d4654;\n}\n.topbar[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 20;\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  padding: 1rem;\n}\n.topbar.topbar-no-cover[_ngcontent-%COMP%] {\n  position: static;\n  width: 100%;\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 0.75rem 1rem 0;\n}\n.topbar.topbar-no-cover[_ngcontent-%COMP%]   .icon-pill[_ngcontent-%COMP%] {\n  border: 1px solid #e5e7eb;\n  background: #f3f4f6;\n  color: #4b5563;\n  -webkit-backdrop-filter: none;\n  backdrop-filter: none;\n}\n.page.dark[_ngcontent-%COMP%]   .topbar.topbar-no-cover[_ngcontent-%COMP%]   .icon-pill[_ngcontent-%COMP%] {\n  border-color: rgba(255, 255, 255, 0.1);\n  background: rgba(255, 255, 255, 0.08);\n  color: rgba(255, 255, 255, 0.85);\n}\n.icon-pill[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  background: rgba(255, 255, 255, 0.1);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  color: rgba(255, 255, 255, 0.9);\n  border-radius: 999px;\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: opacity .15s ease, transform .1s ease;\n}\n.icon-pill[_ngcontent-%COMP%]:hover {\n  opacity: .7;\n}\n.icon-pill[_ngcontent-%COMP%]:active {\n  transform: scale(.95);\n}\n.icon[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n}\n.cover[_ngcontent-%COMP%] {\n  position: relative;\n  height: 176px;\n  overflow: hidden;\n  background: #0b1628;\n}\n.cover-img[_ngcontent-%COMP%], \n.cover-fill[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.cover-pattern[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-image:\n    radial-gradient(\n      circle,\n      rgba(255, 255, 255, .1) 1px,\n      transparent 1px);\n  background-size: 22px 22px;\n}\n.cover-line[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 3px;\n  background: var(--accent);\n  opacity: 0.55;\n}\n.content[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 0 1rem 3.5rem;\n  overflow: visible;\n}\n.avatar-wrap[_ngcontent-%COMP%] {\n  margin-top: .75rem;\n  position: relative;\n  z-index: 2;\n}\n.avatar-wrap.avatar-over-cover[_ngcontent-%COMP%] {\n  margin-top: -2rem;\n}\n.avatar-fallback[_ngcontent-%COMP%], \n.avatar-img[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 18px;\n  border: 4px solid #f9fafb;\n  box-shadow: 0 8px 28px rgba(0, 0, 0, .2);\n}\n.page.dark[_ngcontent-%COMP%]   .avatar-fallback[_ngcontent-%COMP%], \n.page.dark[_ngcontent-%COMP%]   .avatar-img[_ngcontent-%COMP%] {\n  border-color: #0a0c0f;\n}\n.avatar-fallback[_ngcontent-%COMP%] {\n  background: var(--accent);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-family: "Sora", sans-serif;\n  font-weight: 800;\n  font-size: 1.55rem;\n}\n.avatar-img[_ngcontent-%COMP%] {\n  background: #fff;\n  object-fit: contain;\n  object-position: center;\n  padding: 6px;\n  display: block;\n}\n.head[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: "Sora", sans-serif;\n  font-size: 1.85rem;\n  line-height: 1.15;\n  letter-spacing: -0.02em;\n  margin: 1rem 0 0;\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin: .4rem 0 0;\n  color: #9ca3af;\n  font-size: .875rem;\n}\n.page.dark[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n.meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: .5rem;\n  margin-top: .75rem;\n  align-items: center;\n}\n.chip[_ngcontent-%COMP%], \n.status[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  border-radius: 999px;\n  padding: .3rem .75rem;\n  font-size: 11px;\n  font-weight: 600;\n}\n.chip[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, var(--accent) 14%, #ffffff);\n  color: var(--accent);\n}\n.page.dark[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, var(--accent) 22%, transparent);\n  color: color-mix(in srgb, var(--accent) 65%, #ffffff);\n}\n.status[_ngcontent-%COMP%] {\n  gap: .35rem;\n  background: #ecfdf5;\n  color: #047857;\n}\n.status.closed[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.page.dark[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {\n  background: rgba(6, 95, 70, .25);\n  color: #6ee7b7;\n}\n.page.dark[_ngcontent-%COMP%]   .status.closed[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, .05);\n  color: #9ca3af;\n}\n.dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 99px;\n  background: #10b981;\n  animation: _ngcontent-%COMP%_pulse-dot 2s ease-in-out infinite;\n}\n.dot.closed[_ngcontent-%COMP%] {\n  animation: none;\n  background: #9ca3af;\n}\n.meta-year[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9ca3af;\n}\n.page.dark[_ngcontent-%COMP%]   .meta-year[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n.divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: #e5e7eb;\n  margin: 1.2rem 0;\n}\n.page.dark[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, .06);\n}\n.btn-wa[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #22c55e;\n  color: #fff;\n  text-decoration: none;\n  border-radius: 18px;\n  padding: .95rem 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: .7rem;\n  font-family: "Sora", sans-serif;\n  font-weight: 700;\n  transition: filter .15s ease, transform .1s ease;\n}\n.btn-wa[_ngcontent-%COMP%]:hover {\n  filter: brightness(1.08);\n}\n.btn-wa[_ngcontent-%COMP%]:active {\n  transform: scale(.98);\n}\n.wa-icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n}\n.secondary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: .6rem;\n  margin-top: .6rem;\n}\n.sec-btn[_ngcontent-%COMP%] {\n  text-decoration: none;\n  border-radius: 12px;\n  background: #f3f4f6;\n  color: #4b5563;\n  padding: .75rem .5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: .45rem;\n  font-size: 13px;\n  font-weight: 600;\n}\n.page.dark[_ngcontent-%COMP%]   .sec-btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, .05);\n  color: #9ca3af;\n}\n.sec-icon[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n}\n.hours[_ngcontent-%COMP%] {\n  margin-top: 1.2rem;\n  border-radius: 16px;\n  border: 1px solid #f1f5f9;\n  background: #fff;\n  padding: 1rem;\n}\n.page.dark[_ngcontent-%COMP%]   .hours[_ngcontent-%COMP%] {\n  border-color: rgba(255, 255, 255, .06);\n  background: rgba(255, 255, 255, .03);\n}\n.section-title[_ngcontent-%COMP%] {\n  margin: 0 0 .75rem;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: .1em;\n  font-weight: 700;\n  color: #9ca3af;\n}\n.page.dark[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n.hour-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 13px;\n  padding: .62rem 0;\n}\n.hour-row[_ngcontent-%COMP%]    + .hour-row[_ngcontent-%COMP%] {\n  border-top: 1px solid #f1f5f9;\n}\n.page.dark[_ngcontent-%COMP%]   .hour-row[_ngcontent-%COMP%]    + .hour-row[_ngcontent-%COMP%] {\n  border-top-color: rgba(255, 255, 255, .05);\n}\n.hour-label[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n.hour-label.strong[_ngcontent-%COMP%] {\n  color: #e5e7eb;\n  font-weight: 700;\n}\n.hour-value[_ngcontent-%COMP%] {\n  color: var(--accent);\n  font-weight: 600;\n}\n.page.dark[_ngcontent-%COMP%]   .hour-value[_ngcontent-%COMP%] {\n  color: color-mix(in srgb, var(--accent) 65%, #ffffff);\n}\n.muted-row[_ngcontent-%COMP%]   .hour-label[_ngcontent-%COMP%] {\n  color: #4b5563;\n}\n.muted-value[_ngcontent-%COMP%] {\n  color: #334155;\n  font-weight: 500;\n}\n.page.dark[_ngcontent-%COMP%]   .muted-row[_ngcontent-%COMP%]   .hour-label[_ngcontent-%COMP%], \n.page.dark[_ngcontent-%COMP%]   .muted-value[_ngcontent-%COMP%] {\n  color: #475569;\n}\n.docs[_ngcontent-%COMP%] {\n  margin-top: 1.4rem;\n}\n.docs-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .75rem;\n}\n.docs-head[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.line[_ngcontent-%COMP%] {\n  height: 1px;\n  flex: 1;\n  background: #e5e7eb;\n}\n.page.dark[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, .06);\n}\n.docs-sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9ca3af;\n  margin: .4rem 0 .9rem;\n}\n.page.dark[_ngcontent-%COMP%]   .docs-sub[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n.doc-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .85rem;\n  border-radius: 16px;\n  border: 1px solid #f1f5f9;\n  background: #fff;\n  padding: .85rem .95rem;\n  text-decoration: none;\n  color: inherit;\n  margin-bottom: .6rem;\n  transition: transform .15s ease, background-color .15s ease;\n}\n.page.dark[_ngcontent-%COMP%]   .doc-card[_ngcontent-%COMP%] {\n  border-color: rgba(255, 255, 255, .06);\n  background: rgba(255, 255, 255, .03);\n}\n.doc-card[_ngcontent-%COMP%]:hover {\n  transform: translateX(4px);\n}\n.doc-icon-wrap[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 12px;\n  background: #e8f3fd;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.page.dark[_ngcontent-%COMP%]   .doc-icon-wrap[_ngcontent-%COMP%] {\n  background: rgba(15, 76, 130, .3);\n}\n.doc-icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  color: var(--accent);\n}\n.page.dark[_ngcontent-%COMP%]   .doc-icon[_ngcontent-%COMP%] {\n  color: color-mix(in srgb, var(--accent) 65%, #ffffff);\n}\n.doc-text[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.doc-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 600;\n}\n.doc-sub[_ngcontent-%COMP%] {\n  margin: .2rem 0 0;\n  font-size: 11px;\n  color: #9ca3af;\n}\n.page.dark[_ngcontent-%COMP%]   .doc-sub[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n.arrow[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  color: #cbd5e1;\n  flex-shrink: 0;\n}\n.page.dark[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%] {\n  color: #4b5563;\n}\n.footer[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  border-top: 1px solid #e5e7eb;\n  padding-top: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: .4rem;\n  font-size: 11px;\n}\n.page.dark[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%] {\n  border-top-color: rgba(255, 255, 255, .05);\n}\n.footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--accent);\n  text-decoration: none;\n  font-weight: 700;\n}\n.page.dark[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: color-mix(in srgb, var(--accent) 65%, #ffffff);\n}\n.muted[_ngcontent-%COMP%] {\n  color: #9ca3af;\n}\n.page.dark[_ngcontent-%COMP%]   .muted[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n.dot-static[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n  border-radius: 999px;\n  background: var(--accent);\n  opacity: .5;\n}\n.empty[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  text-align: center;\n}\n@keyframes _ngcontent-%COMP%_pulse-dot {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: .35;\n  }\n}\n.page.page-embed[_ngcontent-%COMP%] {\n  min-height: 100%;\n  overflow-x: hidden;\n}\n/*# sourceMappingURL=link-bio-public-layout-generic.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LinkBioPublicLayoutGenericComponent, [{
    type: Component,
    args: [{ selector: "app-link-bio-public-layout-generic", standalone: true, imports: [CommonModule, RouterLink], template: `<div class="page" [class.dark]="dark" [class.page-embed]="embedMode" [ngStyle]="themeVars()">\r
  <div class="topbar" [class.topbar-no-cover]="!hasCover">\r
    <button type="button" class="icon-pill" (click)="onToggleDark()" aria-label="Alternar tema">\r
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />\r
      </svg>\r
    </button>\r
    <button type="button" class="icon-pill" (click)="onShare()" aria-label="Compartilhar">\r
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
        <circle cx="18" cy="5" r="3" />\r
        <circle cx="6" cy="12" r="3" />\r
        <circle cx="18" cy="19" r="3" />\r
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />\r
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />\r
      </svg>\r
    </button>\r
  </div>\r
\r
  @if (hasCover) {\r
    <div class="cover">\r
      @if (coverMode === 'banner' && hasCoverImage && clinic.cover_image_url) {\r
        <img [src]="clinic.cover_image_url" [alt]="clinic.name" class="cover-img" />\r
      } @else {\r
        <div class="cover-fill" [ngStyle]="coverStyle()"></div>\r
      }\r
      <div class="cover-pattern"></div>\r
      <div class="cover-line"></div>\r
    </div>\r
  }\r
\r
  <div class="content">\r
    <div class="avatar-wrap" [class.avatar-over-cover]="hasCover">\r
      @if (clinic.logo_url) {\r
        <img [src]="clinic.logo_url" [alt]="clinic.name" class="avatar-img" />\r
      } @else {\r
        <div class="avatar-fallback">{{ clinicInitials }}</div>\r
      }\r
    </div>\r
\r
    <div class="head">\r
      <h1>{{ clinic.name }}</h1>\r
      @if (clinic.short_description) {\r
        <p class="subtitle">{{ clinic.short_description }}</p>\r
      }\r
    </div>\r
\r
    <div class="meta">\r
      @if (clinic.specialties_list?.length) {\r
        <span class="chip">{{ clinic.specialties_list![0] }}</span>\r
      } @else {\r
        <span class="chip">Cl\xEDnica</span>\r
      }\r
      @if (clinic.is_open_now !== null && clinic.is_open_now !== undefined) {\r
        <span class="status" [class.closed]="!clinic.is_open_now">\r
          <span class="dot" [class.closed]="!clinic.is_open_now"></span>\r
          {{ clinic.is_open_now ? 'Aberta agora' : 'Fechada agora' }}\r
        </span>\r
      }\r
      @if (clinic.founded_year) {\r
        <span class="meta-year">Desde {{ clinic.founded_year }}</span>\r
      }\r
    </div>\r
\r
    <div class="divider"></div>\r
\r
    @if (clinic.phone) {\r
      <a [href]="whatsappUrl()" target="_blank" rel="noopener noreferrer" class="btn-wa">\r
        <svg class="wa-icon" viewBox="0 0 24 24" fill="currentColor">\r
          <path\r
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"\r
          />\r
          <path\r
            d="M12 0C5.373 0 0 5.373 0 12c0 2.108.549 4.09 1.508 5.814L0 24l6.335-1.489A11.926 11.926 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zM12 22c-1.89 0-3.663-.5-5.198-1.375l-.372-.22-3.862.908.979-3.763-.242-.386A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"\r
          />\r
        </svg>\r
        Falar pelo WhatsApp\r
      </a>\r
    }\r
\r
    @if (clinic.maps_url || clinic.contact_email) {\r
      <div class="secondary">\r
        @if (clinic.maps_url) {\r
          <a [href]="clinic.maps_url" target="_blank" rel="noopener noreferrer" class="sec-btn">\r
            <svg class="sec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />\r
              <circle cx="12" cy="10" r="3" />\r
            </svg>\r
            Como chegar\r
          </a>\r
        }\r
        @if (clinic.contact_email) {\r
          <a [href]="'mailto:' + clinic.contact_email" class="sec-btn">\r
            <svg class="sec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />\r
              <polyline points="22,6 12,13 2,6" />\r
            </svg>\r
            Contato\r
          </a>\r
        }\r
      </div>\r
    }\r
\r
    @if (hasAnyHour) {\r
      <div class="hours">\r
        <p class="section-title">Hor\xE1rio de funcionamento</p>\r
        <div class="hour-row">\r
          <span class="hour-label strong">Segunda a Sexta</span>\r
          <span class="hour-value">{{ weekdayHoursText }}</span>\r
        </div>\r
        <div class="hour-row muted-row">\r
          <span class="hour-label">S\xE1bado e Domingo</span>\r
          <span class="hour-value muted-value">{{ weekendHoursText }}</span>\r
        </div>\r
      </div>\r
    }\r
\r
    @if (allLinks.length) {\r
      <div class="docs">\r
        <div class="docs-head">\r
          <p class="section-title">Documentos</p>\r
          <div class="line"></div>\r
        </div>\r
        <p class="docs-sub">Preencha antes do seu atendimento ou procedimento</p>\r
\r
        @for (link of allLinks; track trackDoc($index, link)) {\r
          @if (link.type === 'bio') {\r
            <a [href]="hrefBioLink(link.item)" target="_blank" rel="noopener noreferrer" class="doc-card">\r
              <div class="doc-icon-wrap">\r
                <svg class="doc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />\r
                  <polyline points="14 2 14 8 20 8" />\r
                  <line x1="16" y1="13" x2="8" y2="13" />\r
                  <line x1="16" y1="17" x2="8" y2="17" />\r
                </svg>\r
              </div>\r
              <div class="doc-text">\r
                <p class="doc-title">{{ link.item.label }}</p>\r
                <p class="doc-sub">Abrir documento</p>\r
              </div>\r
              <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <polyline points="9 18 15 12 9 6" />\r
              </svg>\r
            </a>\r
          } @else {\r
            <a [routerLink]="['/f', formToken(link.item)]" class="doc-card">\r
              <div class="doc-icon-wrap">\r
                <svg class="doc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />\r
                  <polyline points="14 2 14 8 20 8" />\r
                  <line x1="12" y1="18" x2="12" y2="12" />\r
                  <line x1="9" y1="15" x2="15" y2="15" />\r
                </svg>\r
              </div>\r
              <div class="doc-text">\r
                <p class="doc-title">{{ link.item.name }}</p>\r
                <p class="doc-sub">Preenchimento online</p>\r
              </div>\r
              <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <polyline points="9 18 15 12 9 6" />\r
              </svg>\r
            </a>\r
          }\r
        }\r
      </div>\r
    } @else {\r
      <p class="muted empty">Nenhum link dispon\xEDvel no momento.</p>\r
    }\r
\r
    <div class="footer">\r
      <span class="dot-static"></span>\r
      <span class="muted">Fichas digitais por</span>\r
      <a href="https://gestgo.com.br" target="_blank" rel="noopener noreferrer">Gestgo</a>\r
      <span class="muted">\xB7</span>\r
      <a routerLink="/privacidade" target="_blank" rel="noopener noreferrer" class="muted">Privacidade</a>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ['@import "https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&display=swap";\n\n/* src/app/paginas/link-bio-public/link-bio-public-layout-generic.component.css */\n:host {\n  display: block;\n}\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n.page {\n  --accent: #1a6fbf;\n  min-height: 100vh;\n  background: #f9fafb;\n  color: #111827;\n  font-family:\n    "Geist Sans",\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n  --c-border: #e5e7eb;\n  --c-surface: #ffffff;\n  --c-soft: #f3f4f6;\n  --skeleton-base: #e2e8f0;\n  --skeleton-highlight: #f8fafc;\n}\n.page.dark {\n  background: #0a0c0f;\n  color: #f9fafb;\n  --c-border: rgba(255, 255, 255, 0.1);\n  --c-surface: #13161c;\n  --c-soft: #0d1016;\n  --skeleton-base: #252b36;\n  --skeleton-highlight: #3d4654;\n}\n.topbar {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 20;\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  padding: 1rem;\n}\n.topbar.topbar-no-cover {\n  position: static;\n  width: 100%;\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 0.75rem 1rem 0;\n}\n.topbar.topbar-no-cover .icon-pill {\n  border: 1px solid #e5e7eb;\n  background: #f3f4f6;\n  color: #4b5563;\n  -webkit-backdrop-filter: none;\n  backdrop-filter: none;\n}\n.page.dark .topbar.topbar-no-cover .icon-pill {\n  border-color: rgba(255, 255, 255, 0.1);\n  background: rgba(255, 255, 255, 0.08);\n  color: rgba(255, 255, 255, 0.85);\n}\n.icon-pill {\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  background: rgba(255, 255, 255, 0.1);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  color: rgba(255, 255, 255, 0.9);\n  border-radius: 999px;\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: opacity .15s ease, transform .1s ease;\n}\n.icon-pill:hover {\n  opacity: .7;\n}\n.icon-pill:active {\n  transform: scale(.95);\n}\n.icon {\n  width: 14px;\n  height: 14px;\n}\n.cover {\n  position: relative;\n  height: 176px;\n  overflow: hidden;\n  background: #0b1628;\n}\n.cover-img,\n.cover-fill {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.cover-pattern {\n  position: absolute;\n  inset: 0;\n  background-image:\n    radial-gradient(\n      circle,\n      rgba(255, 255, 255, .1) 1px,\n      transparent 1px);\n  background-size: 22px 22px;\n}\n.cover-line {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 3px;\n  background: var(--accent);\n  opacity: 0.55;\n}\n.content {\n  width: 100%;\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 0 1rem 3.5rem;\n  overflow: visible;\n}\n.avatar-wrap {\n  margin-top: .75rem;\n  position: relative;\n  z-index: 2;\n}\n.avatar-wrap.avatar-over-cover {\n  margin-top: -2rem;\n}\n.avatar-fallback,\n.avatar-img {\n  width: 72px;\n  height: 72px;\n  border-radius: 18px;\n  border: 4px solid #f9fafb;\n  box-shadow: 0 8px 28px rgba(0, 0, 0, .2);\n}\n.page.dark .avatar-fallback,\n.page.dark .avatar-img {\n  border-color: #0a0c0f;\n}\n.avatar-fallback {\n  background: var(--accent);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-family: "Sora", sans-serif;\n  font-weight: 800;\n  font-size: 1.55rem;\n}\n.avatar-img {\n  background: #fff;\n  object-fit: contain;\n  object-position: center;\n  padding: 6px;\n  display: block;\n}\n.head h1 {\n  font-family: "Sora", sans-serif;\n  font-size: 1.85rem;\n  line-height: 1.15;\n  letter-spacing: -0.02em;\n  margin: 1rem 0 0;\n}\n.subtitle {\n  margin: .4rem 0 0;\n  color: #9ca3af;\n  font-size: .875rem;\n}\n.page.dark .subtitle {\n  color: #6b7280;\n}\n.meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: .5rem;\n  margin-top: .75rem;\n  align-items: center;\n}\n.chip,\n.status {\n  display: inline-flex;\n  align-items: center;\n  border-radius: 999px;\n  padding: .3rem .75rem;\n  font-size: 11px;\n  font-weight: 600;\n}\n.chip {\n  background: color-mix(in srgb, var(--accent) 14%, #ffffff);\n  color: var(--accent);\n}\n.page.dark .chip {\n  background: color-mix(in srgb, var(--accent) 22%, transparent);\n  color: color-mix(in srgb, var(--accent) 65%, #ffffff);\n}\n.status {\n  gap: .35rem;\n  background: #ecfdf5;\n  color: #047857;\n}\n.status.closed {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.page.dark .status {\n  background: rgba(6, 95, 70, .25);\n  color: #6ee7b7;\n}\n.page.dark .status.closed {\n  background: rgba(255, 255, 255, .05);\n  color: #9ca3af;\n}\n.dot {\n  width: 6px;\n  height: 6px;\n  border-radius: 99px;\n  background: #10b981;\n  animation: pulse-dot 2s ease-in-out infinite;\n}\n.dot.closed {\n  animation: none;\n  background: #9ca3af;\n}\n.meta-year {\n  font-size: 11px;\n  color: #9ca3af;\n}\n.page.dark .meta-year {\n  color: #6b7280;\n}\n.divider {\n  height: 1px;\n  background: #e5e7eb;\n  margin: 1.2rem 0;\n}\n.page.dark .divider {\n  background: rgba(255, 255, 255, .06);\n}\n.btn-wa {\n  width: 100%;\n  background: #22c55e;\n  color: #fff;\n  text-decoration: none;\n  border-radius: 18px;\n  padding: .95rem 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: .7rem;\n  font-family: "Sora", sans-serif;\n  font-weight: 700;\n  transition: filter .15s ease, transform .1s ease;\n}\n.btn-wa:hover {\n  filter: brightness(1.08);\n}\n.btn-wa:active {\n  transform: scale(.98);\n}\n.wa-icon {\n  width: 20px;\n  height: 20px;\n}\n.secondary {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: .6rem;\n  margin-top: .6rem;\n}\n.sec-btn {\n  text-decoration: none;\n  border-radius: 12px;\n  background: #f3f4f6;\n  color: #4b5563;\n  padding: .75rem .5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: .45rem;\n  font-size: 13px;\n  font-weight: 600;\n}\n.page.dark .sec-btn {\n  background: rgba(255, 255, 255, .05);\n  color: #9ca3af;\n}\n.sec-icon {\n  width: 16px;\n  height: 16px;\n}\n.hours {\n  margin-top: 1.2rem;\n  border-radius: 16px;\n  border: 1px solid #f1f5f9;\n  background: #fff;\n  padding: 1rem;\n}\n.page.dark .hours {\n  border-color: rgba(255, 255, 255, .06);\n  background: rgba(255, 255, 255, .03);\n}\n.section-title {\n  margin: 0 0 .75rem;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: .1em;\n  font-weight: 700;\n  color: #9ca3af;\n}\n.page.dark .section-title {\n  color: #6b7280;\n}\n.hour-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 13px;\n  padding: .62rem 0;\n}\n.hour-row + .hour-row {\n  border-top: 1px solid #f1f5f9;\n}\n.page.dark .hour-row + .hour-row {\n  border-top-color: rgba(255, 255, 255, .05);\n}\n.hour-label {\n  color: #6b7280;\n}\n.hour-label.strong {\n  color: #e5e7eb;\n  font-weight: 700;\n}\n.hour-value {\n  color: var(--accent);\n  font-weight: 600;\n}\n.page.dark .hour-value {\n  color: color-mix(in srgb, var(--accent) 65%, #ffffff);\n}\n.muted-row .hour-label {\n  color: #4b5563;\n}\n.muted-value {\n  color: #334155;\n  font-weight: 500;\n}\n.page.dark .muted-row .hour-label,\n.page.dark .muted-value {\n  color: #475569;\n}\n.docs {\n  margin-top: 1.4rem;\n}\n.docs-head {\n  display: flex;\n  align-items: center;\n  gap: .75rem;\n}\n.docs-head .section-title {\n  margin: 0;\n}\n.line {\n  height: 1px;\n  flex: 1;\n  background: #e5e7eb;\n}\n.page.dark .line {\n  background: rgba(255, 255, 255, .06);\n}\n.docs-sub {\n  font-size: 12px;\n  color: #9ca3af;\n  margin: .4rem 0 .9rem;\n}\n.page.dark .docs-sub {\n  color: #6b7280;\n}\n.doc-card {\n  display: flex;\n  align-items: center;\n  gap: .85rem;\n  border-radius: 16px;\n  border: 1px solid #f1f5f9;\n  background: #fff;\n  padding: .85rem .95rem;\n  text-decoration: none;\n  color: inherit;\n  margin-bottom: .6rem;\n  transition: transform .15s ease, background-color .15s ease;\n}\n.page.dark .doc-card {\n  border-color: rgba(255, 255, 255, .06);\n  background: rgba(255, 255, 255, .03);\n}\n.doc-card:hover {\n  transform: translateX(4px);\n}\n.doc-icon-wrap {\n  width: 40px;\n  height: 40px;\n  border-radius: 12px;\n  background: #e8f3fd;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.page.dark .doc-icon-wrap {\n  background: rgba(15, 76, 130, .3);\n}\n.doc-icon {\n  width: 18px;\n  height: 18px;\n  color: var(--accent);\n}\n.page.dark .doc-icon {\n  color: color-mix(in srgb, var(--accent) 65%, #ffffff);\n}\n.doc-text {\n  flex: 1;\n  min-width: 0;\n}\n.doc-title {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 600;\n}\n.doc-sub {\n  margin: .2rem 0 0;\n  font-size: 11px;\n  color: #9ca3af;\n}\n.page.dark .doc-sub {\n  color: #6b7280;\n}\n.arrow {\n  width: 16px;\n  height: 16px;\n  color: #cbd5e1;\n  flex-shrink: 0;\n}\n.page.dark .arrow {\n  color: #4b5563;\n}\n.footer {\n  margin-top: 2rem;\n  border-top: 1px solid #e5e7eb;\n  padding-top: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: .4rem;\n  font-size: 11px;\n}\n.page.dark .footer {\n  border-top-color: rgba(255, 255, 255, .05);\n}\n.footer a {\n  color: var(--accent);\n  text-decoration: none;\n  font-weight: 700;\n}\n.page.dark .footer a {\n  color: color-mix(in srgb, var(--accent) 65%, #ffffff);\n}\n.muted {\n  color: #9ca3af;\n}\n.page.dark .muted {\n  color: #6b7280;\n}\n.dot-static {\n  width: 5px;\n  height: 5px;\n  border-radius: 999px;\n  background: var(--accent);\n  opacity: .5;\n}\n.empty {\n  margin-top: 1rem;\n  text-align: center;\n}\n@keyframes pulse-dot {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: .35;\n  }\n}\n.page.page-embed {\n  min-height: 100%;\n  overflow-x: hidden;\n}\n/*# sourceMappingURL=link-bio-public-layout-generic.component.css.map */\n'] }]
  }], null, { clinic: [{
    type: Input,
    args: [{ required: true }]
  }], allLinks: [{
    type: Input,
    args: [{ required: true }]
  }], publicSlug: [{
    type: Input
  }], linkBioPreview: [{
    type: Input
  }], dark: [{
    type: Input
  }], embedMode: [{
    type: Input
  }], toggleDark: [{
    type: Output
  }], share: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LinkBioPublicLayoutGenericComponent, { className: "LinkBioPublicLayoutGenericComponent", filePath: "src/app/paginas/link-bio-public/link-bio-public-layout-generic.component.ts", lineNumber: 18 });
})();

// src/app/paginas/link-bio-public/link-bio-public-layout-vet.component.ts
var _c03 = (a0) => ["/f", a0];
var _forTrack02 = ($index, $item) => $item.label;
var _forTrack12 = ($index, $item) => $item.title;
function LinkBioPublicLayoutVetComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 25);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.clinic.logo_url, \u0275\u0275sanitizeUrl)("alt", ctx_r0.clinic.name);
  }
}
function LinkBioPublicLayoutVetComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1, "\u{1F43E}");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutVetComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275element(1, "span", 56);
    \u0275\u0275text(2, " Aberto agora ");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutVetComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275element(1, "span", 57);
    \u0275\u0275text(2, " Fechado agora ");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutVetComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.councilMetaLine);
  }
}
function LinkBioPublicLayoutVetComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "a", 58);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 59);
    \u0275\u0275element(3, "path", 60)(4, "path", 61);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("href", ctx_r0.whatsappUrl(), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.waCtaLabel, " ");
  }
}
function LinkBioPublicLayoutVetComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 37);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 62);
    \u0275\u0275element(2, "path", 63)(3, "circle", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Como chegar ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("href", ctx_r0.clinic.maps_url, \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutVetComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 38);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 62);
    \u0275\u0275element(2, "path", 65);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Emerg\xEAncia ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("href", ctx_r0.telHref(), \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutVetComponent_For_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sp_r2 = ctx.$implicit;
    \u0275\u0275classProp("lb-m6-chip-active", sp_r2.active)("lb-m6-chip-inactive", !sp_r2.active);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(sp_r2.label);
  }
}
function LinkBioPublicLayoutVetComponent_For_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 67);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 68);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const svc_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(svc_r3.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(svc_r3.title);
  }
}
function LinkBioPublicLayoutVetComponent_Conditional_59_For_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71)(1, "span", 72);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 73);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const row_r5 = ctx_r3.$implicit;
    const \u0275$index_162_r6 = ctx_r3.$index;
    \u0275\u0275classProp("pt-0", \u0275$index_162_r6 === 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r5.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r5.text);
  }
}
function LinkBioPublicLayoutVetComponent_Conditional_59_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LinkBioPublicLayoutVetComponent_Conditional_59_For_4_Conditional_0_Template, 5, 4, "div", 70);
  }
  if (rf & 2) {
    const row_r5 = ctx.$implicit;
    \u0275\u0275conditional(row_r5.text !== "\u2013" ? 0 : -1);
  }
}
function LinkBioPublicLayoutVetComponent_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "p", 69);
    \u0275\u0275text(2, "Funcionamento");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, LinkBioPublicLayoutVetComponent_Conditional_59_For_4_Template, 1, 1, null, null, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.hoursGridArray);
  }
}
function LinkBioPublicLayoutVetComponent_Conditional_60_For_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 76)(1, "div", 78);
    \u0275\u0275text(2, "\u{1F43E}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 79)(4, "p", 80);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 81);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 82);
    \u0275\u0275element(9, "polyline", 83);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r0.hrefBio(link_r7.item), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(link_r7.item.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(link_r7.item.url);
  }
}
function LinkBioPublicLayoutVetComponent_Conditional_60_For_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 77)(1, "div", 84);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 85);
    \u0275\u0275element(3, "path", 86)(4, "polyline", 87);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 79)(6, "p", 80);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 88);
    \u0275\u0275text(9, "Preenchimento online");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(10, "svg", 82);
    \u0275\u0275element(11, "polyline", 83);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c03, ctx_r0.formToken(link_r7.item)));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(link_r7.item.name);
  }
}
function LinkBioPublicLayoutVetComponent_Conditional_60_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LinkBioPublicLayoutVetComponent_Conditional_60_For_8_Conditional_0_Template, 10, 3, "a", 76)(1, LinkBioPublicLayoutVetComponent_Conditional_60_For_8_Conditional_1_Template, 12, 4, "a", 77);
  }
  if (rf & 2) {
    const link_r7 = ctx.$implicit;
    \u0275\u0275conditional(link_r7.type === "bio" ? 0 : 1);
  }
}
function LinkBioPublicLayoutVetComponent_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "div", 74)(2, "p", 41);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "div", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 75);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, LinkBioPublicLayoutVetComponent_Conditional_60_For_8_Template, 2, 1, null, null, \u0275\u0275componentInstance().trackDoc, true);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.docsTitle);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.docsIntro);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.allDocs);
  }
}
function LinkBioPublicLayoutVetComponent_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 89);
    \u0275\u0275element(2, "path", 63)(3, "circle", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span", 90);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.clinic.address);
  }
}
var DEFAULT_SPECIES = [
  { label: "\u{1F415} C\xE3es", active: true },
  { label: "\u{1F408} Gatos", active: true },
  { label: "\u{1F407} Coelhos", active: false },
  { label: "\u{1F439} Hamsters", active: false },
  { label: "\u{1F426} Aves", active: false },
  { label: "\u{1F98E} R\xE9pteis", active: false }
];
var DEFAULT_VET_SERVICES = [
  { icon: "\u{1F489}", title: "Vacinas" },
  { icon: "\u{1F52C}", title: "Exames" },
  { icon: "\u{1FA7A}", title: "Consulta" },
  { icon: "\u2702\uFE0F", title: "Cirurgia" },
  { icon: "\u{1F6C1}", title: "Banho e tosa" },
  { icon: "\u{1F3E5}", title: "Interna\xE7\xE3o" }
];
var LinkBioPublicLayoutVetComponent = class _LinkBioPublicLayoutVetComponent {
  linkBio = inject(LinkBioService);
  clinic;
  /** Reservado (links bio); a lista unificada vem em `allDocs`. */
  bioLinks = [];
  dark = false;
  allDocs = [];
  publicSlug = "";
  linkBioPreview = false;
  toggleDark = new EventEmitter();
  share = new EventEmitter();
  get extra() {
    const e = this.clinic.link_bio_extra;
    return e && typeof e === "object" ? e : {};
  }
  get hoursGridArray() {
    const grid = this.clinic.business_hours_grid;
    if (!grid || typeof grid !== "object")
      return [];
    const order = ["1", "2", "3", "4", "5", "6", "7"];
    return order.map((k) => grid[k]).filter(Boolean);
  }
  get hasAnyHour() {
    return this.hoursGridArray.some((d) => d.text !== "\u2013");
  }
  get coverKicker() {
    return this.extra.layout_cover_kicker?.trim() || "Medicina veterin\xE1ria";
  }
  get taglineUnderTitle() {
    return this.clinic.short_description?.trim() || this.extra.hero_tagline?.trim() || "Cuidando de quem voc\xEA ama";
  }
  get councilMetaLine() {
    const parts = [];
    if (this.extra.council_registration?.trim())
      parts.push(this.extra.council_registration.trim());
    if (this.clinic.founded_year)
      parts.push(`Desde ${this.clinic.founded_year}`);
    return parts.join(" \xB7 ");
  }
  get speciesChips() {
    const c = this.extra.species_chips;
    if (c?.length) {
      return c.map((x) => ({ label: String(x.label), active: x.active !== false }));
    }
    return DEFAULT_SPECIES;
  }
  get serviceCards() {
    const s = this.extra.vet_service_cards;
    if (s?.length) {
      return s.map((x) => ({ icon: x.icon?.trim() || "\u{1F489}", title: x.title }));
    }
    return DEFAULT_VET_SERVICES;
  }
  get waCtaLabel() {
    return this.extra.vet_wa_cta_label?.trim() || "Marcar consulta para o pet";
  }
  get docsTitle() {
    return this.extra.vet_docs_section_title?.trim() || "Fichas do pet";
  }
  get docsIntro() {
    return this.extra.vet_docs_intro?.trim() || "Preencha antes da consulta do seu bichinho";
  }
  whatsappUrl() {
    const phone = this.clinic.phone?.replace(/\D/g, "") ?? "";
    const wa = phone.length >= 10 && phone.length <= 11 ? "55" + phone : phone;
    return wa ? `https://wa.me/${wa}` : "";
  }
  telHref() {
    const raw = this.clinic.phone?.trim() ?? "";
    if (!raw)
      return "";
    if (raw.startsWith("+"))
      return `tel:${raw}`;
    const d = raw.replace(/\D/g, "");
    if (!d)
      return "";
    const intl = d.length <= 11 && !d.startsWith("55") ? "55" + d : d;
    return `tel:+${intl}`;
  }
  formToken(f) {
    const parts = f.public_url.split("/f/");
    return parts.length > 1 ? parts[1].split("?")[0] : "";
  }
  trackDoc(_i, link) {
    return link.type === "bio" ? `b-${link.item.id}` : `f-${link.item.id}`;
  }
  hrefBio(link) {
    return this.linkBio.outboundBioLinkUrl(this.publicSlug, link, this.linkBioPreview);
  }
  onToggleDark() {
    this.toggleDark.emit();
  }
  onShare() {
    this.share.emit();
  }
  static \u0275fac = function LinkBioPublicLayoutVetComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LinkBioPublicLayoutVetComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LinkBioPublicLayoutVetComponent, selectors: [["app-link-bio-public-layout-vet"]], inputs: { clinic: "clinic", bioLinks: "bioLinks", dark: "dark", allDocs: "allDocs", publicSlug: "publicSlug", linkBioPreview: "linkBioPreview" }, outputs: { toggleDark: "toggleDark", share: "share" }, decls: 72, vars: 14, consts: [[1, "lb-m6-root", "min-h-screen"], [1, "flex", "justify-end", "gap-2", "px-4", "pt-4", "absolute", "top-0", "right-0", "z-30"], ["type", "button", "aria-label", "Alternar tema", 1, "lb-m6-icon-pill", "flex", "items-center", "px-3", "py-2", "rounded-full", "bg-white/15", "backdrop-blur-sm", "border", "border-white/20", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "hidden", "dark:block", "w-[14px]", "h-[14px]", "text-amber-300"], ["cx", "12", "cy", "12", "r", "5"], ["x1", "12", "y1", "1", "x2", "12", "y2", "3"], ["x1", "12", "y1", "21", "x2", "12", "y2", "23"], ["x1", "4.22", "y1", "4.22", "x2", "5.64", "y2", "5.64"], ["x1", "18.36", "y1", "18.36", "x2", "19.78", "y2", "19.78"], ["x1", "1", "y1", "12", "x2", "3", "y2", "12"], ["x1", "21", "y1", "12", "x2", "23", "y2", "12"], ["x1", "4.22", "y1", "19.78", "x2", "5.64", "y2", "18.36"], ["x1", "18.36", "y1", "5.64", "x2", "19.78", "y2", "4.22"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "block", "dark:hidden", "w-[14px]", "h-[14px]", "text-white"], ["d", "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"], ["type", "button", "aria-label", "Compartilhar", 1, "lb-m6-icon-pill", "flex", "items-center", "px-3", "py-2", "rounded-full", "bg-white/15", "backdrop-blur-sm", "border", "border-white/20", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-[14px]", "h-[14px]", "text-white"], ["cx", "18", "cy", "5", "r", "3"], ["cx", "6", "cy", "12", "r", "3"], ["cx", "18", "cy", "19", "r", "3"], ["x1", "8.59", "y1", "13.51", "x2", "15.42", "y2", "17.49"], ["x1", "15.41", "y1", "6.51", "x2", "8.59", "y2", "10.49"], [1, "lb-m6-paw-bg", "pt-16", "pb-10", "px-5", "lb-m6-a1"], [1, "max-w-lg", "mx-auto", "flex", "items-center", "gap-5"], [1, "lb-m6-pet-ring", "shadow-lg"], [1, "w-full", "h-full", "rounded-full", "object-cover", 3, "src", "alt"], ["aria-hidden", "true", 1, "lb-m6-bounce"], [1, "text-[10px]", "font-bold", "tracking-[0.18em]", "uppercase", "text-white/50", "mb-1"], [1, "text-[28px]", "sm:text-[34px]", "font-black", "text-white", "leading-tight", "tracking-tight"], [1, "text-[13px]", "text-white/60", "mt-0.5", "font-medium"], [1, "flex", "items-center", "gap-3", "mt-4", "max-w-lg", "mx-auto", "flex-wrap"], [1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-full", "text-[11px]", "font-black", "bg-white/15", "text-white"], [1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-full", "text-[11px]", "font-black", "bg-white/10", "text-white/50"], [1, "text-[11px]", "text-white/35", "font-medium"], [1, "w-full", "max-w-lg", "mx-auto", "px-4", "sm:px-6", "pb-14", "pt-5"], [1, "lb-m6-a2"], [1, "grid", "grid-cols-2", "gap-2.5", "mt-2.5", "lb-m6-a2"], ["target", "_blank", "rel", "noopener noreferrer", 1, "lb-m6-sec", "flex", "items-center", "justify-center", "gap-2", "py-3", "px-3", "rounded-xl", "bg-white", "dark:bg-white/[0.05]", "border", "border-[#d8f3e3]", "dark:border-white/[0.06]", "hover:bg-[#f0faf4]", "dark:hover:bg-white/[0.08]", "text-[#1e7d47]", "dark:text-[#4dbf82]", "text-[13px]", "font-bold", "no-underline", 3, "href"], [1, "lb-m6-sec", "flex", "items-center", "justify-center", "gap-2", "py-3", "px-3", "rounded-xl", "bg-white", "dark:bg-white/[0.05]", "border", "border-[#d8f3e3]", "dark:border-white/[0.06]", "hover:bg-[#f0faf4]", "dark:hover:bg-white/[0.08]", "text-[#1e7d47]", "dark:text-[#4dbf82]", "text-[13px]", "font-bold", "no-underline", 3, "href"], [1, "mt-5", "lb-m6-a3"], [1, "flex", "items-center", "gap-3", "mb-3"], [1, "text-[10px]", "font-black", "tracking-[0.1em]", "uppercase", "text-[#1e7d47]", "dark:text-[#4dbf82]", "whitespace-nowrap"], [1, "flex-1", "h-px", "bg-[#d8f3e3]", "dark:bg-white/[0.06]"], [1, "flex", "flex-wrap", "gap-2"], [1, "lb-m6-chip", 3, "lb-m6-chip-active", "lb-m6-chip-inactive"], [1, "grid", "grid-cols-3", "gap-2.5"], [1, "lb-m6-svc"], [1, "mt-5", "rounded-2xl", "bg-white", "dark:bg-white/[0.03]", "border", "border-[#d8f3e3]", "dark:border-white/[0.05]", "px-4", "pt-4", "pb-3", "lb-m6-a3"], [1, "mt-5", "lb-m6-a4"], [1, "flex", "items-center", "gap-2", "mt-5", "lb-m6-a5"], [1, "mt-8", "pt-5", "border-t", "border-[#d8f3e3]", "dark:border-white/[0.05]", "flex", "flex-wrap", "items-center", "justify-center", "gap-2", "lb-m6-a5"], [1, "w-[5px]", "h-[5px]", "rounded-full", "bg-[#2da05e]", "opacity-50"], [1, "text-[11px]", "text-gray-400", "dark:text-gray-600", "font-medium"], ["href", "https://gestgo.com.br", "target", "_blank", "rel", "noopener noreferrer", 1, "text-[11px]", "font-black", "text-[#2da05e]", "no-underline", "hover:opacity-75"], [1, "text-gray-300", "dark:text-gray-700", "text-[11px]"], ["routerLink", "/privacidade", 1, "text-[11px]", "text-gray-400", "no-underline", "hover:text-gray-600", "transition-colors", "font-medium"], [1, "w-[6px]", "h-[6px]", "rounded-full", "bg-emerald-300", "lb-m6-pulse-dot", "inline-block"], [1, "w-[6px]", "h-[6px]", "rounded-full", "bg-white/30", "inline-block"], ["target", "_blank", "rel", "noopener noreferrer", 1, "lb-m6-wpp", "w-full", "flex", "items-center", "justify-center", "gap-3", "py-4", "rounded-2xl", "bg-[#22c55e]", "hover:bg-[#16a34a]", "text-white", "font-black", "text-[15px]", "no-underline", 3, "href"], ["viewBox", "0 0 24 24", "fill", "white", 1, "w-5", "h-5", "shrink-0"], ["d", "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"], ["d", "M12 0C5.373 0 0 5.373 0 12c0 2.108.549 4.09 1.508 5.814L0 24l6.335-1.489A11.926 11.926 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.5-5.198-1.375l-.372-.22-3.862.908.979-3.763-.242-.386A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4", "shrink-0"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"], ["cx", "12", "cy", "10", "r", "3"], ["d", "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.1 6.1l1.27-.72a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"], [1, "lb-m6-chip"], [1, "text-2xl", "mb-1"], [1, "text-[11px]", "font-bold", "text-[#155c34]", "dark:text-[#aee4c5]"], [1, "text-[10px]", "font-black", "tracking-[0.1em]", "uppercase", "text-[#1e7d47]", "dark:text-[#4dbf82]", "mb-3"], [1, "flex", "justify-between", "text-[13px]", "py-2", "border-b", "border-[#f0faf4]", "dark:border-white/[0.04]", "last:border-0", 3, "pt-0"], [1, "flex", "justify-between", "text-[13px]", "py-2", "border-b", "border-[#f0faf4]", "dark:border-white/[0.04]", "last:border-0"], [1, "font-bold", "text-gray-700", "dark:text-gray-300"], [1, "font-black", "text-[#2da05e]", "dark:text-[#4dbf82]"], [1, "flex", "items-center", "gap-3", "mb-1.5"], [1, "text-[12px]", "text-gray-500", "dark:text-gray-600", "mb-4", "font-medium"], ["target", "_blank", "rel", "noopener noreferrer", 1, "lb-m6-doc", "flex", "items-center", "gap-3.5", "p-4", "rounded-2xl", "bg-white", "dark:bg-white/[0.03]", "border", "border-[#d8f3e3]", "dark:border-white/[0.05]", "mb-3", "no-underline", "group", "text-inherit", 3, "href"], [1, "lb-m6-doc", "flex", "items-center", "gap-3.5", "p-4", "rounded-2xl", "bg-white", "dark:bg-white/[0.03]", "border", "border-[#d8f3e3]", "dark:border-white/[0.05]", "mb-3", "no-underline", "group", "text-inherit", 3, "routerLink"], [1, "w-10", "h-10", "rounded-xl", "bg-[#f0faf4]", "dark:bg-[#1e7d47]/20", "flex", "items-center", "justify-center", "flex-shrink-0", "text-xl"], [1, "flex-1", "min-w-0"], [1, "text-[13px]", "font-bold", "text-gray-800", "dark:text-gray-200"], [1, "text-[11px]", "text-gray-400", "dark:text-gray-600", "mt-0.5", "truncate"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4", "text-gray-300", "dark:text-gray-700", "group-hover:text-[#4dbf82]", "transition-colors", "shrink-0"], ["points", "9 18 15 12 9 6"], [1, "w-10", "h-10", "rounded-xl", "bg-[#f0faf4]", "dark:bg-[#1e7d47]/20", "flex", "items-center", "justify-center", "flex-shrink-0"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-[18px]", "h-[18px]", "text-[#2da05e]"], ["d", "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"], ["points", "14 2 14 8 20 8"], [1, "text-[11px]", "text-gray-400", "dark:text-gray-600", "mt-0.5"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-[13px]", "h-[13px]", "text-[#2da05e]", "dark:text-[#4dbf82]", "flex-shrink-0"], [1, "text-[12px]", "text-gray-400", "dark:text-gray-600", "font-medium"]], template: function LinkBioPublicLayoutVetComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275listener("click", function LinkBioPublicLayoutVetComponent_Template_button_click_2_listener() {
        return ctx.onToggleDark();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(3, "svg", 3);
      \u0275\u0275element(4, "circle", 4)(5, "line", 5)(6, "line", 6)(7, "line", 7)(8, "line", 8)(9, "line", 9)(10, "line", 10)(11, "line", 11)(12, "line", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "svg", 13);
      \u0275\u0275element(14, "path", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(15, "button", 15);
      \u0275\u0275listener("click", function LinkBioPublicLayoutVetComponent_Template_button_click_15_listener() {
        return ctx.onShare();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(16, "svg", 16);
      \u0275\u0275element(17, "circle", 17)(18, "circle", 18)(19, "circle", 19)(20, "line", 20)(21, "line", 21);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(22, "div", 22)(23, "div", 23)(24, "div", 24);
      \u0275\u0275conditionalCreate(25, LinkBioPublicLayoutVetComponent_Conditional_25_Template, 1, 2, "img", 25)(26, LinkBioPublicLayoutVetComponent_Conditional_26_Template, 2, 0, "span", 26);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div")(28, "p", 27);
      \u0275\u0275text(29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "h1", 28);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "p", 29);
      \u0275\u0275text(33);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(34, "div", 30);
      \u0275\u0275conditionalCreate(35, LinkBioPublicLayoutVetComponent_Conditional_35_Template, 3, 0, "span", 31)(36, LinkBioPublicLayoutVetComponent_Conditional_36_Template, 3, 0, "span", 32);
      \u0275\u0275conditionalCreate(37, LinkBioPublicLayoutVetComponent_Conditional_37_Template, 2, 1, "span", 33);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "div", 34);
      \u0275\u0275conditionalCreate(39, LinkBioPublicLayoutVetComponent_Conditional_39_Template, 6, 2, "div", 35);
      \u0275\u0275elementStart(40, "div", 36);
      \u0275\u0275conditionalCreate(41, LinkBioPublicLayoutVetComponent_Conditional_41_Template, 5, 1, "a", 37);
      \u0275\u0275conditionalCreate(42, LinkBioPublicLayoutVetComponent_Conditional_42_Template, 4, 1, "a", 38);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "div", 39)(44, "div", 40)(45, "p", 41);
      \u0275\u0275text(46, "Esp\xE9cies atendidas");
      \u0275\u0275elementEnd();
      \u0275\u0275element(47, "div", 42);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 43);
      \u0275\u0275repeaterCreate(49, LinkBioPublicLayoutVetComponent_For_50_Template, 2, 5, "span", 44, _forTrack02);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(51, "div", 39)(52, "div", 40)(53, "p", 41);
      \u0275\u0275text(54, "Servi\xE7os");
      \u0275\u0275elementEnd();
      \u0275\u0275element(55, "div", 42);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "div", 45);
      \u0275\u0275repeaterCreate(57, LinkBioPublicLayoutVetComponent_For_58_Template, 5, 2, "div", 46, _forTrack12);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(59, LinkBioPublicLayoutVetComponent_Conditional_59_Template, 5, 0, "div", 47);
      \u0275\u0275conditionalCreate(60, LinkBioPublicLayoutVetComponent_Conditional_60_Template, 9, 2, "div", 48);
      \u0275\u0275conditionalCreate(61, LinkBioPublicLayoutVetComponent_Conditional_61_Template, 6, 1, "div", 49);
      \u0275\u0275elementStart(62, "div", 50);
      \u0275\u0275element(63, "div", 51);
      \u0275\u0275elementStart(64, "span", 52);
      \u0275\u0275text(65, "Fichas digitais por");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "a", 53);
      \u0275\u0275text(67, "Gestgo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "span", 54);
      \u0275\u0275text(69, "\xB7");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "a", 55);
      \u0275\u0275text(71, "Privacidade");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("dark", ctx.dark);
      \u0275\u0275advance(25);
      \u0275\u0275conditional(ctx.clinic.logo_url ? 25 : 26);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.coverKicker);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.clinic.name, " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.taglineUnderTitle);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.clinic.is_open_now === true ? 35 : ctx.clinic.is_open_now === false ? 36 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.councilMetaLine ? 37 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.whatsappUrl() ? 39 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.clinic.maps_url ? 41 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.telHref() ? 42 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.speciesChips);
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.serviceCards);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.hasAnyHour ? 59 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.allDocs.length ? 60 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.clinic.address ? 61 : -1);
    }
  }, dependencies: [CommonModule, RouterLink], styles: [`@import "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap";



[_nghost-%COMP%] {
  display: block;
}
.lb-m6-root[_ngcontent-%COMP%] {
  font-family:
    "Nunito",
    ui-sans-serif,
    system-ui,
    sans-serif;
  background: #f0faf4;
  color: #155c34;
  min-height: 100vh;
}
.lb-m6-root.dark[_ngcontent-%COMP%] {
  background: #080e0b;
  color: #d8f3e3;
}
.lb-m6-paw-bg[_ngcontent-%COMP%] {
  background-color: #1e7d47;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cellipse cx='14' cy='8' rx='3' ry='4'/%3E%3Cellipse cx='26' cy='8' rx='3' ry='4'/%3E%3Cellipse cx='8' cy='16' rx='4' ry='3'/%3E%3Cellipse cx='32' cy='16' rx='4' ry='3'/%3E%3Cellipse cx='20' cy='24' rx='8' ry='9'/%3E%3C/g%3E%3C/svg%3E");
}
.lb-m6-root.dark[_ngcontent-%COMP%]   .lb-m6-paw-bg[_ngcontent-%COMP%] {
  background-color: #0d2e1a;
}
.lb-m6-pet-ring[_ngcontent-%COMP%] {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: 4px solid #fff;
  background: #aee4c5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  flex-shrink: 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}
.lb-m6-root.dark[_ngcontent-%COMP%]   .lb-m6-pet-ring[_ngcontent-%COMP%] {
  border-color: #1a2e22;
}
.lb-m6-chip[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  border: 2px solid transparent;
}
.lb-m6-chip-active[_ngcontent-%COMP%] {
  background: #2da05e;
  color: #fff;
  border-color: #2da05e;
}
.lb-m6-chip-inactive[_ngcontent-%COMP%] {
  background: #f0faf4;
  color: #2da05e;
  border-color: #aee4c5;
}
.lb-m6-root.dark[_ngcontent-%COMP%]   .lb-m6-chip-inactive[_ngcontent-%COMP%] {
  background: #0d2e1a;
  border-color: #1e7d47;
  color: #4dbf82;
}
.lb-m6-svc[_ngcontent-%COMP%] {
  border-radius: 16px;
  padding: 14px;
  background: #fff;
  border: 1.5px solid #d8f3e3;
  transition: border-color 0.15s, transform 0.15s;
  text-align: center;
}
.lb-m6-svc[_ngcontent-%COMP%]:hover {
  border-color: #4dbf82;
  transform: translateY(-2px);
}
.lb-m6-root.dark[_ngcontent-%COMP%]   .lb-m6-svc[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(77, 191, 130, 0.12);
}
.lb-m6-doc[_ngcontent-%COMP%] {
  transition: transform 0.15s, background 0.15s;
}
.lb-m6-doc[_ngcontent-%COMP%]:hover {
  transform: translateX(4px);
}
.lb-m6-wpp[_ngcontent-%COMP%] {
  transition: filter 0.15s, transform 0.1s;
}
.lb-m6-wpp[_ngcontent-%COMP%]:hover {
  filter: brightness(1.08);
}
.lb-m6-sec[_ngcontent-%COMP%] {
  transition: background 0.15s, transform 0.1s;
}
.lb-m6-icon-pill[_ngcontent-%COMP%] {
  cursor: pointer;
  border: none;
  background: transparent;
  transition: opacity 0.15s;
}
.lb-m6-icon-pill[_ngcontent-%COMP%]:hover {
  opacity: 0.6;
}
@keyframes _ngcontent-%COMP%_lb-m6-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
.lb-m6-pulse-dot[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_lb-m6-pulse 2s ease-in-out infinite;
}
@keyframes _ngcontent-%COMP%_lb-m6-bounce2 {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
.lb-m6-bounce[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_lb-m6-bounce2 2s ease-in-out infinite;
}
@keyframes _ngcontent-%COMP%_lb-m6-fade-up {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.lb-m6-a1[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_lb-m6-fade-up 0.5s ease both;
}
.lb-m6-a2[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_lb-m6-fade-up 0.5s 0.08s ease both;
}
.lb-m6-a3[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_lb-m6-fade-up 0.5s 0.16s ease both;
}
.lb-m6-a4[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_lb-m6-fade-up 0.5s 0.24s ease both;
}
.lb-m6-a5[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_lb-m6-fade-up 0.5s 0.32s ease both;
}
/*# sourceMappingURL=link-bio-public-layout-vet.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LinkBioPublicLayoutVetComponent, [{
    type: Component,
    args: [{ selector: "app-link-bio-public-layout-vet", standalone: true, imports: [CommonModule, RouterLink], template: `<div class="lb-m6-root min-h-screen" [class.dark]="dark">
  <div class="flex justify-end gap-2 px-4 pt-4 absolute top-0 right-0 z-30">
    <button
      type="button"
      (click)="onToggleDark()"
      class="lb-m6-icon-pill flex items-center px-3 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20"
      aria-label="Alternar tema"
    >
      <svg class="hidden dark:block w-[14px] h-[14px] text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
      <svg class="block dark:hidden w-[14px] h-[14px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    </button>
    <button
      type="button"
      (click)="onShare()"
      class="lb-m6-icon-pill flex items-center px-3 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20"
      aria-label="Compartilhar"
    >
      <svg class="w-[14px] h-[14px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    </button>
  </div>

  <div class="lb-m6-paw-bg pt-16 pb-10 px-5 lb-m6-a1">
    <div class="max-w-lg mx-auto flex items-center gap-5">
      <div class="lb-m6-pet-ring shadow-lg">
        @if (clinic.logo_url) {
          <img [src]="clinic.logo_url" [alt]="clinic.name" class="w-full h-full rounded-full object-cover" />
        } @else {
          <span class="lb-m6-bounce" aria-hidden="true">\u{1F43E}</span>
        }
      </div>
      <div>
        <p class="text-[10px] font-bold tracking-[0.18em] uppercase text-white/50 mb-1">{{ coverKicker }}</p>
        <h1 class="text-[28px] sm:text-[34px] font-black text-white leading-tight tracking-tight">
          {{ clinic.name }}
        </h1>
        <p class="text-[13px] text-white/60 mt-0.5 font-medium">{{ taglineUnderTitle }}</p>
      </div>
    </div>
    <div class="flex items-center gap-3 mt-4 max-w-lg mx-auto flex-wrap">
      @if (clinic.is_open_now === true) {
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black bg-white/15 text-white">
          <span class="w-[6px] h-[6px] rounded-full bg-emerald-300 lb-m6-pulse-dot inline-block"></span>
          Aberto agora
        </span>
      } @else if (clinic.is_open_now === false) {
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black bg-white/10 text-white/50">
          <span class="w-[6px] h-[6px] rounded-full bg-white/30 inline-block"></span>
          Fechado agora
        </span>
      }
      @if (councilMetaLine) {
        <span class="text-[11px] text-white/35 font-medium">{{ councilMetaLine }}</span>
      }
    </div>
  </div>

  <div class="w-full max-w-lg mx-auto px-4 sm:px-6 pb-14 pt-5">
    @if (whatsappUrl()) {
      <div class="lb-m6-a2">
        <a
          [href]="whatsappUrl()"
          target="_blank"
          rel="noopener noreferrer"
          class="lb-m6-wpp w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-black text-[15px] no-underline"
        >
          <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="white">
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"
            />
            <path
              d="M12 0C5.373 0 0 5.373 0 12c0 2.108.549 4.09 1.508 5.814L0 24l6.335-1.489A11.926 11.926 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.5-5.198-1.375l-.372-.22-3.862.908.979-3.763-.242-.386A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"
            />
          </svg>
          {{ waCtaLabel }}
        </a>
      </div>
    }

    <div class="grid grid-cols-2 gap-2.5 mt-2.5 lb-m6-a2">
      @if (clinic.maps_url) {
        <a
          [href]="clinic.maps_url"
          target="_blank"
          rel="noopener noreferrer"
          class="lb-m6-sec flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white dark:bg-white/[0.05] border border-[#d8f3e3] dark:border-white/[0.06] hover:bg-[#f0faf4] dark:hover:bg-white/[0.08] text-[#1e7d47] dark:text-[#4dbf82] text-[13px] font-bold no-underline"
        >
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Como chegar
        </a>
      }
      @if (telHref()) {
        <a
          [href]="telHref()"
          class="lb-m6-sec flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white dark:bg-white/[0.05] border border-[#d8f3e3] dark:border-white/[0.06] hover:bg-[#f0faf4] dark:hover:bg-white/[0.08] text-[#1e7d47] dark:text-[#4dbf82] text-[13px] font-bold no-underline"
        >
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path
              d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.1 6.1l1.27-.72a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
            />
          </svg>
          Emerg\xEAncia
        </a>
      }
    </div>

    <div class="mt-5 lb-m6-a3">
      <div class="flex items-center gap-3 mb-3">
        <p class="text-[10px] font-black tracking-[0.1em] uppercase text-[#1e7d47] dark:text-[#4dbf82] whitespace-nowrap">Esp\xE9cies atendidas</p>
        <div class="flex-1 h-px bg-[#d8f3e3] dark:bg-white/[0.06]"></div>
      </div>
      <div class="flex flex-wrap gap-2">
        @for (sp of speciesChips; track sp.label) {
          <span class="lb-m6-chip" [class.lb-m6-chip-active]="sp.active" [class.lb-m6-chip-inactive]="!sp.active">{{ sp.label }}</span>
        }
      </div>
    </div>

    <div class="mt-5 lb-m6-a3">
      <div class="flex items-center gap-3 mb-3">
        <p class="text-[10px] font-black tracking-[0.1em] uppercase text-[#1e7d47] dark:text-[#4dbf82] whitespace-nowrap">Servi\xE7os</p>
        <div class="flex-1 h-px bg-[#d8f3e3] dark:bg-white/[0.06]"></div>
      </div>
      <div class="grid grid-cols-3 gap-2.5">
        @for (svc of serviceCards; track svc.title) {
          <div class="lb-m6-svc">
            <div class="text-2xl mb-1">{{ svc.icon }}</div>
            <p class="text-[11px] font-bold text-[#155c34] dark:text-[#aee4c5]">{{ svc.title }}</p>
          </div>
        }
      </div>
    </div>

    @if (hasAnyHour) {
      <div class="mt-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#d8f3e3] dark:border-white/[0.05] px-4 pt-4 pb-3 lb-m6-a3">
        <p class="text-[10px] font-black tracking-[0.1em] uppercase text-[#1e7d47] dark:text-[#4dbf82] mb-3">Funcionamento</p>
        @for (row of hoursGridArray; track row.label) {
          @if (row.text !== '\u2013') {
            <div
              class="flex justify-between text-[13px] py-2 border-b border-[#f0faf4] dark:border-white/[0.04] last:border-0"
              [class.pt-0]="$first"
            >
              <span class="font-bold text-gray-700 dark:text-gray-300">{{ row.label }}</span>
              <span class="font-black text-[#2da05e] dark:text-[#4dbf82]">{{ row.text }}</span>
            </div>
          }
        }
      </div>
    }

    @if (allDocs.length) {
      <div class="mt-5 lb-m6-a4">
        <div class="flex items-center gap-3 mb-1.5">
          <p class="text-[10px] font-black tracking-[0.1em] uppercase text-[#1e7d47] dark:text-[#4dbf82] whitespace-nowrap">{{ docsTitle }}</p>
          <div class="flex-1 h-px bg-[#d8f3e3] dark:bg-white/[0.06]"></div>
        </div>
        <p class="text-[12px] text-gray-500 dark:text-gray-600 mb-4 font-medium">{{ docsIntro }}</p>
        @for (link of allDocs; track trackDoc($index, link)) {
          @if (link.type === 'bio') {
            <a
              [href]="hrefBio(link.item)"
              target="_blank"
              rel="noopener noreferrer"
              class="lb-m6-doc flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#d8f3e3] dark:border-white/[0.05] mb-3 no-underline group text-inherit"
            >
              <div class="w-10 h-10 rounded-xl bg-[#f0faf4] dark:bg-[#1e7d47]/20 flex items-center justify-center flex-shrink-0 text-xl">\u{1F43E}</div>
              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-bold text-gray-800 dark:text-gray-200">{{ link.item.label }}</p>
                <p class="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5 truncate">{{ link.item.url }}</p>
              </div>
              <svg class="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-[#4dbf82] transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          } @else {
            <a
              [routerLink]="['/f', formToken(link.item)]"
              class="lb-m6-doc flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#d8f3e3] dark:border-white/[0.05] mb-3 no-underline group text-inherit"
            >
              <div class="w-10 h-10 rounded-xl bg-[#f0faf4] dark:bg-[#1e7d47]/20 flex items-center justify-center flex-shrink-0">
                <svg class="w-[18px] h-[18px] text-[#2da05e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-bold text-gray-800 dark:text-gray-200">{{ link.item.name }}</p>
                <p class="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5">Preenchimento online</p>
              </div>
              <svg class="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-[#4dbf82] transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          }
        }
      </div>
    }

    @if (clinic.address) {
      <div class="flex items-center gap-2 mt-5 lb-m6-a5">
        <svg class="w-[13px] h-[13px] text-[#2da05e] dark:text-[#4dbf82] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span class="text-[12px] text-gray-400 dark:text-gray-600 font-medium">{{ clinic.address }}</span>
      </div>
    }

    <div class="mt-8 pt-5 border-t border-[#d8f3e3] dark:border-white/[0.05] flex flex-wrap items-center justify-center gap-2 lb-m6-a5">
      <div class="w-[5px] h-[5px] rounded-full bg-[#2da05e] opacity-50"></div>
      <span class="text-[11px] text-gray-400 dark:text-gray-600 font-medium">Fichas digitais por</span>
      <a href="https://gestgo.com.br" target="_blank" rel="noopener noreferrer" class="text-[11px] font-black text-[#2da05e] no-underline hover:opacity-75">Gestgo</a>
      <span class="text-gray-300 dark:text-gray-700 text-[11px]">\xB7</span>
      <a routerLink="/privacidade" class="text-[11px] text-gray-400 no-underline hover:text-gray-600 transition-colors font-medium">Privacidade</a>
    </div>
  </div>
</div>
`, styles: [`@import "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap";

/* src/app/paginas/link-bio-public/link-bio-public-layout-vet.component.css */
:host {
  display: block;
}
.lb-m6-root {
  font-family:
    "Nunito",
    ui-sans-serif,
    system-ui,
    sans-serif;
  background: #f0faf4;
  color: #155c34;
  min-height: 100vh;
}
.lb-m6-root.dark {
  background: #080e0b;
  color: #d8f3e3;
}
.lb-m6-paw-bg {
  background-color: #1e7d47;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cellipse cx='14' cy='8' rx='3' ry='4'/%3E%3Cellipse cx='26' cy='8' rx='3' ry='4'/%3E%3Cellipse cx='8' cy='16' rx='4' ry='3'/%3E%3Cellipse cx='32' cy='16' rx='4' ry='3'/%3E%3Cellipse cx='20' cy='24' rx='8' ry='9'/%3E%3C/g%3E%3C/svg%3E");
}
.lb-m6-root.dark .lb-m6-paw-bg {
  background-color: #0d2e1a;
}
.lb-m6-pet-ring {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: 4px solid #fff;
  background: #aee4c5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  flex-shrink: 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}
.lb-m6-root.dark .lb-m6-pet-ring {
  border-color: #1a2e22;
}
.lb-m6-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  border: 2px solid transparent;
}
.lb-m6-chip-active {
  background: #2da05e;
  color: #fff;
  border-color: #2da05e;
}
.lb-m6-chip-inactive {
  background: #f0faf4;
  color: #2da05e;
  border-color: #aee4c5;
}
.lb-m6-root.dark .lb-m6-chip-inactive {
  background: #0d2e1a;
  border-color: #1e7d47;
  color: #4dbf82;
}
.lb-m6-svc {
  border-radius: 16px;
  padding: 14px;
  background: #fff;
  border: 1.5px solid #d8f3e3;
  transition: border-color 0.15s, transform 0.15s;
  text-align: center;
}
.lb-m6-svc:hover {
  border-color: #4dbf82;
  transform: translateY(-2px);
}
.lb-m6-root.dark .lb-m6-svc {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(77, 191, 130, 0.12);
}
.lb-m6-doc {
  transition: transform 0.15s, background 0.15s;
}
.lb-m6-doc:hover {
  transform: translateX(4px);
}
.lb-m6-wpp {
  transition: filter 0.15s, transform 0.1s;
}
.lb-m6-wpp:hover {
  filter: brightness(1.08);
}
.lb-m6-sec {
  transition: background 0.15s, transform 0.1s;
}
.lb-m6-icon-pill {
  cursor: pointer;
  border: none;
  background: transparent;
  transition: opacity 0.15s;
}
.lb-m6-icon-pill:hover {
  opacity: 0.6;
}
@keyframes lb-m6-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
.lb-m6-pulse-dot {
  animation: lb-m6-pulse 2s ease-in-out infinite;
}
@keyframes lb-m6-bounce2 {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
.lb-m6-bounce {
  animation: lb-m6-bounce2 2s ease-in-out infinite;
}
@keyframes lb-m6-fade-up {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.lb-m6-a1 {
  animation: lb-m6-fade-up 0.5s ease both;
}
.lb-m6-a2 {
  animation: lb-m6-fade-up 0.5s 0.08s ease both;
}
.lb-m6-a3 {
  animation: lb-m6-fade-up 0.5s 0.16s ease both;
}
.lb-m6-a4 {
  animation: lb-m6-fade-up 0.5s 0.24s ease both;
}
.lb-m6-a5 {
  animation: lb-m6-fade-up 0.5s 0.32s ease both;
}
/*# sourceMappingURL=link-bio-public-layout-vet.component.css.map */
`] }]
  }], null, { clinic: [{
    type: Input,
    args: [{ required: true }]
  }], bioLinks: [{
    type: Input
  }], dark: [{
    type: Input
  }], allDocs: [{
    type: Input
  }], publicSlug: [{
    type: Input
  }], linkBioPreview: [{
    type: Input
  }], toggleDark: [{
    type: Output
  }], share: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LinkBioPublicLayoutVetComponent, { className: "LinkBioPublicLayoutVetComponent", filePath: "src/app/paginas/link-bio-public/link-bio-public-layout-vet.component.ts", lineNumber: 37 });
})();

// src/app/paginas/link-bio-public/link-bio-public-layout-pedia.component.ts
var _c04 = (a0) => ["/f", a0];
var _forTrack03 = ($index, $item) => $item.title;
var _forTrack13 = ($index, $item) => $item.label;
function LinkBioPublicLayoutPediaComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 29);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.clinic.logo_url, \u0275\u0275sanitizeUrl)("alt", ctx_r0.clinic.name);
  }
}
function LinkBioPublicLayoutPediaComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, "\u2B50");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutPediaComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275element(1, "span", 70);
    \u0275\u0275text(2, " Aberto agora ");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutPediaComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275element(1, "span", 71);
    \u0275\u0275text(2, " Fechado agora ");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutPediaComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.councilMetaLine);
  }
}
function LinkBioPublicLayoutPediaComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "a", 72);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 73);
    \u0275\u0275element(3, "path", 74)(4, "path", 75);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("href", ctx_r0.whatsappUrl(), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.waCtaLabel, " ");
  }
}
function LinkBioPublicLayoutPediaComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 41);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 76);
    \u0275\u0275element(2, "path", 77)(3, "circle", 78);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Como chegar ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("href", ctx_r0.clinic.maps_url, \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutPediaComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 42);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 76);
    \u0275\u0275element(2, "path", 79);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Emerg\xEAncia ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("href", ctx_r0.telHref(), \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutPediaComponent_For_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 80);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "p", 81);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 82);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const st_r2 = ctx.$implicit;
    const $index_r3 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.stepNumClass(st_r2.tone));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", $index_r3 + 1, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(st_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(st_r2.subtitle);
  }
}
function LinkBioPublicLayoutPediaComponent_For_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83)(1, "p", 84);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 85);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 86);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ab_r4 = ctx.$implicit;
    \u0275\u0275classProp("bg-sky-50", ab_r4.theme === "sky")("dark:bg-sky-900/10", ab_r4.theme === "sky")("border-sky-100", ab_r4.theme === "sky")("dark:border-sky-700/20", ab_r4.theme === "sky")("bg-amber-50", ab_r4.theme === "lemon")("dark:bg-amber-400/10", ab_r4.theme === "lemon")("border-amber-100", ab_r4.theme === "lemon")("dark:border-amber-400/20", ab_r4.theme === "lemon")("bg-rose-50", ab_r4.theme === "coral")("dark:bg-rose-900/10", ab_r4.theme === "coral")("border-rose-100", ab_r4.theme === "coral")("dark:border-rose-600/20", ab_r4.theme === "coral");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ab_r4.emoji);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-sky-700", ab_r4.theme === "sky")("dark:text-sky-400", ab_r4.theme === "sky")("text-amber-700", ab_r4.theme === "lemon")("dark:text-amber-400", ab_r4.theme === "lemon")("text-rose-600", ab_r4.theme === "coral")("dark:text-rose-400", ab_r4.theme === "coral");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ab_r4.title, " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("text-sky-500", ab_r4.theme === "sky")("text-amber-500", ab_r4.theme === "lemon")("text-rose-400", ab_r4.theme === "coral");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ab_r4.range, " ");
  }
}
function LinkBioPublicLayoutPediaComponent_For_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 87);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    \u0275\u0275classProp("bg-sky-50", c_r5 !== "+ Particular")("dark:bg-sky-900/15", c_r5 !== "+ Particular")("text-sky-600", c_r5 !== "+ Particular")("dark:text-sky-400", c_r5 !== "+ Particular")("border-sky-100", c_r5 !== "+ Particular")("dark:border-sky-700/25", c_r5 !== "+ Particular")("bg-emerald-50", c_r5 === "+ Particular")("dark:bg-emerald-900/10", c_r5 === "+ Particular")("text-emerald-600", c_r5 === "+ Particular")("dark:text-emerald-400", c_r5 === "+ Particular")("border-emerald-100", c_r5 === "+ Particular")("dark:border-emerald-500/20", c_r5 === "+ Particular");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r5);
  }
}
function LinkBioPublicLayoutPediaComponent_Conditional_76_For_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 88)(1, "span", 89);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 90);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r6.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r6.text);
  }
}
function LinkBioPublicLayoutPediaComponent_Conditional_76_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LinkBioPublicLayoutPediaComponent_Conditional_76_For_4_Conditional_0_Template, 5, 2, "div", 88);
  }
  if (rf & 2) {
    const row_r6 = ctx.$implicit;
    \u0275\u0275conditional(row_r6.text !== "\u2013" ? 0 : -1);
  }
}
function LinkBioPublicLayoutPediaComponent_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61)(1, "p", 55);
    \u0275\u0275text(2, "Funcionamento");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, LinkBioPublicLayoutPediaComponent_Conditional_76_For_4_Template, 1, 1, null, null, _forTrack13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.hoursGridArray);
  }
}
function LinkBioPublicLayoutPediaComponent_Conditional_77_For_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 93)(1, "div", 95);
    \u0275\u0275text(2, "\u{1F4CB}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 96)(4, "p", 81);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 97);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 98);
    \u0275\u0275element(9, "polyline", 99);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r0.hrefBio(link_r7.item), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(link_r7.item.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(link_r7.item.url);
  }
}
function LinkBioPublicLayoutPediaComponent_Conditional_77_For_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 94)(1, "div", 100);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 101);
    \u0275\u0275element(3, "path", 102)(4, "polyline", 103);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 96)(6, "p", 81);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 82);
    \u0275\u0275text(9, "Preenchimento online");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(10, "svg", 98);
    \u0275\u0275element(11, "polyline", 99);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c04, ctx_r0.formToken(link_r7.item)));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(link_r7.item.name);
  }
}
function LinkBioPublicLayoutPediaComponent_Conditional_77_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LinkBioPublicLayoutPediaComponent_Conditional_77_For_8_Conditional_0_Template, 10, 3, "a", 93)(1, LinkBioPublicLayoutPediaComponent_Conditional_77_For_8_Conditional_1_Template, 12, 4, "a", 94);
  }
  if (rf & 2) {
    const link_r7 = ctx.$implicit;
    \u0275\u0275conditional(link_r7.type === "bio" ? 0 : 1);
  }
}
function LinkBioPublicLayoutPediaComponent_Conditional_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "div", 91)(2, "p", 50);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "div", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 92);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, LinkBioPublicLayoutPediaComponent_Conditional_77_For_8_Template, 2, 1, null, null, \u0275\u0275componentInstance().trackDoc, true);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.docsTitle);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.docsIntro);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.allDocs);
  }
}
function LinkBioPublicLayoutPediaComponent_Conditional_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 104);
    \u0275\u0275element(2, "path", 77)(3, "circle", 78);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span", 105);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.clinic.address);
  }
}
var DEFAULT_STEPS = [
  {
    title: "Preencha as fichas abaixo",
    subtitle: "Antes de vir \xE0 cl\xEDnica, economiza tempo na recep\xE7\xE3o",
    tone: "sky"
  },
  {
    title: "Traga documento e cart\xE3o do plano",
    subtitle: "RG ou certid\xE3o da crian\xE7a + documento do respons\xE1vel",
    tone: "lemon"
  },
  {
    title: "Chegue 10 min antes",
    subtitle: "Para confirmar os dados na recep\xE7\xE3o com tranquilidade",
    tone: "mint"
  }
];
var DEFAULT_AGE_BANDS = [
  { emoji: "\u{1F476}", title: "Rec\xE9m-nascido", range: "0 \u2013 28 dias", theme: "sky" },
  { emoji: "\u{1F9D2}", title: "Crian\xE7a", range: "1 \u2013 10 anos", theme: "lemon" },
  { emoji: "\u{1F9D1}", title: "Adolescente", range: "11 \u2013 18 anos", theme: "coral" }
];
var LinkBioPublicLayoutPediaComponent = class _LinkBioPublicLayoutPediaComponent {
  linkBio = inject(LinkBioService);
  clinic;
  bioLinks = [];
  dark = false;
  allDocs = [];
  publicSlug = "";
  linkBioPreview = false;
  toggleDark = new EventEmitter();
  share = new EventEmitter();
  get extra() {
    const e = this.clinic.link_bio_extra;
    return e && typeof e === "object" ? e : {};
  }
  get hoursGridArray() {
    const grid = this.clinic.business_hours_grid;
    if (!grid || typeof grid !== "object")
      return [];
    const order = ["1", "2", "3", "4", "5", "6", "7"];
    return order.map((k) => grid[k]).filter(Boolean);
  }
  get hasAnyHour() {
    return this.hoursGridArray.some((d) => d.text !== "\u2013");
  }
  get coverKicker() {
    return this.extra.ped_cover_kicker?.trim() || "Pediatria";
  }
  get taglineUnderTitle() {
    return this.clinic.short_description?.trim() || this.extra.hero_tagline?.trim() || "Cuidando da sa\xFAde das crian\xE7as";
  }
  get councilMetaLine() {
    const parts = [];
    if (this.extra.council_registration?.trim())
      parts.push(this.extra.council_registration.trim());
    if (this.clinic.founded_year)
      parts.push(`Pediatria desde ${this.clinic.founded_year}`);
    return parts.join(" \xB7 ");
  }
  get parentNoticeTitle() {
    return this.extra.ped_parent_notice_title?.trim() || "Importante para os pais";
  }
  get parentNoticeBody() {
    return this.extra.ped_parent_notice_body?.trim() || "As fichas e termos devem ser preenchidos e assinados pelo respons\xE1vel legal da crian\xE7a (pai, m\xE3e ou guardi\xE3o com documenta\xE7\xE3o).";
  }
  get firstVisitSteps() {
    const s = this.extra.ped_first_visit_steps;
    if (s?.length) {
      return s.map((x, i) => ({
        title: x.title,
        subtitle: x.subtitle,
        tone: x.tone ?? ["sky", "lemon", "mint"][i % 3]
      }));
    }
    return DEFAULT_STEPS;
  }
  get ageBands() {
    const b = this.extra.ped_age_bands;
    if (b?.length) {
      return b.map((x, i) => ({
        emoji: x.emoji,
        title: x.title,
        range: x.range,
        theme: x.theme ?? ["sky", "lemon", "coral"][i % 3]
      }));
    }
    return DEFAULT_AGE_BANDS;
  }
  get conveniosList() {
    const raw = this.extra.convenios?.map((c) => String(c).trim()).filter(Boolean);
    return raw?.length ? raw : ["Unimed", "Amil", "SulAm\xE9rica", "Bradesco Sa\xFAde", "+ Particular"];
  }
  get docsTitle() {
    return this.extra.ped_docs_section_title?.trim() || "Fichas e documentos";
  }
  get docsIntro() {
    return this.extra.ped_docs_intro?.trim() || "Preencha com os dados da crian\xE7a antes da consulta";
  }
  get waCtaLabel() {
    return this.extra.ped_wa_cta_label?.trim() || "Marcar consulta";
  }
  whatsappUrl() {
    const phone = this.clinic.phone?.replace(/\D/g, "") ?? "";
    const wa = phone.length >= 10 && phone.length <= 11 ? "55" + phone : phone;
    return wa ? `https://wa.me/${wa}` : "";
  }
  telHref() {
    const raw = this.clinic.phone?.trim() ?? "";
    if (!raw)
      return "";
    if (raw.startsWith("+"))
      return `tel:${raw}`;
    const d = raw.replace(/\D/g, "");
    if (!d)
      return "";
    const intl = d.length <= 11 && !d.startsWith("55") ? "55" + d : d;
    return `tel:+${intl}`;
  }
  formToken(f) {
    const parts = f.public_url.split("/f/");
    return parts.length > 1 ? parts[1].split("?")[0] : "";
  }
  trackDoc(_i, link) {
    return link.type === "bio" ? `b-${link.item.id}` : `f-${link.item.id}`;
  }
  hrefBio(link) {
    return this.linkBio.outboundBioLinkUrl(this.publicSlug, link, this.linkBioPreview);
  }
  stepNumClass(tone) {
    if (tone === "lemon")
      return "bg-[#facc15] text-[#7c5f00]";
    if (tone === "mint")
      return "bg-[#22c55e] text-white";
    return "bg-[#0ea5e9] text-white";
  }
  onToggleDark() {
    this.toggleDark.emit();
  }
  onShare() {
    this.share.emit();
  }
  static \u0275fac = function LinkBioPublicLayoutPediaComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LinkBioPublicLayoutPediaComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LinkBioPublicLayoutPediaComponent, selectors: [["app-link-bio-public-layout-pedia"]], inputs: { clinic: "clinic", bioLinks: "bioLinks", dark: "dark", allDocs: "allDocs", publicSlug: "publicSlug", linkBioPreview: "linkBioPreview" }, outputs: { toggleDark: "toggleDark", share: "share" }, decls: 89, vars: 16, consts: [[1, "lb-m7-root", "min-h-screen"], [1, "flex", "justify-end", "gap-2", "px-4", "pt-4", "absolute", "top-0", "right-0", "z-30"], ["type", "button", "aria-label", "Alternar tema", 1, "lb-m7-icon-pill", "flex", "items-center", "px-3", "py-2", "rounded-full", "bg-white/15", "backdrop-blur-sm", "border", "border-white/20", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "hidden", "dark:block", "w-[14px]", "h-[14px]", "text-amber-300"], ["cx", "12", "cy", "12", "r", "5"], ["x1", "12", "y1", "1", "x2", "12", "y2", "3"], ["x1", "12", "y1", "21", "x2", "12", "y2", "23"], ["x1", "4.22", "y1", "4.22", "x2", "5.64", "y2", "5.64"], ["x1", "18.36", "y1", "18.36", "x2", "19.78", "y2", "19.78"], ["x1", "1", "y1", "12", "x2", "3", "y2", "12"], ["x1", "21", "y1", "12", "x2", "23", "y2", "12"], ["x1", "4.22", "y1", "19.78", "x2", "5.64", "y2", "18.36"], ["x1", "18.36", "y1", "5.64", "x2", "19.78", "y2", "4.22"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "block", "dark:hidden", "w-[14px]", "h-[14px]", "text-white"], ["d", "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"], ["type", "button", "aria-label", "Compartilhar", 1, "lb-m7-icon-pill", "flex", "items-center", "px-3", "py-2", "rounded-full", "bg-white/15", "backdrop-blur-sm", "border", "border-white/20", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-[14px]", "h-[14px]", "text-white"], ["cx", "18", "cy", "5", "r", "3"], ["cx", "6", "cy", "12", "r", "3"], ["cx", "18", "cy", "19", "r", "3"], ["x1", "8.59", "y1", "13.51", "x2", "15.42", "y2", "17.49"], ["x1", "15.41", "y1", "6.51", "x2", "8.59", "y2", "10.49"], [1, "lb-m7-cover", "pt-16", "pb-12", "px-5", "lb-m7-a1", "relative"], [1, "lb-m7-blob1"], [1, "lb-m7-blob2"], [1, "lb-m7-blob3"], [1, "max-w-lg", "mx-auto", "relative", "z-10"], [1, "flex", "items-center", "gap-4", "mb-4"], [1, "w-[72px]", "h-[72px]", "rounded-2xl", "bg-white", "flex", "items-center", "justify-center", "shadow-lg", "flex-shrink-0", "overflow-hidden"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], ["aria-hidden", "true", 1, "text-3xl", "lb-m7-float"], [1, "text-[10px]", "font-bold", "tracking-[0.18em]", "uppercase", "text-white/55", "mb-0.5"], [1, "lb-m7-fredoka", "text-[30px]", "sm:text-[36px]", "text-white", "leading-tight", "font-semibold"], [1, "text-[13px]", "text-white/65", "font-medium"], [1, "flex", "items-center", "gap-3", "flex-wrap"], [1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-full", "text-[11px]", "font-black", "bg-white/20", "text-white"], [1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-full", "text-[11px]", "font-black", "bg-white/10", "text-white/50"], [1, "text-[11px]", "text-white/40", "font-medium"], [1, "w-full", "max-w-lg", "mx-auto", "px-4", "sm:px-6", "pb-14", "pt-5"], [1, "lb-m7-a2"], [1, "grid", "grid-cols-2", "gap-2.5", "mt-2.5", "lb-m7-a2"], ["target", "_blank", "rel", "noopener noreferrer", 1, "lb-m7-sec", "flex", "items-center", "justify-center", "gap-2", "py-3", "px-3", "rounded-xl", "bg-white", "dark:bg-white/[0.05]", "border", "border-[#ddf2fd]", "dark:border-white/[0.06]", "hover:bg-[#f0f9ff]", "dark:hover:bg-white/[0.08]", "text-[#0284c7]", "dark:text-[#38bdf8]", "text-[13px]", "font-bold", "no-underline", 3, "href"], [1, "lb-m7-sec", "flex", "items-center", "justify-center", "gap-2", "py-3", "px-3", "rounded-xl", "bg-rose-50", "dark:bg-rose-900/10", "border", "border-rose-100", "dark:border-rose-600/20", "hover:bg-rose-100", "dark:hover:bg-rose-900/15", "text-rose-600", "dark:text-rose-400", "text-[13px]", "font-bold", "no-underline", 3, "href"], [1, "lb-m7-resp", "mt-5", "lb-m7-a3"], [1, "flex", "items-start", "gap-3"], [1, "w-9", "h-9", "rounded-xl", "bg-amber-400/30", "flex", "items-center", "justify-center", "flex-shrink-0", "text-lg"], [1, "text-[12px]", "font-black", "text-amber-800", "dark:text-amber-400", "uppercase", "tracking-wide"], [1, "text-[12px]", "text-amber-700", "dark:text-amber-500", "mt-1", "leading-relaxed", "font-medium"], [1, "mt-5", "lb-m7-a3"], [1, "flex", "items-center", "gap-3", "mb-3"], [1, "text-[10px]", "font-black", "tracking-[0.1em]", "uppercase", "text-[#0284c7]", "dark:text-[#38bdf8]", "whitespace-nowrap"], [1, "flex-1", "h-px", "bg-[#ddf2fd]", "dark:bg-white/[0.06]"], [1, "flex", "flex-col", "gap-2.5"], [1, "flex", "items-start", "gap-3", "py-3", "px-3.5", "rounded-2xl", "bg-white", "dark:bg-white/[0.03]", "border", "border-[#ddf2fd]", "dark:border-sky-500/15"], [1, "mt-5", "rounded-2xl", "bg-white", "dark:bg-white/[0.03]", "border", "border-[#ddf2fd]", "dark:border-white/[0.05]", "px-4", "pt-4", "pb-3", "lb-m7-a3"], [1, "text-[10px]", "font-black", "tracking-[0.1em]", "uppercase", "text-[#0284c7]", "dark:text-[#38bdf8]", "mb-3"], [1, "grid", "grid-cols-3", "gap-2"], [1, "text-center", "py-3", "px-2", "rounded-xl", "border", 3, "bg-sky-50", "dark:bg-sky-900/10", "border-sky-100", "dark:border-sky-700/20", "bg-amber-50", "dark:bg-amber-400/10", "border-amber-100", "dark:border-amber-400/20", "bg-rose-50", "dark:bg-rose-900/10", "border-rose-100", "dark:border-rose-600/20"], [1, "mt-4", "rounded-2xl", "bg-white", "dark:bg-white/[0.03]", "border", "border-[#ddf2fd]", "dark:border-white/[0.05]", "px-4", "pt-4", "pb-3", "lb-m7-a3"], [1, "flex", "flex-wrap", "gap-2"], [1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-full", "text-[11px]", "font-bold", "border", 3, "bg-sky-50", "dark:bg-sky-900/15", "text-sky-600", "dark:text-sky-400", "border-sky-100", "dark:border-sky-700/25", "bg-emerald-50", "dark:bg-emerald-900/10", "text-emerald-600", "dark:text-emerald-400", "border-emerald-100", "dark:border-emerald-500/20"], [1, "mt-4", "rounded-2xl", "bg-white", "dark:bg-white/[0.03]", "border", "border-[#ddf2fd]", "dark:border-white/[0.05]", "px-4", "pt-4", "pb-3", "lb-m7-a4"], [1, "mt-5", "lb-m7-a4"], [1, "flex", "items-center", "gap-2", "mt-5", "lb-m7-a5"], [1, "mt-8", "pt-5", "border-t", "border-[#ddf2fd]", "dark:border-white/[0.05]", "flex", "flex-wrap", "items-center", "justify-center", "gap-2", "lb-m7-a5"], [1, "w-[5px]", "h-[5px]", "rounded-full", "bg-sky-400", "opacity-60"], [1, "text-[11px]", "text-gray-400", "dark:text-gray-600", "font-medium"], ["href", "https://gestgo.com.br", "target", "_blank", "rel", "noopener noreferrer", 1, "text-[11px]", "font-black", "text-sky-500", "no-underline", "hover:opacity-75"], [1, "text-gray-300", "dark:text-gray-700", "text-[11px]"], ["routerLink", "/privacidade", 1, "text-[11px]", "text-gray-400", "no-underline", "hover:text-gray-600", "transition-colors", "font-medium"], [1, "w-[6px]", "h-[6px]", "rounded-full", "bg-[#4ade80]", "lb-m7-pulse-dot", "inline-block"], [1, "w-[6px]", "h-[6px]", "rounded-full", "bg-white/30", "inline-block"], ["target", "_blank", "rel", "noopener noreferrer", 1, "lb-m7-wpp", "w-full", "flex", "items-center", "justify-center", "gap-3", "py-4", "rounded-2xl", "bg-[#22c55e]", "hover:bg-[#16a34a]", "text-white", "font-bold", "text-[15px]", "no-underline", 3, "href"], ["viewBox", "0 0 24 24", "fill", "white", 1, "w-5", "h-5", "shrink-0"], ["d", "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"], ["d", "M12 0C5.373 0 0 5.373 0 12c0 2.108.549 4.09 1.508 5.814L0 24l6.335-1.489A11.926 11.926 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.5-5.198-1.375l-.372-.22-3.862.908.979-3.763-.242-.386A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4", "shrink-0"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"], ["cx", "12", "cy", "10", "r", "3"], ["d", "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.1 6.1l1.27-.72a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"], [1, "w-7", "h-7", "rounded-full", "flex", "items-center", "justify-center", "text-[13px]", "font-extrabold", "lb-m7-fredoka", "shrink-0", 3, "ngClass"], [1, "text-[13px]", "font-bold", "text-gray-800", "dark:text-gray-200"], [1, "text-[11px]", "text-gray-400", "dark:text-gray-600", "mt-0.5"], [1, "text-center", "py-3", "px-2", "rounded-xl", "border"], [1, "text-lg", "mb-1"], [1, "text-[11px]", "font-bold"], [1, "text-[10px]"], [1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-full", "text-[11px]", "font-bold", "border"], [1, "flex", "justify-between", "text-[13px]", "py-2", "border-b", "border-sky-50", "dark:border-white/[0.04]", "last:border-0", "first:pt-0"], [1, "font-bold", "text-gray-700", "dark:text-gray-300"], [1, "font-black", "text-[#0ea5e9]", "dark:text-[#38bdf8]"], [1, "flex", "items-center", "gap-3", "mb-1.5"], [1, "text-[12px]", "text-gray-500", "dark:text-gray-600", "mb-4", "font-medium"], ["target", "_blank", "rel", "noopener noreferrer", 1, "lb-m7-doc", "flex", "items-center", "gap-3.5", "p-4", "rounded-2xl", "bg-white", "dark:bg-white/[0.03]", "border", "border-[#ddf2fd]", "dark:border-white/[0.05]", "mb-3", "no-underline", "group", "text-inherit", 3, "href"], [1, "lb-m7-doc", "flex", "items-center", "gap-3.5", "p-4", "rounded-2xl", "bg-white", "dark:bg-white/[0.03]", "border", "border-[#ddf2fd]", "dark:border-white/[0.05]", "mb-3", "no-underline", "group", "text-inherit", 3, "routerLink"], [1, "w-10", "h-10", "rounded-xl", "bg-sky-50", "dark:bg-sky-900/15", "flex", "items-center", "justify-center", "flex-shrink-0", "text-xl"], [1, "flex-1", "min-w-0"], [1, "text-[11px]", "text-gray-400", "dark:text-gray-600", "mt-0.5", "truncate"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4", "text-gray-300", "dark:text-gray-700", "group-hover:text-sky-400", "transition-colors", "shrink-0"], ["points", "9 18 15 12 9 6"], [1, "w-10", "h-10", "rounded-xl", "bg-sky-50", "dark:bg-sky-900/15", "flex", "items-center", "justify-center", "flex-shrink-0"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-[18px]", "h-[18px]", "text-sky-500"], ["d", "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"], ["points", "14 2 14 8 20 8"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-[13px]", "h-[13px]", "text-sky-400", "dark:text-sky-600", "flex-shrink-0"], [1, "text-[12px]", "text-gray-400", "dark:text-gray-600", "font-medium"]], template: function LinkBioPublicLayoutPediaComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275listener("click", function LinkBioPublicLayoutPediaComponent_Template_button_click_2_listener() {
        return ctx.onToggleDark();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(3, "svg", 3);
      \u0275\u0275element(4, "circle", 4)(5, "line", 5)(6, "line", 6)(7, "line", 7)(8, "line", 8)(9, "line", 9)(10, "line", 10)(11, "line", 11)(12, "line", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "svg", 13);
      \u0275\u0275element(14, "path", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(15, "button", 15);
      \u0275\u0275listener("click", function LinkBioPublicLayoutPediaComponent_Template_button_click_15_listener() {
        return ctx.onShare();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(16, "svg", 16);
      \u0275\u0275element(17, "circle", 17)(18, "circle", 18)(19, "circle", 19)(20, "line", 20)(21, "line", 21);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(22, "div", 22);
      \u0275\u0275element(23, "div", 23)(24, "div", 24)(25, "div", 25);
      \u0275\u0275elementStart(26, "div", 26)(27, "div", 27)(28, "div", 28);
      \u0275\u0275conditionalCreate(29, LinkBioPublicLayoutPediaComponent_Conditional_29_Template, 1, 2, "img", 29)(30, LinkBioPublicLayoutPediaComponent_Conditional_30_Template, 2, 0, "span", 30);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div")(32, "p", 31);
      \u0275\u0275text(33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "h1", 32);
      \u0275\u0275text(35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "p", 33);
      \u0275\u0275text(37);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(38, "div", 34);
      \u0275\u0275conditionalCreate(39, LinkBioPublicLayoutPediaComponent_Conditional_39_Template, 3, 0, "span", 35)(40, LinkBioPublicLayoutPediaComponent_Conditional_40_Template, 3, 0, "span", 36);
      \u0275\u0275conditionalCreate(41, LinkBioPublicLayoutPediaComponent_Conditional_41_Template, 2, 1, "span", 37);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(42, "div", 38);
      \u0275\u0275conditionalCreate(43, LinkBioPublicLayoutPediaComponent_Conditional_43_Template, 6, 2, "div", 39);
      \u0275\u0275elementStart(44, "div", 40);
      \u0275\u0275conditionalCreate(45, LinkBioPublicLayoutPediaComponent_Conditional_45_Template, 5, 1, "a", 41);
      \u0275\u0275conditionalCreate(46, LinkBioPublicLayoutPediaComponent_Conditional_46_Template, 4, 1, "a", 42);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "div", 43)(48, "div", 44)(49, "div", 45);
      \u0275\u0275text(50, "\u{1F46A}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "div")(52, "p", 46);
      \u0275\u0275text(53);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "p", 47);
      \u0275\u0275text(55);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(56, "div", 48)(57, "div", 49)(58, "p", 50);
      \u0275\u0275text(59, "Primeira consulta");
      \u0275\u0275elementEnd();
      \u0275\u0275element(60, "div", 51);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "div", 52);
      \u0275\u0275repeaterCreate(62, LinkBioPublicLayoutPediaComponent_For_63_Template, 8, 4, "div", 53, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "div", 54)(65, "p", 55);
      \u0275\u0275text(66, "Faixas et\xE1rias atendidas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "div", 56);
      \u0275\u0275repeaterCreate(68, LinkBioPublicLayoutPediaComponent_For_69_Template, 7, 45, "div", 57, _forTrack03);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(70, "div", 58)(71, "p", 55);
      \u0275\u0275text(72, "Conv\xEAnios aceitos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "div", 59);
      \u0275\u0275repeaterCreate(74, LinkBioPublicLayoutPediaComponent_For_75_Template, 2, 25, "span", 60, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(76, LinkBioPublicLayoutPediaComponent_Conditional_76_Template, 5, 0, "div", 61);
      \u0275\u0275conditionalCreate(77, LinkBioPublicLayoutPediaComponent_Conditional_77_Template, 9, 2, "div", 62);
      \u0275\u0275conditionalCreate(78, LinkBioPublicLayoutPediaComponent_Conditional_78_Template, 6, 1, "div", 63);
      \u0275\u0275elementStart(79, "div", 64);
      \u0275\u0275element(80, "div", 65);
      \u0275\u0275elementStart(81, "span", 66);
      \u0275\u0275text(82, "Fichas digitais por");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "a", 67);
      \u0275\u0275text(84, "Gestgo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "span", 68);
      \u0275\u0275text(86, "\xB7");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(87, "a", 69);
      \u0275\u0275text(88, "Privacidade");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("dark", ctx.dark);
      \u0275\u0275advance(29);
      \u0275\u0275conditional(ctx.clinic.logo_url ? 29 : 30);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.coverKicker);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.clinic.name, " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.taglineUnderTitle);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.clinic.is_open_now === true ? 39 : ctx.clinic.is_open_now === false ? 40 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.councilMetaLine ? 41 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.whatsappUrl() ? 43 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.clinic.maps_url ? 45 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.telHref() ? 46 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.parentNoticeTitle);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.parentNoticeBody);
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.firstVisitSteps);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.ageBands);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.conveniosList);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.hasAnyHour ? 76 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.allDocs.length ? 77 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.clinic.address ? 78 : -1);
    }
  }, dependencies: [CommonModule, NgClass, RouterLink], styles: ['@import "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.lb-m7-root[_ngcontent-%COMP%] {\n  font-family:\n    "Nunito",\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n  background: #f0f9ff;\n  color: #0369a1;\n  min-height: 100vh;\n}\n.lb-m7-root.dark[_ngcontent-%COMP%] {\n  background: #060c12;\n  color: #bae6fd;\n}\n.lb-m7-root[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.lb-m7-fredoka[_ngcontent-%COMP%] {\n  font-family:\n    "Fredoka",\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\n.lb-m7-cover[_ngcontent-%COMP%] {\n  background: #0ea5e9;\n  position: relative;\n  overflow: hidden;\n}\n.lb-m7-root.dark[_ngcontent-%COMP%]   .lb-m7-cover[_ngcontent-%COMP%] {\n  background: #0c2a3d;\n}\n.lb-m7-blob1[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 160px;\n  height: 160px;\n  border-radius: 50%;\n  background: rgba(250, 204, 21, 0.25);\n  top: -40px;\n  right: -30px;\n}\n.lb-m7-blob2[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  background: rgba(244, 63, 94, 0.2);\n  bottom: -20px;\n  left: 30%;\n}\n.lb-m7-blob3[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n  background: rgba(74, 222, 128, 0.2);\n  top: 20px;\n  left: 20px;\n}\n.lb-m7-doc[_ngcontent-%COMP%] {\n  transition: transform 0.15s, background 0.15s;\n}\n.lb-m7-doc[_ngcontent-%COMP%]:hover {\n  transform: translateX(4px);\n}\n.lb-m7-feat[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.lb-m7-wpp[_ngcontent-%COMP%] {\n  transition: filter 0.15s, transform 0.1s;\n}\n.lb-m7-wpp[_ngcontent-%COMP%]:hover {\n  filter: brightness(1.08);\n}\n.lb-m7-sec[_ngcontent-%COMP%] {\n  transition: background 0.15s, transform 0.1s;\n}\n.lb-m7-icon-pill[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border: none;\n  background: transparent;\n  transition: opacity 0.15s;\n}\n.lb-m7-icon-pill[_ngcontent-%COMP%]:hover {\n  opacity: 0.6;\n}\n.lb-m7-resp[_ngcontent-%COMP%] {\n  border-radius: 20px;\n  padding: 14px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #fef9c3,\n      #fef3c7);\n  border: 2px solid #fde68a;\n}\n.lb-m7-root.dark[_ngcontent-%COMP%]   .lb-m7-resp[_ngcontent-%COMP%] {\n  background: rgba(234, 179, 8, 0.08);\n  border-color: rgba(234, 179, 8, 0.2);\n}\n@keyframes _ngcontent-%COMP%_lb-m7-pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.3;\n  }\n}\n.lb-m7-pulse-dot[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_lb-m7-pulse 2s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_lb-m7-float {\n  0%, 100% {\n    transform: translateY(0) rotate(-2deg);\n  }\n  50% {\n    transform: translateY(-6px) rotate(2deg);\n  }\n}\n.lb-m7-float[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_lb-m7-float 3s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_lb-m7-fade-up {\n  from {\n    opacity: 0;\n    transform: translateY(14px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.lb-m7-a1[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_lb-m7-fade-up 0.5s ease both;\n}\n.lb-m7-a2[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_lb-m7-fade-up 0.5s 0.08s ease both;\n}\n.lb-m7-a3[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_lb-m7-fade-up 0.5s 0.16s ease both;\n}\n.lb-m7-a4[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_lb-m7-fade-up 0.5s 0.24s ease both;\n}\n.lb-m7-a5[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_lb-m7-fade-up 0.5s 0.32s ease both;\n}\n/*# sourceMappingURL=link-bio-public-layout-pedia.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LinkBioPublicLayoutPediaComponent, [{
    type: Component,
    args: [{ selector: "app-link-bio-public-layout-pedia", standalone: true, imports: [CommonModule, RouterLink], template: `<div class="lb-m7-root min-h-screen" [class.dark]="dark">
  <div class="flex justify-end gap-2 px-4 pt-4 absolute top-0 right-0 z-30">
    <button
      type="button"
      (click)="onToggleDark()"
      class="lb-m7-icon-pill flex items-center px-3 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20"
      aria-label="Alternar tema"
    >
      <svg class="hidden dark:block w-[14px] h-[14px] text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
      <svg class="block dark:hidden w-[14px] h-[14px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    </button>
    <button
      type="button"
      (click)="onShare()"
      class="lb-m7-icon-pill flex items-center px-3 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20"
      aria-label="Compartilhar"
    >
      <svg class="w-[14px] h-[14px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    </button>
  </div>

  <div class="lb-m7-cover pt-16 pb-12 px-5 lb-m7-a1 relative">
    <div class="lb-m7-blob1"></div>
    <div class="lb-m7-blob2"></div>
    <div class="lb-m7-blob3"></div>
    <div class="max-w-lg mx-auto relative z-10">
      <div class="flex items-center gap-4 mb-4">
        <div class="w-[72px] h-[72px] rounded-2xl bg-white flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden">
          @if (clinic.logo_url) {
            <img [src]="clinic.logo_url" [alt]="clinic.name" class="w-full h-full object-cover" />
          } @else {
            <span class="text-3xl lb-m7-float" aria-hidden="true">\u2B50</span>
          }
        </div>
        <div>
          <p class="text-[10px] font-bold tracking-[0.18em] uppercase text-white/55 mb-0.5">{{ coverKicker }}</p>
          <h1 class="lb-m7-fredoka text-[30px] sm:text-[36px] text-white leading-tight font-semibold">
            {{ clinic.name }}
          </h1>
          <p class="text-[13px] text-white/65 font-medium">{{ taglineUnderTitle }}</p>
        </div>
      </div>
      <div class="flex items-center gap-3 flex-wrap">
        @if (clinic.is_open_now === true) {
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black bg-white/20 text-white">
            <span class="w-[6px] h-[6px] rounded-full bg-[#4ade80] lb-m7-pulse-dot inline-block"></span>
            Aberto agora
          </span>
        } @else if (clinic.is_open_now === false) {
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black bg-white/10 text-white/50">
            <span class="w-[6px] h-[6px] rounded-full bg-white/30 inline-block"></span>
            Fechado agora
          </span>
        }
        @if (councilMetaLine) {
          <span class="text-[11px] text-white/40 font-medium">{{ councilMetaLine }}</span>
        }
      </div>
    </div>
  </div>

  <div class="w-full max-w-lg mx-auto px-4 sm:px-6 pb-14 pt-5">
    @if (whatsappUrl()) {
      <div class="lb-m7-a2">
        <a
          [href]="whatsappUrl()"
          target="_blank"
          rel="noopener noreferrer"
          class="lb-m7-wpp w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-[15px] no-underline"
        >
          <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="white">
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"
            />
            <path
              d="M12 0C5.373 0 0 5.373 0 12c0 2.108.549 4.09 1.508 5.814L0 24l6.335-1.489A11.926 11.926 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.5-5.198-1.375l-.372-.22-3.862.908.979-3.763-.242-.386A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"
            />
          </svg>
          {{ waCtaLabel }}
        </a>
      </div>
    }

    <div class="grid grid-cols-2 gap-2.5 mt-2.5 lb-m7-a2">
      @if (clinic.maps_url) {
        <a
          [href]="clinic.maps_url"
          target="_blank"
          rel="noopener noreferrer"
          class="lb-m7-sec flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white dark:bg-white/[0.05] border border-[#ddf2fd] dark:border-white/[0.06] hover:bg-[#f0f9ff] dark:hover:bg-white/[0.08] text-[#0284c7] dark:text-[#38bdf8] text-[13px] font-bold no-underline"
        >
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Como chegar
        </a>
      }
      @if (telHref()) {
        <a
          [href]="telHref()"
          class="lb-m7-sec flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-600/20 hover:bg-rose-100 dark:hover:bg-rose-900/15 text-rose-600 dark:text-rose-400 text-[13px] font-bold no-underline"
        >
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path
              d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.1 6.1l1.27-.72a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
            />
          </svg>
          Emerg\xEAncia
        </a>
      }
    </div>

    <div class="lb-m7-resp mt-5 lb-m7-a3">
      <div class="flex items-start gap-3">
        <div class="w-9 h-9 rounded-xl bg-amber-400/30 flex items-center justify-center flex-shrink-0 text-lg">\u{1F46A}</div>
        <div>
          <p class="text-[12px] font-black text-amber-800 dark:text-amber-400 uppercase tracking-wide">{{ parentNoticeTitle }}</p>
          <p class="text-[12px] text-amber-700 dark:text-amber-500 mt-1 leading-relaxed font-medium">{{ parentNoticeBody }}</p>
        </div>
      </div>
    </div>

    <div class="mt-5 lb-m7-a3">
      <div class="flex items-center gap-3 mb-3">
        <p class="text-[10px] font-black tracking-[0.1em] uppercase text-[#0284c7] dark:text-[#38bdf8] whitespace-nowrap">Primeira consulta</p>
        <div class="flex-1 h-px bg-[#ddf2fd] dark:bg-white/[0.06]"></div>
      </div>
      <div class="flex flex-col gap-2.5">
        @for (st of firstVisitSteps; track $index) {
          <div
            class="flex items-start gap-3 py-3 px-3.5 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#ddf2fd] dark:border-sky-500/15"
          >
            <div
              class="w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-extrabold lb-m7-fredoka shrink-0"
              [ngClass]="stepNumClass(st.tone)"
            >
              {{ $index + 1 }}
            </div>
            <div>
              <p class="text-[13px] font-bold text-gray-800 dark:text-gray-200">{{ st.title }}</p>
              <p class="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5">{{ st.subtitle }}</p>
            </div>
          </div>
        }
      </div>
    </div>

    <div class="mt-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#ddf2fd] dark:border-white/[0.05] px-4 pt-4 pb-3 lb-m7-a3">
      <p class="text-[10px] font-black tracking-[0.1em] uppercase text-[#0284c7] dark:text-[#38bdf8] mb-3">Faixas et\xE1rias atendidas</p>
      <div class="grid grid-cols-3 gap-2">
        @for (ab of ageBands; track ab.title) {
          <div
            class="text-center py-3 px-2 rounded-xl border"
            [class.bg-sky-50]="ab.theme === 'sky'"
            [class.dark:bg-sky-900/10]="ab.theme === 'sky'"
            [class.border-sky-100]="ab.theme === 'sky'"
            [class.dark:border-sky-700/20]="ab.theme === 'sky'"
            [class.bg-amber-50]="ab.theme === 'lemon'"
            [class.dark:bg-amber-400/10]="ab.theme === 'lemon'"
            [class.border-amber-100]="ab.theme === 'lemon'"
            [class.dark:border-amber-400/20]="ab.theme === 'lemon'"
            [class.bg-rose-50]="ab.theme === 'coral'"
            [class.dark:bg-rose-900/10]="ab.theme === 'coral'"
            [class.border-rose-100]="ab.theme === 'coral'"
            [class.dark:border-rose-600/20]="ab.theme === 'coral'"
          >
            <p class="text-lg mb-1">{{ ab.emoji }}</p>
            <p
              class="text-[11px] font-bold"
              [class.text-sky-700]="ab.theme === 'sky'"
              [class.dark:text-sky-400]="ab.theme === 'sky'"
              [class.text-amber-700]="ab.theme === 'lemon'"
              [class.dark:text-amber-400]="ab.theme === 'lemon'"
              [class.text-rose-600]="ab.theme === 'coral'"
              [class.dark:text-rose-400]="ab.theme === 'coral'"
            >
              {{ ab.title }}
            </p>
            <p
              class="text-[10px]"
              [class.text-sky-500]="ab.theme === 'sky'"
              [class.text-amber-500]="ab.theme === 'lemon'"
              [class.text-rose-400]="ab.theme === 'coral'"
            >
              {{ ab.range }}
            </p>
          </div>
        }
      </div>
    </div>

    <div class="mt-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#ddf2fd] dark:border-white/[0.05] px-4 pt-4 pb-3 lb-m7-a3">
      <p class="text-[10px] font-black tracking-[0.1em] uppercase text-[#0284c7] dark:text-[#38bdf8] mb-3">Conv\xEAnios aceitos</p>
      <div class="flex flex-wrap gap-2">
        @for (c of conveniosList; track c) {
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border"
            [class.bg-sky-50]="c !== '+ Particular'"
            [class.dark:bg-sky-900/15]="c !== '+ Particular'"
            [class.text-sky-600]="c !== '+ Particular'"
            [class.dark:text-sky-400]="c !== '+ Particular'"
            [class.border-sky-100]="c !== '+ Particular'"
            [class.dark:border-sky-700/25]="c !== '+ Particular'"
            [class.bg-emerald-50]="c === '+ Particular'"
            [class.dark:bg-emerald-900/10]="c === '+ Particular'"
            [class.text-emerald-600]="c === '+ Particular'"
            [class.dark:text-emerald-400]="c === '+ Particular'"
            [class.border-emerald-100]="c === '+ Particular'"
            [class.dark:border-emerald-500/20]="c === '+ Particular'"
            >{{ c }}</span>
        }
      </div>
    </div>

    @if (hasAnyHour) {
      <div class="mt-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#ddf2fd] dark:border-white/[0.05] px-4 pt-4 pb-3 lb-m7-a4">
        <p class="text-[10px] font-black tracking-[0.1em] uppercase text-[#0284c7] dark:text-[#38bdf8] mb-3">Funcionamento</p>
        @for (row of hoursGridArray; track row.label) {
          @if (row.text !== '\u2013') {
            <div class="flex justify-between text-[13px] py-2 border-b border-sky-50 dark:border-white/[0.04] last:border-0 first:pt-0">
              <span class="font-bold text-gray-700 dark:text-gray-300">{{ row.label }}</span>
              <span class="font-black text-[#0ea5e9] dark:text-[#38bdf8]">{{ row.text }}</span>
            </div>
          }
        }
      </div>
    }

    @if (allDocs.length) {
      <div class="mt-5 lb-m7-a4">
        <div class="flex items-center gap-3 mb-1.5">
          <p class="text-[10px] font-black tracking-[0.1em] uppercase text-[#0284c7] dark:text-[#38bdf8] whitespace-nowrap">{{ docsTitle }}</p>
          <div class="flex-1 h-px bg-[#ddf2fd] dark:bg-white/[0.06]"></div>
        </div>
        <p class="text-[12px] text-gray-500 dark:text-gray-600 mb-4 font-medium">{{ docsIntro }}</p>
        @for (link of allDocs; track trackDoc($index, link)) {
          @if (link.type === 'bio') {
            <a
              [href]="hrefBio(link.item)"
              target="_blank"
              rel="noopener noreferrer"
              class="lb-m7-doc flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#ddf2fd] dark:border-white/[0.05] mb-3 no-underline group text-inherit"
            >
              <div class="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/15 flex items-center justify-center flex-shrink-0 text-xl">\u{1F4CB}</div>
              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-bold text-gray-800 dark:text-gray-200">{{ link.item.label }}</p>
                <p class="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5 truncate">{{ link.item.url }}</p>
              </div>
              <svg class="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-sky-400 transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          } @else {
            <a
              [routerLink]="['/f', formToken(link.item)]"
              class="lb-m7-doc flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#ddf2fd] dark:border-white/[0.05] mb-3 no-underline group text-inherit"
            >
              <div class="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/15 flex items-center justify-center flex-shrink-0">
                <svg class="w-[18px] h-[18px] text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-bold text-gray-800 dark:text-gray-200">{{ link.item.name }}</p>
                <p class="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5">Preenchimento online</p>
              </div>
              <svg class="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-sky-400 transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          }
        }
      </div>
    }

    @if (clinic.address) {
      <div class="flex items-center gap-2 mt-5 lb-m7-a5">
        <svg class="w-[13px] h-[13px] text-sky-400 dark:text-sky-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span class="text-[12px] text-gray-400 dark:text-gray-600 font-medium">{{ clinic.address }}</span>
      </div>
    }

    <div class="mt-8 pt-5 border-t border-[#ddf2fd] dark:border-white/[0.05] flex flex-wrap items-center justify-center gap-2 lb-m7-a5">
      <div class="w-[5px] h-[5px] rounded-full bg-sky-400 opacity-60"></div>
      <span class="text-[11px] text-gray-400 dark:text-gray-600 font-medium">Fichas digitais por</span>
      <a href="https://gestgo.com.br" target="_blank" rel="noopener noreferrer" class="text-[11px] font-black text-sky-500 no-underline hover:opacity-75">Gestgo</a>
      <span class="text-gray-300 dark:text-gray-700 text-[11px]">\xB7</span>
      <a routerLink="/privacidade" class="text-[11px] text-gray-400 no-underline hover:text-gray-600 transition-colors font-medium">Privacidade</a>
    </div>
  </div>
</div>
`, styles: ['@import "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap";\n\n/* src/app/paginas/link-bio-public/link-bio-public-layout-pedia.component.css */\n:host {\n  display: block;\n}\n.lb-m7-root {\n  font-family:\n    "Nunito",\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n  background: #f0f9ff;\n  color: #0369a1;\n  min-height: 100vh;\n}\n.lb-m7-root.dark {\n  background: #060c12;\n  color: #bae6fd;\n}\n.lb-m7-root h1,\n.lb-m7-fredoka {\n  font-family:\n    "Fredoka",\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\n.lb-m7-cover {\n  background: #0ea5e9;\n  position: relative;\n  overflow: hidden;\n}\n.lb-m7-root.dark .lb-m7-cover {\n  background: #0c2a3d;\n}\n.lb-m7-blob1 {\n  position: absolute;\n  width: 160px;\n  height: 160px;\n  border-radius: 50%;\n  background: rgba(250, 204, 21, 0.25);\n  top: -40px;\n  right: -30px;\n}\n.lb-m7-blob2 {\n  position: absolute;\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  background: rgba(244, 63, 94, 0.2);\n  bottom: -20px;\n  left: 30%;\n}\n.lb-m7-blob3 {\n  position: absolute;\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n  background: rgba(74, 222, 128, 0.2);\n  top: 20px;\n  left: 20px;\n}\n.lb-m7-doc {\n  transition: transform 0.15s, background 0.15s;\n}\n.lb-m7-doc:hover {\n  transform: translateX(4px);\n}\n.lb-m7-feat:hover {\n  transform: translateY(-2px);\n}\n.lb-m7-wpp {\n  transition: filter 0.15s, transform 0.1s;\n}\n.lb-m7-wpp:hover {\n  filter: brightness(1.08);\n}\n.lb-m7-sec {\n  transition: background 0.15s, transform 0.1s;\n}\n.lb-m7-icon-pill {\n  cursor: pointer;\n  border: none;\n  background: transparent;\n  transition: opacity 0.15s;\n}\n.lb-m7-icon-pill:hover {\n  opacity: 0.6;\n}\n.lb-m7-resp {\n  border-radius: 20px;\n  padding: 14px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #fef9c3,\n      #fef3c7);\n  border: 2px solid #fde68a;\n}\n.lb-m7-root.dark .lb-m7-resp {\n  background: rgba(234, 179, 8, 0.08);\n  border-color: rgba(234, 179, 8, 0.2);\n}\n@keyframes lb-m7-pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.3;\n  }\n}\n.lb-m7-pulse-dot {\n  animation: lb-m7-pulse 2s ease-in-out infinite;\n}\n@keyframes lb-m7-float {\n  0%, 100% {\n    transform: translateY(0) rotate(-2deg);\n  }\n  50% {\n    transform: translateY(-6px) rotate(2deg);\n  }\n}\n.lb-m7-float {\n  animation: lb-m7-float 3s ease-in-out infinite;\n}\n@keyframes lb-m7-fade-up {\n  from {\n    opacity: 0;\n    transform: translateY(14px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.lb-m7-a1 {\n  animation: lb-m7-fade-up 0.5s ease both;\n}\n.lb-m7-a2 {\n  animation: lb-m7-fade-up 0.5s 0.08s ease both;\n}\n.lb-m7-a3 {\n  animation: lb-m7-fade-up 0.5s 0.16s ease both;\n}\n.lb-m7-a4 {\n  animation: lb-m7-fade-up 0.5s 0.24s ease both;\n}\n.lb-m7-a5 {\n  animation: lb-m7-fade-up 0.5s 0.32s ease both;\n}\n/*# sourceMappingURL=link-bio-public-layout-pedia.component.css.map */\n'] }]
  }], null, { clinic: [{
    type: Input,
    args: [{ required: true }]
  }], bioLinks: [{
    type: Input
  }], dark: [{
    type: Input
  }], allDocs: [{
    type: Input
  }], publicSlug: [{
    type: Input
  }], linkBioPreview: [{
    type: Input
  }], toggleDark: [{
    type: Output
  }], share: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LinkBioPublicLayoutPediaComponent, { className: "LinkBioPublicLayoutPediaComponent", filePath: "src/app/paginas/link-bio-public/link-bio-public-layout-pedia.component.ts", lineNumber: 43 });
})();

// src/app/paginas/link-bio-public/link-bio-public-layout-nutri.component.ts
var _c05 = (a0) => ["/f", a0];
var _forTrack04 = ($index, $item) => $item.title;
var _forTrack14 = ($index, $item) => $item.label;
function LinkBioPublicLayoutNutriComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 25);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.clinic.logo_url, \u0275\u0275sanitizeUrl)("alt", ctx_r0.clinic.name);
  }
}
function LinkBioPublicLayoutNutriComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1, "N");
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutNutriComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.councilMetaLine);
  }
}
function LinkBioPublicLayoutNutriComponent_For_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const specialty_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", specialty_r2, " ");
  }
}
function LinkBioPublicLayoutNutriComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Atendendo desde ", ctx_r0.clinic.founded_year);
  }
}
function LinkBioPublicLayoutNutriComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "a", 61);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 62);
    \u0275\u0275element(3, "path", 63)(4, "path", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Agendar consulta ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("href", ctx_r0.whatsappUrl(), \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutNutriComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 39);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 65);
    \u0275\u0275element(2, "path", 66)(3, "circle", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Como chegar ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("href", ctx_r0.clinic.maps_url, \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutNutriComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 40);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 65);
    \u0275\u0275element(2, "rect", 68)(3, "line", 69)(4, "line", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Teleconsulta ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("href", ctx_r0.telHref(), \u0275\u0275sanitizeUrl);
  }
}
function LinkBioPublicLayoutNutriComponent_For_50_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 73);
    \u0275\u0275element(1, "path", 66)(2, "circle", 67);
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutNutriComponent_For_50_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 73);
    \u0275\u0275element(1, "rect", 68)(2, "line", 69)(3, "line", 70);
    \u0275\u0275elementEnd();
  }
}
function LinkBioPublicLayoutNutriComponent_For_50_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.subtitle);
  }
}
function LinkBioPublicLayoutNutriComponent_For_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 71)(2, "div", 72);
    \u0275\u0275conditionalCreate(3, LinkBioPublicLayoutNutriComponent_For_50_Conditional_3_Template, 3, 0, ":svg:svg", 73)(4, LinkBioPublicLayoutNutriComponent_For_50_Conditional_4_Template, 4, 0, ":svg:svg", 73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "p", 74);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, LinkBioPublicLayoutNutriComponent_For_50_Conditional_8_Template, 2, 1, "p", 75);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 76);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275conditional(item_r3.icon === "place" ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r3.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r3.subtitle ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-sage-600", item_r3.available)("dark:text-sage-400", item_r3.available)("bg-sage-50", item_r3.available)("dark:bg-sage-700/15", item_r3.available)("text-gray-400", !item_r3.available)("dark:text-gray-500", !item_r3.available)("bg-gray-100", !item_r3.available)("dark:bg-white/[0", !item_r3.available);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r3.available ? "Dispon\xEDvel" : "Indispon\xEDvel", " ");
  }
}
function LinkBioPublicLayoutNutriComponent_For_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const convenio_r4 = ctx.$implicit;
    \u0275\u0275classProp("bg-sage-50", convenio_r4 !== "+ Particular")("dark:bg-sage-700/15", convenio_r4 !== "+ Particular")("text-sage-700", convenio_r4 !== "+ Particular")("dark:text-sage-400", convenio_r4 !== "+ Particular")("border-sage-100", convenio_r4 !== "+ Particular")("dark:border-sage-700/25", convenio_r4 !== "+ Particular")("bg-earth-50", convenio_r4 === "+ Particular")("dark:bg-earth-600/10", convenio_r4 === "+ Particular")("text-earth-600", convenio_r4 === "+ Particular")("dark:text-earth-400", convenio_r4 === "+ Particular")("border-earth-100", convenio_r4 === "+ Particular")("dark:border-earth-600/20", convenio_r4 === "+ Particular");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", convenio_r4, " ");
  }
}
function LinkBioPublicLayoutNutriComponent_Conditional_57_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79)(1, "span", 81);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 82);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r5.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r5.text);
  }
}
function LinkBioPublicLayoutNutriComponent_Conditional_57_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 80)(1, "span", 83);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 84);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r6.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r6.text);
  }
}
function LinkBioPublicLayoutNutriComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "p", 42);
    \u0275\u0275text(2, "Agenda");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 78);
    \u0275\u0275repeaterCreate(4, LinkBioPublicLayoutNutriComponent_Conditional_57_For_5_Template, 5, 2, "div", 79, _forTrack14);
    \u0275\u0275repeaterCreate(6, LinkBioPublicLayoutNutriComponent_Conditional_57_For_7_Template, 5, 2, "div", 80, _forTrack14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.weekdayRows);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.weekendRows);
  }
}
function LinkBioPublicLayoutNutriComponent_For_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 85);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 86);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 87);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const area_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(area_r7.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(area_r7.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(area_r7.description);
  }
}
function LinkBioPublicLayoutNutriComponent_Conditional_66_For_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 90)(1, "div", 92);
    \u0275\u0275text(2, "\u{1F4CB}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 93)(4, "p", 86);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 94);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 95);
    \u0275\u0275element(9, "polyline", 96);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r0.hrefBio(link_r8.item), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(link_r8.item.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(link_r8.item.url);
  }
}
function LinkBioPublicLayoutNutriComponent_Conditional_66_For_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 91)(1, "div", 92);
    \u0275\u0275text(2, "\u{1F37D}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 93)(4, "p", 86);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 97);
    \u0275\u0275text(7, "Preenchimento online");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 95);
    \u0275\u0275element(9, "polyline", 96);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c05, ctx_r0.formToken(link_r8.item)));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(link_r8.item.name);
  }
}
function LinkBioPublicLayoutNutriComponent_Conditional_66_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LinkBioPublicLayoutNutriComponent_Conditional_66_For_8_Conditional_0_Template, 10, 3, "a", 90)(1, LinkBioPublicLayoutNutriComponent_Conditional_66_For_8_Conditional_1_Template, 10, 4, "a", 91);
  }
  if (rf & 2) {
    const link_r8 = ctx.$implicit;
    \u0275\u0275conditional(link_r8.type === "bio" ? 0 : 1);
  }
}
function LinkBioPublicLayoutNutriComponent_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "div", 88)(2, "p", 50);
    \u0275\u0275text(3, "Documentos");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "div", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 89);
    \u0275\u0275text(6, "Preencha antes da sua consulta");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, LinkBioPublicLayoutNutriComponent_Conditional_66_For_8_Template, 2, 1, null, null, \u0275\u0275componentInstance().trackDoc, true);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r0.allDocs);
  }
}
function LinkBioPublicLayoutNutriComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 98);
    \u0275\u0275element(2, "path", 66)(3, "circle", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span", 99);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.clinic.address);
  }
}
var DEFAULT_AREAS = [
  {
    icon: "\u{1F331}",
    title: "Nutri\xE7\xE3o funcional",
    description: "Abordagem integrativa focada na causa raiz dos desequil\xEDbrios."
  },
  {
    icon: "\u2696\uFE0F",
    title: "Emagrecimento",
    description: "Reeduca\xE7\xE3o alimentar sustent\xE1vel, sem dietas restritivas."
  },
  {
    icon: "\u{1F3C3}",
    title: "Nutri\xE7\xE3o esportiva",
    description: "Performance, recupera\xE7\xE3o e composi\xE7\xE3o corporal."
  },
  {
    icon: "\u{1F9EC}",
    title: "Sa\xFAde intestinal",
    description: "Microbiota, disbiose, SII e doen\xE7as inflamat\xF3rias."
  }
];
var LinkBioPublicLayoutNutriComponent = class _LinkBioPublicLayoutNutriComponent {
  linkBio = inject(LinkBioService);
  clinic;
  bioLinks = [];
  dark = false;
  allDocs = [];
  publicSlug = "";
  linkBioPreview = false;
  toggleDark = new EventEmitter();
  share = new EventEmitter();
  get extra() {
    const e = this.clinic.link_bio_extra;
    return e && typeof e === "object" ? e : {};
  }
  get hoursGridArray() {
    const grid = this.clinic.business_hours_grid;
    if (!grid || typeof grid !== "object")
      return [];
    const order = ["1", "2", "3", "4", "5", "6", "7"];
    return order.map((k) => grid[k]).filter(Boolean);
  }
  get hasAnyHour() {
    return this.hoursGridArray.some((d) => d.text !== "\u2013");
  }
  get specialtiesChips() {
    const list = this.clinic.specialties_list?.map((item) => item.trim()).filter(Boolean) ?? [];
    return list.length ? list.slice(0, 6) : ["Funcional", "Emagrecimento", "Esportiva", "Intestino"];
  }
  get councilMetaLine() {
    const parts = [];
    if (this.extra.council_registration?.trim())
      parts.push(this.extra.council_registration.trim());
    if (this.clinic.founded_year)
      parts.push(`Atendendo desde ${this.clinic.founded_year}`);
    return parts.join(" \xB7 ");
  }
  get heroDescription() {
    return this.clinic.short_description?.trim() || this.extra.hero_tagline?.trim() || "Nutri\xE7\xE3o cl\xEDnica e funcional";
  }
  get modalities() {
    const custom = this.extra.modalities;
    if (custom?.length) {
      return custom.map((item, index) => ({
        title: item.title,
        subtitle: item.subtitle,
        available: item.available !== false,
        icon: index === 0 ? "place" : "computer"
      }));
    }
    return [
      {
        title: "Presencial",
        subtitle: this.clinic.address?.trim() || "Consult\xF3rio",
        available: true,
        icon: "place"
      },
      {
        title: "Online",
        subtitle: "Via videochamada",
        available: true,
        icon: "computer"
      }
    ];
  }
  get conveniosList() {
    const raw = this.extra.convenios?.map((item) => String(item).trim()).filter(Boolean);
    return raw?.length ? raw : ["Unimed", "Amil", "SulAm\xE9rica", "+ Particular"];
  }
  get areas() {
    const list = this.clinic.specialties_list?.map((item) => item.trim()).filter(Boolean) ?? [];
    if (!list.length)
      return DEFAULT_AREAS;
    return list.slice(0, 4).map((title, index) => ({
      icon: DEFAULT_AREAS[index]?.icon ?? "\u{1F957}",
      title,
      description: DEFAULT_AREAS[index]?.description ?? "Atendimento nutricional personalizado para sua rotina."
    }));
  }
  get currentStatusLabel() {
    if (this.clinic.is_open_now === true)
      return "Aberta para consultas";
    if (this.clinic.is_open_now === false)
      return "Atendimento sob agendamento";
    return "Agenda dispon\xEDvel";
  }
  get weekdayRows() {
    return this.hoursGridArray.slice(0, 5).filter((row) => row.text !== "\u2013");
  }
  get weekendRows() {
    return this.hoursGridArray.slice(5, 7).filter((row) => row.text !== "\u2013");
  }
  whatsappUrl() {
    const phone = this.clinic.phone?.replace(/\D/g, "") ?? "";
    const wa = phone.length >= 10 && phone.length <= 11 ? "55" + phone : phone;
    return wa ? `https://wa.me/${wa}` : "";
  }
  telHref() {
    const raw = this.clinic.phone?.trim() ?? "";
    if (!raw)
      return "";
    if (raw.startsWith("+"))
      return `tel:${raw}`;
    const digits = raw.replace(/\D/g, "");
    if (!digits)
      return "";
    const intl = digits.length <= 11 && !digits.startsWith("55") ? "55" + digits : digits;
    return `tel:+${intl}`;
  }
  formToken(f) {
    const parts = f.public_url.split("/f/");
    return parts.length > 1 ? parts[1].split("?")[0] : "";
  }
  trackDoc(_i, link) {
    return link.type === "bio" ? `b-${link.item.id}` : `f-${link.item.id}`;
  }
  hrefBio(link) {
    return this.linkBio.outboundBioLinkUrl(this.publicSlug, link, this.linkBioPreview);
  }
  onToggleDark() {
    this.toggleDark.emit();
  }
  onShare() {
    this.share.emit();
  }
  static \u0275fac = function LinkBioPublicLayoutNutriComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LinkBioPublicLayoutNutriComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LinkBioPublicLayoutNutriComponent, selectors: [["app-link-bio-public-layout-nutri"]], inputs: { clinic: "clinic", bioLinks: "bioLinks", dark: "dark", allDocs: "allDocs", publicSlug: "publicSlug", linkBioPreview: "linkBioPreview" }, outputs: { toggleDark: "toggleDark", share: "share" }, decls: 78, vars: 18, consts: [[1, "lb-m8-root", "min-h-screen"], [1, "flex", "justify-end", "gap-2", "px-4", "pt-4", "absolute", "top-0", "right-0", "z-30"], ["type", "button", "aria-label", "Alternar tema", 1, "lb-m8-icon-pill", "flex", "items-center", "px-3", "py-2", "rounded-full", "bg-white/20", "dark:bg-white/[0.07]", "backdrop-blur-sm", "border", "border-white/20", "dark:border-white/10", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "hidden", "dark:block", "w-[14px]", "h-[14px]", "text-amber-300"], ["cx", "12", "cy", "12", "r", "5"], ["x1", "12", "y1", "1", "x2", "12", "y2", "3"], ["x1", "12", "y1", "21", "x2", "12", "y2", "23"], ["x1", "4.22", "y1", "4.22", "x2", "5.64", "y2", "5.64"], ["x1", "18.36", "y1", "18.36", "x2", "19.78", "y2", "19.78"], ["x1", "1", "y1", "12", "x2", "3", "y2", "12"], ["x1", "21", "y1", "12", "x2", "23", "y2", "12"], ["x1", "4.22", "y1", "19.78", "x2", "5.64", "y2", "18.36"], ["x1", "18.36", "y1", "5.64", "x2", "19.78", "y2", "4.22"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "block", "dark:hidden", "w-[14px]", "h-[14px]", "text-white"], ["d", "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"], ["type", "button", "aria-label", "Compartilhar", 1, "lb-m8-icon-pill", "flex", "items-center", "px-3", "py-2", "rounded-full", "bg-white/20", "dark:bg-white/[0.07]", "backdrop-blur-sm", "border", "border-white/20", "dark:border-white/10", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-[14px]", "h-[14px]", "text-white"], ["cx", "18", "cy", "5", "r", "3"], ["cx", "6", "cy", "12", "r", "3"], ["cx", "18", "cy", "19", "r", "3"], ["x1", "8.59", "y1", "13.51", "x2", "15.42", "y2", "17.49"], ["x1", "15.41", "y1", "6.51", "x2", "8.59", "y2", "10.49"], [1, "lb-m8-cover", "pt-16", "pb-16", "px-5", "lb-m8-a1"], [1, "relative", "z-10", "max-w-lg", "mx-auto", "flex", "flex-col", "items-center", "text-center"], [1, "lb-m8-avatar-ring", "mb-5", "shadow-xl"], [1, "w-full", "h-full", "rounded-full", "object-cover", 3, "src", "alt"], [1, "lb-m8-avatar-inner"], [1, "text-[10px]", "font-semibold", "tracking-[0.2em]", "uppercase", "text-white/50", "mb-1.5"], [1, "lb-m8-display", "text-[30px]", "sm:text-[36px]", "text-white", "font-semibold", "leading-tight", "mb-1"], [1, "text-[13px]", "text-white/55", "mt-2", "leading-relaxed", "max-w-xs"], [1, "flex", "flex-wrap", "gap-2", "justify-center", "mt-4"], [1, "text-[10px]", "font-semibold", "px-3", "py-1.5", "rounded-full", "bg-white/10", "text-white/70", "border", "border-white/10"], [1, "w-full", "max-w-lg", "mx-auto", "px-4", "sm:px-6", "pb-14", "pt-6"], [1, "flex", "items-center", "gap-3", "flex-wrap", "mb-5", "lb-m8-a2"], [1, "lb-m8-status"], [1, "lb-m8-status-dot"], [1, "text-[11px]", "text-gray-400", "dark:text-gray-600", "font-medium"], [1, "lb-m8-a2"], [1, "grid", "grid-cols-2", "gap-2.5", "mt-2.5", "lb-m8-a2"], ["target", "_blank", "rel", "noopener noreferrer", 1, "lb-m8-secondary", "bg-sage-100", "dark:bg-white/4", "hover:bg-sage-200", "dark:hover:bg-white/[0.07]", "text-sage-700", "dark:text-sage-300", "no-underline", 3, "href"], [1, "lb-m8-secondary", "bg-sage-100", "dark:bg-white/4", "hover:bg-sage-200", "dark:hover:bg-white/[0.07]", "text-sage-700", "dark:text-sage-300", "no-underline", 3, "href"], [1, "mt-5", "rounded-2xl", "bg-white", "dark:bg-white/3", "border", "border-sage-100", "dark:border-white/5", "px-4", "pt-4", "pb-3", "lb-m8-a3"], [1, "text-[10px]", "font-bold", "tracking-[0.12em]", "uppercase", "text-sage-600", "dark:text-sage-400", "mb-3"], [1, "flex", "flex-col", "gap-0"], [1, "flex", "items-center", "justify-between", "py-2.5", "border-b", "border-sage-50", "dark:border-white/4", "last:border-b-0"], [1, "mt-3", "rounded-2xl", "bg-white", "dark:bg-white/3", "border", "border-sage-100", "dark:border-white/5", "px-4", "pt-4", "pb-3", "lb-m8-a3"], [1, "flex", "flex-wrap", "gap-2"], [1, "text-[11px]", "font-semibold", "px-3", "py-1.5", "rounded-full", "border", 3, "bg-sage-50", "dark:bg-sage-700/15", "text-sage-700", "dark:text-sage-400", "border-sage-100", "dark:border-sage-700/25", "bg-earth-50", "dark:bg-earth-600/10", "text-earth-600", "dark:text-earth-400", "border-earth-100", "dark:border-earth-600/20"], [1, "mt-6", "lb-m8-a4"], [1, "flex", "items-center", "gap-3", "mb-3"], [1, "text-[10px]", "font-bold", "tracking-[0.12em]", "uppercase", "text-sage-600", "dark:text-sage-400", "whitespace-nowrap"], [1, "flex-1", "h-px", "bg-sage-100", "dark:bg-white/6"], [1, "grid", "grid-cols-2", "gap-2.5"], [1, "lb-m8-approach", "bg-white", "dark:bg-white/3", "border", "border-sage-100", "dark:border-white/5"], [1, "mt-6", "lb-m8-a5"], [1, "flex", "items-center", "gap-2", "mt-5", "lb-m8-a6"], [1, "mt-8", "pt-5", "border-t", "border-sage-100", "dark:border-white/5", "flex", "items-center", "justify-center", "gap-2", "flex-wrap", "lb-m8-a6"], [1, "w-[5px]", "h-[5px]", "rounded-full", "bg-sage-500", "opacity-60"], ["href", "https://gestgo.com.br", "target", "_blank", "rel", "noopener noreferrer", 1, "text-[11px]", "font-bold", "text-sage-600", "dark:text-sage-400", "no-underline", "hover:opacity-75", "transition-opacity"], [1, "text-gray-300", "dark:text-gray-700", "text-[11px]"], ["routerLink", "/privacidade", 1, "text-[11px]", "text-gray-400", "dark:text-gray-600", "no-underline", "hover:text-gray-600", "dark:hover:text-gray-400", "transition-colors", "font-medium"], ["target", "_blank", "rel", "noopener noreferrer", 1, "lb-m8-wpp", "w-full", "flex", "items-center", "justify-center", "gap-2", "no-underline", 3, "href"], ["viewBox", "0 0 24 24", "fill", "white", 1, "w-5", "h-5"], ["d", "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"], ["d", "M12 0C5.373 0 0 5.373 0 12c0 2.108.549 4.09 1.508 5.814L0 24l6.335-1.489A11.926 11.926 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.5-5.198-1.375l-.372-.22-3.862.908.979-3.763-.242-.386A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"], ["cx", "12", "cy", "10", "r", "3"], ["x", "2", "y", "3", "width", "20", "height", "14", "rx", "2"], ["x1", "8", "y1", "21", "x2", "16", "y2", "21"], ["x1", "12", "y1", "17", "x2", "12", "y2", "21"], [1, "flex", "items-center", "gap-2.5"], [1, "w-7", "h-7", "rounded-lg", "bg-sage-100", "dark:bg-sage-700/20", "flex", "items-center", "justify-center", "shrink-0"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-3.5", "h-3.5", "text-sage-500"], [1, "text-[13px]", "font-semibold", "text-gray-800", "dark:text-gray-200"], [1, "text-[11px]", "text-gray-400", "dark:text-gray-600"], [1, "text-[10px]", "font-bold", "px-2.5", "py-1", "rounded-full"], [1, "text-[11px]", "font-semibold", "px-3", "py-1.5", "rounded-full", "border"], [1, "space-y-1"], [1, "flex", "justify-between", "text-[13px]", "py-1.5", "border-b", "border-sage-50", "dark:border-white/4", "last:border-b-0"], [1, "flex", "justify-between", "text-[13px]", "py-1.5"], [1, "font-semibold", "text-gray-700", "dark:text-gray-300"], [1, "font-bold", "text-sage-600", "dark:text-sage-400"], [1, "text-gray-400", "dark:text-gray-600"], [1, "text-gray-300", "dark:text-gray-700"], [1, "text-xl", "mb-2"], [1, "text-[13px]", "font-bold", "text-gray-800", "dark:text-gray-200"], [1, "text-[11px]", "text-gray-500", "dark:text-gray-600", "mt-1", "leading-relaxed"], [1, "flex", "items-center", "gap-3", "mb-1.5"], [1, "text-[12px]", "text-gray-500", "dark:text-gray-600", "mb-4", "font-medium"], ["target", "_blank", "rel", "noopener noreferrer", 1, "lb-m8-doc", "flex", "items-center", "gap-3.5", "p-4", "rounded-2xl", "bg-white", "dark:bg-white/3", "border", "border-sage-100", "dark:border-white/5", "mb-3", "no-underline", "group", "text-inherit", 3, "href"], [1, "lb-m8-doc", "flex", "items-center", "gap-3.5", "p-4", "rounded-2xl", "bg-white", "dark:bg-white/3", "border", "border-sage-100", "dark:border-white/5", "mb-3", "no-underline", "group", "text-inherit", 3, "routerLink"], [1, "w-10", "h-10", "rounded-xl", "bg-sage-50", "dark:bg-sage-700/20", "flex", "items-center", "justify-center", "shrink-0", "text-lg"], [1, "flex-1", "min-w-0"], [1, "text-[11px]", "text-gray-400", "dark:text-gray-600", "mt-0.5", "truncate"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4", "text-gray-300", "dark:text-gray-700", "shrink-0", "group-hover:text-sage-500", "transition-colors"], ["points", "9 18 15 12 9 6"], [1, "text-[11px]", "text-gray-400", "dark:text-gray-600", "mt-0.5"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "w-[13px]", "h-[13px]", "text-sage-500", "dark:text-sage-600", "shrink-0"], [1, "text-[12px]", "text-gray-400", "dark:text-gray-600", "font-medium"]], template: function LinkBioPublicLayoutNutriComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275listener("click", function LinkBioPublicLayoutNutriComponent_Template_button_click_2_listener() {
        return ctx.onToggleDark();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(3, "svg", 3);
      \u0275\u0275element(4, "circle", 4)(5, "line", 5)(6, "line", 6)(7, "line", 7)(8, "line", 8)(9, "line", 9)(10, "line", 10)(11, "line", 11)(12, "line", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "svg", 13);
      \u0275\u0275element(14, "path", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(15, "button", 15);
      \u0275\u0275listener("click", function LinkBioPublicLayoutNutriComponent_Template_button_click_15_listener() {
        return ctx.onShare();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(16, "svg", 16);
      \u0275\u0275element(17, "circle", 17)(18, "circle", 18)(19, "circle", 19)(20, "line", 20)(21, "line", 21);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(22, "div", 22)(23, "div", 23)(24, "div", 24);
      \u0275\u0275conditionalCreate(25, LinkBioPublicLayoutNutriComponent_Conditional_25_Template, 1, 2, "img", 25)(26, LinkBioPublicLayoutNutriComponent_Conditional_26_Template, 2, 0, "div", 26);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(27, LinkBioPublicLayoutNutriComponent_Conditional_27_Template, 2, 1, "p", 27);
      \u0275\u0275elementStart(28, "h1", 28);
      \u0275\u0275text(29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "p", 29);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "div", 30);
      \u0275\u0275repeaterCreate(33, LinkBioPublicLayoutNutriComponent_For_34_Template, 2, 1, "span", 31, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "div", 32)(36, "div", 33)(37, "span", 34);
      \u0275\u0275element(38, "span", 35);
      \u0275\u0275text(39);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(40, LinkBioPublicLayoutNutriComponent_Conditional_40_Template, 2, 1, "span", 36);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(41, LinkBioPublicLayoutNutriComponent_Conditional_41_Template, 6, 1, "div", 37);
      \u0275\u0275elementStart(42, "div", 38);
      \u0275\u0275conditionalCreate(43, LinkBioPublicLayoutNutriComponent_Conditional_43_Template, 5, 1, "a", 39);
      \u0275\u0275conditionalCreate(44, LinkBioPublicLayoutNutriComponent_Conditional_44_Template, 6, 1, "a", 40);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "div", 41)(46, "p", 42);
      \u0275\u0275text(47, "Modalidades");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 43);
      \u0275\u0275repeaterCreate(49, LinkBioPublicLayoutNutriComponent_For_50_Template, 11, 20, "div", 44, _forTrack04);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(51, "div", 45)(52, "p", 42);
      \u0275\u0275text(53, "Conv\xEAnios aceitos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "div", 46);
      \u0275\u0275repeaterCreate(55, LinkBioPublicLayoutNutriComponent_For_56_Template, 2, 25, "span", 47, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(57, LinkBioPublicLayoutNutriComponent_Conditional_57_Template, 8, 0, "div", 45);
      \u0275\u0275elementStart(58, "div", 48)(59, "div", 49)(60, "p", 50);
      \u0275\u0275text(61, "\xC1rea de atua\xE7\xE3o");
      \u0275\u0275elementEnd();
      \u0275\u0275element(62, "div", 51);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "div", 52);
      \u0275\u0275repeaterCreate(64, LinkBioPublicLayoutNutriComponent_For_65_Template, 7, 3, "div", 53, _forTrack04);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(66, LinkBioPublicLayoutNutriComponent_Conditional_66_Template, 9, 0, "div", 54);
      \u0275\u0275conditionalCreate(67, LinkBioPublicLayoutNutriComponent_Conditional_67_Template, 6, 1, "div", 55);
      \u0275\u0275elementStart(68, "div", 56);
      \u0275\u0275element(69, "div", 57);
      \u0275\u0275elementStart(70, "span", 36);
      \u0275\u0275text(71, "Fichas digitais por");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "a", 58);
      \u0275\u0275text(73, " Gestgo ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "span", 59);
      \u0275\u0275text(75, "\xB7");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "a", 60);
      \u0275\u0275text(77, "Privacidade");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("dark", ctx.dark);
      \u0275\u0275advance(25);
      \u0275\u0275conditional(ctx.clinic.logo_url ? 25 : 26);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.councilMetaLine ? 27 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.clinic.name, " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.heroDescription, " ");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.specialtiesChips);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("lb-m8-status-closed", ctx.clinic.is_open_now === false);
      \u0275\u0275advance();
      \u0275\u0275classProp("lb-m8-status-dot-closed", ctx.clinic.is_open_now === false);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.currentStatusLabel, " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.clinic.founded_year ? 40 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.whatsappUrl() ? 41 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.clinic.maps_url ? 43 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.telHref() ? 44 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.modalities);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.conveniosList);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.hasAnyHour ? 57 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.areas);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.allDocs.length ? 66 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.clinic.address ? 67 : -1);
    }
  }, dependencies: [CommonModule, RouterLink], styles: [`@import "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap";



[_nghost-%COMP%] {
  display: block;
}
.lb-m8-root[_ngcontent-%COMP%] {
  font-family:
    "DM Sans",
    ui-sans-serif,
    system-ui,
    sans-serif;
  background-color: #f4f7f2;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='25' cy='25' r='1.5' fill='%23527a42' opacity='0.07'/%3E%3Ccircle cx='75' cy='75' r='1.5' fill='%23527a42' opacity='0.07'/%3E%3Ccircle cx='75' cy='25' r='1' fill='%23527a42' opacity='0.05'/%3E%3Ccircle cx='25' cy='75' r='1' fill='%23527a42' opacity='0.05'/%3E%3C/svg%3E");
  color: #2f4a25;
  min-height: 100vh;
}
.lb-m8-root.dark[_ngcontent-%COMP%] {
  background-color: #0d110b;
  color: #d8e7d0;
}
.lb-m8-root[_ngcontent-%COMP%]   *[_ngcontent-%COMP%], 
.lb-m8-root[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]::before, 
.lb-m8-root[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]::after {
  box-sizing: border-box;
}
.lb-m8-display[_ngcontent-%COMP%] {
  font-family:
    "Fraunces",
    ui-serif,
    Georgia,
    serif;
}
.lb-m8-cover[_ngcontent-%COMP%] {
  background: #2f4a25;
  position: relative;
  overflow: hidden;
}
.lb-m8-root.dark[_ngcontent-%COMP%]   .lb-m8-cover[_ngcontent-%COMP%] {
  background: #1a2616;
}
.lb-m8-cover[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  bottom: -30px;
  left: -5%;
  right: -5%;
  height: 80px;
  background: #f4f7f2;
  border-radius: 60% 60% 0 0 / 100% 100% 0 0;
}
.lb-m8-root.dark[_ngcontent-%COMP%]   .lb-m8-cover[_ngcontent-%COMP%]::before {
  background: #0d110b;
}
.lb-m8-cover[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 255, 255, 0.06) 0%,
      transparent 50%),
    radial-gradient(
      circle at 20% 80%,
      rgba(255, 255, 255, 0.04) 0%,
      transparent 40%);
}
.lb-m8-avatar-ring[_ngcontent-%COMP%] {
  width: 88px;
  height: 88px;
  border-radius: 999px;
  background:
    linear-gradient(
      135deg,
      #9dbd8e,
      #d0a87a);
  padding: 3px;
  flex-shrink: 0;
}
.lb-m8-avatar-inner[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: #6e9458;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family:
    "Fraunces",
    ui-serif,
    Georgia,
    serif;
  font-size: 32px;
  font-weight: 600;
  color: #fff;
}
.lb-m8-status[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f0f9eb;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: #3e6031;
  padding: 4px 11px;
}
.lb-m8-root.dark[_ngcontent-%COMP%]   .lb-m8-status[_ngcontent-%COMP%] {
  background: rgba(82, 122, 66, 0.15);
  color: #9dbd8e;
}
.lb-m8-status-closed[_ngcontent-%COMP%] {
  background: #f5f5f5;
  color: #888;
}
.lb-m8-root.dark[_ngcontent-%COMP%]   .lb-m8-status-closed[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.05);
  color: #7d7d7d;
}
.lb-m8-status-dot[_ngcontent-%COMP%] {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #527a42;
  display: inline-block;
  animation: _ngcontent-%COMP%_lb-m8-pulse 2s ease-in-out infinite;
}
.lb-m8-status-dot-closed[_ngcontent-%COMP%] {
  background: #9ca3af;
  animation: none;
}
.lb-m8-wpp[_ngcontent-%COMP%] {
  background: #22c55e;
  color: #fff;
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 700;
  transition: filter 0.15s, transform 0.1s;
}
.lb-m8-wpp[_ngcontent-%COMP%]:hover {
  filter: brightness(1.08);
}
.lb-m8-wpp[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.lb-m8-secondary[_ngcontent-%COMP%] {
  border: none;
  border-radius: 12px;
  padding: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 600;
  transition: background 0.15s, transform 0.1s;
}
.lb-m8-secondary[_ngcontent-%COMP%]:active {
  transform: scale(0.97);
}
.lb-m8-doc[_ngcontent-%COMP%] {
  transition: transform 0.15s, background 0.15s;
}
.lb-m8-doc[_ngcontent-%COMP%]:hover {
  transform: translateX(4px);
}
.lb-m8-approach[_ngcontent-%COMP%] {
  border-radius: 16px;
  padding: 16px;
  transition: border-color 0.15s, transform 0.15s;
}
.lb-m8-approach[_ngcontent-%COMP%]:hover {
  transform: translateY(-2px);
}
.lb-m8-icon-pill[_ngcontent-%COMP%] {
  cursor: pointer;
  border: none;
  background: transparent;
  transition: opacity 0.15s;
}
.lb-m8-icon-pill[_ngcontent-%COMP%]:hover {
  opacity: 0.6;
}
@keyframes _ngcontent-%COMP%_lb-m8-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}
@keyframes _ngcontent-%COMP%_lb-m8-fade-up {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.lb-m8-a1[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_lb-m8-fade-up 0.55s ease both;
}
.lb-m8-a2[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_lb-m8-fade-up 0.55s 0.08s ease both;
}
.lb-m8-a3[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_lb-m8-fade-up 0.55s 0.16s ease both;
}
.lb-m8-a4[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_lb-m8-fade-up 0.55s 0.24s ease both;
}
.lb-m8-a5[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_lb-m8-fade-up 0.55s 0.32s ease both;
}
.lb-m8-a6[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_lb-m8-fade-up 0.55s 0.4s ease both;
}
/*# sourceMappingURL=link-bio-public-layout-nutri.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LinkBioPublicLayoutNutriComponent, [{
    type: Component,
    args: [{ selector: "app-link-bio-public-layout-nutri", standalone: true, imports: [CommonModule, RouterLink], template: `<div class="lb-m8-root min-h-screen" [class.dark]="dark">\r
  <div class="flex justify-end gap-2 px-4 pt-4 absolute top-0 right-0 z-30">\r
    <button\r
      type="button"\r
      (click)="onToggleDark()"\r
      class="lb-m8-icon-pill flex items-center px-3 py-2 rounded-full bg-white/20 dark:bg-white/[0.07] backdrop-blur-sm border border-white/20 dark:border-white/10"\r
      aria-label="Alternar tema"\r
    >\r
      <svg class="hidden dark:block w-[14px] h-[14px] text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
        <circle cx="12" cy="12" r="5" />\r
        <line x1="12" y1="1" x2="12" y2="3" />\r
        <line x1="12" y1="21" x2="12" y2="23" />\r
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />\r
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />\r
        <line x1="1" y1="12" x2="3" y2="12" />\r
        <line x1="21" y1="12" x2="23" y2="12" />\r
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />\r
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />\r
      </svg>\r
      <svg class="block dark:hidden w-[14px] h-[14px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />\r
      </svg>\r
    </button>\r
    <button\r
      type="button"\r
      (click)="onShare()"\r
      class="lb-m8-icon-pill flex items-center px-3 py-2 rounded-full bg-white/20 dark:bg-white/[0.07] backdrop-blur-sm border border-white/20 dark:border-white/10"\r
      aria-label="Compartilhar"\r
    >\r
      <svg class="w-[14px] h-[14px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
        <circle cx="18" cy="5" r="3" />\r
        <circle cx="6" cy="12" r="3" />\r
        <circle cx="18" cy="19" r="3" />\r
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />\r
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />\r
      </svg>\r
    </button>\r
  </div>\r
\r
  <div class="lb-m8-cover pt-16 pb-16 px-5 lb-m8-a1">\r
    <div class="relative z-10 max-w-lg mx-auto flex flex-col items-center text-center">\r
      <div class="lb-m8-avatar-ring mb-5 shadow-xl">\r
        @if (clinic.logo_url) {\r
          <img [src]="clinic.logo_url" [alt]="clinic.name" class="w-full h-full rounded-full object-cover" />\r
        } @else {\r
          <div class="lb-m8-avatar-inner">N</div>\r
        }\r
      </div>\r
\r
      @if (councilMetaLine) {\r
        <p class="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50 mb-1.5">{{ councilMetaLine }}</p>\r
      }\r
\r
      <h1 class="lb-m8-display text-[30px] sm:text-[36px] text-white font-semibold leading-tight mb-1">\r
        {{ clinic.name }}\r
      </h1>\r
\r
      <p class="text-[13px] text-white/55 mt-2 leading-relaxed max-w-xs">\r
        {{ heroDescription }}\r
      </p>\r
\r
      <div class="flex flex-wrap gap-2 justify-center mt-4">\r
        @for (specialty of specialtiesChips; track specialty) {\r
          <span class="text-[10px] font-semibold px-3 py-1.5 rounded-full bg-white/10 text-white/70 border border-white/10">\r
            {{ specialty }}\r
          </span>\r
        }\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="w-full max-w-lg mx-auto px-4 sm:px-6 pb-14 pt-6">\r
    <div class="flex items-center gap-3 flex-wrap mb-5 lb-m8-a2">\r
      <span class="lb-m8-status" [class.lb-m8-status-closed]="clinic.is_open_now === false">\r
        <span class="lb-m8-status-dot" [class.lb-m8-status-dot-closed]="clinic.is_open_now === false"></span>\r
        {{ currentStatusLabel }}\r
      </span>\r
      @if (clinic.founded_year) {\r
        <span class="text-[11px] text-gray-400 dark:text-gray-600 font-medium">Atendendo desde {{ clinic.founded_year }}</span>\r
      }\r
    </div>\r
\r
    @if (whatsappUrl()) {\r
      <div class="lb-m8-a2">\r
        <a\r
          [href]="whatsappUrl()"\r
          target="_blank"\r
          rel="noopener noreferrer"\r
          class="lb-m8-wpp w-full flex items-center justify-center gap-2 no-underline"\r
        >\r
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="white">\r
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />\r
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.108.549 4.09 1.508 5.814L0 24l6.335-1.489A11.926 11.926 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.5-5.198-1.375l-.372-.22-3.862.908.979-3.763-.242-.386A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />\r
          </svg>\r
          Agendar consulta\r
        </a>\r
      </div>\r
    }\r
\r
    <div class="grid grid-cols-2 gap-2.5 mt-2.5 lb-m8-a2">\r
      @if (clinic.maps_url) {\r
        <a\r
          [href]="clinic.maps_url"\r
          target="_blank"\r
          rel="noopener noreferrer"\r
          class="lb-m8-secondary bg-sage-100 dark:bg-white/4 hover:bg-sage-200 dark:hover:bg-white/[0.07] text-sage-700 dark:text-sage-300 no-underline"\r
        >\r
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />\r
            <circle cx="12" cy="10" r="3" />\r
          </svg>\r
          Como chegar\r
        </a>\r
      }\r
      @if (telHref()) {\r
        <a\r
          [href]="telHref()"\r
          class="lb-m8-secondary bg-sage-100 dark:bg-white/4 hover:bg-sage-200 dark:hover:bg-white/[0.07] text-sage-700 dark:text-sage-300 no-underline"\r
        >\r
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
            <rect x="2" y="3" width="20" height="14" rx="2" />\r
            <line x1="8" y1="21" x2="16" y2="21" />\r
            <line x1="12" y1="17" x2="12" y2="21" />\r
          </svg>\r
          Teleconsulta\r
        </a>\r
      }\r
    </div>\r
\r
    <div class="mt-5 rounded-2xl bg-white dark:bg-white/3 border border-sage-100 dark:border-white/5 px-4 pt-4 pb-3 lb-m8-a3">\r
      <p class="text-[10px] font-bold tracking-[0.12em] uppercase text-sage-600 dark:text-sage-400 mb-3">Modalidades</p>\r
      <div class="flex flex-col gap-0">\r
        @for (item of modalities; track item.title) {\r
          <div class="flex items-center justify-between py-2.5 border-b border-sage-50 dark:border-white/4 last:border-b-0">\r
            <div class="flex items-center gap-2.5">\r
              <div class="w-7 h-7 rounded-lg bg-sage-100 dark:bg-sage-700/20 flex items-center justify-center shrink-0">\r
                @if (item.icon === 'place') {\r
                  <svg class="w-3.5 h-3.5 text-sage-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />\r
                    <circle cx="12" cy="10" r="3" />\r
                  </svg>\r
                } @else {\r
                  <svg class="w-3.5 h-3.5 text-sage-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                    <rect x="2" y="3" width="20" height="14" rx="2" />\r
                    <line x1="8" y1="21" x2="16" y2="21" />\r
                    <line x1="12" y1="17" x2="12" y2="21" />\r
                  </svg>\r
                }\r
              </div>\r
              <div>\r
                <p class="text-[13px] font-semibold text-gray-800 dark:text-gray-200">{{ item.title }}</p>\r
                @if (item.subtitle) {\r
                  <p class="text-[11px] text-gray-400 dark:text-gray-600">{{ item.subtitle }}</p>\r
                }\r
              </div>\r
            </div>\r
            <span class="text-[10px] font-bold px-2.5 py-1 rounded-full"\r
              [class.text-sage-600]="item.available"\r
              [class.dark:text-sage-400]="item.available"\r
              [class.bg-sage-50]="item.available"\r
              [class.dark:bg-sage-700/15]="item.available"\r
              [class.text-gray-400]="!item.available"\r
              [class.dark:text-gray-500]="!item.available"\r
              [class.bg-gray-100]="!item.available"\r
              [class.dark:bg-white/[0.04]]="!item.available">\r
              {{ item.available ? 'Dispon\xEDvel' : 'Indispon\xEDvel' }}\r
            </span>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
\r
    <div class="mt-3 rounded-2xl bg-white dark:bg-white/3 border border-sage-100 dark:border-white/5 px-4 pt-4 pb-3 lb-m8-a3">\r
      <p class="text-[10px] font-bold tracking-[0.12em] uppercase text-sage-600 dark:text-sage-400 mb-3">Conv\xEAnios aceitos</p>\r
      <div class="flex flex-wrap gap-2">\r
        @for (convenio of conveniosList; track convenio) {\r
          <span\r
            class="text-[11px] font-semibold px-3 py-1.5 rounded-full border"\r
            [class.bg-sage-50]="convenio !== '+ Particular'"\r
            [class.dark:bg-sage-700/15]="convenio !== '+ Particular'"\r
            [class.text-sage-700]="convenio !== '+ Particular'"\r
            [class.dark:text-sage-400]="convenio !== '+ Particular'"\r
            [class.border-sage-100]="convenio !== '+ Particular'"\r
            [class.dark:border-sage-700/25]="convenio !== '+ Particular'"\r
            [class.bg-earth-50]="convenio === '+ Particular'"\r
            [class.dark:bg-earth-600/10]="convenio === '+ Particular'"\r
            [class.text-earth-600]="convenio === '+ Particular'"\r
            [class.dark:text-earth-400]="convenio === '+ Particular'"\r
            [class.border-earth-100]="convenio === '+ Particular'"\r
            [class.dark:border-earth-600/20]="convenio === '+ Particular'"\r
          >\r
            {{ convenio }}\r
          </span>\r
        }\r
      </div>\r
    </div>\r
\r
    @if (hasAnyHour) {\r
    <div class="mt-3 rounded-2xl bg-white dark:bg-white/3 border border-sage-100 dark:border-white/5 px-4 pt-4 pb-3 lb-m8-a3">\r
        <p class="text-[10px] font-bold tracking-[0.12em] uppercase text-sage-600 dark:text-sage-400 mb-3">Agenda</p>\r
        <div class="space-y-1">\r
          @for (row of weekdayRows; track row.label) {\r
            <div class="flex justify-between text-[13px] py-1.5 border-b border-sage-50 dark:border-white/4 last:border-b-0">\r
              <span class="font-semibold text-gray-700 dark:text-gray-300">{{ row.label }}</span>\r
              <span class="font-bold text-sage-600 dark:text-sage-400">{{ row.text }}</span>\r
            </div>\r
          }\r
          @for (row of weekendRows; track row.label) {\r
            <div class="flex justify-between text-[13px] py-1.5">\r
              <span class="text-gray-400 dark:text-gray-600">{{ row.label }}</span>\r
              <span class="text-gray-300 dark:text-gray-700">{{ row.text }}</span>\r
            </div>\r
          }\r
        </div>\r
      </div>\r
    }\r
\r
    <div class="mt-6 lb-m8-a4">\r
      <div class="flex items-center gap-3 mb-3">\r
        <p class="text-[10px] font-bold tracking-[0.12em] uppercase text-sage-600 dark:text-sage-400 whitespace-nowrap">\xC1rea de atua\xE7\xE3o</p>\r
        <div class="flex-1 h-px bg-sage-100 dark:bg-white/6"></div>\r
      </div>\r
      <div class="grid grid-cols-2 gap-2.5">\r
        @for (area of areas; track area.title) {\r
          <div class="lb-m8-approach bg-white dark:bg-white/3 border border-sage-100 dark:border-white/5">\r
            <div class="text-xl mb-2">{{ area.icon }}</div>\r
            <p class="text-[13px] font-bold text-gray-800 dark:text-gray-200">{{ area.title }}</p>\r
            <p class="text-[11px] text-gray-500 dark:text-gray-600 mt-1 leading-relaxed">{{ area.description }}</p>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
\r
    @if (allDocs.length) {\r
      <div class="mt-6 lb-m8-a5">\r
        <div class="flex items-center gap-3 mb-1.5">\r
          <p class="text-[10px] font-bold tracking-[0.12em] uppercase text-sage-600 dark:text-sage-400 whitespace-nowrap">Documentos</p>\r
          <div class="flex-1 h-px bg-sage-100 dark:bg-white/6"></div>\r
        </div>\r
        <p class="text-[12px] text-gray-500 dark:text-gray-600 mb-4 font-medium">Preencha antes da sua consulta</p>\r
\r
        @for (link of allDocs; track trackDoc($index, link)) {\r
          @if (link.type === 'bio') {\r
            <a\r
              [href]="hrefBio(link.item)"\r
              target="_blank"\r
              rel="noopener noreferrer"\r
              class="lb-m8-doc flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-white/3 border border-sage-100 dark:border-white/5 mb-3 no-underline group text-inherit"\r
            >\r
              <div class="w-10 h-10 rounded-xl bg-sage-50 dark:bg-sage-700/20 flex items-center justify-center shrink-0 text-lg">\u{1F4CB}</div>\r
              <div class="flex-1 min-w-0">\r
                <p class="text-[13px] font-bold text-gray-800 dark:text-gray-200">{{ link.item.label }}</p>\r
                <p class="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5 truncate">{{ link.item.url }}</p>\r
              </div>\r
              <svg class="w-4 h-4 text-gray-300 dark:text-gray-700 shrink-0 group-hover:text-sage-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <polyline points="9 18 15 12 9 6" />\r
              </svg>\r
            </a>\r
          } @else {\r
            <a\r
              [routerLink]="['/f', formToken(link.item)]"\r
              class="lb-m8-doc flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-white/3 border border-sage-100 dark:border-white/5 mb-3 no-underline group text-inherit"\r
            >\r
              <div class="w-10 h-10 rounded-xl bg-sage-50 dark:bg-sage-700/20 flex items-center justify-center shrink-0 text-lg">\u{1F37D}\uFE0F</div>\r
              <div class="flex-1 min-w-0">\r
                <p class="text-[13px] font-bold text-gray-800 dark:text-gray-200">{{ link.item.name }}</p>\r
                <p class="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5">Preenchimento online</p>\r
              </div>\r
              <svg class="w-4 h-4 text-gray-300 dark:text-gray-700 shrink-0 group-hover:text-sage-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <polyline points="9 18 15 12 9 6" />\r
              </svg>\r
            </a>\r
          }\r
        }\r
      </div>\r
    }\r
\r
    @if (clinic.address) {\r
      <div class="flex items-center gap-2 mt-5 lb-m8-a6">\r
        <svg class="w-[13px] h-[13px] text-sage-500 dark:text-sage-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />\r
          <circle cx="12" cy="10" r="3" />\r
        </svg>\r
        <span class="text-[12px] text-gray-400 dark:text-gray-600 font-medium">{{ clinic.address }}</span>\r
      </div>\r
    }\r
\r
    <div class="mt-8 pt-5 border-t border-sage-100 dark:border-white/5 flex items-center justify-center gap-2 flex-wrap lb-m8-a6">\r
      <div class="w-[5px] h-[5px] rounded-full bg-sage-500 opacity-60"></div>\r
      <span class="text-[11px] text-gray-400 dark:text-gray-600 font-medium">Fichas digitais por</span>\r
      <a href="https://gestgo.com.br" target="_blank" rel="noopener noreferrer" class="text-[11px] font-bold text-sage-600 dark:text-sage-400 no-underline hover:opacity-75 transition-opacity">\r
        Gestgo\r
      </a>\r
      <span class="text-gray-300 dark:text-gray-700 text-[11px]">\xB7</span>\r
      <a routerLink="/privacidade" class="text-[11px] text-gray-400 dark:text-gray-600 no-underline hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-medium">Privacidade</a>\r
    </div>\r
  </div>\r
</div>\r
`, styles: [`@import "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap";

/* src/app/paginas/link-bio-public/link-bio-public-layout-nutri.component.css */
:host {
  display: block;
}
.lb-m8-root {
  font-family:
    "DM Sans",
    ui-sans-serif,
    system-ui,
    sans-serif;
  background-color: #f4f7f2;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='25' cy='25' r='1.5' fill='%23527a42' opacity='0.07'/%3E%3Ccircle cx='75' cy='75' r='1.5' fill='%23527a42' opacity='0.07'/%3E%3Ccircle cx='75' cy='25' r='1' fill='%23527a42' opacity='0.05'/%3E%3Ccircle cx='25' cy='75' r='1' fill='%23527a42' opacity='0.05'/%3E%3C/svg%3E");
  color: #2f4a25;
  min-height: 100vh;
}
.lb-m8-root.dark {
  background-color: #0d110b;
  color: #d8e7d0;
}
.lb-m8-root *,
.lb-m8-root *::before,
.lb-m8-root *::after {
  box-sizing: border-box;
}
.lb-m8-display {
  font-family:
    "Fraunces",
    ui-serif,
    Georgia,
    serif;
}
.lb-m8-cover {
  background: #2f4a25;
  position: relative;
  overflow: hidden;
}
.lb-m8-root.dark .lb-m8-cover {
  background: #1a2616;
}
.lb-m8-cover::before {
  content: "";
  position: absolute;
  bottom: -30px;
  left: -5%;
  right: -5%;
  height: 80px;
  background: #f4f7f2;
  border-radius: 60% 60% 0 0 / 100% 100% 0 0;
}
.lb-m8-root.dark .lb-m8-cover::before {
  background: #0d110b;
}
.lb-m8-cover::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 255, 255, 0.06) 0%,
      transparent 50%),
    radial-gradient(
      circle at 20% 80%,
      rgba(255, 255, 255, 0.04) 0%,
      transparent 40%);
}
.lb-m8-avatar-ring {
  width: 88px;
  height: 88px;
  border-radius: 999px;
  background:
    linear-gradient(
      135deg,
      #9dbd8e,
      #d0a87a);
  padding: 3px;
  flex-shrink: 0;
}
.lb-m8-avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: #6e9458;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family:
    "Fraunces",
    ui-serif,
    Georgia,
    serif;
  font-size: 32px;
  font-weight: 600;
  color: #fff;
}
.lb-m8-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f0f9eb;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: #3e6031;
  padding: 4px 11px;
}
.lb-m8-root.dark .lb-m8-status {
  background: rgba(82, 122, 66, 0.15);
  color: #9dbd8e;
}
.lb-m8-status-closed {
  background: #f5f5f5;
  color: #888;
}
.lb-m8-root.dark .lb-m8-status-closed {
  background: rgba(255, 255, 255, 0.05);
  color: #7d7d7d;
}
.lb-m8-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #527a42;
  display: inline-block;
  animation: lb-m8-pulse 2s ease-in-out infinite;
}
.lb-m8-status-dot-closed {
  background: #9ca3af;
  animation: none;
}
.lb-m8-wpp {
  background: #22c55e;
  color: #fff;
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 700;
  transition: filter 0.15s, transform 0.1s;
}
.lb-m8-wpp:hover {
  filter: brightness(1.08);
}
.lb-m8-wpp:active {
  transform: scale(0.98);
}
.lb-m8-secondary {
  border: none;
  border-radius: 12px;
  padding: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 600;
  transition: background 0.15s, transform 0.1s;
}
.lb-m8-secondary:active {
  transform: scale(0.97);
}
.lb-m8-doc {
  transition: transform 0.15s, background 0.15s;
}
.lb-m8-doc:hover {
  transform: translateX(4px);
}
.lb-m8-approach {
  border-radius: 16px;
  padding: 16px;
  transition: border-color 0.15s, transform 0.15s;
}
.lb-m8-approach:hover {
  transform: translateY(-2px);
}
.lb-m8-icon-pill {
  cursor: pointer;
  border: none;
  background: transparent;
  transition: opacity 0.15s;
}
.lb-m8-icon-pill:hover {
  opacity: 0.6;
}
@keyframes lb-m8-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}
@keyframes lb-m8-fade-up {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.lb-m8-a1 {
  animation: lb-m8-fade-up 0.55s ease both;
}
.lb-m8-a2 {
  animation: lb-m8-fade-up 0.55s 0.08s ease both;
}
.lb-m8-a3 {
  animation: lb-m8-fade-up 0.55s 0.16s ease both;
}
.lb-m8-a4 {
  animation: lb-m8-fade-up 0.55s 0.24s ease both;
}
.lb-m8-a5 {
  animation: lb-m8-fade-up 0.55s 0.32s ease both;
}
.lb-m8-a6 {
  animation: lb-m8-fade-up 0.55s 0.4s ease both;
}
/*# sourceMappingURL=link-bio-public-layout-nutri.component.css.map */
`] }]
  }], null, { clinic: [{
    type: Input,
    args: [{ required: true }]
  }], bioLinks: [{
    type: Input
  }], dark: [{
    type: Input
  }], allDocs: [{
    type: Input
  }], publicSlug: [{
    type: Input
  }], linkBioPreview: [{
    type: Input
  }], toggleDark: [{
    type: Output
  }], share: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LinkBioPublicLayoutNutriComponent, { className: "LinkBioPublicLayoutNutriComponent", filePath: "src/app/paginas/link-bio-public/link-bio-public-layout-nutri.component.ts", lineNumber: 42 });
})();

export {
  LinkBioPublicLayoutsComponent,
  LinkBioPublicLayoutGenericComponent,
  LinkBioPublicLayoutVetComponent,
  LinkBioPublicLayoutPediaComponent,
  LinkBioPublicLayoutNutriComponent
};
//# sourceMappingURL=chunk-V75O5RVQ.js.map
