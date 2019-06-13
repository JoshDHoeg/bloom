function() {
    function e(e) {
        var n = {};
        e.split("&").forEach(function(e) {
            if (!e) return;
            e = e.split("+").join(" ");
            var t = e.indexOf("=");
            var o = t > -1 ? e.substr(0, t) : e;
            var r = t > -1 ? decodeURIComponent(e.substr(t + 1)) : "";
            var i = o.indexOf("[");
            if (i == -1) n[decodeURIComponent(o)] = r;
            else {
                var f = o.indexOf("]");
                var a = decodeURIComponent(o.substring(i + 1, f));
                o = decodeURIComponent(o.substring(0, i));
                if (!n[o]) n[o] = [];
                if (!a) n[o].push(r);
                else n[o][a] = r
            }
        });
        return n
    }

    function n(e) {
        var n = e.offsetTop;
        var t = e;
        while (t.offsetParent && t.offsetParent != document.body) {
            t = t.offsetParent;
            n += t.offsetTop
        }
        if (typeof e.getAttribute == "function") {
            var o = parseInt(e.getAttribute("data-offset-top"));
            if (o) n -= o
        }
        return n
    }

    function t(e, n) {
        var t = document.documentElement,
            o = document.body;
        var r = t && t.scrollLeft || o && o.scrollLeft || 0;
        var i = t && t.scrollTop || o && o.scrollTop || 0;
        var f = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        if (n && (i < e && e < i + f)) {
            return
        }
        if (window.scrollTo != "undefined") window.scrollTo(r, e < 0 ? 0 : e)
    }

    function o(e, n, t) {
        if (e.addEventListener) e.addEventListener(n, t, false);
        else if (e.attachEvent) e.attachEvent("on" + n, t)
    }

    function r(e, n) {
        if (typeof e != "undefined" && typeof e.contentWindow != "undefined" && typeof e.contentWindow.postMessage == "function") {
            e.contentWindow.postMessage(n, "*")
        }
    }

    function i(e) {
        var n = 0;
        var t = 20;
        var o;
        var i = function() {
            if (n > t - 1) {
                clearInterval(o);
                return
            }
            n++;
            var i = undefined;
            if (typeof ga != "undefined") {
                i = ga
            } else if (typeof __gaTracker != "undefined") {
                i = __gaTracker
            } else {
                return
            }
            i(function(o) {
                if (n > t - 1) {
                    return
                }
                if (!o) o = i.getAll()[0];
                var f = o.get("clientId");
                if (f) {
                    t = 0;
                    r(e, "gacid:" + f)
                }
            })
        };
        o = setInterval(i, 250);
        i()
    }

    function f(e) {
        var o = +new Date;
        if (!e.hasLoaded || o - e.hasLoaded < 500) {
            e.hasLoaded = o;
            i(e)
        } else if (typeof window.scrollTo != "undefined") {
            t(n(e))
        }
        r(e, "acuity:init")
    }

    function a(e, o) {
        if (!e || !o) return;
        if (typeof e.contentWindow != "undefined" && typeof o.source != "undefined" && e.contentWindow !== o.source) {
            return
        }
        if (typeof o.data == "undefined" || typeof o.data.split == "undefined") return;
        try {
            var r = o.data.split(":");
            var i = r[0];
            var a = parseInt(r[1]);
            if (i == "sizing" && a > 150) {
                if (typeof e.origCss == "undefined") {
                    e.origCss = e.style.cssText
                }
                e.style.cssText = (e.origCss ? e.origCss + ";" : "") + "height:" + a + "px !important;max-height:none;overflow:hidden;"
            } else if (i == "load") {
                f(e)
            } else if (i == "scrollTo" && parseInt(a)) {
                t(n(e) + a, true)
            }
        } catch (e) {
            return //try to implement hook here
        }
    }

    function s(n) {
        var t = [/first_name/, /last_name/, /firstName/, /lastName/, /phone/, /email/, /certificate/, /datetime/, /field:[0-9]+?/, /appointmentType/, /appointmentTypeID/, /calendarID/];
        var o = e(location.search.substr(1));
        var r = newIfrSrc = n.src;
        for (var i in o) {
            for (var f = 0; f < t.length; f++) {
                var a = t[f];
                if (i.match(a) && r.indexOf(i + "=") === -1) {
                    var s = o[i];
                    var d = encodeURIComponent(i);
                    if (typeof s == "object") {
                        d = d + "[]";
                        s = s.join("&" + d + "=")
                    } else {
                        s = encodeURIComponent(s)
                    }
                    var c = d + "=" + s;
                    newIfrSrc += (newIfrSrc.indexOf("?") > -1 ? "&" : "?") + c
                }
            }
        }
        if (newIfrSrc != r) {
            n.src = newIfrSrc
        }
    }

    function d(e) {
        e.hasLoaded = false;
        s(e);
        o(e, "load", function() {
            f(e)
        });
        o(window, "message", function(n) {
            a(e, n)
        })
    }
    var c = document.getElementsByTagName("iframe");
    if (!c) return;
    for (var u = 0; u < c.length; ++u) {
        if (c[u].src && (c[u].src.indexOf("acuityscheduling.com") > -1 || c[u].src.indexOf(".as.me") > -1)) d(c[u])
    }
})();


