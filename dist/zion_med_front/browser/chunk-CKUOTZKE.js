import {
  NotificacoesService
} from "./chunk-HY3FJGNT.js";
import {
  LoadingService,
  ZmSkeletonListComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-7WBHVE2H.js";
import {
  ConfirmDialogService
} from "./chunk-RISAXZFK.js";
import {
  ToastService
} from "./chunk-EZUVP6MG.js";
import {
  TooltipDirective
} from "./chunk-LVZEGAGU.js";
import "./chunk-IBJWGIJV.js";
import {
  Router,
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  __async,
  inject,
  setClassMetadata,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GRLISYEV.js";

// src/app/paginas/notificacoes/notificacoes.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function NotificacoesComponent_Conditional_1_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 3);
  }
}
function NotificacoesComponent_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 2);
    \u0275\u0275listener("click", function NotificacoesComponent_Conditional_1_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.marcarTodas());
    });
    \u0275\u0275conditionalCreate(1, NotificacoesComponent_Conditional_1_Conditional_0_Conditional_1_Template, 1, 0, "span", 3);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.marcandoTodas);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.marcandoTodas ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.marcandoTodas ? "Marcando\u2026" : "Marcar todas como lidas", " ");
  }
}
function NotificacoesComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NotificacoesComponent_Conditional_1_Conditional_0_Template, 3, 3, "button", 1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.temNaoLidas ? 0 : -1);
  }
}
function NotificacoesComponent_Conditional_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.quantidadeNaoLidas > 99 ? "99+" : ctx_r1.quantidadeNaoLidas);
  }
}
function NotificacoesComponent_Conditional_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 14);
  }
}
function NotificacoesComponent_Conditional_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function NotificacoesComponent_Conditional_2_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 14);
  }
}
function NotificacoesComponent_Conditional_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1, "delete");
    \u0275\u0275elementEnd();
  }
}
function NotificacoesComponent_Conditional_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 17);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 5);
  }
}
function NotificacoesComponent_Conditional_2_Conditional_22_Template(rf, ctx) {
}
function NotificacoesComponent_Conditional_2_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "p", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.erro);
  }
}
function NotificacoesComponent_Conditional_2_Conditional_24_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "p", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.filtroPlataforma === "nao_lidas" ? "Nenhuma notifica\xE7\xE3o n\xE3o lida." : "Nenhuma notifica\xE7\xE3o.");
  }
}
function NotificacoesComponent_Conditional_2_Conditional_24_Conditional_2_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 26);
  }
}
function NotificacoesComponent_Conditional_2_Conditional_24_Conditional_2_For_2_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function NotificacoesComponent_Conditional_2_Conditional_24_Conditional_2_For_2_Conditional_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const n_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.marcarComoLida(n_r6.id));
    });
    \u0275\u0275text(1, "Marcar como lida");
    \u0275\u0275elementEnd();
  }
}
function NotificacoesComponent_Conditional_2_Conditional_24_Conditional_2_For_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 39);
  }
}
function NotificacoesComponent_Conditional_2_Conditional_24_Conditional_2_For_2_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 14);
  }
}
function NotificacoesComponent_Conditional_2_Conditional_24_Conditional_2_For_2_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1, "close");
    \u0275\u0275elementEnd();
  }
}
function NotificacoesComponent_Conditional_2_Conditional_24_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 25);
    \u0275\u0275conditionalCreate(1, NotificacoesComponent_Conditional_2_Conditional_24_Conditional_2_For_2_Conditional_1_Template, 1, 0, "div", 26);
    \u0275\u0275elementStart(2, "div", 27)(3, "div", 28)(4, "span", 29);
    \u0275\u0275text(5, "description");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 30)(7, "p", 31);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 32);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 33)(12, "span", 34);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "a", 35);
    \u0275\u0275text(15, " Ver leads ");
    \u0275\u0275elementStart(16, "span", 36);
    \u0275\u0275text(17, "arrow_forward");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, NotificacoesComponent_Conditional_2_Conditional_24_Conditional_2_For_2_Conditional_18_Template, 2, 0, "button", 37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 38);
    \u0275\u0275conditionalCreate(20, NotificacoesComponent_Conditional_2_Conditional_24_Conditional_2_For_2_Conditional_20_Template, 1, 0, "span", 39);
    \u0275\u0275elementStart(21, "button", 40);
    \u0275\u0275listener("click", function NotificacoesComponent_Conditional_2_Conditional_24_Conditional_2_For_2_Template_button_click_21_listener() {
      const n_r6 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.excluir(n_r6.id));
    });
    \u0275\u0275conditionalCreate(22, NotificacoesComponent_Conditional_2_Conditional_24_Conditional_2_For_2_Conditional_22_Template, 1, 0, "span", 14)(23, NotificacoesComponent_Conditional_2_Conditional_24_Conditional_2_For_2_Conditional_23_Template, 2, 0, "span", 15);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const n_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("notif-card-nao-lida", !n_r6.read_at)("notif-card-com-bar", !n_r6.read_at);
    \u0275\u0275advance();
    \u0275\u0275conditional(!n_r6.read_at ? 1 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.getNotificacaoTitulo(n_r6));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getNotificacaoDetalhe(n_r6));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.tempoRelativo(n_r6.created_at));
    \u0275\u0275advance(5);
    \u0275\u0275conditional(!n_r6.read_at ? 18 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!n_r6.read_at ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.excluindoId === n_r6.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.excluindoId === n_r6.id ? 22 : 23);
  }
}
function NotificacoesComponent_Conditional_2_Conditional_24_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275repeaterCreate(1, NotificacoesComponent_Conditional_2_Conditional_24_Conditional_2_For_2_Template, 24, 12, "article", 24, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.notificacoesFiltradas);
  }
}
function NotificacoesComponent_Conditional_2_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275conditionalCreate(1, NotificacoesComponent_Conditional_2_Conditional_24_Conditional_1_Template, 3, 1, "div", 21)(2, NotificacoesComponent_Conditional_2_Conditional_24_Conditional_2_Template, 3, 0, "div", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.notificacoesFiltradas.length === 0 ? 1 : 2);
  }
}
function NotificacoesComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "div", 6)(3, "span", 7);
    \u0275\u0275text(4, "notifications");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "h2", 8);
    \u0275\u0275text(6, "Notifica\xE7\xF5es");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 9)(8, "button", 10);
    \u0275\u0275listener("click", function NotificacoesComponent_Conditional_2_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.filtroPlataforma = "todas");
    });
    \u0275\u0275text(9, " Todas ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 11);
    \u0275\u0275listener("click", function NotificacoesComponent_Conditional_2_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.filtroPlataforma = "nao_lidas");
    });
    \u0275\u0275text(11, " N\xE3o lidas ");
    \u0275\u0275conditionalCreate(12, NotificacoesComponent_Conditional_2_Conditional_12_Template, 2, 1, "span", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 13);
    \u0275\u0275listener("click", function NotificacoesComponent_Conditional_2_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.marcarTodas());
    });
    \u0275\u0275conditionalCreate(14, NotificacoesComponent_Conditional_2_Conditional_14_Template, 1, 0, "span", 14)(15, NotificacoesComponent_Conditional_2_Conditional_15_Template, 2, 0, "span", 15);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 16);
    \u0275\u0275listener("click", function NotificacoesComponent_Conditional_2_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.limparTudo());
    });
    \u0275\u0275conditionalCreate(18, NotificacoesComponent_Conditional_2_Conditional_18_Template, 1, 0, "span", 14)(19, NotificacoesComponent_Conditional_2_Conditional_19_Template, 2, 0, "span", 15);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(21, NotificacoesComponent_Conditional_2_Conditional_21_Template, 1, 1, "zm-skeleton-list", 17)(22, NotificacoesComponent_Conditional_2_Conditional_22_Template, 0, 0)(23, NotificacoesComponent_Conditional_2_Conditional_23_Template, 3, 1, "div", 18)(24, NotificacoesComponent_Conditional_2_Conditional_24_Template, 3, 1, "div", 19);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275classProp("ativo", ctx_r1.filtroPlataforma === "todas");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("ativo", ctx_r1.filtroPlataforma === "nao_lidas");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.quantidadeNaoLidas > 0 ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.marcandoTodas);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.marcandoTodas ? 14 : 15);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.marcandoTodas ? "Marcando\u2026" : "Marcar todas como lidas", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.limpandoTudo);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.limpandoTudo ? 18 : 19);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.limpandoTudo ? "Limpando\u2026" : "Limpar tudo", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showSkeleton() ? 21 : !ctx_r1.listaPronta ? 22 : ctx_r1.erro ? 23 : 24);
  }
}
function NotificacoesComponent_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 17);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 5);
  }
}
function NotificacoesComponent_Conditional_3_Conditional_1_Template(rf, ctx) {
}
function NotificacoesComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.erro);
  }
}
function NotificacoesComponent_Conditional_3_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275text(1, "Nenhuma notifica\xE7\xE3o.");
    \u0275\u0275elementEnd();
  }
}
function NotificacoesComponent_Conditional_3_Conditional_3_Conditional_3_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function NotificacoesComponent_Conditional_3_Conditional_3_Conditional_3_For_2_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const n_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.marcarComoLida(n_r9.id));
    });
    \u0275\u0275text(1, "Marcar lida");
    \u0275\u0275elementEnd();
  }
}
function NotificacoesComponent_Conditional_3_Conditional_3_Conditional_3_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 52);
  }
}
function NotificacoesComponent_Conditional_3_Conditional_3_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 47)(1, "div", 30)(2, "p", 20);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 48);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 49);
    \u0275\u0275conditionalCreate(7, NotificacoesComponent_Conditional_3_Conditional_3_Conditional_3_For_2_Conditional_7_Template, 2, 0, "button", 50);
    \u0275\u0275elementStart(8, "button", 51);
    \u0275\u0275listener("click", function NotificacoesComponent_Conditional_3_Conditional_3_Conditional_3_For_2_Template_button_click_8_listener() {
      const n_r9 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.excluir(n_r9.id));
    });
    \u0275\u0275conditionalCreate(9, NotificacoesComponent_Conditional_3_Conditional_3_Conditional_3_For_2_Conditional_9_Template, 1, 0, "span", 52);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const n_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("opacity-75", n_r9.read_at);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getNotificacaoMensagem(n_r9));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(n_r9.created_at);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!n_r9.read_at ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.excluindoId === n_r9.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.excluindoId === n_r9.id ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.excluindoId === n_r9.id ? "Excluindo\u2026" : "Excluir", " ");
  }
}
function NotificacoesComponent_Conditional_3_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 45);
    \u0275\u0275repeaterCreate(1, NotificacoesComponent_Conditional_3_Conditional_3_Conditional_3_For_2_Template, 11, 8, "li", 46, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.notificacoes);
  }
}
function NotificacoesComponent_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 43);
    \u0275\u0275conditionalCreate(2, NotificacoesComponent_Conditional_3_Conditional_3_Conditional_2_Template, 2, 0, "div", 44)(3, NotificacoesComponent_Conditional_3_Conditional_3_Conditional_3_Template, 3, 0, "ul", 45);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.notificacoes.length === 0 ? 2 : 3);
  }
}
function NotificacoesComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NotificacoesComponent_Conditional_3_Conditional_0_Template, 1, 1, "zm-skeleton-list", 17)(1, NotificacoesComponent_Conditional_3_Conditional_1_Template, 0, 0)(2, NotificacoesComponent_Conditional_3_Conditional_2_Template, 2, 1, "p", 42)(3, NotificacoesComponent_Conditional_3_Conditional_3_Template, 4, 1, "div", 19);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.showSkeleton() ? 0 : !ctx_r1.listaPronta ? 1 : ctx_r1.erro ? 2 : 3);
  }
}
var NotificacoesComponent = class _NotificacoesComponent {
  notificacoes = [];
  showSkeleton;
  listaPronta = false;
  erro = "";
  /** Filtro na área plataforma: todas ou só não lidas */
  filtroPlataforma = "todas";
  excluindoId = null;
  limpandoTudo = false;
  marcandoTodas = false;
  notifService = inject(NotificacoesService);
  loadingService = inject(LoadingService);
  router = inject(Router);
  toast = inject(ToastService);
  confirm = inject(ConfirmDialogService);
  /** True quando a página está dentro da área da plataforma (layout já mostra título e subtítulo). */
  get isPlataforma() {
    return this.router.url.includes("/plataforma");
  }
  /** Lista filtrada para a área plataforma (Todas ou Não lidas). */
  get notificacoesFiltradas() {
    if (this.filtroPlataforma === "nao_lidas") {
      return this.notificacoes.filter((n) => !n.read_at);
    }
    return this.notificacoes;
  }
  get quantidadeNaoLidas() {
    return this.notificacoes.filter((n) => !n.read_at).length;
  }
  ngOnInit() {
    this.carregar();
  }
  carregar() {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.notifService.list());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (list) => {
        this.listaPronta = true;
        this.notificacoes = list;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = "N\xE3o foi poss\xEDvel carregar as notifica\xE7\xF5es.";
      }
    });
  }
  marcarComoLida(id) {
    this.notifService.marcarComoLida(id).subscribe({
      next: () => this.carregar(),
      error: () => this.toast.error("Erro", "N\xE3o foi poss\xEDvel marcar como lida.")
    });
  }
  marcarTodas() {
    this.marcandoTodas = true;
    this.notifService.marcarTodasComoLidas().subscribe({
      next: () => {
        this.marcandoTodas = false;
        this.carregar();
        this.toast.success("Notifica\xE7\xF5es", "Todas foram marcadas como lidas.");
      },
      error: () => {
        this.marcandoTodas = false;
        this.toast.error("Erro", "N\xE3o foi poss\xEDvel marcar todas como lidas.");
      }
    });
  }
  excluir(id) {
    return __async(this, null, function* () {
      const ok = yield this.confirm.request({
        title: "Excluir notifica\xE7\xE3o?",
        message: "Esta notifica\xE7\xE3o ser\xE1 removida permanentemente.",
        confirmLabel: "Sim, excluir",
        variant: "danger"
      });
      if (!ok)
        return;
      this.excluindoId = id;
      this.notifService.delete(id).subscribe({
        next: () => {
          this.excluindoId = null;
          this.carregar();
          this.toast.success("Notifica\xE7\xE3o exclu\xEDda", "O item foi removido.");
        },
        error: () => {
          this.excluindoId = null;
          this.toast.error("Erro", "N\xE3o foi poss\xEDvel excluir.");
        }
      });
    });
  }
  limparTudo() {
    return __async(this, null, function* () {
      const ok = yield this.confirm.request({
        title: "Limpar todas as notifica\xE7\xF5es?",
        message: "Todas as notifica\xE7\xF5es ser\xE3o exclu\xEDdas. Esta a\xE7\xE3o n\xE3o pode ser desfeita.",
        confirmLabel: "Sim, limpar tudo",
        variant: "danger"
      });
      if (!ok)
        return;
      this.limpandoTudo = true;
      this.notifService.limparTudo().subscribe({
        next: () => {
          this.limpandoTudo = false;
          this.carregar();
          this.toast.success("Lista limpa", "Todas as notifica\xE7\xF5es foram removidas.");
        },
        error: () => {
          this.limpandoTudo = false;
          this.toast.error("Erro", "N\xE3o foi poss\xEDvel limpar as notifica\xE7\xF5es.");
        }
      });
    });
  }
  get temNaoLidas() {
    return this.notificacoes.some((n) => !n.read_at);
  }
  getNotificacaoMensagem(n) {
    const d = n.data;
    return d?.message ?? n.type ?? "Notifica\xE7\xE3o";
  }
  /** Título da notificação (ex.: "Novo lead na landing"). */
  getNotificacaoTitulo(n) {
    const d = this.normalizeData(n.data);
    if (typeof d === "string")
      return n.type ?? "Notifica\xE7\xE3o";
    const obj = d;
    const t = obj?.["title"] ?? obj?.["subject"];
    return typeof t === "string" && t.trim() ? t.trim() : n.type ?? "Notifica\xE7\xE3o";
  }
  /** Corpo/descrição da notificação (ex.: "Lucas Vieira (Clinica São Lucas) solicitou demonstração."). Compatível com body, message, detail, etc. do backend. */
  getNotificacaoDetalhe(n) {
    const d = this.normalizeData(n.data);
    if (typeof d === "string" && d.trim())
      return d.trim();
    if (!d || typeof d !== "object")
      return "";
    const obj = d;
    const bodyKeys = ["body", "message", "detail", "content", "description", "text", "subtitle"];
    for (const key of bodyKeys) {
      const val = obj[key];
      if (typeof val === "string" && val.trim())
        return val.trim();
    }
    return "";
  }
  /** Se data vier como string JSON (ex. Laravel), parseia. */
  normalizeData(data) {
    if (typeof data === "string") {
      const trimmed = data.trim();
      if (trimmed.startsWith("{") && trimmed.endsWith("}") || trimmed.startsWith("[") && trimmed.endsWith("]")) {
        try {
          return JSON.parse(trimmed);
        } catch {
          return data;
        }
      }
      return data;
    }
    return data;
  }
  /** Tempo relativo em pt-BR (ex.: "há 11 minutos"). */
  tempoRelativo(iso) {
    if (!iso)
      return "";
    try {
      const d = new Date(iso);
      const now = /* @__PURE__ */ new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffMin = Math.floor(diffMs / 6e4);
      const diffH = Math.floor(diffMin / 60);
      const diffD = Math.floor(diffH / 24);
      if (diffMin < 1)
        return "agora";
      if (diffMin < 60)
        return `h\xE1 ${diffMin} ${diffMin === 1 ? "minuto" : "minutos"}`;
      if (diffH < 24)
        return `h\xE1 ${diffH} ${diffH === 1 ? "hora" : "horas"}`;
      if (diffD < 7)
        return `h\xE1 ${diffD} ${diffD === 1 ? "dia" : "dias"}`;
      return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
    } catch {
      return iso;
    }
  }
  formatarData(iso) {
    if (!iso)
      return "\u2014";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch {
      return iso;
    }
  }
  static \u0275fac = function NotificacoesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NotificacoesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificacoesComponent, selectors: [["app-pagina-notificacoes"]], decls: 4, vars: 3, consts: [[1, "relative", "min-h-[200px]"], ["type", "button", "appTooltip", "Marcar todas as notifica\xE7\xF5es como lidas", 1, "btn-ghost", "btn-default-bg", "inline-flex", "items-center", "gap-2", 3, "disabled"], ["type", "button", "appTooltip", "Marcar todas as notifica\xE7\xF5es como lidas", 1, "btn-ghost", "btn-default-bg", "inline-flex", "items-center", "gap-2", 3, "click", "disabled"], ["aria-hidden", "true", 1, "btn-spinner"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "mb-4"], [1, "flex", "items-center", "gap-2"], [1, "w-9", "h-9", "rounded-lg", "flex", "items-center", "justify-center", 2, "background", "var(--c-soft)"], [1, "material-symbols-outlined", "text-lg", 2, "color", "var(--c-primary)"], [1, "text-base", "font-semibold", "m-0", 2, "color", "var(--c-text)"], [1, "flex", "flex-wrap", "items-center", "gap-2"], ["type", "button", "appTooltip", "Ver todas as notifica\xE7\xF5es", 1, "notif-filtro-btn", 3, "click"], ["type", "button", "appTooltip", "Ver apenas n\xE3o lidas", 1, "notif-filtro-btn", "notif-filtro-outline", 3, "click"], [1, "notif-badge"], ["type", "button", "appTooltip", "Marcar todas como lidas", 1, "notif-action-btn", "inline-flex", "items-center", "gap-2", 3, "click", "disabled"], [1, "btn-spinner", 2, "width", "14px", "height", "14px", "border-width", "2px"], [1, "material-symbols-outlined", 2, "font-size", "18px"], ["type", "button", "appTooltip", "Excluir todas as notifica\xE7\xF5es", 1, "notif-action-btn", "inline-flex", "items-center", "gap-2", 3, "click", "disabled"], [3, "rows"], [1, "card", "p-4", "rounded-xl", "mb-4", 2, "background", "rgba(239,68,68,0.08)", "border", "1px solid rgba(239,68,68,0.3)"], [1, "zm-content-enter"], [1, "text-sm", "m-0", 2, "color", "var(--c-text)"], [1, "notif-card", "rounded-xl", "p-6", "text-center", 2, "background", "var(--c-soft)"], [1, "flex", "flex-col", "gap-3"], [1, "text-sm", "m-0", 2, "color", "var(--c-muted)"], [1, "notif-card", "flex", "relative", 3, "notif-card-nao-lida", "notif-card-com-bar"], [1, "notif-card", "flex", "relative"], [1, "notif-card-bar", 2, "background", "var(--c-primary)"], [1, "notif-card-body", "flex", "gap-4", "p-4", "flex-1", "min-w-0"], [1, "w-10", "h-10", "rounded-lg", "flex", "items-center", "justify-center", "shrink-0", 2, "background", "color-mix(in srgb, var(--c-primary) 14%, transparent)"], [1, "material-symbols-outlined", 2, "color", "var(--c-primary)", "font-size", "22px"], [1, "min-w-0", "flex-1"], [1, "notif-card-titulo"], [1, "notif-card-detalhe", "notif-detalhe"], [1, "flex", "flex-wrap", "items-center", "gap-x-4", "gap-y-1", "mt-2"], [1, "text-xs", 2, "color", "var(--c-muted)"], ["routerLink", "/plataforma/leads", 1, "notif-link-leads"], [1, "material-symbols-outlined", "align-middle", 2, "font-size", "14px"], ["type", "button", 1, "notif-link-lida"], [1, "flex", "items-start", "gap-1", "shrink-0"], [1, "w-2", "h-2", "rounded-full", "block", "mt-1.5", "shrink-0", 2, "background", "var(--c-primary)"], ["type", "button", "aria-label", "Excluir", "appTooltip", "Excluir notifica\xE7\xE3o", 1, "notif-btn-close", "inline-flex", "items-center", "justify-center", 3, "click", "disabled"], ["type", "button", 1, "notif-link-lida", 3, "click"], [1, "text-sm", 2, "color", "var(--c-error, #dc2626)"], [1, "card", "rounded-xl", "overflow-hidden", 2, "border", "1px solid var(--c-border)"], [1, "p-8", "text-center", 2, "color", "var(--c-muted)"], [1, "divide-y", 2, "border-color", "var(--c-border)"], [1, "flex", "items-center", "justify-between", "gap-4", "px-5", "py-3", 3, "opacity-75"], [1, "flex", "items-center", "justify-between", "gap-4", "px-5", "py-3"], [1, "text-xs", "mt-0.5", "m-0", 2, "color", "var(--c-muted)"], [1, "flex", "items-center", "gap-2", "shrink-0"], ["type", "button", 1, "btn-ghost", "btn-default-bg", "text-sm"], ["type", "button", 1, "btn-ghost", "text-sm", "inline-flex", "items-center", "gap-2", 2, "color", "var(--c-muted)", 3, "click", "disabled"], [1, "btn-spinner", 2, "width", "12px", "height", "12px", "border-width", "2px"], ["type", "button", 1, "btn-ghost", "btn-default-bg", "text-sm", 3, "click"]], template: function NotificacoesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, NotificacoesComponent_Conditional_1_Template, 1, 1);
      \u0275\u0275conditionalCreate(2, NotificacoesComponent_Conditional_2_Template, 25, 12);
      \u0275\u0275conditionalCreate(3, NotificacoesComponent_Conditional_3_Template, 4, 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isPlataforma ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isPlataforma ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isPlataforma ? 3 : -1);
    }
  }, dependencies: [CommonModule, ZmSkeletonListComponent, RouterLink, TooltipDirective], styles: ["\n\n.notif-filtro-btn[_ngcontent-%COMP%] {\n  padding: 0.4rem 0.75rem;\n  border-radius: 0.5rem;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  border: 1px solid var(--c-border);\n  background: var(--c-surface);\n  color: var(--c-text);\n  cursor: pointer;\n  transition:\n    background,\n    border-color,\n    color 0.15s ease;\n  white-space: nowrap;\n}\n.notif-filtro-btn.ativo[_ngcontent-%COMP%] {\n  background: var(--c-primary);\n  border-color: var(--c-primary);\n  color: #fff;\n}\n.notif-filtro-outline[_ngcontent-%COMP%] {\n  position: relative;\n  padding-right: 2.25rem;\n}\n.notif-filtro-btn.ativo[_ngcontent-%COMP%]   .notif-badge[_ngcontent-%COMP%] {\n  background: #fff;\n  color: var(--c-primary);\n}\n.notif-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  right: 0.5rem;\n  transform: translateY(-50%);\n  min-width: 1.25rem;\n  height: 1.25rem;\n  padding: 0 0.35rem;\n  border-radius: 9999px;\n  background: var(--c-primary);\n  color: #fff;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.notif-action-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.4rem 0.75rem;\n  border-radius: 0.5rem;\n  font-size: 0.8125rem;\n  border: 1px solid var(--c-border);\n  background: var(--c-surface);\n  color: var(--c-text);\n  cursor: pointer;\n  transition: background 0.15s ease;\n  white-space: nowrap;\n}\n.notif-action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--c-soft);\n}\n.notif-card[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 1rem;\n}\n.notif-card-bar[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 4px;\n  border-radius: 1rem 0 0 1rem;\n}\n.notif-card-nao-lida[_ngcontent-%COMP%] {\n  background: var(--c-soft);\n}\n.notif-card-com-bar[_ngcontent-%COMP%]   .notif-card-body[_ngcontent-%COMP%] {\n  padding-left: 0.5rem;\n}\n.notif-card[_ngcontent-%COMP%] {\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n  border-radius: 1rem;\n  overflow: hidden;\n}\n.notif-card-titulo[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: #193D64;\n  margin: 0;\n  line-height: 1.35;\n}\n.notif-card-detalhe[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  font-weight: 400;\n  color: #30699A;\n  margin: 0.25rem 0 0 0;\n  line-height: 1.4;\n}\n.notif-detalhe[_ngcontent-%COMP%] {\n  min-height: 1.25rem;\n}\n.notif-link-leads[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: var(--c-primary);\n  text-decoration: underline;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.15rem;\n}\n.notif-link-leads[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.notif-link-lida[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  background: none;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  color: var(--c-muted);\n  text-decoration: none;\n}\n.notif-link-lida[_ngcontent-%COMP%]:hover {\n  color: var(--c-text);\n  text-decoration: underline;\n}\n.notif-btn-close[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--c-muted);\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n}\n.notif-btn-close[_ngcontent-%COMP%]:hover {\n  background: var(--c-soft);\n}\n/*# sourceMappingURL=notificacoes.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificacoesComponent, [{
    type: Component,
    args: [{ selector: "app-pagina-notificacoes", standalone: true, imports: [CommonModule, ZmSkeletonListComponent, RouterLink, TooltipDirective], template: `<div class="relative min-h-[200px]">\r
  @if (!isPlataforma) {\r
    <!-- <div class="page-header mb-6">\r
      <div class="page-title flex items-center gap-3">\r
        <div class="page-title-icon w-10 h-10 rounded-lg flex items-center justify-center" style="background: var(--c-soft)">\r
          <span class="material-symbols-outlined" style="color: var(--c-primary)">notifications</span>\r
        </div>\r
        <div>\r
          <h1 class="text-xl font-semibold m-0" style="color: var(--c-text)">Notifica\xE7\xF5es</h1>\r
          <p class="text-sm mt-1 mb-0" style="color: var(--c-muted)">Central de notifica\xE7\xF5es</p>\r
        </div>\r
      </div>\r
      @if (temNaoLidas) {\r
        <button type="button" class="btn-ghost btn-default-bg inline-flex items-center gap-2" [disabled]="marcandoTodas" (click)="marcarTodas()" appTooltip="Marcar todas as notifica\xE7\xF5es como lidas">\r
          @if (marcandoTodas) {\r
            <span class="btn-spinner" aria-hidden="true"></span>\r
          }\r
          {{ marcandoTodas ? 'Marcando\u2026' : 'Marcar todas como lidas' }}\r
        </button>\r
      }\r
    </div> -->\r
    @if (temNaoLidas) {\r
      <button type="button" class="btn-ghost btn-default-bg inline-flex items-center gap-2" [disabled]="marcandoTodas" (click)="marcarTodas()" appTooltip="Marcar todas as notifica\xE7\xF5es como lidas">\r
        @if (marcandoTodas) {\r
          <span class="btn-spinner" aria-hidden="true"></span>\r
        }\r
        {{ marcandoTodas ? 'Marcando\u2026' : 'Marcar todas como lidas' }}\r
      </button>\r
    }\r
  }\r
  @if (isPlataforma) {\r
    <!-- Cabe\xE7alho da se\xE7\xE3o + filtros e a\xE7\xF5es (igual ao backend) -->\r
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">\r
      <div class="flex items-center gap-2">\r
        <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background: var(--c-soft)">\r
          <span class="material-symbols-outlined text-lg" style="color: var(--c-primary)">notifications</span>\r
        </div>\r
        <h2 class="text-base font-semibold m-0" style="color: var(--c-text)">Notifica\xE7\xF5es</h2>\r
      </div>\r
      <div class="flex flex-wrap items-center gap-2">\r
        <button type="button" class="notif-filtro-btn" [class.ativo]="filtroPlataforma === 'todas'" (click)="filtroPlataforma = 'todas'" appTooltip="Ver todas as notifica\xE7\xF5es">\r
          Todas\r
        </button>\r
        <button type="button" class="notif-filtro-btn notif-filtro-outline" [class.ativo]="filtroPlataforma === 'nao_lidas'" (click)="filtroPlataforma = 'nao_lidas'" appTooltip="Ver apenas n\xE3o lidas">\r
          N\xE3o lidas\r
          @if (quantidadeNaoLidas > 0) {\r
            <span class="notif-badge">{{ quantidadeNaoLidas > 99 ? '99+' : quantidadeNaoLidas }}</span>\r
          }\r
        </button>\r
        <button type="button" class="notif-action-btn inline-flex items-center gap-2" [disabled]="marcandoTodas" (click)="marcarTodas()" appTooltip="Marcar todas como lidas">\r
          @if (marcandoTodas) {\r
            <span class="btn-spinner" style="width:14px;height:14px;border-width:2px"></span>\r
          } @else {\r
            <span class="material-symbols-outlined" style="font-size: 18px">check_circle</span>\r
          }\r
          {{ marcandoTodas ? 'Marcando\u2026' : 'Marcar todas como lidas' }}\r
        </button>\r
        <button type="button" class="notif-action-btn inline-flex items-center gap-2" [disabled]="limpandoTudo" (click)="limparTudo()" appTooltip="Excluir todas as notifica\xE7\xF5es">\r
          @if (limpandoTudo) {\r
            <span class="btn-spinner" style="width:14px;height:14px;border-width:2px"></span>\r
          } @else {\r
            <span class="material-symbols-outlined" style="font-size: 18px">delete</span>\r
          }\r
          {{ limpandoTudo ? 'Limpando\u2026' : 'Limpar tudo' }}\r
        </button>\r
      </div>\r
    </div>\r
\r
    @if (showSkeleton()) {\r
      <zm-skeleton-list [rows]="5" />\r
    } @else if (!listaPronta) {\r
    } @else if (erro) {\r
      <div class="card p-4 rounded-xl mb-4" style="background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3)">\r
        <p class="text-sm m-0" style="color: var(--c-text)">{{ erro }}</p>\r
      </div>\r
    } @else {\r
      <div class="zm-content-enter">\r
      @if (notificacoesFiltradas.length === 0) {\r
        <div class="notif-card rounded-xl p-6 text-center" style="background: var(--c-soft)">\r
          <p class="text-sm m-0" style="color: var(--c-muted)">{{ filtroPlataforma === 'nao_lidas' ? 'Nenhuma notifica\xE7\xE3o n\xE3o lida.' : 'Nenhuma notifica\xE7\xE3o.' }}</p>\r
        </div>\r
      } @else {\r
        <div class="flex flex-col gap-3">\r
          @for (n of notificacoesFiltradas; track n.id) {\r
            <article class="notif-card flex relative" [class.notif-card-nao-lida]="!n.read_at" [class.notif-card-com-bar]="!n.read_at">\r
              @if (!n.read_at) {\r
                <div class="notif-card-bar" style="background: var(--c-primary)"></div>\r
              }\r
              <div class="notif-card-body flex gap-4 p-4 flex-1 min-w-0">\r
                <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style="background: color-mix(in srgb, var(--c-primary) 14%, transparent)">\r
                  <span class="material-symbols-outlined" style="color: var(--c-primary); font-size: 22px">description</span>\r
                </div>\r
                <div class="min-w-0 flex-1">\r
                  <p class="notif-card-titulo">{{ getNotificacaoTitulo(n) }}</p>\r
                  <p class="notif-card-detalhe notif-detalhe">{{ getNotificacaoDetalhe(n) }}</p>\r
                  <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">\r
                    <span class="text-xs" style="color: var(--c-muted)">{{ tempoRelativo(n.created_at) }}</span>\r
                    <a routerLink="/plataforma/leads" class="notif-link-leads">\r
                      Ver leads\r
                      <span class="material-symbols-outlined align-middle" style="font-size: 14px">arrow_forward</span>\r
                    </a>\r
                    @if (!n.read_at) {\r
                      <button type="button" class="notif-link-lida" (click)="marcarComoLida(n.id)">Marcar como lida</button>\r
                    }\r
                  </div>\r
                </div>\r
                <div class="flex items-start gap-1 shrink-0">\r
                  @if (!n.read_at) {\r
                    <span class="w-2 h-2 rounded-full block mt-1.5 shrink-0" style="background: var(--c-primary)"></span>\r
                  }\r
                  <button type="button" class="notif-btn-close inline-flex items-center justify-center" [disabled]="excluindoId === n.id" (click)="excluir(n.id)" aria-label="Excluir" appTooltip="Excluir notifica\xE7\xE3o">\r
                    @if (excluindoId === n.id) {\r
                      <span class="btn-spinner" style="width:14px;height:14px;border-width:2px"></span>\r
                    } @else {\r
                      <span class="material-symbols-outlined" style="font-size: 18px">close</span>\r
                    }\r
                  </button>\r
                </div>\r
              </div>\r
            </article>\r
          }\r
        </div>\r
      }\r
      </div>\r
    }\r
  }\r
  @if (!isPlataforma) {\r
    @if (showSkeleton()) {\r
      <zm-skeleton-list [rows]="5" />\r
    } @else if (!listaPronta) {\r
    } @else if (erro) {\r
      <p class="text-sm" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
    } @else {\r
      <div class="zm-content-enter">\r
      <div class="card rounded-xl overflow-hidden" style="border: 1px solid var(--c-border)">\r
        @if (notificacoes.length === 0) {\r
          <div class="p-8 text-center" style="color: var(--c-muted)">Nenhuma notifica\xE7\xE3o.</div>\r
        } @else {\r
          <ul class="divide-y" style="border-color: var(--c-border)">\r
            @for (n of notificacoes; track n.id) {\r
              <li class="flex items-center justify-between gap-4 px-5 py-3" [class.opacity-75]="n.read_at">\r
                <div class="min-w-0 flex-1">\r
                  <p class="text-sm m-0" style="color: var(--c-text)">{{ getNotificacaoMensagem(n) }}</p>\r
                  <p class="text-xs mt-0.5 m-0" style="color: var(--c-muted)">{{ n.created_at }}</p>\r
                </div>\r
                <div class="flex items-center gap-2 shrink-0">\r
                  @if (!n.read_at) {\r
                    <button type="button" class="btn-ghost btn-default-bg text-sm" (click)="marcarComoLida(n.id)">Marcar lida</button>\r
                  }\r
                  <button type="button" class="btn-ghost text-sm inline-flex items-center gap-2" style="color: var(--c-muted)" [disabled]="excluindoId === n.id" (click)="excluir(n.id)">\r
                    @if (excluindoId === n.id) {\r
                      <span class="btn-spinner" style="width:12px;height:12px;border-width:2px"></span>\r
                    }\r
                    {{ excluindoId === n.id ? 'Excluindo\u2026' : 'Excluir' }}\r
                  </button>\r
                </div>\r
              </li>\r
            }\r
          </ul>\r
        }\r
      </div>\r
      </div>\r
    }\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/notificacoes/notificacoes.component.css */\n.notif-filtro-btn {\n  padding: 0.4rem 0.75rem;\n  border-radius: 0.5rem;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  border: 1px solid var(--c-border);\n  background: var(--c-surface);\n  color: var(--c-text);\n  cursor: pointer;\n  transition:\n    background,\n    border-color,\n    color 0.15s ease;\n  white-space: nowrap;\n}\n.notif-filtro-btn.ativo {\n  background: var(--c-primary);\n  border-color: var(--c-primary);\n  color: #fff;\n}\n.notif-filtro-outline {\n  position: relative;\n  padding-right: 2.25rem;\n}\n.notif-filtro-btn.ativo .notif-badge {\n  background: #fff;\n  color: var(--c-primary);\n}\n.notif-badge {\n  position: absolute;\n  top: 50%;\n  right: 0.5rem;\n  transform: translateY(-50%);\n  min-width: 1.25rem;\n  height: 1.25rem;\n  padding: 0 0.35rem;\n  border-radius: 9999px;\n  background: var(--c-primary);\n  color: #fff;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.notif-action-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.4rem 0.75rem;\n  border-radius: 0.5rem;\n  font-size: 0.8125rem;\n  border: 1px solid var(--c-border);\n  background: var(--c-surface);\n  color: var(--c-text);\n  cursor: pointer;\n  transition: background 0.15s ease;\n  white-space: nowrap;\n}\n.notif-action-btn:hover {\n  background: var(--c-soft);\n}\n.notif-card {\n  position: relative;\n  border-radius: 1rem;\n}\n.notif-card-bar {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 4px;\n  border-radius: 1rem 0 0 1rem;\n}\n.notif-card-nao-lida {\n  background: var(--c-soft);\n}\n.notif-card-com-bar .notif-card-body {\n  padding-left: 0.5rem;\n}\n.notif-card {\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n  border-radius: 1rem;\n  overflow: hidden;\n}\n.notif-card-titulo {\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: #193D64;\n  margin: 0;\n  line-height: 1.35;\n}\n.notif-card-detalhe {\n  font-size: 0.8125rem;\n  font-weight: 400;\n  color: #30699A;\n  margin: 0.25rem 0 0 0;\n  line-height: 1.4;\n}\n.notif-detalhe {\n  min-height: 1.25rem;\n}\n.notif-link-leads {\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: var(--c-primary);\n  text-decoration: underline;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.15rem;\n}\n.notif-link-leads:hover {\n  opacity: 0.9;\n}\n.notif-link-lida {\n  font-size: 0.75rem;\n  background: none;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  color: var(--c-muted);\n  text-decoration: none;\n}\n.notif-link-lida:hover {\n  color: var(--c-text);\n  text-decoration: underline;\n}\n.notif-btn-close {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--c-muted);\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n}\n.notif-btn-close:hover {\n  background: var(--c-soft);\n}\n/*# sourceMappingURL=notificacoes.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificacoesComponent, { className: "NotificacoesComponent", filePath: "src/app/paginas/notificacoes/notificacoes.component.ts", lineNumber: 18 });
})();
export {
  NotificacoesComponent
};
//# sourceMappingURL=chunk-CKUOTZKE.js.map
