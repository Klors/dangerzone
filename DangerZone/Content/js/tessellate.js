var DangerZone;
(function (DangerZone) {
    var Tessellation = (function () {
        function Tessellation() {
            this.init();
        }
        Tessellation.prototype.init = function () {
            $(window).on("load.tessellate", function () {
                $("img.tessellate").each(function (idx, obj) {
                    var h = $(this).height();
                    var w = $(this).width();
                    var s = $(this).attr("src");
                    var as = $(this).data("tessellate-altimg");
                    var alt = (typeof as !== "undefined" && as !== null && as !== "" && s.lastIndexOf("/") !== -1) ? s.replace(s.substring(s.lastIndexOf("/") + 1), $(this).data("tessellate-altimg")) : s;
                    var tt = $(this).data("tessellate-type") === "fixed";
                    var ts = parseInt($(this).data("tessellate-size"), 10);
                    var sz = (isNaN(ts) || ts === 0) ? ts = (tt ? 20 : 5) : ts;
                    var squareSize = tt ? sz : ((h < w) ? Math.ceil(h / sz) : Math.ceil(w / sz));
                    var baseSpeed = 30;
                    var accelerator = 10;
                    $(this).wrap("<div class=\"tessellated\" style=\"height: " + h + "px; width: " + w + "px;\" data-tessellate-srcimg=\"" + alt + "\" data-tessellate-altimg=\"" + s + "\"></div>");
                    var wrapper = $(this).parent();
                    var delayStart = 0, delay = 0, x = 0;
                    for(var i = 0; i < h; i += squareSize , x += accelerator , delay = 0 , delayStart += baseSpeed + x) {
                        for(var j = 0; j < w; j += squareSize , delay += baseSpeed) {
                            wrapper.append($("<div class=\"tile\" style=\"background-image: url(" + s + "); background-position: -" + j + "px -" + i + "px; width: " + squareSize + "px; height: " + squareSize + "px; -webkit-animation-delay:" + (delayStart + delay) + "ms;\"></div>"));
                        }
                        wrapper.append("<br/>");
                    }
                    $(this).remove();
                });
                $("div.tile").on("webkitAnimationEnd", function (event) {
                    $(this).css({
                        "-webkit-animation-play-state": "paused"
                    });
                    $(this).css({
                        "-webkit-animation-name": ($(this).css("-webkit-animation-name") === "flipover" ? "flipback" : "flipover")
                    });
                    if($(this).css("-webkit-animation-name") === "flipback") {
                        $(this).addClass("nodelay");
                        $(this).css({
                            "background-image": "url(" + $(this).parent().data("tessellate-altimg") + ")",
                            "-webkit-animation-play-state": "running"
                        });
                        $(this).parent();
                    } else {
                    }
                });
            });
        };
        Tessellation.prototype.Flip = function (selector) {
            $(".tessellated").each(function (idx, obj) {
                var a = $(this).data("tessellate-altimg");
                $(this).data("tessellate-altimg", $(this).data("tessellate-srcimg"));
                $(this).data("tessellate-srcimg", a);
            });
            var s = (typeof selector !== "undefined" && selector !== null && selector !== "") ? selector + ">div.tile" : "div.tile";
            $(s).removeClass("nodelay");
            $(s).css({
                "-webkit-animation-play-state": "running",
                "-moz-animation-play-state": "running",
                "-o-animation-play-state": "running",
                "animation-play-state": "running"
            });
        };
        return Tessellation;
    })();
    DangerZone.Tessellation = Tessellation;    
})(DangerZone || (DangerZone = {}));
var dz = {
    t: new DangerZone.Tessellation()
};
