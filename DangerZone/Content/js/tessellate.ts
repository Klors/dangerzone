/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />

module DangerZone {
    export class Tessellation {
        constructor() { this.init(); }

        init() {
            $(window).on("load.tessellate", function () {
                $("img.tessellate").each(function (idx, obj) {
                    var h: number = $(this).height();
                    var w: number = $(this).width();
                    var s: string = $(this).attr("src");
                    var as: string = $(this).data("tessellate-altimg");
                    var alt: string = (typeof as !== "undefined" && as !== null && as !== "" && s.lastIndexOf("/") !== -1) ? s.replace(s.substring(s.lastIndexOf("/") + 1), $(this).data("tessellate-altimg")) : s;
                    var tt: bool = $(this).data("tessellate-type") === "fixed";
                    var ts: number = parseInt($(this).data("tessellate-size"), 10);
                    var sz: number = (isNaN(ts) || ts === 0) ? ts = (tt ? 20 : 5) : ts;
                    var squareSize: number = tt ? sz : ((h < w) ? Math.ceil(h / sz) : Math.ceil(w / sz));
                    var baseSpeed: number = 30;
                    var accelerator: number = 10;

                    $(this).wrap("<div class=\"tessellated\" style=\"height: " + h + "px; width: " + w + "px;\" data-tessellate-srcimg=\"" + alt + "\" data-tessellate-altimg=\"" + s + "\"></div>");
                    var wrapper = $(this).parent();
                    var delayStart = 0, delay = 0, x = 0;

                    for (var i = 0; i < h; i += squareSize, x += accelerator, delay = 0, delayStart += baseSpeed + x) {
                        for (var j = 0; j < w; j += squareSize, delay += baseSpeed) {
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

                    if ($(this).css("-webkit-animation-name") === "flipback") {
                        $(this).addClass("nodelay");
                        $(this).css({
                            "background-image": "url(" + $(this).parent().data("tessellate-altimg") + ")"
                            , "-webkit-animation-play-state": "running"
                        });
                        $(this).parent()
                    }
                    else
                    {
                        //$(this).css({
                        //    "background-image": "url(" + $(this).parent().data("tessellate-srcimg") + ")"
                        //});
                    }
                });
            });
        }

        Flip(selector: string) {
            $(".tessellated").each(function (idx, obj) {
                var a: string = $(this).data("tessellate-altimg");
                $(this).data("tessellate-altimg", $(this).data("tessellate-srcimg"));
                $(this).data("tessellate-srcimg", a);
            });

            var s = (typeof selector !== "undefined" && selector !== null && selector !== "") ? selector + ">div.tile" : "div.tile";
            $(s).removeClass("nodelay");
            $(s).css({
                "-webkit-animation-play-state": "running"
                , "-moz-animation-play-state": "running"
                , "-o-animation-play-state": "running"
                , "animation-play-state": "running"
            });
        }
    }
}

var dz = { t: new DangerZone.Tessellation() };