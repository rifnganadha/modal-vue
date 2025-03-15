var ct = Object.defineProperty;
var ft = (e, t, n) => t in e ? ct(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var D = (e, t, n) => ft(e, typeof t != "symbol" ? t + "" : t, n);
import * as ke from "vue";
import { computed as $, provide as be, openBlock as x, createBlock as E, unref as p, mergeProps as k, createCommentVNode as N, ref as h, onUnmounted as G, onBeforeMount as mt, watch as S, createElementBlock as _, Fragment as Ee, renderSlot as O, h as R, readonly as pt, markRaw as Re, nextTick as K, inject as Ce, onBeforeUnmount as ue, onMounted as fe, useAttrs as je, defineComponent as A, Comment as vt, cloneVNode as gt, toRefs as Ue, getCurrentInstance as J, normalizeProps as yt, guardReactiveProps as ht, withCtx as w, reactive as _e, createVNode as B, watchEffect as q, effectScope as qe, Teleport as xt, toHandlerKey as wt, camelize as bt, normalizeStyle as Et, getCurrentScope as Ct, onScopeDispose as Ot, createElementVNode as j, normalizeClass as Y, Transition as Oe, resolveDynamicComponent as Ke, withModifiers as At, toValue as Mt } from "vue";
import { router as ee, usePage as Xe } from "@inertiajs/vue3";
import { mergeDataIntoQueryString as $t } from "@inertiajs/core";
import de from "axios";
const Q = {
  type: "modal",
  navigate: !1,
  modal: {
    closeButton: !0,
    closeExplicitly: !1,
    maxWidth: "2xl",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white rounded",
    position: "center"
  },
  slideover: {
    closeButton: !0,
    closeExplicitly: !1,
    maxWidth: "md",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white min-h-screen",
    position: "right"
  }
};
class Bt {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(Q));
  }
  put(t, n) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? Q.type,
        navigate: t.navigate ?? Q.navigate,
        modal: { ...Q.modal, ...t.modal ?? {} },
        slideover: { ...Q.slideover, ...t.slideover ?? {} }
      };
      return;
    }
    const o = t.split(".");
    let l = this.config;
    for (let a = 0; a < o.length - 1; a++)
      l = l[o[a]] = l[o[a]] || {};
    l[o[o.length - 1]] = n;
  }
  get(t) {
    if (typeof t > "u")
      return this.config;
    const n = t.split(".");
    let o = this.config;
    for (const l of n) {
      if (o[l] === void 0)
        return null;
      o = o[l];
    }
    return o;
  }
}
const me = new Bt(), ao = () => me.reset(), ro = (e, t) => me.put(e, t), Ae = (e) => me.get(e), z = (e, t) => me.get(e ? `slideover.${t}` : `modal.${t}`);
function St(e, t) {
  return e = typeof e == "string" ? new URL(e, window.location.origin) : e, t = typeof t == "string" ? new URL(t, window.location.origin) : t, `${e.origin}${e.pathname}` == `${t.origin}${t.pathname}`;
}
function xe(e = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${e}${crypto.randomUUID()}` : `${e}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function Dt(e, t) {
  return Array.isArray(e) ? e.filter((n) => !t.includes(n)) : Object.keys(e).reduce((n, o) => (t.includes(o) || (n[o] = e[o]), n), {});
}
function ze(e, t) {
  return Array.isArray(e) ? e.filter((n) => t.includes(n)) : t.reduce((n, o) => (o in e && (n[o] = e[o]), n), {});
}
function It(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, n) => (n in e && e[n] !== null && (t[n] = e[n]), t), {});
}
function Pt(e, t = 3, n = 10) {
  return new Promise((o, l) => {
    const a = e();
    if (a) {
      o(a);
      return;
    }
    let r = t * 1e3 / n;
    const s = setInterval(() => {
      const d = e();
      d && (clearInterval(s), o(d)), --r <= 0 && (clearInterval(s), l(new Error("Condition not met in time")));
    }, n);
  });
}
function ae(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, n) => n.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
const Ve = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(e) {
    const t = e, n = ne(), o = $(() => n.stack.value[t.index]);
    return be("modalContext", o), (l, a) => {
      var r;
      return (r = o.value) != null && r.component ? (x(), E(p(o).component, k({ key: 0 }, o.value.props, {
        onModalEvent: a[0] || (a[0] = (s, ...d) => o.value.emit(s, ...d))
      }), null, 16)) : N("", !0);
    };
  }
}, kt = {
  __name: "ModalRoot",
  setup(e) {
    const t = ne(), n = h(!1), o = h(null);
    G(ee.on("start", () => n.value = !0)), G(ee.on("finish", () => n.value = !1)), G(
      ee.on("navigate", (r) => {
        const s = r.detail.page.props._inertiaui_modal;
        if (!s) {
          o.value && t.closeAll();
          return;
        }
        o.value = s, t.setBaseUrl(s.baseUrl), t.pushFromResponseData(s, {}, () => {
          if (!s.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          !n.value && window.location.href !== s.baseUrl && ee.visit(s.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      })
    );
    const l = (r) => (t.stack.value.length && (r.headers["X-InertiaUI-Modal-Base-Url"] = t.getBaseUrl()), r);
    mt(() => {
      de.interceptors.request.use(l);
    }), G(() => {
      de.interceptors.request.eject(l);
    });
    const a = Xe();
    return S(
      () => {
        var r;
        return (r = a.props) == null ? void 0 : r._inertiaui_modal;
      },
      (r, s) => {
        var d;
        r && s && r.component === s.component && St(r.url, s.url) && ((d = t.stack.value[0]) == null || d.updateProps(r.props ?? {}));
      }
    ), (r, s) => (x(), _(Ee, null, [
      O(r.$slots, "default"),
      p(t).stack.value.length ? (x(), E(Ve, {
        key: 0,
        index: 0
      })) : N("", !0)
    ], 64));
  }
};
let pe = null;
const H = h({}), te = h(null), C = h([]), ce = h({}), Lt = (e) => {
  pe = e;
}, so = (e) => {
  e.resolveComponent && (pe = e.resolveComponent);
};
class Nt {
  constructor(t, n, o, l, a) {
    D(this, "getParentModal", () => {
      const t = this.index.value;
      return t < 1 ? null : C.value.slice(0, t).reverse().find((n) => n.isOpen);
    });
    D(this, "getChildModal", () => {
      const t = this.index.value;
      return t === C.value.length - 1 ? null : C.value.slice(t + 1).find((n) => n.isOpen);
    });
    D(this, "show", () => {
      const t = this.index.value;
      if (t > -1) {
        if (C.value[t].isOpen)
          return;
        C.value[t].isOpen = !0, C.value[t].shouldRender = !0;
      }
    });
    D(this, "close", () => {
      var n;
      const t = this.index.value;
      if (t > -1) {
        if (!C.value[t].isOpen)
          return;
        Object.keys(this.listeners).forEach((o) => {
          this.off(o);
        }), C.value[t].isOpen = !1, (n = this.onCloseCallback) == null || n.call(this), this.onCloseCallback = null;
      }
    });
    D(this, "setOpen", (t) => {
      t ? this.show() : this.close();
    });
    D(this, "afterLeave", () => {
      var n;
      const t = this.index.value;
      if (t > -1) {
        if (C.value[t].isOpen)
          return;
        C.value[t].shouldRender = !1, (n = this.afterLeaveCallback) == null || n.call(this), this.afterLeaveCallback = null;
      }
      t === 0 && (C.value = []);
    });
    D(this, "on", (t, n) => {
      t = ae(t), this.listeners[t] = this.listeners[t] ?? [], this.listeners[t].push(n);
    });
    D(this, "off", (t, n) => {
      var o;
      t = ae(t), n ? this.listeners[t] = ((o = this.listeners[t]) == null ? void 0 : o.filter((l) => l !== n)) ?? [] : delete this.listeners[t];
    });
    D(this, "emit", (t, ...n) => {
      var o;
      (o = this.listeners[ae(t)]) == null || o.forEach((l) => l(...n));
    });
    D(this, "registerEventListenersFromAttrs", (t) => {
      const n = [];
      return Object.keys(t).filter((o) => o.startsWith("on")).forEach((o) => {
        const l = ae(o).replace(/^on-/, "");
        this.on(l, t[o]), n.push(() => this.off(l, t[o]));
      }), () => n.forEach((o) => o());
    });
    D(this, "reload", ({ only: t = null, except: n = null, method: o = "get", data: l = null, params: a = null, headers: r = {} }) => {
      var d;
      let s = Object.keys(this.response.props);
      t && (s = ze(s, t)), n && (s = Dt(s, n)), (d = this.response) != null && d.url && de({
        url: this.response.url,
        method: o,
        data: l,
        params: a,
        headers: {
          ...r,
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": s.join(","),
          "X-InertiaUI-Modal": xe(),
          "X-InertiaUI-Modal-Use-Router": 0,
          "X-InertiaUI-Modal-Base-Url": te.value
        }
      }).then((c) => this.updateProps(c.data.props));
    });
    D(this, "updateProps", (t) => {
      Object.assign(this.props.value, t);
    });
    if (this.id = n.id ?? xe(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = t, this.props = h(n.props), this.response = n, this.config = o ?? {}, this.onCloseCallback = l, this.afterLeaveCallback = a, H.value[this.id]) {
      this.config = {
        ...this.config,
        ...H.value[this.id].config ?? {}
      };
      const r = H.value[this.id].onClose, s = H.value[this.id].onAfterLeave;
      r && (this.onCloseCallback = l ? () => {
        l(), r();
      } : r), s && (this.afterLeaveCallback = a ? () => {
        a(), s();
      } : s), delete H.value[this.id];
    }
    this.index = $(() => C.value.findIndex((r) => r.id === this.id)), this.onTopOfStack = $(() => {
      var s;
      return C.value.length < 2 ? !0 : ((s = C.value.map((d) => ({ id: d.id, shouldRender: d.shouldRender })).reverse().find((d) => d.shouldRender)) == null ? void 0 : s.id) === this.id;
    });
  }
}
function Ft(e, t) {
  ce.value[e] = { name: e, callback: t };
}
function Wt(e, t, n, o) {
  if (!ce.value[e])
    throw new Error(`The local modal "${e}" has not been registered.`);
  const l = Me(null, {}, t, n, o);
  return l.name = e, ce.value[e].callback(l), l;
}
function He(e, t = {}, n = null, o = null) {
  return pe(e.component).then((l) => Me(Re(l), e, t, n, o));
}
function Tt(e, t, n = {}, o = {}, l = {}, a = null, r = null, s = "brackets", d = !1) {
  const c = xe();
  return new Promise((f, u) => {
    if (e.startsWith("#")) {
      f(Wt(e.substring(1), l, a, r));
      return;
    }
    const [v, i] = $t(t, e || "", n, s);
    let m = d && C.value.length === 0;
    if (C.value.length === 0 && (te.value = typeof window < "u" ? window.location.href : ""), o = {
      ...o,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": Xe().version,
      "X-InertiaUI-Modal": c,
      "X-InertiaUI-Modal-Use-Router": m ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": te.value
    }, m)
      return H.value[c] = { config: l, onClose: a, onAfterLeave: r }, ee.visit(v, {
        method: t,
        data: i,
        headers: o,
        preserveScroll: !0,
        preserveState: !0,
        onError: u,
        onFinish: () => Pt(() => C.value[0]).then(f)
      });
    de({ url: v, method: t, data: i, headers: o }).then((g) => f(He(g.data, l, a, r))).catch(u);
  });
}
function Me(e, t, n, o, l) {
  const a = new Nt(e, t, n, o, l);
  return C.value.push(a), K(() => a.show()), a;
}
const Rt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], io = (e, t) => (t.resolveComponent && (pe = t.resolveComponent), () => R(kt, () => R(e, t)));
function ne() {
  return {
    setComponentResolver: Lt,
    getBaseUrl: () => te.value,
    setBaseUrl: (e) => te.value = e,
    stack: pt(C),
    push: Me,
    pushFromResponseData: He,
    closeAll: () => [...C.value].reverse().forEach((e) => e.close()),
    reset: () => C.value = [],
    visit: Tt,
    registerLocalModal: Ft,
    removeLocalModal: (e) => delete ce.value[e]
  };
}
const jt = /* @__PURE__ */ Object.assign({
  inheritAttrs: !1
}, {
  __name: "HeadlessModal",
  props: {
    name: {
      type: String,
      required: !1
    },
    // The slideover prop in on top because we need to know if it's a slideover
    // before we can determine the defaule value of other props
    slideover: {
      type: Boolean,
      default: null
    },
    closeButton: {
      type: Boolean,
      default: null
    },
    closeExplicitly: {
      type: Boolean,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    },
    paddingClasses: {
      type: [Boolean, String],
      default: null
    },
    panelClasses: {
      type: [Boolean, String],
      default: null
    },
    position: {
      type: String,
      default: null
    }
  },
  emits: ["modal-event", "focus", "blur", "close", "success"],
  setup(e, { expose: t, emit: n }) {
    const o = e, l = ne(), a = o.name ? h({}) : Ce("modalContext"), r = $(() => {
      var m;
      const i = ((m = a.value.config) == null ? void 0 : m.slideover) ?? o.slideover ?? Ae("type") === "slideover";
      return {
        slideover: i,
        closeButton: o.closeButton ?? z(i, "closeButton"),
        closeExplicitly: o.closeExplicitly ?? z(i, "closeExplicitly"),
        maxWidth: o.maxWidth ?? z(i, "maxWidth"),
        paddingClasses: o.paddingClasses ?? z(i, "paddingClasses"),
        panelClasses: o.panelClasses ?? z(i, "panelClasses"),
        position: o.position ?? z(i, "position"),
        ...a.value.config
      };
    });
    o.name && (l.registerLocalModal(o.name, function(i) {
      a.value = i, c();
    }), ue(() => {
      l.removeLocalModal(o.name);
    })), fe(() => {
      o.name || c();
    });
    const s = h(null);
    ue(() => {
      var i;
      return (i = s.value) == null ? void 0 : i.call(s);
    });
    const d = je();
    function c() {
      s.value = a.value.registerEventListenersFromAttrs(d);
    }
    const f = n;
    function u(i, ...m) {
      f("modal-event", i, ...m);
    }
    t({
      emit: u,
      afterLeave: () => {
        var i;
        return (i = a.value) == null ? void 0 : i.afterLeave();
      },
      close: () => {
        var i;
        return (i = a.value) == null ? void 0 : i.close();
      },
      reload: (...i) => {
        var m;
        return (m = a.value) == null ? void 0 : m.reload(...i);
      },
      setOpen: (...i) => {
        var m;
        return (m = a.value) == null ? void 0 : m.setOpen(...i);
      },
      getChildModal: () => {
        var i;
        return (i = a.value) == null ? void 0 : i.getChildModal();
      },
      getParentModal: () => {
        var i;
        return (i = a.value) == null ? void 0 : i.getParentModal();
      },
      get config() {
        var i;
        return (i = a.value) == null ? void 0 : i.config;
      },
      get id() {
        var i;
        return (i = a.value) == null ? void 0 : i.id;
      },
      get index() {
        var i;
        return (i = a.value) == null ? void 0 : i.index;
      },
      get isOpen() {
        var i;
        return (i = a.value) == null ? void 0 : i.isOpen;
      },
      get modalContext() {
        var i;
        return (i = a.value) == null ? void 0 : i.modalContext;
      },
      get onTopOfStack() {
        var i;
        return (i = a.value) == null ? void 0 : i.onTopOfStack;
      },
      get shouldRender() {
        var i;
        return (i = a.value) == null ? void 0 : i.shouldRender;
      }
    }), S(
      () => {
        var i;
        return (i = a.value) == null ? void 0 : i.onTopOfStack;
      },
      (i, m) => {
        i && !m ? f("focus") : !i && m && f("blur");
      }
    ), S(
      () => {
        var i;
        return (i = a.value) == null ? void 0 : i.isOpen;
      },
      (i) => {
        f(i ? "success" : "close");
      },
      { immediate: !0 }
    );
    const v = $(() => {
      var i;
      return (i = l.stack.value.find((m) => m.shouldRender && m.index > a.value.index)) == null ? void 0 : i.index;
    });
    return (i, m) => (x(), _(Ee, null, [
      p(a).shouldRender ? O(i.$slots, "default", {
        key: 0,
        id: p(a).id,
        afterLeave: p(a).afterLeave,
        close: p(a).close,
        config: r.value,
        emit: u,
        getChildModal: p(a).getChildModal,
        getParentModal: p(a).getParentModal,
        index: p(a).index,
        isOpen: p(a).isOpen,
        modalContext: p(a),
        onTopOfStack: p(a).onTopOfStack,
        reload: p(a).reload,
        setOpen: p(a).setOpen,
        shouldRender: p(a).shouldRender
      }) : N("", !0),
      v.value ? (x(), E(Ve, {
        key: 1,
        index: v.value
      }, null, 8, ["index"])) : N("", !0)
    ], 64));
  }
});
function $e(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, o = Symbol(n);
  return [(l) => {
    const a = Ce(o, l);
    if (a || a === null)
      return a;
    throw new Error(
      `Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(
        ", "
      )}` : `\`${e}\``}`
    );
  }, (l) => (be(o, l), l)];
}
function Ge(e, t, n) {
  const o = n.originalEvent.target, l = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && o.addEventListener(e, t, { once: !0 }), o.dispatchEvent(l);
}
function Ye(e) {
  return Ct() ? (Ot(e), !0) : !1;
}
function Ut(e) {
  let t = !1, n;
  const o = qe(!0);
  return (...l) => (t || (n = o.run(() => e(...l)), t = !0), n);
}
function _t(e) {
  let t = 0, n, o;
  const l = () => {
    t -= 1, o && t <= 0 && (o.stop(), n = void 0, o = void 0);
  };
  return (...a) => (t += 1, n || (o = qe(!0), n = o.run(() => e(...a))), Ye(l), n);
}
function Be(e) {
  return typeof e == "function" ? e() : p(e);
}
const X = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const qt = (e) => typeof e < "u", Kt = Object.prototype.toString, Xt = (e) => Kt.call(e) === "[object Object]", zt = () => {
}, Le = /* @__PURE__ */ Vt();
function Vt() {
  var e, t;
  return X && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Ht(e) {
  return J();
}
function Gt(e, t) {
  Ht() && ue(e, t);
}
function oe(e) {
  var t;
  const n = Be(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Se = X ? window : void 0;
function Je(...e) {
  let t, n, o, l;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, l] = e, t = Se) : [t, n, o, l] = e, !t)
    return zt;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const a = [], r = () => {
    a.forEach((f) => f()), a.length = 0;
  }, s = (f, u, v, i) => (f.addEventListener(u, v, i), () => f.removeEventListener(u, v, i)), d = S(
    () => [oe(t), Be(l)],
    ([f, u]) => {
      if (r(), !f)
        return;
      const v = Xt(u) ? { ...u } : u;
      a.push(
        ...n.flatMap((i) => o.map((m) => s(f, i, m, v)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    d(), r();
  };
  return Ye(c), c;
}
function Yt(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Jt(...e) {
  let t, n, o = {};
  e.length === 3 ? (t = e[0], n = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: l = Se,
    eventName: a = "keydown",
    passive: r = !1,
    dedupe: s = !1
  } = o, d = Yt(t);
  return Je(l, a, (c) => {
    c.repeat && Be(s) || d(c) && n(c);
  }, r);
}
function Zt() {
  const e = h(!1), t = J();
  return t && fe(() => {
    e.value = !0;
  }, t), e;
}
function Qt(e) {
  return JSON.parse(JSON.stringify(e));
}
function en(e, t, n, o = {}) {
  var l, a, r;
  const {
    clone: s = !1,
    passive: d = !1,
    eventName: c,
    deep: f = !1,
    defaultValue: u,
    shouldEmit: v
  } = o, i = J(), m = n || (i == null ? void 0 : i.emit) || ((l = i == null ? void 0 : i.$emit) == null ? void 0 : l.bind(i)) || ((r = (a = i == null ? void 0 : i.proxy) == null ? void 0 : a.$emit) == null ? void 0 : r.bind(i == null ? void 0 : i.proxy));
  let g = c;
  g = g || `update:${t.toString()}`;
  const y = (M) => s ? typeof s == "function" ? s(M) : Qt(M) : M, b = () => qt(e[t]) ? y(e[t]) : u, I = (M) => {
    v ? v(M) && m(g, M) : m(g, M);
  };
  if (d) {
    const M = b(), F = h(M);
    let P = !1;
    return S(
      () => e[t],
      (le) => {
        P || (P = !0, F.value = y(le), K(() => P = !1));
      }
    ), S(
      F,
      (le) => {
        !P && (le !== e[t] || f) && I(le);
      },
      { deep: f }
    ), F;
  } else
    return $({
      get() {
        return b();
      },
      set(M) {
        I(M);
      }
    });
}
function De(e) {
  return e ? e.flatMap((t) => t.type === Ee ? De(t.children) : [t]) : [];
}
function ve(e) {
  if (e === null || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function we(e, t, n = ".", o) {
  if (!ve(t))
    return we(e, {}, n);
  const l = Object.assign({}, t);
  for (const a in e) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const r = e[a];
    r != null && (Array.isArray(r) && Array.isArray(l[a]) ? l[a] = [...r, ...l[a]] : ve(r) && ve(l[a]) ? l[a] = we(
      r,
      l[a],
      (n ? `${n}.` : "") + a.toString()
    ) : l[a] = r);
  }
  return l;
}
function tn(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, o) => we(n, o, ""), {})
  );
}
const nn = tn(), [Ze, uo] = $e("ConfigProvider");
let on = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", ln = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += on[Math.random() * 64 | 0];
  return t;
};
const an = _t(() => {
  const e = h(/* @__PURE__ */ new Map()), t = h(), n = $(() => {
    for (const r of e.value.values())
      if (r)
        return !0;
    return !1;
  }), o = Ze({
    scrollBody: h(!0)
  });
  let l = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", Le && (l == null || l()), t.value = void 0;
  };
  return S(n, (r, s) => {
    var d;
    if (!X)
      return;
    if (!r) {
      s && a();
      return;
    }
    t.value === void 0 && (t.value = document.body.style.overflow);
    const c = window.innerWidth - document.documentElement.clientWidth, f = { padding: c, margin: 0 }, u = (d = o.scrollBody) != null && d.value ? typeof o.scrollBody.value == "object" ? nn({
      padding: o.scrollBody.value.padding === !0 ? c : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? c : o.scrollBody.value.margin
    }, f) : f : { padding: 0, margin: 0 };
    c > 0 && (document.body.style.paddingRight = typeof u.padding == "number" ? `${u.padding}px` : String(u.padding), document.body.style.marginRight = typeof u.margin == "number" ? `${u.margin}px` : String(u.margin), document.body.style.setProperty("--scrollbar-width", `${c}px`), document.body.style.overflow = "hidden"), Le && (l = Je(
      document,
      "touchmove",
      (v) => sn(v),
      { passive: !1 }
    )), K(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), e;
});
function rn(e) {
  const t = ln(6), n = an();
  n.value.set(t, e);
  const o = $({
    get: () => n.value.get(t) ?? !1,
    set: (l) => n.value.set(t, l)
  });
  return Gt(() => {
    n.value.delete(t);
  }), o;
}
function Qe(e) {
  const t = window.getComputedStyle(e);
  if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight)
    return !0;
  {
    const n = e.parentNode;
    return !n || n.tagName === "BODY" ? !1 : Qe(n);
  }
}
function sn(e) {
  const t = e || window.event, n = t.target;
  return n instanceof Element && Qe(n) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
function Ie(e) {
  const t = J(), n = t == null ? void 0 : t.type.emits, o = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${t == null ? void 0 : t.type.__name}`
  ), n == null || n.forEach((l) => {
    o[wt(bt(l))] = (...a) => e(l, ...a);
  }), o;
}
function L() {
  const e = J(), t = h(), n = $(() => {
    var r, s;
    return ["#text", "#comment"].includes((r = t.value) == null ? void 0 : r.$el.nodeName) ? (s = t.value) == null ? void 0 : s.$el.nextElementSibling : oe(t);
  }), o = Object.assign({}, e.exposed), l = {};
  for (const r in e.props)
    Object.defineProperty(l, r, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[r]
    });
  if (Object.keys(o).length > 0)
    for (const r in o)
      Object.defineProperty(l, r, {
        enumerable: !0,
        configurable: !0,
        get: () => o[r]
      });
  Object.defineProperty(l, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => e.vnode.el
  }), e.exposed = l;
  function a(r) {
    t.value = r, !(r instanceof Element || !r) && (Object.defineProperty(l, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => r.$el
    }), e.exposed = l);
  }
  return { forwardRef: a, currentRef: t, currentElement: n };
}
var un = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, V = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap(), se = {}, ge = 0, et = function(e) {
  return e && (e.host || et(e.parentNode));
}, dn = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = et(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, cn = function(e, t, n, o) {
  var l = dn(t, Array.isArray(e) ? e : [e]);
  se[n] || (se[n] = /* @__PURE__ */ new WeakMap());
  var a = se[n], r = [], s = /* @__PURE__ */ new Set(), d = new Set(l), c = function(u) {
    !u || s.has(u) || (s.add(u), c(u.parentNode));
  };
  l.forEach(c);
  var f = function(u) {
    !u || d.has(u) || Array.prototype.forEach.call(u.children, function(v) {
      if (s.has(v))
        f(v);
      else
        try {
          var i = v.getAttribute(o), m = i !== null && i !== "false", g = (V.get(v) || 0) + 1, y = (a.get(v) || 0) + 1;
          V.set(v, g), a.set(v, y), r.push(v), g === 1 && m && re.set(v, !0), y === 1 && v.setAttribute(n, "true"), m || v.setAttribute(o, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", v, b);
        }
    });
  };
  return f(t), s.clear(), ge++, function() {
    r.forEach(function(u) {
      var v = V.get(u) - 1, i = a.get(u) - 1;
      V.set(u, v), a.set(u, i), v || (re.has(u) || u.removeAttribute(o), re.delete(u)), i || u.removeAttribute(n);
    }), ge--, ge || (V = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap(), se = {});
  };
}, fn = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), l = un(e);
  return l ? (o.push.apply(o, Array.from(l.querySelectorAll("[aria-live]"))), cn(o, l, n, "aria-hidden")) : function() {
    return null;
  };
};
function mn(e) {
  let t;
  S(() => oe(e), (n) => {
    n ? t = fn(n) : t && t();
  }), G(() => {
    t && t();
  });
}
let pn = 0;
function Ne(e, t = "radix") {
  const n = Ze({ useId: void 0 });
  return ke.useId ? `${t}-${ke.useId()}` : n.useId ? `${t}-${n.useId()}` : `${t}-${++pn}`;
}
function vn(e, t) {
  const n = h(e);
  function o(l) {
    return t[n.value][l] ?? n.value;
  }
  return {
    state: n,
    dispatch: (l) => {
      n.value = o(l);
    }
  };
}
const Pe = A({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var o, l;
      if (!n.default)
        return null;
      const a = De(n.default()), r = a.findIndex((f) => f.type !== vt);
      if (r === -1)
        return a;
      const s = a[r];
      (o = s.props) == null || delete o.ref;
      const d = s.props ? k(t, s.props) : t;
      t.class && (l = s.props) != null && l.class && delete s.props.class;
      const c = gt(s, d);
      for (const f in d)
        f.startsWith("on") && (c.props || (c.props = {}), c.props[f] = d[f]);
      return a.length === 1 ? c : (a[r] = c, a);
    };
  }
}), Z = A({
  name: "Primitive",
  inheritAttrs: !1,
  props: {
    asChild: {
      type: Boolean,
      default: !1
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(e, { attrs: t, slots: n }) {
    const o = e.asChild ? "template" : e.as;
    return typeof o == "string" && ["area", "img", "input"].includes(o) ? () => R(o, t) : o !== "template" ? () => R(e.as, t, { default: n.default }) : () => R(Pe, t, { default: n.default });
  }
});
function tt() {
  const e = h(), t = $(() => {
    var n, o;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (o = e.value) == null ? void 0 : o.$el.nextElementSibling : oe(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function gn(e, t) {
  var n;
  const o = h({}), l = h("none"), a = h(e), r = e.value ? "mounted" : "unmounted";
  let s;
  const d = ((n = t.value) == null ? void 0 : n.ownerDocument.defaultView) ?? Se, { state: c, dispatch: f } = vn(r, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  }), u = (y) => {
    var b;
    if (X) {
      const I = new CustomEvent(y, { bubbles: !1, cancelable: !1 });
      (b = t.value) == null || b.dispatchEvent(I);
    }
  };
  S(
    e,
    async (y, b) => {
      var I;
      const M = b !== y;
      if (await K(), M) {
        const F = l.value, P = ie(t.value);
        y ? (f("MOUNT"), u("enter"), P === "none" && u("after-enter")) : P === "none" || ((I = o.value) == null ? void 0 : I.display) === "none" ? (f("UNMOUNT"), u("leave"), u("after-leave")) : b && F !== P ? (f("ANIMATION_OUT"), u("leave")) : (f("UNMOUNT"), u("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const v = (y) => {
    const b = ie(t.value), I = b.includes(
      y.animationName
    ), M = c.value === "mounted" ? "enter" : "leave";
    if (y.target === t.value && I && (u(`after-${M}`), f("ANIMATION_END"), !a.value)) {
      const F = t.value.style.animationFillMode;
      t.value.style.animationFillMode = "forwards", s = d == null ? void 0 : d.setTimeout(() => {
        var P;
        ((P = t.value) == null ? void 0 : P.style.animationFillMode) === "forwards" && (t.value.style.animationFillMode = F);
      });
    }
    y.target === t.value && b === "none" && f("ANIMATION_END");
  }, i = (y) => {
    y.target === t.value && (l.value = ie(t.value));
  }, m = S(
    t,
    (y, b) => {
      y ? (o.value = getComputedStyle(y), y.addEventListener("animationstart", i), y.addEventListener("animationcancel", v), y.addEventListener("animationend", v)) : (f("ANIMATION_END"), d == null || d.clearTimeout(s), b == null || b.removeEventListener("animationstart", i), b == null || b.removeEventListener("animationcancel", v), b == null || b.removeEventListener("animationend", v));
    },
    { immediate: !0 }
  ), g = S(c, () => {
    const y = ie(t.value);
    l.value = c.value === "mounted" ? y : "none";
  });
  return G(() => {
    m(), g();
  }), {
    isPresent: $(
      () => ["mounted", "unmountSuspended"].includes(c.value)
    )
  };
}
function ie(e) {
  return e && getComputedStyle(e).animationName || "none";
}
const nt = A({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: !0
    },
    forceMount: {
      type: Boolean
    }
  },
  slots: {},
  setup(e, { slots: t, expose: n }) {
    var o;
    const { present: l, forceMount: a } = Ue(e), r = h(), { isPresent: s } = gn(l, r);
    n({ present: s });
    let d = t.default({ present: s });
    d = De(d || []);
    const c = J();
    if (d && (d == null ? void 0 : d.length) > 1) {
      const f = (o = c == null ? void 0 : c.parent) != null && o.type.name ? `<${c.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${f}\` for  \`Presence\` component.`,
          "",
          "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
          "You can apply a few solutions:",
          [
            "Provide a single child element so that `presence` directive attach correctly.",
            "Ensure the first child is an actual element instead of a raw text node or comment node."
          ].map((u) => `  - ${u}`).join(`
`)
        ].join(`
`)
      );
    }
    return () => a.value || l.value || s.value ? R(t.default({ present: s })[0], {
      ref: (f) => {
        const u = oe(f);
        return typeof (u == null ? void 0 : u.hasAttribute) > "u" || (u != null && u.hasAttribute("data-radix-popper-content-wrapper") ? r.value = u.firstElementChild : r.value = u), u;
      }
    }) : null;
  }
}), [U, yn] = $e("DialogRoot"), hn = /* @__PURE__ */ A({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    modal: { type: Boolean, default: !0 }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, o = en(n, "open", t, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), l = h(), a = h(), { modal: r } = Ue(n);
    return yn({
      open: o,
      modal: r,
      openModal: () => {
        o.value = !0;
      },
      onOpenChange: (s) => {
        o.value = s;
      },
      onOpenToggle: () => {
        o.value = !o.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement: l,
      contentElement: a
    }), (s, d) => O(s.$slots, "default", { open: p(o) });
  }
}), xn = /* @__PURE__ */ A({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Zt();
    return (n, o) => p(t) || n.forceMount ? (x(), E(xt, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      O(n.$slots, "default")
    ], 8, ["to", "disabled"])) : N("", !0);
  }
}), wn = /* @__PURE__ */ A({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (x(), E(p(xn), yt(ht(t)), {
      default: w(() => [
        O(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), bn = "dismissableLayer.pointerDownOutside", En = "dismissableLayer.focusOutside";
function ot(e, t) {
  const n = t.closest(
    "[data-dismissable-layer]"
  ), o = e.dataset.dismissableLayer === "" ? e : e.querySelector(
    "[data-dismissable-layer]"
  ), l = Array.from(
    e.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(n && o === n || l.indexOf(o) < l.indexOf(n));
}
function Cn(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = h(!1), a = h(() => {
  });
  return q((r) => {
    if (!X)
      return;
    const s = async (c) => {
      const f = c.target;
      if (t != null && t.value) {
        if (ot(t.value, f)) {
          l.value = !1;
          return;
        }
        if (c.target && !l.value) {
          let u = function() {
            Ge(
              bn,
              e,
              v
            );
          };
          const v = { originalEvent: c };
          c.pointerType === "touch" ? (o.removeEventListener("click", a.value), a.value = u, o.addEventListener("click", a.value, {
            once: !0
          })) : u();
        } else
          o.removeEventListener("click", a.value);
        l.value = !1;
      }
    }, d = window.setTimeout(() => {
      o.addEventListener("pointerdown", s);
    }, 0);
    r(() => {
      window.clearTimeout(d), o.removeEventListener("pointerdown", s), o.removeEventListener("click", a.value);
    });
  }), {
    onPointerDownCapture: () => l.value = !0
  };
}
function On(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = h(!1);
  return q((a) => {
    if (!X)
      return;
    const r = async (s) => {
      t != null && t.value && (await K(), !(!t.value || ot(t.value, s.target)) && s.target && !l.value && Ge(
        En,
        e,
        { originalEvent: s }
      ));
    };
    o.addEventListener("focusin", r), a(() => o.removeEventListener("focusin", r));
  }), {
    onFocusCapture: () => l.value = !0,
    onBlurCapture: () => l.value = !1
  };
}
const W = _e({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), An = /* @__PURE__ */ A({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(e, { emit: t }) {
    const n = e, o = t, { forwardRef: l, currentElement: a } = L(), r = $(
      () => {
        var m;
        return ((m = a.value) == null ? void 0 : m.ownerDocument) ?? globalThis.document;
      }
    ), s = $(() => W.layersRoot), d = $(() => a.value ? Array.from(s.value).indexOf(a.value) : -1), c = $(() => W.layersWithOutsidePointerEventsDisabled.size > 0), f = $(() => {
      const m = Array.from(s.value), [g] = [...W.layersWithOutsidePointerEventsDisabled].slice(-1), y = m.indexOf(g);
      return d.value >= y;
    }), u = Cn(async (m) => {
      const g = [...W.branches].some(
        (y) => y == null ? void 0 : y.contains(m.target)
      );
      !f.value || g || (o("pointerDownOutside", m), o("interactOutside", m), await K(), m.defaultPrevented || o("dismiss"));
    }, a), v = On((m) => {
      [...W.branches].some(
        (g) => g == null ? void 0 : g.contains(m.target)
      ) || (o("focusOutside", m), o("interactOutside", m), m.defaultPrevented || o("dismiss"));
    }, a);
    Jt("Escape", (m) => {
      d.value === s.value.size - 1 && (o("escapeKeyDown", m), m.defaultPrevented || o("dismiss"));
    });
    let i;
    return q((m) => {
      a.value && (n.disableOutsidePointerEvents && (W.layersWithOutsidePointerEventsDisabled.size === 0 && (i = r.value.body.style.pointerEvents, r.value.body.style.pointerEvents = "none"), W.layersWithOutsidePointerEventsDisabled.add(a.value)), s.value.add(a.value), m(() => {
        n.disableOutsidePointerEvents && W.layersWithOutsidePointerEventsDisabled.size === 1 && (r.value.body.style.pointerEvents = i);
      }));
    }), q((m) => {
      m(() => {
        a.value && (s.value.delete(a.value), W.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (m, g) => (x(), E(p(Z), {
      ref: p(l),
      "as-child": m.asChild,
      as: m.as,
      "data-dismissable-layer": "",
      style: Et({
        pointerEvents: c.value ? f.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: p(v).onFocusCapture,
      onBlurCapture: p(v).onBlurCapture,
      onPointerdownCapture: p(u).onPointerDownCapture
    }, {
      default: w(() => [
        O(m.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), ye = "focusScope.autoFocusOnMount", he = "focusScope.autoFocusOnUnmount", Fe = { bubbles: !1, cancelable: !0 };
function Mn(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (T(o, { select: t }), document.activeElement !== n)
      return !0;
}
function $n(e) {
  const t = lt(e), n = We(t, e), o = We(t.reverse(), e);
  return [n, o];
}
function lt(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const l = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || l ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function We(e, t) {
  for (const n of e)
    if (!Bn(n, { upTo: t }))
      return n;
}
function Bn(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  for (; e; ) {
    if (t !== void 0 && e === t)
      return !1;
    if (getComputedStyle(e).display === "none")
      return !0;
    e = e.parentElement;
  }
  return !1;
}
function Sn(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function T(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Sn(e) && t && e.select();
  }
}
const Dn = Ut(() => h([]));
function In() {
  const e = Dn();
  return {
    add(t) {
      const n = e.value[0];
      t !== n && (n == null || n.pause()), e.value = Te(e.value, t), e.value.unshift(t);
    },
    remove(t) {
      var n;
      e.value = Te(e.value, t), (n = e.value[0]) == null || n.resume();
    }
  };
}
function Te(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function Pn(e) {
  return e.filter((t) => t.tagName !== "A");
}
const kn = /* @__PURE__ */ A({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, { currentRef: l, currentElement: a } = L(), r = h(null), s = In(), d = _e({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    q((f) => {
      if (!X)
        return;
      const u = a.value;
      if (!n.trapped)
        return;
      function v(y) {
        if (d.paused || !u)
          return;
        const b = y.target;
        u.contains(b) ? r.value = b : T(r.value, { select: !0 });
      }
      function i(y) {
        if (d.paused || !u)
          return;
        const b = y.relatedTarget;
        b !== null && (u.contains(b) || T(r.value, { select: !0 }));
      }
      function m(y) {
        u.contains(r.value) || T(u);
      }
      document.addEventListener("focusin", v), document.addEventListener("focusout", i);
      const g = new MutationObserver(m);
      u && g.observe(u, { childList: !0, subtree: !0 }), f(() => {
        document.removeEventListener("focusin", v), document.removeEventListener("focusout", i), g.disconnect();
      });
    }), q(async (f) => {
      const u = a.value;
      if (await K(), !u)
        return;
      s.add(d);
      const v = document.activeElement;
      if (!u.contains(v)) {
        const i = new CustomEvent(ye, Fe);
        u.addEventListener(ye, (m) => o("mountAutoFocus", m)), u.dispatchEvent(i), i.defaultPrevented || (Mn(Pn(lt(u)), {
          select: !0
        }), document.activeElement === v && T(u));
      }
      f(() => {
        u.removeEventListener(ye, (g) => o("mountAutoFocus", g));
        const i = new CustomEvent(he, Fe), m = (g) => {
          o("unmountAutoFocus", g);
        };
        u.addEventListener(he, m), u.dispatchEvent(i), setTimeout(() => {
          i.defaultPrevented || T(v ?? document.body, { select: !0 }), u.removeEventListener(he, m), s.remove(d);
        }, 0);
      });
    });
    function c(f) {
      if (!n.loop && !n.trapped || d.paused)
        return;
      const u = f.key === "Tab" && !f.altKey && !f.ctrlKey && !f.metaKey, v = document.activeElement;
      if (u && v) {
        const i = f.currentTarget, [m, g] = $n(i);
        m && g ? !f.shiftKey && v === g ? (f.preventDefault(), n.loop && T(m, { select: !0 })) : f.shiftKey && v === m && (f.preventDefault(), n.loop && T(g, { select: !0 })) : v === i && f.preventDefault();
      }
    }
    return (f, u) => (x(), E(p(Z), {
      ref_key: "currentRef",
      ref: l,
      tabindex: "-1",
      "as-child": f.asChild,
      as: f.as,
      onKeydown: c
    }, {
      default: w(() => [
        O(f.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function Ln(e) {
  return e ? "open" : "closed";
}
const Nn = "DialogTitle", Fn = "DialogContent";
function Wn({
  titleName: e = Nn,
  contentName: t = Fn,
  componentLink: n = "dialog.html#title",
  titleId: o,
  descriptionId: l,
  contentElement: a
}) {
  const r = `Warning: \`${t}\` requires a \`${e}\` for the component to be accessible for screen reader users.

If you want to hide the \`${e}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.radix-vue.com/components/${n}`, s = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${t}.`;
  fe(() => {
    var d;
    document.getElementById(o) || console.warn(r);
    const c = (d = a.value) == null ? void 0 : d.getAttribute("aria-describedby");
    l && c && (document.getElementById(l) || console.warn(s));
  });
}
const at = /* @__PURE__ */ A({
  __name: "DialogContentImpl",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, l = U(), { forwardRef: a, currentElement: r } = L();
    return l.titleId || (l.titleId = Ne(void 0, "radix-vue-dialog-title")), l.descriptionId || (l.descriptionId = Ne(void 0, "radix-vue-dialog-description")), fe(() => {
      l.contentElement = r, document.activeElement !== document.body && (l.triggerElement.value = document.activeElement);
    }), process.env.NODE_ENV !== "production" && Wn({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: l.titleId,
      descriptionId: l.descriptionId,
      contentElement: r
    }), (s, d) => (x(), E(p(kn), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: d[5] || (d[5] = (c) => o("openAutoFocus", c)),
      onUnmountAutoFocus: d[6] || (d[6] = (c) => o("closeAutoFocus", c))
    }, {
      default: w(() => [
        B(p(An), k({
          id: p(l).contentId,
          ref: p(a),
          as: s.as,
          "as-child": s.asChild,
          "disable-outside-pointer-events": s.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": p(l).descriptionId,
          "aria-labelledby": p(l).titleId,
          "data-state": p(Ln)(p(l).open.value)
        }, s.$attrs, {
          onDismiss: d[0] || (d[0] = (c) => p(l).onOpenChange(!1)),
          onEscapeKeyDown: d[1] || (d[1] = (c) => o("escapeKeyDown", c)),
          onFocusOutside: d[2] || (d[2] = (c) => o("focusOutside", c)),
          onInteractOutside: d[3] || (d[3] = (c) => o("interactOutside", c)),
          onPointerDownOutside: d[4] || (d[4] = (c) => o("pointerDownOutside", c))
        }), {
          default: w(() => [
            O(s.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "as", "as-child", "disable-outside-pointer-events", "aria-describedby", "aria-labelledby", "data-state"])
      ]),
      _: 3
    }, 8, ["trapped"]));
  }
}), Tn = /* @__PURE__ */ A({
  __name: "DialogContentModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, l = U(), a = Ie(o), { forwardRef: r, currentElement: s } = L();
    return mn(s), (d, c) => (x(), E(at, k({ ...n, ...p(a) }, {
      ref: p(r),
      "trap-focus": p(l).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: c[0] || (c[0] = (f) => {
        var u;
        f.defaultPrevented || (f.preventDefault(), (u = p(l).triggerElement.value) == null || u.focus());
      }),
      onPointerDownOutside: c[1] || (c[1] = (f) => {
        const u = f.detail.originalEvent, v = u.button === 0 && u.ctrlKey === !0;
        (u.button === 2 || v) && f.preventDefault();
      }),
      onFocusOutside: c[2] || (c[2] = (f) => {
        f.preventDefault();
      })
    }), {
      default: w(() => [
        O(d.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Rn = /* @__PURE__ */ A({
  __name: "DialogContentNonModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = Ie(t);
    L();
    const l = U(), a = h(!1), r = h(!1);
    return (s, d) => (x(), E(at, k({ ...n, ...p(o) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: d[0] || (d[0] = (c) => {
        var f;
        c.defaultPrevented || (a.value || (f = p(l).triggerElement.value) == null || f.focus(), c.preventDefault()), a.value = !1, r.value = !1;
      }),
      onInteractOutside: d[1] || (d[1] = (c) => {
        var f;
        c.defaultPrevented || (a.value = !0, c.detail.originalEvent.type === "pointerdown" && (r.value = !0));
        const u = c.target;
        (f = p(l).triggerElement.value) != null && f.contains(u) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && r.value && c.preventDefault();
      })
    }), {
      default: w(() => [
        O(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), rt = /* @__PURE__ */ A({
  __name: "DialogContent",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, l = U(), a = Ie(o), { forwardRef: r } = L();
    return (s, d) => (x(), E(p(nt), {
      present: s.forceMount || p(l).open.value
    }, {
      default: w(() => [
        p(l).modal.value ? (x(), E(Tn, k({
          key: 0,
          ref: p(r)
        }, { ...n, ...p(a), ...s.$attrs }), {
          default: w(() => [
            O(s.$slots, "default")
          ]),
          _: 3
        }, 16)) : (x(), E(Rn, k({
          key: 1,
          ref: p(r)
        }, { ...n, ...p(a), ...s.$attrs }), {
          default: w(() => [
            O(s.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), jn = /* @__PURE__ */ A({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = U();
    return rn(!0), L(), (n, o) => (x(), E(p(Z), {
      as: n.as,
      "as-child": n.asChild,
      "data-state": p(t).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: w(() => [
        O(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-state"]));
  }
}), Un = /* @__PURE__ */ A({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = U(), { forwardRef: n } = L();
    return (o, l) => {
      var a;
      return (a = p(t)) != null && a.modal.value ? (x(), E(p(nt), {
        key: 0,
        present: o.forceMount || p(t).open.value
      }, {
        default: w(() => [
          B(jn, k(o.$attrs, {
            ref: p(n),
            as: o.as,
            "as-child": o.asChild
          }), {
            default: w(() => [
              O(o.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["present"])) : N("", !0);
    };
  }
}), _n = /* @__PURE__ */ A({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e;
    L();
    const n = U();
    return (o, l) => (x(), E(p(Z), k(t, {
      type: o.as === "button" ? "button" : void 0,
      onClick: l[0] || (l[0] = (a) => p(n).onOpenChange(!1))
    }), {
      default: w(() => [
        O(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["type"]));
  }
}), st = /* @__PURE__ */ A({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(e) {
    const t = e, n = U();
    return L(), (o, l) => (x(), E(p(Z), k(t, {
      id: p(n).titleId
    }), {
      default: w(() => [
        O(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
}), it = /* @__PURE__ */ A({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return L(), (t, n) => (x(), E(p(Z), {
      as: t.as,
      "as-child": t.asChild,
      style: {
        // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
        position: "absolute",
        border: 0,
        width: "1px",
        display: "inline-block",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal"
      }
    }, {
      default: w(() => [
        O(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), [ut, co] = $e("CollectionProvider");
A({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = ut(), { primitiveElement: o, currentElement: l } = tt();
    return S(l, () => {
      n.collectionRef.value = l.value;
    }), () => R(Pe, { ref: o }, t);
  }
});
A({
  name: "CollectionItem",
  inheritAttrs: !1,
  props: {
    value: {
      // It accepts any value
      validator: () => !0
    }
  },
  setup(e, { slots: t, attrs: n }) {
    const o = ut(), { primitiveElement: l, currentElement: a } = tt();
    return q((r) => {
      if (a.value) {
        const s = Re(a.value);
        o.itemMap.value.set(s, { ref: a.value, value: e.value }), r(() => o.itemMap.value.delete(s));
      }
    }), () => R(Pe, { ...n, [o.attrName]: "", ref: l }, t);
  }
});
function qn() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
qn();
const dt = {
  __name: "CloseButton",
  setup(e) {
    return (t, n) => (x(), E(p(_n), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
      default: w(() => n[0] || (n[0] = [
        j("span", { class: "sr-only" }, "Close", -1),
        j("svg", {
          class: "size-6",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "2",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [
          j("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M6 18L18 6M6 6l12 12"
          })
        ], -1)
      ])),
      _: 1
    }));
  }
}, Kn = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, Xn = ["data-inertiaui-modal-entered"], zn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Vn = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(e) {
    const t = h(!1);
    return (n, o) => (x(), _("div", Kn, [
      j("div", {
        class: Y(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": e.config.position === "top",
          "items-center": e.config.position === "center",
          "items-end": e.config.position === "bottom"
        }])
      }, [
        B(Oe, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterEnter: o[2] || (o[2] = (l) => t.value = !0),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: w(() => [
            B(p(rt), {
              "aria-describedby": void 0,
              class: Y({
                "im-modal-wrapper w-full transition duration-300 ease-in-out": !0,
                "blur-sm": !e.modalContext.onTopOfStack,
                "sm:max-w-sm": e.config.maxWidth == "sm",
                "sm:max-w-md": e.config.maxWidth == "md",
                "sm:max-w-md md:max-w-lg": e.config.maxWidth == "lg",
                "sm:max-w-md md:max-w-xl": e.config.maxWidth == "xl",
                "sm:max-w-md md:max-w-xl lg:max-w-2xl": e.config.maxWidth == "2xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl": e.config.maxWidth == "3xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": e.config.maxWidth == "4xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": e.config.maxWidth == "5xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": e.config.maxWidth == "6xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": e.config.maxWidth == "7xl"
              }),
              onEscapeKeyDown: o[0] || (o[0] = (l) => {
                var a;
                return ((a = e.config) == null ? void 0 : a.closeExplicitly) && l.preventDefault();
              }),
              onInteractOutside: o[1] || (o[1] = (l) => {
                var a;
                return ((a = e.config) == null ? void 0 : a.closeExplicitly) && l.preventDefault();
              })
            }, {
              default: w(() => [
                B(p(it), { "as-child": "" }, {
                  default: w(() => [
                    B(p(st))
                  ]),
                  _: 1
                }),
                j("div", {
                  class: Y(["im-modal-content relative", [e.config.paddingClasses, e.config.panelClasses]]),
                  "data-inertiaui-modal-entered": t.value
                }, [
                  e.config.closeButton ? (x(), _("div", zn, [
                    B(dt)
                  ])) : N("", !0),
                  O(n.$slots, "default", {
                    modalContext: e.modalContext,
                    config: e.config
                  })
                ], 10, Xn)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["onAfterLeave"])
      ], 2)
    ]));
  }
}, Hn = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, Gn = ["data-inertiaui-modal-entered"], Yn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Jn = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(e) {
    const t = h(!1);
    return (n, o) => (x(), _("div", Hn, [
      j("div", {
        class: Y(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": e.config.position === "left",
          "justify-end rtl:justify-start": e.config.position === "right"
        }])
      }, [
        B(Oe, {
          appear: "",
          "enter-from-class": "opacity-0 " + (e.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (e.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterEnter: o[2] || (o[2] = (l) => t.value = !0),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: w(() => [
            B(p(rt), {
              "aria-describedby": void 0,
              class: Y({
                "im-slideover-wrapper w-full transition duration-300 ease-in-out": !0,
                "blur-sm": !e.modalContext.onTopOfStack,
                "sm:max-w-sm": e.config.maxWidth == "sm",
                "sm:max-w-md": e.config.maxWidth == "md",
                "sm:max-w-md md:max-w-lg": e.config.maxWidth == "lg",
                "sm:max-w-md md:max-w-xl": e.config.maxWidth == "xl",
                "sm:max-w-md md:max-w-xl lg:max-w-2xl": e.config.maxWidth == "2xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl": e.config.maxWidth == "3xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": e.config.maxWidth == "4xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": e.config.maxWidth == "5xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": e.config.maxWidth == "6xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": e.config.maxWidth == "7xl"
              }),
              onEscapeKeyDown: o[0] || (o[0] = (l) => {
                var a;
                return ((a = e.config) == null ? void 0 : a.closeExplicitly) && l.preventDefault();
              }),
              onInteractOutside: o[1] || (o[1] = (l) => {
                var a;
                return ((a = e.config) == null ? void 0 : a.closeExplicitly) && l.preventDefault();
              })
            }, {
              default: w(() => [
                B(p(it), { "as-child": "" }, {
                  default: w(() => [
                    B(p(st))
                  ]),
                  _: 1
                }),
                j("div", {
                  class: Y(["im-slideover-content relative", [e.config.paddingClasses, e.config.panelClasses]]),
                  "data-inertiaui-modal-entered": t.value
                }, [
                  e.config.closeButton ? (x(), _("div", Yn, [
                    B(dt)
                  ])) : N("", !0),
                  O(n.$slots, "default", {
                    modalContext: e.modalContext,
                    config: e.config
                  })
                ], 10, Gn)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["enter-from-class", "leave-to-class", "onAfterLeave"])
      ], 2)
    ]));
  }
}, Zn = ["data-inertiaui-modal-id", "data-inertiaui-modal-index", "aria-hidden"], Qn = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, fo = {
  __name: "Modal",
  emits: ["after-leave", "blur", "close", "focus", "success"],
  setup(e, { expose: t }) {
    const n = h(null), o = h(!1);
    return t({
      afterLeave: () => {
        var l;
        return (l = n.value) == null ? void 0 : l.afterLeave();
      },
      close: () => {
        var l;
        return (l = n.value) == null ? void 0 : l.close();
      },
      emit: (...l) => {
        var a;
        return (a = n.value) == null ? void 0 : a.emit(...l);
      },
      getChildModal: () => {
        var l;
        return (l = n.value) == null ? void 0 : l.getChildModal();
      },
      getParentModal: () => {
        var l;
        return (l = n.value) == null ? void 0 : l.getParentModal();
      },
      reload: (...l) => {
        var a;
        return (a = n.value) == null ? void 0 : a.reload(...l);
      },
      setOpen: (...l) => {
        var a;
        return (a = n.value) == null ? void 0 : a.setOpen(...l);
      },
      get config() {
        var l;
        return (l = n.value) == null ? void 0 : l.config;
      },
      get id() {
        var l;
        return (l = n.value) == null ? void 0 : l.id;
      },
      get index() {
        var l;
        return (l = n.value) == null ? void 0 : l.index;
      },
      get isOpen() {
        var l;
        return (l = n.value) == null ? void 0 : l.isOpen;
      },
      get modalContext() {
        var l;
        return (l = n.value) == null ? void 0 : l.modalContext;
      },
      get onTopOfStack() {
        var l;
        return (l = n.value) == null ? void 0 : l.onTopOfStack;
      },
      get shouldRender() {
        var l;
        return (l = n.value) == null ? void 0 : l.shouldRender;
      }
    }), (l, a) => (x(), E(jt, {
      ref_key: "modal",
      ref: n,
      onSuccess: a[2] || (a[2] = (r) => l.$emit("success")),
      onClose: a[3] || (a[3] = (r) => l.$emit("close")),
      onFocus: a[4] || (a[4] = (r) => l.$emit("focus")),
      onBlur: a[5] || (a[5] = (r) => l.$emit("blur"))
    }, {
      default: w(({
        afterLeave: r,
        close: s,
        config: d,
        emit: c,
        getChildModal: f,
        getParentModal: u,
        id: v,
        index: i,
        isOpen: m,
        modalContext: g,
        onTopOfStack: y,
        reload: b,
        setOpen: I,
        shouldRender: M
      }) => [
        B(p(hn), {
          open: m,
          "onUpdate:open": I
        }, {
          default: w(() => [
            B(p(wn), null, {
              default: w(() => [
                j("div", {
                  "data-inertiaui-modal-id": v,
                  "data-inertiaui-modal-index": i,
                  class: "im-dialog relative z-20",
                  "aria-hidden": !y
                }, [
                  i === 0 && y ? (x(), E(Oe, {
                    key: 0,
                    appear: !o.value,
                    "enter-active-class": "transition transform ease-in-out duration-300",
                    "enter-from-class": "opacity-0",
                    "enter-to-class": "opacity-100",
                    "leave-active-class": "transition transform ease-in-out duration-300",
                    "leave-from-class": "opacity-100",
                    "leave-to-class": "opacity-0",
                    onAfterAppear: a[0] || (a[0] = (F) => o.value = !0)
                  }, {
                    default: w(() => [
                      B(p(Un), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : N("", !0),
                  i > 0 && y ? (x(), _("div", Qn)) : N("", !0),
                  (x(), E(Ke(d != null && d.slideover ? Jn : Vn), {
                    "modal-context": g,
                    config: d,
                    onAfterLeave: a[1] || (a[1] = (F) => l.$emit("after-leave"))
                  }, {
                    default: w(() => [
                      O(l.$slots, "default", {
                        id: v,
                        afterLeave: r,
                        close: s,
                        config: d,
                        emit: c,
                        getChildModal: f,
                        getParentModal: u,
                        index: i,
                        isOpen: m,
                        modalContext: g,
                        onTopOfStack: y,
                        reload: b,
                        setOpen: I,
                        shouldRender: M
                      })
                    ]),
                    _: 2
                  }, 1064, ["modal-context", "config"]))
                ], 8, Zn)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 2
        }, 1032, ["open", "onUpdate:open"])
      ]),
      _: 3
    }, 512));
  }
}, mo = {
  __name: "ModalLink",
  props: {
    href: {
      type: String,
      required: !0
    },
    method: {
      type: String,
      default: "get"
    },
    data: {
      type: Object,
      default: () => ({})
    },
    as: {
      type: String,
      default: "a"
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    queryStringArrayFormat: {
      type: String,
      default: "brackets"
    },
    navigate: {
      type: Boolean,
      default: null
    },
    // Passthrough to Modal.vue
    closeButton: {
      type: Boolean,
      required: !1,
      default: null
    },
    closeExplicitly: {
      type: Boolean,
      required: !1,
      default: null
    },
    maxWidth: {
      type: String,
      required: !1,
      default: null
    },
    paddingClasses: {
      type: [Boolean, String],
      required: !1,
      default: null
    },
    panelClasses: {
      type: [Boolean, String],
      required: !1,
      default: null
    },
    position: {
      type: String,
      required: !1,
      default: null
    },
    slideover: {
      type: Boolean,
      required: !1,
      default: null
    }
  },
  emits: ["after-leave", "blur", "close", "error", "focus", "start", "success"],
  setup(e, { emit: t }) {
    const n = e, o = h(!1), l = ne(), a = h(null);
    be("modalContext", a);
    const r = t, s = h(!1), d = $(() => n.navigate ?? Ae("navigate"));
    S(
      () => {
        var g;
        return (g = a.value) == null ? void 0 : g.onTopOfStack;
      },
      (g) => {
        a.value && (g && s.value ? r("focus") : g || r("blur"), s.value = !g);
      }
    );
    const c = h(null);
    ue(() => {
      var g;
      (g = c.value) == null || g.call(c);
    });
    const f = je();
    function u() {
      c.value = a.value.registerEventListenersFromAttrs(f);
    }
    S(a, (g, y) => {
      g && !y && (u(), r("success"));
    });
    function v() {
      r("close");
    }
    function i() {
      a.value = null, r("after-leave");
    }
    function m() {
      o.value || (n.href.startsWith("#") || (o.value = !0, r("start")), l.visit(
        n.href,
        n.method,
        n.data,
        n.headers,
        It(ze(n, Rt)),
        v,
        i,
        n.queryStringArrayFormat,
        d.value
      ).then((g) => {
        a.value = g;
      }).catch((g) => r("error", g)).finally(() => o.value = !1));
    }
    return (g, y) => (x(), E(Ke(e.as), k(p(f), {
      href: e.href,
      onClick: At(m, ["prevent"])
    }), {
      default: w(() => [
        O(g.$slots, "default", { loading: o.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
};
function po() {
  return Mt(Ce("modalContext", null));
}
function vo(e, t = {}) {
  return ne().visit(
    e,
    t.method ?? "get",
    t.data ?? {},
    t.headers ?? {},
    t.config ?? {},
    t.onClose,
    t.onAfterLeave,
    t.queryStringArrayFormat ?? "brackets",
    t.navigate ?? Ae("navigate")
  ).then((n) => {
    const o = t.listeners ?? {};
    return Object.keys(o).forEach((l) => {
      const a = l.replace(/([A-Z])/g, "-$1").toLowerCase();
      n.on(a, o[l]);
    }), n;
  });
}
export {
  jt as HeadlessModal,
  fo as Modal,
  mo as ModalLink,
  kt as ModalRoot,
  Ae as getConfig,
  so as initFromPageProps,
  ro as putConfig,
  io as renderApp,
  ao as resetConfig,
  po as useModal,
  vo as visitModal
};
