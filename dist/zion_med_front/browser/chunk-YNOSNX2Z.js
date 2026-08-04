import {
  ApiService
} from "./chunk-7WBHVE2H.js";
import {
  Injectable,
  Observable,
  inject,
  map,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-GRLISYEV.js";

// src/app/core/services/plataforma.service.ts
var PlataformaService = class _PlataformaService {
  api = inject(ApiService);
  getDashboard() {
    return this.api.get("/platform/dashboard");
  }
  getTenants() {
    return this.api.get("/platform/tenants");
  }
  getTenant(id) {
    return this.api.get(`/platform/tenants/${id}`);
  }
  getLeads() {
    return this.api.get("/platform/leads");
  }
  getSubscriptions() {
    return this.api.get("/platform/subscriptions").pipe(map((res) => ({
      data: (res.data ?? []).map((row) => {
        const org = row["organization"] ?? row["clinic"];
        return {
          id: row["id"],
          tenant_id: org?.tenant_id ?? 0,
          tenant_name: "",
          clinic_id: org?.id ?? 0,
          clinic_name: org?.name ?? "\u2014",
          plan_key: row["plan_key"] ?? org?.plan_key ?? null,
          subscription_status: org?.subscription_status ?? null,
          billing_status: org?.billing_status ?? null,
          current_period_end: row["current_period_end"]
        };
      })
    })));
  }
  getInvoices() {
    return this.api.get("/platform/invoices").pipe(map((res) => ({
      data: (res.data ?? []).map((row) => {
        const org = row["organization"] ?? row["clinic"];
        return {
          id: row["id"],
          tenant_id: org?.tenant_id,
          tenant_name: "",
          clinic_id: org?.id,
          clinic_name: org?.name ?? "\u2014",
          reference: row["asaas_payment_id"],
          amount: row["value"],
          currency: "BRL",
          status: row["status"],
          due_date: row["due_date"],
          paid_at: row["paid_at"],
          created_at: row["created_at"]
        };
      })
    })));
  }
  getPlans() {
    return this.api.get("/platform/plans");
  }
  getPlan(id) {
    return this.api.get("/platform/plans/" + id);
  }
  createPlan(payload) {
    return this.api.post("/platform/plans", payload);
  }
  updatePlan(id, payload) {
    return this.api.put("/platform/plans/" + id, payload);
  }
  deletePlan(id) {
    return this.api.delete("/platform/plans/" + id);
  }
  getSettings() {
    return this.api.get("/platform/settings");
  }
  updateSettings(payload) {
    return this.api.put("/platform/settings", payload);
  }
  updateStatus(payload) {
    return this.api.put("/platform/status", payload);
  }
  getPlatformLogs(page = 1) {
    return this.api.get("/platform/logs", { page });
  }
  /**
   * Monta a lista de assinaturas a partir dos tenants (fallback quando não existe GET /platform/subscriptions).
   */
  getSubscriptionsFromTenants() {
    return new Observable((observer) => {
      this.getTenants().subscribe({
        next: (tenantsRes) => {
          const tenants = tenantsRes.data ?? [];
          if (tenants.length === 0) {
            observer.next({ data: [] });
            observer.complete();
            return;
          }
          let pending = tenants.length;
          const items = [];
          tenants.forEach((t) => {
            this.getTenant(t.id).subscribe({
              next: (detailRes) => {
                const tenant = detailRes.data?.tenant;
                const clinics = detailRes.data?.clinics ?? [];
                clinics.forEach((c) => {
                  items.push({
                    tenant_id: t.id,
                    tenant_name: tenant?.name ?? t.name,
                    clinic_id: c.id,
                    clinic_name: c.name,
                    plan_key: c.plan_key ?? null,
                    subscription_status: c.subscription_status ?? null,
                    billing_status: c.billing_status ?? null,
                    current_period_end: null
                  });
                });
                pending--;
                if (pending === 0) {
                  observer.next({ data: items });
                  observer.complete();
                }
              },
              error: () => {
                pending--;
                if (pending === 0) {
                  observer.next({ data: items });
                  observer.complete();
                }
              }
            });
          });
        },
        error: (err) => observer.error(err)
      });
    });
  }
  static \u0275fac = function PlataformaService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlataformaService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PlataformaService, factory: _PlataformaService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlataformaService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  PlataformaService
};
//# sourceMappingURL=chunk-YNOSNX2Z.js.map
