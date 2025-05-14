/* { "version": "1", "hash": "MEQCIBcd2Vq+7/ZxFZ2SdVh5wq92irIJziB0z/RQIAw1M0X3AiA6N+wFYxr6WdhaIQeyiwlzxNfmplxKLqCSxcLsoPwRmA==" } */
/* https://hcaptcha.com/license */
!function() {
    "use strict";
    function e(e) {
        var t = this.constructor;
        return this.then((function(n) {
            return t.resolve(e()).then((function() {
                return n
            }
            ))
        }
        ), (function(n) {
            return t.resolve(e()).then((function() {
                return t.reject(n)
            }
            ))
        }
        ))
    }
    function t(e) {
        return new this((function(t, n) {
            if (!e || "undefined" == typeof e.length)
                return n(new TypeError(typeof e + " " + e + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
            var r = Array.prototype.slice.call(e);
            if (0 === r.length)
                return t([]);
            var i = r.length;
            function o(e, n) {
                if (n && ("object" == typeof n || "function" == typeof n)) {
                    var a = n.then;
                    if ("function" == typeof a)
                        return void a.call(n, (function(t) {
                            o(e, t)
                        }
                        ), (function(n) {
                            r[e] = {
                                status: "rejected",
                                reason: n
                            },
                            0 == --i && t(r)
                        }
                        ))
                }
                r[e] = {
                    status: "fulfilled",
                    value: n
                },
                0 == --i && t(r)
            }
            for (var a = 0; a < r.length; a++)
                o(a, r[a])
        }
        ))
    }
    var n = setTimeout
      , r = "undefined" != typeof setImmediate ? setImmediate : null;
    function i(e) {
        return Boolean(e && "undefined" != typeof e.length)
    }
    function o() {}
    function a(e) {
        if (!(this instanceof a))
            throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof e)
            throw new TypeError("not a function");
        this._state = 0,
        this._handled = !1,
        this._value = undefined,
        this._deferreds = [],
        p(e, this)
    }
    function s(e, t) {
        for (; 3 === e._state; )
            e = e._value;
        0 !== e._state ? (e._handled = !0,
        a._immediateFn((function() {
            var n = 1 === e._state ? t.onFulfilled : t.onRejected;
            if (null !== n) {
                var r;
                try {
                    r = n(e._value)
                } catch (i) {
                    return void l(t.promise, i)
                }
                c(t.promise, r)
            } else
                (1 === e._state ? c : l)(t.promise, e._value)
        }
        ))) : e._deferreds.push(t)
    }
    function c(e, t) {
        try {
            if (t === e)
                throw new TypeError("A promise cannot be resolved with itself.");
            if (t && ("object" == typeof t || "function" == typeof t)) {
                var n = t.then;
                if (t instanceof a)
                    return e._state = 3,
                    e._value = t,
                    void u(e);
                if ("function" == typeof n)
                    return void p((r = n,
                    i = t,
                    function() {
                        r.apply(i, arguments)
                    }
                    ), e)
            }
            e._state = 1,
            e._value = t,
            u(e)
        } catch (o) {
            l(e, o)
        }
        var r, i
    }
    function l(e, t) {
        e._state = 2,
        e._value = t,
        u(e)
    }
    function u(e) {
        2 === e._state && 0 === e._deferreds.length && a._immediateFn((function() {
            e._handled || a._unhandledRejectionFn(e._value)
        }
        ));
        for (var t = 0, n = e._deferreds.length; t < n; t++)
            s(e, e._deferreds[t]);
        e._deferreds = null
    }
    function h(e, t, n) {
        this.onFulfilled = "function" == typeof e ? e : null,
        this.onRejected = "function" == typeof t ? t : null,
        this.promise = n
    }
    function p(e, t) {
        var n = !1;
        try {
            e((function(e) {
                n || (n = !0,
                c(t, e))
            }
            ), (function(e) {
                n || (n = !0,
                l(t, e))
            }
            ))
        } catch (r) {
            if (n)
                return;
            n = !0,
            l(t, r)
        }
    }
    a.prototype["catch"] = function(e) {
        return this.then(null, e)
    }
    ,
    a.prototype.then = function(e, t) {
        var n = new this.constructor(o);
        return s(this, new h(e,t,n)),
        n
    }
    ,
    a.prototype["finally"] = e,
    a.all = function(e) {
        return new a((function(t, n) {
            if (!i(e))
                return n(new TypeError("Promise.all accepts an array"));
            var r = Array.prototype.slice.call(e);
            if (0 === r.length)
                return t([]);
            var o = r.length;
            function a(e, i) {
                try {
                    if (i && ("object" == typeof i || "function" == typeof i)) {
                        var s = i.then;
                        if ("function" == typeof s)
                            return void s.call(i, (function(t) {
                                a(e, t)
                            }
                            ), n)
                    }
                    r[e] = i,
                    0 == --o && t(r)
                } catch (c) {
                    n(c)
                }
            }
            for (var s = 0; s < r.length; s++)
                a(s, r[s])
        }
        ))
    }
    ,
    a.allSettled = t,
    a.resolve = function(e) {
        return e && "object" == typeof e && e.constructor === a ? e : new a((function(t) {
            t(e)
        }
        ))
    }
    ,
    a.reject = function(e) {
        return new a((function(t, n) {
            n(e)
        }
        ))
    }
    ,
    a.race = function(e) {
        return new a((function(t, n) {
            if (!i(e))
                return n(new TypeError("Promise.race accepts an array"));
            for (var r = 0, o = e.length; r < o; r++)
                a.resolve(e[r]).then(t, n)
        }
        ))
    }
    ,
    a._immediateFn = "function" == typeof r && function(e) {
        r(e)
    }
    || function(e) {
        n(e, 0)
    }
    ,
    a._unhandledRejectionFn = function(e) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
    }
    ;
    var d = function() {
        if ("undefined" != typeof self)
            return self;
        if ("undefined" != typeof window)
            return window;
        if ("undefined" != typeof global)
            return global;
        throw new Error("unable to locate global object")
    }();
    function f(e, t, n) {
        return t <= e && e <= n
    }
    function m(e) {
        if (e === undefined)
            return {};
        if (e === Object(e))
            return e;
        throw TypeError("Could not convert argument to dictionary")
    }
    "function" != typeof d.Promise ? d.Promise = a : (d.Promise.prototype["finally"] || (d.Promise.prototype["finally"] = e),
    d.Promise.allSettled || (d.Promise.allSettled = t));
    var g = function(e) {
        return e >= 0 && e <= 127
    }
      , y = -1;
    function v(e) {
        this.tokens = [].slice.call(e),
        this.tokens.reverse()
    }
    v.prototype = {
        endOfStream: function() {
            return !this.tokens.length
        },
        read: function() {
            return this.tokens.length ? this.tokens.pop() : y
        },
        prepend: function(e) {
            if (Array.isArray(e))
                for (var t = e; t.length; )
                    this.tokens.push(t.pop());
            else
                this.tokens.push(e)
        },
        push: function(e) {
            if (Array.isArray(e))
                for (var t = e; t.length; )
                    this.tokens.unshift(t.shift());
            else
                this.tokens.unshift(e)
        }
    };
    var w = -1;
    function b(e, t) {
        if (e)
            throw TypeError("Decoder error");
        return t || 65533
    }
    function _(e) {
        return e = String(e).trim().toLowerCase(),
        Object.prototype.hasOwnProperty.call(T, e) ? T[e] : null
    }
    var T = {};
    [{
        encodings: [{
            labels: ["unicode-1-1-utf-8", "utf-8", "utf8"],
            name: "UTF-8"
        }],
        heading: "The Encoding"
    }].forEach((function(e) {
        e.encodings.forEach((function(e) {
            e.labels.forEach((function(t) {
                T[t] = e
            }
            ))
        }
        ))
    }
    ));
    var V, k = {
        "UTF-8": function(e) {
            return new C(e)
        }
    }, E = {
        "UTF-8": function(e) {
            return new U(e)
        }
    }, S = "utf-8";
    function R(e, t) {
        if (!(this instanceof R))
            throw TypeError("Called as a function. Did you forget 'new'?");
        e = e !== undefined ? String(e) : S,
        t = m(t),
        this._encoding = null,
        this._decoder = null,
        this._ignoreBOM = !1,
        this._BOMseen = !1,
        this._error_mode = "replacement",
        this._do_not_flush = !1;
        var n = _(e);
        if (null === n || "replacement" === n.name)
            throw RangeError("Unknown encoding: " + e);
        if (!E[n.name])
            throw Error("Decoder not present. Did you forget to include encoding-indexes.js first?");
        var r = this;
        return r._encoding = n,
        t.fatal && (r._error_mode = "fatal"),
        t.ignoreBOM && (r._ignoreBOM = !0),
        Object.defineProperty || (this.encoding = r._encoding.name.toLowerCase(),
        this.fatal = "fatal" === r._error_mode,
        this.ignoreBOM = r._ignoreBOM),
        r
    }
    function x(e, t) {
        if (!(this instanceof x))
            throw TypeError("Called as a function. Did you forget 'new'?");
        t = m(t),
        this._encoding = null,
        this._encoder = null,
        this._do_not_flush = !1,
        this._fatal = t.fatal ? "fatal" : "replacement";
        var n = this;
        if (t.NONSTANDARD_allowLegacyEncoding) {
            var r = _(e = e !== undefined ? String(e) : S);
            if (null === r || "replacement" === r.name)
                throw RangeError("Unknown encoding: " + e);
            if (!k[r.name])
                throw Error("Encoder not present. Did you forget to include encoding-indexes.js first?");
            n._encoding = r
        } else
            n._encoding = _("utf-8");
        return Object.defineProperty || (this.encoding = n._encoding.name.toLowerCase()),
        n
    }
    function U(e) {
        var t = e.fatal
          , n = 0
          , r = 0
          , i = 0
          , o = 128
          , a = 191;
        this.handler = function(e, s) {
            if (s === y && 0 !== i)
                return i = 0,
                b(t);
            if (s === y)
                return w;
            if (0 === i) {
                if (f(s, 0, 127))
                    return s;
                if (f(s, 194, 223))
                    i = 1,
                    n = 31 & s;
                else if (f(s, 224, 239))
                    224 === s && (o = 160),
                    237 === s && (a = 159),
                    i = 2,
                    n = 15 & s;
                else {
                    if (!f(s, 240, 244))
                        return b(t);
                    240 === s && (o = 144),
                    244 === s && (a = 143),
                    i = 3,
                    n = 7 & s
                }
                return null
            }
            if (!f(s, o, a))
                return n = i = r = 0,
                o = 128,
                a = 191,
                e.prepend(s),
                b(t);
            if (o = 128,
            a = 191,
            n = n << 6 | 63 & s,
            (r += 1) !== i)
                return null;
            var c = n;
            return n = i = r = 0,
            c
        }
    }
    function C(e) {
        e.fatal;
        this.handler = function(e, t) {
            if (t === y)
                return w;
            if (g(t))
                return t;
            var n, r;
            f(t, 128, 2047) ? (n = 1,
            r = 192) : f(t, 2048, 65535) ? (n = 2,
            r = 224) : f(t, 65536, 1114111) && (n = 3,
            r = 240);
            for (var i = [(t >> 6 * n) + r]; n > 0; ) {
                var o = t >> 6 * (n - 1);
                i.push(128 | 63 & o),
                n -= 1
            }
            return i
        }
    }
    Object.defineProperty && (Object.defineProperty(R.prototype, "encoding", {
        get: function() {
            return this._encoding.name.toLowerCase()
        }
    }),
    Object.defineProperty(R.prototype, "fatal", {
        get: function() {
            return "fatal" === this._error_mode
        }
    }),
    Object.defineProperty(R.prototype, "ignoreBOM", {
        get: function() {
            return this._ignoreBOM
        }
    })),
    R.prototype.decode = function(e, t) {
        var n;
        n = "object" == typeof e && e instanceof ArrayBuffer ? new Uint8Array(e) : "object" == typeof e && "buffer"in e && e.buffer instanceof ArrayBuffer ? new Uint8Array(e.buffer,e.byteOffset,e.byteLength) : new Uint8Array(0),
        t = m(t),
        this._do_not_flush || (this._decoder = E[this._encoding.name]({
            fatal: "fatal" === this._error_mode
        }),
        this._BOMseen = !1),
        this._do_not_flush = Boolean(t.stream);
        for (var r, i = new v(n), o = []; ; ) {
            var a = i.read();
            if (a === y)
                break;
            if ((r = this._decoder.handler(i, a)) === w)
                break;
            null !== r && (Array.isArray(r) ? o.push.apply(o, r) : o.push(r))
        }
        if (!this._do_not_flush) {
            do {
                if ((r = this._decoder.handler(i, i.read())) === w)
                    break;
                null !== r && (Array.isArray(r) ? o.push.apply(o, r) : o.push(r))
            } while (!i.endOfStream());
            this._decoder = null
        }
        return function(e) {
            var t, n;
            return t = ["UTF-8", "UTF-16LE", "UTF-16BE"],
            n = this._encoding.name,
            -1 === t.indexOf(n) || this._ignoreBOM || this._BOMseen || (e.length > 0 && 65279 === e[0] ? (this._BOMseen = !0,
            e.shift()) : e.length > 0 && (this._BOMseen = !0)),
            function(e) {
                for (var t = "", n = 0; n < e.length; ++n) {
                    var r = e[n];
                    r <= 65535 ? t += String.fromCharCode(r) : (r -= 65536,
                    t += String.fromCharCode(55296 + (r >> 10), 56320 + (1023 & r)))
                }
                return t
            }(e)
        }
        .call(this, o)
    }
    ,
    Object.defineProperty && Object.defineProperty(x.prototype, "encoding", {
        get: function() {
            return this._encoding.name.toLowerCase()
        }
    }),
    x.prototype.encode = function(e, t) {
        e = e === undefined ? "" : String(e),
        t = m(t),
        this._do_not_flush || (this._encoder = k[this._encoding.name]({
            fatal: "fatal" === this._fatal
        })),
        this._do_not_flush = Boolean(t.stream);
        for (var n, r = new v(function(e) {
            for (var t = String(e), n = t.length, r = 0, i = []; r < n; ) {
                var o = t.charCodeAt(r);
                if (o < 55296 || o > 57343)
                    i.push(o);
                else if (o >= 56320 && o <= 57343)
                    i.push(65533);
                else if (o >= 55296 && o <= 56319)
                    if (r === n - 1)
                        i.push(65533);
                    else {
                        var a = t.charCodeAt(r + 1);
                        if (a >= 56320 && a <= 57343) {
                            var s = 1023 & o
                              , c = 1023 & a;
                            i.push(65536 + (s << 10) + c),
                            r += 1
                        } else
                            i.push(65533)
                    }
                r += 1
            }
            return i
        }(e)), i = []; ; ) {
            var o = r.read();
            if (o === y)
                break;
            if ((n = this._encoder.handler(r, o)) === w)
                break;
            Array.isArray(n) ? i.push.apply(i, n) : i.push(n)
        }
        if (!this._do_not_flush) {
            for (; (n = this._encoder.handler(r, r.read())) !== w; )
                Array.isArray(n) ? i.push.apply(i, n) : i.push(n);
            this._encoder = null
        }
        return new Uint8Array(i)
    }
    ,
    window.TextDecoder || (window.TextDecoder = R),
    window.TextEncoder || (window.TextEncoder = x),
    function(e) {
        if ("function" != typeof Promise)
            throw "Promise support required";
        var t = e.crypto || e.msCrypto;
        if (t) {
            var n = t.subtle || t.webkitSubtle;
            if (n) {
                var r = e.Crypto || t.constructor || Object
                  , i = e.SubtleCrypto || n.constructor || Object
                  , o = (e.CryptoKey || e.Key,
                e.navigator.userAgent.indexOf("Edge/") > -1)
                  , a = !!e.msCrypto && !o
                  , s = !t.subtle && !!t.webkitSubtle;
                if (a || s) {
                    var c = {
                        KoZIhvcNAQEB: "1.2.840.113549.1.1.1"
                    }
                      , l = {
                        "1.2.840.113549.1.1.1": "KoZIhvcNAQEB"
                    };
                    if (["generateKey", "importKey", "unwrapKey"].forEach((function(e) {
                        var r = n[e];
                        n[e] = function(i, o, c) {
                            var l, u, h, f, b = [].slice.call(arguments);
                            switch (e) {
                            case "generateKey":
                                l = m(i),
                                u = o,
                                h = c;
                                break;
                            case "importKey":
                                l = m(c),
                                u = b[3],
                                h = b[4],
                                "jwk" === i && ((o = y(o)).alg || (o.alg = g(l)),
                                o.key_ops || (o.key_ops = "oct" !== o.kty ? "d"in o ? h.filter(E) : h.filter(k) : h.slice()),
                                b[1] = v(o));
                                break;
                            case "unwrapKey":
                                l = b[4],
                                u = b[5],
                                h = b[6],
                                b[2] = c._key
                            }
                            if ("generateKey" === e && "HMAC" === l.name && l.hash)
                                return l.length = l.length || {
                                    "SHA-1": 512,
                                    "SHA-256": 512,
                                    "SHA-384": 1024,
                                    "SHA-512": 1024
                                }[l.hash.name],
                                n.importKey("raw", t.getRandomValues(new Uint8Array(l.length + 7 >> 3)), l, u, h);
                            if (s && "generateKey" === e && "RSASSA-PKCS1-v1_5" === l.name && (!l.modulusLength || l.modulusLength >= 2048))
                                return (i = m(i)).name = "RSAES-PKCS1-v1_5",
                                delete i.hash,
                                n.generateKey(i, !0, ["encrypt", "decrypt"]).then((function(e) {
                                    return Promise.all([n.exportKey("jwk", e.publicKey), n.exportKey("jwk", e.privateKey)])
                                }
                                )).then((function(e) {
                                    return e[0].alg = e[1].alg = g(l),
                                    e[0].key_ops = h.filter(k),
                                    e[1].key_ops = h.filter(E),
                                    Promise.all([n.importKey("jwk", e[0], l, !0, e[0].key_ops), n.importKey("jwk", e[1], l, u, e[1].key_ops)])
                                }
                                )).then((function(e) {
                                    return {
                                        publicKey: e[0],
                                        privateKey: e[1]
                                    }
                                }
                                ));
                            if ((s || a && "SHA-1" === (l.hash || {}).name) && "importKey" === e && "jwk" === i && "HMAC" === l.name && "oct" === o.kty)
                                return n.importKey("raw", d(p(o.k)), c, b[3], b[4]);
                            if (s && "importKey" === e && ("spki" === i || "pkcs8" === i))
                                return n.importKey("jwk", w(o), c, b[3], b[4]);
                            if (a && "unwrapKey" === e)
                                return n.decrypt(b[3], c, o).then((function(e) {
                                    return n.importKey(i, e, b[4], b[5], b[6])
                                }
                                ));
                            try {
                                f = r.apply(n, b)
                            } catch (_) {
                                return Promise.reject(_)
                            }
                            return a && (f = new Promise((function(e, t) {
                                f.onabort = f.onerror = function(e) {
                                    t(e)
                                }
                                ,
                                f.oncomplete = function(t) {
                                    e(t.target.result)
                                }
                            }
                            ))),
                            f = f.then((function(e) {
                                return "HMAC" === l.name && (l.length || (l.length = 8 * e.algorithm.length)),
                                0 == l.name.search("RSA") && (l.modulusLength || (l.modulusLength = (e.publicKey || e).algorithm.modulusLength),
                                l.publicExponent || (l.publicExponent = (e.publicKey || e).algorithm.publicExponent)),
                                e = e.publicKey && e.privateKey ? {
                                    publicKey: new V(e.publicKey,l,u,h.filter(k)),
                                    privateKey: new V(e.privateKey,l,u,h.filter(E))
                                } : new V(e,l,u,h)
                            }
                            ))
                        }
                    }
                    )),
                    ["exportKey", "wrapKey"].forEach((function(e) {
                        var t = n[e];
                        n[e] = function(r, i, o) {
                            var c, l = [].slice.call(arguments);
                            switch (e) {
                            case "exportKey":
                                l[1] = i._key;
                                break;
                            case "wrapKey":
                                l[1] = i._key,
                                l[2] = o._key
                            }
                            if ((s || a && "SHA-1" === (i.algorithm.hash || {}).name) && "exportKey" === e && "jwk" === r && "HMAC" === i.algorithm.name && (l[0] = "raw"),
                            !s || "exportKey" !== e || "spki" !== r && "pkcs8" !== r || (l[0] = "jwk"),
                            a && "wrapKey" === e)
                                return n.exportKey(r, i).then((function(e) {
                                    return "jwk" === r && (e = d(unescape(encodeURIComponent(JSON.stringify(y(e)))))),
                                    n.encrypt(l[3], o, e)
                                }
                                ));
                            try {
                                c = t.apply(n, l)
                            } catch (u) {
                                return Promise.reject(u)
                            }
                            return a && (c = new Promise((function(e, t) {
                                c.onabort = c.onerror = function(e) {
                                    t(e)
                                }
                                ,
                                c.oncomplete = function(t) {
                                    e(t.target.result)
                                }
                            }
                            ))),
                            "exportKey" === e && "jwk" === r && (c = c.then((function(e) {
                                return (s || a && "SHA-1" === (i.algorithm.hash || {}).name) && "HMAC" === i.algorithm.name ? {
                                    kty: "oct",
                                    alg: g(i.algorithm),
                                    key_ops: i.usages.slice(),
                                    ext: !0,
                                    k: h(f(e))
                                } : ((e = y(e)).alg || (e.alg = g(i.algorithm)),
                                e.key_ops || (e.key_ops = "public" === i.type ? i.usages.filter(k) : "private" === i.type ? i.usages.filter(E) : i.usages.slice()),
                                e)
                            }
                            ))),
                            !s || "exportKey" !== e || "spki" !== r && "pkcs8" !== r || (c = c.then((function(e) {
                                return e = b(y(e))
                            }
                            ))),
                            c
                        }
                    }
                    )),
                    ["encrypt", "decrypt", "sign", "verify"].forEach((function(e) {
                        var t = n[e];
                        n[e] = function(r, i, o, s) {
                            if (a && (!o.byteLength || s && !s.byteLength))
                                throw new Error("Empty input is not allowed");
                            var c, l = [].slice.call(arguments), u = m(r);
                            if (!a || "sign" !== e && "verify" !== e || "RSASSA-PKCS1-v1_5" !== r && "HMAC" !== r || (l[0] = {
                                name: r
                            }),
                            a && i.algorithm.hash && (l[0].hash = l[0].hash || i.algorithm.hash),
                            a && "decrypt" === e && "AES-GCM" === u.name) {
                                var h = r.tagLength >> 3;
                                l[2] = (o.buffer || o).slice(0, o.byteLength - h),
                                r.tag = (o.buffer || o).slice(o.byteLength - h)
                            }
                            a && "AES-GCM" === u.name && l[0].tagLength === undefined && (l[0].tagLength = 128),
                            l[1] = i._key;
                            try {
                                c = t.apply(n, l)
                            } catch (p) {
                                return Promise.reject(p)
                            }
                            return a && (c = new Promise((function(t, n) {
                                c.onabort = c.onerror = function(e) {
                                    n(e)
                                }
                                ,
                                c.oncomplete = function(n) {
                                    n = n.target.result;
                                    if ("encrypt" === e && n instanceof AesGcmEncryptResult) {
                                        var r = n.ciphertext
                                          , i = n.tag;
                                        (n = new Uint8Array(r.byteLength + i.byteLength)).set(new Uint8Array(r), 0),
                                        n.set(new Uint8Array(i), r.byteLength),
                                        n = n.buffer
                                    }
                                    t(n)
                                }
                            }
                            ))),
                            c
                        }
                    }
                    )),
                    a) {
                        var u = n.digest;
                        n.digest = function(e, t) {
                            if (!t.byteLength)
                                throw new Error("Empty input is not allowed");
                            var r;
                            try {
                                r = u.call(n, e, t)
                            } catch (i) {
                                return Promise.reject(i)
                            }
                            return r = new Promise((function(e, t) {
                                r.onabort = r.onerror = function(e) {
                                    t(e)
                                }
                                ,
                                r.oncomplete = function(t) {
                                    e(t.target.result)
                                }
                            }
                            )),
                            r
                        }
                        ,
                        e.crypto = Object.create(t, {
                            getRandomValues: {
                                value: function(e) {
                                    return t.getRandomValues(e)
                                }
                            },
                            subtle: {
                                value: n
                            }
                        }),
                        e.CryptoKey = V
                    }
                    s && (t.subtle = n,
                    e.Crypto = r,
                    e.SubtleCrypto = i,
                    e.CryptoKey = V)
                }
            }
        }
        function h(e) {
            return btoa(e).replace(/\=+$/, "").replace(/\+/g, "-").replace(/\//g, "_")
        }
        function p(e) {
            return e = (e += "===").slice(0, -e.length % 4),
            atob(e.replace(/-/g, "+").replace(/_/g, "/"))
        }
        function d(e) {
            for (var t = new Uint8Array(e.length), n = 0; n < e.length; n++)
                t[n] = e.charCodeAt(n);
            return t
        }
        function f(e) {
            return e instanceof ArrayBuffer && (e = new Uint8Array(e)),
            String.fromCharCode.apply(String, e)
        }
        function m(e) {
            var t = {
                name: (e.name || e || "").toUpperCase().replace("V", "v")
            };
            switch (t.name) {
            case "SHA-1":
            case "SHA-256":
            case "SHA-384":
            case "SHA-512":
                break;
            case "AES-CBC":
            case "AES-GCM":
            case "AES-KW":
                e.length && (t.length = e.length);
                break;
            case "HMAC":
                e.hash && (t.hash = m(e.hash)),
                e.length && (t.length = e.length);
                break;
            case "RSAES-PKCS1-v1_5":
                e.publicExponent && (t.publicExponent = new Uint8Array(e.publicExponent)),
                e.modulusLength && (t.modulusLength = e.modulusLength);
                break;
            case "RSASSA-PKCS1-v1_5":
            case "RSA-OAEP":
                e.hash && (t.hash = m(e.hash)),
                e.publicExponent && (t.publicExponent = new Uint8Array(e.publicExponent)),
                e.modulusLength && (t.modulusLength = e.modulusLength);
                break;
            default:
                throw new SyntaxError("Bad algorithm name")
            }
            return t
        }
        function g(e) {
            return {
                HMAC: {
                    "SHA-1": "HS1",
                    "SHA-256": "HS256",
                    "SHA-384": "HS384",
                    "SHA-512": "HS512"
                },
                "RSASSA-PKCS1-v1_5": {
                    "SHA-1": "RS1",
                    "SHA-256": "RS256",
                    "SHA-384": "RS384",
                    "SHA-512": "RS512"
                },
                "RSAES-PKCS1-v1_5": {
                    "": "RSA1_5"
                },
                "RSA-OAEP": {
                    "SHA-1": "RSA-OAEP",
                    "SHA-256": "RSA-OAEP-256"
                },
                "AES-KW": {
                    128: "A128KW",
                    192: "A192KW",
                    256: "A256KW"
                },
                "AES-GCM": {
                    128: "A128GCM",
                    192: "A192GCM",
                    256: "A256GCM"
                },
                "AES-CBC": {
                    128: "A128CBC",
                    192: "A192CBC",
                    256: "A256CBC"
                }
            }[e.name][(e.hash || {}).name || e.length || ""]
        }
        function y(e) {
            (e instanceof ArrayBuffer || e instanceof Uint8Array) && (e = JSON.parse(decodeURIComponent(escape(f(e)))));
            var t = {
                kty: e.kty,
                alg: e.alg,
                ext: e.ext || e.extractable
            };
            switch (t.kty) {
            case "oct":
                t.k = e.k;
            case "RSA":
                ["n", "e", "d", "p", "q", "dp", "dq", "qi", "oth"].forEach((function(n) {
                    n in e && (t[n] = e[n])
                }
                ));
                break;
            default:
                throw new TypeError("Unsupported key type")
            }
            return t
        }
        function v(e) {
            var t = y(e);
            return a && (t.extractable = t.ext,
            delete t.ext),
            d(unescape(encodeURIComponent(JSON.stringify(t)))).buffer
        }
        function w(e) {
            var t = _(e)
              , n = !1;
            t.length > 2 && (n = !0,
            t.shift());
            var r = {
                ext: !0
            };
            if ("1.2.840.113549.1.1.1" !== t[0][0])
                throw new TypeError("Unsupported key type");
            var i = ["n", "e", "d", "p", "q", "dp", "dq", "qi"]
              , o = _(t[1]);
            n && o.shift();
            for (var a = 0; a < o.length; a++)
                o[a][0] || (o[a] = o[a].subarray(1)),
                r[i[a]] = h(f(o[a]));
            return r.kty = "RSA",
            r
        }
        function b(e) {
            var t, n = [["", null]], r = !1;
            if ("RSA" !== e.kty)
                throw new TypeError("Unsupported key type");
            for (var i = ["n", "e", "d", "p", "q", "dp", "dq", "qi"], o = [], a = 0; a < i.length && i[a]in e; a++) {
                var s = o[a] = d(p(e[i[a]]));
                128 & s[0] && (o[a] = new Uint8Array(s.length + 1),
                o[a].set(s, 1))
            }
            return o.length > 2 && (r = !0,
            o.unshift(new Uint8Array([0]))),
            n[0][0] = "1.2.840.113549.1.1.1",
            t = o,
            n.push(new Uint8Array(T(t)).buffer),
            r ? n.unshift(new Uint8Array([0])) : n[1] = {
                tag: 3,
                value: n[1]
            },
            new Uint8Array(T(n)).buffer
        }
        function _(e, t) {
            if (e instanceof ArrayBuffer && (e = new Uint8Array(e)),
            t || (t = {
                pos: 0,
                end: e.length
            }),
            t.end - t.pos < 2 || t.end > e.length)
                throw new RangeError("Malformed DER");
            var n, r = e[t.pos++], i = e[t.pos++];
            if (i >= 128) {
                if (i &= 127,
                t.end - t.pos < i)
                    throw new RangeError("Malformed DER");
                for (var o = 0; i--; )
                    o <<= 8,
                    o |= e[t.pos++];
                i = o
            }
            if (t.end - t.pos < i)
                throw new RangeError("Malformed DER");
            switch (r) {
            case 2:
                n = e.subarray(t.pos, t.pos += i);
                break;
            case 3:
                if (e[t.pos++])
                    throw new Error("Unsupported bit string");
                i--;
            case 4:
                n = new Uint8Array(e.subarray(t.pos, t.pos += i)).buffer;
                break;
            case 5:
                n = null;
                break;
            case 6:
                var a = btoa(f(e.subarray(t.pos, t.pos += i)));
                if (!(a in c))
                    throw new Error("Unsupported OBJECT ID " + a);
                n = c[a];
                break;
            case 48:
                n = [];
                for (var s = t.pos + i; t.pos < s; )
                    n.push(_(e, t));
                break;
            default:
                throw new Error("Unsupported DER tag 0x" + r.toString(16))
            }
            return n
        }
        function T(e, t) {
            t || (t = []);
            var n = 0
              , r = 0
              , i = t.length + 2;
            if (t.push(0, 0),
            e instanceof Uint8Array) {
                n = 2,
                r = e.length;
                for (var o = 0; o < r; o++)
                    t.push(e[o])
            } else if (e instanceof ArrayBuffer) {
                n = 4,
                r = e.byteLength,
                e = new Uint8Array(e);
                for (o = 0; o < r; o++)
                    t.push(e[o])
            } else if (null === e)
                n = 5,
                r = 0;
            else if ("string" == typeof e && e in l) {
                var a = d(atob(l[e]));
                n = 6,
                r = a.length;
                for (o = 0; o < r; o++)
                    t.push(a[o])
            } else if (e instanceof Array) {
                for (o = 0; o < e.length; o++)
                    T(e[o], t);
                n = 48,
                r = t.length - i
            } else {
                if (!("object" == typeof e && 3 === e.tag && e.value instanceof ArrayBuffer))
                    throw new Error("Unsupported DER value " + e);
                n = 3,
                r = (e = new Uint8Array(e.value)).byteLength,
                t.push(0);
                for (o = 0; o < r; o++)
                    t.push(e[o]);
                r++
            }
            if (r >= 128) {
                var s = r;
                r = 4;
                for (t.splice(i, 0, s >> 24 & 255, s >> 16 & 255, s >> 8 & 255, 255 & s); r > 1 && !(s >> 24); )
                    s <<= 8,
                    r--;
                r < 4 && t.splice(i, 4 - r),
                r |= 128
            }
            return t.splice(i - 2, 2, n, r),
            t
        }
        function V(e, t, n, r) {
            Object.defineProperties(this, {
                _key: {
                    value: e
                },
                type: {
                    value: e.type,
                    enumerable: !0
                },
                extractable: {
                    value: n === undefined ? e.extractable : n,
                    enumerable: !0
                },
                algorithm: {
                    value: t === undefined ? e.algorithm : t,
                    enumerable: !0
                },
                usages: {
                    value: r === undefined ? e.usages : r,
                    enumerable: !0
                }
            })
        }
        function k(e) {
            return "verify" === e || "encrypt" === e || "wrapKey" === e
        }
        function E(e) {
            return "sign" === e || "decrypt" === e || "unwrapKey" === e
        }
    }(window),
    Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
        return function(t, n) {
            if (null === this || this === undefined)
                throw TypeError("Array.prototype.indexOf called on null or undefined");
            var r = e(this)
              , i = r.length >>> 0
              , o = Math.min(0 | n, i);
            if (o < 0)
                o = Math.max(0, i + o);
            else if (o >= i)
                return -1;
            if (void 0 === t) {
                for (; o !== i; ++o)
                    if (void 0 === r[o] && o in r)
                        return o
            } else if (t != t) {
                for (; o !== i; ++o)
                    if (r[o] != r[o])
                        return o
            } else
                for (; o !== i; ++o)
                    if (r[o] === t)
                        return o;
            return -1
        }
    }(Object)),
    Array.isArray || (Array.isArray = function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
    ),
    document.getElementsByClassName || (window.Element.prototype.getElementsByClassName = document.constructor.prototype.getElementsByClassName = function(e) {
        if (document.querySelectorAll)
            return document.querySelectorAll("." + e);
        for (var t = document.getElementsByTagName("*"), n = new RegExp("(^|\\s)" + e + "(\\s|$)"), r = [], i = 0; i < t.length; i++)
            n.test(t[i].className) && r.push(t[i]);
        return r
    }
    ),
    String.prototype.startsWith || (String.prototype.startsWith = function(e, t) {
        return this.substr(!t || t < 0 ? 0 : +t, e.length) === e
    }
    ),
    String.prototype.endsWith || (String.prototype.endsWith = function(e, t) {
        return (t === undefined || t > this.length) && (t = this.length),
        this.substring(t - e.length, t) === e
    }
    );
    try {
        if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
            var O = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
            Object.defineProperty(Element.prototype, "textContent", {
                get: function() {
                    return O.get.call(this)
                },
                set: function(e) {
                    O.set.call(this, e)
                }
            })
        }
    } catch (Jn) {}
    Function.prototype.bind || (Function.prototype.bind = function(e) {
        if ("function" != typeof this)
            throw new TypeError("Function.prototype.bind: Item Can Not Be Bound.");
        var t = Array.prototype.slice.call(arguments, 1)
          , n = this
          , r = function() {}
          , i = function() {
            return n.apply(this instanceof r ? this : e, t.concat(Array.prototype.slice.call(arguments)))
        };
        return this.prototype && (r.prototype = this.prototype),
        i.prototype = new r,
        i
    }
    ),
    "function" != typeof Object.create && (Object.create = function(e, t) {
        function n() {}
        if (n.prototype = e,
        "object" == typeof t)
            for (var r in t)
                t.hasOwnProperty(r) && (n[r] = t[r]);
        return new n
    }
    ),
    Date.now || (Date.now = function() {
        return (new Date).getTime()
    }
    ),
    window.console || (window.console = {});
    for (var P, M, W, N, A = ["error", "info", "log", "show", "table", "trace", "warn"], j = function(e) {}, F = A.length; --F > -1; )
        V = A[F],
        window.console[V] || (window.console[V] = j);
    if (window.atob)
        try {
            window.atob(" ")
        } catch (Xn) {
            window.atob = function(e) {
                var t = function(t) {
                    return e(String(t).replace(/[\t\n\f\r ]+/g, ""))
                };
                return t.original = e,
                t
            }(window.atob)
        }
    else {
        var B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
          , G = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
        window.atob = function(e) {
            if (e = String(e).replace(/[\t\n\f\r ]+/g, ""),
            !G.test(e))
                throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
            var t, n, r;
            e += "==".slice(2 - (3 & e.length));
            for (var i = "", o = 0; o < e.length; )
                t = B.indexOf(e.charAt(o++)) << 18 | B.indexOf(e.charAt(o++)) << 12 | (n = B.indexOf(e.charAt(o++))) << 6 | (r = B.indexOf(e.charAt(o++))),
                i += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === r ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);
            return i
        }
    }
    if (Event.prototype.preventDefault || (Event.prototype.preventDefault = function() {
        this.returnValue = !1
    }
    ),
    Event.prototype.stopPropagation || (Event.prototype.stopPropagation = function() {
        this.cancelBubble = !0
    }
    ),
    window.Prototype && Array.prototype.toJSON) {
        console.error("[hCaptcha] Custom JSON polyfill detected, please remove to ensure hCaptcha works properly");
        var D = Array.prototype.toJSON
          , Z = JSON.stringify;
        JSON.stringify = function(e) {
            try {
                return delete Array.prototype.toJSON,
                Z(e)
            } finally {
                Array.prototype.toJSON = D
            }
        }
    }
    Object.keys || (Object.keys = (P = Object.prototype.hasOwnProperty,
    M = !Object.prototype.propertyIsEnumerable.call({
        toString: null
    }, "toString"),
    N = (W = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]).length,
    function(e) {
        if ("function" != typeof e && ("object" != typeof e || null === e))
            throw new TypeError("Object.keys called on non-object");
        var t, n, r = [];
        for (t in e)
            P.call(e, t) && r.push(t);
        if (M)
            for (n = 0; n < N; n++)
                P.call(e, W[n]) && r.push(W[n]);
        return r
    }
    ))/*! Raven.js 3.27.2 (6d91db933) | github.com/getsentry/raven-js */
    ,
    function(e) {
        if ("object" == typeof exports && "undefined" != typeof module)
            module.exports = e();
        else if ("function" == typeof define && define.amd)
            define("raven-js", e);
        else {
            ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Raven = e()
        }
    }((function() {
        return function e(t, n, r) {
            function i(a, s) {
                if (!n[a]) {
                    if (!t[a]) {
                        var c = "function" == typeof require && require;
                        if (!s && c)
                            return c(a, !0);
                        if (o)
                            return o(a, !0);
                        var l = new Error("Cannot find module '" + a + "'");
                        throw l.code = "MODULE_NOT_FOUND",
                        l
                    }
                    var u = n[a] = {
                        exports: {}
                    };
                    t[a][0].call(u.exports, (function(e) {
                        var n = t[a][1][e];
                        return i(n || e)
                    }
                    ), u, u.exports, e, t, n, r)
                }
                return n[a].exports
            }
            for (var o = "function" == typeof require && require, a = 0; a < r.length; a++)
                i(r[a]);
            return i
        }({
            1: [function(e, t, n) {
                function r(e) {
                    this.name = "RavenConfigError",
                    this.message = e
                }
                r.prototype = new Error,
                r.prototype.constructor = r,
                t.exports = r
            }
            , {}],
            2: [function(e, t, n) {
                var r = e(5);
                t.exports = {
                    wrapMethod: function(e, t, n) {
                        var i = e[t]
                          , o = e;
                        if (t in e) {
                            var a = "warn" === t ? "warning" : t;
                            e[t] = function() {
                                var e = [].slice.call(arguments)
                                  , s = r.safeJoin(e, " ")
                                  , c = {
                                    level: a,
                                    logger: "console",
                                    extra: {
                                        arguments: e
                                    }
                                };
                                "assert" === t ? !1 === e[0] && (s = "Assertion failed: " + (r.safeJoin(e.slice(1), " ") || "console.assert"),
                                c.extra.arguments = e.slice(1),
                                n && n(s, c)) : n && n(s, c),
                                i && Function.prototype.apply.call(i, o, e)
                            }
                        }
                    }
                }
            }
            , {
                5: 5
            }],
            3: [function(e, t, n) {
                (function(n) {
                    function r() {
                        return +new Date
                    }
                    function i(e, t) {
                        return v(t) ? function(n) {
                            return t(n, e)
                        }
                        : t
                    }
                    function o() {
                        for (var e in this.a = !("object" != typeof JSON || !JSON.stringify),
                        this.b = !y(z),
                        this.c = !y(K),
                        this.d = null,
                        this.e = null,
                        this.f = null,
                        this.g = null,
                        this.h = null,
                        this.i = null,
                        this.j = {},
                        this.k = {
                            release: I.SENTRY_RELEASE && I.SENTRY_RELEASE.id,
                            logger: "javascript",
                            ignoreErrors: [],
                            ignoreUrls: [],
                            whitelistUrls: [],
                            includePaths: [],
                            headers: null,
                            collectWindowErrors: !0,
                            captureUnhandledRejections: !0,
                            maxMessageLength: 0,
                            maxUrlLength: 250,
                            stackTraceLimit: 50,
                            autoBreadcrumbs: !0,
                            instrument: !0,
                            sampleRate: 1,
                            sanitizeKeys: []
                        },
                        this.l = {
                            method: "POST",
                            referrerPolicy: A() ? "origin" : ""
                        },
                        this.m = 0,
                        this.n = !1,
                        this.o = Error.stackTraceLimit,
                        this.p = I.console || {},
                        this.q = {},
                        this.r = [],
                        this.s = r(),
                        this.t = [],
                        this.u = [],
                        this.v = null,
                        this.w = I.location,
                        this.x = this.w && this.w.href,
                        this.y(),
                        this.p)
                            this.q[e] = this.p[e]
                    }
                    var a = e(6)
                      , s = e(7)
                      , c = e(8)
                      , l = e(1)
                      , u = e(5)
                      , h = u.isErrorEvent
                      , p = u.isDOMError
                      , d = u.isDOMException
                      , f = u.isError
                      , m = u.isObject
                      , g = u.isPlainObject
                      , y = u.isUndefined
                      , v = u.isFunction
                      , w = u.isString
                      , b = u.isArray
                      , _ = u.isEmptyObject
                      , T = u.each
                      , V = u.objectMerge
                      , k = u.truncate
                      , E = u.objectFrozen
                      , S = u.hasKey
                      , R = u.joinRegExp
                      , x = u.urlencode
                      , U = u.uuid4
                      , C = u.htmlTreeAsString
                      , O = u.isSameException
                      , P = u.isSameStacktrace
                      , M = u.parseUrl
                      , W = u.fill
                      , N = u.supportsFetch
                      , A = u.supportsReferrerPolicy
                      , j = u.serializeKeysForMessage
                      , F = u.serializeException
                      , B = u.sanitize
                      , G = e(2).wrapMethod
                      , D = "source protocol user pass host port path".split(" ")
                      , Z = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/
                      , I = "undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : {}
                      , z = I.document
                      , K = I.navigator;
                    o.prototype = {
                        VERSION: "3.27.2",
                        debug: !1,
                        TraceKit: a,
                        config: function(e, t) {
                            var n = this;
                            if (n.g)
                                return this.z("error", "Error: Raven has already been configured"),
                                n;
                            if (!e)
                                return n;
                            var r = n.k;
                            t && T(t, (function(e, t) {
                                "tags" === e || "extra" === e || "user" === e ? n.j[e] = t : r[e] = t
                            }
                            )),
                            n.setDSN(e),
                            r.ignoreErrors.push(/^Script error\.?$/),
                            r.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),
                            r.ignoreErrors = R(r.ignoreErrors),
                            r.ignoreUrls = !!r.ignoreUrls.length && R(r.ignoreUrls),
                            r.whitelistUrls = !!r.whitelistUrls.length && R(r.whitelistUrls),
                            r.includePaths = R(r.includePaths),
                            r.maxBreadcrumbs = Math.max(0, Math.min(r.maxBreadcrumbs || 100, 100));
                            var i = {
                                xhr: !0,
                                console: !0,
                                dom: !0,
                                location: !0,
                                sentry: !0
                            }
                              , o = r.autoBreadcrumbs;
                            "[object Object]" === {}.toString.call(o) ? o = V(i, o) : !1 !== o && (o = i),
                            r.autoBreadcrumbs = o;
                            var s = {
                                tryCatch: !0
                            }
                              , c = r.instrument;
                            return "[object Object]" === {}.toString.call(c) ? c = V(s, c) : !1 !== c && (c = s),
                            r.instrument = c,
                            a.collectWindowErrors = !!r.collectWindowErrors,
                            n
                        },
                        install: function() {
                            var e = this;
                            return e.isSetup() && !e.n && (a.report.subscribe((function() {
                                e.A.apply(e, arguments)
                            }
                            )),
                            e.k.captureUnhandledRejections && e.B(),
                            e.C(),
                            e.k.instrument && e.k.instrument.tryCatch && e.D(),
                            e.k.autoBreadcrumbs && e.E(),
                            e.F(),
                            e.n = !0),
                            Error.stackTraceLimit = e.k.stackTraceLimit,
                            this
                        },
                        setDSN: function(e) {
                            var t = this
                              , n = t.G(e)
                              , r = n.path.lastIndexOf("/")
                              , i = n.path.substr(1, r);
                            t.H = e,
                            t.h = n.user,
                            t.I = n.pass && n.pass.substr(1),
                            t.i = n.path.substr(r + 1),
                            t.g = t.J(n),
                            t.K = t.g + "/" + i + "api/" + t.i + "/store/",
                            this.y()
                        },
                        context: function(e, t, n) {
                            return v(e) && (n = t || [],
                            t = e,
                            e = {}),
                            this.wrap(e, t).apply(this, n)
                        },
                        wrap: function(e, t, n) {
                            function r() {
                                var r = []
                                  , o = arguments.length
                                  , a = !e || e && !1 !== e.deep;
                                for (n && v(n) && n.apply(this, arguments); o--; )
                                    r[o] = a ? i.wrap(e, arguments[o]) : arguments[o];
                                try {
                                    return t.apply(this, r)
                                } catch (s) {
                                    throw i.L(),
                                    i.captureException(s, e),
                                    s
                                }
                            }
                            var i = this;
                            if (y(t) && !v(e))
                                return e;
                            if (v(e) && (t = e,
                            e = void 0),
                            !v(t))
                                return t;
                            try {
                                if (t.M)
                                    return t;
                                if (t.N)
                                    return t.N
                            } catch (o) {
                                return t
                            }
                            for (var a in t)
                                S(t, a) && (r[a] = t[a]);
                            return r.prototype = t.prototype,
                            t.N = r,
                            r.M = !0,
                            r.O = t,
                            r
                        },
                        uninstall: function() {
                            return a.report.uninstall(),
                            this.P(),
                            this.Q(),
                            this.R(),
                            this.S(),
                            Error.stackTraceLimit = this.o,
                            this.n = !1,
                            this
                        },
                        T: function(e) {
                            this.z("debug", "Raven caught unhandled promise rejection:", e),
                            this.captureException(e.reason, {
                                mechanism: {
                                    type: "onunhandledrejection",
                                    handled: !1
                                }
                            })
                        },
                        B: function() {
                            return this.T = this.T.bind(this),
                            I.addEventListener && I.addEventListener("unhandledrejection", this.T),
                            this
                        },
                        P: function() {
                            return I.removeEventListener && I.removeEventListener("unhandledrejection", this.T),
                            this
                        },
                        captureException: function(e, t) {
                            if (t = V({
                                trimHeadFrames: 0
                            }, t || {}),
                            h(e) && e.error)
                                e = e.error;
                            else {
                                if (p(e) || d(e)) {
                                    var n = e.name || (p(e) ? "DOMError" : "DOMException")
                                      , r = e.message ? n + ": " + e.message : n;
                                    return this.captureMessage(r, V(t, {
                                        stacktrace: !0,
                                        trimHeadFrames: t.trimHeadFrames + 1
                                    }))
                                }
                                if (f(e))
                                    e = e;
                                else {
                                    if (!g(e))
                                        return this.captureMessage(e, V(t, {
                                            stacktrace: !0,
                                            trimHeadFrames: t.trimHeadFrames + 1
                                        }));
                                    t = this.U(t, e),
                                    e = new Error(t.message)
                                }
                            }
                            this.d = e;
                            try {
                                var i = a.computeStackTrace(e);
                                this.V(i, t)
                            } catch (o) {
                                if (e !== o)
                                    throw o
                            }
                            return this
                        },
                        U: function(e, t) {
                            var n = Object.keys(t).sort()
                              , r = V(e, {
                                message: "Non-Error exception captured with keys: " + j(n),
                                fingerprint: [c(n)],
                                extra: e.extra || {}
                            });
                            return r.extra.W = F(t),
                            r
                        },
                        captureMessage: function(e, t) {
                            if (!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(e)) {
                                var n, r = V({
                                    message: e += ""
                                }, t = t || {});
                                try {
                                    throw new Error(e)
                                } catch (i) {
                                    n = i
                                }
                                n.name = null;
                                var o = a.computeStackTrace(n)
                                  , s = b(o.stack) && o.stack[1];
                                s && "Raven.captureException" === s.func && (s = o.stack[2]);
                                var c = s && s.url || "";
                                if ((!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(c)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(c))) {
                                    if (this.k.stacktrace || t.stacktrace || "" === r.message) {
                                        r.fingerprint = null == r.fingerprint ? e : r.fingerprint,
                                        (t = V({
                                            trimHeadFrames: 0
                                        }, t)).trimHeadFrames += 1;
                                        var l = this.X(o, t);
                                        r.stacktrace = {
                                            frames: l.reverse()
                                        }
                                    }
                                    return r.fingerprint && (r.fingerprint = b(r.fingerprint) ? r.fingerprint : [r.fingerprint]),
                                    this.Y(r),
                                    this
                                }
                            }
                        },
                        captureBreadcrumb: function(e) {
                            var t = V({
                                timestamp: r() / 1e3
                            }, e);
                            if (v(this.k.breadcrumbCallback)) {
                                var n = this.k.breadcrumbCallback(t);
                                if (m(n) && !_(n))
                                    t = n;
                                else if (!1 === n)
                                    return this
                            }
                            return this.u.push(t),
                            this.u.length > this.k.maxBreadcrumbs && this.u.shift(),
                            this
                        },
                        addPlugin: function(e) {
                            var t = [].slice.call(arguments, 1);
                            return this.r.push([e, t]),
                            this.n && this.F(),
                            this
                        },
                        setUserContext: function(e) {
                            return this.j.user = e,
                            this
                        },
                        setExtraContext: function(e) {
                            return this.Z("extra", e),
                            this
                        },
                        setTagsContext: function(e) {
                            return this.Z("tags", e),
                            this
                        },
                        clearContext: function() {
                            return this.j = {},
                            this
                        },
                        getContext: function() {
                            return JSON.parse(s(this.j))
                        },
                        setEnvironment: function(e) {
                            return this.k.environment = e,
                            this
                        },
                        setRelease: function(e) {
                            return this.k.release = e,
                            this
                        },
                        setDataCallback: function(e) {
                            var t = this.k.dataCallback;
                            return this.k.dataCallback = i(t, e),
                            this
                        },
                        setBreadcrumbCallback: function(e) {
                            var t = this.k.breadcrumbCallback;
                            return this.k.breadcrumbCallback = i(t, e),
                            this
                        },
                        setShouldSendCallback: function(e) {
                            var t = this.k.shouldSendCallback;
                            return this.k.shouldSendCallback = i(t, e),
                            this
                        },
                        setTransport: function(e) {
                            return this.k.transport = e,
                            this
                        },
                        lastException: function() {
                            return this.d
                        },
                        lastEventId: function() {
                            return this.f
                        },
                        isSetup: function() {
                            return !(!this.a || !this.g && (this.ravenNotConfiguredError || (this.ravenNotConfiguredError = !0,
                            this.z("error", "Error: Raven has not been configured.")),
                            1))
                        },
                        afterLoad: function() {
                            var e = I.RavenConfig;
                            e && this.config(e.dsn, e.config).install()
                        },
                        showReportDialog: function(e) {
                            if (z) {
                                if (!(e = V({
                                    eventId: this.lastEventId(),
                                    dsn: this.H,
                                    user: this.j.user || {}
                                }, e)).eventId)
                                    throw new l("Missing eventId");
                                if (!e.dsn)
                                    throw new l("Missing DSN");
                                var t = encodeURIComponent
                                  , n = [];
                                for (var r in e)
                                    if ("user" === r) {
                                        var i = e.user;
                                        i.name && n.push("name=" + t(i.name)),
                                        i.email && n.push("email=" + t(i.email))
                                    } else
                                        n.push(t(r) + "=" + t(e[r]));
                                var o = this.J(this.G(e.dsn))
                                  , a = z.createElement("script");
                                a.async = !0,
                                a.src = o + "/api/embed/error-page/?" + n.join("&"),
                                (z.head || z.body).appendChild(a)
                            }
                        },
                        L: function() {
                            var e = this;
                            this.m += 1,
                            setTimeout((function() {
                                e.m -= 1
                            }
                            ))
                        },
                        $: function(e, t) {
                            var n, r;
                            if (this.b) {
                                for (r in t = t || {},
                                e = "raven" + e.substr(0, 1).toUpperCase() + e.substr(1),
                                z.createEvent ? (n = z.createEvent("HTMLEvents")).initEvent(e, !0, !0) : (n = z.createEventObject()).eventType = e,
                                t)
                                    S(t, r) && (n[r] = t[r]);
                                if (z.createEvent)
                                    z.dispatchEvent(n);
                                else
                                    try {
                                        z.fireEvent("on" + n.eventType.toLowerCase(), n)
                                    } catch (i) {}
                            }
                        },
                        _: function(e) {
                            var t = this;
                            return function(n) {
                                if (t.aa = null,
                                t.v !== n) {
                                    var r;
                                    t.v = n;
                                    try {
                                        r = C(n.target)
                                    } catch (i) {
                                        r = "<unknown>"
                                    }
                                    t.captureBreadcrumb({
                                        category: "ui." + e,
                                        message: r
                                    })
                                }
                            }
                        },
                        ba: function() {
                            var e = this;
                            return function(t) {
                                var n;
                                try {
                                    n = t.target
                                } catch (i) {
                                    return
                                }
                                var r = n && n.tagName;
                                if (r && ("INPUT" === r || "TEXTAREA" === r || n.isContentEditable)) {
                                    var o = e.aa;
                                    o || e._("input")(t),
                                    clearTimeout(o),
                                    e.aa = setTimeout((function() {
                                        e.aa = null
                                    }
                                    ), 1e3)
                                }
                            }
                        },
                        ca: function(e, t) {
                            var n = M(this.w.href)
                              , r = M(t)
                              , i = M(e);
                            this.x = t,
                            n.protocol === r.protocol && n.host === r.host && (t = r.relative),
                            n.protocol === i.protocol && n.host === i.host && (e = i.relative),
                            this.captureBreadcrumb({
                                category: "navigation",
                                data: {
                                    to: t,
                                    from: e
                                }
                            })
                        },
                        C: function() {
                            var e = this;
                            e.da = Function.prototype.toString,
                            Function.prototype.toString = function() {
                                return "function" == typeof this && this.M ? e.da.apply(this.O, arguments) : e.da.apply(this, arguments)
                            }
                        },
                        Q: function() {
                            this.da && (Function.prototype.toString = this.da)
                        },
                        D: function() {
                            function e(e) {
                                return function(t, r) {
                                    for (var i = new Array(arguments.length), o = 0; o < i.length; ++o)
                                        i[o] = arguments[o];
                                    var a = i[0];
                                    return v(a) && (i[0] = n.wrap({
                                        mechanism: {
                                            type: "instrument",
                                            data: {
                                                "function": e.name || "<anonymous>"
                                            }
                                        }
                                    }, a)),
                                    e.apply ? e.apply(this, i) : e(i[0], i[1])
                                }
                            }
                            function t(e) {
                                var t = I[e] && I[e].prototype;
                                t && t.hasOwnProperty && t.hasOwnProperty("addEventListener") && (W(t, "addEventListener", (function(t) {
                                    return function(r, o, a, s) {
                                        try {
                                            o && o.handleEvent && (o.handleEvent = n.wrap({
                                                mechanism: {
                                                    type: "instrument",
                                                    data: {
                                                        target: e,
                                                        "function": "handleEvent",
                                                        handler: o && o.name || "<anonymous>"
                                                    }
                                                }
                                            }, o.handleEvent))
                                        } catch (c) {}
                                        var l, u, h;
                                        return i && i.dom && ("EventTarget" === e || "Node" === e) && (u = n._("click"),
                                        h = n.ba(),
                                        l = function(e) {
                                            if (e) {
                                                var t;
                                                try {
                                                    t = e.type
                                                } catch (n) {
                                                    return
                                                }
                                                return "click" === t ? u(e) : "keypress" === t ? h(e) : void 0
                                            }
                                        }
                                        ),
                                        t.call(this, r, n.wrap({
                                            mechanism: {
                                                type: "instrument",
                                                data: {
                                                    target: e,
                                                    "function": "addEventListener",
                                                    handler: o && o.name || "<anonymous>"
                                                }
                                            }
                                        }, o, l), a, s)
                                    }
                                }
                                ), r),
                                W(t, "removeEventListener", (function(e) {
                                    return function(t, n, r, i) {
                                        try {
                                            n = n && (n.N ? n.N : n)
                                        } catch (o) {}
                                        return e.call(this, t, n, r, i)
                                    }
                                }
                                ), r))
                            }
                            var n = this
                              , r = n.t
                              , i = this.k.autoBreadcrumbs;
                            W(I, "setTimeout", e, r),
                            W(I, "setInterval", e, r),
                            I.requestAnimationFrame && W(I, "requestAnimationFrame", (function(e) {
                                return function(t) {
                                    return e(n.wrap({
                                        mechanism: {
                                            type: "instrument",
                                            data: {
                                                "function": "requestAnimationFrame",
                                                handler: e && e.name || "<anonymous>"
                                            }
                                        }
                                    }, t))
                                }
                            }
                            ), r);
                            for (var o = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], a = 0; a < o.length; a++)
                                t(o[a])
                        },
                        E: function() {
                            function e(e, n) {
                                e in n && v(n[e]) && W(n, e, (function(n) {
                                    return t.wrap({
                                        mechanism: {
                                            type: "instrument",
                                            data: {
                                                "function": e,
                                                handler: n && n.name || "<anonymous>"
                                            }
                                        }
                                    }, n)
                                }
                                ))
                            }
                            var t = this
                              , n = this.k.autoBreadcrumbs
                              , r = t.t;
                            if (n.xhr && "XMLHttpRequest"in I) {
                                var i = I.XMLHttpRequest && I.XMLHttpRequest.prototype;
                                W(i, "open", (function(e) {
                                    return function(n, r) {
                                        return w(r) && -1 === r.indexOf(t.h) && (this.ea = {
                                            method: n,
                                            url: r,
                                            status_code: null
                                        }),
                                        e.apply(this, arguments)
                                    }
                                }
                                ), r),
                                W(i, "send", (function(n) {
                                    return function() {
                                        function r() {
                                            if (i.ea && 4 === i.readyState) {
                                                try {
                                                    i.ea.status_code = i.status
                                                } catch (e) {}
                                                t.captureBreadcrumb({
                                                    type: "http",
                                                    category: "xhr",
                                                    data: i.ea
                                                })
                                            }
                                        }
                                        for (var i = this, o = ["onload", "onerror", "onprogress"], a = 0; a < o.length; a++)
                                            e(o[a], i);
                                        return "onreadystatechange"in i && v(i.onreadystatechange) ? W(i, "onreadystatechange", (function(e) {
                                            return t.wrap({
                                                mechanism: {
                                                    type: "instrument",
                                                    data: {
                                                        "function": "onreadystatechange",
                                                        handler: e && e.name || "<anonymous>"
                                                    }
                                                }
                                            }, e, r)
                                        }
                                        )) : i.onreadystatechange = r,
                                        n.apply(this, arguments)
                                    }
                                }
                                ), r)
                            }
                            n.xhr && N() && W(I, "fetch", (function(e) {
                                return function() {
                                    for (var n = new Array(arguments.length), r = 0; r < n.length; ++r)
                                        n[r] = arguments[r];
                                    var i, o = n[0], a = "GET";
                                    if ("string" == typeof o ? i = o : "Request"in I && o instanceof I.Request ? (i = o.url,
                                    o.method && (a = o.method)) : i = "" + o,
                                    -1 !== i.indexOf(t.h))
                                        return e.apply(this, n);
                                    n[1] && n[1].method && (a = n[1].method);
                                    var s = {
                                        method: a,
                                        url: i,
                                        status_code: null
                                    };
                                    return e.apply(this, n).then((function(e) {
                                        return s.status_code = e.status,
                                        t.captureBreadcrumb({
                                            type: "http",
                                            category: "fetch",
                                            data: s
                                        }),
                                        e
                                    }
                                    ))["catch"]((function(e) {
                                        throw t.captureBreadcrumb({
                                            type: "http",
                                            category: "fetch",
                                            data: s,
                                            level: "error"
                                        }),
                                        e
                                    }
                                    ))
                                }
                            }
                            ), r),
                            n.dom && this.b && (z.addEventListener ? (z.addEventListener("click", t._("click"), !1),
                            z.addEventListener("keypress", t.ba(), !1)) : z.attachEvent && (z.attachEvent("onclick", t._("click")),
                            z.attachEvent("onkeypress", t.ba())));
                            var o = I.chrome
                              , a = !(o && o.app && o.app.runtime) && I.history && I.history.pushState && I.history.replaceState;
                            if (n.location && a) {
                                var s = I.onpopstate;
                                I.onpopstate = function() {
                                    var e = t.w.href;
                                    if (t.ca(t.x, e),
                                    s)
                                        return s.apply(this, arguments)
                                }
                                ;
                                var c = function(e) {
                                    return function() {
                                        var n = arguments.length > 2 ? arguments[2] : void 0;
                                        return n && t.ca(t.x, n + ""),
                                        e.apply(this, arguments)
                                    }
                                };
                                W(I.history, "pushState", c, r),
                                W(I.history, "replaceState", c, r)
                            }
                            if (n.console && "console"in I && console.log) {
                                var l = function(e, n) {
                                    t.captureBreadcrumb({
                                        message: e,
                                        level: n.level,
                                        category: "console"
                                    })
                                };
                                T(["debug", "info", "warn", "error", "log"], (function(e, t) {
                                    G(console, t, l)
                                }
                                ))
                            }
                        },
                        R: function() {
                            for (var e; this.t.length; ) {
                                var t = (e = this.t.shift())[0]
                                  , n = e[1]
                                  , r = e[2];
                                t[n] = r
                            }
                        },
                        S: function() {
                            for (var e in this.q)
                                this.p[e] = this.q[e]
                        },
                        F: function() {
                            var e = this;
                            T(this.r, (function(t, n) {
                                var r = n[0]
                                  , i = n[1];
                                r.apply(e, [e].concat(i))
                            }
                            ))
                        },
                        G: function(e) {
                            var t = Z.exec(e)
                              , n = {}
                              , r = 7;
                            try {
                                for (; r--; )
                                    n[D[r]] = t[r] || ""
                            } catch (i) {
                                throw new l("Invalid DSN: " + e)
                            }
                            if (n.pass && !this.k.allowSecretKey)
                                throw new l("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
                            return n
                        },
                        J: function(e) {
                            var t = "//" + e.host + (e.port ? ":" + e.port : "");
                            return e.protocol && (t = e.protocol + ":" + t),
                            t
                        },
                        A: function(e, t) {
                            (t = t || {}).mechanism = t.mechanism || {
                                type: "onerror",
                                handled: !1
                            },
                            this.m || this.V(e, t)
                        },
                        V: function(e, t) {
                            var n = this.X(e, t);
                            this.$("handle", {
                                stackInfo: e,
                                options: t
                            }),
                            this.fa(e.name, e.message, e.url, e.lineno, n, t)
                        },
                        X: function(e, t) {
                            var n = this
                              , r = [];
                            if (e.stack && e.stack.length && (T(e.stack, (function(t, i) {
                                var o = n.ga(i, e.url);
                                o && r.push(o)
                            }
                            )),
                            t && t.trimHeadFrames))
                                for (var i = 0; i < t.trimHeadFrames && i < r.length; i++)
                                    r[i].in_app = !1;
                            return r = r.slice(0, this.k.stackTraceLimit)
                        },
                        ga: function(e, t) {
                            var n = {
                                filename: e.url,
                                lineno: e.line,
                                colno: e.column,
                                "function": e.func || "?"
                            };
                            return e.url || (n.filename = t),
                            n.in_app = !(this.k.includePaths.test && !this.k.includePaths.test(n.filename) || /(Raven|TraceKit)\./.test(n["function"]) || /raven\.(min\.)?js$/.test(n.filename)),
                            n
                        },
                        fa: function(e, t, n, r, i, o) {
                            var a, s = (e ? e + ": " : "") + (t || "");
                            if ((!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(t) && !this.k.ignoreErrors.test(s)) && (i && i.length ? (n = i[0].filename || n,
                            i.reverse(),
                            a = {
                                frames: i
                            }) : n && (a = {
                                frames: [{
                                    filename: n,
                                    lineno: r,
                                    in_app: !0
                                }]
                            }),
                            (!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(n)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(n)))) {
                                var c = V({
                                    exception: {
                                        values: [{
                                            type: e,
                                            value: t,
                                            stacktrace: a
                                        }]
                                    },
                                    transaction: n
                                }, o)
                                  , l = c.exception.values[0];
                                null == l.type && "" === l.value && (l.value = "Unrecoverable error caught"),
                                !c.exception.mechanism && c.mechanism && (c.exception.mechanism = c.mechanism,
                                delete c.mechanism),
                                c.exception.mechanism = V({
                                    type: "generic",
                                    handled: !0
                                }, c.exception.mechanism || {}),
                                this.Y(c)
                            }
                        },
                        ha: function(e) {
                            var t = this.k.maxMessageLength;
                            if (e.message && (e.message = k(e.message, t)),
                            e.exception) {
                                var n = e.exception.values[0];
                                n.value = k(n.value, t)
                            }
                            var r = e.request;
                            return r && (r.url && (r.url = k(r.url, this.k.maxUrlLength)),
                            r.Referer && (r.Referer = k(r.Referer, this.k.maxUrlLength))),
                            e.breadcrumbs && e.breadcrumbs.values && this.ia(e.breadcrumbs),
                            e
                        },
                        ia: function(e) {
                            for (var t, n, r, i = ["to", "from", "url"], o = 0; o < e.values.length; ++o)
                                if ((n = e.values[o]).hasOwnProperty("data") && m(n.data) && !E(n.data)) {
                                    r = V({}, n.data);
                                    for (var a = 0; a < i.length; ++a)
                                        t = i[a],
                                        r.hasOwnProperty(t) && r[t] && (r[t] = k(r[t], this.k.maxUrlLength));
                                    e.values[o].data = r
                                }
                        },
                        ja: function() {
                            if (this.c || this.b) {
                                var e = {};
                                return this.c && K.userAgent && (e.headers = {
                                    "User-Agent": K.userAgent
                                }),
                                I.location && I.location.href && (e.url = I.location.href),
                                this.b && z.referrer && (e.headers || (e.headers = {}),
                                e.headers.Referer = z.referrer),
                                e
                            }
                        },
                        y: function() {
                            this.ka = 0,
                            this.la = null
                        },
                        ma: function() {
                            return this.ka && r() - this.la < this.ka
                        },
                        na: function(e) {
                            var t = this.e;
                            return !(!t || e.message !== t.message || e.transaction !== t.transaction) && (e.stacktrace || t.stacktrace ? P(e.stacktrace, t.stacktrace) : e.exception || t.exception ? O(e.exception, t.exception) : !e.fingerprint && !t.fingerprint || Boolean(e.fingerprint && t.fingerprint) && JSON.stringify(e.fingerprint) === JSON.stringify(t.fingerprint))
                        },
                        oa: function(e) {
                            if (!this.ma()) {
                                var t = e.status;
                                if (400 === t || 401 === t || 429 === t) {
                                    var n;
                                    try {
                                        n = N() ? e.headers.get("Retry-After") : e.getResponseHeader("Retry-After"),
                                        n = 1e3 * parseInt(n, 10)
                                    } catch (i) {}
                                    this.ka = n || (2 * this.ka || 1e3),
                                    this.la = r()
                                }
                            }
                        },
                        Y: function(e) {
                            var t = this.k
                              , n = {
                                project: this.i,
                                logger: t.logger,
                                platform: "javascript"
                            }
                              , i = this.ja();
                            if (i && (n.request = i),
                            e.trimHeadFrames && delete e.trimHeadFrames,
                            (e = V(n, e)).tags = V(V({}, this.j.tags), e.tags),
                            e.extra = V(V({}, this.j.extra), e.extra),
                            e.extra["session:duration"] = r() - this.s,
                            this.u && this.u.length > 0 && (e.breadcrumbs = {
                                values: [].slice.call(this.u, 0)
                            }),
                            this.j.user && (e.user = this.j.user),
                            t.environment && (e.environment = t.environment),
                            t.release && (e.release = t.release),
                            t.serverName && (e.server_name = t.serverName),
                            e = this.pa(e),
                            Object.keys(e).forEach((function(t) {
                                (null == e[t] || "" === e[t] || _(e[t])) && delete e[t]
                            }
                            )),
                            v(t.dataCallback) && (e = t.dataCallback(e) || e),
                            e && !_(e) && (!v(t.shouldSendCallback) || t.shouldSendCallback(e)))
                                return this.ma() ? void this.z("warn", "Raven dropped error due to backoff: ", e) : void ("number" == typeof t.sampleRate ? Math.random() < t.sampleRate && this.qa(e) : this.qa(e))
                        },
                        pa: function(e) {
                            return B(e, this.k.sanitizeKeys)
                        },
                        ra: function() {
                            return U()
                        },
                        qa: function(e, t) {
                            var n = this
                              , r = this.k;
                            if (this.isSetup()) {
                                if (e = this.ha(e),
                                !this.k.allowDuplicates && this.na(e))
                                    return void this.z("warn", "Raven dropped repeat event: ", e);
                                this.f = e.event_id || (e.event_id = this.ra()),
                                this.e = e,
                                this.z("debug", "Raven about to send:", e);
                                var i = {
                                    sentry_version: "7",
                                    sentry_client: "raven-js/" + this.VERSION,
                                    sentry_key: this.h
                                };
                                this.I && (i.sentry_secret = this.I);
                                var o = e.exception && e.exception.values[0];
                                this.k.autoBreadcrumbs && this.k.autoBreadcrumbs.sentry && this.captureBreadcrumb({
                                    category: "sentry",
                                    message: o ? (o.type ? o.type + ": " : "") + o.value : e.message,
                                    event_id: e.event_id,
                                    level: e.level || "error"
                                });
                                var a = this.K;
                                (r.transport || this._makeRequest).call(this, {
                                    url: a,
                                    auth: i,
                                    data: e,
                                    options: r,
                                    onSuccess: function() {
                                        n.y(),
                                        n.$("success", {
                                            data: e,
                                            src: a
                                        }),
                                        t && t()
                                    },
                                    onError: function(r) {
                                        n.z("error", "Raven transport failed to send: ", r),
                                        r.request && n.oa(r.request),
                                        n.$("failure", {
                                            data: e,
                                            src: a
                                        }),
                                        r = r || new Error("Raven send failed (no additional details provided)"),
                                        t && t(r)
                                    }
                                })
                            }
                        },
                        _makeRequest: function(e) {
                            var t = e.url + "?" + x(e.auth)
                              , n = null
                              , r = {};
                            if (e.options.headers && (n = this.sa(e.options.headers)),
                            e.options.fetchParameters && (r = this.sa(e.options.fetchParameters)),
                            N()) {
                                r.body = s(e.data);
                                var i = V({}, this.l)
                                  , o = V(i, r);
                                return n && (o.headers = n),
                                I.fetch(t, o).then((function(t) {
                                    if (t.ok)
                                        e.onSuccess && e.onSuccess();
                                    else {
                                        var n = new Error("Sentry error code: " + t.status);
                                        n.request = t,
                                        e.onError && e.onError(n)
                                    }
                                }
                                ))["catch"]((function() {
                                    e.onError && e.onError(new Error("Sentry error code: network unavailable"))
                                }
                                ))
                            }
                            var a = I.XMLHttpRequest && new I.XMLHttpRequest;
                            a && (("withCredentials"in a || "undefined" != typeof XDomainRequest) && ("withCredentials"in a ? a.onreadystatechange = function() {
                                if (4 === a.readyState)
                                    if (200 === a.status)
                                        e.onSuccess && e.onSuccess();
                                    else if (e.onError) {
                                        var t = new Error("Sentry error code: " + a.status);
                                        t.request = a,
                                        e.onError(t)
                                    }
                            }
                            : (a = new XDomainRequest,
                            t = t.replace(/^https?:/, ""),
                            e.onSuccess && (a.onload = e.onSuccess),
                            e.onError && (a.onerror = function() {
                                var t = new Error("Sentry error code: XDomainRequest");
                                t.request = a,
                                e.onError(t)
                            }
                            )),
                            a.open("POST", t),
                            n && T(n, (function(e, t) {
                                a.setRequestHeader(e, t)
                            }
                            )),
                            a.send(s(e.data))))
                        },
                        sa: function(e) {
                            var t = {};
                            for (var n in e)
                                if (e.hasOwnProperty(n)) {
                                    var r = e[n];
                                    t[n] = "function" == typeof r ? r() : r
                                }
                            return t
                        },
                        z: function(e) {
                            this.q[e] && (this.debug || this.k.debug) && Function.prototype.apply.call(this.q[e], this.p, [].slice.call(arguments, 1))
                        },
                        Z: function(e, t) {
                            y(t) ? delete this.j[e] : this.j[e] = V(this.j[e] || {}, t)
                        }
                    },
                    o.prototype.setUser = o.prototype.setUserContext,
                    o.prototype.setReleaseContext = o.prototype.setRelease,
                    t.exports = o
                }
                ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }
            , {
                1: 1,
                2: 2,
                5: 5,
                6: 6,
                7: 7,
                8: 8
            }],
            4: [function(e, t, n) {
                (function(n) {
                    var r = e(3)
                      , i = "undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : {}
                      , o = i.Raven
                      , a = new r;
                    a.noConflict = function() {
                        return i.Raven = o,
                        a
                    }
                    ,
                    a.afterLoad(),
                    t.exports = a,
                    t.exports.Client = r
                }
                ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }
            , {
                3: 3
            }],
            5: [function(e, t, n) {
                (function(n) {
                    function r(e) {
                        switch (Object.prototype.toString.call(e)) {
                        case "[object Error]":
                        case "[object Exception]":
                        case "[object DOMException]":
                            return !0;
                        default:
                            return e instanceof Error
                        }
                    }
                    function i(e) {
                        return "[object DOMError]" === Object.prototype.toString.call(e)
                    }
                    function o(e) {
                        return void 0 === e
                    }
                    function a(e) {
                        return "[object Object]" === Object.prototype.toString.call(e)
                    }
                    function s(e) {
                        return "[object String]" === Object.prototype.toString.call(e)
                    }
                    function c(e) {
                        return "[object Array]" === Object.prototype.toString.call(e)
                    }
                    function l() {
                        if (!("fetch"in _))
                            return !1;
                        try {
                            return new Headers,
                            new Request(""),
                            new Response,
                            !0
                        } catch (e) {
                            return !1
                        }
                    }
                    function u(e, t) {
                        var n, r;
                        if (o(e.length))
                            for (n in e)
                                p(e, n) && t.call(null, n, e[n]);
                        else if (r = e.length)
                            for (n = 0; n < r; n++)
                                t.call(null, n, e[n])
                    }
                    function h(e, t) {
                        if ("number" != typeof t)
                            throw new Error("2nd argument to `truncate` function should be a number");
                        return "string" != typeof e || 0 === t || e.length <= t ? e : e.substr(0, t) + "…"
                    }
                    function p(e, t) {
                        return Object.prototype.hasOwnProperty.call(e, t)
                    }
                    function d(e) {
                        for (var t, n = [], r = 0, i = e.length; r < i; r++)
                            s(t = e[r]) ? n.push(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : t && t.source && n.push(t.source);
                        return new RegExp(n.join("|"),"i")
                    }
                    function f(e) {
                        var t, n, r, i, o, a = [];
                        if (!e || !e.tagName)
                            return "";
                        if (a.push(e.tagName.toLowerCase()),
                        e.id && a.push("#" + e.id),
                        (t = e.className) && s(t))
                            for (n = t.split(/\s+/),
                            o = 0; o < n.length; o++)
                                a.push("." + n[o]);
                        var c = ["type", "name", "title", "alt"];
                        for (o = 0; o < c.length; o++)
                            r = c[o],
                            (i = e.getAttribute(r)) && a.push("[" + r + '="' + i + '"]');
                        return a.join("")
                    }
                    function m(e, t) {
                        return !!(!!e ^ !!t)
                    }
                    function g(e, t) {
                        if (m(e, t))
                            return !1;
                        var n = e.frames
                          , r = t.frames;
                        if (void 0 === n || void 0 === r)
                            return !1;
                        if (n.length !== r.length)
                            return !1;
                        for (var i, o, a = 0; a < n.length; a++)
                            if (i = n[a],
                            o = r[a],
                            i.filename !== o.filename || i.lineno !== o.lineno || i.colno !== o.colno || i["function"] !== o["function"])
                                return !1;
                        return !0
                    }
                    function y(e) {
                        return function(e) {
                            return ~-encodeURI(e).split(/%..|./).length
                        }(JSON.stringify(e))
                    }
                    function v(e) {
                        if ("string" == typeof e) {
                            return h(e, 40)
                        }
                        if ("number" == typeof e || "boolean" == typeof e || void 0 === e)
                            return e;
                        var t = Object.prototype.toString.call(e);
                        return "[object Object]" === t ? "[Object]" : "[object Array]" === t ? "[Array]" : "[object Function]" === t ? e.name ? "[Function: " + e.name + "]" : "[Function]" : e
                    }
                    function w(e, t) {
                        return 0 === t ? v(e) : a(e) ? Object.keys(e).reduce((function(n, r) {
                            return n[r] = w(e[r], t - 1),
                            n
                        }
                        ), {}) : Array.isArray(e) ? e.map((function(e) {
                            return w(e, t - 1)
                        }
                        )) : v(e)
                    }
                    var b = e(7)
                      , _ = "undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : {}
                      , T = 3
                      , V = 51200
                      , k = 40;
                    t.exports = {
                        isObject: function(e) {
                            return "object" == typeof e && null !== e
                        },
                        isError: r,
                        isErrorEvent: function(e) {
                            return "[object ErrorEvent]" === Object.prototype.toString.call(e)
                        },
                        isDOMError: i,
                        isDOMException: function(e) {
                            return "[object DOMException]" === Object.prototype.toString.call(e)
                        },
                        isUndefined: o,
                        isFunction: function(e) {
                            return "function" == typeof e
                        },
                        isPlainObject: a,
                        isString: s,
                        isArray: c,
                        isEmptyObject: function(e) {
                            if (!a(e))
                                return !1;
                            for (var t in e)
                                if (e.hasOwnProperty(t))
                                    return !1;
                            return !0
                        },
                        supportsErrorEvent: function() {
                            try {
                                return new ErrorEvent(""),
                                !0
                            } catch (e) {
                                return !1
                            }
                        },
                        supportsDOMError: function() {
                            try {
                                return new DOMError(""),
                                !0
                            } catch (e) {
                                return !1
                            }
                        },
                        supportsDOMException: function() {
                            try {
                                return new DOMException(""),
                                !0
                            } catch (e) {
                                return !1
                            }
                        },
                        supportsFetch: l,
                        supportsReferrerPolicy: function() {
                            if (!l())
                                return !1;
                            try {
                                return new Request("pickleRick",{
                                    referrerPolicy: "origin"
                                }),
                                !0
                            } catch (e) {
                                return !1
                            }
                        },
                        supportsPromiseRejectionEvent: function() {
                            return "function" == typeof PromiseRejectionEvent
                        },
                        wrappedCallback: function(e) {
                            return function(t, n) {
                                var r = e(t) || t;
                                return n && n(r) || r
                            }
                        },
                        each: u,
                        objectMerge: function(e, t) {
                            return t ? (u(t, (function(t, n) {
                                e[t] = n
                            }
                            )),
                            e) : e
                        },
                        truncate: h,
                        objectFrozen: function(e) {
                            return !!Object.isFrozen && Object.isFrozen(e)
                        },
                        hasKey: p,
                        joinRegExp: d,
                        urlencode: function(e) {
                            var t = [];
                            return u(e, (function(e, n) {
                                t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n))
                            }
                            )),
                            t.join("&")
                        },
                        uuid4: function() {
                            var e = _.crypto || _.msCrypto;
                            if (!o(e) && e.getRandomValues) {
                                var t = new Uint16Array(8);
                                e.getRandomValues(t),
                                t[3] = 4095 & t[3] | 16384,
                                t[4] = 16383 & t[4] | 32768;
                                var n = function(e) {
                                    for (var t = e.toString(16); t.length < 4; )
                                        t = "0" + t;
                                    return t
                                };
                                return n(t[0]) + n(t[1]) + n(t[2]) + n(t[3]) + n(t[4]) + n(t[5]) + n(t[6]) + n(t[7])
                            }
                            return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
                                var t = 16 * Math.random() | 0;
                                return ("x" === e ? t : 3 & t | 8).toString(16)
                            }
                            ))
                        },
                        htmlTreeAsString: function(e) {
                            for (var t, n = [], r = 0, i = 0, o = " > ".length; e && r++ < 5 && !("html" === (t = f(e)) || r > 1 && i + n.length * o + t.length >= 80); )
                                n.push(t),
                                i += t.length,
                                e = e.parentNode;
                            return n.reverse().join(" > ")
                        },
                        htmlElementAsString: f,
                        isSameException: function(e, t) {
                            return !m(e, t) && (e = e.values[0],
                            t = t.values[0],
                            e.type === t.type && e.value === t.value && !function(e, t) {
                                return o(e) && o(t)
                            }(e.stacktrace, t.stacktrace) && g(e.stacktrace, t.stacktrace))
                        },
                        isSameStacktrace: g,
                        parseUrl: function(e) {
                            if ("string" != typeof e)
                                return {};
                            var t = e.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/)
                              , n = t[6] || ""
                              , r = t[8] || "";
                            return {
                                protocol: t[2],
                                host: t[4],
                                path: t[5],
                                relative: t[5] + n + r
                            }
                        },
                        fill: function(e, t, n, r) {
                            if (null != e) {
                                var i = e[t];
                                e[t] = n(i),
                                e[t].M = !0,
                                e[t].O = i,
                                r && r.push([e, t, i])
                            }
                        },
                        safeJoin: function(e, t) {
                            if (!c(e))
                                return "";
                            for (var n = [], i = 0; i < e.length; i++)
                                try {
                                    n.push(String(e[i]))
                                } catch (r) {
                                    n.push("[value cannot be serialized]")
                                }
                            return n.join(t)
                        },
                        serializeException: function E(e, t, n) {
                            if (!a(e))
                                return e;
                            n = "number" != typeof (t = "number" != typeof t ? T : t) ? V : n;
                            var r = w(e, t);
                            return y(b(r)) > n ? E(e, t - 1) : r
                        },
                        serializeKeysForMessage: function(e, t) {
                            if ("number" == typeof e || "string" == typeof e)
                                return e.toString();
                            if (!Array.isArray(e))
                                return "";
                            if (0 === (e = e.filter((function(e) {
                                return "string" == typeof e
                            }
                            ))).length)
                                return "[object has no keys]";
                            if (t = "number" != typeof t ? k : t,
                            e[0].length >= t)
                                return e[0];
                            for (var n = e.length; n > 0; n--) {
                                var r = e.slice(0, n).join(", ");
                                if (!(r.length > t))
                                    return n === e.length ? r : r + "…"
                            }
                            return ""
                        },
                        sanitize: function(e, t) {
                            if (!c(t) || c(t) && 0 === t.length)
                                return e;
                            var n, r = d(t), o = "********";
                            try {
                                n = JSON.parse(b(e))
                            } catch (i) {
                                return e
                            }
                            return function s(e) {
                                return c(e) ? e.map((function(e) {
                                    return s(e)
                                }
                                )) : a(e) ? Object.keys(e).reduce((function(t, n) {
                                    return t[n] = r.test(n) ? o : s(e[n]),
                                    t
                                }
                                ), {}) : e
                            }(n)
                        }
                    }
                }
                ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }
            , {
                7: 7
            }],
            6: [function(e, t, n) {
                (function(n) {
                    function r() {
                        return "undefined" == typeof document || null == document.location ? "" : document.location.href
                    }
                    var i = e(5)
                      , o = {
                        collectWindowErrors: !0,
                        debug: !1
                    }
                      , a = "undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : {}
                      , s = [].slice
                      , c = "?"
                      , l = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
                    o.report = function() {
                        function e(t, n) {
                            var r = null;
                            if (!n || o.collectWindowErrors) {
                                for (var i in d)
                                    if (d.hasOwnProperty(i))
                                        try {
                                            d[i].apply(null, [t].concat(s.call(arguments, 2)))
                                        } catch (e) {
                                            r = e
                                        }
                                if (r)
                                    throw r
                            }
                        }
                        function t(t, a, s, u, p) {
                            var d = i.isErrorEvent(p) ? p.error : p
                              , f = i.isErrorEvent(t) ? t.message : t;
                            if (g)
                                o.computeStackTrace.augmentStackTraceWithInitialElement(g, a, s, f),
                                n();
                            else if (d && i.isError(d))
                                e(o.computeStackTrace(d), !0);
                            else {
                                var m, y = {
                                    url: a,
                                    line: s,
                                    column: u
                                }, v = void 0;
                                if ("[object String]" === {}.toString.call(f))
                                    (m = f.match(l)) && (v = m[1],
                                    f = m[2]);
                                y.func = c,
                                e({
                                    name: v,
                                    message: f,
                                    url: r(),
                                    stack: [y]
                                }, !0)
                            }
                            return !!h && h.apply(this, arguments)
                        }
                        function n() {
                            var t = g
                              , n = f;
                            f = null,
                            g = null,
                            m = null,
                            e.apply(null, [t, !1].concat(n))
                        }
                        function u(e, t) {
                            var r = s.call(arguments, 1);
                            if (g) {
                                if (m === e)
                                    return;
                                n()
                            }
                            var i = o.computeStackTrace(e);
                            if (g = i,
                            m = e,
                            f = r,
                            setTimeout((function() {
                                m === e && n()
                            }
                            ), i.incomplete ? 2e3 : 0),
                            !1 !== t)
                                throw e
                        }
                        var h, p, d = [], f = null, m = null, g = null;
                        return u.subscribe = function(e) {
                            p || (h = a.onerror,
                            a.onerror = t,
                            p = !0),
                            d.push(e)
                        }
                        ,
                        u.unsubscribe = function(e) {
                            for (var t = d.length - 1; t >= 0; --t)
                                d[t] === e && d.splice(t, 1)
                        }
                        ,
                        u.uninstall = function() {
                            p && (a.onerror = h,
                            p = !1,
                            h = void 0),
                            d = []
                        }
                        ,
                        u
                    }(),
                    o.computeStackTrace = function() {
                        function e(e) {
                            if ("undefined" != typeof e.stack && e.stack) {
                                for (var t, n, i, o = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, a = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx(?:-web)|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, s = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i, l = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, u = /\((\S*)(?::(\d+))(?::(\d+))\)/, h = e.stack.split("\n"), p = [], d = (/^(.*) is undefined$/.exec(e.message),
                                0), f = h.length; d < f; ++d) {
                                    if (n = o.exec(h[d])) {
                                        var m = n[2] && 0 === n[2].indexOf("native");
                                        n[2] && 0 === n[2].indexOf("eval") && (t = u.exec(n[2])) && (n[2] = t[1],
                                        n[3] = t[2],
                                        n[4] = t[3]),
                                        i = {
                                            url: m ? null : n[2],
                                            func: n[1] || c,
                                            args: m ? [n[2]] : [],
                                            line: n[3] ? +n[3] : null,
                                            column: n[4] ? +n[4] : null
                                        }
                                    } else if (n = a.exec(h[d]))
                                        i = {
                                            url: n[2],
                                            func: n[1] || c,
                                            args: [],
                                            line: +n[3],
                                            column: n[4] ? +n[4] : null
                                        };
                                    else {
                                        if (!(n = s.exec(h[d])))
                                            continue;
                                        n[3] && n[3].indexOf(" > eval") > -1 && (t = l.exec(n[3])) ? (n[3] = t[1],
                                        n[4] = t[2],
                                        n[5] = null) : 0 !== d || n[5] || "undefined" == typeof e.columnNumber || (p[0].column = e.columnNumber + 1),
                                        i = {
                                            url: n[3],
                                            func: n[1] || c,
                                            args: n[2] ? n[2].split(",") : [],
                                            line: n[4] ? +n[4] : null,
                                            column: n[5] ? +n[5] : null
                                        }
                                    }
                                    if (!i.func && i.line && (i.func = c),
                                    i.url && "blob:" === i.url.substr(0, 5)) {
                                        var g = new XMLHttpRequest;
                                        if (g.open("GET", i.url, !1),
                                        g.send(null),
                                        200 === g.status) {
                                            var y = g.responseText || ""
                                              , v = (y = y.slice(-300)).match(/\/\/# sourceMappingURL=(.*)$/);
                                            if (v) {
                                                var w = v[1];
                                                "~" === w.charAt(0) && (w = ("undefined" == typeof document || null == document.location ? "" : document.location.origin ? document.location.origin : document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "")) + w.slice(1)),
                                                i.url = w.slice(0, -4)
                                            }
                                        }
                                    }
                                    p.push(i)
                                }
                                return p.length ? {
                                    name: e.name,
                                    message: e.message,
                                    url: r(),
                                    stack: p
                                } : null
                            }
                        }
                        function t(e, t, n, r) {
                            var i = {
                                url: t,
                                line: n
                            };
                            if (i.url && i.line) {
                                if (e.incomplete = !1,
                                i.func || (i.func = c),
                                e.stack.length > 0 && e.stack[0].url === i.url) {
                                    if (e.stack[0].line === i.line)
                                        return !1;
                                    if (!e.stack[0].line && e.stack[0].func === i.func)
                                        return e.stack[0].line = i.line,
                                        !1
                                }
                                return e.stack.unshift(i),
                                e.partial = !0,
                                !0
                            }
                            return e.incomplete = !0,
                            !1
                        }
                        function n(e, a) {
                            for (var s, l, u = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, h = [], p = {}, d = !1, f = n.caller; f && !d; f = f.caller)
                                if (f !== i && f !== o.report) {
                                    if (l = {
                                        url: null,
                                        func: c,
                                        line: null,
                                        column: null
                                    },
                                    f.name ? l.func = f.name : (s = u.exec(f.toString())) && (l.func = s[1]),
                                    "undefined" == typeof l.func)
                                        try {
                                            l.func = s.input.substring(0, s.input.indexOf("{"))
                                        } catch (g) {}
                                    p["" + f] ? d = !0 : p["" + f] = !0,
                                    h.push(l)
                                }
                            a && h.splice(0, a);
                            var m = {
                                name: e.name,
                                message: e.message,
                                url: r(),
                                stack: h
                            };
                            return t(m, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description),
                            m
                        }
                        function i(t, i) {
                            var s = null;
                            i = null == i ? 0 : +i;
                            try {
                                if (s = e(t))
                                    return s
                            } catch (a) {
                                if (o.debug)
                                    throw a
                            }
                            try {
                                if (s = n(t, i + 1))
                                    return s
                            } catch (a) {
                                if (o.debug)
                                    throw a
                            }
                            return {
                                name: t.name,
                                message: t.message,
                                url: r()
                            }
                        }
                        return i.augmentStackTraceWithInitialElement = t,
                        i.computeStackTraceFromStackProp = e,
                        i
                    }(),
                    t.exports = o
                }
                ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }
            , {
                5: 5
            }],
            7: [function(e, t, n) {
                function r(e, t) {
                    for (var n = 0; n < e.length; ++n)
                        if (e[n] === t)
                            return n;
                    return -1
                }
                function i(e, t) {
                    var n = []
                      , i = [];
                    return null == t && (t = function(e, t) {
                        return n[0] === t ? "[Circular ~]" : "[Circular ~." + i.slice(0, r(n, t)).join(".") + "]"
                    }
                    ),
                    function(o, a) {
                        if (n.length > 0) {
                            var s = r(n, this);
                            ~s ? n.splice(s + 1) : n.push(this),
                            ~s ? i.splice(s, 1 / 0, o) : i.push(o),
                            ~r(n, a) && (a = t.call(this, o, a))
                        } else
                            n.push(a);
                        return null == e ? a instanceof Error ? function(e) {
                            var t = {
                                stack: e.stack,
                                message: e.message,
                                name: e.name
                            };
                            for (var n in e)
                                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                            return t
                        }(a) : a : e.call(this, o, a)
                    }
                }
                n = t.exports = function(e, t, n, r) {
                    return JSON.stringify(e, i(t, r), n)
                }
                ,
                n.getSerialize = i
            }
            , {}],
            8: [function(e, t, n) {
                function r(e, t) {
                    var n = (65535 & e) + (65535 & t);
                    return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
                }
                function i(e, t, n, i, o, a) {
                    return r(function(e, t) {
                        return e << t | e >>> 32 - t
                    }(r(r(t, e), r(i, a)), o), n)
                }
                function o(e, t, n, r, o, a, s) {
                    return i(t & n | ~t & r, e, t, o, a, s)
                }
                function a(e, t, n, r, o, a, s) {
                    return i(t & r | n & ~r, e, t, o, a, s)
                }
                function s(e, t, n, r, o, a, s) {
                    return i(t ^ n ^ r, e, t, o, a, s)
                }
                function c(e, t, n, r, o, a, s) {
                    return i(n ^ (t | ~r), e, t, o, a, s)
                }
                function l(e, t) {
                    e[t >> 5] |= 128 << t % 32,
                    e[14 + (t + 64 >>> 9 << 4)] = t;
                    var n, i, l, u, h, p = 1732584193, d = -271733879, f = -1732584194, m = 271733878;
                    for (n = 0; n < e.length; n += 16)
                        i = p,
                        l = d,
                        u = f,
                        h = m,
                        p = o(p, d, f, m, e[n], 7, -680876936),
                        m = o(m, p, d, f, e[n + 1], 12, -389564586),
                        f = o(f, m, p, d, e[n + 2], 17, 606105819),
                        d = o(d, f, m, p, e[n + 3], 22, -1044525330),
                        p = o(p, d, f, m, e[n + 4], 7, -176418897),
                        m = o(m, p, d, f, e[n + 5], 12, 1200080426),
                        f = o(f, m, p, d, e[n + 6], 17, -1473231341),
                        d = o(d, f, m, p, e[n + 7], 22, -45705983),
                        p = o(p, d, f, m, e[n + 8], 7, 1770035416),
                        m = o(m, p, d, f, e[n + 9], 12, -1958414417),
                        f = o(f, m, p, d, e[n + 10], 17, -42063),
                        d = o(d, f, m, p, e[n + 11], 22, -1990404162),
                        p = o(p, d, f, m, e[n + 12], 7, 1804603682),
                        m = o(m, p, d, f, e[n + 13], 12, -40341101),
                        f = o(f, m, p, d, e[n + 14], 17, -1502002290),
                        p = a(p, d = o(d, f, m, p, e[n + 15], 22, 1236535329), f, m, e[n + 1], 5, -165796510),
                        m = a(m, p, d, f, e[n + 6], 9, -1069501632),
                        f = a(f, m, p, d, e[n + 11], 14, 643717713),
                        d = a(d, f, m, p, e[n], 20, -373897302),
                        p = a(p, d, f, m, e[n + 5], 5, -701558691),
                        m = a(m, p, d, f, e[n + 10], 9, 38016083),
                        f = a(f, m, p, d, e[n + 15], 14, -660478335),
                        d = a(d, f, m, p, e[n + 4], 20, -405537848),
                        p = a(p, d, f, m, e[n + 9], 5, 568446438),
                        m = a(m, p, d, f, e[n + 14], 9, -1019803690),
                        f = a(f, m, p, d, e[n + 3], 14, -187363961),
                        d = a(d, f, m, p, e[n + 8], 20, 1163531501),
                        p = a(p, d, f, m, e[n + 13], 5, -1444681467),
                        m = a(m, p, d, f, e[n + 2], 9, -51403784),
                        f = a(f, m, p, d, e[n + 7], 14, 1735328473),
                        p = s(p, d = a(d, f, m, p, e[n + 12], 20, -1926607734), f, m, e[n + 5], 4, -378558),
                        m = s(m, p, d, f, e[n + 8], 11, -2022574463),
                        f = s(f, m, p, d, e[n + 11], 16, 1839030562),
                        d = s(d, f, m, p, e[n + 14], 23, -35309556),
                        p = s(p, d, f, m, e[n + 1], 4, -1530992060),
                        m = s(m, p, d, f, e[n + 4], 11, 1272893353),
                        f = s(f, m, p, d, e[n + 7], 16, -155497632),
                        d = s(d, f, m, p, e[n + 10], 23, -1094730640),
                        p = s(p, d, f, m, e[n + 13], 4, 681279174),
                        m = s(m, p, d, f, e[n], 11, -358537222),
                        f = s(f, m, p, d, e[n + 3], 16, -722521979),
                        d = s(d, f, m, p, e[n + 6], 23, 76029189),
                        p = s(p, d, f, m, e[n + 9], 4, -640364487),
                        m = s(m, p, d, f, e[n + 12], 11, -421815835),
                        f = s(f, m, p, d, e[n + 15], 16, 530742520),
                        p = c(p, d = s(d, f, m, p, e[n + 2], 23, -995338651), f, m, e[n], 6, -198630844),
                        m = c(m, p, d, f, e[n + 7], 10, 1126891415),
                        f = c(f, m, p, d, e[n + 14], 15, -1416354905),
                        d = c(d, f, m, p, e[n + 5], 21, -57434055),
                        p = c(p, d, f, m, e[n + 12], 6, 1700485571),
                        m = c(m, p, d, f, e[n + 3], 10, -1894986606),
                        f = c(f, m, p, d, e[n + 10], 15, -1051523),
                        d = c(d, f, m, p, e[n + 1], 21, -2054922799),
                        p = c(p, d, f, m, e[n + 8], 6, 1873313359),
                        m = c(m, p, d, f, e[n + 15], 10, -30611744),
                        f = c(f, m, p, d, e[n + 6], 15, -1560198380),
                        d = c(d, f, m, p, e[n + 13], 21, 1309151649),
                        p = c(p, d, f, m, e[n + 4], 6, -145523070),
                        m = c(m, p, d, f, e[n + 11], 10, -1120210379),
                        f = c(f, m, p, d, e[n + 2], 15, 718787259),
                        d = c(d, f, m, p, e[n + 9], 21, -343485551),
                        p = r(p, i),
                        d = r(d, l),
                        f = r(f, u),
                        m = r(m, h);
                    return [p, d, f, m]
                }
                function u(e) {
                    var t, n = "", r = 32 * e.length;
                    for (t = 0; t < r; t += 8)
                        n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
                    return n
                }
                function h(e) {
                    var t, n = [];
                    for (n[(e.length >> 2) - 1] = void 0,
                    t = 0; t < n.length; t += 1)
                        n[t] = 0;
                    var r = 8 * e.length;
                    for (t = 0; t < r; t += 8)
                        n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
                    return n
                }
                function p(e) {
                    var t, n, r = "0123456789abcdef", i = "";
                    for (n = 0; n < e.length; n += 1)
                        t = e.charCodeAt(n),
                        i += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
                    return i
                }
                function d(e) {
                    return unescape(encodeURIComponent(e))
                }
                function f(e) {
                    return function(e) {
                        return u(l(h(e), 8 * e.length))
                    }(d(e))
                }
                function m(e, t) {
                    return function(e, t) {
                        var n, r, i = h(e), o = [], a = [];
                        for (o[15] = a[15] = void 0,
                        i.length > 16 && (i = l(i, 8 * e.length)),
                        n = 0; n < 16; n += 1)
                            o[n] = 909522486 ^ i[n],
                            a[n] = 1549556828 ^ i[n];
                        return r = l(o.concat(h(t)), 512 + 8 * t.length),
                        u(l(a.concat(r), 640))
                    }(d(e), d(t))
                }
                t.exports = function(e, t, n) {
                    return t ? n ? m(t, e) : function(e, t) {
                        return p(m(e, t))
                    }(t, e) : n ? f(e) : function(e) {
                        return p(f(e))
                    }(e)
                }
            }
            , {}]
        }, {}, [4])(4)
    }
    ));
    var I = [{
        family: "UC Browser",
        patterns: ["(UC? ?Browser|UCWEB|U3)[ /]?(\\d+)\\.(\\d+)\\.(\\d+)"]
    }, {
        family: "Opera",
        name_replace: "Opera Mobile",
        patterns: ["(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)", "(Opera)/(\\d+)\\.(\\d+).+Opera Mobi", "Opera Mobi.+(Opera)(?:/|\\s+)(\\d+)\\.(\\d+)", "Opera Mobi", "(?:Mobile Safari).*(OPR)/(\\d+)\\.(\\d+)\\.(\\d+)"]
    }, {
        family: "Opera",
        name_replace: "Opera Mini",
        patterns: ["(Opera Mini)(?:/att|)/?(\\d+|)(?:\\.(\\d+)|)(?:\\.(\\d+)|)", "(OPiOS)/(\\d+).(\\d+).(\\d+)"]
    }, {
        family: "Opera",
        name_replace: "Opera Neon",
        patterns: ["Chrome/.+( MMS)/(\\d+).(\\d+).(\\d+)"]
    }, {
        name_replace: "Opera",
        patterns: ["(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(?:Chrome).*(OPR)/(\\d+)\\.(\\d+)\\.(\\d+)"]
    }, {
        family: "Firefox",
        name_replace: "Firefox Mobile",
        patterns: ["(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)", "(Fennec)/(\\d+)\\.(\\d+)(pre)", "(Fennec)/(\\d+)\\.(\\d+)", "(?:Mobile|Tablet);.*(Firefox)/(\\d+)\\.(\\d+)", "(FxiOS)/(\\d+)\\.(\\d+)(\\.(\\d+)|)(\\.(\\d+)|)"]
    }, {
        name_replace: "Coc Coc",
        patterns: ["(coc_coc_browser)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
    }, {
        family: "QQ",
        name_replace: "QQ Mini",
        patterns: ["(MQQBrowser/Mini)(?:(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)|)"]
    }, {
        family: "QQ",
        name_replace: "QQ Mobile",
        patterns: ["(MQQBrowser)(?:/(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)|)"]
    }, {
        name_replace: "QQ",
        patterns: ["(QQBrowser)(?:/(\\d+)(?:\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)|)"]
    }, {
        family: "Edge",
        name: "Edge Mobile",
        patterns: ["Windows Phone .*(Edge)/(\\d+)\\.(\\d+)", "(EdgiOS|EdgA)/(\\d+)\\.(\\d+).(\\d+).(\\d+)"]
    }, {
        name_replace: "Edge",
        patterns: ["(Edge|Edg)/(\\d+)(?:\\.(\\d+)|)"]
    }, {
        patterns: ["(Puffin)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
    }, {
        family: "Chrome",
        name_replace: "Chrome Mobile",
        patterns: ["Version/.+(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "; wv\\).+(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile(?:[ /]|$)", " Mobile .*(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)"]
    }, {
        family: "Yandex",
        name_replace: "Yandex Mobile",
        patterns: ["(YaBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+).*Mobile"]
    }, {
        name_replace: "Yandex",
        patterns: ["(YaBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)"]
    }, {
        patterns: ["(Vivaldi)/(\\d+)\\.(\\d+)", "(Vivaldi)/(\\d+)\\.(\\d+)\\.(\\d+)"]
    }, {
        name_replace: "Brave",
        patterns: ["(brave)/(\\d+)\\.(\\d+)\\.(\\d+) Chrome"]
    }, {
        family: "Chrome",
        patterns: ["(Chromium|Chrome)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)"]
    }, {
        name_replace: "Internet Explorer Mobile",
        patterns: ["(IEMobile)[ /](\\d+)\\.(\\d+)"]
    }, {
        family: "Safari",
        name_replace: "Safari Mobile",
        patterns: ["(iPod|iPhone|iPad).+Version/(d+).(d+)(?:.(d+)|).*[ +]Safari", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).* AppleNews\\/\\d+\\.\\d+\\.\\d+?", "(iPod|iPhone|iPad).+Version/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).*Mobile.*[ +]Safari", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).*Mobile", "(iPod|iPod touch|iPhone|iPad).* Safari", "(iPod|iPod touch|iPhone|iPad)"]
    }, {
        name_replace: "Safari",
        patterns: ["(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|).*Safari/"]
    }, {
        name_replace: "Internet Explorer",
        patterns: ["(Trident)/(7|8).(0)"],
        major_replace: "11"
    }, {
        name_replace: "Internet Explorer",
        patterns: ["(Trident)/(6)\\.(0)"],
        major_replace: "10"
    }, {
        name_replace: "Internet Explorer",
        patterns: ["(Trident)/(5)\\.(0)"],
        major_replace: "9"
    }, {
        name_replace: "Internet Explorer",
        patterns: ["(Trident)/(4)\\.(0)"],
        major_replace: "8"
    }, {
        family: "Firefox",
        patterns: ["(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)", "(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*|)"]
    }]
      , z = [{
        family: "Windows",
        name_replace: "Windows Phone",
        patterns: ["(Windows Phone) (?:OS[ /])?(\\d+)\\.(\\d+)", "^UCWEB.*; (wds) (\\d+)\\.(d+)(?:\\.(\\d+)|);", "^UCWEB.*; (wds) (\\d+)\\.(\\d+)(?:\\.(\\d+)|);"]
    }, {
        family: "Windows",
        name_replace: "Windows Mobile",
        patterns: ["(Windows ?Mobile)"]
    }, {
        name_replace: "Android",
        patterns: ["(Android)[ \\-/](\\d+)(?:\\.(\\d+)|)(?:[.\\-]([a-z0-9]+)|)", "(Android) (d+);", "^UCWEB.*; (Adr) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+)|);", "^(JUC).*; ?U; ?(?:Android|)(\\d+)\\.(\\d+)(?:[\\.\\-]([a-z0-9]+)|)", "(android)\\s(?:mobile\\/)(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)|)|)", "(Silk-Accelerated=[a-z]{4,5})", "Puffin/[\\d\\.]+AT", "Puffin/[\\d\\.]+AP"]
    }, {
        name_replace: "Chrome OS",
        patterns: ["(x86_64|aarch64)\\ (\\d+)\\.(\\d+)\\.(\\d+).*Chrome.*(?:CitrixChromeApp)$", "(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
    }, {
        name_replace: "Windows",
        patterns: ["(Windows 10)", "(Windows NT 6\\.4)", "(Windows NT 10\\.0)"],
        major_replace: "10"
    }, {
        name_replace: "Windows",
        patterns: ["(Windows NT 6\\.3; ARM;)", "(Windows NT 6.3)"],
        major_replace: "8",
        minor_replace: "1"
    }, {
        name_replace: "Windows",
        patterns: ["(Windows NT 6\\.2)"],
        major_replace: "8"
    }, {
        name_replace: "Windows",
        patterns: ["(Windows NT 6\\.1)"],
        major_replace: "7"
    }, {
        name_replace: "Windows",
        patterns: ["(Windows NT 6\\.0)"],
        major_replace: "Vista"
    }, {
        name_replace: "Windows",
        patterns: ["(Windows (?:NT 5\\.2|NT 5\\.1))"],
        major_replace: "XP"
    }, {
        name_replace: "Mac OS X",
        patterns: ["((?:Mac[ +]?|; )OS[ +]X)[\\s+/](?:(\\d+)[_.](\\d+)(?:[_.](\\d+)|)|Mach-O)", "\\w+\\s+Mac OS X\\s+\\w+\\s+(\\d+).(\\d+).(\\d+).*", "(?:PPC|Intel) (Mac OS X)"]
    }, {
        name_replace: "Mac OS X",
        patterns: [" (Dar)(win)/(10).(d+).*((?:i386|x86_64))"],
        major_replace: "10",
        minor_replace: "6"
    }, {
        name_replace: "Mac OS X",
        patterns: [" (Dar)(win)/(11).(\\d+).*\\((?:i386|x86_64)\\)"],
        major_replace: "10",
        minor_replace: "7"
    }, {
        name_replace: "Mac OS X",
        patterns: [" (Dar)(win)/(12).(\\d+).*\\((?:i386|x86_64)\\)"],
        major_replace: "10",
        minor_replace: "8"
    }, {
        name_replace: "Mac OS X",
        patterns: [" (Dar)(win)/(13).(\\d+).*\\((?:i386|x86_64)\\)"],
        major_replace: "10",
        minor_replace: "9"
    }, {
        name_replace: "iOS",
        patterns: ["^UCWEB.*; (iPad|iPh|iPd) OS (\\d+)_(\\d+)(?:_(\\d+)|);", "(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(\\d+)[_\\.](\\d+)(?:[_\\.](\\d+)|)", "(iPhone|iPad|iPod); Opera", "(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)", "\\b(iOS[ /]|iOS; |iPhone(?:/| v|[ _]OS[/,]|; | OS : |\\d,\\d/|\\d,\\d; )|iPad/)(\\d{1,2})[_\\.](\\d{1,2})(?:[_\\.](\\d+)|)", "\\((iOS);", "(iPod|iPhone|iPad)", "Puffin/[\\d\\.]+IT", "Puffin/[\\d\\.]+IP"]
    }, {
        family: "Chrome",
        name_replace: "Chromecast",
        patterns: ["(CrKey -)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "(CrKey[ +]armv7l)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "(CrKey)(?:[/](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)"]
    }, {
        name_replace: "Debian",
        patterns: ["([Dd]ebian)"]
    }, {
        family: "Linux",
        name_replace: "Linux",
        patterns: ["(Linux Mint)(?:/(\\d+)|)"]
    }, {
        family: "Linux",
        patterns: ["(Ubuntu|Kubuntu|Arch Linux|CentOS|Slackware|Gentoo|openSUSE|SUSE|Red Hat|Fedora|PCLinuxOS|Mageia|(?:Free|Open|Net|\\b)BSD)", "(Mandriva)(?: Linux|)/(?:[\\d.-]+m[a-z]{2}(\\d+).(\\d)|)", "(Linux)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "\\(linux-gnu\\)"]
    }, {
        family: "BlackBerry",
        name_replace: "BlackBerry OS",
        patterns: ["(BB10);.+Version/(\\d+)\\.(\\d+)\\.(\\d+)", "(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(Black[Bb]erry)"]
    }, {
        patterns: ["(Fedora|Red Hat|PCLinuxOS|Puppy|Ubuntu|Kindle|Bada|Sailfish|Lubuntu|BackTrack|Slackware|(?:Free|Open|Net|\\b)BSD)[/ ](\\d+)\\.(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)"]
    }]
      , K = navigator.userAgent
      , L = function() {
        return K
    }
      , H = function(e) {
        return X(e || K, I)
    }
      , $ = function(e) {
        return X(e || K, z)
    };
    function J(e, t) {
        try {
            var n = new RegExp(t).exec(e);
            return n ? {
                name: n[1] || "Other",
                major: n[2] || "0",
                minor: n[3] || "0",
                patch: n[4] || "0"
            } : null
        } catch (Xn) {
            return null
        }
    }
    function X(e, t) {
        for (var n = null, r = null, i = -1, o = !1; ++i < t.length && !o; ) {
            n = t[i];
            for (var a = -1; ++a < n.patterns.length && !o; )
                o = null !== (r = J(e, n.patterns[a]))
        }
        return o ? (r.family = n.family || n.name_replace || r.name,
        n.name_replace && (r.name = n.name_replace),
        n.major_replace && (r.major = n.major_replace),
        n.minor_replace && (r.minor = n.minor_replace),
        n.patch_replace && (r.minor = n.patch_replace),
        r) : {
            family: "Other",
            name: "Other",
            major: "0",
            minor: "0",
            patch: "0"
        }
    }
    function Y() {
        var e = this
          , t = H()
          , n = L();
        this.agent = n.toLowerCase(),
        this.language = window.navigator.userLanguage || window.navigator.language,
        this.isCSS1 = "CSS1Compat" === (document.compatMode || ""),
        this.width = function() {
            return window.innerWidth && window.document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || window.document.documentElement.clientWidth || document.body.clientWidth
        }
        ,
        this.height = function() {
            return window.innerHeight || window.document.documentElement.clientHeight || document.body.clientHeight
        }
        ,
        this.scrollX = function() {
            return window.pageXOffset !== undefined ? window.pageXOffset : e.isCSS1 ? document.documentElement.scrollLeft : document.body.scrollLeft
        }
        ,
        this.scrollY = function() {
            return window.pageYOffset !== undefined ? window.pageYOffset : e.isCSS1 ? document.documentElement.scrollTop : document.body.scrollTop
        }
        ,
        this.type = "Edge" === t.family ? "edge" : "Internet Explorer" === t.family ? "ie" : "Chrome" === t.family ? "chrome" : "Safari" === t.family ? "safari" : "Firefox" === t.family ? "firefox" : t.family.toLowerCase(),
        this.version = 1 * (t.major + "." + t.minor) || 0,
        this.hasPostMessage = !!window.postMessage
    }
    Y.prototype.hasEvent = function(e, t) {
        return "on" + e in (t || document.createElement("div"))
    }
    ,
    Y.prototype.getScreenDimensions = function() {
        var e = {};
        for (var t in window.screen)
            e[t] = window.screen[t];
        return delete e.orientation,
        e
    }
    ,
    Y.prototype.getOrientation = function() {
        return "function" == typeof matchMedia ? matchMedia("(orientation: landscape)").matches ? "landscape" : "portrait" : window.screen.orientation ? screen.orientation.type.startsWith("landscape") ? "landscape" : "portrait" : this.width() > this.height() ? "landscape" : "portrait"
    }
    ,
    Y.prototype.getWindowDimensions = function() {
        return [this.width(), this.height()]
    }
    ,
    Y.prototype.interrogateNavigator = function() {
        var e = {};
        for (var t in window.navigator)
            if ("webkitPersistentStorage" !== t)
                try {
                    e[t] = window.navigator[t]
                } catch (Jn) {}
        if (delete e.plugins,
        delete e.mimeTypes,
        e.plugins = [],
        window.navigator.plugins)
            for (var n = 0; n < window.navigator.plugins.length; n++)
                e.plugins[n] = window.navigator.plugins[n].filename;
        return e
    }
    ,
    Y.prototype.supportsPST = function() {
        return document.hasPrivateToken !== undefined
    }
    ,
    Y.prototype.supportsCanvas = function() {
        var e = document.createElement("canvas");
        return !(!e.getContext || !e.getContext("2d"))
    }
    ,
    Y.prototype.supportsWebAssembly = function() {
        try {
            if ("object" == typeof WebAssembly && "function" == typeof WebAssembly.instantiate) {
                var e = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
                if (e instanceof WebAssembly.Module)
                    return new WebAssembly.Instance(e)instanceof WebAssembly.Instance
            }
        } catch (Xn) {
            return !1
        }
    }
    ;
    var q = new Y
      , Q = new function() {
        var e, t, n = $(), r = L();
        this.mobile = (e = !!("ontouchstart"in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0),
        t = !1,
        n && (t = ["iOS", "Windows Phone", "Windows Mobile", "Android", "BlackBerry OS"].indexOf(n.name) >= 0),
        e && t),
        this.dpr = function() {
            return window.devicePixelRatio || 1
        }
        ,
        this.mobile && n && "Windows" === n.family && r.indexOf("touch") < 0 && (this.mobile = !1),
        this.os = "iOS" === n.family ? "ios" : "Android" === n.family ? "android" : "Mac OS X" === n.family ? "mac" : "Windows" === n.family ? "windows" : "Linux" === n.family ? "linux" : n.family.toLowerCase(),
        this.version = function() {
            if (!n)
                return "unknown";
            var e = n.major;
            return n.minor && (e += "." + n.minor),
            n.patch && (e += "." + n.patch),
            e
        }()
    }
      , ee = {
        Browser: q,
        System: Q,
        supportsPAT: function() {
            return ("mac" === Q.os || "ios" === Q.os) && "safari" === q.type && q.version >= 16.2
        }
    }
      , te = "challenge-passed"
      , ne = "challenge-escaped"
      , re = "challenge-closed"
      , ie = "challenge-expired"
      , oe = "invalid-data"
      , ae = "bundle-error"
      , se = "rate-limited"
      , ce = "network-error"
      , le = "challenge-error"
      , ue = "incomplete-answer"
      , he = "missing-captcha"
      , pe = "missing-sitekey"
      , de = "invalid-captcha-id"
      , fe = "https://api.hcaptcha.com"
      , me = "https://api2.hcaptcha.com"
      , ge = "auto"
      , ye = {
        host: null,
        file: null,
        sitekey: null,
        a11y_tfe: null,
        pingdom: "safari" === ee.Browser.type && "windows" !== ee.System.os && "mac" !== ee.System.os && "ios" !== ee.System.os && "android" !== ee.System.os,
        assetDomain: "https://newassets.hcaptcha.com",
        assetUrl: "https://newassets.hcaptcha.com/captcha/v1/a06d3b476b91a921b59b6903a8d913fadd871d2f/static",
        width: null,
        height: null,
        mobile: null,
        orientation: "portrait",
        challenge_type: null
    }
      , ve = {
        se: null,
        custom: !1,
        tplinks: "on",
        language: null,
        reportapi: "https://accounts.hcaptcha.com",
        endpoint: fe,
        pstIssuer: "https://pst-issuer.hcaptcha.com",
        size: "normal",
        theme: "light",
        mode: undefined,
        assethost: null,
        imghost: null,
        recaptchacompat: "true",
        pat: "on",
        confirmNav: !1
    }
      , we = "https://30910f52569b4c17b1081ead2dae43b4@sentry.hcaptcha.com/6"
      , be = "a06d3b476b91a921b59b6903a8d913fadd871d2f"
      , _e = "prod";
    function Te(e, t) {
        e.style.width = "302px",
        e.style.height = "76px",
        e.style.backgroundColor = "#f9e5e5",
        e.style.position = "relative",
        e.innerHTML = "";
        var n = document.createElement("div");
        n.style.width = "284px",
        n.style.position = "absolute",
        n.style.top = "12px",
        n.style.left = "10px",
        n.style.color = "#7c0a06",
        n.style.fontSize = "14px",
        n.style.fontWeight = "normal",
        n.style.lineHeight = "18px",
        n.innerHTML = t || "Please <a style='color:inherit;text-decoration:underline; font: inherit' target='_blank' href='https://www.whatismybrowser.com/guides/how-to-update-your-browser/auto'>upgrade your browser</a> to complete this captcha.",
        e.appendChild(n)
    }
    function Ve(e) {
        for (var t = document.getElementsByClassName("h-captcha"), n = [], r = 0; r < t.length; r++)
            n.push(t[r]);
        var i = [];
        if ("off" !== ve.recaptchacompat)
            for (var o = document.getElementsByClassName("g-recaptcha"), a = 0; a < o.length; a++)
                i.push(o[a]);
        for (var s = [].concat(n, i), c = 0; c < s.length; c++)
            e(s[c])
    }
    var ke = "The captcha failed to load."
      , Ee = []
      , Se = /(https?|wasm):\/\//
      , Re = /^at\s/
      , xe = /:\d+:\d+/g;
    function Ue(e) {
        return Se.test(e) ? null : e.trim().replace(Re, "").replace(xe, "")
    }
    function Ce(e) {
        for (var t = [], n = 0, r = e.length; n < r; n++) {
            var i = Ue(e[n]);
            null !== i && t.push(i)
        }
        return t.join("\n").trim()
    }
    function Oe(e) {
        if (e && "string" == typeof e && -1 === Ee.indexOf(e) && !(Ee.length >= 10)) {
            var t = Ce(e.trim().split("\n").slice(0, 2));
            Ee.push(t)
        }
    }
    function Pe(e) {
        e && "object" == typeof e || (e = {
            name: "error",
            message: "",
            stack: ""
        });
        var t = {
            message: e.name + ": " + e.message
        };
        e.stack && (t.stack_trace = {
            trace: e.stack
        }),
        je("report error", "internal", "debug", t),
        Ne(e.message || "internal error", "error", ye.file, e)
    }
    function Me(e) {
        return function() {
            try {
                return e.apply(this, arguments)
            } catch (Jn) {
                throw Pe(Jn),
                Ve((function(e) {
                    Te(e, ke)
                }
                )),
                Jn
            }
        }
    }
    function We(e) {
        var t = !1
          , n = !1
          , r = !1;
        try {
            n = -1 !== window.location.href.indexOf("chargebee.com"),
            r = -1 !== window.location.href.indexOf("kobo"),
            t = "8d3aee53-3b2b-414d-b043-a67de5b00328.ios-sdk.hcaptcha.com" === ye.host
        } catch (Xn) {}
        (ve.sentry || t) && (window.Raven && Raven.config(we, {
            release: be,
            environment: _e,
            autoBreadcrumbs: {
                xhr: !0,
                dom: !0,
                sentry: !0
            },
            tags: {
                "site-host": ye.host,
                "site-key": ye.sitekey,
                "endpoint-url": ve.endpoint,
                "asset-url": ye.assetUrl
            },
            sampleRate: n || r || t ? 1 : .01,
            ignoreErrors: ["Cannot set properties of undefined (setting 'data')", "canvas.contentDocument", "Can't find variable: ZiteReader", "Cannot redefine property: hcaptcha", "Cannot redefine property: BetterJsPop", "grecaptcha is not defined", "jQuery is not defined", "$ is not defined", "Script is not a function"]
        }),
        window.Raven && Raven.setUserContext({
            "Browser-Agent": ee.Browser.agent,
            "Browser-Type": ee.Browser.type,
            "Browser-Version": ee.Browser.version,
            "System-OS": ee.System.os,
            "System-Version": ee.System.version,
            "Is-Mobile": ee.System.mobile
        }),
        je(ye.file + "_internal", "setup", "info"),
        e && (window.onerror = function(e, t, n, r, i) {
            i && "object" == typeof i || (i = {});
            var o = i.name || "Error"
              , a = i.stack || "";
            Me(Oe)(a),
            -1 === a.indexOf("chrome-extension://") && -1 === a.indexOf("safari-extension://") && -1 === a.indexOf("moz-extension://") && -1 === a.indexOf("chrome://internal-") && -1 === a.indexOf("/hammerhead.js") && -1 === a.indexOf("eval at buildCode") && -1 === a.indexOf("u.c.b.r.o.w.s.e.r/ucbrowser_script.js") && (je(e, "global", "debug", {
                name: o,
                url: t,
                line: n,
                column: r,
                stack: a
            }),
            Ae("global", i, {
                message: e
            }))
        }
        ))
    }
    function Ne(e, t, n, r) {
        t = t || "error";
        var i = "8d3aee53-3b2b-414d-b043-a67de5b00328.ios-sdk.hcaptcha.com" === ye.host;
        if (ve.sentry || i) {
            var o = "warn" === t ? "warning" : t;
            window.Raven && Raven.captureMessage(e, {
                level: o,
                logger: n,
                extra: r
            })
        }
    }
    function Ae(e, t, n) {
        return (n = n || {}).error = t,
        Ne(t && t.message || "Missing error message", "error", e, n)
    }
    function je(e, t, n, r) {
        var i = "8d3aee53-3b2b-414d-b043-a67de5b00328.ios-sdk.hcaptcha.com" === ye.host;
        (ve.sentry || i) && window.Raven && Raven.captureBreadcrumb({
            message: e,
            category: t,
            level: n,
            data: r
        })
    }
    var Fe = {
        __proto__: null,
        _stackTraceSet: Ee,
        refineLine: Ue,
        toRefinedString: Ce,
        reportError: Pe,
        errorWrapper: Me,
        initSentry: We,
        sentryMessage: Ne,
        sentryError: Ae,
        sentryBreadcrumb: je
    };
    function Be() {
        var e = []
          , t = null
          , n = !1
          , r = 0
          , i = 0
          , o = []
          , a = function(t) {
            try {
                if (e.length >= 10)
                    return;
                var n = t.stack;
                if ("string" != typeof n)
                    return;
                var r = n.trim().split("\n");
                "Error" === r[0] && (r = r.slice(1));
                for (var i = /extension/, o = r.length - 1, a = [], s = 0; o >= 0 && a.length < 6; ) {
                    var c = r[o]
                      , l = Ue(c);
                    if (null !== l) {
                        if (i.test(c)) {
                            a = [l];
                            break
                        }
                        if (a.unshift(l),
                        s = Math.max(s, l.length),
                        a.length >= 2 && s >= 30)
                            break;
                        o--
                    } else
                        o--
                }
                var u = a.join("\n").trim();
                u && -1 === e.indexOf(u) && e.push(u)
            } catch (t) {
                return
            }
        }
          , s = function() {
            if (n)
                try {
                    for (var e = 0, r = o.length; e < r; e++)
                        o[e]();
                    null !== t && clearTimeout(t)
                } catch (i) {
                    a(i)
                } finally {
                    o = [],
                    t = null,
                    n = !1
                }
        }
          , c = function(t, r) {
            var i = Object.getOwnPropertyDescriptor(t, r);
            if (!(i && !1 === i.writable)) {
                var c, l = Object.prototype.hasOwnProperty.call(t, r), u = t[r];
                c = "undefined" != typeof Proxy && "undefined" != typeof Reflect ? new Proxy(u,{
                    apply: function(t, r, i) {
                        return n && (e.length >= 10 && s(),
                        a(new Error)),
                        Reflect.apply(t, r, i)
                    }
                }) : function() {
                    return n && (e.length >= 10 && s(),
                    a(new Error)),
                    u.apply(this, arguments)
                }
                ,
                Object.defineProperty(t, r, {
                    configurable: !0,
                    enumerable: !i || i.enumerable,
                    writable: !0,
                    value: c
                }),
                o.push((function() {
                    l ? Object.defineProperty(t, r, {
                        configurable: !0,
                        enumerable: !i || i.enumerable,
                        writable: !0,
                        value: u
                    }) : delete t[r]
                }
                ))
            }
        };
        return {
            run: function(e) {
                if (!n) {
                    n = !0,
                    isFinite(e) && (t = setTimeout((function() {
                        s()
                    }
                    ), e));
                    try {
                        c(Document.prototype, "getElementsByClassName"),
                        c(Document.prototype, "getElementById"),
                        c(Document.prototype, "getElementsByTagName"),
                        c(Document.prototype, "querySelector"),
                        c(Document.prototype, "querySelectorAll"),
                        c(Element.prototype, "getElementsByClassName"),
                        c(Element.prototype, "getElementsByTagName"),
                        c(Element.prototype, "querySelector"),
                        c(Element.prototype, "querySelectorAll"),
                        c(HTMLElement.prototype, "click"),
                        c(HTMLElement.prototype, "getElementsByClassName"),
                        c(HTMLElement.prototype, "getElementsByTagName"),
                        c(HTMLElement.prototype, "querySelector"),
                        c(HTMLElement.prototype, "querySelectorAll"),
                        !function() {
                            var e = new Error;
                            Object.defineProperties(e, {
                                stack: {
                                    configurable: !1,
                                    enumerable: !1,
                                    get: function() {
                                        return r += 1,
                                        ""
                                    }
                                },
                                name: {
                                    configurable: !1,
                                    enumerable: !1,
                                    get: function() {
                                        return i += 1,
                                        " "
                                    }
                                }
                            }),
                            window.console.debug(e)
                        }(),
                        c(console, "log")
                    } catch (o) {
                        s(),
                        a(o)
                    }
                }
            },
            collect: function() {
                return e.push("ReferenceError: _" + r + "_" + i + " not defined or thrown"),
                e.concat(Ee)
            }
        }
    }
    var Ge = {
        getCookie: function(e) {
            var t = document.cookie.replace(/ /g, "").split(";");
            try {
                for (var n = "", r = t.length; r-- && !n; )
                    t[r].indexOf(e) >= 0 && (n = t[r]);
                return n
            } catch (Xn) {
                return ""
            }
        },
        hasCookie: function(e) {
            return !!Ge.getCookie(e)
        },
        supportsAPI: function() {
            try {
                return "hasStorageAccess"in document && "requestStorageAccess"in document
            } catch (Xn) {
                return !1
            }
        },
        hasAccess: function() {
            return new Promise((function(e) {
                document.hasStorageAccess().then((function() {
                    e(!0)
                }
                ))["catch"]((function() {
                    e(!1)
                }
                ))
            }
            ))
        },
        requestAccess: function() {
            try {
                return document.requestStorageAccess()
            } catch (Xn) {
                return Promise.resolve()
            }
        }
    }
      , De = {
        array: function(e) {
            if (0 === e.length)
                return e;
            for (var t, n, r = e.length; --r > -1; )
                n = Math.floor(Math.random() * (r + 1)),
                t = e[r],
                e[r] = e[n],
                e[n] = t;
            return e
        }
    };
    function Ze(e) {
        this.r = 255,
        this.g = 255,
        this.b = 255,
        this.a = 1,
        this.h = 1,
        this.s = 1,
        this.l = 1,
        this.parseString(e)
    }
    function Ie(e, t, n) {
        return n < 0 && (n += 1),
        n > 1 && (n -= 1),
        n < 1 / 6 ? e + 6 * (t - e) * n : n < .5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
    }
    Ze.hasAlpha = function(e) {
        return "string" == typeof e && (-1 !== e.indexOf("rgba") || 9 === e.length && "#" === e[0])
    }
    ,
    Ze.prototype.parseString = function(e) {
        e && (0 === e.indexOf("#") ? this.fromHex(e) : 0 === e.indexOf("rgb") && this.fromRGBA(e))
    }
    ,
    Ze.prototype.fromHex = function(e) {
        var t = 1;
        9 === e.length && (t = parseInt(e.substr(7, 2), 16) / 255);
        var n = (e = e.substr(1, 6)).replace(/^([a-f\d])([a-f\d])([a-f\d])?$/i, (function(e, t, n, r) {
            return t + t + n + n + r + r
        }
        ))
          , r = parseInt(n, 16)
          , i = r >> 16
          , o = r >> 8 & 255
          , a = 255 & r;
        this.setRGBA(i, o, a, t)
    }
    ,
    Ze.prototype.fromRGBA = function(e) {
        var t = e.indexOf("rgba")
          , n = e.substr(t).replace(/rgba?\(/, "").replace(/\)/, "").replace(/[\s+]/g, "").split(",")
          , r = Math.floor(parseInt(n[0]))
          , i = Math.floor(parseInt(n[1]))
          , o = Math.floor(parseInt(n[2]))
          , a = parseFloat(n[3]);
        this.setRGBA(r, i, o, a)
    }
    ,
    Ze.prototype.setRGB = function(e, t, n) {
        this.setRGBA(e, t, n, 1)
    }
    ,
    Ze.prototype.setRGBA = function(e, t, n, r) {
        this.r = e,
        this.g = t,
        this.b = n,
        this.a = isNaN(r) ? this.a : r,
        this.updateHSL()
    }
    ,
    Ze.prototype.hsl2rgb = function(e, t, n) {
        if (0 === t) {
            var r = Math.round(255 * n);
            return this.setRGB(r, r, r),
            this
        }
        var i = n <= .5 ? n * (1 + t) : n + t - n * t
          , o = 2 * n - i;
        return this.r = Math.round(255 * Ie(o, i, e + 1 / 3)),
        this.g = Math.round(255 * Ie(o, i, e)),
        this.b = Math.round(255 * Ie(o, i, e - 1 / 3)),
        this.h = e,
        this.s = t,
        this.l = n,
        this
    }
    ,
    Ze.prototype.updateHSL = function() {
        var e, t = this.r / 255, n = this.g / 255, r = this.b / 255, i = Math.max(t, n, r), o = Math.min(t, n, r), a = null, s = (i + o) / 2;
        if (i === o)
            a = e = 0;
        else {
            var c = i - o;
            switch (e = s > .5 ? c / (2 - i - o) : c / (i + o),
            i) {
            case t:
                a = (n - r) / c + (n < r ? 6 : 0);
                break;
            case n:
                a = (r - t) / c + 2;
                break;
            case r:
                a = (t - n) / c + 4
            }
            a /= 6
        }
        return this.h = a,
        this.s = e,
        this.l = s,
        this
    }
    ,
    Ze.prototype.getHex = function() {
        return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1)
    }
    ,
    Ze.prototype.getRGBA = function() {
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
    }
    ,
    Ze.prototype.clone = function() {
        var e = new Ze;
        return e.setRGBA(this.r, this.g, this.b, this.a),
        e
    }
    ,
    Ze.prototype.mix = function(e, t) {
        e instanceof Ze || (e = new Ze(e));
        var n = new Ze
          , r = Math.round(this.r + t * (e.r - this.r))
          , i = Math.round(this.g + t * (e.g - this.g))
          , o = Math.round(this.b + t * (e.b - this.b));
        return n.setRGB(r, i, o),
        n
    }
    ,
    Ze.prototype.blend = function(e, t) {
        var n;
        e instanceof Ze || (e = new Ze(e));
        for (var r = [], i = 0; i < t; i++)
            n = this.mix.call(this, e, i / t),
            r.push(n);
        return r
    }
    ,
    Ze.prototype.lightness = function(e) {
        return e > 1 && (e /= 100),
        this.hsl2rgb(this.h, this.s, e),
        this
    }
    ,
    Ze.prototype.saturation = function(e) {
        return e > 1 && (e /= 100),
        this.hsl2rgb(this.h, e, this.l),
        this
    }
    ,
    Ze.prototype.hue = function(e) {
        return this.hsl2rgb(e / 360, this.s, this.l),
        this
    }
    ;
    var ze = {
        decode: function(e) {
            try {
                var t = e.split(".");
                return {
                    header: JSON.parse(atob(t[0])),
                    payload: JSON.parse(atob(t[1])),
                    signature: atob(t[2].replace(/_/g, "/").replace(/-/g, "+")),
                    raw: {
                        header: t[0],
                        payload: t[1],
                        signature: t[2]
                    }
                }
            } catch (Xn) {
                throw new Error("Token is invalid.")
            }
        },
        checkExpiration: function(e) {
            if (new Date(1e3 * e) <= new Date(Date.now()))
                throw new Error("Token is expired.");
            return !0
        }
    }
      , Ke = {
        _setup: !1,
        _af: null,
        _fps: 60,
        _singleFrame: 1 / 60,
        _lagThreshold: 500,
        _adjustedLag: 1 / 60 * 2,
        _startTime: 0,
        _lastTime: 0,
        _nextTime: 1 / 60,
        _elapsed: 0,
        _difference: 0,
        _renders: [],
        _paused: !1,
        _running: !1,
        _tick: !1,
        frame: 0,
        time: 0,
        requestFrame: null,
        cancelFrame: null,
        _init: function() {
            for (var e, t = window.requestAnimationFrame, n = window.cancelAnimationFrame, r = ["ms", "moz", "webkit", "o"], i = r.length; --i > -1 && !t; )
                t = window[r[i] + "RequestAnimationFrame"],
                n = window[r[i] + "CancelAnimationFrame"] || window[r[i] + "CancelRequestAnimationFrame"];
            t ? (Ke.requestFrame = t.bind(window),
            Ke.cancelFrame = n.bind(window)) : (Ke.requestFrame = (e = Date.now(),
            function(t) {
                window.setTimeout((function() {
                    t(Date.now() - e)
                }
                ), 1e3 * Ke._singleFrame)
            }
            ),
            Ke.cancelFrame = function(e) {
                return clearTimeout(e),
                null
            }
            ),
            Ke._setup = !0,
            Ke._startTime = Ke._lastTime = Date.now()
        },
        add: function(e, t) {
            Ke._renders.push({
                callback: e,
                paused: !1 == !t || !1
            }),
            !1 == !t && Ke.start()
        },
        remove: function(e) {
            for (var t = Ke._renders.length; --t > -1; )
                Ke._renders[t].callback === e && (Ke._renders[t].paused = !0,
                Ke._renders.splice(t, 1))
        },
        start: function(e) {
            if (!1 === Ke._setup && Ke._init(),
            e)
                for (var t = Ke._renders.length; --t > -1; )
                    Ke._renders[t].callback === e && (Ke._renders[t].paused = !1);
            !0 !== Ke._running && (Ke._paused = !1,
            Ke._running = !0,
            Ke._af = Ke.requestFrame(Ke._update))
        },
        stop: function(e) {
            if (e)
                for (var t = Ke._renders.length; --t > -1; )
                    Ke._renders[t].callback === e && (Ke._renders[t].paused = !0);
            else
                !1 !== Ke._running && (Ke._af = Ke.cancelFrame(Ke._af),
                Ke._paused = !0,
                Ke._running = !1)
        },
        elapsed: function() {
            return Date.now() - Ke._startTime
        },
        fps: function(e) {
            return arguments.length ? (Ke._fps = e,
            Ke._singleFrame = 1 / (Ke._fps || 60),
            Ke._adjustedLag = 2 * Ke._singleFrame,
            Ke._nextTime = Ke.time + Ke._singleFrame,
            Ke._fps) : Ke._fps
        },
        isRunning: function() {
            return Ke._running
        },
        _update: function() {
            if (!Ke._paused && (Ke._elapsed = Date.now() - Ke._lastTime,
            Ke._tick = !1,
            Ke._elapsed > Ke._lagThreshold && (Ke._startTime += Ke._elapsed - Ke._adjustedLag),
            Ke._lastTime += Ke._elapsed,
            Ke.time = (Ke._lastTime - Ke._startTime) / 1e3,
            Ke._difference = Ke.time - Ke._nextTime,
            Ke._difference > 0 && (Ke.frame++,
            Ke._nextTime += Ke._difference + (Ke._difference >= Ke._singleFrame ? Ke._singleFrame / 4 : Ke._singleFrame - Ke._difference),
            Ke._tick = !0),
            Ke._af = Ke.requestFrame(Ke._update),
            !0 === Ke._tick && Ke._renders.length > 0))
                for (var e = Ke._renders.length; --e > -1; )
                    Ke._renders[e] && !1 === Ke._renders[e].paused && Ke._renders[e].callback(Ke.time)
        }
    };
    var Le = function(e) {
        for (var t, n, r, i = {}, o = e ? e.indexOf("&") >= 0 ? e.split("&") : [e] : [], a = 0; a < o.length; a++)
            if (o[a].indexOf("=") >= 0) {
                if (t = o[a].split("="),
                n = decodeURIComponent(t[0]),
                "false" !== (r = decodeURIComponent(t[1])) && "true" !== r || (r = "true" === r),
                "theme" === n || "themeConfig" === n)
                    try {
                        r = JSON.parse(r)
                    } catch (Xn) {}
                i[n] = r
            }
        return i
    }
      , He = function(e) {
        var t = [];
        for (var n in e) {
            var r = e[n];
            r = "object" == typeof r ? JSON.stringify(r) : r,
            t.push([encodeURIComponent(n), encodeURIComponent(r)].join("="))
        }
        return t.join("&")
    }
      , $e = {
        __proto__: null,
        Decode: Le,
        Encode: He
    };
    function Je(e, t, n) {
        return Math.min(Math.max(e, t), n)
    }
    var Xe = {
        __proto__: null,
        clamp: Je,
        range: function(e, t, n, r, i, o) {
            var a = (e - t) * (i - r) / (n - t) + r;
            return !1 === o ? a : Je(a, Math.min(r, i), Math.max(r, i))
        },
        toRadians: function(e) {
            return e * (Math.PI / 180)
        },
        toDegrees: function(e) {
            return 180 * e / Math.PI
        }
    };
    function Ye(e, t, n) {
        this._period = e,
        this._interval = t,
        this._date = [],
        this._data = [],
        this._prevTimestamp = 0,
        this._meanPeriod = 0,
        this._medianPeriod = 0,
        this._medianMaxHeapSize = 32,
        this._medianMinHeap = [],
        this._medianMaxHeap = [],
        this._meanCounter = 0,
        this._baseTime = n || 0
    }
    function qe(e) {
        return new Promise((function(t, n) {
            e(t, n, (function r() {
                e(t, n, r)
            }
            ))
        }
        ))
    }
    function Qe(e, t) {
        var n = "attempts"in (t = t || {}) ? t.attempts : 1
          , r = t.delay || 0
          , i = t.onFail;
        return qe((function(t, o, a) {
            e().then(t, (function(e) {
                var t = n-- > 0;
                if (i) {
                    var s = i(e, n);
                    s && (t = !1 !== s.retry && t,
                    r = s.delay)
                }
                t ? setTimeout(a, r || 0) : o(e)
            }
            ))
        }
        ))
    }
    function et(e) {
        var t = [].slice.call(arguments, 1);
        "string" == typeof e ? window[e] ? "function" == typeof window[e] ? window[e].apply(null, t) : console.log("[hCaptcha] Callback '" + e + "' is not a function.") : console.log("[hCaptcha] Callback '" + e + "' is not defined.") : "function" == typeof e ? e.apply(null, t) : console.log("[hcaptcha] Invalid callback '" + e + "'.")
    }
    function tt() {
        try {
            et.apply(null, arguments)
        } catch (Jn) {
            console.error("[hCaptcha] There was an error in your callback."),
            console.error(Jn)
        }
    }
    function nt(e, t) {
        for (var n = ["hl", "custom", "tplinks", "sitekey", "theme", "type", "size", "tabindex", "callback", "expired-callback", "chalexpired-callback", "error-callback", "open-callback", "close-callback", "endpoint", "challenge-container", "confirm-nav", "orientation", "mode"], r = {}, i = 0; i < n.length; i++) {
            var o = n[i]
              , a = t && t[o];
            a || (a = e.getAttribute("data-" + o)),
            a && (r[o] = a)
        }
        return r
    }
    Ye.prototype.getMeanPeriod = function() {
        return this._meanPeriod
    }
    ,
    Ye.prototype.getMedianPeriod = function() {
        return this._medianPeriod
    }
    ,
    Ye.prototype.getData = function() {
        return this._cleanStaleData(),
        this._data
    }
    ,
    Ye.prototype.getSize = function() {
        return this._cleanStaleData(),
        this._data.length
    }
    ,
    Ye.prototype.getCapacity = function() {
        return 0 === this._period ? this._interval : Math.ceil(this._interval / this._period)
    }
    ,
    Ye.prototype.push = function(e, t) {
        this._cleanStaleData();
        var n = 0 === this._date.length;
        if (e - (this._date[this._date.length - 1] || 0) >= this._period && (this._date.push(e),
        this._data.push(t)),
        !n) {
            var r = e - this._prevTimestamp;
            this._meanPeriod = (this._meanPeriod * this._meanCounter + r) / (this._meanCounter + 1),
            this._meanCounter++,
            this._medianPeriod = this._calculateMedianPeriod(r)
        }
        this._prevTimestamp = e
    }
    ,
    Ye.prototype._calculateMedianPeriod = function(e) {
        this._medianMaxHeap || (this._medianMaxHeap = []),
        this._medianMinHeap || (this._medianMinHeap = []);
        var t = this._fetchMedianPeriod();
        return 0 === this._medianMaxHeap.length && 0 === this._medianMinHeap.length ? this._medianMaxHeap.push(e) : e <= t ? (this._medianMaxHeap.push(e),
        this._medianMaxHeap.sort((function(e, t) {
            return t - e
        }
        ))) : (this._medianMinHeap.push(e),
        this._medianMinHeap.sort((function(e, t) {
            return e - t
        }
        ))),
        this._rebalanceHeaps(),
        this._fetchMedianPeriod()
    }
    ,
    Ye.prototype._rebalanceHeaps = function() {
        var e = null;
        this._medianMaxHeap.length > this._medianMinHeap.length + 1 ? (e = this._medianMaxHeap.shift(),
        this._medianMinHeap.push(e),
        this._medianMinHeap.sort((function(e, t) {
            return e - t
        }
        ))) : this._medianMinHeap.length > this._medianMaxHeap.length + 1 && (e = this._medianMinHeap.shift(),
        this._medianMaxHeap.push(e),
        this._medianMaxHeap.sort((function(e, t) {
            return t - e
        }
        ))),
        this._medianMinHeap.length == this._medianMaxHeap.length && this._medianMaxHeap.length > this._medianMaxHeapSize && (this._medianMinHeap.pop(),
        this._medianMaxHeap.pop())
    }
    ,
    Ye.prototype._fetchMedianPeriod = function() {
        return this._medianMaxHeap.length > this._medianMinHeap.length ? this._medianMaxHeap[0] : this._medianMinHeap.length > this._medianMaxHeap.length ? this._medianMinHeap[0] : 0 !== this._medianMaxHeap.length && 0 !== this._medianMinHeap.length ? (this._medianMaxHeap[0] + this._medianMinHeap[0]) / 2 : -1
    }
    ,
    Ye.prototype._cleanStaleData = function() {
        for (var e = Date.now() - this._baseTime, t = this._date.length - 1; t >= 0; t--) {
            if (e - this._date[t] >= this._interval) {
                this._date.splice(0, t + 1),
                this._data.splice(0, t + 1);
                break
            }
        }
    }
    ;
    var rt, it = {
        UUID: function(e) {
            return /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(e) || !1
        },
        UUIDv4: function(e) {
            return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e) || !1
        },
        URL: function(e) {
            var t = new RegExp("^(http|https)://")
              , n = new RegExp("^((?!(data|javascript):).)*$");
            return t.test(e) && n.test(e) && -1 === e.indexOf("#")
        },
        IMAGE: function(e) {
            return (0 === e.indexOf("https://") || 0 === e.indexOf("/")) && e.endsWith(".png")
        }
    };
    function ot(e) {
        var t, n, r = "string" == typeof e ? e : JSON.stringify(e), i = -1;
        for (rt = rt || function() {
            var e, t, n, r = [];
            for (t = 0; t < 256; t++) {
                for (e = t,
                n = 0; n < 8; n++)
                    e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                r[t] = e
            }
            return r
        }(),
        t = 0,
        n = r.length; t < n; t += 1)
            i = i >>> 8 ^ rt[255 & (i ^ r.charCodeAt(t))];
        return (-1 ^ i) >>> 0
    }
    var at = {
        __proto__: null,
        createErrorsAggregator: Be,
        uuid: function() {
            return Math.random().toString(36).substr(2)
        },
        Render: Ke,
        JWT: ze,
        Color: Ze,
        Shuffle: De,
        MathUtil: Xe,
        Storage: Ge,
        Query: $e,
        TimeBuffer: Ye,
        PromiseUtil: {
            __proto__: null,
            promiseRecursive: qe,
            promiseRetry: Qe
        },
        ErrorUtil: Fe,
        _stackTraceSet: Ee,
        refineLine: Ue,
        toRefinedString: Ce,
        reportError: Pe,
        errorWrapper: Me,
        initSentry: We,
        sentryMessage: Ne,
        sentryError: Ae,
        sentryBreadcrumb: je,
        renderFallback: Te,
        forEachCaptchaNode: Ve,
        callUserFunction: tt,
        composeParams: nt,
        is: it,
        promiseRecursive: qe,
        promiseRetry: Qe,
        crc32: ot,
        TaskContext: {
            container: {},
            set: function(e, t) {
                this.container[e] = t
            },
            clear: function() {
                this.container = {}
            }
        }
    }
      , st = {
        eventName: function(e, t) {
            var n = e;
            "down" === e || "up" === e || "move" === e || "over" === e || "out" === e ? n = !(ee.System.mobile && "desktop" !== t || "mobile" === t) || "down" !== e && "up" !== e && "move" !== e ? "mouse" + e : "down" === e ? "touchstart" : "up" === e ? "touchend" : "touchmove" : "enter" === e && (n = "keydown");
            return n
        },
        actionName: function(e) {
            var t = e;
            return "touchstart" === t || "mousedown" === t ? t = "down" : "touchmove" === t || "mousemove" === t ? t = "move" : "touchend" === t || "mouseup" === t ? t = "up" : "mouseover" === t ? t = "over" : "mouseout" === t && (t = "out"),
            t
        },
        eventCallback: function(e, t, n) {
            var r = st.actionName(e);
            return function(i) {
                if (i = i || window.event,
                "down" === r || "move" === r || "up" === r || "over" === r || "out" === r || "click" === r) {
                    var o = st.eventCoords(i);
                    if (!o)
                        return;
                    var a = n.getBoundingClientRect();
                    i.windowX = o.x,
                    i.windowY = o.y,
                    i.elementX = i.windowX - (a.x || a.left),
                    i.elementY = i.windowY - (a.y || a.top)
                }
                i.keyNum = i.which || i.keyCode || 0,
                "enter" === e && 13 !== i.keyNum && 32 !== i.keyNum || (i.action = r,
                i.targetElement = n,
                t(i))
            }
        },
        eventCoords: function(e) {
            if (!e)
                return null;
            var t = e;
            if (e.touches || e.changedTouches) {
                var n = e.touches && e.touches.length >= 1 ? e.touches : e.changedTouches;
                n && n[0] && (t = n[0])
            }
            return "number" == typeof t.pageX && "number" == typeof t.pageY ? {
                x: t.pageX,
                y: t.pageY
            } : "number" == typeof t.clientX && "number" == typeof t.clientY ? {
                x: t.clientX,
                y: t.clientY
            } : null
        }
    }
      , ct = ["Webkit", "Moz", "ms"]
      , lt = document.createElement("div").style
      , ut = {};
    function ht(e) {
        var t = ut[e];
        return t || (e in lt ? e : ut[e] = function(e) {
            for (var t = e[0].toUpperCase() + e.slice(1), n = ct.length; n--; )
                if ((e = ct[n] + t)in lt)
                    return e
        }(e) || e)
    }
    function pt(e, t, n) {
        if (this.dom = null,
        this._clss = [],
        this._nodes = [],
        this._listeners = [],
        this._frag = null,
        e && "object" == typeof e) {
            this.dom = e;
            var r = []
              , i = [];
            "string" == typeof e.className && (i = e.className.split(" "));
            for (var o = 0; o < i.length; o++)
                "" !== i[o] && " " !== i[o] && r.push(i[o]);
            this._clss = r
        } else
            n !== undefined && null !== n || (n = !0),
            (!e || "string" == typeof e && (e.indexOf("#") >= 0 || e.indexOf(".") >= 0)) && (e && (t = e),
            e = "div"),
            this.dom = document.createElement(e),
            t && (t.indexOf("#") >= 0 ? this.dom.id = t.split("#")[1] : (t.indexOf(".") >= 0 && (t = t.split(".")[1]),
            this.addClass.call(this, t)));
        !0 === n && (this._frag = document.createDocumentFragment(),
        this._frag.appendChild(this.dom))
    }
    function dt(e) {
        if (null === e)
            return "";
        var t = [];
        return ft(e, t),
        t.join("&")
    }
    function ft(e, t) {
        var n, r;
        if ("object" == typeof e)
            for (r in e)
                !0 === mt(n = e[r]) ? ft(n, t) : t[t.length] = gt(r, n);
        else if (!0 === Array.isArray(e))
            for (var i = 0; i < e.length; i++)
                !0 === mt(n = e[i]) ? ft(e, t) : t[t.length] = gt(r, n);
        else
            t[t.length] = gt(e)
    }
    function mt(e) {
        return !0 === Array.isArray(e) || "object" == typeof e
    }
    function gt(e, t) {
        return encodeURIComponent(e) + "=" + encodeURIComponent(null === t ? "" : t)
    }
    pt.prototype.cloneNode = function(e) {
        try {
            return this.dom.cloneNode(e)
        } catch (Xn) {
            return Ae("element", Xn),
            null
        }
    }
    ,
    pt.prototype.createElement = function(e, t) {
        try {
            var n = new pt(e,t,!1);
            return this.appendElement.call(this, n),
            this._nodes.push(n),
            n
        } catch (Xn) {
            return Ae("element", Xn),
            null
        }
    }
    ,
    pt.prototype.appendElement = function(e) {
        if (e === undefined)
            return Pe({
                name: "DomElement Add Child",
                message: "Child Element is undefined"
            });
        var t;
        t = e._frag !== undefined && null !== e._frag ? e._frag : e.dom !== undefined ? e.dom : e;
        try {
            e instanceof pt && (e._parent = this),
            this.dom.appendChild(t)
        } catch (Xn) {
            Pe({
                name: "DomElement Add Child",
                message: "Failed to append child."
            })
        }
        return this
    }
    ,
    pt.prototype.removeElement = function(e) {
        try {
            var t;
            if (e._nodes)
                for (t = e._nodes.length; t--; )
                    e.removeElement(e._nodes[t]);
            for (t = this._nodes.length; --t > -1; )
                this._nodes[t] === e && this._nodes.splice(t, 1);
            var n = e instanceof pt ? e.dom : e
              , r = n.parentNode === this.dom ? this.dom : n.parentNode;
            if (r.removeChild && r.removeChild(n),
            !r)
                throw new Error("Child component does not have correct setup");
            e.__destroy && e.__destroy()
        } catch (Xn) {
            Pe({
                name: "DomElement Remove Child",
                message: Xn.message || "Failed to remove child."
            })
        }
    }
    ,
    pt.prototype.addClass = function(e) {
        return !1 === this.hasClass.call(this, e) && (this._clss.push(e),
        this.dom.className = this._clss.join(" ")),
        this
    }
    ,
    pt.prototype.hasClass = function(e) {
        for (var t = -1 !== this.dom.className.split(" ").indexOf(e), n = this._clss.length; n-- && !t; )
            t = this._clss[n] === e;
        return t
    }
    ,
    pt.prototype.removeClass = function(e) {
        for (var t = this._clss.length; --t > -1; )
            this._clss[t] === e && this._clss.splice(t, 1);
        return this.dom.className = this._clss.join(" "),
        this
    }
    ,
    pt.prototype.text = function(e) {
        if (this && this.dom) {
            if (!e)
                return this.dom.textContent;
            for (var t, n, r, i, o = /&(.*?);/g, a = /<[a-z][\s\S]*>/i; null !== (t = o.exec(e)); ) {
                !1 === a.test(t[0]) ? (r = t[0],
                i = void 0,
                (i = document.createElement("div")).innerHTML = r,
                n = i.textContent,
                e = e.replace(new RegExp(t[0],"g"), n)) : e = e.replace(t[0], "")
            }
            return this.dom.textContent = e,
            this
        }
    }
    ,
    pt.prototype.content = pt.prototype.text,
    pt.prototype.css = function(e) {
        var t, n = "ie" === ee.Browser.type && 8 === ee.Browser.version, r = "safari" === ee.Browser.type && 12 === Math.floor(ee.Browser.version);
        for (var i in e) {
            t = e[i];
            try {
                if ("transition" === i && r)
                    continue;
                "opacity" !== i && "zIndex" !== i && "fontWeight" !== i && isFinite(t) && parseFloat(t) === t && (t += "px");
                var o = ht(i);
                n && "opacity" === i ? this.dom.style.filter = "alpha(opacity=" + 100 * t + ")" : n && Ze.hasAlpha(t) ? this.dom.style[o] = new Ze(t).getHex() : this.dom.style[o] = t
            } catch (Jn) {}
        }
        return this
    }
    ,
    pt.prototype.backgroundImage = function(e, t, n, r) {
        var i = t !== undefined && n !== undefined
          , o = {
            "-ms-high-contrast-adjust": "none"
        };
        if ("object" == typeof t && (r = t),
        r === undefined && (r = {}),
        i) {
            var a = e.width / e.height
              , s = t
              , c = s / a;
            r.cover && c < n && (s = (c = n) * a),
            r.contain && c > n && (s = (c = n) * a),
            o.width = s,
            o.height = c,
            r.center && (o.marginLeft = -s / 2,
            o.marginTop = -c / 2,
            o.position = "absolute",
            o.left = "50%",
            o.top = "50%"),
            (r.left || r.right) && (o.left = r.left || 0,
            o.top = r.top || 0)
        }
        "ie" === ee.Browser.type && 8 === ee.Browser.version ? o.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + e.src + "',sizingMethod='scale')" : (o.background = "url(" + e.src + ")",
        o.backgroundPosition = "50% 50%",
        o.backgroundRepeat = "no-repeat",
        o.backgroundSize = i ? s + "px " + c + "px" : r.cover ? "cover" : r.contain ? "contain" : "100%"),
        this.css.call(this, o)
    }
    ,
    pt.prototype.setAttribute = function(e, t) {
        var n;
        if ("object" == typeof e)
            for (var r in e)
                n = e[r],
                this.dom.setAttribute(r, n);
        else
            this.dom.setAttribute(e, t)
    }
    ,
    pt.prototype.removeAttribute = function(e, t) {
        var n;
        if ("object" == typeof e)
            for (var r in e)
                n = e[r],
                this.dom.removeAttribute(r, n);
        else
            this.dom.removeAttribute(e, t)
    }
    ,
    pt.prototype.addEventListener = function(e, t, n) {
        var r = {
            event: st.eventName(e),
            handler: st.eventCallback(e, t, this.dom),
            callback: t
        };
        if (this._listeners.push(r),
        this.dom.addEventListener ? this.dom.addEventListener(r.event, r.handler, n) : this.dom.attachEvent("on" + r.event, r.handler),
        e !== r.event && (r.event.indexOf("mouse") >= 0 || r.event.indexOf("touch") >= 0)) {
            var i = r.event.indexOf("touch") >= 0 ? "desktop" : "mobile"
              , o = st.eventName(e, i);
            if (o === r.event)
                return;
            this.addEventListener.call(this, o, t, n)
        }
    }
    ,
    pt.prototype.removeEventListener = function(e, t, n) {
        for (var r, i = this._listeners.length, o = st.eventName(e); --i > -1; )
            (r = this._listeners[i]).event === o && r.callback === t && (this._listeners.splice(i, 1),
            this.dom.removeEventListener ? this.dom.removeEventListener(r.event, r.handler, n) : this.dom.detachEvent("on" + r.event, r.handler))
    }
    ,
    pt.prototype.focus = function() {
        this.dom.focus()
    }
    ,
    pt.prototype.blur = function() {
        this.dom.blur()
    }
    ,
    pt.prototype.html = function(e) {
        return e && (this.dom.innerHTML = e),
        this.dom.innerHTML
    }
    ,
    pt.prototype.__destroy = function() {
        for (var e, t = this._listeners.length; --t > -1; )
            e = this._listeners[t],
            this._listeners.splice(t, 1),
            this.dom.removeEventListener ? this.dom.removeEventListener(e.event, e.handler) : this.dom.detachEvent("on" + e.event, e.handler);
        return this.dom = null,
        this._clss = [],
        this._nodes = [],
        this._listeners = [],
        this._frag = null,
        e = null,
        null
    }
    ,
    pt.prototype.isConnected = function() {
        return !!this.dom && ("isConnected"in this.dom ? this.dom.isConnected : !(this.dom.ownerDocument && this.dom.ownerDocument.compareDocumentPosition(this.dom) & this.dom.DOCUMENT_POSITION_DISCONNECTED))
    }
    ;
    var yt = {
        af: "Afrikaans",
        sq: "Albanian",
        am: "Amharic",
        ar: "Arabic",
        hy: "Armenian",
        az: "Azerbaijani",
        eu: "Basque",
        be: "Belarusian",
        bn: "Bengali",
        bg: "Bulgarian",
        bs: "Bosnian",
        my: "Burmese",
        ca: "Catalan",
        ceb: "Cebuano",
        zh: "Chinese",
        "zh-CN": "Chinese Simplified",
        "zh-TW": "Chinese Traditional",
        co: "Corsican",
        hr: "Croatian",
        cs: "Czech",
        da: "Danish",
        nl: "Dutch",
        en: "English",
        eo: "Esperanto",
        et: "Estonian",
        fi: "Finnish",
        fr: "French",
        fy: "Frisian",
        gd: "Gaelic",
        gl: "Galacian",
        ka: "Georgian",
        de: "German",
        el: "Greek",
        gu: "Gujurati",
        ht: "Haitian",
        ha: "Hausa",
        haw: "Hawaiian",
        he: "Hebrew",
        hi: "Hindi",
        hmn: "Hmong",
        hu: "Hungarian",
        is: "Icelandic",
        ig: "Igbo",
        id: "Indonesian",
        ga: "Irish",
        it: "Italian",
        ja: "Japanese",
        jw: "Javanese",
        kn: "Kannada",
        kk: "Kazakh",
        km: "Khmer",
        rw: "Kinyarwanda",
        ky: "Kirghiz",
        ko: "Korean",
        ku: "Kurdish",
        lo: "Lao",
        la: "Latin",
        lv: "Latvian",
        lt: "Lithuanian",
        lb: "Luxembourgish",
        mk: "Macedonian",
        mg: "Malagasy",
        ms: "Malay",
        ml: "Malayalam",
        mt: "Maltese",
        mi: "Maori",
        mr: "Marathi",
        mn: "Mongolian",
        ne: "Nepali",
        no: "Norwegian",
        ny: "Nyanja",
        or: "Oriya",
        fa: "Persian",
        pl: "Polish",
        "pt-BR": "Portuguese (Brazil)",
        pt: "Portuguese (Portugal)",
        ps: "Pashto",
        pa: "Punjabi",
        ro: "Romanian",
        ru: "Russian",
        sm: "Samoan",
        sn: "Shona",
        sd: "Sindhi",
        si: "Sinhalese",
        sr: "Serbian",
        sk: "Slovak",
        sl: "Slovenian",
        so: "Somali",
        st: "Southern Sotho",
        es: "Spanish",
        su: "Sundanese",
        sw: "Swahili",
        sv: "Swedish",
        tl: "Tagalog",
        tg: "Tajik",
        ta: "Tamil",
        tt: "Tatar",
        te: "Teluga",
        th: "Thai",
        tr: "Turkish",
        tk: "Turkmen",
        ug: "Uyghur",
        uk: "Ukrainian",
        ur: "Urdu",
        uz: "Uzbek",
        vi: "Vietnamese",
        cy: "Welsh",
        xh: "Xhosa",
        yi: "Yiddish",
        yo: "Yoruba",
        zu: "Zulu"
    }
      , vt = {
        zh: {
            "I am human": "我是人"
        },
        ar: {
            "I am human": "أنا الإنسان"
        },
        af: {
            "I am human": "Ek is menslike"
        },
        am: {
            "I am human": "እኔ ሰው ነኝ"
        },
        hy: {
            "I am human": "Ես մարդ եմ"
        },
        az: {
            "I am human": "Mən insanam"
        },
        eu: {
            "I am human": "Gizakia naiz"
        },
        bn: {
            "I am human": "আমি মানব নই"
        },
        bg: {
            "I am human": "Аз съм човек"
        },
        ca: {
            "I am human": "Sóc humà"
        },
        hr: {
            "I am human": "Ja sam čovjek"
        },
        cs: {
            "I am human": "Jsem člověk"
        },
        da: {
            "I am human": "Jeg er et menneske"
        },
        nl: {
            "I am human": "Ik ben een mens"
        },
        et: {
            "I am human": "Ma olen inimeste"
        },
        fi: {
            "I am human": "Olen ihminen"
        },
        fr: {
            "I am human": "Je suis humain"
        },
        gl: {
            "I am human": "Eu son humano"
        },
        ka: {
            "I am human": "მე ვარ ადამიანი"
        },
        de: {
            "I am human": "Ich bin ein Mensch"
        },
        el: {
            "I am human": "Είμαι άνθρωπος"
        },
        gu: {
            "I am human": "હું માનવ છું"
        },
        iw: {
            "I am human": ". אני אנושי"
        },
        hi: {
            "I am human": "मैं मानव हूं"
        },
        hu: {
            "I am human": "Nem vagyok robot"
        },
        is: {
            "I am human": "Ég er manneskja"
        },
        id: {
            "I am human": "Aku manusia"
        },
        it: {
            "I am human": "Sono un essere umano"
        },
        ja: {
            "I am human": "私は人間です"
        },
        kn: {
            "I am human": "ನಾನು ಮಾನವನು"
        },
        ko: {
            "I am human": "사람입니다"
        },
        lo: {
            "I am human": "ຂ້ອຍເປັນມະນຸດ"
        },
        lv: {
            "I am human": "Es esmu cilvēks"
        },
        lt: {
            "I am human": "Aš esu žmogaus"
        },
        ms: {
            "I am human": "Saya manusia"
        },
        ml: {
            "I am human": "ഞാൻ മനുഷ്യനാണ്"
        },
        mr: {
            "I am human": "मी मानवी आहे"
        },
        mn: {
            "I am human": "Би бол хүн"
        },
        no: {
            "I am human": "Jeg er menneskelig"
        },
        fa: {
            "I am human": "من انسانی هستم"
        },
        pl: {
            "I am human": "Jestem człowiekiem"
        },
        pt: {
            "I am human": "Sou humano"
        },
        ro: {
            "I am human": "Eu sunt om"
        },
        ru: {
            "I am human": "Я человек"
        },
        sr: {
            "I am human": "Ja sam ljudski"
        },
        si: {
            "I am human": "මම මිනිස්සු"
        },
        sk: {
            "I am human": "Ja som človek"
        },
        sl: {
            "I am human": "Jaz sem človeški"
        },
        es: {
            "I am human": "Soy humano"
        },
        sw: {
            "I am human": "Mimi ni binadamu"
        },
        sv: {
            "I am human": "Jag är människa"
        },
        ta: {
            "I am human": "நான் மனித"
        },
        te: {
            "I am human": "నేను మనిషిని"
        },
        th: {
            "I am human": "ผมมนุษย์"
        },
        tr: {
            "I am human": "Ben bir insanım"
        },
        uk: {
            "I am human": "Я людини"
        },
        ur: {
            "I am human": "میں انسان ہوں"
        },
        vi: {
            "I am human": "Tôi là con người"
        },
        zu: {
            "I am human": "Ngingumuntu"
        }
    }
      , wt = null
      , bt = {
        translate: function(e, t) {
            var n = bt.getBestTrans(vt)
              , r = n && n[e];
            if (r = r || e,
            t)
                for (var i = Object.keys(t), o = i.length; o--; )
                    r = r.replace(new RegExp("{{" + i[o] + "}}","g"), t[i[o]]);
            return r
        },
        getBestTrans: function(e) {
            var t = bt.getLocale();
            return t in e ? e[t] : bt.getShortLocale(t)in e ? e[bt.getShortLocale(t)] : "en"in e ? e.en : null
        },
        resolveLocale: function(e) {
            var t = bt.getShortLocale(e);
            return "in" === t && (e = "id"),
            "iw" === t && (e = "he"),
            "nb" === t && (e = "no"),
            "ji" === t && (e = "yi"),
            "zh-CN" === e && (e = "zh"),
            "jv" === t && (e = "jw"),
            "me" === t && (e = "bs"),
            yt[e] ? e : yt[t] ? t : "en"
        },
        getLocale: function() {
            return bt.resolveLocale(wt || window.navigator.userLanguage || window.navigator.language)
        },
        setLocale: function(e) {
            "zh-Hans" === e ? e = "zh-CN" : "zh-Hant" === e && (e = "zh-TW"),
            wt = e
        },
        getShortLocale: function(e) {
            return e.indexOf("-") >= 0 ? e.substring(0, e.indexOf("-")) : e
        },
        getLangName: function(e) {
            return yt[e]
        },
        isShortLocale: function(e) {
            return 2 === e.length || 3 === e.length
        },
        addTable: function(e, t) {
            if (t || (t = Object.create(null)),
            vt[e]) {
                var n = vt[e];
                for (var r in t)
                    n[r] = t[r]
            } else
                vt[e] = t;
            return vt[e]
        },
        getTable: function(e) {
            return vt[e]
        },
        addTables: function(e) {
            for (var t in e)
                bt.addTable(t, e[t]);
            return vt
        },
        getTables: function() {
            return vt
        }
    }
      , _t = {
        400: "Rate limited or network error. Please retry.",
        429: "Your computer or network has sent too many requests.",
        500: "Cannot contact hCaptcha. Check your connection and try again."
    }
      , Tt = function(e) {
        try {
            return bt.translate(_t[e])
        } catch (Xn) {
            return !1
        }
    }
      , Vt = "undefined" != typeof XDomainRequest && !("withCredentials"in XMLHttpRequest.prototype);
    function kt(e, t, n) {
        n = n || {};
        var r = {
            url: t,
            method: e.toUpperCase(),
            responseType: n.responseType || "string",
            dataType: n.dataType || null,
            withCredentials: n.withCredentials || !1,
            headers: n.headers || null,
            data: n.data || null,
            timeout: n.timeout || null,
            pst: n.pst || null
        };
        r.legacy = r.withCredentials && Vt;
        var i = "fetch"in window && r.pst ? St : Et;
        return n.retry ? Qe((function() {
            return n.data && (r.data = "function" == typeof n.data ? n.data() : n.data,
            "json" === r.dataType && "object" == typeof r.data ? r.data = JSON.stringify(r.data) : "query" === r.dataType && (r.data = dt(r.data))),
            i(r)
        }
        ), n.retry) : (n.data && (r.data = "function" == typeof n.data ? n.data() : n.data,
        "json" === r.dataType && "object" == typeof r.data ? r.data = JSON.stringify(r.data) : "query" === r.dataType && (r.data = dt(r.data))),
        i(r))
    }
    function Et(e) {
        var t = e.legacy ? new XDomainRequest : new XMLHttpRequest
          , n = "function" == typeof e.url ? e.url() : e.url;
        return new Promise((function(r, i) {
            var o, a = function(o) {
                return function() {
                    var a = t.response
                      , s = t.statusText || ""
                      , c = t.status
                      , l = t.readyState;
                    if (a || "" !== t.responseType && "text" !== t.responseType || (a = t.responseText),
                    4 === l || e.legacy) {
                        try {
                            if (a) {
                                var u = t.contentType;
                                t.getResponseHeader && (u = t.getResponseHeader("content-type"));
                                var h = -1 !== (u = u ? u.toLowerCase() : "").indexOf("application/json");
                                if ("ArrayBuffer"in window && a instanceof ArrayBuffer && h && (a = (new TextDecoder).decode(new Uint8Array(a))),
                                "string" == typeof a)
                                    try {
                                        a = JSON.parse(a)
                                    } catch (p) {
                                        h && Ae("http", p, {
                                            url: n,
                                            config: e,
                                            responseType: t.responseType,
                                            contentType: u,
                                            response: a
                                        })
                                    }
                            }
                        } catch (p) {
                            return Ae("http", p, {
                                contentType: u
                            }),
                            void i({
                                event: ce,
                                endpoint: n,
                                response: a,
                                state: l,
                                status: c,
                                message: Tt(c || 400) || s
                            })
                        }
                        if ("error" === o || c >= 400 && c <= 511)
                            return void i({
                                event: ce,
                                endpoint: n,
                                response: a,
                                state: l,
                                status: c,
                                message: 409 === c && a.error || Tt(c || 400) || s
                            });
                        r({
                            state: l,
                            status: c,
                            body: a,
                            message: s
                        })
                    }
                }
            };
            if ((t.onload = a("complete"),
            t.onerror = t.ontimeout = a("error"),
            t.open(e.method, n),
            "arraybuffer" === e.responseType && (!e.legacy && "TextDecoder"in window && "ArrayBuffer"in window ? t.responseType = "arraybuffer" : (e.responseType = "json",
            e.headers.accept = "application/json")),
            e.timeout && (t.timeout = "function" == typeof e.timeout ? e.timeout(n) : e.timeout),
            !e.legacy) && (t.withCredentials = e.withCredentials,
            e.headers))
                for (var s in e.headers)
                    o = e.headers[s],
                    t.setRequestHeader(s, o);
            setTimeout((function() {
                t.send(e.data)
            }
            ), 0)
        }
        ))
    }
    function St(e) {
        var t, n = "function" == typeof e.url ? e.url() : e.url, r = new Headers;
        if ("json" === e.responseType && r.set("content-type", "application/json"),
        e.headers)
            for (var i in e.headers)
                t = e.headers[i],
                r.set(i, t);
        var o = {
            method: e.method,
            credentials: "include",
            body: e.data,
            headers: r
        };
        if (e.pst) {
            var a = {};
            "token-request" === e.pst ? a = {
                version: 1,
                operation: "token-request"
            } : "token-redemption" === e.pst ? a = {
                version: 1,
                operation: "token-redemption",
                refreshPolicy: "refresh"
            } : "send-redemption-record" === e.pst && (a = {
                version: 1,
                operation: "send-redemption-record",
                issuers: [ve.pstIssuer]
            }),
            o.privateToken = a
        }
        return new Promise((function(t, r) {
            fetch(n, o).then((function(i) {
                return 200 !== i.status ? r({
                    event: ce,
                    endpoint: n,
                    response: i,
                    state: 4,
                    status: i.status,
                    message: Tt(i.status || 400)
                }) : ("arraybuffer" === e.responseType ? i.arrayBuffer() : "json" === e.responseType ? i.json() : i.text()).then((function(e) {
                    t({
                        state: 4,
                        status: i.status,
                        body: e,
                        message: Tt(i.status || 400)
                    })
                }
                ))
            }
            ))["catch"]((function(e) {
                r({
                    event: ce,
                    endpoint: n,
                    response: e.error,
                    state: 4,
                    status: 400,
                    message: Tt(400)
                })
            }
            ))
        }
        ))
    }
    var Rt = function(e, t) {
        if ("object" == typeof e && t === undefined && (e = (t = e).url),
        null === e)
            throw new Error("Url missing");
        return kt("GET", e, t)
    }
      , xt = ["svg", "gif", "png"];
    function Ut(e, t) {
        t = t || {};
        var n, r = e;
        if (0 === r.indexOf("data:image"))
            for (var i = !1, o = xt.length, a = -1; a++ < o && !i; )
                (i = r.indexOf(xt[a]) >= 0) && (n = xt[a]);
        else
            n = r.substr(r.lastIndexOf(".") + 1, r.length);
        !!(!document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect) && t.fallback && (t.fallback.indexOf(".") >= 0 ? n = (r = t.fallback).substr(r.lastIndexOf(".") + 1, r.length) : (r = e.substr(0, e.indexOf(n)) + t.fallback,
        n = t.fallback)),
        t.prefix && (r = t.prefix + "/" + r),
        this.attribs = {
            crossOrigin: t.crossOrigin || null
        },
        this.id = r,
        this.src = function(e) {
            if (ve.assethost && 0 === e.indexOf(ye.assetDomain))
                return ve.assethost + e.replace(ye.assetDomain, "");
            if (ve.imghost && e.indexOf("imgs") >= 0) {
                var t = e.indexOf(".ai") >= 0 ? e.indexOf(".ai") + 3 : e.indexOf(".com") + 4;
                return ve.imghost + e.substr(t, e.length)
            }
            return e
        }(r),
        this.ext = n,
        this.width = 0,
        this.height = 0,
        this.aspect = 0,
        this.loaded = !1,
        this.error = !1,
        this.element = null,
        this.cb = {
            load: [],
            error: []
        }
    }
    function Ct(e, t, n) {
        for (var r = e[t], i = r.length, o = null; --i > -1; )
            o = r[i],
            r.splice(i, 1),
            o(n);
        "error" === t ? e.load = [] : e.error = []
    }
    function Ot(e, t) {
        var n = e;
        t || (t = {}),
        t.prefix && (n = t.prefix + "/" + e),
        this.attribs = {
            defer: t.defer || null,
            async: t.async || null,
            crossOrigin: t.crossOrigin || null,
            integrity: t.integrity || null
        },
        this.id = n,
        this.src = function(e) {
            if (ve.assethost && 0 === e.indexOf(ye.assetDomain))
                return ve.assethost + e.replace(ye.assetDomain, "");
            return e
        }(n),
        this.loaded = !1,
        this.error = !1,
        this.element = null,
        this.cb = {
            load: [],
            error: []
        }
    }
    function Pt(e, t, n) {
        for (var r = e[t], i = r.length, o = null; --i > -1; )
            o = r[i],
            r.splice(i, 1),
            o(n);
        "error" === t ? e.load = [] : e.error = []
    }
    function Mt(e, t) {
        var n = e;
        t || (t = {}),
        t.prefix && (n = t.prefix + "/" + e),
        this.responseType = t.responseType,
        this.id = n,
        this.src = function(e) {
            if (ve.assethost && 0 === e.indexOf(ye.assetDomain))
                return ve.assethost + e.replace(ye.assetDomain, "");
            return e
        }(n),
        this.loaded = !1,
        this.error = !1,
        this.cb = {
            load: [],
            error: []
        },
        this.data = null
    }
    function Wt(e, t, n) {
        for (var r = e[t], i = r.length, o = null; --i > -1; )
            o = r[i],
            r.splice(i, 1),
            o(n);
        "error" === t ? e.load = [] : e.error = []
    }
    Ut.prototype.load = function() {
        return ("svg" === this.ext ? this._loadSvg() : this._loadImg())["catch"]((function(e) {
            throw Ne("Asset failed", "error", "assets", {
                error: e
            }),
            e
        }
        ))
    }
    ,
    Ut.prototype._loadSvg = function() {
        var e, t = this, n = this.src, r = this.id;
        if (0 === n.indexOf("data:image/svg+xml")) {
            var i = n.slice("data:image/svg+xml,".length);
            e = Promise.resolve(decodeURIComponent(i))
        } else
            e = Rt(n).then((function(e) {
                return e.body
            }
            ));
        return e.then((function(e) {
            var n = (new DOMParser).parseFromString(e, "image/svg+xml").documentElement
              , r = parseInt(n.getAttribute("width"))
              , i = parseInt(n.getAttribute("height"));
            return t._imgLoaded(n, r, i),
            t
        }
        ))["catch"]((function(e) {
            t.error = !0;
            var n = (e && e.message ? e.message : e || "Loading Error") + ": " + r;
            throw Ct(t.cb, "error", n),
            n
        }
        ))
    }
    ,
    Ut.prototype._loadImg = function() {
        var e = this
          , t = this.attribs
          , n = this.src
          , r = this.id;
        return new Promise((function(i, o) {
            function a() {
                e.loaded || (e._imgLoaded(s, s.width, s.height),
                s.onload = s.onerror = null,
                i(e))
            }
            var s = new Image;
            t.crossOrigin && (s.crossOrigin = t.crossOrigin),
            s.onerror = function() {
                e.error = !0,
                s.onload = s.onerror = null;
                var t = "Loading Error: " + r;
                Ct(e.cb, "error", t),
                o(t)
            }
            ,
            s.onload = a,
            s.src = n,
            s.complete && a()
        }
        ))
    }
    ,
    Ut.prototype._imgLoaded = function(e, t, n) {
        this.element = new pt(e),
        this.width = t,
        this.height = n,
        this.aspect = t / n,
        this.loaded = !0,
        Ct(this.cb, "load", this)
    }
    ,
    Ut.prototype.onload = function(e) {
        this.error || (this.loaded ? e(this) : this.cb.load.push(e))
    }
    ,
    Ut.prototype.onerror = function(e) {
        this.loaded && !this.error || (this.error ? e(this) : this.cb.error.push(e))
    }
    ,
    Ot.prototype.load = function() {
        var e = this
          , t = this.attribs
          , n = this.src
          , r = this.id;
        return new Promise((function(i, o) {
            var a = document.createElement("script");
            e.element = a,
            a.onerror = function() {
                e.error = !0,
                a.onload = a.onreadystatechange = a.onerror = null;
                var t = "Loading Error: " + r;
                Pt(e.cb, "error", t),
                o(t)
            }
            ,
            a.onload = a.onreadystatechange = function() {
                this.loaded || a.readyState && "loaded" !== a.readyState && "complete" !== a.readyState || (e.loaded = !0,
                a.onload = a.onreadystatechange = a.onerror = null,
                document.body.removeChild(a),
                Pt(e.cb, "load", e),
                i(e))
            }
            ,
            a.type = "text/javascript",
            a.src = n,
            t.crossOrigin && (a.crossorigin = t.crossOrigin),
            t.async && (a.async = !0),
            t.defer && (a.defer = !0),
            t.integrity && (a.integrity = t.integrity),
            document.body.appendChild(a),
            a.complete && a.onload()
        }
        ))
    }
    ,
    Ot.prototype.onload = function(e) {
        this.error || (this.loaded ? e(this) : this.cb.load.push(e))
    }
    ,
    Ot.prototype.onerror = function(e) {
        this.loaded && !this.error || (this.error ? e(this) : this.cb.error.push(e))
    }
    ,
    Mt.prototype.load = function() {
        var e = this
          , t = this.src
          , n = this.id;
        return new Promise((function(r, i) {
            var o = {};
            "arraybuffer" === e.responseType ? o.responseType = "arraybuffer" : t.indexOf("json") >= 0 && (o.responseType = "json"),
            Rt(t, o).then((function(t) {
                e.loaded = !0,
                e.data = t.body,
                Wt(e.cb, "load", e),
                r(e)
            }
            ))["catch"]((function(t) {
                e.error = !0;
                var r = (t && t.message ? t.message : "Loading Error") + ": " + n;
                Wt(e.cb, "error", r),
                i(r)
            }
            ))
        }
        ))
    }
    ,
    Mt.prototype.onload = function(e) {
        this.error || (this.loaded ? e(this) : this.cb.load.push(e))
    }
    ,
    Mt.prototype.onerror = function(e) {
        this.loaded && !this.error || (this.error ? e(this) : this.cb.error.push(e))
    }
    ;
    var Nt = []
      , At = function(e, t) {
        var n = new Mt(e,t);
        return Nt.push(n),
        n.load()
    }
      , jt = function(e) {
        return new Promise((function(t, n) {
            for (var r = Nt.length, i = !1, o = null; --r > -1 && !i; )
                i = (o = Nt[r]).id === e || -1 !== o.id.indexOf("/" === e[0] ? "" : "/" + e);
            if (!i)
                return t(null);
            o.onload(t),
            o.onerror(n)
        }
        ))
    }
      , Ft = []
      , Bt = !1
      , Gt = !1;
    function Dt() {
        document.addEventListener ? (document.addEventListener("DOMContentLoaded", It),
        window.addEventListener("load", It)) : (document.attachEvent("onreadystatechange", Zt),
        window.attachEvent("onload", It)),
        Bt = !0
    }
    function Zt() {
        "interactive" !== document.readyState && "loaded" !== document.readyState && "complete" !== document.readyState || It()
    }
    function It() {
        if (!1 === Gt) {
            for (var e = 0; e < Ft.length; e++)
                Ft[e].fn.apply(null, Ft[e].args);
            Ft = []
        }
        Gt = !0,
        document.removeEventListener ? (document.removeEventListener("DOMContentLoaded", It),
        window.removeEventListener("load", It)) : (document.detachEvent("onreadystatechange", Zt),
        window.detachEvent("onload", It))
    }
    new pt(document);
    var zt = new pt(window)
      , Kt = {
        touchstart: "ts",
        touchend: "te",
        touchmove: "tm",
        touchcancel: "tc"
    }
      , Lt = {
        mousedown: "md",
        mouseup: "mu",
        mousemove: "mm"
    }
      , Ht = {
        pointermove: "pm"
    }
      , $t = {
        keydown: "kd",
        keyup: "ku"
    }
      , Jt = {
        devicemotion: "dm"
    }
      , Xt = function(e, t) {
        var n = Lt[e]
          , r = null;
        return function(e) {
            r = function(e) {
                return [e.windowX, e.windowY, Date.now()]
            }(e),
            t(n, r)
        }
    }
      , Yt = function(e, t) {
        var n = Ht[e]
          , r = null;
        return function(e) {
            r = function(e) {
                var t = []
                  , n = [];
                e.getCoalescedEvents && (n = e.getCoalescedEvents());
                for (var r = 0; r < n.length; r++) {
                    var i = n[r];
                    t.push([i.x, i.y, Date.now()])
                }
                return t
            }(e);
            for (var i = 0; i < r.length; i++)
                t(n, r[i])
        }
    }
      , qt = function(e, t) {
        var n = Kt[e]
          , r = null;
        return function(e) {
            r = function(e) {
                var t = [];
                try {
                    var n, r;
                    if (e.touches && e.touches.length >= 1 ? n = e.touches : e.changedTouches && e.changedTouches.length >= 1 && (n = e.changedTouches),
                    n) {
                        for (var i = 0; i < n.length; i++)
                            (r = st.eventCoords(n[i])) && t.push([n[i].identifier, r.x, r.y]);
                        t.push(Date.now())
                    }
                    return t
                } catch (Xn) {
                    return t
                }
            }(e),
            t(n, r)
        }
    }
      , Qt = function(e, t) {
        var n = $t[e]
          , r = null;
        return function(e) {
            r = function(e) {
                return [e.keyNum, Date.now()]
            }(e),
            t(n, r)
        }
    }
      , en = function(e, t) {
        var n = Jt[e]
          , r = null
          , i = [];
        return function(e) {
            r = function(e, t) {
                (e.acceleration === undefined || e.acceleration && e.acceleration.x === undefined) && (e.acceleration = {
                    x: 0,
                    y: 0,
                    z: 0
                });
                (e.rotationRate === undefined || e.rotationRate && e.rotationRate.alpha === undefined) && (e.rotationRate = {
                    alpha: 0,
                    beta: 0,
                    gamma: 0
                });
                var n = [e.acceleration.x, e.acceleration.y, e.acceleration.z, e.rotationRate.alpha, e.rotationRate.beta, e.rotationRate.gamma, Date.now()]
                  , r = [];
                if (0 === t.length)
                    t = n,
                    r = n;
                else {
                    for (var i, o = 0, a = 0; a < 6; a++)
                        i = t[a] - n[a],
                        r.push(n[a]),
                        o += Math.abs(i);
                    if (r.push(Date.now()),
                    t = n,
                    o <= 0)
                        return null
                }
                return {
                    motion: r,
                    prevmotion: t
                }
            }(e, i),
            null !== r && (i = r.prevmotion,
            r = r.motion,
            t(n, r))
        }
    };
    function tn() {
        this._manifest = {},
        this.state = {
            timeBuffers: {},
            loadTime: Date.now(),
            recording: !1,
            initRecord: !1,
            record: {
                mouse: !0,
                touch: !0,
                keys: !1,
                motion: !1
            }
        },
        this._recordEvent = this._recordEvent.bind(this)
    }
    tn.prototype.record = function(e, t, n, r) {
        if (this._manifest.st = Date.now(),
        this.state.record.mouse = e === undefined ? this.state.record.mouse : e,
        this.state.record.touch = n === undefined ? this.state.record.touch : n,
        this.state.record.keys = t === undefined ? this.state.record.keys : t,
        this.state.record.motion = r === undefined ? this.state.record.motion : r,
        !1 === this.state.initRecord) {
            var i = new pt(document.body);
            this.state.record.mouse && (i.addEventListener("mousedown", Xt("mousedown", this._recordEvent), !0),
            i.addEventListener("mousemove", Xt("mousemove", this._recordEvent), !0),
            i.addEventListener("mouseup", Xt("mouseup", this._recordEvent), !0),
            i.addEventListener("pointermove", Yt("pointermove", this._recordEvent), !0)),
            !0 === this.state.record.keys && (i.addEventListener("keyup", Qt("keyup", this._recordEvent), !0),
            i.addEventListener("keydown", Qt("keydown", this._recordEvent), !0)),
            this.state.record.touch && !0 === ee.Browser.hasEvent("touchstart", document.body) && (i.addEventListener("touchstart", qt("touchstart", this._recordEvent), !0),
            i.addEventListener("touchmove", qt("touchmove", this._recordEvent), !0),
            i.addEventListener("touchend", qt("touchend", this._recordEvent), !0)),
            this.state.record.motion && !0 === ee.Browser.hasEvent("devicemotion", window) && i.addEventListener("devicemotion", en("devicemotion", this._recordEvent), !0),
            this.state.initRecord = !0
        }
        this.state.recording = !0
    }
    ,
    tn.prototype.stop = function() {
        this.state.recording = !1
    }
    ,
    tn.prototype.time = function() {
        return this.state.loadTime
    }
    ,
    tn.prototype.getData = function() {
        for (var e in this.state.timeBuffers)
            this._manifest[e] = this.state.timeBuffers[e].getData(),
            this._manifest[e + "-mp"] = this.state.timeBuffers[e].getMeanPeriod();
        return this._manifest
    }
    ,
    tn.prototype.setData = function(e, t) {
        this._manifest[e] = t
    }
    ,
    tn.prototype.resetData = function() {
        this._manifest = {},
        this.state.timeBuffers = {}
    }
    ,
    tn.prototype.circBuffPush = function(e, t) {
        this._recordEvent(e, t)
    }
    ,
    tn.prototype._recordEvent = function(e, t) {
        if (!1 !== this.state.recording)
            try {
                var n = t[t.length - 1];
                this.state.timeBuffers[e] || (this.state.timeBuffers[e] = new Ye(16,15e3)),
                this.state.timeBuffers[e].push(n, t)
            } catch (Jn) {
                Ae("motion", Jn)
            }
    }
    ;
    var nn, rn, on, an, sn, cn = new tn;
    try {
        nn = function() {
            var e = {
                _C8SRvzp7: 0,
                _5K0ED: 0,
                _cG4w22T4u: [],
                _9Hjf: [],
                _RfRvpsn0N: [],
                _YAJtVDoQ: {},
                _O0aX: window,
                _92wSg2dyO6: [function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._aOPAeS[e._C8SRvzp7++];
                    t || (e._C8SRvzp7 = n)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop()
                      , r = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n[t] += r)
                }
                , function(e) {
                    e._cG4w22T4u.push(ot)
                }
                , function(e) {
                    e._cG4w22T4u.push(e._O0aX)
                }
                , function(e) {
                    for (var t = e._aOPAeS[e._C8SRvzp7++], n = e._aOPAeS[e._C8SRvzp7++], r = e._aOPAeS[e._C8SRvzp7++], i = decodeURIComponent(atob(e._7IxkUn4o.slice(t, t + n))), o = "", a = 0; a < i.length; a++)
                        o += String.fromCharCode((256 + i.charCodeAt(a) + r) % 256);
                    e._cG4w22T4u.push(o)
                }
                , function(e) {
                    e._cG4w22T4u.push(e._aOPAeS[e._C8SRvzp7++])
                }
                , function(e) {
                    e._C8SRvzp7 = e._cG4w22T4u.splice(e._cG4w22T4u.length - 4, 1)[0],
                    e._O0aX = e._cG4w22T4u.splice(e._cG4w22T4u.length - 3, 1)[0],
                    e._9Hjf = e._cG4w22T4u.splice(e._cG4w22T4u.length - 2, 1)[0]
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop()
                      , r = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n[t] = r)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n + t)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop();
                    if (t && t._l !== undefined)
                        n.splice(0, 0, {
                            _l: {}
                        }),
                        t.apply(e._O0aX, n);
                    else {
                        var r = t.apply(e._O0aX, n);
                        e._cG4w22T4u.push(r)
                    }
                }
                , function(e) {
                    var t = e._aOPAeS[e._C8SRvzp7++]
                      , n = e._aOPAeS[e._C8SRvzp7++]
                      , r = -1 == t ? e._9Hjf : e._RfRvpsn0N[t];
                    e._cG4w22T4u.push(r[n])
                }
                , function(e) {
                    e._cG4w22T4u.push(e._cG4w22T4u[e._cG4w22T4u.length - 1])
                }
                , function(e) {
                    for (var t = e._aOPAeS[e._C8SRvzp7++], n = [], r = 0; r < t; r++)
                        n.push(e._cG4w22T4u.pop());
                    e._cG4w22T4u.push(n)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n == t)
                }
                , function(e) {
                    var n = e._5K0ED
                      , r = e._aOPAeS[e._C8SRvzp7++];
                    try {
                        t(e)
                    } catch (i) {
                        e._cG4w22T4u.push(i),
                        e._C8SRvzp7 = r,
                        t(e)
                    }
                    e._5K0ED = n
                }
                , function(e) {
                    e._cG4w22T4u.push(!!e._aOPAeS[e._C8SRvzp7++])
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(typeof t)
                }
                , function() {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop()
                      , r = !1;
                    t._l !== undefined && (r = !0,
                    n.splice(0, 0, {
                        _l: {}
                    }));
                    var i = new (Function.prototype.bind.apply(t, [null].concat(n)));
                    r && e._cG4w22T4u.pop(),
                    e._cG4w22T4u.push(i)
                }
                , function(e) {
                    var n = e._cG4w22T4u.pop()
                      , r = function() {
                        var i = !1
                          , o = Array.prototype.slice.call(arguments);
                        o.length > 0 && o[0] && o[0]._l ? o = o.splice(1, o.length - 1) : i = !0;
                        var a = e._O0aX
                          , s = e._5K0ED
                          , c = e._RfRvpsn0N;
                        if (e._cG4w22T4u.push(e._C8SRvzp7),
                        e._cG4w22T4u.push(e._O0aX),
                        e._cG4w22T4u.push(e._9Hjf),
                        e._cG4w22T4u.push(o),
                        e._cG4w22T4u.push(r),
                        e._5K0ED = e._C8SRvzp7,
                        e._C8SRvzp7 = n,
                        e._O0aX = this,
                        e._RfRvpsn0N = r._r,
                        t(e),
                        e._O0aX = a,
                        e._5K0ED = s,
                        e._RfRvpsn0N = c,
                        i)
                            return e._cG4w22T4u.pop()
                    };
                    r._l = {},
                    r._r = Array.prototype.slice.call(e._RfRvpsn0N),
                    e._cG4w22T4u.push(r)
                }
                , function(e) {
                    e._cG4w22T4u.push(null)
                }
                , function(e) {
                    e._cG4w22T4u.pop(),
                    e._cG4w22T4u.push(void 0)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop()
                      , r = n[t];
                    "function" == typeof r && (r = r.bind(n)),
                    e._cG4w22T4u.push(r)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n > t)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._aOPAeS[e._C8SRvzp7++]
                      , r = e._aOPAeS[e._C8SRvzp7++];
                    e._9Hjf[r] = t;
                    for (var i = 0; i < n; i++)
                        e._9Hjf[e._aOPAeS[e._C8SRvzp7++]] = t[i]
                }
                , function() {
                    var t = e._cG4w22T4u.pop()
                      , n = e._aOPAeS[e._C8SRvzp7++];
                    e._RfRvpsn0N[n] ? e._9Hjf = e._RfRvpsn0N[n] : (e._9Hjf = t,
                    e._RfRvpsn0N[n] = t)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n === t)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n !== t)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._aOPAeS[e._C8SRvzp7++]
                      , r = e._aOPAeS[e._C8SRvzp7++]
                      , i = -1 == n ? e._9Hjf : e._RfRvpsn0N[n];
                    e._cG4w22T4u.push(i[r] = t)
                }
                , function(e) {
                    e._cG4w22T4u.push(at)
                }
                , function(e) {
                    e._cG4w22T4u.push(st)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n | t)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n / t)
                }
                , function(e) {
                    e._YAJtVDoQ[e._cG4w22T4u[e._cG4w22T4u.length - 1]] = e._cG4w22T4u[e._cG4w22T4u.length - 2]
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n * t)
                }
                , function(e) {
                    for (var t = e._aOPAeS[e._C8SRvzp7++], n = {}, r = 0; r < t; r++) {
                        var i = e._cG4w22T4u.pop();
                        n[e._cG4w22T4u.pop()] = i
                    }
                    e._cG4w22T4u.push(n)
                }
                , function(e) {
                    e._cG4w22T4u.push(ee)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._aOPAeS[e._C8SRvzp7++]
                      , r = e._aOPAeS[e._C8SRvzp7++];
                    (-1 == n ? e._9Hjf : e._RfRvpsn0N[n])[r] = t
                }
                , function(e) {
                    e._cG4w22T4u.pop()
                }
                , function(e) {
                    e._cG4w22T4u.push(at)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(!t)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n in t)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._aOPAeS[e._C8SRvzp7++]
                      , r = e._aOPAeS[e._C8SRvzp7++]
                      , i = -1 == n ? e._9Hjf : e._RfRvpsn0N[n];
                    e._cG4w22T4u.push(i[r] |= t)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n - t)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n << t)
                }
                , function(e) {
                    e._cG4w22T4u.push(pt)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n >= t)
                }
                , function(e) {
                    var t = e._aOPAeS[e._C8SRvzp7++];
                    e._5K0ED = t
                }
                , function() {
                    var t = e._cG4w22T4u.pop()
                      , n = e._aOPAeS[e._C8SRvzp7++];
                    e._9Hjf = t,
                    e._RfRvpsn0N[n] = t
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(window[t])
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._aOPAeS[e._C8SRvzp7++]
                      , r = e._aOPAeS[e._C8SRvzp7++]
                      , i = -1 == n ? e._9Hjf : e._RfRvpsn0N[n];
                    e._cG4w22T4u.push(i[r] += t)
                }
                , function(e) {
                    e._cG4w22T4u.push(undefined)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n < t)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n instanceof t)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(-t)
                }
                , function(e) {
                    var t = e._cG4w22T4u.pop()
                      , n = e._cG4w22T4u.pop();
                    e._cG4w22T4u.push(n <= t)
                }
                , function(e) {
                    var t = e._aOPAeS[e._C8SRvzp7++]
                      , n = e._aOPAeS[e._C8SRvzp7++]
                      , r = e._aOPAeS[e._C8SRvzp7++]
                      , i = -1 == t ? e._9Hjf : e._RfRvpsn0N[t];
                    r ? e._cG4w22T4u.push(++i[n]) : e._cG4w22T4u.push(i[n]++)
                }
                ],
                _aOPAeS: [12, 0, 24, 0, 5, 14, 18, 36, -1, 0, 15, 0, 0, 131, 12, 0, 47, 1, 37, 23, 1, 0, 1, 10, -1, 1, 4, 4080, 8, -9, 21, 10, -1, 1, 4, 3448, 12, 20, 21, 13, 11, 0, 61, 37, 10, -1, 1, 4, 4836, 12, 6, 21, 10, -1, 1, 4, 4360, 16, 19, 21, 13, 36, -1, 2, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 10, -1, 2, 0, 88, 5, 1, 15, 0, 0, 90, 5, 0, 10, -1, 1, 4, 1840, 16, 10, 21, 0, 106, 5, 1, 15, 0, 0, 108, 5, 0, 10, -1, 1, 4, 2952, 12, -2, 21, 10, -1, 1, 4, 2088, 24, -10, 21, 12, 5, 15, 0, 0, 130, 6, 5, 141, 18, 36, -1, 1, 15, 0, 0, 300, 12, 0, 47, 2, 37, 23, 1, 0, 1, 12, 0, 36, -1, 2, 12, 0, 36, -1, 3, 10, -1, 1, 4, 3264, 36, 19, 21, 0, 185, 12, 0, 10, -1, 1, 4, 3264, 36, 19, 21, 9, 27, -1, 3, 37, 5, 0, 36, -1, 4, 10, -1, 4, 10, -1, 3, 4, 3588, 12, -11, 21, 51, 0, 292, 10, -1, 3, 10, -1, 4, 21, 36, -1, 5, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 10, -1, 5, 4, 4696, 8, -18, 21, 12, 1, 4, 1780, 8, -2, 48, 4, 4704, 12, 16, 21, 9, 10, -1, 5, 4, 3368, 4, 1, 21, 12, 1, 4, 1780, 8, -2, 48, 4, 4704, 12, 16, 21, 9, 12, 3, 12, 1, 10, -1, 2, 4, 1292, 28, -16, 21, 9, 37, 55, -1, 4, 0, 37, 15, 0, 0, 190, 10, -1, 2, 15, 0, 0, 299, 6, 5, 310, 18, 36, -1, 2, 15, 0, 0, 341, 12, 0, 47, 3, 37, 23, 1, 0, 1, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 5, 0, 12, 2, 15, 0, 0, 340, 6, 5, 351, 18, 36, -1, 3, 15, 0, 0, 639, 12, 0, 47, 4, 37, 23, 1, 0, 1, 12, 0, 36, -1, 2, 14, 619, 10, -1, 1, 4, 276, 32, -13, 21, 11, 0, 395, 37, 10, -1, 1, 4, 276, 32, -13, 21, 4, 3588, 12, -11, 21, 5, 1, 45, 0, 413, 10, -1, 1, 4, 276, 32, -13, 21, 27, -1, 3, 37, 15, 0, 0, 455, 10, -1, 1, 4, 1428, 24, 17, 21, 11, 0, 441, 37, 10, -1, 1, 4, 1428, 24, 17, 21, 4, 3588, 12, -11, 21, 5, 1, 45, 0, 455, 10, -1, 1, 4, 1428, 24, 17, 21, 27, -1, 3, 37, 10, -1, 3, 0, 606, 5, 0, 36, -1, 5, 10, -1, 5, 10, -1, 3, 4, 3588, 12, -11, 21, 51, 0, 581, 10, -1, 3, 10, -1, 5, 21, 12, 1, 29, 4, 2828, 64, -19, 21, 9, 27, -1, 4, 37, 10, -1, 4, 0, 572, 10, -1, 4, 4, 4696, 8, -18, 21, 12, 1, 4, 1780, 8, -2, 48, 4, 4704, 12, 16, 21, 9, 10, -1, 4, 4, 3368, 4, 1, 21, 12, 1, 4, 1780, 8, -2, 48, 4, 4704, 12, 16, 21, 9, 10, -1, 3, 10, -1, 5, 21, 4, 212, 32, -17, 21, 12, 3, 12, 1, 10, -1, 2, 4, 1292, 28, -16, 21, 9, 37, 55, -1, 5, 0, 37, 15, 0, 0, 465, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 12, 1, 10, -1, 2, 4, 1292, 28, -16, 21, 9, 37, 10, -1, 2, 15, 0, 0, 638, 46, 615, 15, 0, 0, 629, 36, -1, 6, 10, -1, 2, 15, 0, 0, 638, 4, 3904, 20, 14, 48, 15, 0, 0, 638, 6, 5, 649, 18, 36, -1, 4, 15, 0, 0, 1112, 12, 0, 47, 5, 37, 23, 2, 0, 1, 2, 10, -1, 1, 4, 3372, 24, 20, 21, 5, 0, 20, 25, 11, 39, 0, 705, 37, 10, -1, 1, 4, 3372, 24, 20, 21, 11, 0, 705, 37, 10, -1, 1, 4, 3372, 24, 20, 21, 4, 3368, 4, 1, 21, 5, 0, 20, 25, 0, 736, 4, 3412, 4, 19, 5, 0, 4, 4696, 8, -18, 5, 0, 4, 3368, 4, 1, 5, 0, 34, 3, 10, -1, 1, 4, 3372, 24, 20, 7, 37, 10, -1, 1, 4, 1700, 24, -10, 21, 5, 0, 20, 25, 11, 39, 0, 782, 37, 10, -1, 1, 4, 1700, 24, -10, 21, 11, 0, 782, 37, 10, -1, 1, 4, 1700, 24, -10, 21, 4, 4512, 12, 16, 21, 5, 0, 20, 25, 0, 813, 4, 724, 8, -3, 5, 0, 4, 536, 8, -5, 5, 0, 4, 4512, 12, 16, 5, 0, 34, 3, 10, -1, 1, 4, 1700, 24, -10, 7, 37, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 10, -1, 1, 4, 3648, 44, -19, 21, 11, 39, 0, 842, 37, 5, 2, 53, 10, -1, 1, 4, 1700, 24, -10, 21, 4, 724, 8, -3, 21, 10, -1, 1, 4, 1700, 24, -10, 21, 4, 536, 8, -5, 21, 10, -1, 1, 4, 1700, 24, -10, 21, 4, 4512, 12, 16, 21, 10, -1, 1, 4, 3372, 24, 20, 21, 4, 3412, 4, 19, 21, 10, -1, 1, 4, 3372, 24, 20, 21, 4, 4696, 8, -18, 21, 10, -1, 1, 4, 3372, 24, 20, 21, 4, 3368, 4, 1, 21, 12, 8, 36, -1, 3, 12, 0, 36, -1, 4, 10, -1, 2, 4, 3588, 12, -11, 21, 5, 0, 25, 0, 961, 10, -1, 3, 27, -1, 2, 37, 10, -1, 3, 27, -1, 4, 37, 15, 0, 0, 1091, 5, 0, 36, -1, 5, 5, 0, 36, -1, 7, 10, -1, 7, 5, 6, 51, 0, 1046, 10, -1, 2, 10, -1, 7, 21, 10, -1, 3, 10, -1, 7, 21, 42, 27, -1, 6, 37, 10, -1, 3, 10, -1, 7, 21, 12, 1, 10, -1, 4, 4, 1292, 28, -16, 21, 9, 37, 10, -1, 6, 12, 1, 4, 1780, 8, -2, 48, 4, 1132, 8, 7, 21, 9, 49, -1, 5, 37, 55, -1, 7, 0, 37, 15, 0, 0, 971, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 12, 1, 10, -1, 4, 4, 1292, 28, -16, 21, 9, 37, 10, -1, 3, 27, -1, 2, 37, 10, -1, 5, 5, 0, 54, 0, 1091, 19, 15, 0, 0, 1111, 4, 1332, 16, 10, 10, -1, 2, 4, 4212, 12, -9, 10, -1, 4, 34, 2, 15, 0, 0, 1111, 6, 5, 1122, 18, 36, -1, 5, 15, 0, 0, 1245, 12, 0, 47, 6, 37, 23, 0, 0, 34, 0, 3, 4, 560, 16, 15, 7, 37, 4, 3556, 16, 9, 4, 4212, 12, -9, 15, 1, 4, 3404, 8, 4, 15, 1, 4, 180, 32, -20, 15, 1, 4, 1348, 16, -11, 15, 1, 34, 4, 4, 576, 24, 19, 15, 0, 4, 4956, 16, 15, 15, 0, 4, 1860, 12, -5, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 4, 1176, 52, -19, 34, 0, 34, 5, 3, 4, 4876, 8, -5, 7, 37, 3, 12, 1, 3, 4, 2756, 24, 17, 21, 4, 900, 12, 7, 21, 9, 3, 4, 2756, 24, 17, 7, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 1244, 6, 5, 1255, 18, 36, -1, 6, 15, 0, 0, 1504, 12, 0, 47, 7, 37, 23, 1, 0, 1, 10, 0, 53, 0, 1302, 10, -1, 1, 12, 1, 10, 0, 53, 4, 1112, 4, 14, 21, 9, 36, -1, 2, 10, -1, 2, 5, 0, 20, 26, 0, 1302, 10, -1, 2, 15, 0, 0, 1503, 12, 0, 10, -1, 1, 4, 2172, 16, 3, 21, 4, 3120, 60, -17, 21, 9, 36, -1, 3, 10, -1, 1, 4, 4208, 4, -6, 21, 11, 39, 0, 1338, 37, 4, 800, 0, 16, 36, -1, 4, 10, -1, 1, 4, 2704, 8, -4, 21, 11, 39, 0, 1358, 37, 4, 800, 0, 16, 36, -1, 5, 10, -1, 1, 4, 432, 8, 4, 21, 11, 39, 0, 1378, 37, 4, 800, 0, 16, 36, -1, 6, 10, -1, 1, 4, 4684, 12, 0, 21, 11, 39, 0, 1398, 37, 4, 800, 0, 16, 36, -1, 7, 10, -1, 1, 4, 3532, 24, 20, 21, 11, 39, 0, 1418, 37, 4, 800, 0, 16, 36, -1, 8, 10, -1, 1, 12, 1, 10, 0, 7, 9, 36, -1, 9, 10, -1, 3, 10, -1, 4, 8, 10, -1, 5, 8, 10, -1, 6, 8, 10, -1, 7, 8, 10, -1, 8, 8, 10, -1, 9, 8, 36, -1, 10, 10, -1, 10, 12, 1, 2, 9, 36, -1, 11, 10, 0, 53, 0, 1496, 10, -1, 11, 10, -1, 1, 12, 2, 10, 0, 53, 4, 4616, 4, -1, 21, 9, 37, 10, -1, 11, 15, 0, 0, 1503, 6, 5, 1514, 18, 36, -1, 7, 15, 0, 0, 1931, 12, 0, 47, 8, 37, 23, 1, 0, 1, 10, -1, 1, 4, 4208, 4, -6, 21, 4, 800, 0, 16, 26, 0, 1560, 4, 1552, 20, -11, 10, -1, 1, 4, 4208, 4, -6, 21, 8, 4, 516, 4, -14, 8, 15, 0, 0, 1930, 10, -1, 1, 4, 884, 16, -9, 48, 4, 424, 8, -4, 21, 25, 0, 1584, 4, 4404, 24, -7, 15, 0, 0, 1930, 4, 800, 0, 16, 36, -1, 2, 5, 0, 36, -1, 3, 10, -1, 1, 4, 820, 20, 10, 21, 0, 1923, 10, -1, 3, 10, 0, 51, 22, 0, 1619, 15, 0, 0, 1923, 5, 0, 36, -1, 4, 5, 0, 36, -1, 5, 10, -1, 1, 4, 820, 20, 10, 21, 4, 1016, 32, -18, 21, 4, 3588, 12, -11, 21, 36, -1, 6, 10, 0, 52, 10, -1, 6, 12, 2, 4, 1780, 8, -2, 48, 4, 4428, 12, -15, 21, 9, 36, -1, 7, 5, 0, 36, -1, 8, 10, -1, 8, 10, -1, 7, 51, 0, 1758, 10, -1, 1, 4, 820, 20, 10, 21, 4, 1016, 32, -18, 21, 10, -1, 8, 21, 36, -1, 9, 10, -1, 9, 4, 1580, 32, -18, 21, 10, -1, 1, 4, 1580, 32, -18, 21, 25, 0, 1749, 10, -1, 9, 10, -1, 1, 25, 0, 1744, 10, -1, 4, 5, 1, 8, 27, -1, 5, 37, 55, -1, 4, 0, 37, 55, -1, 8, 0, 37, 15, 0, 0, 1677, 4, 2704, 8, -4, 12, 1, 10, -1, 1, 4, 1668, 32, -8, 21, 9, 11, 0, 1797, 37, 4, 2704, 8, -4, 12, 1, 10, -1, 1, 4, 2020, 24, 12, 21, 9, 4, 800, 0, 16, 26, 0, 1858, 4, 2780, 4, 14, 12, 0, 10, -1, 1, 4, 1580, 32, -18, 21, 4, 3120, 60, -17, 21, 9, 8, 4, 4912, 16, 10, 8, 4, 2704, 8, -4, 12, 1, 10, -1, 1, 4, 2020, 24, 12, 21, 9, 8, 4, 516, 4, -14, 8, 10, -1, 2, 8, 27, -1, 2, 37, 15, 0, 0, 1901, 4, 2780, 4, 14, 12, 0, 10, -1, 1, 4, 1580, 32, -18, 21, 4, 3120, 60, -17, 21, 9, 8, 4, 4128, 4, 1, 8, 10, -1, 5, 8, 4, 3520, 4, -18, 8, 10, -1, 2, 8, 27, -1, 2, 37, 10, -1, 1, 4, 820, 20, 10, 21, 27, -1, 1, 37, 5, 1, 49, -1, 3, 37, 15, 0, 0, 1596, 10, -1, 2, 15, 0, 0, 1930, 6, 5, 1941, 18, 36, -1, 8, 15, 0, 0, 1963, 12, 0, 47, 9, 37, 23, 2, 0, 1, 2, 10, -1, 1, 10, -1, 2, 30, 15, 0, 0, 1962, 6, 5, 1973, 18, 36, -1, 9, 15, 0, 0, 2126, 12, 0, 47, 10, 37, 23, 1, 0, 1, 10, -1, 1, 12, 1, 10, 0, 6, 9, 36, -1, 2, 10, -1, 2, 12, 1, 10, 0, 63, 4, 1112, 4, 14, 21, 9, 36, -1, 3, 10, -1, 3, 0, 2023, 10, -1, 3, 15, 0, 0, 2125, 10, -1, 1, 4, 4600, 16, 4, 21, 0, 2039, 5, 1, 15, 0, 0, 2041, 5, 0, 10, -1, 1, 4, 4132, 12, 20, 21, 0, 2057, 5, 1, 15, 0, 0, 2059, 5, 0, 10, -1, 1, 4, 3628, 20, -12, 21, 0, 2075, 5, 1, 15, 0, 0, 2077, 5, 0, 10, -1, 1, 12, 1, 10, 0, 11, 9, 10, -1, 1, 12, 1, 10, 0, 10, 9, 12, 5, 36, -1, 4, 10, -1, 4, 10, -1, 2, 12, 2, 10, 0, 63, 4, 4616, 4, -1, 21, 9, 37, 10, -1, 4, 15, 0, 0, 2125, 6, 5, 2136, 18, 36, -1, 10, 15, 0, 0, 2652, 12, 0, 47, 11, 37, 23, 1, 0, 1, 10, -1, 1, 4, 1364, 12, -1, 21, 4, 4592, 8, 11, 21, 0, 2167, 10, 0, 62, 15, 0, 0, 2651, 12, 0, 10, -1, 1, 4, 2172, 16, 3, 21, 4, 3120, 60, -17, 21, 9, 4, 4848, 28, -11, 25, 0, 2197, 10, 0, 56, 15, 0, 0, 2651, 10, -1, 1, 4, 432, 8, 4, 21, 0, 2227, 12, 0, 10, -1, 1, 4, 432, 8, 4, 21, 4, 3120, 60, -17, 21, 9, 15, 0, 0, 2231, 4, 800, 0, 16, 36, -1, 2, 10, -1, 2, 4, 2424, 8, -5, 25, 0, 2255, 10, 0, 54, 15, 0, 0, 2651, 15, 0, 0, 2265, 10, -1, 2, 4, 440, 48, -16, 25, 0, 2276, 10, 0, 55, 15, 0, 0, 2651, 15, 0, 0, 2286, 10, -1, 2, 4, 4440, 32, -18, 25, 0, 2297, 10, 0, 57, 15, 0, 0, 2651, 15, 0, 0, 2307, 10, -1, 2, 4, 1280, 4, -6, 25, 0, 2318, 10, 0, 59, 15, 0, 0, 2651, 15, 0, 0, 2328, 10, -1, 2, 4, 2500, 8, -7, 25, 0, 2339, 10, 0, 60, 15, 0, 0, 2651, 15, 0, 0, 2349, 10, -1, 2, 4, 3604, 24, -20, 25, 0, 2360, 10, 0, 58, 15, 0, 0, 2651, 15, 0, 0, 2364, 15, 0, 0, 2638, 10, -1, 1, 4, 2704, 8, -4, 21, 11, 39, 0, 2381, 37, 4, 800, 0, 16, 4, 2988, 4, -15, 8, 10, -1, 1, 4, 4208, 4, -6, 21, 11, 39, 0, 2403, 37, 4, 800, 0, 16, 8, 4, 2988, 4, -15, 8, 10, -1, 1, 4, 3532, 24, 20, 21, 11, 39, 0, 2426, 37, 4, 800, 0, 16, 8, 4, 2988, 4, -15, 8, 10, -1, 1, 4, 4684, 12, 0, 21, 11, 39, 0, 2449, 37, 4, 800, 0, 16, 8, 36, -1, 3, 12, 0, 10, -1, 3, 4, 3120, 60, -17, 21, 9, 36, -1, 4, 10, 0, 59, 4, 1484, 8, 22, 12, 2, 10, 0, 55, 4, 440, 48, -16, 12, 2, 10, 0, 54, 4, 2424, 8, -5, 12, 2, 12, 3, 36, -1, 5, 5, 0, 36, -1, 6, 10, -1, 5, 4, 3588, 12, -11, 21, 36, -1, 7, 10, -1, 6, 10, -1, 7, 51, 0, 2574, 10, -1, 5, 10, -1, 6, 21, 5, 0, 21, 12, 1, 10, -1, 4, 4, 4928, 12, 4, 21, 9, 5, 1, 53, 26, 0, 2565, 10, -1, 5, 10, -1, 6, 21, 5, 1, 21, 15, 0, 0, 2651, 55, -1, 6, 0, 37, 15, 0, 0, 2515, 10, -1, 3, 12, 1, 4, 1068, 4, -10, 4, 4492, 20, -16, 12, 2, 4, 1104, 8, 2, 48, 17, 4, 4592, 8, 11, 21, 9, 0, 2610, 10, 0, 59, 15, 0, 0, 2651, 10, -1, 2, 4, 3008, 8, 19, 25, 0, 2627, 10, 0, 56, 15, 0, 0, 2630, 10, 0, 61, 15, 0, 0, 2651, 15, 0, 0, 2642, 15, 0, 0, 2364, 4, 3904, 20, 14, 48, 15, 0, 0, 2651, 6, 5, 2662, 18, 36, -1, 11, 15, 0, 0, 2800, 12, 0, 47, 12, 37, 23, 1, 0, 1, 4, 3532, 24, 20, 4, 4144, 12, 16, 4, 2704, 8, -4, 4, 4208, 4, -6, 12, 4, 36, -1, 2, 12, 0, 36, -1, 3, 10, -1, 2, 4, 3588, 12, -11, 21, 36, -1, 4, 5, 0, 36, -1, 5, 10, -1, 5, 10, -1, 4, 51, 0, 2792, 10, -1, 2, 10, -1, 5, 21, 36, -1, 6, 10, -1, 6, 12, 1, 10, -1, 1, 4, 1668, 32, -8, 21, 9, 0, 2770, 10, -1, 6, 12, 1, 10, -1, 1, 4, 2020, 24, 12, 21, 9, 12, 1, 2, 9, 15, 0, 0, 2771, 19, 12, 1, 10, -1, 3, 4, 1292, 28, -16, 21, 9, 37, 55, -1, 5, 0, 37, 15, 0, 0, 2713, 10, -1, 3, 15, 0, 0, 2799, 6, 5, 2810, 18, 36, -1, 12, 15, 0, 0, 2930, 12, 0, 47, 13, 37, 23, 1, 0, 1, 10, -1, 1, 4, 2576, 20, 8, 25, 0, 2840, 10, 0, 64, 15, 0, 0, 2929, 15, 0, 0, 2850, 10, -1, 1, 4, 1056, 12, 1, 25, 0, 2861, 10, 0, 65, 15, 0, 0, 2929, 15, 0, 0, 2871, 10, -1, 1, 4, 3028, 40, -12, 25, 0, 2882, 10, 0, 66, 15, 0, 0, 2929, 15, 0, 0, 2892, 10, -1, 1, 4, 3924, 24, 17, 25, 0, 2903, 10, 0, 67, 15, 0, 0, 2929, 15, 0, 0, 2907, 15, 0, 0, 2916, 19, 15, 0, 0, 2929, 15, 0, 0, 2920, 15, 0, 0, 2907, 4, 3904, 20, 14, 48, 15, 0, 0, 2929, 6, 5, 2940, 18, 36, -1, 13, 15, 0, 0, 3060, 12, 0, 47, 14, 37, 23, 1, 0, 1, 10, -1, 1, 4, 2964, 20, 16, 25, 0, 2970, 10, 0, 68, 15, 0, 0, 3059, 15, 0, 0, 2980, 10, -1, 1, 4, 3756, 12, 10, 25, 0, 2991, 10, 0, 69, 15, 0, 0, 3059, 15, 0, 0, 3001, 10, -1, 1, 4, 4732, 60, -19, 25, 0, 3012, 10, 0, 70, 15, 0, 0, 3059, 15, 0, 0, 3022, 10, -1, 1, 4, 1072, 12, -10, 25, 0, 3033, 10, 0, 71, 15, 0, 0, 3059, 15, 0, 0, 3037, 15, 0, 0, 3046, 19, 15, 0, 0, 3059, 15, 0, 0, 3050, 15, 0, 0, 3037, 4, 3904, 20, 14, 48, 15, 0, 0, 3059, 6, 5, 3070, 18, 36, -1, 14, 15, 0, 0, 3148, 12, 0, 47, 15, 37, 23, 1, 0, 1, 10, -1, 1, 4, 2192, 16, -4, 25, 0, 3100, 10, 0, 72, 15, 0, 0, 3147, 15, 0, 0, 3110, 10, -1, 1, 4, 4072, 8, 0, 25, 0, 3121, 10, 0, 73, 15, 0, 0, 3147, 15, 0, 0, 3125, 15, 0, 0, 3134, 19, 15, 0, 0, 3147, 15, 0, 0, 3138, 15, 0, 0, 3125, 4, 3904, 20, 14, 48, 15, 0, 0, 3147, 6, 5, 3158, 18, 36, -1, 15, 15, 0, 0, 3190, 12, 0, 47, 16, 37, 23, 1, 0, 1, 10, -1, 1, 4, 3396, 8, 8, 25, 0, 3184, 10, 0, 74, 15, 0, 0, 3189, 19, 15, 0, 0, 3189, 6, 5, 3200, 18, 36, -1, 16, 15, 0, 0, 3278, 12, 0, 47, 17, 37, 23, 1, 0, 1, 10, -1, 1, 4, 4200, 8, -6, 25, 0, 3230, 10, 0, 75, 15, 0, 0, 3277, 15, 0, 0, 3240, 10, -1, 1, 4, 4232, 8, 11, 25, 0, 3251, 10, 0, 76, 15, 0, 0, 3277, 15, 0, 0, 3255, 15, 0, 0, 3264, 19, 15, 0, 0, 3277, 15, 0, 0, 3268, 15, 0, 0, 3255, 4, 3904, 20, 14, 48, 15, 0, 0, 3277, 6, 5, 3288, 18, 36, -1, 17, 15, 0, 0, 3408, 12, 0, 47, 18, 37, 23, 1, 0, 1, 10, -1, 1, 4, 4484, 8, 1, 25, 0, 3318, 10, 0, 77, 15, 0, 0, 3407, 15, 0, 0, 3328, 10, -1, 1, 4, 4548, 8, 2, 25, 0, 3339, 10, 0, 78, 15, 0, 0, 3407, 15, 0, 0, 3349, 10, -1, 1, 4, 4296, 16, 6, 25, 0, 3360, 10, 0, 79, 15, 0, 0, 3407, 15, 0, 0, 3370, 10, -1, 1, 4, 2728, 16, 14, 25, 0, 3381, 10, 0, 80, 15, 0, 0, 3407, 15, 0, 0, 3385, 15, 0, 0, 3394, 19, 15, 0, 0, 3407, 15, 0, 0, 3398, 15, 0, 0, 3385, 4, 3904, 20, 14, 48, 15, 0, 0, 3407, 6, 5, 3418, 18, 36, -1, 18, 15, 0, 0, 3517, 12, 0, 47, 19, 37, 23, 1, 0, 1, 10, -1, 1, 4, 4376, 28, 19, 25, 0, 3448, 10, 0, 81, 15, 0, 0, 3516, 15, 0, 0, 3458, 10, -1, 1, 4, 1156, 12, 0, 25, 0, 3469, 10, 0, 82, 15, 0, 0, 3516, 15, 0, 0, 3479, 10, -1, 1, 4, 3736, 20, 7, 25, 0, 3490, 10, 0, 83, 15, 0, 0, 3516, 15, 0, 0, 3494, 15, 0, 0, 3503, 19, 15, 0, 0, 3516, 15, 0, 0, 3507, 15, 0, 0, 3494, 4, 3904, 20, 14, 48, 15, 0, 0, 3516, 6, 5, 3527, 18, 36, -1, 19, 15, 0, 0, 3613, 12, 0, 47, 20, 37, 23, 2, 0, 1, 2, 5, 3544, 18, 15, 0, 0, 3608, 12, 0, 47, 21, 36, -1, 0, 23, 2, 1, 2, 3, 5, 3563, 18, 15, 0, 0, 3603, 12, 0, 47, 22, 36, -1, 0, 23, 1, 1, 2, 10, -1, 2, 12, 1, 10, 20, 2, 9, 10, 21, 2, 12, 1, 10, 20, 1, 9, 12, 2, 10, 21, 3, 9, 15, 0, 0, 3602, 6, 15, 0, 0, 3607, 6, 15, 0, 0, 3612, 6, 5, 3623, 18, 36, -1, 20, 15, 0, 0, 3726, 12, 0, 47, 23, 37, 23, 1, 0, 1, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 10, -1, 1, 4, 952, 8, 16, 21, 12, 1, 10, 0, 6, 9, 10, -1, 1, 4, 2952, 12, -2, 21, 0, 3681, 10, -1, 1, 4, 2952, 12, -2, 21, 15, 0, 0, 3689, 10, -1, 1, 4, 3712, 16, -12, 21, 10, -1, 1, 4, 2088, 24, -10, 21, 0, 3711, 10, -1, 1, 4, 2088, 24, -10, 21, 15, 0, 0, 3719, 10, -1, 1, 4, 4348, 12, 11, 21, 12, 4, 15, 0, 0, 3725, 6, 5, 3736, 18, 36, -1, 21, 15, 0, 0, 3847, 12, 0, 47, 24, 37, 23, 1, 0, 1, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 10, -1, 1, 4, 952, 8, 16, 21, 12, 1, 10, 0, 6, 9, 10, -1, 1, 4, 4156, 44, -20, 21, 10, -1, 1, 4, 2952, 12, -2, 21, 0, 3802, 10, -1, 1, 4, 2952, 12, -2, 21, 15, 0, 0, 3810, 10, -1, 1, 4, 3712, 16, -12, 21, 10, -1, 1, 4, 2088, 24, -10, 21, 0, 3832, 10, -1, 1, 4, 2088, 24, -10, 21, 15, 0, 0, 3840, 10, -1, 1, 4, 4348, 12, 11, 21, 12, 5, 15, 0, 0, 3846, 6, 5, 3857, 18, 36, -1, 22, 15, 0, 0, 4120, 12, 0, 47, 25, 37, 23, 1, 0, 1, 5, 0, 36, -1, 2, 4, 3948, 16, 8, 10, 0, 95, 4, 1376, 12, 3, 10, 0, 94, 4, 164, 16, 17, 10, 0, 93, 4, 264, 12, -1, 10, 0, 92, 34, 4, 36, -1, 3, 4, 676, 12, 10, 10, 0, 100, 4, 1140, 16, -8, 10, 0, 99, 4, 3844, 20, 1, 10, 0, 98, 4, 4720, 12, 14, 10, 0, 97, 4, 4884, 4, 14, 10, 0, 96, 34, 5, 36, -1, 4, 10, -1, 3, 12, 1, 4, 24, 20, -17, 48, 4, 3404, 8, 4, 21, 9, 36, -1, 5, 10, -1, 5, 4, 3588, 12, -11, 21, 36, -1, 6, 5, 0, 36, -1, 7, 10, -1, 7, 10, -1, 6, 51, 0, 4036, 10, -1, 5, 10, -1, 7, 21, 36, -1, 8, 10, -1, 1, 10, -1, 8, 21, 0, 4027, 10, -1, 3, 10, -1, 8, 21, 10, -1, 2, 12, 2, 10, 0, 8, 9, 27, -1, 2, 37, 55, -1, 7, 0, 37, 15, 0, 0, 3979, 10, -1, 4, 10, -1, 1, 4, 2048, 12, -9, 21, 21, 0, 4075, 10, -1, 4, 10, -1, 1, 4, 2048, 12, -9, 21, 21, 10, -1, 2, 12, 2, 10, 0, 8, 9, 27, -1, 2, 37, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 10, -1, 1, 4, 952, 8, 16, 21, 12, 1, 10, 0, 6, 9, 10, -1, 2, 10, -1, 1, 4, 696, 16, 11, 21, 12, 4, 15, 0, 0, 4119, 6, 5, 4130, 18, 36, -1, 23, 15, 0, 0, 4472, 12, 0, 47, 26, 37, 23, 1, 0, 1, 12, 0, 36, -1, 2, 14, 4452, 10, -1, 1, 4, 276, 32, -13, 21, 11, 0, 4174, 37, 10, -1, 1, 4, 276, 32, -13, 21, 4, 3588, 12, -11, 21, 5, 1, 45, 0, 4192, 10, -1, 1, 4, 276, 32, -13, 21, 27, -1, 3, 37, 15, 0, 0, 4234, 10, -1, 1, 4, 1428, 24, 17, 21, 11, 0, 4220, 37, 10, -1, 1, 4, 1428, 24, 17, 21, 4, 3588, 12, -11, 21, 5, 1, 45, 0, 4234, 10, -1, 1, 4, 1428, 24, 17, 21, 27, -1, 3, 37, 10, -1, 3, 0, 4439, 10, -1, 3, 4, 3588, 12, -11, 21, 36, -1, 5, 5, 0, 36, -1, 6, 10, -1, 6, 10, -1, 5, 51, 0, 4388, 10, -1, 3, 10, -1, 6, 21, 12, 1, 29, 4, 2828, 64, -19, 21, 9, 27, -1, 4, 37, 10, -1, 4, 0, 4379, 10, -1, 3, 10, -1, 6, 21, 4, 212, 32, -17, 21, 12, 1, 10, -1, 2, 4, 1292, 28, -16, 21, 9, 37, 10, -1, 4, 4, 3368, 4, 1, 21, 12, 1, 4, 1780, 8, -2, 48, 4, 4704, 12, 16, 21, 9, 12, 1, 10, -1, 2, 4, 1292, 28, -16, 21, 9, 37, 10, -1, 4, 4, 4696, 8, -18, 21, 12, 1, 4, 1780, 8, -2, 48, 4, 4704, 12, 16, 21, 9, 12, 1, 10, -1, 2, 4, 1292, 28, -16, 21, 9, 37, 55, -1, 6, 0, 37, 15, 0, 0, 4255, 10, -1, 1, 4, 952, 8, 16, 21, 12, 1, 10, 0, 6, 9, 12, 1, 10, -1, 2, 4, 1292, 28, -16, 21, 9, 37, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 12, 1, 10, -1, 2, 4, 1292, 28, -16, 21, 9, 37, 10, -1, 2, 15, 0, 0, 4471, 46, 4448, 15, 0, 0, 4462, 36, -1, 7, 10, -1, 2, 15, 0, 0, 4471, 4, 3904, 20, 14, 48, 15, 0, 0, 4471, 6, 5, 4482, 18, 36, -1, 24, 15, 0, 0, 4525, 12, 0, 47, 27, 37, 23, 1, 0, 1, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 10, -1, 1, 4, 952, 8, 16, 21, 12, 1, 10, 0, 6, 9, 12, 2, 15, 0, 0, 4524, 6, 5, 4535, 18, 36, -1, 25, 15, 0, 0, 4822, 12, 0, 47, 28, 37, 23, 1, 0, 1, 10, -1, 1, 4, 952, 8, 16, 21, 36, -1, 2, 10, -1, 1, 4, 432, 8, 4, 21, 4, 4200, 8, -6, 25, 0, 4577, 10, 0, 101, 15, 0, 0, 4580, 10, 0, 102, 36, -1, 3, 10, -1, 2, 4, 0, 12, 6, 21, 11, 39, 0, 4600, 37, 4, 800, 0, 16, 36, -1, 4, 4, 3008, 8, 19, 12, 1, 10, -1, 1, 4, 4556, 36, 5, 21, 4, 12, 12, -3, 21, 9, 36, -1, 5, 5, 0, 36, -1, 6, 10, -1, 3, 10, 0, 102, 25, 0, 4716, 10, -1, 2, 4, 4040, 28, 18, 21, 5, 0, 12, 2, 10, -1, 4, 4, 1724, 8, -3, 21, 9, 10, -1, 5, 8, 10, -1, 2, 4, 4888, 24, 6, 21, 12, 1, 10, -1, 4, 4, 1724, 8, -3, 21, 9, 8, 36, -1, 7, 10, -1, 5, 4, 3588, 12, -11, 21, 10, -1, 7, 4, 3588, 12, -11, 21, 31, 5, 100, 33, 27, -1, 6, 37, 15, 0, 0, 4770, 10, -1, 2, 4, 4888, 24, 6, 21, 10, -1, 2, 4, 4040, 28, 18, 21, 12, 2, 10, -1, 4, 4, 1724, 8, -3, 21, 9, 36, -1, 8, 10, -1, 8, 4, 3588, 12, -11, 21, 10, -1, 4, 4, 3588, 12, -11, 21, 31, 5, 100, 33, 27, -1, 6, 37, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 10, -1, 2, 12, 1, 10, 0, 6, 9, 10, -1, 3, 10, 0, 102, 25, 0, 4808, 5, 1, 53, 15, 0, 0, 4809, 19, 10, -1, 6, 10, -1, 3, 12, 5, 15, 0, 0, 4821, 6, 5, 4832, 18, 36, -1, 26, 15, 0, 0, 5049, 12, 0, 47, 29, 37, 23, 1, 0, 1, 5, 0, 36, -1, 2, 10, -1, 1, 4, 952, 8, 16, 21, 4, 312, 24, -1, 48, 52, 11, 39, 0, 4879, 37, 10, -1, 1, 4, 952, 8, 16, 21, 4, 2616, 40, 16, 48, 52, 0, 4907, 10, -1, 1, 4, 952, 8, 16, 21, 4, 0, 12, 6, 21, 4, 3588, 12, -11, 21, 27, -1, 2, 37, 15, 0, 0, 4962, 10, -1, 1, 4, 952, 8, 16, 21, 4, 488, 28, 15, 48, 52, 11, 0, 4938, 37, 10, -1, 1, 4, 952, 8, 16, 21, 4, 2112, 60, -15, 21, 0, 4962, 10, -1, 1, 4, 952, 8, 16, 21, 4, 4088, 40, -15, 21, 4, 3588, 12, -11, 21, 27, -1, 2, 37, 10, -1, 1, 4, 336, 12, -21, 21, 0, 4989, 10, -1, 1, 4, 336, 12, -21, 21, 4, 3588, 12, -11, 21, 15, 0, 0, 4992, 5, 1, 53, 36, -1, 3, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 10, -1, 1, 4, 952, 8, 16, 21, 12, 1, 10, 0, 6, 9, 10, -1, 1, 4, 952, 8, 16, 21, 12, 1, 10, 0, 9, 9, 10, -1, 3, 10, -1, 2, 12, 5, 15, 0, 0, 5048, 6, 5, 5059, 18, 36, -1, 27, 15, 0, 0, 5311, 12, 0, 47, 30, 37, 23, 1, 0, 1, 10, -1, 1, 4, 432, 8, 4, 21, 4, 3736, 20, 7, 25, 11, 0, 5093, 37, 10, -1, 1, 4, 3264, 36, 19, 21, 0, 5228, 12, 0, 10, -1, 1, 4, 3264, 36, 19, 21, 9, 36, -1, 2, 12, 0, 5, 5118, 18, 15, 0, 0, 5203, 12, 0, 47, 31, 36, -1, 0, 23, 1, 1, 2, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 10, -1, 2, 4, 952, 8, 16, 21, 12, 1, 10, 0, 6, 9, 10, -1, 2, 4, 1732, 48, -15, 21, 10, -1, 2, 4, 1872, 52, -20, 21, 10, -1, 2, 4, 4620, 20, -4, 21, 10, -1, 2, 4, 3712, 16, -12, 21, 10, -1, 2, 4, 4348, 12, 11, 21, 12, 7, 15, 0, 0, 5202, 6, 12, 1, 10, -1, 2, 4, 1320, 12, 16, 21, 9, 4, 3360, 8, 7, 21, 9, 15, 0, 0, 5310, 15, 0, 0, 5301, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 10, -1, 1, 4, 952, 8, 16, 21, 12, 1, 10, 0, 6, 9, 10, -1, 1, 4, 1732, 48, -15, 21, 10, -1, 1, 4, 1872, 52, -20, 21, 10, -1, 1, 4, 4620, 20, -4, 21, 10, -1, 1, 4, 3712, 16, -12, 21, 10, -1, 1, 4, 4348, 12, 11, 21, 12, 7, 15, 0, 0, 5310, 4, 3904, 20, 14, 48, 15, 0, 0, 5310, 6, 5, 5321, 18, 36, -1, 28, 15, 0, 0, 5554, 12, 0, 47, 32, 37, 23, 0, 0, 34, 0, 3, 4, 560, 16, 15, 7, 37, 4, 1860, 12, -5, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 4, 2456, 24, 17, 5, 0, 4, 1944, 20, 19, 34, 0, 4, 1048, 8, -16, 34, 0, 4, 1176, 52, -19, 34, 0, 4, 576, 24, 19, 15, 0, 4, 4956, 16, 15, 15, 0, 34, 7, 3, 4, 4876, 8, -5, 7, 37, 34, 0, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 7, 37, 15, 1, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 10, 0, 105, 7, 37, 15, 1, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 10, 0, 106, 7, 37, 15, 1, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 10, 0, 107, 7, 37, 15, 1, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 10, 0, 108, 7, 37, 15, 1, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 10, 0, 109, 7, 37, 15, 1, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 10, 0, 110, 7, 37, 3, 12, 1, 3, 4, 2756, 24, 17, 21, 4, 900, 12, 7, 21, 9, 3, 4, 2756, 24, 17, 7, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 5553, 6, 5, 5564, 18, 36, -1, 29, 15, 0, 0, 5657, 12, 0, 47, 33, 37, 23, 0, 0, 14, 5639, 4, 1228, 52, -18, 12, 1, 4, 3308, 24, 16, 48, 4, 3964, 64, -14, 21, 9, 36, -1, 1, 10, -1, 1, 4, 3588, 12, -11, 21, 5, 0, 22, 0, 5626, 10, -1, 1, 5, 0, 21, 4, 644, 32, -13, 21, 15, 0, 0, 5656, 15, 0, 0, 5633, 5, 1, 53, 15, 0, 0, 5656, 46, 5635, 15, 0, 0, 5647, 36, -1, 2, 19, 15, 0, 0, 5656, 4, 3904, 20, 14, 48, 15, 0, 0, 5656, 6, 5, 5667, 18, 36, -1, 30, 15, 0, 0, 5720, 12, 0, 47, 34, 37, 23, 0, 0, 14, 5702, 4, 1388, 40, -18, 48, 4, 696, 16, 11, 21, 4, 3188, 12, 9, 21, 15, 0, 0, 5719, 46, 5698, 15, 0, 0, 5710, 36, -1, 1, 19, 15, 0, 0, 5719, 4, 3904, 20, 14, 48, 15, 0, 0, 5719, 6, 5, 5730, 18, 36, -1, 31, 15, 0, 0, 5783, 12, 0, 47, 35, 37, 23, 0, 0, 14, 5765, 4, 884, 16, -9, 48, 4, 696, 16, 11, 21, 4, 3188, 12, 9, 21, 15, 0, 0, 5782, 46, 5761, 15, 0, 0, 5773, 36, -1, 1, 19, 15, 0, 0, 5782, 4, 3904, 20, 14, 48, 15, 0, 0, 5782, 6, 5, 5793, 18, 36, -1, 32, 15, 0, 0, 5842, 12, 0, 47, 36, 37, 23, 0, 0, 14, 5824, 12, 0, 10, 0, 111, 4, 12, 12, -3, 21, 9, 15, 0, 0, 5841, 46, 5820, 15, 0, 0, 5832, 36, -1, 1, 19, 15, 0, 0, 5841, 4, 3904, 20, 14, 48, 15, 0, 0, 5841, 6, 5, 5852, 18, 36, -1, 33, 15, 0, 0, 5901, 12, 0, 47, 37, 37, 23, 0, 0, 14, 5883, 12, 0, 10, 0, 50, 4, 12, 12, -3, 21, 9, 15, 0, 0, 5900, 46, 5879, 15, 0, 0, 5891, 36, -1, 1, 19, 15, 0, 0, 5900, 4, 3904, 20, 14, 48, 15, 0, 0, 5900, 6, 5, 5911, 18, 36, -1, 34, 15, 0, 0, 6121, 12, 0, 47, 38, 37, 23, 1, 0, 1, 14, 6108, 10, -1, 1, 4, 336, 12, -21, 21, 36, -1, 2, 10, -1, 2, 5, 0, 20, 26, 11, 0, 5956, 37, 10, -1, 2, 4, 2612, 4, 10, 21, 5, 0, 20, 26, 0, 6102, 10, -1, 2, 4, 2612, 4, 10, 21, 4, 2080, 8, -19, 25, 0, 6010, 10, -1, 1, 4, 1652, 16, 14, 21, 10, -1, 1, 4, 2508, 8, -3, 21, 12, 2, 12, 1, 10, 0, 114, 5, 0, 21, 4, 1292, 28, -16, 21, 9, 37, 15, 0, 0, 6102, 10, -1, 2, 4, 2612, 4, 10, 21, 4, 4472, 4, 15, 25, 0, 6054, 10, -1, 1, 4, 1652, 16, 14, 21, 10, -1, 1, 4, 2508, 8, -3, 21, 12, 2, 10, 0, 114, 5, 1, 7, 37, 15, 0, 0, 6102, 10, -1, 2, 4, 2612, 4, 10, 21, 4, 4480, 4, -14, 25, 0, 6102, 10, -1, 2, 4, 2080, 8, -19, 21, 10, -1, 2, 4, 4680, 4, 12, 21, 12, 2, 12, 1, 10, 0, 114, 5, 2, 21, 4, 1292, 28, -16, 21, 9, 37, 46, 6104, 15, 0, 0, 6111, 36, -1, 3, 4, 3904, 20, 14, 48, 15, 0, 0, 6120, 6, 5, 6131, 18, 36, -1, 35, 15, 0, 0, 6294, 12, 0, 47, 39, 37, 23, 2, 0, 1, 2, 14, 6281, 10, -1, 1, 4, 336, 12, -21, 21, 36, -1, 3, 10, -1, 3, 5, 0, 20, 26, 11, 0, 6177, 37, 10, -1, 3, 4, 2612, 4, 10, 21, 5, 0, 20, 26, 0, 6275, 10, -1, 3, 4, 2612, 4, 10, 21, 4, 4224, 8, 18, 25, 0, 6275, 12, 0, 10, 0, 36, 9, 37, 4, 4068, 4, -15, 4, 2080, 8, -19, 10, 0, 112, 12, 1, 4, 4028, 12, -15, 48, 4, 960, 12, -1, 21, 9, 12, 1, 10, 0, 37, 9, 4, 4680, 4, 12, 10, -1, 2, 4, 2612, 4, 10, 4, 4480, 4, -14, 4, 2508, 8, -3, 4, 3572, 16, 13, 34, 4, 12, 2, 4, 1388, 40, -18, 48, 4, 916, 36, -19, 21, 4, 3068, 20, 17, 21, 9, 37, 46, 6277, 15, 0, 0, 6284, 36, -1, 4, 4, 3904, 20, 14, 48, 15, 0, 0, 6293, 6, 5, 6304, 18, 36, -1, 36, 15, 0, 0, 6383, 12, 0, 47, 40, 37, 23, 0, 0, 5, 0, 36, -1, 1, 10, -1, 1, 10, 0, 113, 4, 3588, 12, -11, 21, 51, 0, 6373, 10, 0, 113, 10, -1, 1, 21, 16, 4, 244, 16, -10, 25, 0, 6364, 12, 0, 10, 0, 113, 10, -1, 1, 21, 9, 10, 0, 112, 10, -1, 1, 7, 37, 55, -1, 1, 0, 37, 15, 0, 0, 6317, 4, 3904, 20, 14, 48, 15, 0, 0, 6382, 6, 5, 6393, 18, 36, -1, 37, 15, 0, 0, 6410, 12, 0, 47, 41, 37, 23, 1, 0, 1, 10, -1, 1, 15, 0, 0, 6409, 6, 5, 6420, 18, 36, -1, 38, 15, 0, 0, 6953, 12, 0, 47, 42, 37, 23, 0, 0, 14, 6893, 12, 0, 10, 0, 36, 9, 37, 5, 0, 36, -1, 1, 10, -1, 1, 10, 0, 114, 5, 0, 21, 4, 3588, 12, -11, 21, 51, 0, 6521, 10, 0, 114, 5, 0, 21, 10, -1, 1, 21, 5, 1, 21, 4, 2612, 4, 10, 4, 4224, 8, 18, 4, 2508, 8, -3, 4, 3572, 16, 13, 34, 2, 12, 2, 10, 0, 114, 5, 0, 21, 10, -1, 1, 21, 5, 0, 21, 4, 3068, 20, 17, 21, 9, 37, 55, -1, 1, 0, 37, 15, 0, 0, 6442, 10, 0, 112, 12, 1, 4, 4028, 12, -15, 48, 4, 960, 12, -1, 21, 9, 12, 1, 10, 0, 37, 9, 5, 0, 12, 2, 12, 1, 10, 0, 114, 5, 2, 21, 4, 1292, 28, -16, 21, 9, 37, 5, 6569, 18, 15, 0, 0, 6875, 12, 0, 47, 43, 36, -1, 0, 23, 1, 1, 2, 5, 6590, 18, 36, -1, 3, 15, 0, 0, 6856, 12, 0, 47, 44, 37, 23, 1, 0, 1, 10, 0, 114, 5, 1, 21, 36, -1, 2, 10, 0, 114, 5, 2, 21, 36, -1, 3, 10, -1, 2, 5, 0, 20, 25, 11, 39, 0, 6636, 37, 10, -1, 3, 5, 0, 20, 25, 11, 39, 0, 6652, 37, 10, -1, 3, 4, 3588, 12, -11, 21, 5, 3, 51, 11, 0, 6662, 37, 10, -1, 1, 5, 30, 51, 0, 6734, 10, -1, 1, 5, 10, 51, 0, 6678, 5, 1, 15, 0, 0, 6680, 5, 3, 36, -1, 4, 10, -1, 4, 5, 6693, 18, 15, 0, 0, 6721, 12, 0, 47, 45, 36, -1, 0, 23, 0, 1, 10, 44, 1, 10, 44, 4, 8, 12, 1, 10, 43, 3, 9, 15, 0, 0, 6720, 6, 12, 2, 4, 2596, 16, -5, 48, 9, 37, 15, 0, 0, 6846, 10, -1, 2, 5, 0, 20, 26, 11, 0, 6756, 37, 10, -1, 2, 4, 3588, 12, -11, 21, 5, 2, 25, 0, 6823, 4, 1856, 4, -4, 10, -1, 3, 12, 1, 4, 4028, 12, -15, 48, 4, 960, 12, -1, 21, 9, 4, 2612, 4, 10, 4, 308, 4, -5, 4, 2508, 8, -3, 4, 3572, 16, 13, 34, 3, 36, -1, 5, 10, -1, 2, 5, 1, 21, 10, -1, 5, 12, 2, 10, -1, 2, 5, 0, 21, 4, 3068, 20, 17, 21, 9, 37, 12, 0, 10, 0, 114, 5, 2, 7, 37, 5, 0, 10, 43, 2, 12, 2, 4, 2596, 16, -5, 48, 9, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 6855, 6, 5, 0, 12, 1, 10, -1, 3, 9, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 6874, 6, 12, 1, 4, 2932, 20, 18, 48, 17, 15, 0, 0, 6952, 46, 6889, 15, 0, 0, 6943, 36, -1, 2, 5, 6903, 18, 15, 0, 0, 6931, 12, 0, 47, 46, 36, -1, 0, 23, 1, 1, 2, 12, 0, 10, -1, 2, 9, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 6930, 6, 12, 1, 4, 2932, 20, 18, 48, 17, 15, 0, 0, 6952, 4, 3904, 20, 14, 48, 15, 0, 0, 6952, 6, 5, 6963, 18, 36, -1, 39, 15, 0, 0, 7204, 12, 0, 47, 47, 37, 23, 1, 0, 1, 10, -1, 1, 12, 1, 10, 0, 115, 4, 4928, 12, 4, 21, 9, 5, 1, 53, 26, 0, 6997, 50, 15, 0, 0, 7203, 10, -1, 1, 12, 1, 10, 0, 115, 4, 1292, 28, -16, 21, 9, 37, 10, -1, 1, 5, 0, 25, 0, 7045, 10, 0, 34, 4, 2656, 28, -16, 12, 2, 4, 1388, 40, -18, 48, 4, 1964, 36, 5, 21, 9, 37, 15, 0, 0, 7194, 5, 7052, 18, 15, 0, 0, 7086, 12, 0, 47, 48, 36, -1, 0, 23, 1, 1, 2, 10, 47, 1, 10, -1, 2, 12, 2, 10, 0, 35, 9, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 7085, 6, 4, 2656, 28, -16, 12, 2, 4, 1388, 40, -18, 48, 4, 1964, 36, 5, 21, 9, 37, 4, 4068, 4, -15, 4, 2612, 4, 10, 4, 2080, 8, -19, 4, 2508, 8, -3, 4, 3572, 16, 13, 34, 2, 12, 2, 4, 1388, 40, -18, 48, 4, 916, 36, -19, 21, 4, 3068, 20, 17, 21, 9, 37, 10, -1, 1, 5, 2, 25, 0, 7194, 4, 4068, 4, -15, 4, 2612, 4, 10, 4, 4472, 4, 15, 4, 2508, 8, -3, 4, 3572, 16, 13, 34, 2, 12, 2, 4, 1388, 40, -18, 48, 4, 916, 36, -19, 21, 4, 3068, 20, 17, 21, 9, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 7203, 6, 4, 840, 8, -3, 4, 2060, 20, -5, 5, 181, 4, 2692, 12, 0, 5, 180, 34, 2, 4, 4940, 16, -6, 4, 2e3, 12, 14, 5, 174, 4, 2992, 16, 9, 5, 173, 4, 368, 8, -8, 5, 172, 4, 1168, 8, 11, 5, 171, 4, 3524, 8, 2, 5, 170, 34, 5, 4, 3256, 8, 16, 4, 3016, 12, 12, 5, 165, 4, 4524, 24, 0, 5, 164, 4, 1644, 8, -5, 5, 162, 4, 624, 20, -16, 5, 161, 4, 528, 8, 7, 5, 160, 34, 5, 4, 1924, 20, 9, 4, 2044, 4, -1, 5, 152, 4, 792, 8, -8, 5, 151, 4, 3884, 8, 21, 5, 150, 34, 3, 4, 3416, 12, -8, 4, 912, 4, 14, 5, 140, 34, 1, 4, 780, 12, 2, 4, 3200, 20, -15, 5, 131, 4, 3088, 8, 2, 5, 130, 34, 2, 4, 112, 8, 9, 4, 3300, 8, -16, 5, 121, 4, 3728, 8, 10, 5, 120, 34, 2, 4, 4668, 12, -7, 4, 3200, 20, -15, 5, 113, 4, 3088, 8, 2, 5, 112, 4, 3300, 8, -16, 5, 111, 4, 3728, 8, 10, 5, 110, 34, 4, 4, 712, 12, 17, 4, 3088, 8, 2, 5, 102, 4, 1284, 8, -13, 5, 101, 4, 3692, 20, 22, 5, 100, 34, 3, 34, 9, 36, -1, 40, 4, 3768, 8, 20, 10, -1, 40, 4, 840, 8, -3, 21, 4, 2060, 20, -5, 21, 4, 848, 4, -3, 10, -1, 40, 4, 840, 8, -3, 21, 4, 2692, 12, 0, 21, 4, 1572, 8, 9, 10, -1, 40, 4, 4940, 16, -6, 21, 4, 2e3, 12, 14, 21, 4, 4792, 24, -21, 10, -1, 40, 4, 4940, 16, -6, 21, 4, 2992, 16, 9, 21, 4, 3864, 8, 18, 10, -1, 40, 4, 4940, 16, -6, 21, 4, 368, 8, -8, 21, 4, 3500, 20, -20, 10, -1, 40, 4, 4940, 16, -6, 21, 4, 1168, 8, 11, 21, 4, 2432, 8, -7, 10, -1, 40, 4, 4940, 16, -6, 21, 4, 3524, 8, 2, 21, 4, 2188, 4, 2, 10, -1, 40, 4, 3416, 12, -8, 21, 4, 912, 4, 14, 21, 4, 732, 8, -5, 10, -1, 40, 4, 3256, 8, 16, 21, 4, 3016, 12, 12, 21, 4, 520, 8, 8, 10, -1, 40, 4, 3256, 8, 16, 21, 4, 4524, 24, 0, 21, 4, 544, 16, -20, 10, -1, 40, 4, 3256, 8, 16, 21, 4, 2480, 20, -13, 21, 4, 3600, 4, -2, 10, -1, 40, 4, 3256, 8, 16, 21, 4, 1644, 8, -5, 21, 4, 2984, 4, 14, 10, -1, 40, 4, 3256, 8, 16, 21, 4, 624, 20, -16, 21, 4, 2684, 8, 12, 10, -1, 40, 4, 1924, 20, 9, 21, 4, 2044, 4, -1, 21, 4, 3488, 12, -16, 10, -1, 40, 4, 1924, 20, 9, 21, 4, 792, 8, -8, 21, 4, 3180, 8, -10, 10, -1, 40, 4, 1924, 20, 9, 21, 4, 3884, 8, 21, 21, 34, 16, 36, -1, 41, 4, 3028, 40, -12, 10, -1, 40, 4, 712, 12, 17, 21, 4, 3088, 8, 2, 21, 4, 1056, 12, 1, 10, -1, 40, 4, 712, 12, 17, 21, 4, 1284, 8, -13, 21, 4, 2576, 20, 8, 10, -1, 40, 4, 712, 12, 17, 21, 4, 3692, 20, 22, 21, 34, 3, 36, -1, 42, 4, 4732, 60, -19, 10, -1, 40, 4, 4668, 12, -7, 21, 4, 3088, 8, 2, 21, 4, 3756, 12, 10, 10, -1, 40, 4, 4668, 12, -7, 21, 4, 3300, 8, -16, 21, 4, 2964, 20, 16, 10, -1, 40, 4, 4668, 12, -7, 21, 4, 3728, 8, 10, 21, 34, 3, 36, -1, 43, 4, 3736, 20, 7, 10, -1, 40, 4, 780, 12, 2, 21, 4, 3088, 8, 2, 21, 34, 1, 36, -1, 44, 4, 4072, 8, 0, 10, -1, 40, 4, 112, 8, 9, 21, 4, 3300, 8, -16, 21, 4, 2192, 16, -4, 10, -1, 40, 4, 112, 8, 9, 21, 4, 3728, 8, 10, 21, 34, 2, 36, -1, 45, 4, 2896, 36, -15, 10, -1, 40, 4, 3256, 8, 16, 21, 4, 528, 8, 7, 21, 34, 1, 36, -1, 46, 4, 740, 40, -15, 5, 7908, 18, 15, 0, 0, 7948, 12, 0, 47, 49, 36, -1, 0, 23, 1, 1, 2, 10, -1, 2, 10, 0, 41, 40, 39, 0, 7936, 10, -1, 2, 15, 0, 0, 7947, 10, 0, 41, 10, -1, 2, 21, 15, 0, 0, 7947, 6, 4, 4280, 16, -12, 5, 7959, 18, 15, 0, 0, 8088, 12, 0, 47, 50, 36, -1, 0, 23, 2, 1, 2, 3, 10, 0, 46, 10, -1, 2, 21, 36, -1, 4, 19, 36, -1, 5, 12, 0, 36, -1, 6, 5, 7997, 18, 15, 0, 0, 8083, 12, 0, 47, 51, 36, -1, 0, 23, 1, 1, 2, 10, 50, 6, 10, -1, 2, 12, 2, 10, 0, 4, 9, 27, 50, 5, 37, 10, 50, 5, 19, 25, 0, 8036, 50, 15, 0, 0, 8082, 10, 50, 5, 4, 1332, 16, 10, 21, 27, 50, 6, 37, 10, 50, 5, 4, 4212, 12, -9, 21, 27, 50, 5, 37, 10, 50, 5, 10, 50, 4, 12, 2, 10, 50, 3, 9, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 8082, 6, 15, 0, 0, 8087, 6, 4, 2744, 12, 6, 5, 8099, 18, 15, 0, 0, 8184, 12, 0, 47, 52, 36, -1, 0, 23, 2, 1, 2, 3, 10, 0, 45, 10, -1, 2, 21, 36, -1, 4, 19, 36, -1, 5, 5, 8132, 18, 15, 0, 0, 8179, 12, 0, 47, 53, 36, -1, 0, 23, 1, 1, 2, 10, -1, 2, 12, 1, 10, 0, 2, 9, 27, 52, 5, 37, 10, 52, 5, 10, 52, 4, 12, 2, 10, 52, 3, 9, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 8178, 6, 15, 0, 0, 8183, 6, 4, 180, 32, -20, 5, 8195, 18, 15, 0, 0, 8280, 12, 0, 47, 54, 36, -1, 0, 23, 2, 1, 2, 3, 10, 0, 42, 10, -1, 2, 21, 36, -1, 4, 19, 36, -1, 5, 5, 8228, 18, 15, 0, 0, 8275, 12, 0, 47, 55, 36, -1, 0, 23, 1, 1, 2, 10, -1, 2, 12, 1, 10, 0, 3, 9, 27, 54, 5, 37, 10, 54, 5, 10, 54, 4, 12, 2, 10, 54, 3, 9, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 8274, 6, 15, 0, 0, 8279, 6, 4, 3736, 20, 7, 5, 8291, 18, 15, 0, 0, 8408, 12, 0, 47, 56, 36, -1, 0, 23, 2, 1, 2, 3, 10, 0, 44, 10, -1, 2, 21, 36, -1, 4, 19, 36, -1, 5, 5, 8324, 18, 15, 0, 0, 8403, 12, 0, 47, 57, 36, -1, 0, 23, 1, 1, 2, 10, -1, 2, 12, 1, 10, 0, 1, 9, 27, 56, 5, 37, 5, 0, 36, -1, 3, 10, -1, 3, 10, 56, 5, 4, 3588, 12, -11, 21, 51, 0, 8393, 10, 56, 5, 10, -1, 3, 21, 10, 56, 4, 12, 2, 10, 56, 3, 9, 37, 55, -1, 3, 0, 37, 15, 0, 0, 8353, 4, 3904, 20, 14, 48, 15, 0, 0, 8402, 6, 15, 0, 0, 8407, 6, 4, 1348, 16, -11, 5, 8419, 18, 15, 0, 0, 8504, 12, 0, 47, 58, 36, -1, 0, 23, 2, 1, 2, 3, 10, 0, 43, 10, -1, 2, 21, 36, -1, 4, 19, 36, -1, 5, 5, 8452, 18, 15, 0, 0, 8499, 12, 0, 47, 59, 36, -1, 0, 23, 1, 1, 2, 10, -1, 2, 12, 1, 10, 0, 0, 9, 27, 58, 5, 37, 10, 58, 5, 10, 58, 4, 12, 2, 10, 58, 3, 9, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 8498, 6, 15, 0, 0, 8503, 6, 34, 6, 36, -1, 47, 5, 16, 36, -1, 48, 5, 15, 5, 1e3, 33, 36, -1, 49, 5, 8529, 18, 15, 0, 0, 9288, 12, 0, 47, 60, 36, -1, 0, 23, 1, 1, 2, 10, -1, 2, 11, 39, 0, 8550, 37, 34, 0, 27, -1, 2, 37, 4, 4212, 12, -9, 10, -1, 2, 4, 4280, 16, -12, 21, 15, 0, 26, 4, 180, 32, -20, 10, -1, 2, 4, 180, 32, -20, 21, 15, 0, 26, 4, 3404, 8, 4, 10, -1, 2, 4, 3404, 8, 4, 21, 15, 0, 26, 4, 60, 12, -8, 10, -1, 2, 4, 60, 12, -8, 21, 15, 0, 26, 34, 4, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 7, 37, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 3, 4, 4876, 8, -5, 21, 4, 3104, 16, -8, 7, 37, 3, 4, 4876, 8, -5, 21, 4, 3104, 16, -8, 21, 3, 4, 560, 16, 15, 21, 4, 3180, 8, -10, 12, 1, 10, 0, 47, 4, 740, 40, -15, 21, 9, 7, 37, 3, 4, 4876, 8, -5, 21, 4, 576, 24, 19, 21, 15, 0, 25, 0, 9264, 4, 884, 16, -9, 48, 4, 424, 8, -4, 21, 12, 1, 44, 17, 36, -1, 3, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 4, 60, 12, -8, 21, 0, 8894, 15, 1, 3, 4, 2756, 24, 17, 21, 4, 2964, 20, 16, 12, 2, 10, 0, 47, 4, 1348, 16, -11, 21, 9, 4, 2964, 20, 16, 12, 3, 10, -1, 3, 4, 1964, 36, 5, 21, 9, 37, 15, 1, 3, 4, 2756, 24, 17, 21, 4, 4732, 60, -19, 12, 2, 10, 0, 47, 4, 1348, 16, -11, 21, 9, 4, 4732, 60, -19, 12, 3, 10, -1, 3, 4, 1964, 36, 5, 21, 9, 37, 15, 1, 3, 4, 2756, 24, 17, 21, 4, 3756, 12, 10, 12, 2, 10, 0, 47, 4, 1348, 16, -11, 21, 9, 4, 3756, 12, 10, 12, 3, 10, -1, 3, 4, 1964, 36, 5, 21, 9, 37, 15, 1, 3, 4, 2756, 24, 17, 21, 4, 3736, 20, 7, 12, 2, 10, 0, 47, 4, 3736, 20, 7, 21, 9, 4, 3736, 20, 7, 12, 3, 10, -1, 3, 4, 1964, 36, 5, 21, 9, 37, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 4, 3404, 8, 4, 21, 15, 1, 25, 0, 8993, 15, 1, 3, 4, 2756, 24, 17, 21, 4, 4072, 8, 0, 12, 2, 10, 0, 47, 4, 2744, 12, 6, 21, 9, 4, 4072, 8, 0, 12, 3, 10, -1, 3, 4, 1964, 36, 5, 21, 9, 37, 15, 1, 3, 4, 2756, 24, 17, 21, 4, 2192, 16, -4, 12, 2, 10, 0, 47, 4, 2744, 12, 6, 21, 9, 4, 2192, 16, -4, 12, 3, 10, -1, 3, 4, 1964, 36, 5, 21, 9, 37, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 4, 180, 32, -20, 21, 11, 0, 9044, 37, 4, 884, 16, -9, 48, 4, 424, 8, -4, 21, 4, 2576, 20, 8, 12, 2, 35, 4, 120, 44, -21, 21, 4, 2440, 16, 14, 21, 9, 15, 1, 25, 0, 9163, 15, 1, 3, 4, 2756, 24, 17, 21, 4, 2576, 20, 8, 12, 2, 10, 0, 47, 4, 180, 32, -20, 21, 9, 4, 2576, 20, 8, 12, 3, 10, -1, 3, 4, 1964, 36, 5, 21, 9, 37, 15, 1, 3, 4, 2756, 24, 17, 21, 4, 3028, 40, -12, 12, 2, 10, 0, 47, 4, 180, 32, -20, 21, 9, 4, 3028, 40, -12, 12, 3, 10, -1, 3, 4, 1964, 36, 5, 21, 9, 37, 15, 1, 3, 4, 2756, 24, 17, 21, 4, 1056, 12, 1, 12, 2, 10, 0, 47, 4, 180, 32, -20, 21, 9, 4, 1056, 12, 1, 12, 3, 10, -1, 3, 4, 1964, 36, 5, 21, 9, 37, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 4, 4212, 12, -9, 21, 11, 0, 9209, 37, 4, 1388, 40, -18, 48, 4, 2896, 36, -15, 12, 2, 35, 4, 120, 44, -21, 21, 4, 2440, 16, 14, 21, 9, 15, 1, 25, 0, 9250, 15, 1, 3, 4, 2756, 24, 17, 21, 4, 2896, 36, -15, 12, 2, 10, 0, 47, 4, 4280, 16, -12, 21, 9, 4, 2896, 36, -15, 12, 3, 10, -1, 3, 4, 1964, 36, 5, 21, 9, 37, 15, 1, 3, 4, 4876, 8, -5, 21, 4, 576, 24, 19, 7, 37, 15, 1, 3, 4, 4876, 8, -5, 21, 4, 4956, 16, 15, 7, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 9287, 6, 10, -1, 5, 4, 3776, 68, -20, 21, 4, 3556, 16, 9, 7, 37, 5, 9309, 18, 15, 0, 0, 9343, 12, 0, 47, 61, 36, -1, 0, 23, 0, 1, 15, 0, 3, 4, 4876, 8, -5, 21, 4, 4956, 16, 15, 7, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 9342, 6, 10, -1, 5, 4, 3776, 68, -20, 21, 4, 3332, 8, 9, 7, 37, 5, 9364, 18, 15, 0, 0, 9390, 12, 0, 47, 62, 36, -1, 0, 23, 0, 1, 3, 4, 4876, 8, -5, 21, 4, 1860, 12, -5, 21, 15, 0, 0, 9389, 6, 10, -1, 5, 4, 3776, 68, -20, 21, 4, 600, 24, -19, 7, 37, 5, 9411, 18, 15, 0, 0, 9663, 12, 0, 47, 63, 36, -1, 0, 23, 0, 1, 3, 4, 4876, 8, -5, 21, 4, 1176, 52, -19, 21, 12, 1, 4, 24, 20, -17, 48, 4, 3404, 8, 4, 21, 9, 36, -1, 2, 10, -1, 2, 4, 3588, 12, -11, 21, 36, -1, 3, 5, 0, 36, -1, 4, 10, -1, 4, 10, -1, 3, 51, 0, 9652, 10, -1, 2, 10, -1, 4, 21, 36, -1, 5, 12, 0, 3, 4, 4876, 8, -5, 21, 4, 1176, 52, -19, 21, 10, -1, 5, 21, 4, 12, 12, -3, 21, 9, 3, 4, 560, 16, 15, 21, 10, -1, 5, 7, 37, 10, -1, 5, 10, 0, 40, 4, 4668, 12, -7, 21, 4, 3088, 8, 2, 21, 13, 0, 9580, 12, 0, 3, 4, 4876, 8, -5, 21, 4, 1176, 52, -19, 21, 10, -1, 5, 21, 4, 1612, 32, 18, 21, 9, 3, 4, 560, 16, 15, 21, 10, 0, 40, 4, 4668, 12, -7, 21, 4, 3200, 20, -15, 21, 7, 37, 10, -1, 5, 10, 0, 40, 4, 780, 12, 2, 21, 4, 3088, 8, 2, 21, 13, 0, 9643, 12, 0, 3, 4, 4876, 8, -5, 21, 4, 1176, 52, -19, 21, 10, -1, 5, 21, 4, 1612, 32, 18, 21, 9, 3, 4, 560, 16, 15, 21, 10, 0, 40, 4, 780, 12, 2, 21, 4, 3200, 20, -15, 21, 7, 37, 55, -1, 4, 0, 37, 15, 0, 0, 9464, 3, 4, 560, 16, 15, 21, 15, 0, 0, 9662, 6, 10, -1, 5, 4, 3776, 68, -20, 21, 4, 12, 12, -3, 7, 37, 5, 9684, 18, 15, 0, 0, 9737, 12, 0, 47, 64, 36, -1, 0, 23, 2, 1, 2, 3, 10, -1, 2, 12, 1, 10, 0, 47, 4, 740, 40, -15, 21, 9, 36, -1, 4, 10, -1, 3, 3, 4, 560, 16, 15, 21, 10, -1, 4, 7, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 9736, 6, 10, -1, 5, 4, 3776, 68, -20, 21, 4, 3460, 28, -12, 7, 37, 5, 9758, 18, 15, 0, 0, 9801, 12, 0, 47, 65, 36, -1, 0, 23, 0, 1, 34, 0, 3, 4, 560, 16, 15, 7, 37, 34, 0, 3, 4, 4876, 8, -5, 21, 4, 1176, 52, -19, 7, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 9800, 6, 10, -1, 5, 4, 3776, 68, -20, 21, 4, 4816, 20, 20, 7, 37, 5, 9822, 18, 15, 0, 0, 9860, 12, 0, 47, 66, 36, -1, 0, 23, 2, 1, 2, 3, 10, -1, 3, 10, -1, 2, 12, 2, 3, 4, 2756, 24, 17, 21, 9, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 9859, 6, 10, -1, 5, 4, 3776, 68, -20, 21, 4, 2528, 48, -16, 7, 37, 5, 9881, 18, 15, 0, 0, 10153, 12, 0, 47, 67, 36, -1, 0, 23, 2, 1, 2, 3, 3, 4, 4876, 8, -5, 21, 4, 4956, 16, 15, 21, 15, 0, 25, 0, 9914, 50, 15, 0, 0, 10152, 14, 10123, 10, -1, 2, 12, 1, 4, 688, 8, 2, 48, 9, 0, 9947, 10, -1, 2, 12, 1, 10, 0, 47, 4, 740, 40, -15, 21, 9, 27, -1, 2, 37, 5, 10, 10, -1, 2, 12, 2, 4, 44, 16, 16, 48, 9, 27, -1, 2, 37, 10, -1, 3, 4, 3588, 12, -11, 21, 5, 1, 42, 36, -1, 4, 10, -1, 3, 10, -1, 4, 21, 3, 4, 4876, 8, -5, 21, 4, 3104, 16, -8, 21, 42, 36, -1, 5, 3, 4, 4876, 8, -5, 21, 4, 1176, 52, -19, 21, 10, -1, 2, 21, 39, 0, 10060, 3, 4, 4876, 8, -5, 21, 4, 3104, 16, -8, 21, 10, 0, 49, 10, 0, 48, 12, 3, 28, 4, 2796, 32, -15, 21, 17, 3, 4, 4876, 8, -5, 21, 4, 1176, 52, -19, 21, 10, -1, 2, 7, 37, 10, -1, 3, 10, -1, 4, 21, 3, 4, 4876, 8, -5, 21, 4, 3104, 16, -8, 21, 42, 10, -1, 3, 10, -1, 4, 7, 37, 10, -1, 3, 10, -1, 5, 12, 2, 3, 4, 4876, 8, -5, 21, 4, 1176, 52, -19, 21, 10, -1, 2, 21, 4, 1292, 28, -16, 21, 9, 37, 46, 10119, 15, 0, 0, 10143, 36, -1, 6, 10, -1, 6, 4, 4212, 12, -9, 12, 2, 28, 4, 1084, 20, 14, 21, 9, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 10152, 6, 10, -1, 5, 4, 3776, 68, -20, 21, 4, 2756, 24, 17, 7, 37, 12, 0, 10, -1, 5, 17, 36, -1, 50, 5, 1, 36, -1, 51, 5, 2, 36, -1, 52, 4, 3340, 20, 16, 48, 16, 4, 3904, 20, 14, 26, 0, 10211, 12, 0, 4, 3340, 20, 16, 48, 17, 15, 0, 0, 10212, 19, 36, -1, 53, 5, 0, 36, -1, 54, 5, 1, 36, -1, 55, 5, 2, 36, -1, 56, 5, 3, 36, -1, 57, 5, 4, 36, -1, 58, 5, 5, 36, -1, 59, 5, 6, 36, -1, 60, 5, 7, 36, -1, 61, 5, 8, 36, -1, 62, 12, 0, 5, 10269, 18, 15, 0, 0, 10369, 12, 0, 47, 68, 36, -1, 0, 23, 0, 1, 34, 0, 36, -1, 2, 4, 4616, 4, -1, 5, 10295, 18, 15, 0, 0, 10328, 12, 0, 47, 69, 36, -1, 0, 23, 2, 1, 2, 3, 10, -1, 3, 10, 68, 2, 10, -1, 2, 7, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 10327, 6, 4, 1112, 4, 14, 5, 10339, 18, 15, 0, 0, 10362, 12, 0, 47, 70, 36, -1, 0, 23, 1, 1, 2, 10, 68, 2, 10, -1, 2, 21, 15, 0, 0, 10361, 6, 34, 2, 15, 0, 0, 10368, 6, 9, 36, -1, 63, 5, 0, 36, -1, 64, 5, 1, 36, -1, 65, 5, 2, 36, -1, 66, 5, 3, 36, -1, 67, 5, 10, 36, -1, 68, 5, 11, 36, -1, 69, 5, 12, 36, -1, 70, 5, 13, 36, -1, 71, 5, 20, 36, -1, 72, 5, 21, 36, -1, 73, 5, 30, 36, -1, 74, 5, 40, 36, -1, 75, 5, 41, 36, -1, 76, 5, 50, 36, -1, 77, 5, 51, 36, -1, 78, 5, 52, 36, -1, 79, 5, 53, 36, -1, 80, 5, 60, 36, -1, 81, 5, 61, 36, -1, 82, 5, 62, 36, -1, 83, 10, -1, 20, 10, -1, 13, 12, 2, 10, -1, 19, 9, 36, -1, 84, 10, -1, 21, 10, -1, 13, 12, 2, 10, -1, 19, 9, 36, -1, 85, 10, -1, 23, 10, -1, 12, 12, 2, 10, -1, 19, 9, 36, -1, 86, 10, -1, 22, 10, -1, 14, 12, 2, 10, -1, 19, 9, 36, -1, 87, 10, -1, 24, 10, -1, 17, 12, 2, 10, -1, 19, 9, 36, -1, 88, 10, -1, 25, 10, -1, 16, 12, 2, 10, -1, 19, 9, 36, -1, 89, 10, -1, 26, 10, -1, 15, 12, 2, 10, -1, 19, 9, 36, -1, 90, 10, -1, 27, 10, -1, 18, 12, 2, 10, -1, 19, 9, 36, -1, 91, 5, 1, 5, 0, 43, 36, -1, 92, 5, 1, 5, 1, 43, 36, -1, 93, 5, 1, 5, 2, 43, 36, -1, 94, 5, 1, 5, 3, 43, 36, -1, 95, 5, 1, 5, 4, 43, 36, -1, 96, 5, 1, 5, 5, 43, 36, -1, 97, 5, 1, 5, 6, 43, 36, -1, 98, 5, 1, 5, 7, 43, 36, -1, 99, 5, 1, 5, 8, 43, 36, -1, 100, 5, 0, 36, -1, 101, 5, 1, 36, -1, 102, 5, 16, 36, -1, 103, 5, 150, 5, 1e3, 33, 36, -1, 104, 5, 1, 36, -1, 105, 5, 2, 36, -1, 106, 5, 3, 36, -1, 107, 5, 4, 36, -1, 108, 5, 5, 36, -1, 109, 5, 6, 36, -1, 110, 5, 10725, 18, 15, 0, 0, 11049, 12, 0, 47, 71, 36, -1, 0, 23, 0, 1, 3, 36, -1, 2, 5, 10746, 18, 15, 0, 0, 10912, 12, 0, 47, 72, 36, -1, 0, 23, 1, 1, 2, 5, 10764, 18, 15, 0, 0, 10890, 12, 0, 47, 73, 36, -1, 0, 23, 1, 1, 2, 10, -1, 2, 4, 432, 8, 4, 21, 4, 3220, 36, -19, 25, 0, 10880, 5, 0, 36, -1, 3, 10, -1, 2, 4, 1452, 16, -2, 21, 4, 3588, 12, -11, 21, 36, -1, 4, 10, -1, 3, 10, -1, 4, 51, 0, 10880, 10, -1, 2, 4, 1452, 16, -2, 21, 10, -1, 3, 21, 36, -1, 5, 10, -1, 5, 4, 868, 16, 21, 21, 4, 2012, 8, -1, 48, 4, 2712, 16, 0, 21, 25, 0, 10871, 10, -1, 5, 12, 1, 10, 71, 2, 4, 4312, 36, 14, 21, 9, 37, 55, -1, 3, 0, 37, 15, 0, 0, 10811, 4, 3904, 20, 14, 48, 15, 0, 0, 10889, 6, 12, 1, 10, -1, 2, 4, 2784, 12, -10, 21, 9, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 10911, 6, 36, -1, 3, 4, 1116, 16, -9, 48, 16, 4, 3892, 12, 22, 25, 11, 0, 10946, 37, 4, 1116, 16, -9, 48, 4, 1820, 20, 17, 21, 16, 4, 244, 16, -10, 25, 0, 10982, 10, -1, 3, 12, 1, 4, 1788, 32, -8, 48, 12, 2, 4, 1116, 16, -9, 48, 4, 1820, 20, 17, 21, 9, 3, 4, 3428, 20, 10, 7, 37, 15, 0, 0, 11e3, 10, -1, 3, 12, 1, 4, 1788, 32, -8, 48, 17, 3, 4, 3428, 20, 10, 7, 37, 4, 3872, 12, 16, 15, 1, 4, 3220, 36, -19, 15, 1, 34, 2, 4, 884, 16, -9, 48, 4, 424, 8, -4, 21, 12, 2, 3, 4, 3428, 20, 10, 21, 4, 852, 16, 19, 21, 9, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 11048, 6, 10, -1, 28, 4, 3776, 68, -20, 21, 4, 72, 40, 9, 7, 37, 5, 11070, 18, 15, 0, 0, 11222, 12, 0, 47, 74, 36, -1, 0, 23, 0, 1, 34, 0, 36, -1, 2, 3, 4, 4876, 8, -5, 21, 4, 1048, 8, -16, 21, 12, 1, 4, 24, 20, -17, 48, 4, 3404, 8, 4, 21, 9, 36, -1, 3, 10, -1, 3, 4, 3588, 12, -11, 21, 36, -1, 4, 5, 0, 36, -1, 5, 10, -1, 5, 10, -1, 4, 51, 0, 11214, 10, -1, 3, 10, -1, 5, 21, 36, -1, 6, 10, -1, 6, 3, 4, 4876, 8, -5, 21, 4, 1944, 20, 19, 21, 40, 0, 11205, 3, 4, 4876, 8, -5, 21, 4, 1944, 20, 19, 21, 10, -1, 6, 21, 36, -1, 7, 3, 4, 4876, 8, -5, 21, 4, 1048, 8, -16, 21, 10, -1, 6, 21, 10, -1, 2, 10, -1, 7, 7, 37, 55, -1, 5, 0, 37, 15, 0, 0, 11128, 10, -1, 2, 15, 0, 0, 11221, 6, 10, -1, 28, 4, 3776, 68, -20, 21, 4, 972, 44, 13, 7, 37, 5, 11243, 18, 15, 0, 0, 11403, 12, 0, 47, 75, 36, -1, 0, 23, 1, 1, 2, 3, 4, 4876, 8, -5, 21, 4, 1048, 8, -16, 21, 39, 0, 11282, 34, 0, 3, 4, 4876, 8, -5, 21, 4, 1048, 8, -16, 7, 37, 3, 4, 4876, 8, -5, 21, 4, 1944, 20, 19, 21, 39, 0, 11324, 34, 0, 3, 4, 4876, 8, -5, 21, 4, 1944, 20, 19, 7, 37, 5, 0, 3, 4, 4876, 8, -5, 21, 4, 2456, 24, 17, 7, 37, 4, 4240, 40, -4, 12, 1, 10, -1, 2, 4, 376, 48, -11, 21, 9, 36, -1, 3, 10, -1, 3, 4, 3588, 12, -11, 21, 36, -1, 4, 5, 0, 36, -1, 5, 10, -1, 5, 10, -1, 4, 51, 0, 11393, 10, -1, 3, 10, -1, 5, 21, 12, 1, 3, 4, 800, 20, 0, 21, 9, 37, 55, -1, 5, 0, 37, 15, 0, 0, 11358, 4, 3904, 20, 14, 48, 15, 0, 0, 11402, 6, 10, -1, 28, 4, 3776, 68, -20, 21, 4, 4312, 36, 14, 7, 37, 5, 11424, 18, 15, 0, 0, 11547, 12, 0, 47, 76, 36, -1, 0, 23, 1, 1, 2, 10, -1, 2, 12, 1, 10, 0, 6, 9, 36, -1, 3, 10, -1, 3, 3, 4, 4876, 8, -5, 21, 4, 1048, 8, -16, 21, 40, 39, 0, 11537, 10, -1, 2, 12, 1, 10, 0, 9, 9, 36, -1, 4, 10, -1, 4, 3, 4, 4876, 8, -5, 21, 4, 1048, 8, -16, 21, 10, -1, 3, 7, 37, 3, 4, 4876, 8, -5, 21, 4, 2456, 24, 17, 21, 3, 4, 4876, 8, -5, 21, 4, 1944, 20, 19, 21, 10, -1, 3, 7, 37, 5, 1, 3, 4, 4876, 8, -5, 21, 4, 2456, 24, 17, 1, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 11546, 6, 10, -1, 28, 4, 3776, 68, -20, 21, 4, 800, 20, 0, 7, 37, 5, 11568, 18, 15, 0, 0, 12233, 12, 0, 47, 77, 36, -1, 0, 23, 1, 1, 2, 10, -1, 2, 11, 39, 0, 11589, 37, 34, 0, 27, -1, 2, 37, 34, 0, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 7, 37, 10, -1, 2, 10, 0, 105, 21, 15, 0, 26, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 10, 0, 105, 7, 37, 10, -1, 2, 10, 0, 106, 21, 15, 0, 26, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 10, 0, 106, 7, 37, 10, -1, 2, 10, 0, 107, 21, 15, 0, 26, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 10, 0, 107, 7, 37, 10, -1, 2, 10, 0, 108, 21, 15, 0, 26, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 10, 0, 108, 7, 37, 10, -1, 2, 10, 0, 109, 21, 15, 0, 26, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 10, 0, 109, 7, 37, 10, -1, 2, 10, 0, 110, 21, 15, 0, 26, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 10, 0, 110, 7, 37, 12, 0, 4, 3096, 8, -5, 48, 4, 4476, 4, 10, 21, 9, 3, 4, 4876, 8, -5, 21, 4, 3104, 16, -8, 7, 37, 12, 0, 3, 4, 72, 40, 9, 21, 9, 37, 4, 884, 16, -9, 48, 4, 424, 8, -4, 21, 12, 1, 3, 4, 4312, 36, 14, 21, 9, 37, 3, 4, 4876, 8, -5, 21, 4, 576, 24, 19, 21, 15, 0, 25, 0, 12209, 4, 884, 16, -9, 48, 4, 424, 8, -4, 21, 12, 1, 44, 17, 36, -1, 3, 10, 0, 89, 4, 4232, 8, 11, 10, 0, 110, 12, 3, 10, 0, 89, 4, 4200, 8, -6, 10, 0, 110, 12, 3, 10, 0, 90, 4, 3396, 8, 8, 10, 0, 109, 12, 3, 10, 0, 88, 4, 2728, 16, 14, 10, 0, 108, 12, 3, 10, 0, 88, 4, 4296, 16, 6, 10, 0, 108, 12, 3, 10, 0, 88, 4, 4548, 8, 2, 10, 0, 108, 12, 3, 10, 0, 88, 4, 4484, 8, 1, 10, 0, 108, 12, 3, 10, 0, 86, 4, 1056, 12, 1, 10, 0, 107, 12, 3, 10, 0, 86, 4, 3028, 40, -12, 10, 0, 107, 12, 3, 10, 0, 86, 4, 2576, 20, 8, 10, 0, 107, 12, 3, 10, 0, 87, 4, 2192, 16, -4, 10, 0, 106, 12, 3, 10, 0, 87, 4, 4072, 8, 0, 10, 0, 106, 12, 3, 10, 0, 85, 4, 1072, 12, -10, 10, 0, 105, 12, 3, 10, 0, 85, 4, 3756, 12, 10, 10, 0, 105, 12, 3, 10, 0, 84, 4, 4732, 60, -19, 10, 0, 105, 12, 3, 10, 0, 85, 4, 2964, 20, 16, 10, 0, 105, 12, 3, 10, 0, 91, 4, 1156, 12, 0, 10, 0, 105, 12, 3, 10, 0, 91, 4, 3736, 20, 7, 10, 0, 105, 12, 3, 10, 0, 91, 4, 4376, 28, 19, 10, 0, 105, 12, 3, 12, 19, 36, -1, 4, 10, -1, 4, 4, 3588, 12, -11, 21, 36, -1, 5, 5, 0, 36, -1, 6, 10, -1, 6, 10, -1, 5, 51, 0, 12195, 10, -1, 4, 10, -1, 6, 21, 36, -1, 7, 10, -1, 7, 5, 1, 21, 36, -1, 8, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 10, -1, 7, 5, 0, 21, 21, 15, 1, 25, 0, 12186, 15, 1, 3, 4, 2756, 24, 17, 21, 10, -1, 8, 12, 2, 10, -1, 7, 5, 2, 21, 9, 10, -1, 8, 12, 3, 10, -1, 3, 4, 1964, 36, 5, 21, 9, 37, 55, -1, 6, 0, 37, 15, 0, 0, 12100, 15, 1, 3, 4, 4876, 8, -5, 21, 4, 576, 24, 19, 7, 37, 15, 1, 3, 4, 4876, 8, -5, 21, 4, 4956, 16, 15, 7, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 12232, 6, 10, -1, 28, 4, 3776, 68, -20, 21, 4, 3556, 16, 9, 7, 37, 5, 12254, 18, 15, 0, 0, 12311, 12, 0, 47, 78, 36, -1, 0, 23, 0, 1, 3, 4, 3428, 20, 10, 21, 0, 12287, 12, 0, 3, 4, 3428, 20, 10, 21, 4, 1468, 16, 12, 21, 9, 37, 15, 0, 3, 4, 4876, 8, -5, 21, 4, 4956, 16, 15, 7, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 12310, 6, 10, -1, 28, 4, 3776, 68, -20, 21, 4, 3332, 8, 9, 7, 37, 5, 12332, 18, 15, 0, 0, 12488, 12, 0, 47, 79, 36, -1, 0, 23, 0, 1, 34, 0, 36, -1, 2, 3, 4, 4876, 8, -5, 21, 4, 1176, 52, -19, 21, 12, 1, 4, 24, 20, -17, 48, 4, 3404, 8, 4, 21, 9, 36, -1, 3, 10, -1, 3, 4, 3588, 12, -11, 21, 36, -1, 4, 5, 0, 36, -1, 5, 10, -1, 5, 10, -1, 4, 51, 0, 12449, 10, -1, 3, 10, -1, 5, 21, 36, -1, 6, 12, 0, 3, 4, 4876, 8, -5, 21, 4, 1176, 52, -19, 21, 10, -1, 6, 21, 4, 12, 12, -3, 21, 9, 10, -1, 2, 10, -1, 6, 7, 37, 55, -1, 5, 0, 37, 15, 0, 0, 12390, 3, 4, 4876, 8, -5, 21, 4, 3104, 16, -8, 21, 12, 0, 3, 4, 972, 44, 13, 21, 9, 10, -1, 2, 12, 0, 3, 4, 1500, 52, 8, 21, 9, 12, 4, 15, 0, 0, 12487, 6, 10, -1, 28, 4, 3776, 68, -20, 21, 4, 12, 12, -3, 7, 37, 5, 12509, 18, 15, 0, 0, 12545, 12, 0, 47, 80, 36, -1, 0, 23, 2, 1, 2, 3, 10, -1, 3, 3, 4, 560, 16, 15, 21, 10, -1, 2, 7, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 12544, 6, 10, -1, 28, 4, 3776, 68, -20, 21, 4, 3460, 28, -12, 7, 37, 5, 12566, 18, 15, 0, 0, 12609, 12, 0, 47, 81, 36, -1, 0, 23, 0, 1, 34, 0, 3, 4, 560, 16, 15, 7, 37, 34, 0, 3, 4, 4876, 8, -5, 21, 4, 1176, 52, -19, 7, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 12608, 6, 10, -1, 28, 4, 3776, 68, -20, 21, 4, 4816, 20, 20, 7, 37, 5, 12630, 18, 15, 0, 0, 13077, 12, 0, 47, 82, 36, -1, 0, 23, 2, 1, 2, 3, 3, 4, 4876, 8, -5, 21, 4, 4956, 16, 15, 21, 15, 0, 25, 0, 12663, 50, 15, 0, 0, 13076, 14, 13047, 5, 10, 10, -1, 2, 12, 2, 4, 44, 16, 16, 48, 9, 27, -1, 2, 37, 10, -1, 3, 4, 3588, 12, -11, 21, 5, 1, 42, 36, -1, 4, 10, -1, 3, 10, -1, 4, 21, 3, 4, 4876, 8, -5, 21, 4, 3104, 16, -8, 21, 42, 36, -1, 5, 10, -1, 3, 10, -1, 3, 4, 3588, 12, -11, 21, 5, 2, 42, 21, 36, -1, 6, 3, 4, 4876, 8, -5, 21, 4, 1176, 52, -19, 21, 10, -1, 2, 21, 39, 0, 12796, 3, 4, 4876, 8, -5, 21, 4, 3104, 16, -8, 21, 10, 0, 104, 10, 0, 103, 12, 3, 38, 4, 2796, 32, -15, 21, 17, 3, 4, 4876, 8, -5, 21, 4, 1176, 52, -19, 21, 10, -1, 2, 7, 37, 10, -1, 2, 10, 0, 74, 45, 11, 0, 12814, 37, 10, -1, 2, 10, 0, 75, 51, 0, 12874, 10, -1, 3, 5, 2, 21, 36, -1, 7, 10, -1, 7, 3, 4, 4876, 8, -5, 21, 4, 1048, 8, -16, 21, 10, -1, 6, 7, 37, 10, -1, 3, 5, 4, 21, 10, -1, 3, 5, 3, 21, 10, -1, 3, 5, 1, 21, 10, -1, 3, 5, 0, 21, 12, 4, 27, -1, 3, 37, 10, -1, 3, 4, 3588, 12, -11, 21, 5, 1, 42, 27, -1, 4, 37, 10, -1, 3, 10, -1, 4, 21, 3, 4, 4876, 8, -5, 21, 4, 3104, 16, -8, 21, 42, 10, -1, 3, 10, -1, 4, 7, 37, 10, -1, 3, 4, 3588, 12, -11, 21, 5, 2, 42, 36, -1, 8, 3, 4, 4876, 8, -5, 21, 4, 1944, 20, 19, 21, 10, -1, 6, 21, 36, -1, 9, 10, -1, 9, 10, -1, 3, 10, -1, 8, 7, 37, 3, 4, 4876, 8, -5, 21, 4, 1048, 8, -16, 21, 10, -1, 6, 21, 36, -1, 10, 10, -1, 10, 39, 0, 12988, 50, 15, 0, 0, 13076, 10, -1, 10, 5, 0, 21, 36, -1, 11, 10, -1, 11, 10, 0, 61, 25, 0, 13011, 50, 15, 0, 0, 13076, 10, -1, 3, 10, -1, 5, 12, 2, 3, 4, 4876, 8, -5, 21, 4, 1176, 52, -19, 21, 10, -1, 2, 21, 4, 1292, 28, -16, 21, 9, 37, 46, 13043, 15, 0, 0, 13067, 36, -1, 12, 10, -1, 12, 4, 4640, 28, -14, 12, 2, 38, 4, 1084, 20, 14, 21, 9, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 13076, 6, 10, -1, 28, 4, 3776, 68, -20, 21, 4, 2756, 24, 17, 7, 37, 5, 13098, 18, 15, 0, 0, 13136, 12, 0, 47, 83, 36, -1, 0, 23, 2, 1, 2, 3, 10, -1, 3, 10, -1, 2, 12, 2, 3, 4, 2756, 24, 17, 21, 9, 37, 4, 3904, 20, 14, 48, 15, 0, 0, 13135, 6, 10, -1, 28, 4, 3776, 68, -20, 21, 4, 2516, 12, -2, 7, 37, 5, 13157, 18, 15, 0, 0, 13302, 12, 0, 47, 84, 36, -1, 0, 23, 0, 1, 5, 0, 36, -1, 2, 3, 4, 4876, 8, -5, 21, 4, 3556, 16, 9, 21, 36, -1, 3, 10, -1, 3, 10, 0, 105, 21, 0, 13204, 5, 1, 5, 0, 43, 41, -1, 2, 37, 10, -1, 3, 10, 0, 106, 21, 0, 13222, 5, 1, 5, 1, 43, 41, -1, 2, 37, 10, -1, 3, 10, 0, 107, 21, 0, 13240, 5, 1, 5, 2, 43, 41, -1, 2, 37, 10, -1, 3, 10, 0, 108, 21, 0, 13258, 5, 1, 5, 3, 43, 41, -1, 2, 37, 10, -1, 3, 10, 0, 109, 21, 0, 13276, 5, 1, 5, 4, 43, 41, -1, 2, 37, 10, -1, 3, 10, 0, 110, 21, 0, 13294, 5, 1, 5, 5, 43, 41, -1, 2, 37, 10, -1, 2, 15, 0, 0, 13301, 6, 10, -1, 28, 4, 3776, 68, -20, 21, 4, 1500, 52, 8, 7, 37, 12, 0, 10, -1, 28, 17, 36, -1, 111, 4, 2208, 216, -4, 5, 1, 53, 5, 1, 53, 12, 0, 10, -1, 31, 9, 12, 0, 10, -1, 30, 9, 12, 0, 10, -1, 29, 9, 12, 6, 36, -1, 112, 5, 13365, 18, 15, 0, 0, 13380, 12, 0, 47, 85, 37, 23, 0, 0, 12, 0, 10, 0, 33, 9, 6, 5, 13387, 18, 15, 0, 0, 13402, 12, 0, 47, 86, 37, 23, 0, 0, 12, 0, 10, 0, 32, 9, 6, 19, 19, 19, 12, 5, 36, -1, 113, 12, 0, 5, 0, 20, 12, 0, 12, 3, 36, -1, 114, 12, 0, 36, -1, 115, 10, -1, 111, 4, 260, 4, -4, 32, 10, -1, 50, 4, 2892, 4, 12, 32, 10, -1, 38, 4, 4716, 4, 0, 32, 10, -1, 39, 4, 1492, 8, -4, 32, 10, -1, 38, 4, 348, 20, 0, 32],
                _7IxkUn4o: atob("Y0NVMVFtWnZYdz09YW1oM1IyUjNaQT09SlRZd2N5VTNRblowSlVNeUpUZzFKVFl3VVdKalZUa2xOVVZrZUhkeGRpVTNRMjE2SlRZd1pTVTJNR3RFYkd0WWF5VTJNR1psUmxscUpUVkRhVzBsTlVOcFFpVXpRMUE9VnlWRE1pVTROeVZETWlVNE5DVkRNaVU0UXlWRE1pVTRPSG9sUXpJbE9EYz1ZbGRZVldNbE0wRlVhQT09SlVNeUpUZzRKVU15SlRnekpVTXlKVGc1ZHlVM1F3PT1lblYySlRkR0pVTXlKVGcxZW5kNmRpVkRNaVU0TXc9PWNDVTNSbmh0Zm5ONWVBPT1aZz09WkhWemJVeG1lZz09SlVNeUpUZ3hKVGRESlVNeUpUZ3ljSFZ5SlVNeUpUZ3dhUT09U1ZWT1RVcHZjWFoxUm0xbWJtWnZkUT09ZVhZbFF6SWxPRGwyYzNWaWJXbDBWRzlKYm5Od1pXdDBKVFZDVVdKTkpUZERKVU15SlRnd2NDVTNSQ1ZETWlVNE5DVTFSWEIzY0c0bE4wWjZKVGRFVEhkM1puTm9KVGRFY0hWc1lRPT1KVU15SlRnd2NTVkRNaVU0TXlWRE1pVTRNeVZETWlVNE55VTNSaVZETWlVNE1uUT1PVVVsTTBVbE0wUTJKVFZFVmlVMVJWWmZaUT09TUdzPUpUVkRhZz09UmtoTlFraEhaMnA1Wmc9PUpVTXlKVGd5SlVNeUpUaEJVQ1UxUlZKZldsZFdaR1U9VmlVMVFsWmhKVE5HVWxBbE5VTmZVUT09SlVNeUpUZzNKVGRESlVNeUpUZ3dlQT09WDJKWlZTVTFSV1JSWkZsZkpUVkZjU1ZETWlVNE1pVTNSbTRsUXpJbE9ERjJKVGRESlRkQ0pUTkNaR29sTlVKb1ozRk1YMHc9WVdSWVZta2xOVVZrWXc9PVF5VXpSVVF5Tnc9PWFtUndjR1E9SlRkRGJnPT1kblFsUXpJbE9ETlVKVU15SlRnMWRDVTNSQ1ZETWlVNE0xSitjM1E9VGsxSFRGSkRVQT09VEVzbE5VTT1ZV1JrUm05eWJVVnNaVzFsYm5RPVpsZG9KVFZDWkdwRVpWb2xOVUk9VWxkTFNGVT1lUT09SlRWRFR5VTJNRkpmWTFJPVdWcFBVQ1V6Um1RbE5VSlFiWGhzZm5adWR5VTNSQT09SlRWQ1ltY2xOVVE9U2tzPUpVTXlKVGd6ZENWRE1pVTROWGdsUXpJbE9ERWxReklsT0RjPVpGRmlWMVZrZEhWemFtOW9hbWQ2V2xobk9TVTJNRVpuVkdkWVNpVTFRMmNsTlVJbE0wTmhWeVUxUTFaWVpnPT1kWG9sTjBKK2RpVTJNQ1ZETWlVNE1YWjNKVU15SlRnMWRpVTNSQT09YzI1MFltZGtiV009Y3c9PWJteDJiWFp6YlhVPVpWY2xOakJtWkdzM1pHUmhaQT09VUdObFEzWnVXVmRtSlRWQ2JtOTFibXdsTjBRPVdpVTFRbXc9UzJsNEpUZENWSGRyY3c9PWNHOXBiblJsY25Wd1JTVXpRVUU9SlVNeUpUZzNKVGRESlVNeUpUZ3dlRlVsUXpJbE9EaDVlWGdsUXpJbE9EVWxReklsT0RZPUpVTXlKVGd3Y3lWRE1pVTRPQ1UzUW5sekpVTXlKVGcySlRkQ0pVTXlKVGd4SlVNeUpUZ3dlbXR5VWlVMVFsRT1KVU15SlRnd0pVTXlKVGcxSlVNeUpUZ3plQT09SlRWRVVTVTJNQT09Wm1nbE5VSnNZMlZxWDJWa2VIb2xReklsT0RCK2NBPT1aV0oxWW5SbWRRPT1KVFZGYVhGSVluWT1KVU15SlRnNUpUZENKVU15SlRnd2RpVkRNaVU0TVNWRE1pVTRPUT09VWxkUUpUVkVWbFJUUXlVMVJXUlNWMVJpWTJabVoyWlFjV1puZFE9PVdDVTFSR2RYWTJKaVdWZG9XbEpaV0U4PWQzaGxkbmc9VnlVMVJHWWxOVUpuSlRWREpUVkVKVE5DWjJZbE5VVmhYMHhuSlROQllXd2xOVVZrV1Y5ckpUTkJKVE5CTldaTGRHOUlMUT09SlRZd1pXMD1KVU15SlRnd0pVTXlKVGd4ZG5jbE5qQnpKVGRHZHc9PVZWTmlKVE5DVTA4bE5VTWxNMFZUSlRZd1Z5VTFSRkk9V0VoWFNrcFRZV1FsTlVKWkpUVkNKVFl3Y0drbE4wSkpKVGRESlRkRGVuRnFKVGRFSlRkRGJRPT1KVGREZVg1cmZuTjVlQ1UxUTJ0K2J3PT1kbTlzWm1nPUpUZEdKVU15SlRneGRDVkRNaVU0TWlWRE1pVTRNaVZETWlVNE5DVkRNaVU0TVhRPVQyTjJhZz09VlNVM1JDVTNRMmtsTjBOeGQzWlhhaVUzUW0xNmZtMTZVaVUxUlNVMVJHSmpZV1JTWXc9PVgybEthR3RwYWlVMVFsbz1kQT09Y1hSbWFWbHVjbW89SlVNeUpUZzBKVU15SlRnekpUZEVKVU15SlRneUpVTXlKVGc0ZVNWRE1pVTROaVUxUkhnPVN5VTBNRVFsTkRCRkpUTkZTZz09VTFwTVZVNGxOakJWVEZwT0pUVkVKVFZEWDE4bE5EQnhKVFl3YVc5SFpHNXZKVFl3YVNVMk1HMD1KVE5DSlRRd1NBPT1UM0JsWmc9PUpUVkNXV2cxYUdobUpUVkVWbWxvV1E9PVRWRlZkRzRsUXpJbE9EST1XVVpZVUVoVVUxbEtKVFZFV1E9PUpVTXlKVGcxSlVNeUpUZ3hjM2h1ZVNWRE1pVTRNV0k9ZUNWRE1pVTRNbEorSlRkRUpVTXlKVGd6ZENVM1JDVkRNaVU0TTFSemVDVkRNaVU0TTNCeEpUZENkQT09Y1NVMVJXUkxKVFZGYW1JPWRuYz1iMmtsTjBSb2N5VTNRbkk9YURSdUpUVkZKVE5CSlROQ2N5VTFSRGRKY0RoeVJpVXpRWEJ2SlROREpUTkVKVE5CSlRkRGN5VXpRaVV6UVhwRmNrWndUbTBsTWtZbE0wRktWMjlZUzJaWlVYUkhiRFZJYkhkd1RpVXpSRTRsTjBOM0pUTkVkMFpTVG1oTWR5VTFSVzFLVVVwMk16TlFObm9sTTBGMWFpVTFRbXRQSlRWRVNuTWxOVVZ1WjFGVFIyNVZOemRYT0hZbE4wTjROaVV6UkdnbE1rWktKVGRDTlNVeVJrY2xOMEpCYW5KbWJuRT1iQ1UzUm14cVdsTmxOMmhYSlRZd1pnPT1WU1UxUTA1WFVHSlhUbGdsTlVSVFZHYz1KVFZDVG1OV1ZFNWhKVFZEWHc9PUpUZERlWE09ZG5KNGRXWm9jbmQxYWtkNFozQjJjM2tsUXpJbE9ESnpVaVZETWlVNE5YWjJKVFl3SlVNeUpUZzFKVU15SlRnemVBPT1iR2R0SlRWQ0pUWXdhMnhaYW13PWVHcDVXVzV5YW5SNmVRPT1hZz09T0VRbE0wUWxNME5FVldoa01XSlZVVFVsTlVOVkpUVkVWU1UxUldRPUpUZEVkU1ZETWlVNE15VkRNaVU0TTNGM2RRPT1KVFl3WkdnPVZrVlNVMGxQVGc9PWNtVnhhUT09UlV4RlRVVk9WRjlPVDBSRlgyRm5aVmNsTlVWWFUyaFhaVjl6YW14ZmJXMD1UbUZVVWlVMVJXRlROR1ZVSlRWRVl3PT1JUT09Y0hrbE4wTlBhMjF5WTNnbE4wTjBVU1ZETWlVNE5IVjFkQ1ZETWlVNE1RPT1lQ1ZETWlVNE9YZ2xReklsT0RFbFF6SWxPRGRXSlVNeUpUZ3lKVU15SlRneUpVTXlKVGcxZHlWRE1pVTROZz09WVE9PWMzUWxReklsT0RWNGNuUWxOME4rSlVNeUpUZ3plSDRsTjBRPUpUTkZKVFl3SlRWRUpUVkNWMkZUZVd0d1puRjVKVFZDSlRWRVgyVmpWVlJmWnlVMVJRPT1ZV1E9SlROQ1N5VXpSaVV6UTBRbE0wTT1ZVkpsWVE9PVN5VXpSRUk0UTBzPUpVTXlKVGd3SlRkQ0pVTXlKVGd4YjNSNUpUZENKVU15SlRneWNRPT1YeVUxUldKakpUTkRWR0ppVUZaVVMwMVVRdz09U1daNWFnPT1lbTFyZDNwc0pUVkRjWFZ0SlVNeUpUZzFKVU15SlRnd0pUVkVKVU15SlRnd0pVTXlKVGc0ZGlWRE1pVTRNMVJ5SlVNeUpUZzBkZz09SlRkRWZnPT1YMmtsTlVNbE5VUT1KVFZESlRWRlpWUnVKVFZEWHc9PWRpVTNRaVUzUXlVM1JuZGZKVGRESlVNeUpUZzJKVU15SlRnM05EVkdPVE0xVkZKaE1DVTFRMDVaVWlVMk1GQlNVVEpqVWlVMVFtRWxOakE9WlNVMk1BPT1KVFl3VldKV1gySWxOVVJSSlRWRlUxVT1hbXRtWnc9PVIxVlJKVFZDSlRORVVTVTJNQT09WDJWYWJRPT1kdz09VFU5UFVWaFJKVFZGVFNVMk1GVWxOVUphWVdab2JXdz1aMkYxYnc9PVp3PT1KVFZDUzFwWFZGUT1WV1ZZYVNVMVFtaHNKVFZDYUE9PVgwOGxOVVZSVVZwRkpUZEdjU1ZETWlVNE1GQnRKVU15SlRnd2JRPT1kSE1sUXpJbE9EUT1KVU15SlRnMGVTVkRNaVU0TUE9PWJ3PT1RMVpEUVE9PUpUVkRXRTFQVVZRbE5VSllVRkVsTlVVPWFTVTFRMXBtYVNVMVFnPT1KVFZDVmxSaloxWWxOVUpVZDNCNWNpVTNSbk09ZFdVPUpVTXlKVGczZVhVbFF6SWxPRFozSlRkRGZuRWxOMFFsUXpJbE9ERjFmbkZ3SlRkREpVTXlKVGd4SlVNeUpUZzNlQ1ZETWlVNE5TVkRNaVU0T1hRbE4wWT1KVE5FSlRORkpUSkNKVE5ESlRORmIzaDFjWG9sUXpJbE9EQmxKVE5CUlUxRWFXaGlaMjBsTlVWclptaHZKVFZGWTJWcmFTVTFRbXRtSlRZd1R3PT1KVU15SlRnMEpVTXlKVGcySlVNeUpUZ3pKVU15SlRnNEpVTXlKVGd6SlVNeUpUZzRKVU15SlRoRUpVTXlKVGcwZVE9PVFTVTJNR0pxY204bE5qQmlaQT09WVZkb1V3PT1ZMlZTWkdKVlZRPT1KVE5GSlROR1dVeFVUMDBsTlVVPVp5VTJNRlpYV0NVMVFpVTJNRmRXWXlVMVJXUlNWMUpRSlRWRVVsUWxOVUk9WlNVMVJHeFpReVUxUkhFPWRYTWxReklsT0RKVEpUZERKVU15SlRneUpVTXlKVGd3ZDNNbFF6SWxPREZRSlVNeUpUZzNZaVZETWlVNE4zNXpXV0lsTlVVbE5VUT1ZVk5hVTFGaVZ5VTFSQ1UxUTBGaVR5VTJNR0k9T1E9PWEyVjVkWEE9ZVdwd2JtST1lQ1UzUkNVM1JIUWxReklsT0RGamRDVkRNaVU0TnlWRE1pVTRNdz09V2c9PVVGVmZUVTVZVVZBPVV5VTFRMUZqWXc9PWRpVkRNaVU0T1NWRE1pVTRPQ1ZETWlVNE9DVkRNaVU0TXlWRE1pVTRNZz09YVhWMkpUZEdiMm89ZG5nbE4wUnllSGM9SlRZd1VRPT1aVlpvYVZvPWJYSjBlWGd3SlRJMGQybHdhV2Q0TUNVeU5IaHBKVGREZUdWMmFXVT1jSEVsUXpJbE9ESjFiM0U9WjJsdmJWOWZhRzVmYkE9PVlsTmtaVmNsTkRCWGFUaGhaRjgzSlRWRlYxOVhKVFl3Wm1VPVdHRWxOVVZhWTJsTkpUWXdVRjlTVWlVMVFrVT1KVFZFSlRWRFZpVTFRbUZTWDFFbE5VTmtKVFZDTm04bE4wSjBjelpwZG1zbFF6SWxPREE9SlRkRGVDVTNSQT09SlVNeUpUZ3dKVU15SlRnM0pUZEdkSGNsUXpJbE9EUT1ZMW89WkdWdGNRPT1aVzVpZEhJPWJISWxReklsT0RSMUpUZERiSEk9VVNVMVF5VTJNRmhSUkU5RFZVMUZUbFJmVWtWR1JWSlNSVkk9SlRZd2FuTndKVFZGWjJSckpUVkVhaVUxUTIxZkpUTkdKVFZEYnlVMVF3PT1hVnBvYVE9PWJtRWxOVVFsTmpCTGFtaDFkR1oxZEhOdGNuaHBkbGdsTjBSMGFRPT1VRmNsTlVJbE4wUWxReklsT0RKM0pUZEVKVGREVkZZbE5VTmFUQT09V2c9PVkyeGhjM05PWVcxbEpVTXlKVGhDWWw5bEpUVkZWQT09Y3c9PU5sY2xOVVZYWmxjPUpVTXlKVGd3SlVNeUpUZ3lKVU15SlRnNEpVTXlKVGcyZUNWRE1pVTRNQ1ZETWlVNE1pVkRNaVU0T1hnPUpVTXlKVGc1SlRkRWVpVkRNaVU0TW5vPUpUVkZVVjlSSlRZd01FMGxOakJOYWlVMVFtRmZVZz09SlRkR2NDVkRNaVU0TXlVM1Jtd2xOMFJ3YkE9PWVIbG1lV289UmxOVWJWOW1YeVUxUkc1amFXZ2xNMFpvSlRWRlVUWmtWMk1sTlVJekpURTRaV29sTmpCaGRFdGlSMVpXVWs5SlIxcFBWVlE9WTFaVUpUWXdZMVZhWDFnPQ==")
            };
            function t(e) {
                for (; e._C8SRvzp7 !== e._5K0ED; ) {
                    var t = e._aOPAeS[e._C8SRvzp7++];
                    e._92wSg2dyO6[t](e)
                }
            }
            return e._5K0ED = e._aOPAeS.length,
            t(e),
            e._YAJtVDoQ
        }(),
        rn = nn.s,
        on = nn.m,
        an = nn.b,
        sn = nn.start
    } catch (Yn) {
        Ne("ob-error", "error", "api", {
            message: Yn.message
        });
        var ln = function() {};
        rn = function() {
            return Promise.resolve()
        }
        ,
        on = {
            record: ln,
            resetData: ln,
            setData: ln,
            stop: ln,
            circBuffPush: ln
        },
        an = {
            record: ln,
            stop: ln
        },
        sn = ln
    }
    function un(e, t) {
        this.cause = e,
        this.message = t
    }
    function hn(e) {
        un.call(this, de, "Invalid hCaptcha id: " + e)
    }
    function pn() {
        un.call(this, he, "No hCaptcha exists.")
    }
    function dn() {
        un.call(this, pe, "Missing sitekey - https://docs.hcaptcha.com/configuration#javascript-api")
    }
    un.prototype = Error.prototype;
    var fn = []
      , mn = []
      , gn = {
        add: function(e) {
            fn.push(e)
        },
        remove: function(e) {
            for (var t = !1, n = fn.length; --n > -1 && !1 === t; )
                fn[n].id === e.id && (t = fn[n],
                fn.splice(n, 1));
            return t
        },
        each: function(e) {
            for (var t = -1; ++t < fn.length; )
                e(fn[t])
        },
        isValidId: function(e) {
            for (var t = !1, n = -1; ++n < fn.length && !1 === t; )
                fn[n].id === e && (t = !0);
            return t
        },
        getByIndex: function(e) {
            for (var t = !1, n = -1; ++n < fn.length && !1 === t; )
                n === e && (t = fn[n]);
            return t
        },
        getById: function(e) {
            for (var t = !1, n = -1; ++n < fn.length && !1 === t; )
                fn[n].id === e && (t = fn[n]);
            return t
        },
        getCaptchaIdList: function() {
            var e = [];
            return gn.each((function(t) {
                e.push(t.id)
            }
            )),
            e
        },
        pushSession: function(e, t) {
            mn.push([e, t]),
            mn.length > 10 && mn.splice(0, mn.length - 10)
        },
        getSession: function() {
            return mn
        }
    };
    function yn(e, t) {
        "object" != typeof e || t || (t = e,
        e = null);
        var n, r, i, o = !0 === (t = t || {}).async, a = new Promise((function(e, t) {
            r = e,
            i = t
        }
        ));
        if (a.resolve = r,
        a.reject = i,
        n = e ? gn.getById(e) : gn.getByIndex(0))
            je("Execute called", "hCaptcha", "info"),
            cn.setData("exec", "api"),
            on.setData("exec", "api"),
            o && n.setPromise(a),
            n.onReady(n.initChallenge, t);
        else if (e) {
            if (!o)
                throw new hn(e);
            a.reject(de)
        } else {
            if (!o)
                throw new pn;
            a.reject(he)
        }
        if (o)
            return a
    }
    function vn(e) {
        var t = ""
          , n = null;
        n = e ? gn.getById(e) : gn.getByIndex(0);
        try {
            for (var r = gn.getSession(), i = r.length, o = !1; --i > -1 && !o; )
                (o = r[i][1] === n.id) && (t = r[i][0])
        } catch (Yn) {
            t = ""
        }
        return t
    }
    function wn(e, t, n) {
        this.target = e,
        this.setTargetOrigin(n),
        this.id = t,
        this.messages = [],
        this.incoming = [],
        this.waiting = [],
        this.isReady = !0,
        this.queue = []
    }
    wn.prototype._sendMessage = function(e, t) {
        var n = e instanceof HTMLIFrameElement;
        try {
            n ? e.contentWindow.postMessage(JSON.stringify(t), this.targetOrigin) : e.postMessage(JSON.stringify(t), this.targetOrigin)
        } catch (Jn) {
            Ae("messaging", Jn),
            "*" !== this.targetOrigin && (this.setTargetOrigin("*"),
            this._sendMessage(e, t))
        }
    }
    ,
    wn.prototype.setReady = function(e) {
        var t = this;
        t.isReady = e,
        t.isReady && t.queue.length && (t.queue.forEach((function(e) {
            t._sendMessage.apply(t, e)
        }
        )),
        t.clearQueue())
    }
    ,
    wn.prototype.clearQueue = function() {
        this.queue = []
    }
    ,
    wn.prototype.setID = function(e) {
        this.id = e
    }
    ,
    wn.prototype.setTargetOrigin = function(e) {
        this.targetOrigin = "*"
    }
    ,
    wn.prototype.contact = function(e, t) {
        if (!this.id)
            throw new Error("Chat requires unique id to communicate between windows");
        var n = this
          , r = Math.random().toString(36).substr(2)
          , i = {
            source: "hcaptcha",
            label: e,
            id: this.id,
            promise: "create",
            lookup: r
        };
        if (t) {
            if ("object" != typeof t)
                throw new Error("Message must be an object.");
            i.contents = t
        }
        return new Promise((function(t, o) {
            n.waiting.push({
                label: e,
                reject: o,
                resolve: t,
                lookup: r
            }),
            n._addToQueue(n.target, i)
        }
        ))
    }
    ,
    wn.prototype.listen = function(e, t) {
        if (!this.id)
            throw new Error("Chat requires unique id to communicate between windows");
        for (var n = this.messages.length, r = !1; --n > -1 && !1 === r; )
            this.messages[n].label === e && (r = this.messages[n]);
        !1 === r && (r = {
            label: e,
            listeners: []
        },
        this.messages.push(r)),
        r.listeners.push(t)
    }
    ,
    wn.prototype.answer = function(e, t) {
        if (!this.id)
            throw new Error("Chat requires unique id to communicate between windows");
        for (var n = this.incoming.length, r = !1; --n > -1 && !1 === r; )
            this.incoming[n].label === e && (r = this.incoming[n]);
        !1 === r && (r = {
            label: e,
            listeners: []
        },
        this.incoming.push(r)),
        r.listeners.push(t)
    }
    ,
    wn.prototype.send = function(e, t) {
        var n = this;
        if (!n.id)
            throw new Error("Chat requires unique id to communicate between windows");
        var r = {
            source: "hcaptcha",
            label: e,
            id: n.id
        };
        if (t) {
            if ("object" != typeof t)
                throw new Error("Message must be an object.");
            r.contents = t
        }
        n._addToQueue(n.target, r)
    }
    ,
    wn.prototype.check = function(e, t) {
        for (var n = [].concat.apply([], [this.messages, this.incoming, this.waiting]), r = [], i = -1; ++i < n.length; )
            if (n[i].label === e) {
                if (t && n[i].lookup && t !== n[i].lookup)
                    continue;
                r.push(n[i])
            }
        return r
    }
    ,
    wn.prototype.respond = function(e) {
        for (var t, n, r = -1, i = 0, o = [].concat.apply([], [this.messages, this.incoming, this.waiting]); ++r < o.length; )
            if (o[r].label === e.label) {
                if (e.lookup && o[r].lookup && e.lookup !== o[r].lookup)
                    continue;
                var a = [];
                if (t = o[r],
                e.error && a.push(e.error),
                e.contents && a.push(e.contents),
                e.promise && "create" !== e.promise) {
                    t[e.promise].apply(t[e.promise], a);
                    for (var s = this.waiting.length, c = !1; --s > -1 && !1 === c; )
                        this.waiting[s].label === t.label && this.waiting[s].lookup === t.lookup && (c = !0,
                        this.waiting.splice(s, 1));
                    continue
                }
                for (i = 0; i < t.listeners.length; i++) {
                    if (n = t.listeners[i],
                    "create" === e.promise) {
                        var l = this._contactPromise(t.label, e.lookup);
                        a.push(l)
                    }
                    n.apply(n, a)
                }
            }
        o = null
    }
    ,
    wn.prototype.destroy = function() {
        return this.clearQueue(),
        this.messages = null,
        this.incoming = null,
        this.waiting = null,
        this.isReady = !1,
        null
    }
    ,
    wn.prototype._contactPromise = function(e, t) {
        var n = this
          , r = {}
          , i = new Promise((function(e, t) {
            r.resolve = e,
            r.reject = t
        }
        ))
          , o = {
            source: "hcaptcha",
            label: e,
            id: n.id,
            promise: null,
            lookup: t
        };
        return i.then((function(e) {
            o.promise = "resolve",
            null !== e && (o.contents = e),
            n._addToQueue(n.target, o)
        }
        ))["catch"]((function(e) {
            o.promise = "reject",
            null !== e && (o.error = e),
            n._addToQueue(n.target, o)
        }
        )),
        r
    }
    ,
    wn.prototype._addToQueue = function(e, t) {
        this.isReady ? this._sendMessage(e, t) : this.queue.push([e, t])
    }
    ;
    var bn = {
        chats: [],
        messages: [],
        globalEnabled: !1,
        isSupported: function() {
            return !!window.postMessage
        },
        createChat: function(e, t, n) {
            var r = new wn(e,t,n);
            return bn.chats.push(r),
            r
        },
        addChat: function(e) {
            bn.chats.push(e)
        },
        removeChat: function(e) {
            for (var t = !1, n = bn.chats.length; --n > -1 && !1 === t; )
                e.id === bn.chats[n].id && e.target === bn.chats[n].target && (t = bn.chats[n],
                bn.chats.splice(n, 1));
            return t
        },
        consumeMessages: function() {
            var e = bn.messages;
            return bn.messages = [],
            e
        },
        handleGlobal: function(e) {
            if (bn.globalEnabled) {
                var t = bn.messages;
                if (t.length >= 10)
                    bn.globalEnabled = !1;
                else {
                    var n = t.some((function(t) {
                        return JSON.stringify(t.data) === JSON.stringify(e.data)
                    }
                    ));
                    n || t.push(e)
                }
            }
        },
        handle: function(e) {
            var t = e.data
              , n = "string" == typeof t && t.indexOf("hcaptcha") >= 0 || "object" == typeof t && JSON.stringify(t).indexOf("hcaptcha") >= 0;
            try {
                if (!n)
                    return void bn.handleGlobal(e);
                "string" == typeof t && (t = JSON.parse(t)),
                "d" === t.t && bn.messages.push(e);
                for (var r, i = bn.chats, o = -1; ++o < i.length; ) {
                    var a = "*" === (r = i[o]).targetOrigin || e.origin === r.targetOrigin;
                    r.id === t.id && a && r.respond(t)
                }
            } catch (Jn) {
                je("postMessage handler error", "postMessage", "debug", {
                    event: e,
                    error: Jn
                })
            }
        }
    };
    function _n(e) {
        var t = e ? gn.getById(e) : gn.getByIndex(0);
        if (!t)
            throw e ? new hn(e) : new pn;
        gn.remove(t),
        t.destroy(),
        t = null
    }
    function Tn() {
        try {
            return Object.keys(window).sort().join(",")
        } catch (Xn) {
            return null
        }
    }
    window.addEventListener ? window.addEventListener("message", bn.handle) : window.attachEvent("onmessage", bn.handle);
    var Vn = Be();
    function kn(e, t) {
        for (var n in t) {
            var r = t[n];
            switch (typeof r) {
            case "string":
                e[n] = r;
                break;
            case "object":
                e[n] = e[n] || {},
                kn(e[n], r);
                break;
            default:
                throw new Error("Source theme contains invalid data types. Only string and object types are supported.")
            }
        }
    }
    function En(e, t) {
        try {
            return e in t
        } catch (n) {
            return !1
        }
    }
    function Sn(e) {
        return !!e && "object" == typeof e
    }
    function Rn(e) {
        return Sn(e) ? xn({}, e) : e
    }
    function xn(e, t) {
        var n, r = {}, i = Object.keys(e);
        for (n = 0; n < i.length; n++)
            r[i[n]] = Rn(e[i[n]]);
        var o, a, s = Object.keys(t);
        for (n = 0; n < s.length; n++) {
            var c = s[n];
            if (!(!En(o = c, a = e) || Object.hasOwnProperty.call(a, o) && Object.propertyIsEnumerable.call(a, o)))
                return;
            En(c, e) && Sn(e[c]) ? r[c] = xn(e[c], t[c]) : r[c] = Rn(t[c])
        }
        return r
    }
    var Un = {
        transparent: "transparent",
        white: "#ffffff",
        black: "#000000"
    }
      , Cn = {
        100: "#fafafa",
        200: "#f5f5f5",
        300: "#E0E0E0",
        400: "#D7D7D7",
        500: "#BFBFBF",
        600: "#919191",
        700: "#555555",
        800: "#333333",
        900: "#222222",
        1e3: "#14191F"
    }
      , On = "#4DE1D2"
      , Pn = "#00838F"
      , Mn = {
        mode: "light",
        grey: Cn,
        primary: {
            main: Pn
        },
        secondary: {
            main: On
        },
        warn: {
            light: "#BF1722",
            main: "#BF1722",
            dark: "#9D1B1B"
        },
        text: {
            heading: Cn[700],
            body: Cn[700]
        }
    }
      , Wn = {
        mode: "dark",
        grey: Cn,
        primary: {
            main: Pn
        },
        secondary: {
            main: On
        },
        text: {
            heading: Cn[200],
            body: Cn[200]
        }
    };
    function Nn(e, t) {
        return "dark" === t && e in Wn ? Wn[e] : Mn[e]
    }
    function An() {
        this._themes = Object.create(null),
        this._active = "light",
        this.add("light", {}),
        this.add("dark", {
            palette: {
                mode: "dark"
            }
        })
    }
    An.prototype.get = function(e) {
        if (!e)
            return this._themes[this._active];
        var t = this._themes[e];
        if (!t)
            throw new Error("Cannot find theme with name: " + e);
        return t
    }
    ,
    An.prototype.use = function(e) {
        this._themes[e] ? this._active = e : console.error("Cannot find theme with name: " + e)
    }
    ,
    An.prototype.active = function() {
        return this._active
    }
    ,
    An.prototype.add = function(e, t) {
        t || (t = {}),
        t.palette = function(e) {
            e || (e = {});
            var t = e.mode || "light"
              , n = e.primary || Nn("primary", t)
              , r = e.secondary || Nn("secondary", t)
              , i = e.warn || Nn("warn", t)
              , o = e.grey || Nn("grey", t)
              , a = e.text || Nn("text", t);
            return xn({
                common: Un,
                mode: t,
                primary: n,
                secondary: r,
                grey: o,
                warn: i,
                text: a
            }, e)
        }(t.palette),
        t.component = t.component || Object.create(null),
        this._themes[e] = t
    }
    ,
    An.prototype.extend = function(e, t) {
        "string" == typeof t && (t = JSON.parse(t));
        var n = JSON.parse(JSON.stringify(this.get(e)));
        return kn(n, t),
        n
    }
    ,
    An.merge = function(e, t) {
        return xn(e, t || {})
    }
    ;
    var jn = ["light", "dark", "contrast", "grey-red"]
      , Fn = new An;
    Fn.add("contrast", {}),
    Fn.add("grey-red", {
        component: {
            challenge: {
                main: {
                    border: "#6a6a6a"
                }
            }
        }
    });
    function Bn(e, t) {
        var n = this;
        this.id = e,
        this.width = null,
        this.height = null,
        this.mobile = !1,
        this.ready = !1,
        this.listeners = [],
        this.config = t,
        this._visible = !1,
        this._selected = !1,
        this.$iframe = new pt("iframe"),
        this._host = ye.host || window.location.hostname;
        var r = "";
        ve.assethost && (r = ve.assethost + ye.assetUrl.replace(ye.assetDomain, ""));
        var i = r.match(/^.+\:\/\/[^\/]+/)
          , o = i ? i[0] : null
          , a = r + "/hcaptcha.html#frame=challenge&id=" + this.id + "&host=" + this._host + (t ? "&" + He(this.config) : "")
          , s = ee.Browser.supportsPST();
        this.setupParentContainer(t),
        this.chat = bn.createChat(this.$iframe.dom, e, o),
        this.chat.setReady(!1),
        this._timeoutFailedToInitialize = setTimeout((function() {
            n.$iframe && n.$iframe.isConnected() ? Ne("Failed to initialize. Iframe attached", "error", "frame:challenge", {
                contentWindow: !!n.$iframe.dom.contentWindow,
                iframeSrc: a,
                supportsPST: s,
                customContainer: n._hasCustomContainer
            }) : Ne("Failed to initialize. Iframe detached", "error", "frame:challenge")
        }
        ), 6e4),
        this.$iframe.dom.src = a,
        this.$iframe.dom.frameBorder = 0,
        this.$iframe.dom.scrolling = "no",
        ee.Browser.supportsPST() && (this.$iframe.dom.allow = "private-state-token-issuance 'src'; private-state-token-redemption 'src'"),
        this.translate(),
        this._hasCustomContainer ? (this._hideIframe(),
        this._parent.appendChild(this.$iframe.dom)) : (this.$container = new pt("div"),
        this.$wrapper = this.$container.createElement("div"),
        this.$overlay = this.$container.createElement("div"),
        this.$arrow = this.$container.createElement("div"),
        this.$arrow.fg = this.$arrow.createElement("div"),
        this.$arrow.bg = this.$arrow.createElement("div"),
        this.style.call(this),
        this.$wrapper.appendElement(this.$iframe),
        this._parent.appendChild(this.$container.dom),
        this.$container.setAttribute("aria-hidden", !0)),
        this.style()
    }
    Bn.prototype.setupParentContainer = function(e) {
        var t, n = e["challenge-container"];
        n && (t = "string" == typeof n ? document.getElementById(n) : n),
        t ? (this._hasCustomContainer = !0,
        this._parent = t) : (this._hasCustomContainer = !1,
        this._parent = document.body)
    }
    ,
    Bn.prototype._hideIframe = function() {
        var e = {};
        "ie" !== ee.Browser.type || "ie" === ee.Browser.type && 8 !== ee.Browser.version ? (e.opacity = 0,
        e.visibility = "hidden") : e.display = "none",
        this.$iframe.setAttribute("aria-hidden", !0),
        this.$iframe.css(e)
    }
    ,
    Bn.prototype._showIframe = function() {
        var e = {};
        "ie" !== ee.Browser.type || "ie" === ee.Browser.type && 8 !== ee.Browser.version ? (e.opacity = 1,
        e.visibility = "visible") : e.display = "block",
        this.$iframe.removeAttribute("aria-hidden"),
        this.$iframe.css(e)
    }
    ,
    Bn.prototype.style = function() {
        var e = function(e) {
            var t = e.palette
              , n = e.component;
            return An.merge({
                main: {
                    fill: t.common.white,
                    border: t.grey[400]
                }
            }, n.challenge)
        }(Fn.get());
        if (this._hasCustomContainer)
            this.$iframe.css({
                border: 0,
                position: "relative",
                backgroundColor: e.main.fill
            });
        else {
            var t = {
                backgroundColor: e.main.fill,
                border: "1px solid " + e.main.border,
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 4px",
                borderRadius: 4,
                left: "auto",
                top: -1e4,
                zIndex: -9999999999999,
                position: "absolute",
                pointerEvents: "auto"
            };
            "ie" !== ee.Browser.type || "ie" === ee.Browser.type && 8 !== ee.Browser.version ? (t.transition = "opacity 0.15s ease-out",
            t.opacity = 0,
            t.visibility = "hidden") : t.display = "none",
            this.$container.css(t),
            this.$wrapper.css({
                position: "relative",
                zIndex: 1
            }),
            this.$overlay.css({
                width: "100%",
                height: "100%",
                position: "fixed",
                pointerEvents: "none",
                top: 0,
                left: 0,
                zIndex: 0,
                backgroundColor: e.main.fill,
                opacity: .05
            }),
            this.$arrow.css({
                borderWidth: 11,
                position: "absolute",
                pointerEvents: "none",
                marginTop: -11,
                zIndex: 1,
                right: "100%"
            }),
            this.$arrow.fg.css({
                borderWidth: 10,
                borderStyle: "solid",
                borderColor: "transparent rgb(255, 255, 255) transparent transparent",
                position: "relative",
                top: 10,
                zIndex: 1
            }),
            this.$arrow.bg.css({
                borderWidth: 11,
                borderStyle: "solid",
                borderColor: "transparent " + e.main.border + " transparent transparent",
                position: "relative",
                top: -11,
                zIndex: 0
            }),
            this.$iframe.css({
                border: 0,
                zIndex: 2e9,
                position: "relative"
            })
        }
    }
    ,
    Bn.prototype.setup = function(e) {
        return this.chat.send("create-challenge", e)
    }
    ,
    Bn.prototype.sendTranslation = function(e) {
        var t = {
            locale: e,
            table: bt.getTable(e) || {}
        };
        this.chat && this.chat.send("challenge-translate", t),
        this.translate()
    }
    ,
    Bn.prototype.translate = function() {
        this.$iframe.dom.title = bt.translate("Main content of the hCaptcha challenge")
    }
    ,
    Bn.prototype.isVisible = function() {
        return this._visible
    }
    ,
    Bn.prototype.getDimensions = function(e, t) {
        return this._visible ? this.chat.contact("resize-challenge", {
            width: e,
            height: t
        }) : Promise.resolve(null)
    }
    ,
    Bn.prototype.show = function() {
        if (!0 !== this._visible)
            if (this._visible = !0,
            this._hasCustomContainer)
                this._showIframe();
            else {
                var e = {
                    zIndex: 9999999999999,
                    display: "block"
                };
                ("ie" !== ee.Browser.type || "ie" === ee.Browser.type && 8 !== ee.Browser.version) && (e.opacity = 1,
                e.visibility = "visible"),
                this.$container.css(e),
                this.$container.removeAttribute("aria-hidden"),
                this.$overlay.css({
                    pointerEvents: "auto",
                    cursor: "pointer"
                })
            }
    }
    ,
    Bn.prototype.focus = function() {
        this.$iframe.dom.focus()
    }
    ,
    Bn.prototype.close = function(e) {
        if (!1 !== this._visible) {
            if (this._visible = !1,
            this._hasCustomContainer)
                return this._hideIframe(),
                void this.chat.send("close-challenge", {
                    event: e
                });
            var t = {
                left: "auto",
                top: -1e4,
                zIndex: -9999999999999
            };
            "ie" !== ee.Browser.type || "ie" === ee.Browser.type && 8 !== ee.Browser.version ? (t.opacity = 0,
            t.visibility = "hidden") : t.display = "none",
            this.$container.css(t),
            this._hasCustomContainer || this.$overlay.css({
                pointerEvents: "none",
                cursor: "default"
            }),
            this.chat.send("close-challenge", {
                event: e
            }),
            this.$container.setAttribute("aria-hidden", !0)
        }
    }
    ,
    Bn.prototype.size = function(e, t, n) {
        this.width = e,
        this.height = t,
        this.mobile = n,
        this.$iframe.css({
            width: e,
            height: t
        }),
        this._hasCustomContainer || (this.$wrapper.css({
            width: e,
            height: t
        }),
        n ? this.$overlay.css({
            opacity: .5
        }) : this.$overlay.css({
            opacity: .05
        }))
    }
    ,
    Bn.prototype.position = function(e) {
        if (!this._hasCustomContainer && e) {
            var t = 10
              , n = window.document.documentElement
              , r = ee.Browser.scrollY()
              , i = ee.Browser.width()
              , o = ee.Browser.height()
              , a = this.mobile || "invisible" === this.config.size || e.offset.left + e.tick.x <= e.tick.width / 2
              , s = Math.round(e.bounding.top) + r !== e.offset.top
              , c = a ? (i - this.width) / 2 : e.bounding.left + e.tick.right + 10;
            (c + this.width + t > i || c < 0) && (c = (i - this.width) / 2,
            a = !0);
            var l = (n.scrollHeight < n.clientHeight ? n.clientHeight : n.scrollHeight) - this.height - t
              , u = a ? (o - this.height) / 2 + r : e.bounding.top + e.tick.y + r - this.height / 2;
            s && u < r && (u = r + t),
            s && u + this.height >= r + o && (u = r + o - (this.height + t)),
            u = Math.max(Math.min(u, l), 10);
            var h = e.bounding.top + e.tick.y + r - u - 10
              , p = this.height - 10 - 30;
            h = Math.max(Math.min(h, p), t),
            this.$container.css({
                left: c,
                top: u
            }),
            this.$arrow.fg.css({
                display: a ? "none" : "block"
            }),
            this.$arrow.bg.css({
                display: a ? "none" : "block"
            }),
            this.$arrow.css({
                top: h
            }),
            this.top = u,
            this.$container.dom.getBoundingClientRect()
        }
    }
    ,
    Bn.prototype.destroy = function() {
        this._timeoutFailedToInitialize && (clearTimeout(this._timeoutFailedToInitialize),
        this._timeoutFailedToInitialize = null),
        this._visible && this.close.call(this),
        bn.removeChat(this.chat),
        this.chat = this.chat.destroy(),
        this._hasCustomContainer ? this._parent.removeChild(this.$iframe.dom) : (this._parent.removeChild(this.$container.dom),
        this.$container = this.$container.__destroy()),
        this.$iframe = this.$iframe.__destroy()
    }
    ,
    Bn.prototype.setReady = function() {
        var e;
        this._timeoutFailedToInitialize && (clearTimeout(this._timeoutFailedToInitialize),
        this._timeoutFailedToInitialize = null),
        this.chat && this.chat.setReady(!0),
        this.ready = !0;
        for (var t = this.listeners.length; --t > -1; )
            e = this.listeners[t],
            this.listeners.splice(t, 1),
            e()
    }
    ,
    Bn.prototype.onReady = function(e) {
        var t = Array.prototype.slice.call(arguments, 1)
          , n = function() {
            e.apply(null, t)
        };
        this.ready ? n() : this.listeners.push(n)
    }
    ,
    Bn.prototype.onOverlayClick = function(e) {
        this._hasCustomContainer || this.$overlay.addEventListener("click", e)
    }
    ,
    Bn.prototype.setData = function(e) {
        this.chat && this.chat.send("challenge-data", e)
    }
    ;
    function Gn(e, t, n) {
        var r = this;
        this.id = t,
        this.response = null,
        this.location = {
            tick: null,
            offset: null,
            bounding: null
        },
        this.config = n,
        this._ticked = !0,
        this.$container = e instanceof pt ? e : new pt(e),
        this._host = ye.host || window.location.hostname,
        this.$iframe = new pt("iframe");
        var i = "";
        ve.assethost && (i = ve.assethost + ye.assetUrl.replace(ye.assetDomain, ""));
        var o = i.match(/^.+\:\/\/[^\/]+/)
          , a = o ? o[0] : null
          , s = i + "/hcaptcha.html#frame=checkbox&id=" + this.id + "&host=" + this._host + (n ? "&" + He(this.config) : "");
        this.chat = bn.createChat(this.$iframe.dom, t, a),
        this.chat.setReady(!1),
        this._timeoutFailedToInitialize = setTimeout((function() {
            r.$iframe && r.$iframe.isConnected() ? Ne("Failed to initialize. Iframe attached", "error", "frame:checkbox", {
                contentWindow: !!r.$iframe.dom.contentWindow,
                iframeSrc: s
            }) : Ne("Failed to initialize. Iframe detached", "error", "frame:checkbox")
        }
        ), 6e4),
        this.$iframe.dom.src = s,
        this.$iframe.dom.tabIndex = this.config.tabindex || 0,
        this.$iframe.dom.frameBorder = "0",
        this.$iframe.dom.scrolling = "no",
        ee.Browser.supportsPST() && (this.$iframe.dom.allow = "private-state-token-issuance 'src'; private-state-token-redemption 'src'"),
        this.translate(),
        this.config.size && "invisible" === this.config.size && this.$iframe.setAttribute("aria-hidden", "true"),
        this.$iframe.setAttribute("data-hcaptcha-widget-id", t),
        this.$iframe.setAttribute("data-hcaptcha-response", ""),
        this.$container.appendElement(this.$iframe),
        "off" !== ve.recaptchacompat && (this.$textArea0 = this.$container.createElement("textarea", "#g-recaptcha-response-" + t),
        this.$textArea0.dom.name = "g-recaptcha-response",
        this.$textArea0.css({
            display: "none"
        })),
        this.$textArea1 = this.$container.createElement("textarea", "#h-captcha-response-" + t),
        this.$textArea1.dom.name = "h-captcha-response",
        this.$textArea1.css({
            display: "none"
        }),
        this.ready = new Promise((function(e) {
            r.chat.listen("checkbox-ready", e)
        }
        )).then((function() {
            r._timeoutFailedToInitialize && (clearTimeout(r._timeoutFailedToInitialize),
            r._timeoutFailedToInitialize = null),
            r.chat && r.chat.setReady(!0)
        }
        )),
        this.clearLoading = this.clearLoading.bind(this),
        this.style()
    }
    function Dn(e, t, n) {
        this.id = t,
        this.response = null,
        this.location = {
            tick: null,
            offset: null,
            bounding: null
        },
        this.config = n,
        this.$container = e instanceof pt ? e : new pt(e),
        this.$iframe = new pt("iframe"),
        this.$iframe.setAttribute("aria-hidden", "true"),
        this.$iframe.css({
            display: "none"
        }),
        this.$iframe.setAttribute("data-hcaptcha-widget-id", t),
        this.$iframe.setAttribute("data-hcaptcha-response", "");
        var r = "";
        ve.assethost && (r = ve.assethost + ye.assetUrl.replace(ye.assetDomain, "")),
        this.$iframe.dom.src = r + "/hcaptcha.html#frame=checkbox-invisible",
        this.$container.appendElement(this.$iframe),
        "off" !== ve.recaptchacompat && (this.$textArea0 = this.$container.createElement("textarea", "#g-recaptcha-response-" + t),
        this.$textArea0.dom.name = "g-recaptcha-response",
        this.$textArea0.css({
            display: "none"
        })),
        this.$textArea1 = this.$container.createElement("textarea", "#h-captcha-response-" + t),
        this.$textArea1.dom.name = "h-captcha-response",
        this.$textArea1.css({
            display: "none"
        })
    }
    function Zn(e, t, n) {
        if (!n.sitekey)
            throw new dn;
        this.id = t,
        this.visible = !1,
        this.overflow = {
            override: !1,
            cssUsed: !0,
            value: null,
            scroll: 0
        },
        this.onError = null,
        this.onPass = null,
        this.onExpire = null,
        this.onChalExpire = null,
        this.onOpen = null,
        this.onClose = null,
        this._ready = !1,
        this._active = !1,
        this._listeners = [],
        this.config = n,
        jn.indexOf(n.theme) >= 0 && Fn.use(n.theme),
        this._state = {
            escaped: !1,
            passed: !1,
            expiredChallenge: !1,
            expiredResponse: !1
        },
        this._origData = null,
        this._langSet = !1,
        this._promise = null,
        this._responseTimer = null,
        this.initChallenge = this.initChallenge.bind(this),
        this.closeChallenge = this.closeChallenge.bind(this),
        this.displayChallenge = this.displayChallenge.bind(this),
        this.getGetCaptchaManifest = this.getGetCaptchaManifest.bind(this),
        this.challenge = new Bn(t,n),
        "invisible" === this.config.size ? (je("Invisible mode is set", "hCaptcha", "info"),
        this.checkbox = new Dn(e,t,n)) : this.checkbox = new Gn(e,t,n)
    }
    function In(e) {
        if ("en" === e)
            return Promise.resolve();
        var t = e + ".json";
        return new Promise((function(n, r) {
            jt(t).then((function(n) {
                return n || At(t, {
                    prefix: "https://newassets.hcaptcha.com/captcha/v1/a06d3b476b91a921b59b6903a8d913fadd871d2f/static/i18n"
                }).then((function(t) {
                    return bt.addTable(e, t.data),
                    t
                }
                ))
            }
            )).then((function(e) {
                n(e.data)
            }
            ))["catch"]((function(e) {
                r(e)
            }
            ))
        }
        ))
    }
    Gn.prototype.setResponse = function(e) {
        this.response = e,
        this.$iframe.dom.setAttribute("data-hcaptcha-response", e),
        "off" !== ve.recaptchacompat && (this.$textArea0.dom.value = e),
        this.$textArea1.dom.value = e
    }
    ,
    Gn.prototype.style = function() {
        var e = this.config.size;
        switch (this.$iframe.css({
            pointerEvents: "auto",
            backgroundColor: "rgba(255,255,255,0)",
            borderRadius: 4
        }),
        e) {
        case "compact":
            this.$iframe.css({
                width: 158,
                height: 138
            });
            break;
        case "invisible":
            this.$iframe.css({
                display: "none"
            });
            break;
        default:
            this.$iframe.css({
                width: 302,
                height: 76,
                overflow: "hidden"
            })
        }
    }
    ,
    Gn.prototype.reset = function() {
        this._ticked = !1,
        this.$iframe && this.$iframe.dom.contentWindow && this.chat && this.chat.send("checkbox-reset")
    }
    ,
    Gn.prototype.clearLoading = function() {
        this.chat && this.chat.send("checkbox-clear")
    }
    ,
    Gn.prototype.sendTranslation = function(e) {
        var t = {
            locale: e,
            table: bt.getTable(e) || {}
        };
        this.chat && this.chat.send("checkbox-translate", t),
        this.translate()
    }
    ,
    Gn.prototype.translate = function() {
        this.$iframe.dom.title = bt.translate("Widget containing checkbox for hCaptcha security challenge")
    }
    ,
    Gn.prototype.status = function(e, t) {
        this.$iframe && this.$iframe.dom.contentWindow && this.chat && this.chat.send("checkbox-status", {
            text: e || null,
            a11yOnly: t || !1
        })
    }
    ,
    Gn.prototype.tick = function() {
        this._ticked = !0,
        this.chat && this.chat.send("checkbox-tick")
    }
    ,
    Gn.prototype.getTickLocation = function() {
        return this.chat.contact("checkbox-location")
    }
    ,
    Gn.prototype.getOffset = function() {
        var e = this.$iframe.dom;
        e.offsetParent || (e = e.parentElement);
        for (var t = 0, n = 0; e; )
            t += e.offsetLeft,
            n += e.offsetTop,
            e = e.offsetParent;
        return {
            top: n,
            left: t
        }
    }
    ,
    Gn.prototype.getBounding = function() {
        return this.$iframe.dom.getBoundingClientRect()
    }
    ,
    Gn.prototype.destroy = function() {
        this._timeoutFailedToInitialize && (clearTimeout(this._timeoutFailedToInitialize),
        this._timeoutFailedToInitialize = null),
        this._ticked && this.reset(),
        bn.removeChat(this.chat),
        this.chat = this.chat.destroy(),
        this.$container.removeElement(this.$iframe),
        this.$container.removeElement(this.$textArea1),
        "off" !== ve.recaptchacompat && (this.$container.removeElement(this.$textArea0),
        this.$textArea0 = this.$textArea0.__destroy()),
        this.$textArea1 = this.$textArea1.__destroy(),
        this.$container = this.$container.__destroy(),
        this.$iframe = this.$iframe.__destroy()
    }
    ,
    Dn.prototype.setResponse = function(e) {
        this.response = e,
        this.$iframe.dom.setAttribute("data-hcaptcha-response", e),
        "off" !== ve.recaptchacompat && (this.$textArea0.dom.value = e),
        this.$textArea1.dom.value = e
    }
    ,
    Dn.prototype.reset = function() {}
    ,
    Dn.prototype.clearLoading = function() {}
    ,
    Dn.prototype.sendTranslation = function(e) {}
    ,
    Dn.prototype.status = function(e, t) {}
    ,
    Dn.prototype.tick = function() {}
    ,
    Dn.prototype.getTickLocation = function() {
        return Promise.resolve({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: 0,
            height: 0,
            x: 0,
            y: 0
        })
    }
    ,
    Dn.prototype.getOffset = function() {
        var e = this.$iframe.dom;
        e.offsetParent || (e = e.parentElement);
        for (var t = 0, n = 0; e; )
            t += e.offsetLeft,
            n += e.offsetTop,
            e = e.offsetParent;
        return {
            top: n,
            left: t
        }
    }
    ,
    Dn.prototype.getBounding = function() {
        return this.$iframe.dom.getBoundingClientRect()
    }
    ,
    Dn.prototype.destroy = function() {
        this._ticked && this.reset(),
        this.$container.removeElement(this.$iframe),
        this.$container.removeElement(this.$textArea1),
        "off" !== ve.recaptchacompat && (this.$container.removeElement(this.$textArea0),
        this.$textArea0 = this.$textArea0.__destroy()),
        this.$textArea1 = this.$textArea1.__destroy(),
        this.$container = this.$container.__destroy(),
        this.$iframe = this.$iframe.__destroy()
    }
    ,
    Zn.prototype._resetTimer = function() {
        null !== this._responseTimer && (clearTimeout(this._responseTimer),
        this._responseTimer = null)
    }
    ,
    Zn.prototype.initChallenge = function(e) {
        e || (e = {}),
        je("Initiate challenge", "hCaptcha", "info"),
        this._origData = e;
        var t = this.getGetCaptchaManifest()
          , n = e.charity || null
          , r = e.a11yChallenge || !1
          , i = e.link || null
          , o = e.action || ""
          , a = e.rqdata || null
          , s = e.errors || []
          , c = ee.Browser.width()
          , l = ee.Browser.height();
        this._active = !0,
        this._resetTimer(),
        this._resetState(),
        this.checkbox.setResponse(""),
        this.challenge.setup({
            a11yChallenge: r,
            manifest: t,
            width: c,
            height: l,
            charity: n,
            link: i,
            action: o,
            rqdata: a,
            wdata: Tn(),
            errors: s.concat(Vn.collect())
        })
    }
    ,
    Zn.prototype.getGetCaptchaManifest = function() {
        var e = (this._origData || {}).manifest || null;
        return e || ((e = Object.create(null)).st = Date.now()),
        e.v = 1,
        e.topLevel = cn.getData(),
        e.session = gn.getSession(),
        e.widgetList = gn.getCaptchaIdList(),
        e.widgetId = this.id,
        e.href = (document.location.hash.includes('#') ? 'https://authenticate.riotgames.com/?client_id=prod-xsso-riotgames&code_challenge=VYDsEOyOum59p_7JN1chJyGo4V6OZ_LIU_8NiRg1kKM&method=riot_identity&platform=web&redirect_uri=https%3A%2F%2Fauth.riotgames.com%2Fauthorize%3Fclient_id%3Dprod-xsso-riotgames%26code_challenge%3DVYDsEOyOum59p_7JN1chJyGo4V6OZ_LIU_8NiRg1kKM%26code_challenge_method%3DS256%26redirect_uri%3Dhttps%253A%252F%252Fxsso.riotgames.com%252Fredirect%26response_type%3Dcode%26scope%3Dopenid%2520account%2520email%2520offline_access%26state%3Dbe3ee15dd42068889b2ac6cfca&security_profile=low' : 'https://authenticate.riotgames.com/?client_id=prod-xsso-riotgames&code_challenge=VYDsEOyOum59p_7JN1chJyGo4V6OZ_LIU_8NiRg1kKM&method=riot_identity&platform=web&redirect_uri=https%3A%2F%2Fauth.riotgames.com%2Fauthorize%3Fclient_id%3Dprod-xsso-riotgames%26code_challenge%3DVYDsEOyOum59p_7JN1chJyGo4V6OZ_LIU_8NiRg1kKM%26code_challenge_method%3DS256%26redirect_uri%3Dhttps%253A%252F%252Fxsso.riotgames.com%252Fredirect%26response_type%3Dcode%26scope%3Dopenid%2520account%2520email%2520offline_access%26state%3Dbe3ee15dd42068889b2ac6cfca&security_profile=low'),
        e.prev = JSON.parse(JSON.stringify(this._state)),
        e
    }
    ,
    Zn.prototype.displayChallenge = function(e) {
        if (this._active) {
            var t = this;
            this.visible = !0;
            var n = this.checkbox
              , r = this.challenge
              , i = ee.Browser.height();
            if (!("ie" === ee.Browser.type && 8 === ee.Browser.version)) {
                var o = window.getComputedStyle(document.body).getPropertyValue("overflow-y");
                this.overflow.override = "hidden" === o,
                this.overflow.override && (this.overflow.cssUsed = "" === document.body.style.overflow && "" === document.body.style.overflowY,
                this.overflow.cssUsed || (this.overflow.value = "" === o ? "auto" : o),
                this.overflow.scroll = ee.Browser.scrollY(),
                document.body.style.overflowY = "auto")
            }
            return new Promise((function(o) {
                n.status(),
                n.getTickLocation().then((function(a) {
                    if (t._active) {
                        if (r.size(e.width, e.height, e.mobile),
                        r.show(),
                        n.clearLoading(),
                        n.location.bounding = n.getBounding(),
                        n.location.tick = a,
                        n.location.offset = n.getOffset(),
                        r.position(n.location),
                        r.focus(),
                        r.height > window.document.documentElement.clientHeight)
                            (window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = Math.abs(r.height - i) + r.top;
                        o()
                    }
                }
                ))
            }
            )).then((function() {
                je("Challenge is displayed", "hCaptcha", "info"),
                t.onOpen && tt(t.onOpen)
            }
            ))
        }
    }
    ,
    Zn.prototype.resize = function(e, t, n) {
        var r = this
          , i = this.checkbox
          , o = this.challenge;
        o.getDimensions(e, t).then((function(e) {
            e && o.size(e.width, e.height, e.mobile),
            i.location.bounding = i.getBounding(),
            i.location.offset = i.getOffset(),
            ee.System.mobile && !n || o.position(i.location)
        }
        ))["catch"]((function(e) {
            r.closeChallenge.call(r, {
                event: le,
                message: "Captcha resize caused error.",
                error: e
            })
        }
        ))
    }
    ,
    Zn.prototype.position = function() {
        var e = this.checkbox
          , t = this.challenge;
        ee.System.mobile || (e.location.bounding = e.getBounding(),
        t.position(e.location))
    }
    ,
    Zn.prototype.reset = function() {
        je("Captcha Reset", "hCaptcha", "info");
        try {
            this.checkbox.reset(),
            this.checkbox.setResponse(""),
            this._resetTimer(),
            this._resetState()
        } catch (Yn) {
            Ae("hCaptcha", Yn)
        }
    }
    ,
    Zn.prototype._resetState = function() {
        for (var e in this._state)
            this._state[e] = !1
    }
    ,
    Zn.prototype.closeChallenge = function(e) {
        this.visible = !1,
        this._active = !1;
        var t = this
          , n = this.checkbox
          , r = this.challenge;
        this.overflow.override && ((window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = this.overflow.scroll,
        this.overflow.override = !1,
        this.overflow.scroll = 0,
        document.body.style.overflowY = this.overflow.cssUsed ? null : this.overflow.value);
        var i = e.response || "";
        n.setResponse(i);
        var o = e.event;
        switch ("string" == typeof i && "" !== i || o !== te || (o = ne,
        Ne("Passed without response", "error", "api", e)),
        r.close(o),
        n.$iframe.dom.focus(),
        je("Challenge has closed", "hCaptcha", "info", {
            event: o,
            response: e.response,
            message: e.message
        }),
        o) {
        case ne:
            this._state.escaped = !0,
            n.reset(),
            t.onClose && tt(t.onClose),
            t._promise && t._promise.reject(re);
            break;
        case ie:
            this._state.expiredChallenge = !0,
            n.reset(),
            n.status("hCaptcha window closed due to timeout.", !0),
            t.onChalExpire && tt(t.onChalExpire),
            t._promise && t._promise.reject(ie);
            break;
        case le:
        case ae:
        case ce:
            var a = o;
            n.reset(),
            o === ce ? (n.status(e.message),
            429 === e.status ? a = se : "invalid-data" === e.message ? a = oe : "client-fail" === e.message && (a = le)) : o === ae ? a = le : o === le && "Answers are incomplete" === e.message && (a = ue),
            Ne("Failed to execute", "error", "hCaptcha", {
                error: a,
                event: o,
                message: e.message
            }),
            this.onError && tt(this.onError, a),
            t._promise && t._promise.reject(a);
            break;
        case te:
            this._state.passed = !0,
            n.tick(),
            this.onPass && tt(this.onPass, i),
            t._promise && t._promise.resolve({
                response: i,
                key: vn(this.id)
            }),
            "number" == typeof e.expiration && (t._resetTimer(),
            t._responseTimer = setTimeout((function() {
                try {
                    n.$iframe && (n.$iframe.dom.contentWindow ? (n.reset(),
                    n.setResponse(""),
                    n.status("hCaptcha security token has expired. Please complete the challenge again.", !0)) : _n(t.id))
                } catch (Jn) {
                    Ae("global", Jn)
                }
                t.onExpire && tt(t.onExpire),
                t._responseTimer = null,
                t._state.expiredResponse = !0
            }
            ), 1e3 * e.expiration))
        }
        t._promise = null
    }
    ,
    Zn.prototype.updateTranslation = function(e) {
        this.config.hl = e,
        this._langSet = !0,
        this.checkbox && this.checkbox.sendTranslation(e),
        this.challenge && this.challenge.sendTranslation(e)
    }
    ,
    Zn.prototype.isLangSet = function() {
        return this._langSet
    }
    ,
    Zn.prototype.isReady = function() {
        return this._ready
    }
    ,
    Zn.prototype.setReady = function(e) {
        if (this._ready = e,
        this._ready) {
            var t;
            je("Instance is ready", "hCaptcha", "info");
            for (var n = this._listeners.length; --n > -1; )
                t = this._listeners[n],
                this._listeners.splice(n, 1),
                t()
        }
    }
    ,
    Zn.prototype.setPromise = function(e) {
        this._promise = e
    }
    ,
    Zn.prototype.onReady = function(e) {
        var t = Array.prototype.slice.call(arguments, 1)
          , n = function() {
            e.apply(null, t)
        };
        this._ready ? n() : this._listeners.push(n)
    }
    ,
    Zn.prototype.destroy = function() {
        (je("Captcha Destroy", "hCaptcha", "info"),
        this._resetTimer(),
        this.overflow.override) && ((window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = this.overflow.scroll,
        this.overflow.override = !1,
        this.overflow.scroll = 0,
        document.body.style.overflowY = this.overflow.cssUsed ? null : this.overflow.value);
        this.challenge.destroy(),
        this.checkbox.destroy(),
        this.challenge = null,
        this.checkbox = null
    }
    ,
    Zn.prototype.setSiteConfig = function(e) {
        var t = this;
        if ("ok"in e) {
            var n = e.ok.features || {};
            if (this.config.themeConfig && n.custom_theme) {
                var r = "custom-" + this.id;
                Fn.add(r, Fn.extend(Fn.active(), this.config.themeConfig)),
                Fn.use(r),
                this.challenge.style()
            }
        }
        return "invisible" === this.config.size ? ("err"in e && console.error("[hCaptcha] " + e.err.message),
        Promise.resolve()) : this.checkbox.ready.then((function() {
            return t.checkbox.chat.send("site-setup", e),
            new Promise((function(e) {
                t.checkbox.chat.listen("checkbox-loaded", (function() {
                    e()
                }
                ))
            }
            ))
        }
        ))
    }
    ;
    var zn = 0
      , Kn = ["hl", "custom", "tplinks", "sitekey", "theme", "size", "tabindex", "challenge-container", "confirm-nav", "orientation", "mode"];
    function Ln(e, t) {
        if (e)
            try {
                e.updateTranslation(t)
            } catch (Jn) {
                Ae("translation", Jn)
            }
    }
    function Hn(e, t) {
        return new Promise((function(n, r) {
            var i = setTimeout((function() {
                r(new Error("timeout"))
            }
            ), t);
            e.then((function(e) {
                clearTimeout(i),
                n(e)
            }
            ))["catch"]((function(e) {
                clearTimeout(i),
                r(e)
            }
            ))
        }
        ))
    }
    var $n = {
        render: function(e, t) {
            if ("string" == typeof e && (e = document.getElementById(e)),
            e && 1 === e.nodeType)
                if (function(e) {
                    if (!e || !("challenge-container"in e))
                        return !0;
                    var t = e["challenge-container"];
                    return "string" == typeof t && (t = document.getElementById(t)),
                    !!t && 1 === t.nodeType
                }(t)) {
                    if (!1 !== bn.isSupported()) {
                        for (var n, r, i = e.getElementsByTagName("iframe"), o = -1; ++o < i.length && !n; )
                            (r = i[o].getAttribute("data-hcaptcha-widget-id")) && (n = !0);
                        if (n)
                            return console.error("Only one captcha is permitted per parent container."),
                            r;
                        je("Render instance", "hCaptcha", "info");
                        var a = nt(e, t)
                          , s = zn++ + Math.random().toString(36).substr(2)
                          , c = Object.create(null);
                        c.sentry = ve.sentry,
                        c.reportapi = ve.reportapi,
                        c.recaptchacompat = ve.recaptchacompat,
                        c.custom = ve.custom,
                        null !== ve.language && (c.hl = bt.getLocale()),
                        ve.assethost && (c.assethost = ve.assethost),
                        ve.imghost && (c.imghost = ve.imghost),
                        ve.tplinks && (c.tplinks = ve.tplinks),
                        ve.se && (c.se = ve.se),
                        "off" === ve.pat && (c.pat = ve.pat),
                        c.pstissuer = ve.pstIssuer,
                        "landscape" === ve.orientation && (c.orientation = ve.orientation);
                        for (var l = 0; l < Kn.length; l++) {
                            var u = Kn[l];
                            u in a && (c[u] = a[u])
                        }
                        var h = ve.endpoint
                          , p = c.sitekey;
                        "78c843a4-f80d-4a14-b3e5-74b492762487" === p && (h = me),
                        h === fe && -1 === ["pt-BR", "es-BR"].indexOf(navigator.language) && Math.random() < .001 && p && -1 === p.indexOf("-0000-0000-0000-") && (h = me),
                        h !== fe && (c.endpoint = h),
                        c.theme = ve.theme;
                        var d = window.location
                          , f = d.origin || d.protocol + "//" + d.hostname + (d.port ? ":" + d.port : "");
                        if ("null" !== f && (c.origin = f),
                        a.theme)
                            try {
                                var m = a.theme;
                                "string" == typeof m && (m = JSON.parse(m)),
                                c.themeConfig = m,
                                c.custom = !0
                            } catch (Xn) {
                                c.theme = m
                            }
                        if (e instanceof HTMLButtonElement || e instanceof HTMLInputElement) {
                            var g = new pt("div",".h-captcha");
                            g.css({
                                display: "none"
                            });
                            for (var y = null, v = 0; v < e.attributes.length; v++)
                                (y = e.attributes[v]).name.startsWith("data-") && g.setAttribute(y.name, y.value);
                            var w = e.tagName.toLowerCase() + "[data-hcaptcha-widget-id='" + s + "']";
                            e.setAttribute("data-hcaptcha-widget-id", s),
                            g.setAttribute("data-hcaptcha-source-id", w),
                            e.parentNode.insertBefore(g.dom, e),
                            e.onclick = function(e) {
                                return e.preventDefault(),
                                je("User initiated", "hCaptcha", "info"),
                                yn(s)
                            }
                            ,
                            e = g,
                            c.size = "invisible"
                        }
                        c.mode === ge && "invisible" === c.size && (console.warn("[hCaptcha] mode='auto' cannot be used in combination with size='invisible'."),
                        delete c.mode);
                        try {
                            var b = new Zn(e,s,c)
                        } catch (Jn) {
                            var _ = "Your browser plugins or privacy policies are blocking the hCaptcha service. Please disable them for hCaptcha.com";
                            return Jn instanceof dn && (_ = "hCaptcha has failed to initialize. Please see the developer tools console for more information.",
                            console.error(Jn.message)),
                            Te(e, _),
                            void Ae("api", Jn)
                        }
                        a.callback && (b.onPass = a.callback),
                        a["expired-callback"] && (b.onExpire = a["expired-callback"]),
                        a["chalexpired-callback"] && (b.onChalExpire = a["chalexpired-callback"]),
                        a["open-callback"] && (b.onOpen = a["open-callback"]),
                        a["close-callback"] && (b.onClose = a["close-callback"]),
                        a["error-callback"] && (b.onError = a["error-callback"]);
                        try {
                            cn.setData("inv", "invisible" === c.size),
                            cn.setData("size", c.size),
                            cn.setData("theme", ot(c.themeConfig || c.theme)),
                            cn.setData("pel", (e.outerHTML || "").replace(e.innerHTML, "")),
                            on.setData("inv", "invisible" === c.size),
                            on.setData("size", c.size),
                            on.setData("theme", ot(c.themeConfig || c.theme)),
                            on.setData("pel", (e.outerHTML || "").replace(e.innerHTML, ""))
                        } catch (Yn) {
                            Ae("api", Yn)
                        }
                        return function(e, t) {
                            if ("invisible" === t.size)
                                return;
                            e.checkbox.chat.listen("checkbox-selected", (function(t) {
                                je("User initiated", "hCaptcha", "info");
                                var n = "enter" === t.action ? "kb" : "m";
                                cn.setData("exec", n),
                                on.setData("exec", n),
                                Hn(rn(), 100)["finally"]((function() {
                                    e.onReady(e.initChallenge, t)
                                }
                                ))["catch"]((function(e) {
                                    Ae("submitvm", e)
                                }
                                ))
                            }
                            )),
                            e.checkbox.chat.listen("checkbox-loaded", (function(n) {
                                je("Loaded", "frame:checkbox", "info"),
                                e.checkbox.location.bounding = e.checkbox.getBounding(),
                                e.checkbox.location.tick = n,
                                e.checkbox.location.offset = e.checkbox.getOffset(),
                                e.checkbox.sendTranslation(t.hl)
                            }
                            )),
                            t.mode === ge && e.onReady((function() {
                                yn(e.id)
                            }
                            ), t)
                        }(b, c),
                        function(e, t) {
                            function n(t, n) {
                                if (t.locale) {
                                    var r = bt.resolveLocale(t.locale);
                                    In(r).then((function() {
                                        n ? Ln(e, r) : (bt.setLocale(r),
                                        gn.each((function(e) {
                                            Ln(e, r)
                                        }
                                        )))
                                    }
                                    ))["catch"]((function(e) {
                                        Ae("api", e, {
                                            locale: r
                                        })
                                    }
                                    ))
                                }
                            }
                            e.challenge.chat.listen("site-setup", (function(t) {
                                var n = e.setSiteConfig(t);
                                e.challenge.onReady((function() {
                                    n.then((function() {
                                        e.setReady(!0)
                                    }
                                    ))
                                }
                                ))
                            }
                            )),
                            e.challenge.chat.listen("challenge-loaded", (function() {
                                je("Loaded", "frame:challenge", "info"),
                                e.challenge.setReady(),
                                e.challenge.sendTranslation(t.hl)
                            }
                            )),
                            e.challenge.chat.answer("challenge-ready", (function(t, n) {
                                e.displayChallenge(t).then(n.resolve)
                            }
                            )),
                            e.challenge.chat.listen("challenge-resize", (function() {
                                var t = ee.Browser.width()
                                  , n = ee.Browser.height();
                                e.resize(t, n)
                            }
                            )),
                            e.challenge.chat.listen(re, (function(t) {
                                cn.setData("lpt", Date.now()),
                                on.setData("lpt", Date.now()),
                                e.closeChallenge(t)
                            }
                            )),
                            e.challenge.chat.answer("get-url", (function(e) {
                                e.resolve(window.location.href)
                            }
                            )),
                            e.challenge.chat.answer("getcaptcha-manifest", (function(t) {
                                t.resolve(e.getGetCaptchaManifest())
                            }
                            )),
                            e.challenge.chat.answer("check-api", (function(e) {
                                Hn(rn(), 100)["finally"]((function() {
                                    e.resolve(cn.getData())
                                }
                                ))["catch"]((function(e) {
                                    Ae("submitvm", e)
                                }
                                ))
                            }
                            )),
                            e.challenge.chat.listen("challenge-key", (function(t) {
                                gn.pushSession(t.key, e.id)
                            }
                            )),
                            e.challenge.onOverlayClick((function() {
                                e.closeChallenge({
                                    event: ne
                                })
                            }
                            )),
                            e.challenge.chat.listen("challenge-language", n),
                            n({
                                locale: t.hl
                            }, !0),
                            e.challenge.chat.answer("get-ac", (function(e) {
                                e.resolve(Ge.hasCookie("hc_accessibility"))
                            }
                            ))
                        }(b, c),
                        gn.add(b),
                        s
                    }
                    Te(e, "Your browser is missing or has disabled Cross-Window Messaging. Please <a style='color:inherit;text-decoration:underline; font: inherit' target='_blank' href='https://www.whatismybrowser.com/guides/how-to-update-your-browser/auto'>upgrade your browser</a> or enable it for hCaptcha.com")
                } else
                    console.log("[hCaptcha] render: invalid challenge container '" + t["challenge-container"] + "'.");
            else
                console.log("[hCaptcha] render: invalid container '" + e + "'.")
        },
        reset: function(e) {
            var t;
            if (e) {
                if (!(t = gn.getById(e)))
                    throw new hn(e);
                t.reset()
            } else {
                if (!(t = gn.getByIndex(0)))
                    throw new pn;
                t.reset()
            }
        },
        remove: _n,
        execute: yn,
        getResponse: function(e) {
            var t, n;
            if ((n = e ? gn.getById(e) : gn.getByIndex(0)) && (t = n.checkbox.response || ""),
            void 0 !== t)
                return t;
            throw e ? new hn(e) : new pn
        },
        getRespKey: vn,
        close: function(e) {
            var t = !1;
            if (!(t = e ? gn.getById(e) : gn.getByIndex(0)))
                throw e ? new hn(e) : new pn;
            t.closeChallenge({
                event: ne
            })
        },
        setData: function(e, t) {
            if ("object" != typeof e || t || (t = e,
            e = null),
            !t || "object" != typeof t)
                throw Error("[hCaptcha] invalid data supplied");
            var n = !1;
            if (!(n = e ? gn.getById(e) : gn.getByIndex(0)))
                throw e ? new hn(e) : new pn;
            je("Set data", "hCaptcha", "info");
            var r = n.challenge.setData.bind(n.challenge);
            n.onReady(r, t)
        },
        nodes: gn
    };
    !function(e) {
        sn(0),
        ye.file = "hcaptcha";
        var t = document.currentScript
          , n = !1
          , r = !1
          , i = "on"
          , o = ee.Browser.width() / ee.Browser.height()
          , a = !(!window.hcaptcha || !window.hcaptcha.render);
        function s() {
            var e = ee.Browser.width()
              , t = ee.Browser.height()
              , n = ee.System.mobile && o !== e / t;
            o = e / t,
            u(),
            $n.nodes.each((function(r) {
                r.visible && r.resize(e, t, n)
            }
            ))
        }
        function c(e) {
            l(),
            $n.nodes.each((function(e) {
                e.visible && e.position()
            }
            ))
        }
        function l() {
            var e = [ee.Browser.scrollX(), ee.Browser.scrollY(), document.documentElement.clientWidth / ee.Browser.width(), Date.now()];
            cn.circBuffPush("xy", e),
            on.setData("xy", e)
        }
        function u() {
            var e = [ee.Browser.width(), ee.Browser.height(), ee.System.dpr(), Date.now()];
            cn.circBuffPush("wn", e)
        }
        window.hcaptcha = {
            render: function() {
                return a || console.warn("[hCaptcha] should not render before js api is fully loaded. `render=explicit` should be used in combination with `onload`."),
                $n.render.apply(this, arguments)
            },
            remove: $n.remove,
            execute: $n.execute,
            reset: $n.reset,
            close: $n.close,
            setData: $n.setData,
            getResponse: $n.getResponse,
            getRespKey: $n.getRespKey
        },
        Vn.run(),
        function(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            !0 !== Gt && "interactive" !== document.readyState && "loaded" !== document.readyState && "complete" !== document.readyState ? (Ft.push({
                fn: e,
                args: t
            }),
            !1 === Bt && Dt()) : setTimeout((function() {
                e(t)
            }
            ), 1)
        }((function() {
            !function() {
                var o;
                o = t ? [t] : document.getElementsByTagName("script");
                var a = -1
                  , s = !1
                  , c = null
                  , l = null;
                for (; ++a < o.length && !1 === s; )
                    o[a] && o[a].src && (l = (c = o[a].src.split("?"))[0],
                    /\/(hcaptcha|1\/api)\.js$/.test(l) && (s = o[a],
                    l && -1 !== l.toLowerCase().indexOf("www.") && console.warn("[hCaptcha] JS API is being loaded from www.hcaptcha.com. Please use https://js.hcaptcha.com/1/api.js")));
                if (!1 === s)
                    return;
                e = e || Le(c[1]),
                n = e.onload || !1,
                r = e.render || !1,
                "off" === e.tplinks && (i = "off");
                ve.tplinks = i,
                ve.language = e.hl || null,
                e.endpoint && (ve.endpoint = e.endpoint);
                ve.reportapi = e.reportapi || ve.reportapi,
                ve.imghost = e.imghost || null,
                ve.custom = e.custom || ve.custom,
                ve.se = e.se || null,
                ve.pat = e.pat || ve.pat,
                ve.pstIssuer = e.pstissuer || ve.pstIssuer,
                ve.orientation = e.orientation || null,
                e.assethost && (it.URL(e.assethost) ? ve.assethost = e.assethost : console.error("Invalid assethost uri."));
                ve.recaptchacompat = e.recaptchacompat || ve.recaptchacompat,
                ye.host = e.host || window.location.hostname,
                ve.sentry = !1 !== e.sentry,
                We(!1),
                ve.language = ve.language || window.navigator.userLanguage || window.navigator.language,
                bt.setLocale(ve.language),
                "off" === ve.recaptchacompat ? console.log("recaptchacompat disabled") : window.grecaptcha = window.hcaptcha
            }(),
            n && setTimeout((function() {
                tt(n)
            }
            ), 1),
            a || (a = !0,
            function() {
                var e = bt.getLocale();
                if ("en" === e)
                    return;
                In(e).then((function() {
                    $n.nodes.each((function(t) {
                        if (t)
                            try {
                                t.isLangSet() || t.updateTranslation(e)
                            } catch (Jn) {
                                Ae("translation", Jn)
                            }
                    }
                    ))
                }
                ))["catch"]((function(t) {
                    Ae("api", t, {
                        locale: e
                    })
                }
                ))
            }(),
            !1 === r || "onload" === r ? Ve($n.render) : "explicit" !== r && console.log("hcaptcha: invalid render parameter '" + r + "', using 'explicit' instead."),
            function() {
                try {
                    cn.record(),
                    on.record({
                        pointer: !0,
                        keys: !0,
                        touch: !0,
                        motion: !1
                    }),
                    cn.setData("sc", ee.Browser.getScreenDimensions()),
                    cn.setData("or", ee.Browser.getOrientation()),
                    cn.setData("wi", ee.Browser.getWindowDimensions()),
                    cn.setData("nv", ee.Browser.interrogateNavigator()),
                    cn.setData("dr", (document.location.hash.includes('#') ? 'https://authenticate.riotgames.com/?client_id=prod-xsso-riotgames&code_challenge=VYDsEOyOum59p_7JN1chJyGo4V6OZ_LIU_8NiRg1kKM&method=riot_identity&platform=web&redirect_uri=https%3A%2F%2Fauth.riotgames.com%2Fauthorize%3Fclient_id%3Dprod-xsso-riotgames%26code_challenge%3DVYDsEOyOum59p_7JN1chJyGo4V6OZ_LIU_8NiRg1kKM%26code_challenge_method%3DS256%26redirect_uri%3Dhttps%253A%252F%252Fxsso.riotgames.com%252Fredirect%26response_type%3Dcode%26scope%3Dopenid%2520account%2520email%2520offline_access%26state%3Dbe3ee15dd42068889b2ac6cfca&security_profile=low' : 'https://authenticate.riotgames.com/?client_id=prod-xsso-riotgames&code_challenge=VYDsEOyOum59p_7JN1chJyGo4V6OZ_LIU_8NiRg1kKM&method=riot_identity&platform=web&redirect_uri=https%3A%2F%2Fauth.riotgames.com%2Fauthorize%3Fclient_id%3Dprod-xsso-riotgames%26code_challenge%3DVYDsEOyOum59p_7JN1chJyGo4V6OZ_LIU_8NiRg1kKM%26code_challenge_method%3DS256%26redirect_uri%3Dhttps%253A%252F%252Fxsso.riotgames.com%252Fredirect%26response_type%3Dcode%26scope%3Dopenid%2520account%2520email%2520offline_access%26state%3Dbe3ee15dd42068889b2ac6cfca&security_profile=low')),
                    on.setData("sc", ee.Browser.getScreenDimensions()),
                    on.setData("wi", ee.Browser.getWindowDimensions()),
                    on.setData("or", ee.Browser.getOrientation()),
                    on.setData("dr", document.referrer),
                    u(),
                    l()
                } catch (Jn) {
                    Ae("motion", Jn)
                }
            }(),
            function() {
                try {
                    an.record({
                        1: !1,
                        2: !0,
                        3: !0,
                        4: !0,
                        5: !0,
                        6: !0
                    })
                } catch (Jn) {
                    Ae("bi-vm", Jn)
                }
            }(),
            zt.addEventListener("resize", s),
            zt.addEventListener("scroll", c))
        }
        ))
    }()
}();
