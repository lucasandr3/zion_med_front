import {
  LinkBioPublicLayoutGenericComponent,
  LinkBioPublicLayoutNutriComponent,
  LinkBioPublicLayoutPediaComponent,
  LinkBioPublicLayoutVetComponent,
  LinkBioPublicLayoutsComponent
} from "./chunk-V75O5RVQ.js";
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
import "./chunk-IBJWGIJV.js";
import {
  ActivatedRoute,
  Meta,
  Title
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  PLATFORM_ID,
  __spreadProps,
  __spreadValues,
  inject,
  isPlatformBrowser,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-GRLISYEV.js";

// src/app/paginas/link-bio-public/link-bio-public.component.ts
function LinkBioPublicComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4);
    \u0275\u0275element(2, "zm-skeleton-list", 5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("lb-bio-skeleton--dark", ctx_r0.dark);
    \u0275\u0275advance(2);
    \u0275\u0275property("rows", 6);
  }
}
function LinkBioPublicComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "p", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.erro);
  }
}
function LinkBioPublicComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "app-link-bio-public-layout-generic", 7);
    \u0275\u0275listener("toggleDark", function LinkBioPublicComponent_Conditional_3_Template_app_link_bio_public_layout_generic_toggleDark_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleDark());
    })("share", function LinkBioPublicComponent_Conditional_3_Template_app_link_bio_public_layout_generic_share_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.sharePage());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("clinic", ctx_r0.clinic)("allLinks", ctx_r0.allLinks)("publicSlug", ctx_r0.slug)("linkBioPreview", ctx_r0.linkBioPreview)("dark", ctx_r0.dark);
  }
}
function LinkBioPublicComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "app-link-bio-public-layouts", 8);
    \u0275\u0275listener("toggleDark", function LinkBioPublicComponent_Conditional_4_Template_app_link_bio_public_layouts_toggleDark_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleDark());
    })("share", function LinkBioPublicComponent_Conditional_4_Template_app_link_bio_public_layouts_share_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.sharePage());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("model", ctx_r0.layoutModelLegacy())("clinic", ctx_r0.clinic)("bioLinks", ctx_r0.links)("dark", ctx_r0.dark)("allDocs", ctx_r0.allLinks)("publicSlug", ctx_r0.slug)("linkBioPreview", ctx_r0.linkBioPreview);
  }
}
function LinkBioPublicComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "app-link-bio-public-layout-vet", 9);
    \u0275\u0275listener("toggleDark", function LinkBioPublicComponent_Conditional_5_Template_app_link_bio_public_layout_vet_toggleDark_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleDark());
    })("share", function LinkBioPublicComponent_Conditional_5_Template_app_link_bio_public_layout_vet_share_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.sharePage());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("clinic", ctx_r0.clinic)("bioLinks", ctx_r0.links)("dark", ctx_r0.dark)("allDocs", ctx_r0.allLinks)("publicSlug", ctx_r0.slug)("linkBioPreview", ctx_r0.linkBioPreview);
  }
}
function LinkBioPublicComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "app-link-bio-public-layout-pedia", 9);
    \u0275\u0275listener("toggleDark", function LinkBioPublicComponent_Conditional_6_Template_app_link_bio_public_layout_pedia_toggleDark_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleDark());
    })("share", function LinkBioPublicComponent_Conditional_6_Template_app_link_bio_public_layout_pedia_share_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.sharePage());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("clinic", ctx_r0.clinic)("bioLinks", ctx_r0.links)("dark", ctx_r0.dark)("allDocs", ctx_r0.allLinks)("publicSlug", ctx_r0.slug)("linkBioPreview", ctx_r0.linkBioPreview);
  }
}
function LinkBioPublicComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "app-link-bio-public-layout-nutri", 9);
    \u0275\u0275listener("toggleDark", function LinkBioPublicComponent_Conditional_7_Template_app_link_bio_public_layout_nutri_toggleDark_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleDark());
    })("share", function LinkBioPublicComponent_Conditional_7_Template_app_link_bio_public_layout_nutri_share_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.sharePage());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("clinic", ctx_r0.clinic)("bioLinks", ctx_r0.links)("dark", ctx_r0.dark)("allDocs", ctx_r0.allLinks)("publicSlug", ctx_r0.slug)("linkBioPreview", ctx_r0.linkBioPreview);
  }
}
var LinkBioPublicComponent = class _LinkBioPublicComponent {
  slug = "";
  data = null;
  showSkeleton;
  erro = "";
  dark = false;
  route = inject(ActivatedRoute);
  linkBioService = inject(LinkBioService);
  loadingService = inject(LoadingService);
  title = inject(Title);
  meta = inject(Meta);
  platformId = inject(PLATFORM_ID);
  publicPageBody = inject(PublicPageBodyService);
  ngOnInit() {
    this.publicPageBody.enterPublicPage();
    try {
      this.dark = localStorage.getItem("gestgo_bio_dark") === "1";
    } catch {
    }
    const slug = this.route.snapshot.paramMap.get("slug") ?? "";
    this.slug = slug;
    if (!slug) {
      this.showSkeleton = signal(false).asReadonly();
      this.erro = "Link inv\xE1lido.";
      return;
    }
    const preview = this.route.snapshot.queryParamMap.get("preview") === "1";
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.linkBioService.getPublicBySlug(slug, { preview }));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (d) => {
        const clinic = __spreadValues({}, d.clinic);
        if (clinic.logo_url != null && String(clinic.logo_url).trim() !== "") {
          clinic.logo_url = absoluteMediaUrl(String(clinic.logo_url)) ?? clinic.logo_url;
        }
        if (clinic.cover_image_url != null && String(clinic.cover_image_url).trim() !== "") {
          clinic.cover_image_url = absoluteMediaUrl(String(clinic.cover_image_url)) ?? clinic.cover_image_url;
        }
        this.data = __spreadProps(__spreadValues({}, d), { clinic });
        this.applyPreviewFromAdminSession();
        this.updateMeta();
      },
      error: () => {
        this.erro = "Link Bio n\xE3o encontrado.";
      }
    });
  }
  /** Prévia no painel: ?preview=1&preview_model=1..8 + sessionStorage (JSON extra). */
  applyPreviewFromAdminSession() {
    if (!isPlatformBrowser(this.platformId) || !this.data?.clinic)
      return;
    const q = this.route.snapshot.queryParamMap;
    if (q.get("preview") !== "1")
      return;
    const pm = q.get("preview_model");
    if (pm && ["1", "2", "3", "4", "5", "6", "7", "8"].includes(pm)) {
      this.data.clinic.link_bio_model = Number(pm);
    }
    try {
      const raw = sessionStorage.getItem("zm_link_bio_preview");
      if (!raw?.trim())
        return;
      const o = JSON.parse(raw);
      if (o?.link_bio_extra != null && typeof o.link_bio_extra === "object" && !Array.isArray(o.link_bio_extra)) {
        this.data.clinic.link_bio_extra = o.link_bio_extra;
      }
    } catch {
    }
  }
  updateMeta() {
    const c = this.clinic;
    if (!c)
      return;
    const isPv = isPlatformBrowser(this.platformId) && this.route.snapshot.queryParamMap.get("preview") === "1";
    const suffix = isPv ? " (pr\xE9via)" : "";
    const title = c.short_description ? `${c.name} \u2013 ${c.short_description.slice(0, 50)}${suffix}` : `${c.name}${suffix}`;
    this.title.setTitle(title);
    const desc = c.meta_description ?? (c.short_description ?? `Links e informa\xE7\xF5es de ${c.name}`);
    this.meta.updateTag({ name: "description", content: desc });
    this.meta.updateTag({ property: "og:title", content: c.name });
    this.meta.updateTag({ property: "og:description", content: desc });
    this.meta.updateTag({ property: "og:type", content: "website" });
    if (c.cover_image_url)
      this.meta.updateTag({ property: "og:image", content: c.cover_image_url });
    else if (c.logo_url)
      this.meta.updateTag({ property: "og:image", content: c.logo_url });
  }
  get clinic() {
    return this.data?.clinic ?? null;
  }
  /** Prévia no painel admin: não contabiliza visitas/cliques externos. */
  get linkBioPreview() {
    return isPlatformBrowser(this.platformId) && this.route.snapshot.queryParamMap.get("preview") === "1";
  }
  get model() {
    const value = this.clinic?.link_bio_model;
    return value && [1, 2, 3, 4, 5, 6, 7, 8].includes(value) ? value : 1;
  }
  /** Para o componente de layouts 2–5 (só usar quando model ∈ {2,3,4,5}). */
  layoutModelLegacy() {
    const v = this.model;
    if (v === 2 || v === 3 || v === 4 || v === 5)
      return v;
    return 2;
  }
  get links() {
    return this.data?.links ?? [];
  }
  get formLinks() {
    return this.data?.form_links ?? [];
  }
  /** Lista unificada: bio links primeiro, depois formulários (como no Blade). */
  get allLinks() {
    const items = this.links.map((item) => ({ type: "bio", item }));
    this.formLinks.forEach((item) => items.push({ type: "form", item }));
    return items;
  }
  toggleDark() {
    this.dark = !this.dark;
    try {
      localStorage.setItem("gestgo_bio_dark", this.dark ? "1" : "0");
    } catch {
    }
  }
  sharePage() {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        navigator.share({
          title: document.title,
          text: this.clinic?.short_description ?? this.clinic?.name ?? "",
          url: window.location.href
        }).catch(() => this.copyLinkFallback());
        return;
      }
    } catch {
    }
    this.copyLinkFallback();
  }
  copyLinkFallback() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => this.showCopiedFeedback());
    } else {
      const input = document.createElement("input");
      input.value = url;
      input.setAttribute("readonly", "");
      input.style.position = "absolute";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand("copy");
        this.showCopiedFeedback();
      } catch {
        window.alert("Link: " + url);
      }
      document.body.removeChild(input);
    }
  }
  currentYear() {
    return (/* @__PURE__ */ new Date()).getFullYear();
  }
  showCopiedFeedback() {
    const toast = document.createElement("div");
    toast.textContent = "Link copiado!";
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "24px",
      left: "50%",
      transform: "translateX(-50%) translateY(8px)",
      background: "#0b1628",
      color: "#ffffff",
      fontSize: "13px",
      fontWeight: "600",
      padding: "10px 22px",
      borderRadius: "999px",
      opacity: "0",
      transition: "opacity .2s, transform .2s",
      zIndex: "9999",
      whiteSpace: "nowrap"
    });
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(-50%) translateY(0)";
    });
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(8px)";
      setTimeout(() => toast.remove(), 220);
    }, 2400);
  }
  ngOnDestroy() {
    this.publicPageBody.leavePublicPage();
  }
  static \u0275fac = function LinkBioPublicComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LinkBioPublicComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LinkBioPublicComponent, selectors: [["app-link-bio-public"]], decls: 8, vars: 7, consts: [[1, "lb-bio-skeleton", 3, "lb-bio-skeleton--dark"], [1, "max-w-md", "mx-auto", "p-6", "text-center"], [1, "zm-content-enter"], [1, "lb-bio-skeleton"], [1, "max-w-md", "mx-auto", "p-6"], [3, "rows"], [1, "muted"], [3, "toggleDark", "share", "clinic", "allLinks", "publicSlug", "linkBioPreview", "dark"], [3, "toggleDark", "share", "model", "clinic", "bioLinks", "dark", "allDocs", "publicSlug", "linkBioPreview"], [3, "toggleDark", "share", "clinic", "bioLinks", "dark", "allDocs", "publicSlug", "linkBioPreview"]], template: function LinkBioPublicComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div");
      \u0275\u0275conditionalCreate(1, LinkBioPublicComponent_Conditional_1_Template, 3, 3, "div", 0);
      \u0275\u0275conditionalCreate(2, LinkBioPublicComponent_Conditional_2_Template, 3, 1, "div", 1);
      \u0275\u0275conditionalCreate(3, LinkBioPublicComponent_Conditional_3_Template, 2, 5, "div", 2);
      \u0275\u0275conditionalCreate(4, LinkBioPublicComponent_Conditional_4_Template, 2, 7, "div", 2);
      \u0275\u0275conditionalCreate(5, LinkBioPublicComponent_Conditional_5_Template, 2, 6, "div", 2);
      \u0275\u0275conditionalCreate(6, LinkBioPublicComponent_Conditional_6_Template, 2, 6, "div", 2);
      \u0275\u0275conditionalCreate(7, LinkBioPublicComponent_Conditional_7_Template, 2, 6, "div", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.showSkeleton() && ctx.erro && !ctx.data ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.showSkeleton() && ctx.data && ctx.clinic && ctx.model === 1 ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.showSkeleton() && ctx.data && ctx.clinic && ctx.model >= 2 && ctx.model <= 5 ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.showSkeleton() && ctx.data && ctx.clinic && ctx.model === 6 ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.showSkeleton() && ctx.data && ctx.clinic && ctx.model === 7 ? 6 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.showSkeleton() && ctx.data && ctx.clinic && ctx.model === 8 ? 7 : -1);
    }
  }, dependencies: [
    CommonModule,
    ZmSkeletonListComponent,
    LinkBioPublicLayoutGenericComponent,
    LinkBioPublicLayoutsComponent,
    LinkBioPublicLayoutVetComponent,
    LinkBioPublicLayoutPediaComponent,
    LinkBioPublicLayoutNutriComponent
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n*[_ngcontent-%COMP%], \n*[_ngcontent-%COMP%]::before, \n*[_ngcontent-%COMP%]::after {\n  box-sizing: border-box;\n}\n.lb-bio-skeleton[_ngcontent-%COMP%] {\n  min-height: min(72vh, 560px);\n  padding-top: 0.75rem;\n  --c-border: #e5e7eb;\n  --c-surface: #ffffff;\n  --c-soft: #f3f4f6;\n  --skeleton-base: #e2e8f0;\n  --skeleton-highlight: #f8fafc;\n}\n.lb-bio-skeleton.lb-bio-skeleton--dark[_ngcontent-%COMP%] {\n  --c-border: rgba(255, 255, 255, 0.1);\n  --c-surface: #13161c;\n  --c-soft: #0d1016;\n  --skeleton-base: #252b36;\n  --skeleton-highlight: #3d4654;\n}\n.muted[_ngcontent-%COMP%] {\n  color: #9ca3af;\n}\n/*# sourceMappingURL=link-bio-public.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LinkBioPublicComponent, [{
    type: Component,
    args: [{ selector: "app-link-bio-public", standalone: true, imports: [
      CommonModule,
      ZmSkeletonListComponent,
      LinkBioPublicLayoutGenericComponent,
      LinkBioPublicLayoutsComponent,
      LinkBioPublicLayoutVetComponent,
      LinkBioPublicLayoutPediaComponent,
      LinkBioPublicLayoutNutriComponent
    ], template: '<div>\n  @if (showSkeleton()) {\n    <div class="lb-bio-skeleton" [class.lb-bio-skeleton--dark]="dark">\n      <div class="max-w-md mx-auto p-6">\n        <zm-skeleton-list [rows]="6" />\n      </div>\n    </div>\n  }\n\n  @if (!showSkeleton() && erro && !data) {\n    <div class="max-w-md mx-auto p-6 text-center">\n      <p class="muted">{{ erro }}</p>\n    </div>\n  }\n\n  @if (!showSkeleton() && data && clinic && model === 1) {\n    <div class="zm-content-enter">\n      <app-link-bio-public-layout-generic\n        [clinic]="clinic"\n        [allLinks]="allLinks"\n        [publicSlug]="slug"\n        [linkBioPreview]="linkBioPreview"\n        [dark]="dark"\n        (toggleDark)="toggleDark()"\n        (share)="sharePage()"\n      />\n    </div>\n  }\n\n  @if (!showSkeleton() && data && clinic && model >= 2 && model <= 5) {\n    <div class="zm-content-enter">\n    <app-link-bio-public-layouts\n      [model]="layoutModelLegacy()"\n      [clinic]="clinic"\n      [bioLinks]="links"\n      [dark]="dark"\n      [allDocs]="allLinks"\n      [publicSlug]="slug"\n      [linkBioPreview]="linkBioPreview"\n      (toggleDark)="toggleDark()"\n      (share)="sharePage()"\n    />\n    </div>\n  }\n\n  @if (!showSkeleton() && data && clinic && model === 6) {\n    <div class="zm-content-enter">\n    <app-link-bio-public-layout-vet\n      [clinic]="clinic"\n      [bioLinks]="links"\n      [dark]="dark"\n      [allDocs]="allLinks"\n      [publicSlug]="slug"\n      [linkBioPreview]="linkBioPreview"\n      (toggleDark)="toggleDark()"\n      (share)="sharePage()"\n    />\n    </div>\n  }\n\n  @if (!showSkeleton() && data && clinic && model === 7) {\n    <div class="zm-content-enter">\n    <app-link-bio-public-layout-pedia\n      [clinic]="clinic"\n      [bioLinks]="links"\n      [dark]="dark"\n      [allDocs]="allLinks"\n      [publicSlug]="slug"\n      [linkBioPreview]="linkBioPreview"\n      (toggleDark)="toggleDark()"\n      (share)="sharePage()"\n    />\n    </div>\n  }\n\n  @if (!showSkeleton() && data && clinic && model === 8) {\n    <div class="zm-content-enter">\n    <app-link-bio-public-layout-nutri\n      [clinic]="clinic"\n      [bioLinks]="links"\n      [dark]="dark"\n      [allDocs]="allLinks"\n      [publicSlug]="slug"\n      [linkBioPreview]="linkBioPreview"\n      (toggleDark)="toggleDark()"\n      (share)="sharePage()"\n    />\n    </div>\n  }\n</div>\n', styles: ["/* src/app/paginas/link-bio-public/link-bio-public.component.css */\n:host {\n  display: block;\n}\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n.lb-bio-skeleton {\n  min-height: min(72vh, 560px);\n  padding-top: 0.75rem;\n  --c-border: #e5e7eb;\n  --c-surface: #ffffff;\n  --c-soft: #f3f4f6;\n  --skeleton-base: #e2e8f0;\n  --skeleton-highlight: #f8fafc;\n}\n.lb-bio-skeleton.lb-bio-skeleton--dark {\n  --c-border: rgba(255, 255, 255, 0.1);\n  --c-surface: #13161c;\n  --c-soft: #0d1016;\n  --skeleton-base: #252b36;\n  --skeleton-highlight: #3d4654;\n}\n.muted {\n  color: #9ca3af;\n}\n/*# sourceMappingURL=link-bio-public.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LinkBioPublicComponent, { className: "LinkBioPublicComponent", filePath: "src/app/paginas/link-bio-public/link-bio-public.component.ts", lineNumber: 38 });
})();
export {
  LinkBioPublicComponent
};
//# sourceMappingURL=chunk-BU225ZC5.js.map
