
/*!
* lookview - 提供更友好的数据可视化解决方案
* https://github.com/AC-graph/lookview
*
* Includes image2D.js
* https://yelloxing.gitee.io/image2d
* 
* author 心叶
*
* version 2.0.1-beta
* 
* build Fri Sep 04 2020
*
* Copyright 心叶
* Released under the MIT license
* 
* Date:Wed Sep 09 2020 16:29:12 GMT+0800 (GMT+08:00)
*/
        
(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var image2D_min = createCommonjsModule(function (module) {

    var _typeof$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (t) {
      return _typeof(t);
    } : function (t) {
      return t && typeof Symbol === "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
    };

    (function () {

      var e = Object.prototype.toString;

      function r(t) {
        if (t == null) {
          return t === undefined ? "[object Undefined]" : "[object Null]";
        }

        return e.call(t);
      }

      function n(t) {
        if (t === null || (typeof t === "undefined" ? "undefined" : _typeof$1(t)) !== "object" || r(t) != "[object Object]") {
          return false;
        }

        if (Object.getPrototypeOf(t) === null) {
          return true;
        }

        var e = t;

        while (Object.getPrototypeOf(e) !== null) {
          e = Object.getPrototypeOf(e);
        }

        return Object.getPrototypeOf(t) === e;
      }

      function m(t) {
        return t !== null && (typeof t === "undefined" ? "undefined" : _typeof$1(t)) === "object" && (t.nodeType === 1 || t.nodeType === 9 || t.nodeType === 11) && !n(t);
      }

      function i(t) {
        var e = typeof t === "undefined" ? "undefined" : _typeof$1(t);
        return t != null && (e === "object" || e === "function");
      }

      function b(t) {
        if (!i(t)) {
          return false;
        }

        var e = r(t);
        return e === "[object Function]" || e === "[object AsyncFunction]" || e === "[object GeneratorFunction]" || e === "[object Proxy]";
      }

      function x(t) {
        var e = typeof t === "undefined" ? "undefined" : _typeof$1(t);
        return e === "string" || e === "object" && t != null && !Array.isArray(t) && r(t) === "[object String]";
      }

      var f = function t(e, r) {
        for (var n in r) {
          try {
            e[n] = r[n];
          } catch (t) {
            throw new Error("Illegal property value！");
          }
        }

        return e;
      };

      var u = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
      };
      var _ = {
        whitespace: "[\\x20\\t\\r\\n\\f]",
        blank: "[\\n\\f\\r]",
        identifier: "(?:\\\\.|[\\w-]|[^\0-\\xa0])+"
      };
      var a = ["href", "title", "show", "type", "role", "actuate"];

      function l(t) {
        return t !== null && (typeof t === "undefined" ? "undefined" : _typeof$1(t)) === "object" && t.nodeType === 3 && !n(t);
      }

      var s = function t(e, r) {
        if ("innerHTML" in SVGElement.prototype === false || "innerHTML" in SVGSVGElement.prototype === false) {
          var n = document.createElement("div");
          n.innerHTML = r;

          var o = function t(e) {
            var r = document.createElementNS(u.svg, e.tagName.toLowerCase());
            var n = e.attributes;

            for (var i = 0; n && i < n.length; i++) {
              if (a.indexOf(n[i].nodeName) >= 0) {
                r.setAttributeNS(u.xlink, "xlink:" + n[i].nodeName, e.getAttribute(n[i].nodeName));
              } else {
                r.setAttribute(n[i].nodeName, e.getAttribute(n[i].nodeName));
              }
            }

            return r;
          };

          var i = o(n.firstChild);

          (function t(e, r) {
            var n = e.firstChild;

            if (l(n)) {
              r.textContent = e.innerText;
              return;
            }

            while (n) {
              var i = o(n);
              r.appendChild(i);
              if (n.firstChild) t(n, i);
              n = n.nextSibling;
            }
          })(n.firstChild, i);

          e.appendChild(i);
        } else {
          e.innerHTML = r;
        }
      };

      var o = function t(e, r) {
        var n = void 0,
            i = void 0,
            o = "div";

        if (r === "html" || r === "HTML") {
          if (/^<tr[> ]/.test(e)) {
            o = "tbody";
          } else if (/^<th[> ]/.test(e) || /^<td[> ]/.test(e)) {
            o = "tr";
          } else if (/^<thead[> ]/.test(e) || /^<tbody[> ]/.test(e)) {
            o = "table";
          }

          n = document.createElement(o);
          n.innerHTML = e;

          if (!/</.test(n.innerHTML)) {
            throw new Error("This template cannot be generated using div as a container:" + e + "\nPlease contact us: https://github.com/yelloxing/image2D/issues");
          }
        } else {
          n = document.createElementNS(u.svg, "svg");
          s(n, e);
        }

        i = n.childNodes;

        for (var a = 0; a < i.length; a++) {
          if (m(i[a])) return i[a];
        }
      };

      function T(t, e) {
        if (new RegExp("^" + _.identifier + "$").test(t)) t = "<" + t + "></" + t + ">";
        var r = /^<([^(>| )]+)/.exec(t)[1];
        if ("canvas" === r.toLowerCase()) e = "HTML";
        if (!x(e) && ["div", "span", "p", "em", "i", "table", "ul", "ol", "dl", "dt", "li", "dd", "form", "input", "button", "textarea", "header", "footer", "article", "section", "h1", "h2", "h3", "h4", "h5", "h6", "image", "video", "iframe", "object", "style", "script", "link", "tr", "td", "th", "tbody", "thead"].indexOf(r.toLowerCase()) >= 0) e = "HTML";
        return o(t, e);
      }

      function c(t, e) {
        if (x(e) || x(t)) {
          t = t.trim().replace(new RegExp(_.blank, "g"), "");

          if (typeof e == "string" || /^</.test(t)) {
            var r = T(t, e);
            if (m(r)) return [r];else return [];
          } else if (t === "*") {
            return e.getElementsByTagName("*");
          }

          var n = t.match(new RegExp("#" + _.identifier, "g"));

          if (n) {
            var i = document.getElementById(n[0].replace("#", ""));
            if (m(i)) return [i];else return [];
          }

          var o = t.match(new RegExp("\\." + _.identifier, "g")),
              a = t.match(new RegExp("^" + _.identifier));

          if (a || o) {
            var f = e.getElementsByTagName(a ? a[0] : "*"),
                u = [];

            for (var l = 0; l < f.length; l++) {
              var s = " " + f[l].getAttribute("class") + " ",
                  c = true;

              for (var d = 0; o && d < o.length; d++) {
                if (!s.match(" " + o[d].replace(".", "") + " ")) {
                  c = false;
                  break;
                }
              }

              if (c) u.push(f[l]);
            }

            return u;
          } else {
            throw new Error("Unsupported selector:" + t);
          }
        } else if (m(t)) {
          return [t];
        } else if (t && (t.constructor === Array || t.constructor === HTMLCollection || t.constructor === NodeList)) {
          var h = [];

          for (var v = 0; v < t.length; v++) {
            if (m(t[v])) h.push(t[v]);else if (t[v] && t[v].constructor === k) {
              for (var p = 0; p < t[v].length; p++) {
                h.push(t[v][p]);
              }
            }
          }

          return h;
        } else if (t && t.constructor === k) {
          return t;
        } else if (b(t)) {
          var g = e.getElementsByTagName("*"),
              y = [];

          for (var w = 0; w < g.length; w++) {
            if (t(g[w])) y.push(g[w]);
          }

          return y;
        } else {
          throw new Error("Unknown selector:" + t);
        }
      }

      var k = function t(e, r) {
        return new t.prototype.init(e, r);
      };

      k.prototype.init = function (t, e) {
        this.context = e = e || document;
        var r = c(t, e),
            n = void 0;

        for (n = 0; n < r.length; n++) {
          this[n] = r[n];
        }

        this.length = r.length;
        return this;
      };

      k.prototype.extend = k.extend = function () {
        var t = arguments[0] || {};
        var e = arguments[1] || {};
        var r = arguments.length;

        if (r === 1) {
          e = t;
          t = this;
        }

        if (!i(t)) {
          t = {};
        }

        for (var n in e) {
          try {
            t[n] = e[n];
          } catch (t) {
            throw new Error("Illegal property key：" + n + "！");
          }
        }

        return t;
      };

      k.prototype.init.prototype = k.prototype;

      function t(t) {
        var u = t || {},
            l = void 0,
            n = void 0;

        var i = function t() {
          var a = [],
              f = 0,
              u = 0;

          (function t(e, r) {
            if (r > u) u = r;
            var n = void 0;

            for (n = 0; n < e.children.length; n++) {
              t(l[e.children[n]], r + 1);
            }

            l[e.id].left = r + .5;

            if (n == 0) {
              if (a[r] == undefined) a[r] = -.5;
              if (a[r - 1] == undefined) a[r - 1] = -.5;
              l[e.id].top = a[r] + 1;
              var i = a[r] + 1 + (l[e.pid].children.length - 1) * .5;
              if (i - 1 < a[r - 1]) l[e.id].top = a[r - 1] + 1 - (l[e.pid].children.length - 1) * .5;
            } else {
              l[e.id].top = (l[e.children[0]].top + l[e.children[n - 1]].top) * .5;
            }

            if (l[e.id].top <= a[r]) {
              var o = a[r] + 1 - l[e.id].top;

              (function t(e, r) {
                l[e].top += o;
                if (a[r] < l[e].top) a[r] = l[e].top;
                var n = void 0;

                for (n = 0; n < l[e].children.length; n++) {
                  t(l[e].children[n], r + 1);
                }
              })(e.id, r);
            }

            a[r] = l[e.id].top;
            if (l[e.id].top + .5 > f) f = l[e.id].top + .5;
          })(l[n], 0);

          return {
            node: l,
            root: n,
            size: f,
            deep: u + 1
          };
        };

        var o = function t(o) {
          var a = {};
          var e = u.root(o),
              f = void 0,
              r = void 0;
          f = r = u.id(e);
          a[f] = {
            data: e,
            pid: null,
            id: f,
            children: []
          };

          (function t(e, r) {
            var n = u.child(e, o),
                i = void 0;

            for (i = 0; n && i < n.length; i++) {
              f = u.id(n[i]);
              a[r].children.push(f);
              a[f] = {
                data: n[i],
                pid: r,
                id: f,
                children: []
              };
              t(n[i], f);
            }
          })(e, f);

          return [r, a];
        };

        var e = function t(e) {
          var r = o(e);
          l = r[1];
          n = r[0];
          return i();
        };

        e.root = function (t) {
          u.root = t;
          return e;
        };

        e.child = function (t) {
          u.child = t;
          return e;
        };

        e.id = function (t) {
          u.id = t;
          return e;
        };

        return e;
      }

      var E = function t(e, r, n, i, o) {
        var a = Math.cos(n),
            f = Math.sin(n);
        return [+((i - e) * a - (o - r) * f + e).toFixed(7), +((i - e) * f + (o - r) * a + r).toFixed(7)];
      };

      var d = function t(e, r, n, i, o) {
        var a = Math.sqrt(e * e + r * r);
        return [+(e * n / a + i).toFixed(7), +(r * n / a + o).toFixed(7)];
      };

      var h = function t(e, r, n, i, o) {
        return [+(n * (i - e) + e).toFixed(7), +(n * (o - r) + r).toFixed(7)];
      };

      var v = function t(o) {
        o = f({
          d: [1, 1],
          c: [0, 0],
          p: [0, 0]
        }, o);
        var a = {
          rotate: function t(e) {
            var r = o.d[0] + o.p[0],
                n = o.d[1] + o.p[1];
            var i = E(o.p[0], o.p[1], e, r, n);
            o.d = [i[0] - o.p[0], i[1] - o.p[1]];
            return a;
          },
          move: function t(e) {
            o.p = d(o.d[0], o.d[1], e, o.p[0], o.p[1]);
            return a;
          },
          scale: function t(e) {
            o.p = h(o.c[0], o.c[1], e, o.p[0], o.p[1]);
            return a;
          },
          value: function t() {
            return o.p;
          }
        };
        return a;
      };

      function p(m) {
        m = f({
          "begin-deg": 0,
          deg: Math.PI * 2
        }, m);
        var b = t().root(m.root).child(m.child).id(m.id);

        var e = function t(e) {
          var r = b(e);

          for (var n in r.node) {
            r.node[n].deep = r.node[n].left - .5;
          }

          if (m.type === "LR" || m.type === "RL") {
            var i = m.width / r.deep;
            if ("RL" === m.type) i *= -1;
            var o = m.height / (r.size - -.5);

            for (var a in r.node) {
              var f = r.node[a];
              r.node[a].left = +(("RL" == m.type ? m.width : 0) - -f.left * i).toFixed(7);
              r.node[a].top = +(f.top * o).toFixed(7);
            }
          } else if (m.type === "TB" || m.type === "BT") {
            var u = m.height / r.deep;
            if ("BT" == m.type) u *= -1;
            var l = m.width / (r.size - -.5);
            var s = void 0,
                c = void 0;

            for (var d in r.node) {
              var h = r.node[d];
              s = h.left;
              c = h.top;
              r.node[d].top = +(("BT" == m.type ? m.height : 0) - -s * u).toFixed(7);
              r.node[d].left = +(c * l).toFixed(7);
            }
          } else if (m.type === "circle") {
            var v = m.radius / (r.deep - 1);
            var p = m.deg / (r.size - -.5);

            for (var g in r.node) {
              var y = r.node[g];
              r.node[g].deg = (m["begin-deg"] - -p * y.top) % (Math.PI * 2);
              var w = E(m.cx, m.cy, r.node[g].deg, m.cx - -v * (y.left - .5), m.cy);
              r.node[g].left = +w[0];
              r.node[g].top = +w[1];
            }
          }

          m.drawer(r);
          return t;
        };

        e.config = function (t) {
          m = f(m, t);
          return e;
        };

        e.drawer = function (t) {
          m.drawer = t;
          return e;
        };

        return e;
      }

      function g(t) {
        return typeof t === "number" || t !== null && (typeof t === "undefined" ? "undefined" : _typeof$1(t)) === "object" && r(t) === "[object Number]";
      }

      function y(u) {
        u = f({
          "begin-deg": -Math.PI / 2,
          deg: Math.PI * 2,
          radius: []
        }, u);

        if (!b(u.value)) {
          throw new Error("config.value must be a function!");
        }

        var e = function t(e) {
          var r = 0,
              n = [],
              i = 0;

          for (var o in e) {
            n.push({
              value: u.value(e[o], o, r),
              data: e[o],
              key: o,
              index: r,
              dots: []
            });
            i += n[r].value;
            r += 1;
          }

          for (r = 0; r < n.length; r++) {
            n[r].beginDeg = r === 0 ? u["begin-deg"] : n[r - 1].beginDeg + n[r - 1].deg;
            var a = n[r].value / i;
            n[r].deg = a * u.deg;
            n[r].percent = new Number(a * 100).toFixed(2);
          }

          if (g(u.cx) && g(u.cy)) {
            for (r = 0; r < u.radius.length; r++) {
              for (var f = 0; f < n.length; f++) {
                n[f].dots.push(E(u.cx, u.cy, n[f].beginDeg + n[f].deg * .5, u.cx + u.radius[r], u.cy));
              }
            }
          }

          if (b(u.drawer)) {
            u.drawer(n);
          }
        };

        e.config = function (t) {
          u = f(u, t);
          return e;
        };

        e.drawer = function (t) {
          u.drawer = t;
          return e;
        };

        return e;
      }

      function w(t, e, r, n) {
        n = n || 0;
        var i = Math.sqrt(e * e + r * r + n * n);
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e * t / i, r * t / i, n * t / i, 1];
      }

      function M(t) {
        var e = Math.sin(t),
            r = Math.cos(t);
        return [r, e, 0, 0, -e, r, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
      }

      function C(t, e, r, n, i, o) {
        n = n || 0;
        i = i || 0;
        o = o || 0;
        return [t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, n - n * t, i - i * e, o - o * r, 1];
      }

      function P(t, e, r, n, i, o) {
        if (typeof t === "number" && typeof e === "number") {
          if (typeof r !== "number") {
            r = 0;
            n = t;
            i = e;
            o = 1;
          } else if (typeof n !== "number" || typeof i !== "number" || typeof o !== "number") {
            n = t;
            i = e;
            o = r;
            t = 0;
            e = 0;
            r = 0;
          }

          if (t == n && e == i && r == o) throw new Error("It's not a legitimate ray!");
          var a = Math.sqrt((n - t) * (n - t) + (i - e) * (i - e)),
              f = a != 0 ? (i - e) / a : 1,
              u = a != 0 ? (n - t) / a : 0,
              l = (n - t) * u + (i - e) * f,
              s = o - r,
              c = Math.sqrt(l * l + s * s),
              d = c != 0 ? s / c : 1,
              h = c != 0 ? l / c : 0;
          return [[f, d * u, u * h, 0, -u, f * d, f * h, 0, 0, -h, d, 0, e * u - t * f, r * h - t * u * d - e * f * d, -t * u * h - e * f * h - r * d, 1], [f, -u, 0, 0, d * u, d * f, -h, 0, u * h, f * h, d, 0, t, e, r, 1]];
        } else {
          throw new Error("a1 and b1 is required!");
        }
      }

      var S = function t(e, r) {
        var n = [];

        for (var i = 0; i < 4; i++) {
          for (var o = 0; o < r.length / 4; o++) {
            n[o * 4 + i] = e[i] * r[o * 4] + e[i + 4] * r[o * 4 + 1] + e[i + 8] * r[o * 4 + 2] + e[i + 12] * r[o * 4 + 3];
          }
        }

        return n;
      };

      function A(t) {
        var l = t || [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        var s = {
          move: function t(e, r, n, i) {
            l = S(w(e, r, n, i), l);
            return s;
          },
          rotate: function t(e, r, n, i, o, a, f) {
            var u = P(r, n, i, o, a, f);
            l = S(S(S(u[1], M(e)), u[0]), l);
            return s;
          },
          scale: function t(e, r, n, i, o, a) {
            l = S(C(e, r, n, i, o, a), l);
            return s;
          },
          multiply: function t(e, r) {
            l = r ? S(l, e) : S(e, l);
            return s;
          },
          use: function t(e, r, n, i) {
            n = n || 0;
            i = i || 1;
            var o = S(l, [e, r, n, i]);
            o[0] = +o[0].toFixed(7);
            o[1] = +o[1].toFixed(7);
            o[2] = +o[2].toFixed(7);
            o[3] = +o[3].toFixed(7);
            return o;
          },
          value: function t() {
            return l;
          }
        };
        return s;
      }

      var L = [];
      var N = 13;
      var j = 400;
      var D = null;

      function I(e, t, r) {
        var u = {
          timer: function t(e, r, n) {
            if (!e) {
              throw new Error("Tick is required!");
            }

            r = r || j;
            var i = new Date().valueOf() + "_" + (Math.random() * 1e3).toFixed(0);
            L.push({
              id: i,
              createTime: new Date(),
              tick: e,
              duration: r,
              callback: n
            });
            u.start();
            return i;
          },
          start: function t() {
            if (!D) {
              D = setInterval(u.tick, N);
            }
          },
          tick: function t() {
            var e = void 0,
                r = void 0,
                t = void 0,
                n = void 0,
                i = void 0,
                o = void 0,
                a = void 0,
                f = L;
            L = [];
            L.length = 0;

            for (r = 0; r < f.length; r++) {
              i = f[r];
              e = i.createTime;
              t = i.tick;
              o = i.duration;
              n = i.callback;
              a = (+new Date() - e) / o;
              a = a > 1 ? 1 : a;
              t(a);

              if (a < 1 && i.id) {
                L.push(i);
              } else if (n) {
                n(a);
              }
            }

            if (L.length <= 0) {
              u.stop();
            }
          },
          stop: function t() {
            if (D) {
              clearInterval(D);
              D = null;
            }
          }
        };
        var n = u.timer(function (t) {
          e(t);
        }, t, r);
        return function () {
          var t = void 0;

          for (t in L) {
            if (L[t].id == n) {
              L[t].id = undefined;
              return;
            }
          }
        };
      }

      var R = 9007199254740991;

      function F(t) {
        return typeof t == "number" && t > -1 && t % 1 == 0 && t <= R;
      }

      function z(t) {
        return t != null && typeof t != "function" && F(t.length);
      }

      function H(t) {
        return z(t) && !x(t);
      }

      function B(t, e) {
        if (e) {
          return H(t);
        }

        return Array.isArray(t);
      }

      function O(t, e) {
        for (var r in e) {
          try {
            t[r] = e[r];
          } catch (t) {
            throw new Error("Illegal property value！");
          }
        }

        return t;
      }

      function W(u) {
        u = O({
          u: .5
        }, u);
        var l = void 0,
            s = void 0,
            c = void 0;

        var d = function t(e) {
          if (l) {
            var r = (e - s) / (c - s),
                n = r * r,
                i = r * n;
            var o = i * l[0] + n * l[1] + r * l[2] + l[3];
            return o * (c - s);
          } else throw new Error("You shoud first set the position!");
        };

        d.setP = function (t, e, r, n, i, o) {
          if (t < r) {
            s = t;
            c = r;
            var a = u.u * i,
                f = u.u * o;
            e /= r - t;
            n /= r - t;
            l = [2 * e - 2 * n + a + f, 3 * n - 3 * e - 2 * a - f, a, e];
          } else throw new Error("The point x-position should be increamented!");

          return d;
        };

        return d;
      }

      function G(e, t, r, n) {
        if (!b(r)) {
          n = r;
          r = false;
        }

        var i = {
          ease: [.25, .1, .5, 1],
          "ease-in": [.5, 0, .75, .6],
          "ease-in-out": [.43, .01, .58, 1],
          "ease-out": [.25, .6, .5, 1],
          linear: "default"
        }[n] || n;

        var o = function t(e) {
          return e;
        };

        if (i && B(i) && i.length == 4) {
          o = W({
            u: 1
          }).setP(0, 0, 1, 1, i[1] / i[0], (1 - i[3]) / (1 - i[2]));
        }

        return I(function (t) {
          e(o(t));
        }, t, function (t) {
          if (b(r)) {
            if (t != 1) t = o(t);
            r(t);
          }
        });
      }

      function $(i) {
        i = f({
          t: 0
        }, i);
        var o = void 0,
            r = void 0;

        var a = function t(e) {
          if (o) {
            r = -1;

            while (r + 1 < o.x.length && (e > o.x[r + 1] || r == -1 && e >= o.x[r + 1])) {
              r += 1;
            }

            if (r == -1 || r >= o.h.length) throw new Error("Coordinate crossing!");
            return o.h[r](e);
          } else {
            throw new Error("You shoud first set the position!");
          }
        };

        a.setT = function (t) {
          if (typeof t === "number") {
            i.t = t;
          } else {
            throw new Error("Expecting a figure!");
          }

          return a;
        };

        a.setP = function (t) {
          o = {
            x: [],
            h: []
          };
          var e = void 0,
              r = (t[1][1] - t[0][1]) / (t[1][0] - t[0][0]),
              n = void 0;
          o.x[0] = t[0][0];

          for (e = 1; e < t.length; e++) {
            if (t[e][0] <= t[e - 1][0]) throw new Error("The point position should be increamented!");
            o.x[e] = t[e][0];
            n = e < t.length - 1 ? (t[e + 1][1] - t[e - 1][1]) / (t[e + 1][0] - t[e - 1][0]) : (t[e][1] - t[e - 1][1]) / (t[e][0] - t[e - 1][0]);
            o.h[e - 1] = W({
              u: (1 - i.t) * .5
            }).setP(t[e - 1][0], t[e - 1][1], t[e][0], t[e][1], r, n);
            r = n;
          }

          return a;
        };

        return a;
      }

      function V(t, e) {
        var r = document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(t, null) : t.currentStyle;
        return x(e) ? r.getPropertyValue(e) : r;
      }

      var q = function t(e) {
        var r = document.getElementsByTagName("head")[0];
        r.style["color"] = e;
        var n = V(r, "color");
        var i = n.replace(/^rgba?\(([^)]+)\)$/, "$1").split(new RegExp("\\," + _.whitespace));
        return [+i[0], +i[1], +i[2], i[3] == undefined ? 1 : +i[3]];
      };

      var U = function t(e) {
        var r = [];

        for (var n = 1; n <= e; n++) {
          r.push("rgb(" + (Math.random(1) * 230 + 20).toFixed(0) + "," + (Math.random(1) * 230 + 20).toFixed(0) + "," + (Math.random(1) * 230 + 20).toFixed(0) + ")");
        }

        return r;
      };

      var X = function t(e, r) {
        if (window.attachEvent) {
          for (var n = 0; n < this.length; n++) {
            this[n].attachEvent("on" + e, r);
          }
        } else {
          for (var i = 0; i < this.length; i++) {
            this[i].addEventListener(e, r, false);
          }
        }

        return this;
      };

      var Y = function t(e, r) {
        if (window.detachEvent) {
          for (var n = 0; n < this.length; n++) {
            this[n].detachEvent("on" + e, r);
          }
        } else {
          for (var i = 0; i < this.length; i++) {
            this[i].removeEventListener(e, r, false);
          }
        }

        return this;
      };

      var Z = function t(e) {
        var r = this[0].getBoundingClientRect();
        if (!e || !e.clientX) throw new Error("Event is necessary!");
        return {
          x: e.clientX - r.left,
          y: e.clientY - r.top
        };
      };

      var Q = function t(e) {
        e = e || window.event;

        if (e.stopPropagation) {
          e.stopPropagation();
        } else {
          e.cancelBubble = true;
        }

        return this;
      };

      var J = function t(e) {
        e = e || window.event;

        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }

        return this;
      };

      var K = function t(e, r, n, i) {
        var o = Math.cos(e),
            a = Math.sin(e);
        return [r, n * o - i * a, n * a + i * o];
      },
          tt = function t(e, r, n, i) {
        var o = Math.cos(e),
            a = Math.sin(e);
        return [i * a + r * o, n, i * o - r * a];
      },
          et = function t(e, r, n, i) {
        var o = Math.cos(e),
            a = Math.sin(e);
        return [r * o - n * a, r * a + n * o, i];
      };

      var rt = [];

      function nt(t, e, r) {
        rt = tt((360 - r) / 180 * Math.PI, 100 * t.scale, 0, 0);
        rt = et(e / 180 * Math.PI, rt[0], rt[1], rt[2]);
        rt = et((90 - t.center[0]) / 180 * Math.PI, rt[0], rt[1], rt[2]);
        rt = K((90 - t.center[1]) / 180 * Math.PI, rt[0], rt[1], rt[2]);
        return [-rt[0], rt[1], rt[2]];
      }

      function it(t) {
        var n = f({
          type: "eoap",
          scale: 1,
          center: [107, 36]
        }, t);

        var e = function t(e, r) {
          switch (n.type) {
            case "eoap":
              {
                return nt(n, e, r);
              }

            default:
              {
                throw new Error("Map type configuration error!");
              }
          }
        };

        e.config = function (t) {
          n = f(n, t);
          return e;
        };

        return e;
      }

      var ot = function t(e, r) {
        var n = c(e, r || document);

        if (n.length > 0) {
          for (var i = 0; i < this.length; i++) {
            n[0].appendChild(this[i]);
          }
        } else {
          throw new Error("Target empty!");
        }

        return this;
      };

      var at = function t(e, r) {
        var n = c(e, r || document);

        if (n.length > 0) {
          for (var i = 0; i < this.length; i++) {
            n[0].insertBefore(this[i], n[0].childNodes[0]);
          }
        } else {
          throw new Error("Target empty!");
        }

        return this;
      };

      var ft = function t(e, r) {
        var n = c(e, r || document);

        if (n.length > 0) {
          for (var i = 0; i < this.length; i++) {
            n[0].parentNode.insertBefore(this[i], n[0].nextSibling);
          }
        } else {
          throw new Error("Target empty!");
        }

        return this;
      };

      var ut = function t(e, r) {
        var n = c(e, r || document);

        if (n.length > 0) {
          for (var i = 0; i < this.length; i++) {
            n[0].parentNode.insertBefore(this[i], n[0]);
          }
        } else {
          throw new Error("Target empty!");
        }

        return this;
      };

      var lt = function t() {
        for (var e = 0; e < this.length; e++) {
          this[e].parentNode.removeChild(this[e]);
        }

        return this;
      };

      var st = function t(e) {
        var r = [];

        for (var n = 0; n < this.length; n++) {
          if (e(n, k(this[n]))) r.push(this[n]);
        }

        return k(r);
      };

      var ct = function t(e) {
        if (arguments.length > 0) {
          for (var r = 0; r < this.length; r++) {
            this[r].textContent = e;
          }

          return this;
        }

        if (this.length <= 0) throw new Error("Target empty!");
        return this[0].textContent;
      };

      var dt = function t(e) {
        if (arguments.length > 0) {
          for (var r = 0; r < this.length; r++) {
            if (/[a-z]/.test(this[r].tagName)) {
              s(this[r], e);
            } else {
              this[r].innerHTML = e;
            }
          }

          return this;
        }

        if (this.length <= 0) throw new Error("Target empty!");
        return this[0].innerHTML;
      };

      var ht = function t(e) {
        if (this.length <= 0) throw new Error("Target empty!");
        var r = void 0,
            n = void 0,
            i = this[0];

        if (e == "content") {
          n = i.clientWidth - (V(i, "padding-left") + "").replace("px", "") - (V(i, "padding-right") + "").replace("px", "");
          r = i.clientHeight - (V(i, "padding-top") + "").replace("px", "") - (V(i, "padding-bottom") + "").replace("px", "");
        } else if (e == "padding") {
          n = i.clientWidth;
          r = i.clientHeight;
        } else if (e == "border") {
          n = i.offsetWidth;
          r = i.offsetHeight;
        } else if (e == "scroll") {
          n = i.scrollWidth;
          r = i.scrollHeight;
        } else {
          n = i.offsetWidth;
          r = i.offsetHeight;
        }

        return {
          width: n,
          height: r
        };
      };

      function vt() {
        if (arguments.length <= 1 && (arguments.length <= 0 || _typeof$1(arguments[0]) !== "object")) {
          if (this.length <= 0) throw new Error("Target empty!");
          return V(this[0], arguments[0]);
        }

        for (var t = 0; t < this.length; t++) {
          if (arguments.length === 1) {
            for (var e in arguments[0]) {
              this[t].style[e] = arguments[0][e];
            }
          } else this[t].style[arguments[0]] = arguments[1];
        }

        return this;
      }

      var pt = function t(e, r, n) {
        if (/[a-z]/.test(e.tagName) && a.indexOf(r) >= 0) {
          e.setAttributeNS(u.xlink, "xlink:" + r, n);
        } else e.setAttribute(r, n);
      };

      function gt() {
        if (arguments.length === 1 && _typeof$1(arguments[0]) !== "object") {
          if (this.length <= 0) throw new Error("Target empty!");
          return this[0].getAttribute(arguments[0]);
        } else if (arguments.length > 0) {
          for (var t = 0; t < this.length; t++) {
            if (arguments.length === 1) {
              for (var e in arguments[0]) {
                pt(this[t], e, arguments[0][e]);
              }
            } else pt(this[t], arguments[0], arguments[1]);
          }
        }

        return this;
      }

      var yt = function t(e, r) {
        if (arguments.length <= 0) {
          if (this.length <= 0) throw new Error("Target empty!");
          return this[0].__data__;
        }

        for (var n = 0; n < this.length; n++) {
          this[n].__data__ = typeof r === "function" ? r(e, n) : e;
        }

        return this;
      };

      var wt = function t(e, r) {
        if (arguments.length <= 0) {
          var n = [];

          for (var i = 0; i < this.length; i++) {
            n[i] = this[i].__data__;
          }

          return n;
        }

        var o = [],
            a = void 0;

        for (a = 0; a < this.length && a < e.length; a++) {
          this[a].__data__ = typeof r === "function" ? r(e[a], a) : e[a];
          o.push(this[a]);
        }

        var f = k(o);
        f.__enter__ = [];

        for (; a < e.length; a++) {
          f.__enter__.push(typeof r === "function" ? r(e[a], a) : e[a]);
        }

        f.__exit__ = [];

        for (; a < this.length; a++) {
          f.__exit__.push(this[a]);
        }

        return f;
      };

      var mt = function t(e, r) {
        if (!this.__enter__ || this.__enter__.constructor !== Array) throw new Error("Not a data node object to be balanced!");
        var n = [];

        for (var i = 0; i < this.__enter__.length; i++) {
          n[i] = T(e, r);
          n[i].__data__ = this.__enter__[i];
        }

        delete this.__enter__;
        return k(n);
      };

      var bt = function t() {
        if (!this.__exit__ || this.__exit__.constructor !== Array) throw new Error("Not a data node object to be balanced!");
        var e = k(this.__exit__);
        delete this.__exit__;
        return e;
      };

      var xt = function t(e) {
        for (var r = 0; r < this.length; r++) {
          e(this[r].__data__, r, k(this[r]));
        }

        return this;
      };

      function _t(t, e, r, n, i, o, a) {
        if (e > Math.PI * 2) e = Math.PI * 2;
        if (e < -Math.PI * 2) e = -Math.PI * 2;

        if (e < 0) {
          t += e;
          e *= -1;
        }

        var f = [],
            u = void 0;
        u = E(0, 0, t, i, 0);
        f[0] = u[0];
        f[1] = u[1];
        u = E(0, 0, e, u[0], u[1]);
        f[2] = u[0];
        f[3] = u[1];
        u = E(0, 0, t, o, 0);
        f[4] = u[0];
        f[5] = u[1];
        u = E(0, 0, e, u[0], u[1]);
        f[6] = u[0];
        f[7] = u[1];
        a(t, t + e, f[0] + r, f[1] + n, f[4] + r, f[5] + n, f[2] + r, f[3] + n, f[6] + r, f[7] + n, (o - i) * .5);
      }

      var Tt = function t(e, r, n, i, o) {
        e.beginPath();
        e.translate(n, i);
        e.rotate(o);
        e.font = r["font-size"] + "px " + r["font-family"];
        return e;
      };

      var kt = function t(c, d, h, v, p, g, e, r) {
        if (r >= Math.PI * 2 || r <= -Math.PI * 2) {
          r = Math.PI * 2;
        }

        _t(e, r, h, v, p, g, function (t, e, r, n, i, o, a, f, u, l, s) {
          if (s < 0) s = -s;
          c.beginPath();
          c.moveTo(r, n);
          c.arc(h, v, p, t, e, false);
          if (d["arc-end-cap"] != "round") c.lineTo(u, l);else c.arc((a + u) * .5, (f + l) * .5, s, e - Math.PI, e, true);
          c.arc(h, v, g, e, t, true);
          if (d["arc-start-cap"] != "round") c.lineTo(r, n);else c.arc((r + i) * .5, (n + o) * .5, s, t, t - Math.PI, true);
        });

        c.closePath();
        return c;
      };

      var Et = function t(e, r, n, i) {
        e.beginPath();
        e.moveTo(r + i, n);
        e.arc(r, n, i, 0, Math.PI * 2);
        return e;
      };

      var Mt = function t(e, r, n, i, o) {
        e.beginPath();
        e.rect(r, n, i, o);
        return e;
      };

      var Ct = function t(e, r, n, i, o) {
        var a = e.createLinearGradient(r, n, i, o);
        var f = {
          value: function t() {
            return a;
          },
          addColorStop: function t(e, r) {
            a.addColorStop(e, r);
            return f;
          }
        };
        return f;
      };

      var Pt = function t(e, r, n, i) {
        var o = e.createRadialGradient(r, n, 0, r, n, i);
        var a = {
          value: function t() {
            return o;
          },
          addColorStop: function t(e, r) {
            o.addColorStop(e, r);
            return a;
          }
        };
        return a;
      };

      function St(s) {
        var c = s.getContext("2d");
        var t = s.__image2D__layer__ == "yes";
        var e = t ? s.getAttribute("width") : s.clientWidth,
            r = t ? s.getAttribute("height") : s.clientHeight;

        if (e == 0 || r == 0) {
          console.warn("Canvas is hidden or size is zero!");

          if (s.__image2D__noLayer_getSize__ == "yes") {
            e = s.width / 2;
            r = s.height / 2;
          } else {
            e = s.width;
            r = s.height;
            s.__image2D__noLayer_getSize__ = "yes";
          }
        }

        s.style.width = e + "px";
        s.style.height = r + "px";
        s.setAttribute("width", e * 2);
        s.setAttribute("height", r * 2);
        c.scale(2, 2);
        c.textBaseline = "middle";
        c.textAlign = "left";
        var f = {
          "font-size": "16",
          "font-family": "sans-serif",
          "arc-start-cap": "butt",
          "arc-end-cap": "butt"
        };

        var n = function t(e, r) {
          if (e == "lineDash") {
            c.setLineDash(r);
          } else if (f[e]) {
            f[e] = r;
          } else {
            c[e] = r;
          }
        };

        var d = {
          config: function t() {
            if (arguments.length === 1) {
              if (_typeof$1(arguments[0]) !== "object") return c[arguments[0]];

              for (var e in arguments[0]) {
                n(e, arguments[0][e]);
              }
            } else if (arguments.length === 2) {
              n(arguments[0], arguments[1]);
            }

            return d;
          },
          fillText: function t(e, r, n, i) {
            c.save();
            Tt(c, f, r, n, i || 0).fillText(e, 0, 0);
            c.restore();
            return d;
          },
          strokeText: function t(e, r, n, i) {
            c.save();
            Tt(c, f, r, n, i || 0).strokeText(e, 0, 0);
            c.restore();
            return d;
          },
          fullText: function t(e, r, n, i) {
            c.save();
            Tt(c, f, r, n, i || 0);
            c.fillText(e, 0, 0);
            c.strokeText(e, 0, 0);
            c.restore();
            return d;
          },
          beginPath: function t() {
            c.beginPath();
            return d;
          },
          closePath: function t() {
            c.closePath();
            return d;
          },
          moveTo: function t(e, r) {
            c.moveTo(e, r);
            return d;
          },
          lineTo: function t(e, r) {
            c.lineTo(e, r);
            return d;
          },
          arc: function t(e, r, n, i, o) {
            c.arc(e, r, n, i, i + o, o < 0);
            return d;
          },
          fill: function t() {
            c.fill();
            return d;
          },
          stroke: function t() {
            c.stroke();
            return d;
          },
          full: function t() {
            c.fill();
            c.stroke();
            return d;
          },
          save: function t() {
            c.save();
            return d;
          },
          restore: function t() {
            c.restore();
            return d;
          },
          quadraticCurveTo: function t(e, r, n, i) {
            c.quadraticCurveTo(e, r, n, i);
            return d;
          },
          bezierCurveTo: function t(e, r, n, i, o, a) {
            c.bezierCurveTo(e, r, n, i, o, a);
            return d;
          },
          clearRect: function t(e, r, n, i) {
            c.clearRect(e || 0, r || 0, n || s.getAttribute("width") / 2, i || s.getAttribute("height") / 2);
            return d;
          },
          toDataURL: function t() {
            return s.toDataURL();
          },
          drawImage: function t(e, r, n, i, o, a, f, u, l) {
            r = r || 0;
            n = n || 0;
            a = a || 0;
            f = f || 0;
            u = u ? u * 2 : s.getAttribute("width");
            l = l ? l * 2 : s.getAttribute("height");

            if (e.nodeName == "CANVAS") {
              u = u / 2;
              l = l / 2;
              i = i ? i * 2 : s.getAttribute("width");
              o = o ? o * 2 : s.getAttribute("height");
            } else {
              i = (i || e.width) * 2;
              o = (o || e.height) * 2;
            }

            c.drawImage(e, r, n, i, o, a, f, u, l);
            return d;
          },
          fillArc: function t(e, r, n, i, o, a) {
            kt(c, f, e, r, n, i, o, a).fill();
            return d;
          },
          strokeArc: function t(e, r, n, i, o, a) {
            kt(c, f, e, r, n, i, o, a).stroke();
            return d;
          },
          fullArc: function t(e, r, n, i, o, a) {
            kt(c, f, e, r, n, i, o, a);
            c.fill();
            c.stroke();
            return d;
          },
          fillCircle: function t(e, r, n) {
            Et(c, e, r, n).fill();
            return d;
          },
          strokeCircle: function t(e, r, n) {
            Et(c, e, r, n).stroke();
            return d;
          },
          fullCircle: function t(e, r, n) {
            Et(c, e, r, n);
            c.fill();
            c.stroke();
            return d;
          },
          fillRect: function t(e, r, n, i) {
            Mt(c, e, r, n, i).fill();
            return d;
          },
          strokeRect: function t(e, r, n, i) {
            Mt(c, e, r, n, i).stroke();
            return d;
          },
          fullRect: function t(e, r, n, i) {
            Mt(c, e, r, n, i);
            c.fill();
            c.stroke();
            return d;
          },
          createLinearGradient: function t(e, r, n, i) {
            return Ct(c, e, r, n, i);
          },
          createRadialGradient: function t(e, r, n) {
            return Pt(c, e, r, n);
          },
          translate: function t(e, r) {
            c.translate(e, r);
            return d;
          },
          rotate: function t(e) {
            c.rotate(e);
            return d;
          },
          scale: function t(e, r) {
            r = r || e;
            c.scale(e, r);
            return d;
          }
        };
        return d;
      }

      function At(t, e) {
        if (t === "textAlign") {
          return {
            left: "start",
            right: "end",
            center: "middle"
          }[e] || e;
        }

        return e;
      }

      var Lt = function t(e, r, n, i, o) {
        if (!e || e.length <= 0 || e[0].nodeName.toLowerCase() !== "text") throw new Error("Need a <text> !");
        e.attr("dy", {
          top: r["font-size"] * .5,
          middle: 0,
          bottom: -r["font-size"] * .5
        }[r.textBaseline]).css({
          "text-anchor": r.textAlign,
          "dominant-baseline": "central",
          "font-size": r["font-size"] + "px",
          "font-family": r["font-family"]
        }).attr({
          x: n,
          y: i
        });
        return {
          transform: "rotate(" + o * 180 / Math.PI + "," + n + "," + i + ")"
        };
      };

      var Nt = function t(h, v, e, r, p, g, n, i) {
        if (i >= Math.PI * 1.999999 || i <= -Math.PI * 1.999999) {
          i = Math.PI * 1.999999;
        }

        if (!h || h.length <= 0 || h[0].nodeName.toLowerCase() !== "path") throw new Error("Need a <path> !");

        _t(n, i, e, r, p, g, function (t, e, r, n, i, o, a, f, u, l, s) {
          var c = e - t > Math.PI ? 1 : 0,
              d = "M" + r + " " + n;
          if (s < 0) s = -s;
          d += "A" + p + " " + p + " 0 " + c + " 1 " + a + " " + f;
          if (v["arc-end-cap"] != "round") d += "L" + u + " " + l;else d += "A" + s + " " + s + " " + " 0 1 0 " + u + " " + l;
          d += "A" + g + " " + g + " 0 " + c + " 0 " + i + " " + o;
          if (v["arc-start-cap"] != "round") d += "L" + r + " " + n;else d += "A" + s + " " + s + " " + " 0 1 0 " + r + " " + n;
          h.attr("d", d + "Z");
        });

        return h;
      };

      var jt = function t(e, r, n, i) {
        if (!e || e.length <= 0 || e[0].nodeName.toLowerCase() !== "circle") throw new Error("Need a <circle> !");
        e.attr({
          cx: r,
          cy: n,
          r: i
        });
        return e;
      };

      var Dt = function t(e, r) {
        if (!e || e.length <= 0 || e[0].nodeName.toLowerCase() !== "path") throw new Error("Need a <path> !");
        e.attr("d", r);
        return e;
      };

      var It = function t(e, r, n, i, o) {
        if (!e || e.length <= 0 || e[0].nodeName.toLowerCase() !== "rect") throw new Error("Need a <rect> !");

        if (o < 0) {
          o *= -1;
          n -= o;
        }

        if (i < 0) {
          i *= -1;
          r -= i;
        }

        e.attr({
          x: r,
          y: n,
          width: i,
          height: o
        });
        return e;
      };

      var Rt = function t(e) {
        var r = e.getElementsByTagName("defs");

        if (r.length <= 0) {
          r = [T("<defs>", "SVG")];
          e.appendChild(r[0]);
        }

        return r[0];
      };

      var Ft = function t(e, r, n, i, o, a) {
        var f = Rt(r);
        var u = "image2D-lg-" + new Date().valueOf() + "-" + Math.random();
        var l = T('<linearGradient id="' + u + '" x1="' + n + '%" y1="' + i + '%" x2="' + o + '%" y2="' + a + '%"></linearGradient>');
        f.appendChild(l);
        var s = {
          value: function t() {
            return "url(#" + u + ")";
          },
          addColorStop: function t(e, r) {
            l.appendChild(T('<stop offset="' + e * 100 + '%" style="stop-color:' + r + ';" />'));
            return s;
          }
        };
        return s;
      };

      var zt = function t(e, r, n, i, o) {
        var a = Rt(r);
        var f = "image2D-rg-" + new Date().valueOf() + "-" + Math.random();
        var u = T('<radialGradient id="' + f + '" cx="' + n + '%" cy="' + i + '%" r="' + o + '%"></radialGradient>');
        a.appendChild(u);
        var l = {
          value: function t() {
            return "url(#" + f + ")";
          },
          addColorStop: function t(e, r) {
            u.appendChild(T('<stop offset="' + e * 100 + '%" style="stop-color:' + r + ';" />'));
            return l;
          }
        };
        return l;
      };

      function Ht(o, t) {
        var f = void 0;
        if (t) f = k(t, o);
        var u = {
          fillStyle: "#000",
          strokeStyle: "#000",
          lineWidth: 1,
          textAlign: "start",
          textBaseline: "middle",
          "font-size": "16",
          "font-family": "sans-serif",
          "arc-start-cap": "butt",
          "arc-end-cap": "butt",
          lineDash: []
        };
        var l = "",
            s = [];
        var e = [],
            c = "";
        var d = {
          config: function t() {
            if (arguments.length === 1) {
              if (_typeof$1(arguments[0]) !== "object") return u[arguments[0]];

              for (var e in arguments[0]) {
                u[e] = At(e, arguments[0][e]);
              }
            } else if (arguments.length === 2) u[arguments[0]] = At(arguments[0], arguments[1]);

            return d;
          },
          bind: function t(e) {
            f = k(e, o);
            return d;
          },
          appendTo: function t(e) {
            f.appendTo(e || o, o);
            return d;
          },
          prependTo: function t(e) {
            f.prependTo(e || o, o);
            return d;
          },
          afterTo: function t(e) {
            f.afterTo(e || o, o);
            return d;
          },
          beforeTo: function t(e) {
            f.beforeTo(e || o, o);
            return d;
          },
          beginPath: function t() {
            l = "";
            s = [];
            return d;
          },
          closePath: function t() {
            l += "Z";
            return d;
          },
          moveTo: function t(e, r) {
            l += "M" + e + " " + r;
            s = [e, r];
            return d;
          },
          lineTo: function t(e, r) {
            l += (l == "" ? "M" : "L") + e + " " + r;
            s = [e, r];
            return d;
          },
          arc: function t(e, r, n, i, o) {
            var a = E(e, r, i, e + n, r);
            var f = E(e, r, i + o, e + n, r);
            i = i / Math.PI * 180;
            o = o / Math.PI * 180;

            if (l == "") {
              l += "M" + a[0] + "," + a[1];
            } else if (a[0] != s[0] || a[1] != s[1]) {
              l += "L" + a[0] + "," + a[1];
            }

            l += "A" + n + "," + n + " 0 " + (o > 180 || o < -180 ? 1 : 0) + "," + (o > 0 ? 1 : 0) + " " + f[0] + "," + f[1];
            return d;
          },
          fill: function t() {
            Dt(f, l).attr("transform", c).attr("fill", u.fillStyle);
            return d;
          },
          stroke: function t() {
            Dt(f, l).attr("transform", c).attr({
              "stroke-width": u.lineWidth,
              stroke: u.strokeStyle,
              fill: "none",
              "stroke-dasharray": u.lineDash.join(",")
            });
            return d;
          },
          full: function t() {
            Dt(f, l).attr("transform", c).attr({
              "stroke-width": u.lineWidth,
              stroke: u.strokeStyle,
              fill: u.fillStyle,
              "stroke-dasharray": u.lineDash.join(",")
            });
            return d;
          },
          save: function t() {
            e.push(c);
            return d;
          },
          restore: function t() {
            if (e.length > 0) c = e.pop();
            return d;
          },
          quadraticCurveTo: function t(e, r, n, i) {
            l += "Q" + e + " " + r + "," + n + " " + i;
            return d;
          },
          bezierCurveTo: function t(e, r, n, i, o, a) {
            l += "C" + e + " " + r + "," + n + " " + i + "," + o + " " + a;
            return d;
          },
          fillText: function t(e, r, n, i) {
            var o = Lt(f, u, r, n, i || 0);
            f.attr("transform", c + o.transform).attr("fill", u.fillStyle)[0].textContent = e;
            return d;
          },
          strokeText: function t(e, r, n, i) {
            var o = Lt(f, u, r, n, i || 0);
            f.attr("transform", c + o.transform).attr({
              stroke: u.strokeStyle,
              fill: "none",
              "stroke-dasharray": u.lineDash.join(",")
            })[0].textContent = e;
            return d;
          },
          fullText: function t(e, r, n, i) {
            var o = Lt(f, u, r, n, i || 0);
            f.attr("transform", c + o.transform).attr({
              stroke: u.strokeStyle,
              fill: u.fillStyle,
              "stroke-dasharray": u.lineDash.join(",")
            })[0].textContent = e;
            return d;
          },
          fillArc: function t(e, r, n, i, o, a) {
            Nt(f, u, e, r, n, i, o, a).attr("transform", c).attr("fill", u.fillStyle);
            return d;
          },
          strokeArc: function t(e, r, n, i, o, a) {
            Nt(f, u, e, r, n, i, o, a).attr("transform", c).attr({
              "stroke-width": u.lineWidth,
              stroke: u.strokeStyle,
              fill: "none",
              "stroke-dasharray": u.lineDash.join(",")
            });
            return d;
          },
          fullArc: function t(e, r, n, i, o, a) {
            Nt(f, u, e, r, n, i, o, a).attr("transform", c).attr({
              "stroke-width": u.lineWidth,
              stroke: u.strokeStyle,
              fill: u.fillStyle,
              "stroke-dasharray": u.lineDash.join(",")
            });
            return d;
          },
          fillCircle: function t(e, r, n) {
            jt(f, e, r, n).attr("transform", c).attr("fill", u.fillStyle);
            return d;
          },
          strokeCircle: function t(e, r, n) {
            jt(f, e, r, n).attr("transform", c).attr({
              "stroke-width": u.lineWidth,
              stroke: u.strokeStyle,
              fill: "none",
              "stroke-dasharray": u.lineDash.join(",")
            });
            return d;
          },
          fullCircle: function t(e, r, n) {
            jt(f, e, r, n).attr("transform", c).attr({
              "stroke-width": u.lineWidth,
              stroke: u.strokeStyle,
              fill: u.fillStyle,
              "stroke-dasharray": u.lineDash.join(",")
            });
            return d;
          },
          fillRect: function t(e, r, n, i) {
            It(f, e, r, n, i).attr("transform", c).attr("fill", u.fillStyle);
            return d;
          },
          strokeRect: function t(e, r, n, i) {
            It(f, e, r, n, i).attr("transform", c).attr({
              "stroke-width": u.lineWidth,
              stroke: u.strokeStyle,
              fill: "none",
              "stroke-dasharray": u.lineDash.join(",")
            });
            return d;
          },
          fullRect: function t(e, r, n, i) {
            It(f, e, r, n, i).attr("transform", c).attr({
              "stroke-width": u.lineWidth,
              stroke: u.strokeStyle,
              fill: u.fillStyle,
              "stroke-dasharray": u.lineDash.join(",")
            });
            return d;
          },
          createLinearGradient: function t(e, r, n, i) {
            return Ft(f, o, e, r, n, i);
          },
          createRadialGradient: function t(e, r, n) {
            return zt(f, o, e, r, n);
          },
          translate: function t(e, r) {
            c += " translate(" + e + "," + r + ")";
            return d;
          },
          rotate: function t(e) {
            c += " rotate(" + e / Math.PI * 180 + ")";
            return d;
          },
          scale: function t(e, r) {
            r = r || e;
            c += " scale(" + e + "," + r + ")";
            return d;
          }
        };
        return d;
      }

      function Bt() {
        if (!m(this[0])) throw new Error("Target empty!");
        var t = this[0],
            e = t.nodeName.toLowerCase();
        if (e === "canvas") return St(t);
        if (e === "svg") return Ht(t, arguments[0]);
        throw new Error("Painter is not a function!");
      }

      function Ot() {
        if (!m(this[0])) throw new Error("Target empty!");
        if (this[0].nodeName.toLowerCase() !== "canvas") throw new Error("Layer is not a function!");
        var r = this.painter(),
            n = {},
            i = [];
        var o = this[0].clientWidth,
            a = this[0].clientHeight;
        var f = {
          painter: function t(e) {
            if (!n[e]) {
              n[e] = {
                visible: true
              };
              n[e].canvas = document.createElement("canvas");
              n[e].canvas.setAttribute("width", o);
              n[e].canvas.setAttribute("height", a);
              n[e].canvas.__image2D__layer__ = "yes";
              n[e].painter = k(n[e].canvas).painter();
              i.push(e);
            }

            return n[e].painter;
          },
          "delete": function t(e) {
            for (var r = 0; r < i.length; r++) {
              if (i[r] === e) {
                i.splice(r, 1);
                break;
              }
            }

            delete n[e];
            return f;
          },
          update: function t() {
            r.clearRect(0, 0, o, a);
            r.save();

            for (var e = 0; e < i.length; e++) {
              if (n[i[e]].visible) r.drawImage(n[i[e]].canvas, 0, 0, o, a, 0, 0, o, a);
            }

            r.restore();
            return f;
          },
          hidden: function t(e) {
            n[e].visible = false;
            return f;
          },
          show: function t(e) {
            n[e].visible = true;
            return f;
          }
        };
        return f;
      }

      k.extend({
        treeLayout: p,
        pieLayout: y,
        Matrix4: A,
        rotate: E,
        move: d,
        scale: h,
        dot: v,
        animation: G,
        cardinal: $,
        formatColor: q,
        getRandomColors: U,
        stopPropagation: Q,
        preventDefault: J,
        map: it
      });
      k.prototype.extend({
        appendTo: ot,
        prependTo: at,
        afterTo: ft,
        beforeTo: ut,
        remove: lt,
        filter: st,
        text: ct,
        html: dt,
        size: ht,
        css: vt,
        attr: gt,
        datum: yt,
        data: wt,
        enter: mt,
        exit: bt,
        loop: xt,
        bind: X,
        unbind: Y,
        position: Z,
        painter: Bt,
        layer: Ot
      });
      k.fn = k.prototype;

      if (( _typeof$1(module)) === "object" && _typeof$1(module.exports) === "object") {
        module.exports = k;
      } else {
        var Wt = window.image2D,
            Gt = window.$$;

        k.noConflict = function (t) {
          if (window.$$ === k) {
            window.$$ = Gt;
          }

          if (t && window.image2D === k) {
            window.image2D = Wt;
          }

          return k;
        };

        window.image2D = window.$$ = k;
      }
    })();
  });

  var toString = Object.prototype.toString;
  /**
   * 获取一个值的类型字符串[object type]
   *
   * @private
   * @param {*} value 需要返回类型的值
   * @returns {string} 返回类型字符串
   */

  function getType (value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }

    return toString.call(value);
  }

  /**
   * 判断一个值是不是Object。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Object返回true，否则返回false
   */
  function isObject (value) {
    var type = _typeof(value);

    return value != null && (type === 'object' || type === 'function');
  }

  /**
   * 判断一个值是不是Function。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Function返回true，否则返回false
   */

  function isFunction (value) {
    if (!isObject(value)) {
      return false;
    }

    var type = getType(value);
    return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object Proxy]';
  }

  // 判断是否是一个合法的方法名或变量名
  function isValidKey (key) {
    // 判断是不是_或者$开头的
    // 这两个内部预留了
    if (/^[_$]/.test(key)) {
      console.error('[LookView warn]: The beginning of _ or $ is not allowed：' + key);
    }
  }

  function initMixin(LookView) {
    LookView.prototype.$$init = function (options) {
      this.__options = options; // 需要双向绑定的数据

      this.__data = isFunction(options.data) ? options.data() : options.data; // 记录状态

      this._isMounted = false;
      this._isDestroyed = false; // 挂载方法

      for (var key in options.methods) {
        // 由于key的特殊性，注册前需要进行校验
        isValidKey(key);
        this[key] = options.methods[key];
      } // 挂载数据


      for (var _key in this.__data) {
        // 数据的校验在监听的时候进行
        this[_key] = this.__data[_key];
      }

      return this;
    };
  }

  function lifecycleMixin(LookView) {
    // 生命周期调用钩子
    // 整个过程，进行到对应时期，都需要调用一下这里对应的钩子
    // 整合在一起的目的是方便维护
    LookView.prototype.$$lifecycle = function (callbackName) {
      // beforeCreate，对象创建前
      if (isFunction(callbackName)) {
        callbackName();
      } else {
        if ([// 对象创建完毕
        'created', // 对象和页面关联前、后
        'beforeMount', 'mounted', // 对象和页面解关联前、后
        'beforeUnmount', 'unmounted', // 数据改动前、后
        'beforeUpdate', 'updated', // 画布大小改变导致的重绘前、后
        'beforeResize', 'resized', // 销毁组件
        'beforeDestroy', 'destroyed'].indexOf(callbackName) > -1 && isFunction(this.__options[callbackName])) {
          this.__options[callbackName].call(this);
        }
      }

      return this;
    };
  }

  /**
   * 判断一个值是不是一个朴素的'对象'
   *
   * @private
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是朴素的'对象'返回true，否则返回false
   */

  function isPlainObject (value) {
    if (value === null || _typeof(value) !== 'object' || getType(value) != '[object Object]') {
      return false;
    } // 如果原型为null


    if (Object.getPrototypeOf(value) === null) {
      return true;
    }

    var proto = value;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(value) === proto;
  }

  /**
   * 判断一个值是不是结点元素。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是结点元素返回true，否则返回false
   */

  function isElement (value) {
    return value !== null && _typeof(value) === 'object' && (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11) && !isPlainObject(value);
  }

  // 圆弧
  function arc (painter, attr) {
    // 配置画笔
    painter.config({
      "fillStyle": attr['fill-color'] || attr.color || '#00',
      "strokeStyle": attr['stroke-color'] || attr.color || '#00',
      "lineWidth": attr['width'] || 1,
      "lineDash": attr['dash'] || []
    }); // 绘制

    switch (attr.type) {
      case "stroke":
        {
          painter.strokeArc(attr.cx, attr.cy, attr.radius1 || 0, attr.radius2 || 0, attr.begin || 0, attr.value);
          break;
        }

      case "fill":
        {
          painter.fillArc(attr.cx, attr.cy, attr.radius1 || 0, attr.radius2 || 0, attr.begin || 0, attr.value);
          break;
        }

      default:
        {
          painter.fullArc(attr.cx, attr.cy, attr.radius1 || 0, attr.radius2 || 0, attr.begin || 0, attr.value);
        }
    }
  }

  // 圆
  function circle (painter, attr) {}

  // 连线
  function line (painter, attr) {}

  // 矩形
  function rect (painter, attr) {}

  // 文字
  function text (painter, attr) {}

  // 圆弧组合
  function arcs (painter, attr) {}

  // 圆组合
  function circles (painter, attr) {}

  // 极坐标刻度尺
  function polarRuler (painter, attr) {}

  // 矩形组合
  function rects (painter, attr) {}

  // 刻度尺
  function ruler (painter, attr) {}

  // 基本图形
  function seriesMixin(LookView) {
    LookView.prototype.__series = {
      arc: arc,
      circle: circle,
      line: line,
      rect: rect,
      text: text,
      arcs: arcs,
      circles: circles,
      "polar-ruler": polarRuler,
      rects: rects,
      ruler: ruler
    };
  }

  /**
   * 判断一个值是不是文本结点。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是结点元素返回true，否则返回false
   */

  function isText (value) {
    return value !== null && _typeof(value) === 'object' && value.nodeType === 3 && !isPlainObject(value);
  }

  // 这里是基于浏览器的解析能力，因此可能存在浏览器兼容问题
  // loader版本的独立于浏览器，因此更加稳定
  // 为了兼容各种情况，我们还是提供了动态模板解析能力

  /**
   * 
   * 返回的格式如下（oader返回的格式应该和这里保持一致）：
   * 
   * [{
   *  series:"",
   *  attr:{
   *    key1:{
   *       value:"",
   *       type:"",// 默认string
   *    },
   *    key2:{
   *    },
   *    ...
   * },
   *  children:[]
   * },{}]
   * 
   */

  function compileTemplate (template) {
    var node = document.createElement('div');
    node.innerHTML = template;
    return function doit(node) {
      var resultData = [],
          nodeList = node.childNodes;

      for (var i = 0; i < nodeList.length; i++) {
        // 如果是文本结点
        if (isText(nodeList[i])) {
          // 对于空格，tab等空白文字结点，我们认为可以直接剔除
          if (!/^[\x20\t\n\r]+$/.test(nodeList[i].textContent)) {
            resultData.push(nodeList[i].textContent);
          }
        } // 如果是结点
        else if (isElement(nodeList[i])) {
            var attrs = {};

            for (var j = 0; j < nodeList[i].attributes.length; j++) {
              var key_type = (nodeList[i].attributes[j].nodeName + "").split('::');
              attrs[key_type[0]] = {
                value: nodeList[i].attributes[j].nodeValue,
                type: key_type[1] || "default"
              };
            }

            resultData.push({
              series: (nodeList[i].nodeName + "").toLowerCase(),
              attr: attrs,
              children: doit(nodeList[i])
            });
          }
      }

      return resultData;
    }(node);
  }

  /**
   * 判断一个值是不是symbol。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是symbol返回true，否则返回false
   */

  function isSymbol (value) {
    var type = _typeof(value);

    return type === 'symbol' || type === 'object' && value !== null && getType(value) === '[object Symbol]';
  }

  /**
   * 判断是不是一个对象上的属性
   *
   * @private
   * @param {Array|string} path 属性或路径
   * @param {Object} object 操作的对象
   * @returns {boolean} 如果是返回true，否则返回false
   */

  function isKey (value, object) {
    if (Array.isArray(value)) {
      return false;
    }

    var type = _typeof(value);

    if (type == 'number' || type == 'boolean' || value == null || isSymbol(value)) {
      return true;
    }

    return object !== null && value in Object(object) || /^\w*$/.test(value);
  }

  /**
   * 把字符串路径变成简单的数组
   *
   * @private
   * @param {string} value 需要解析的路径字符串
   * @returns {Array} 返回属性数组
   */
  function stringToPath (value) {
    return value.replace(/\[/g, ".").replace(/\]/g, '').replace(/"/g, "").replace(/'/g, "").split('.');
  }

  /**
   * 把属性字符串统一变成数组（数组每个值是一个简单的属性）
   *
   * @private
   * @param {Array|string} path 属性或路径
   * @param {Object} object 操作的对象
   * @returns {Array} 返回属性数组
   */

  function castPath (value, object) {
    if (Array.isArray(value)) {
      return value;
    }

    return isKey(value, object) ? [value] : stringToPath(value);
  }

  var INFINITY = 1 / 0;
  /**
   * 如果value不是字符串或者symbol，就变成字符串
   *
   * @private
   * @param {*} value 需要检查的值
   * @returns {string|symbol} 返回key
   */

  function toKey (value) {
    if (typeof value === 'string' || isSymbol(value)) {
      return value;
    }

    var result = "".concat(value);
    return result === '0' && 1 / value === -INFINITY ? "-0" : result;
  }

  /**
   * 获取一个对象属性值的基础方法，没有默认值。
   *
   * @private
   * @param {Object} object 操作的对象
   * @param {Array|string} path 属性或路径
   * @returns {*} 返回设置的结果
   */

  function baseGet (object, path) {
    // 统一把路径变成['a','b','c',...]这种
    path = castPath(path, object);
    var index = 0;

    for (; index < path.length && object !== null; index++) {
      object = object[toKey(path[index])];
    }

    return index && index === path.length ? object : undefined;
  }

  /**
   * 获取object的属性path的值。如果返回的值是undefined，
   * defaultValue就作为返回值返回。
   *
   * @since V0.1.0
   * @public
   * @param {Object} object 查询的对象
   * @param {Array|string} path 对象上查询值的路径
   * @param {*} defaultValue 值为undefined的时候的返回值
   * @returns {*} 返回结果
   * @example
   *
   * var object={a:{b:[1,2,3]}};
   *
   * get(object,'a.b') or
   * get(object,['a','b'])
   * // [1,2,3]
   *
   * get(object,'a["b"][1]')
   * // 2
   *
   * get(object,'a.c','default')
   * // 'default'
   */

  function get (object, path, defaultValue) {
    var result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  function painterMixin(LookView) {
    // 绘制方法
    LookView.prototype.$$painter = function () {
      var _this = this;

      // 后期可以通过此添加一些额外的辅助数据，目前没有考虑好，因此预留
      var nouse = {
        "info": "预留"
      };

      this.__renderSeries.forEach(function (item) {
        var attr = {};

        for (var key in item.attr) {
          attr[key] = _this.$$calcValue(item.attr[key]);
        }

        _this.__series[item.series].call(nouse, _this.__painter, attr);
      });

      return this;
    };
    /**
     * --------------------------
     * 下面是对外暴露的接口
     */
    // 画布大小改变调用的重绘方法


    LookView.prototype.$updateByResize = function (__notPainter) {
      this.$$lifecycle('beforeResize'); // 和别的绘图方法相比，我们唯一需要额外处理的是画布大小相关的内容

      var size = image2D_min(this.__el).size('content'); // 设置画布大小

      this.__canvas.attr({
        width: size.width,
        height: size.height
      });

      this.__painter = this.__canvas.painter(); // 部分数据的计算依赖尺寸，因此这里需要重新初始化

      this.$$initValue(size);
      if (!__notPainter) this.$$painter();
      this.$$lifecycle('resized');
      return this;
    }; // 数据改变调用的重绘方法


    LookView.prototype.$updateByData = function (__notPainter) {
      var renderSeries = [],
          that = this;

      (function doit(renderArray) {
        for (var i = 0; i < renderArray.length; i++) {
          // 【指令】l-if="flag"
          if ('l-if' in renderArray[i].attr) {
            if (!get(that, renderArray[i].attr['l-if'].value)) {
              continue;
            }
          }

          var render = {
            series: renderArray[i].series,
            attr: {}
          };

          for (var key in renderArray[i].attr) {
            // 【指令】l-bind:xxx="xxx"
            if (/^l\-bind\:/.test(key)) {
              render.attr[key.replace(/^l\-bind\:/, '')] = {
                value: get(that, renderArray[i].attr[key].value),
                type: renderArray[i].attr[key].type
              };
            } // 普通属性
            else {
                render.attr[key] = {
                  value: renderArray[i].attr[key].value,
                  type: renderArray[i].attr[key].type
                };
              }
          } // 说明只是用来包裹的组


          if (renderArray[i].series == 'group') {
            doit(renderArray[i].children);
          } // 默认认为是普通的图形
          else {
              renderSeries.push(render);
            }
        }
      })(this.__render); // 数据的改变应该有过渡动画
      // 目前没有支持，后期考虑添加


      this.__renderSeries = renderSeries;
      if (!__notPainter) this.$$painter();
      return this;
    }; // 初始化调用的绘制方法


    LookView.prototype.$updateView = function () {
      this // 初始化一些参数
      .$updateByResize(true).$updateByData(true) // 绘制
      .$$painter();
      return this;
    };
  }

  function valueMixin(LookView) {
    var w, h, min, max;

    LookView.prototype.$$initValue = function (size) {
      w = size.width * 0.01;
      h = size.height * 0.01;
      min = w > h ? h : w;
      max = w > h ? w : h;
      return this;
    }; // 针对特殊内心提供前置（交付给具体的绘图方法前）的数据计算方法


    LookView.prototype.$$calcValue = function (oralValue) {
      var doFun = {
        // 数字类型
        "number": function number(value) {
          value = (value + " ").trim();

          if (/w$/.test(value)) {
            return (0 - -value.replace('w', '')) * w;
          } else if (/h$/.test(value)) {
            return (0 - -value.replace('h', '')) * h;
          } else if (/min$/.test(value)) {
            return (0 - -value.replace('min', '')) * min;
          } else if (/max$/.test(value)) {
            return (0 - -value.replace('max', '')) * max;
          } else if (/pi$/.test(value)) {
            return (0 - -value.replace('pi', '')) * Math.PI;
          } else if (/deg$/.test(value)) {
            return (0 - -value.replace('deg', '')) / 180 * Math.PI;
          } else {
            return 0 - -value;
          }
        }
      }[oralValue.type];

      if (isFunction(doFun)) {
        return doFun(oralValue.value);
      } else {
        return oralValue.value;
      }
    };
  }

  function watcher (that) {
    var _loop = function _loop(key) {
      // 由于key的特殊性，注册前需要进行校验
      isValidKey(key);

      if (isFunction(that[key])) {
        console.error('[LookView warn]: Data property "' + key + '" has already been defined as a Method.');
      }

      var value = that.__data[key];
      that[key] = value; // 针对data进行拦截，后续对data的数据添加不会自动监听了
      // this._data的数据是初始化以后的，后续保持不变，方便组件被重新使用（可能的设计，当前预留一些余地）
      // 当前对象数据会和方法一样直接挂载在根节点

      Object.defineProperty(that, key, {
        get: function get() {
          return value;
        },
        set: function set(newValue) {
          value = newValue;
          that.$$lifecycle('beforeUpdate'); // 数据改变，触发更新

          if (that._isMounted && !this._isDestroyed) that.$updateByData();
          that.$$lifecycle('updated');
        }
      });
    };

    for (var key in that.__data) {
      _loop(key);
    }
  }

  function LookView(options) {
    if (!(this instanceof LookView)) {
      console.error('[LookView warn]: LookView is a constructor and should be called with the `new` keyword');
    }

    this.$$lifecycle(options.beforeCreate); // 创建对象

    this.$$init(options);
    this.$$lifecycle('created'); // 对象创建好了以后，启动监听

    watcher(this); // 这里的登记是为了后续重新挂载的时候判断是否需要重置render

    this.__renderFlag = !!options.render || !!options.template;

    if (!!options.render) {
      this.__render = options.render;
    } else if (!!options.template) {
      this.__render = compileTemplate(options.template);
    } // 如果初始化创建的时候没有传递el
    // 表示开始的时候不需要挂载
    // 可以后续主动挂载


    if (isElement(options.el)) {
      // 挂载
      this.$mount(options.el, true);
    }
  }

  initMixin(LookView);
  lifecycleMixin(LookView);
  seriesMixin(LookView);
  painterMixin(LookView);
  valueMixin(LookView);

  // 监听画布大小改变
  function resize (that) {
    var canRun = true; // 一个延迟执行函数

    var throttle = function throttle(callback, time) {
      if (!canRun) return;
      canRun = false;
      setTimeout(function () {
        callback.call(that);
        canRun = true;
      }, time);
    }; // 创建监听对象


    if (!that.__resizeObserver) {
      that.__resizeObserver = new ResizeObserver(function () {
        throttle(that.$updateByResize, 1000);
      });
    } // 监听


    that.__resizeObserver.observe(that.__el);
  }

  // 这样挂载了，才会真的绘制

  LookView.prototype.$mount = function (el, __isFocus) {
    if (this._isDestroyed) {
      console.error('[LookView warn]: The object has been destroyed!');
      return;
    }

    this.__el = el;

    if (this._isMounted) {
      console.error('[LookView warn]: The object is already mounted!');
      return;
    }

    if (!__isFocus && !isElement(el)) {
      console.error('[LookView warn]: Mount node does not exist!');
      return;
    }

    this.$$lifecycle('beforeMount'); // 如果我们没有在初始化对象的时候传递render（template也算传递了）
    // 那么我们在每次挂载的时候都会使用挂载地的内容进行组合

    if (!this.__renderFlag) {
      this.__render = compileTemplate(el.innerHTML);
    } // 初始化添加画布


    el.innerHTML = '';
    this.__canvas = image2D_min('<canvas>非常抱歉，您的浏览器不支持canvas!</canvas>').appendTo(el); // 绘制

    this.$updateView(); // 挂载后以后，启动画布大小监听

    resize(this);
    this._isMounted = true;
    this.$$lifecycle('mounted');
    return this;
  }; // 解挂的意思是LookView对象和页面解除关联
  // 因此，后续绘制会停止，不过计算不会
  // 因此，后续你可以重新挂载


  LookView.prototype.$unmount = function () {
    if (this._isDestroyed) {
      console.error('[LookView warn]: The object has been destroyed!');
      return;
    }

    if (!this._isMounted) {
      console.error('[LookView warn]: Object not mounted!');
      return;
    }

    this.$$lifecycle('beforeUnmount'); // 解除对画布大小改变的监听

    this.__resizeObserver.disconnect();

    this._isMounted = false;
    this.$$lifecycle('unmounted');
    return this;
  }; // 彻底销毁资源，无法再重新挂载
  // 主要是为了释放一些内置资源


  LookView.prototype.$destory = function () {
    if (this._isDestroyed) {
      console.error('[LookView warn]: The object has been destroyed!');
      return;
    } // 先解除绑定


    if (this._isMounted) this.$unmount();
    this.$$lifecycle('beforeDestroy'); // 删除监听对象

    if (this.__resizeObserver) delete this.__resizeObserver;
    this._isDestroyed = true;
    this.$$lifecycle('destroyed');
    return this;
  }; // 对外暴露调用接口


  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = {
      LookView: LookView,
      image2D: image2D_min,
      $$: image2D_min
    };
  } else {
    window.LookView = LookView;
    window.image2D = image2D_min;
    window.$$ = image2D_min;
  }

}());
