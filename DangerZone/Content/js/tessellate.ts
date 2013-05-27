/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />

module DangerZone {
    export class Tessellation {
        constructor() { this.init(); }

        init() {
            $(window).on("load.tessellate", function () {
                $("img.tessellate").each(function (idx, obj) {
                    var h = $(this).height();
                    var w = $(this).width();
                    var s = $(this).attr("src");

                    $(this).wrap("<div class=\"tessellated\" style=\"height: " + h + "px; width: " + w + "px;\"></div>");
                    var wrapper = $(this).parent();
                    var delayStart = 0, delay;

                    for (var i = 0; i < h; i += 20) {
                        delay = 0;
                        for (var j = 0; j < w; j += 20) {
                            wrapper.append($("<div class=\"tile\" style=\"background-image: url(" + s + "); background-position: -" + j + "px -" + i + "px; -webkit-animation-delay:" + (delayStart + delay) + "ms;\"></div>"));
                            delay += 50;
                        }
                        wrapper.append("<br/>");
                        delayStart += 50 + i;
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
                        $(this).css({ "-webkit-animation-play-state": "running" });
                    }
                });
            });
        }

        Flip(selector: string) {
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