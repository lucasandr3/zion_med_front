import {
  LinkBioPublicLayoutGenericComponent,
  LinkBioPublicLayoutNutriComponent,
  LinkBioPublicLayoutPediaComponent,
  LinkBioPublicLayoutVetComponent,
  LinkBioPublicLayoutsComponent
} from "./chunk-V75O5RVQ.js";
import "./chunk-YFYVZLKB.js";
import {
  PublicPageBodyService
} from "./chunk-IQRZ5S5Y.js";
import "./chunk-7WBHVE2H.js";
import "./chunk-IBJWGIJV.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext
} from "./chunk-GRLISYEV.js";

// src/app/paginas/demo/demo-link-bio.component.ts
function DemoLinkBioComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 2)(2, "span", 3);
    \u0275\u0275text(3, "DEMONSTRA\xC7\xC3O");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Esta \xE9 uma p\xE1gina de exemplo do Gestgo.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "a", 4);
    \u0275\u0275text(7, "\u2190 Voltar ao site");
    \u0275\u0275elementEnd()()();
  }
}
function DemoLinkBioComponent_Conditional_1_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-link-bio-public-layout-generic", 8);
    \u0275\u0275listener("toggleDark", function DemoLinkBioComponent_Conditional_1_Case_0_Template_app_link_bio_public_layout_generic_toggleDark_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleDark());
    })("share", function DemoLinkBioComponent_Conditional_1_Case_0_Template_app_link_bio_public_layout_generic_share_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onShare());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("clinic", ctx_r1.clinic)("allLinks", ctx_r1.allDocs)("publicSlug", ctx_r1.clinic.slug)("linkBioPreview", false)("dark", ctx_r1.dark)("embedMode", ctx_r1.embedMode);
  }
}
function DemoLinkBioComponent_Conditional_1_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-link-bio-public-layouts", 9);
    \u0275\u0275listener("toggleDark", function DemoLinkBioComponent_Conditional_1_Case_1_Template_app_link_bio_public_layouts_toggleDark_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleDark());
    })("share", function DemoLinkBioComponent_Conditional_1_Case_1_Template_app_link_bio_public_layouts_share_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onShare());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("model", 2)("clinic", ctx_r1.clinic)("bioLinks", ctx_r1.bioLinks)("allDocs", ctx_r1.allDocs)("publicSlug", ctx_r1.clinic.slug)("linkBioPreview", false)("dark", ctx_r1.dark);
  }
}
function DemoLinkBioComponent_Conditional_1_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-link-bio-public-layouts", 9);
    \u0275\u0275listener("toggleDark", function DemoLinkBioComponent_Conditional_1_Case_2_Template_app_link_bio_public_layouts_toggleDark_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleDark());
    })("share", function DemoLinkBioComponent_Conditional_1_Case_2_Template_app_link_bio_public_layouts_share_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onShare());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("model", 3)("clinic", ctx_r1.clinic)("bioLinks", ctx_r1.bioLinks)("allDocs", ctx_r1.allDocs)("publicSlug", ctx_r1.clinic.slug)("linkBioPreview", false)("dark", ctx_r1.dark);
  }
}
function DemoLinkBioComponent_Conditional_1_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-link-bio-public-layouts", 9);
    \u0275\u0275listener("toggleDark", function DemoLinkBioComponent_Conditional_1_Case_3_Template_app_link_bio_public_layouts_toggleDark_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleDark());
    })("share", function DemoLinkBioComponent_Conditional_1_Case_3_Template_app_link_bio_public_layouts_share_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onShare());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("model", 4)("clinic", ctx_r1.clinic)("bioLinks", ctx_r1.bioLinks)("allDocs", ctx_r1.allDocs)("publicSlug", ctx_r1.clinic.slug)("linkBioPreview", false)("dark", ctx_r1.dark);
  }
}
function DemoLinkBioComponent_Conditional_1_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-link-bio-public-layouts", 9);
    \u0275\u0275listener("toggleDark", function DemoLinkBioComponent_Conditional_1_Case_4_Template_app_link_bio_public_layouts_toggleDark_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleDark());
    })("share", function DemoLinkBioComponent_Conditional_1_Case_4_Template_app_link_bio_public_layouts_share_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onShare());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("model", 5)("clinic", ctx_r1.clinic)("bioLinks", ctx_r1.bioLinks)("allDocs", ctx_r1.allDocs)("publicSlug", ctx_r1.clinic.slug)("linkBioPreview", false)("dark", ctx_r1.dark);
  }
}
function DemoLinkBioComponent_Conditional_1_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-link-bio-public-layout-vet", 10);
    \u0275\u0275listener("toggleDark", function DemoLinkBioComponent_Conditional_1_Case_5_Template_app_link_bio_public_layout_vet_toggleDark_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleDark());
    })("share", function DemoLinkBioComponent_Conditional_1_Case_5_Template_app_link_bio_public_layout_vet_share_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onShare());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("clinic", ctx_r1.clinic)("bioLinks", ctx_r1.bioLinks)("allDocs", ctx_r1.allDocs)("publicSlug", ctx_r1.clinic.slug)("linkBioPreview", false)("dark", ctx_r1.dark);
  }
}
function DemoLinkBioComponent_Conditional_1_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-link-bio-public-layout-pedia", 10);
    \u0275\u0275listener("toggleDark", function DemoLinkBioComponent_Conditional_1_Case_6_Template_app_link_bio_public_layout_pedia_toggleDark_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleDark());
    })("share", function DemoLinkBioComponent_Conditional_1_Case_6_Template_app_link_bio_public_layout_pedia_share_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onShare());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("clinic", ctx_r1.clinic)("bioLinks", ctx_r1.bioLinks)("allDocs", ctx_r1.allDocs)("publicSlug", ctx_r1.clinic.slug)("linkBioPreview", false)("dark", ctx_r1.dark);
  }
}
function DemoLinkBioComponent_Conditional_1_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-link-bio-public-layout-nutri", 10);
    \u0275\u0275listener("toggleDark", function DemoLinkBioComponent_Conditional_1_Case_7_Template_app_link_bio_public_layout_nutri_toggleDark_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleDark());
    })("share", function DemoLinkBioComponent_Conditional_1_Case_7_Template_app_link_bio_public_layout_nutri_share_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onShare());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("clinic", ctx_r1.clinic)("bioLinks", ctx_r1.bioLinks)("allDocs", ctx_r1.allDocs)("publicSlug", ctx_r1.clinic.slug)("linkBioPreview", false)("dark", ctx_r1.dark);
  }
}
function DemoLinkBioComponent_Conditional_1_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1, " Layout n\xE3o encontrado. ");
    \u0275\u0275elementStart(2, "a", 11);
    \u0275\u0275text(3, "Voltar ao site");
    \u0275\u0275elementEnd()();
  }
}
function DemoLinkBioComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DemoLinkBioComponent_Conditional_1_Case_0_Template, 1, 6, "app-link-bio-public-layout-generic", 5)(1, DemoLinkBioComponent_Conditional_1_Case_1_Template, 1, 7, "app-link-bio-public-layouts", 6)(2, DemoLinkBioComponent_Conditional_1_Case_2_Template, 1, 7, "app-link-bio-public-layouts", 6)(3, DemoLinkBioComponent_Conditional_1_Case_3_Template, 1, 7, "app-link-bio-public-layouts", 6)(4, DemoLinkBioComponent_Conditional_1_Case_4_Template, 1, 7, "app-link-bio-public-layouts", 6)(5, DemoLinkBioComponent_Conditional_1_Case_5_Template, 1, 6, "app-link-bio-public-layout-vet", 7)(6, DemoLinkBioComponent_Conditional_1_Case_6_Template, 1, 6, "app-link-bio-public-layout-pedia", 7)(7, DemoLinkBioComponent_Conditional_1_Case_7_Template, 1, 6, "app-link-bio-public-layout-nutri", 7)(8, DemoLinkBioComponent_Conditional_1_Case_8_Template, 4, 0, "div", 1);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r1.modelNum) === 1 ? 0 : tmp_1_0 === 2 ? 1 : tmp_1_0 === 3 ? 2 : tmp_1_0 === 4 ? 3 : tmp_1_0 === 5 ? 4 : tmp_1_0 === 6 ? 5 : tmp_1_0 === 7 ? 6 : tmp_1_0 === 8 ? 7 : 8);
  }
}
function DemoLinkBioComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1, " Carregando demonstra\xE7\xE3o... ");
    \u0275\u0275elementEnd();
  }
}
var MOCK_CLINICS = {
  1: {
    id: 9001,
    name: "Cl\xEDnica S\xE3o Paulo",
    slug: "demo-1",
    short_description: "Cl\xEDnica geral multidisciplinar",
    logo_url: null,
    cover_image_url: null,
    /** Sem faixa hero — alinhado ao layout genérico “limpo” na prévia da landing */
    cover_mode: "none",
    cover_color: null,
    accent_hex: "#1e293b",
    phone: "11999999999",
    contact_email: "contato@clinicasp.com.br",
    address: "Rua Central, 45 \xB7 S\xE3o Paulo, SP",
    maps_url: "#",
    is_open_now: true,
    link_bio_model: 1,
    link_bio_extra: {},
    specialties_list: ["Cl\xEDnica Geral", "Cardiologia", "Endocrinologia"],
    business_hours_grid: {
      "1": { label: "Seg", text: "08:00\u201318:00" },
      "2": { label: "Ter", text: "08:00\u201318:00" },
      "3": { label: "Qua", text: "08:00\u201318:00" },
      "4": { label: "Qui", text: "08:00\u201318:00" },
      "5": { label: "Sex", text: "08:00\u201317:00" },
      "6": { label: "S\xE1b", text: "\u2013" },
      "7": { label: "Dom", text: "\u2013" }
    },
    founded_year: 2010
  },
  2: {
    id: 9002,
    name: "Dra. Ana Costa",
    slug: "demo-2",
    short_description: "Dermatologia cl\xEDnica e est\xE9tica",
    logo_url: null,
    cover_image_url: null,
    phone: "11999999999",
    contact_email: "ana@dracosta.com.br",
    address: "Av. Paulista, 1200 \xB7 S\xE3o Paulo, SP",
    maps_url: "#",
    is_open_now: true,
    link_bio_model: 2,
    link_bio_extra: { hero_tagline: "Dermatologista \xB7 CRM 45.678", modalities: [{ title: "Teleconsulta", subtitle: "Via Google Meet", available: true }, { title: "Presencial", subtitle: "Av. Paulista", available: true }] },
    specialties_list: ["Dermatologia"],
    business_hours_grid: { "1": { label: "Seg", text: "09:00\u201317:00" }, "2": { label: "Ter", text: "09:00\u201317:00" }, "3": { label: "Qua", text: "09:00\u201317:00" }, "4": { label: "Qui", text: "09:00\u201317:00" }, "5": { label: "Sex", text: "09:00\u201316:00" } }
  },
  3: {
    id: 9003,
    name: "Studio Belle Est\xE9tica",
    slug: "demo-3",
    short_description: "Est\xE9tica avan\xE7ada e harmoniza\xE7\xE3o facial",
    logo_url: null,
    cover_image_url: null,
    phone: "11999999999",
    contact_email: "contato@studiobelle.com.br",
    address: "Rua Oscar Freire, 890 \xB7 S\xE3o Paulo, SP",
    maps_url: "#",
    is_open_now: true,
    link_bio_model: 3,
    link_bio_extra: { brand_subtitle: "Est\xE9tica avan\xE7ada", specialties_list: ["Botox", "Preenchimento", "Bioestimuladores", "Peeling", "Limpeza de Pele", "Microagulhamento"] },
    specialties_list: [],
    business_hours_grid: { "1": { label: "Seg", text: "10:00\u201319:00" }, "2": { label: "Ter", text: "10:00\u201319:00" }, "3": { label: "Qua", text: "10:00\u201319:00" }, "4": { label: "Qui", text: "10:00\u201319:00" }, "5": { label: "Sex", text: "10:00\u201318:00" }, "6": { label: "S\xE1b", text: "09:00\u201314:00" } }
  },
  4: {
    id: 9004,
    name: "OdontoSmile",
    slug: "demo-4",
    short_description: "Odontologia completa para toda a fam\xEDlia",
    logo_url: null,
    cover_image_url: null,
    phone: "11999999999",
    contact_email: "contato@odontosmile.com.br",
    address: "Rua Augusta, 320 \xB7 S\xE3o Paulo, SP",
    maps_url: "#",
    is_open_now: false,
    link_bio_model: 4,
    link_bio_extra: { council_type: "CRO", council_number: "12345", convenios: ["Amil", "Bradesco Sa\xFAde", "SulAm\xE9rica", "Unimed"] },
    specialties_list: ["Ortodontia", "Implantes", "Endodontia"],
    business_hours_grid: { "1": { label: "Seg", text: "08:00\u201318:00" }, "2": { label: "Ter", text: "08:00\u201318:00" }, "3": { label: "Qua", text: "08:00\u201318:00" }, "4": { label: "Qui", text: "08:00\u201318:00" }, "5": { label: "Sex", text: "08:00\u201317:00" } },
    founded_year: 2015
  },
  5: {
    id: 9005,
    name: "Instituto Sa\xFAde Integrar",
    slug: "demo-5",
    short_description: "Cl\xEDnica multidisciplinar com equipe completa",
    logo_url: null,
    cover_image_url: null,
    phone: "11999999999",
    contact_email: "contato@integrar.com.br",
    address: "Rua Funchal, 573 \xB7 S\xE3o Paulo, SP",
    maps_url: "#",
    is_open_now: true,
    link_bio_model: 5,
    link_bio_extra: { hero_tagline: "6 especialistas \xB7 Desde 2018", team: [{ name: "Dr. Rafael Mendes", credential: "CRM 34.567", notes: "Cardiologia", whatsapp: "" }, { name: "Dra. Juliana Alves", credential: "CRP 06/12345", notes: "Psicologia", whatsapp: "" }, { name: "Dr. Carlos Lima", credential: "CRO 45.678", notes: "Odontologia", whatsapp: "" }] },
    specialties_list: ["Cardiologia", "Psicologia", "Odontologia", "Nutri\xE7\xE3o"],
    business_hours_grid: { "1": { label: "Seg", text: "07:00\u201320:00" }, "2": { label: "Ter", text: "07:00\u201320:00" }, "3": { label: "Qua", text: "07:00\u201320:00" }, "4": { label: "Qui", text: "07:00\u201320:00" }, "5": { label: "Sex", text: "07:00\u201319:00" }, "6": { label: "S\xE1b", text: "08:00\u201313:00" } },
    founded_year: 2018
  },
  6: {
    id: 9006,
    name: "VetCare Animal",
    slug: "demo-6",
    short_description: "Cl\xEDnica veterin\xE1ria para c\xE3es e gatos",
    logo_url: null,
    cover_image_url: null,
    phone: "11999999999",
    contact_email: "contato@vetcare.com.br",
    address: "Rua dos Bichos, 200 \xB7 S\xE3o Paulo, SP",
    maps_url: "#",
    is_open_now: true,
    link_bio_model: 6,
    link_bio_extra: {},
    specialties_list: ["Cl\xEDnica Geral", "Cirurgia"],
    business_hours_grid: {
      "1": { label: "Seg", text: "09:00\u201319:00" },
      "2": { label: "Ter", text: "09:00\u201319:00" },
      "3": { label: "Qua", text: "09:00\u201319:00" },
      "4": { label: "Qui", text: "09:00\u201319:00" },
      "5": { label: "Sex", text: "09:00\u201318:00" },
      "6": { label: "S\xE1b", text: "09:00\u201314:00" },
      "7": { label: "Dom", text: "\u2013" }
    },
    founded_year: 2014
  },
  7: {
    id: 9007,
    name: "Crescer Pediatria",
    slug: "demo-7",
    short_description: "Sa\xFAde infantil com carinho e evid\xEAncia",
    logo_url: null,
    cover_image_url: null,
    phone: "11999999999",
    contact_email: "contato@crescerpedia.com.br",
    address: "Alameda Inf\xE2ncia, 88 \xB7 S\xE3o Paulo, SP",
    maps_url: "#",
    is_open_now: true,
    link_bio_model: 7,
    link_bio_extra: {},
    specialties_list: ["Pediatria", "Puericultura"],
    business_hours_grid: {
      "1": { label: "Seg", text: "08:00\u201318:00" },
      "2": { label: "Ter", text: "08:00\u201318:00" },
      "3": { label: "Qua", text: "08:00\u201318:00" },
      "4": { label: "Qui", text: "08:00\u201318:00" },
      "5": { label: "Sex", text: "08:00\u201317:00" },
      "6": { label: "S\xE1b", text: "08:00\u201312:00" },
      "7": { label: "Dom", text: "\u2013" }
    },
    founded_year: 2016
  },
  8: {
    id: 9008,
    name: "Nutri Vida",
    slug: "demo-8",
    short_description: "Nutri\xE7\xE3o cl\xEDnica e funcional",
    logo_url: null,
    cover_image_url: null,
    phone: "11999999999",
    contact_email: "ola@nutrivida.com.br",
    address: "Rua Bem-Estar, 150 \xB7 S\xE3o Paulo, SP",
    maps_url: "#",
    is_open_now: true,
    link_bio_model: 8,
    link_bio_extra: {},
    specialties_list: ["Nutri\xE7\xE3o cl\xEDnica", "Emagrecimento", "Esportiva"],
    business_hours_grid: {
      "1": { label: "Seg", text: "09:00\u201319:00" },
      "2": { label: "Ter", text: "09:00\u201319:00" },
      "3": { label: "Qua", text: "09:00\u201319:00" },
      "4": { label: "Qui", text: "09:00\u201319:00" },
      "5": { label: "Sex", text: "09:00\u201318:00" },
      "6": { label: "S\xE1b", text: "\u2013" },
      "7": { label: "Dom", text: "\u2013" }
    },
    founded_year: 2019
  }
};
var MOCK_BIO_LINKS = [];
var MOCK_DOCS = [
  {
    type: "form",
    item: { id: 1, name: "Ficha de Anamnese", public_url: "https://gestgo.com.br/f/demo-anamnese" }
  },
  {
    type: "form",
    item: { id: 2, name: "Termo de Consentimento", public_url: "https://gestgo.com.br/f/demo-consentimento" }
  },
  {
    type: "form",
    item: { id: 3, name: "Pesquisa de Satisfa\xE7\xE3o", public_url: "https://gestgo.com.br/f/demo-pesquisa" }
  }
];
var DemoLinkBioComponent = class _DemoLinkBioComponent {
  clinic = null;
  modelNum = 1;
  /** Oculta faixa fixa quando aberto dentro do iframe da landing (query embed=1) */
  embedMode = false;
  dark = true;
  bioLinks = MOCK_BIO_LINKS;
  allDocs = MOCK_DOCS;
  route = inject(ActivatedRoute);
  platformId = inject(PLATFORM_ID);
  publicPageBody = inject(PublicPageBodyService);
  ngOnInit() {
    this.publicPageBody.enterPublicPage();
    this.embedMode = this.route.snapshot.queryParamMap.get("embed") === "1";
    const modelParam = this.route.snapshot.paramMap.get("model") ?? "1";
    this.modelNum = parseInt(modelParam, 10) || 1;
    if (this.modelNum < 1 || this.modelNum > 8)
      this.modelNum = 1;
    const mock = MOCK_CLINICS[this.modelNum];
    if (mock) {
      this.clinic = mock;
    }
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.dark = localStorage.getItem("gestgo_bio_dark") !== "0";
      } catch {
      }
    }
  }
  ngOnDestroy() {
    this.publicPageBody.leavePublicPage();
  }
  toggleDark() {
    this.dark = !this.dark;
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem("gestgo_bio_dark", this.dark ? "1" : "0");
      } catch {
      }
    }
  }
  onShare() {
    if (isPlatformBrowser(this.platformId) && navigator.share) {
      navigator.share({ title: this.clinic?.name ?? "Demo", url: window.location.href }).catch(() => {
      });
    }
  }
  static \u0275fac = function DemoLinkBioComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DemoLinkBioComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DemoLinkBioComponent, selectors: [["app-demo-link-bio"]], decls: 3, vars: 2, consts: [[1, "demo-banner"], [2, "text-align", "center", "padding", "100px 24px", "color", "#888"], [1, "demo-banner-inner"], [1, "demo-badge"], ["routerLink", "/", 1, "demo-back"], [3, "clinic", "allLinks", "publicSlug", "linkBioPreview", "dark", "embedMode"], [3, "model", "clinic", "bioLinks", "allDocs", "publicSlug", "linkBioPreview", "dark"], [3, "clinic", "bioLinks", "allDocs", "publicSlug", "linkBioPreview", "dark"], [3, "toggleDark", "share", "clinic", "allLinks", "publicSlug", "linkBioPreview", "dark", "embedMode"], [3, "toggleDark", "share", "model", "clinic", "bioLinks", "allDocs", "publicSlug", "linkBioPreview", "dark"], [3, "toggleDark", "share", "clinic", "bioLinks", "allDocs", "publicSlug", "linkBioPreview", "dark"], ["routerLink", "/", 2, "color", "#3b82f6"]], template: function DemoLinkBioComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, DemoLinkBioComponent_Conditional_0_Template, 8, 0, "div", 0);
      \u0275\u0275conditionalCreate(1, DemoLinkBioComponent_Conditional_1_Template, 9, 1)(2, DemoLinkBioComponent_Conditional_2_Template, 2, 0, "div", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(!ctx.embedMode ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.clinic ? 1 : 2);
    }
  }, dependencies: [
    CommonModule,
    RouterLink,
    LinkBioPublicLayoutGenericComponent,
    LinkBioPublicLayoutsComponent,
    LinkBioPublicLayoutVetComponent,
    LinkBioPublicLayoutPediaComponent,
    LinkBioPublicLayoutNutriComponent
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.demo-banner[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 9999;\n  background: #1d4ed8;\n  color: #fff;\n  font-size: 13px;\n  padding: 8px 16px;\n}\n.demo-banner-inner[_ngcontent-%COMP%] {\n  max-width: 600px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n.demo-badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  background: rgba(255, 255, 255, 0.2);\n  padding: 2px 8px;\n  border-radius: 4px;\n  letter-spacing: 0.05em;\n}\n.demo-back[_ngcontent-%COMP%] {\n  color: #fff;\n  text-decoration: underline;\n  text-underline-offset: 2px;\n  font-weight: 500;\n}\n/*# sourceMappingURL=demo-link-bio.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DemoLinkBioComponent, [{
    type: Component,
    args: [{ selector: "app-demo-link-bio", standalone: true, imports: [
      CommonModule,
      RouterLink,
      LinkBioPublicLayoutGenericComponent,
      LinkBioPublicLayoutsComponent,
      LinkBioPublicLayoutVetComponent,
      LinkBioPublicLayoutPediaComponent,
      LinkBioPublicLayoutNutriComponent
    ], template: `
    @if (!embedMode) {
      <div class="demo-banner">
        <div class="demo-banner-inner">
          <span class="demo-badge">DEMONSTRA\xC7\xC3O</span>
          <span>Esta \xE9 uma p\xE1gina de exemplo do Gestgo.</span>
          <a routerLink="/" class="demo-back">\u2190 Voltar ao site</a>
        </div>
      </div>
    }

    @if (clinic) {
      @switch (modelNum) {
        @case (1) {
          <app-link-bio-public-layout-generic
            [clinic]="clinic"
            [allLinks]="allDocs"
            [publicSlug]="clinic.slug!"
            [linkBioPreview]="false"
            [dark]="dark"
            [embedMode]="embedMode"
            (toggleDark)="toggleDark()"
            (share)="onShare()"
          />
        }
        @case (2) {
          <app-link-bio-public-layouts
            [model]="2" [clinic]="clinic" [bioLinks]="bioLinks" [allDocs]="allDocs"
            [publicSlug]="clinic.slug!" [linkBioPreview]="false"
            [dark]="dark" (toggleDark)="toggleDark()" (share)="onShare()"
          />
        }
        @case (3) {
          <app-link-bio-public-layouts
            [model]="3" [clinic]="clinic" [bioLinks]="bioLinks" [allDocs]="allDocs"
            [publicSlug]="clinic.slug!" [linkBioPreview]="false"
            [dark]="dark" (toggleDark)="toggleDark()" (share)="onShare()"
          />
        }
        @case (4) {
          <app-link-bio-public-layouts
            [model]="4" [clinic]="clinic" [bioLinks]="bioLinks" [allDocs]="allDocs"
            [publicSlug]="clinic.slug!" [linkBioPreview]="false"
            [dark]="dark" (toggleDark)="toggleDark()" (share)="onShare()"
          />
        }
        @case (5) {
          <app-link-bio-public-layouts
            [model]="5" [clinic]="clinic" [bioLinks]="bioLinks" [allDocs]="allDocs"
            [publicSlug]="clinic.slug!" [linkBioPreview]="false"
            [dark]="dark" (toggleDark)="toggleDark()" (share)="onShare()"
          />
        }
        @case (6) {
          <app-link-bio-public-layout-vet
            [clinic]="clinic" [bioLinks]="bioLinks" [allDocs]="allDocs"
            [publicSlug]="clinic.slug!" [linkBioPreview]="false"
            [dark]="dark" (toggleDark)="toggleDark()" (share)="onShare()"
          />
        }
        @case (7) {
          <app-link-bio-public-layout-pedia
            [clinic]="clinic" [bioLinks]="bioLinks" [allDocs]="allDocs"
            [publicSlug]="clinic.slug!" [linkBioPreview]="false"
            [dark]="dark" (toggleDark)="toggleDark()" (share)="onShare()"
          />
        }
        @case (8) {
          <app-link-bio-public-layout-nutri
            [clinic]="clinic" [bioLinks]="bioLinks" [allDocs]="allDocs"
            [publicSlug]="clinic.slug!" [linkBioPreview]="false"
            [dark]="dark" (toggleDark)="toggleDark()" (share)="onShare()"
          />
        }
        @default {
          <div style="text-align: center; padding: 100px 24px; color: #888">
            Layout n\xE3o encontrado. <a routerLink="/" style="color: #3b82f6">Voltar ao site</a>
          </div>
        }
      }
    } @else {
      <div style="text-align: center; padding: 100px 24px; color: #888">
        Carregando demonstra\xE7\xE3o...
      </div>
    }
  `, styles: ["/* angular:styles/component:css;d73f9689005ca9e00f30e8d4b9bba5dc60b500a461b9eac31ffb7b602af3cba6;C:/Projetos/Angular/zion_med_front/src/app/paginas/demo/demo-link-bio.component.ts */\n:host {\n  display: block;\n}\n.demo-banner {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 9999;\n  background: #1d4ed8;\n  color: #fff;\n  font-size: 13px;\n  padding: 8px 16px;\n}\n.demo-banner-inner {\n  max-width: 600px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n.demo-badge {\n  font-size: 10px;\n  font-weight: 700;\n  background: rgba(255, 255, 255, 0.2);\n  padding: 2px 8px;\n  border-radius: 4px;\n  letter-spacing: 0.05em;\n}\n.demo-back {\n  color: #fff;\n  text-decoration: underline;\n  text-underline-offset: 2px;\n  font-weight: 500;\n}\n/*# sourceMappingURL=demo-link-bio.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DemoLinkBioComponent, { className: "DemoLinkBioComponent", filePath: "src/app/paginas/demo/demo-link-bio.component.ts", lineNumber: 316 });
})();
export {
  DemoLinkBioComponent
};
//# sourceMappingURL=chunk-VZFOT53H.js.map
