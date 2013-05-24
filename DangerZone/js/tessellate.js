var tessL8 = {};
(function ($, tessL8)
{
    tessL8.StartFlip = function ()
    { //$("div.tile").addClass("flipover");
        //setTimeout(function(){$("div.tile").addClass("flipped");}, 1000);
        //setTimeout(function(){$("div.tile").removeClass("flipover flipped");$("div.tile").addClass("flipback");}, 2000);
        //setTimeout(function(){$("div.tile").removeClass("flipback");}, 3000);
        //$("div.tile").not("div + div").each(function (idx, obj)
        //{
        //    $(this).css({ "-webkit-animation-delay": (0.1 * idx) + "s" });
        //    $(this).css({ "-webkit-animation-play-state": "running" });
        //});
        $("div.tile").removeClass("nodelay");
        $("div.tile").css({ "-webkit-animation-play-state": "running" });
    };

    $(document).ready(function ()
    {
        // include css
        //$("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\"./tessellate.css\" />");


        $("img.tessellate").each(function (idx, obj)
        {
            var h = $(this).height();
            var w = $(this).width();
            var s = $(this).attr("src");

            $(this).wrap("<div class=\"tessellated\" style=\"height: " + h + "px; width: " + w + "px;\"></div>");
            var wrapper = $(this).parent();
            var delayStart = 0, delay;

            for (var i = 0; i < h; i += 20)
            {
                delay = 0;
                for (var j = 0; j < w; j += 20)
                {
                    wrapper.append($("<div class=\"tile\" style=\"background-image: url(" + s + "); background-position: -" + j + "px -" + i + "px; -webkit-animation-delay:" + (delayStart + delay) + "ms;\"></div>"));
                    delay += 50;
                }
                wrapper.append("<br/>");
                delayStart += 50 + i;
            }
            $(this).remove();
        });

        //$("div.tile").on("webkitAnimationStart", function (event)
        //{
        //    $(this).next("div.tile").css({
        //"-webkit-animation-delay": "0.1s",
        //    "-webkit-animation-play-state": "running"
        //  });
        //});

        $("div.tile").on("webkitAnimationEnd", function (event)
        {
            $(this).css({
                "-webkit-animation-play-state": "paused"
            });

            $(this).css({
                "-webkit-animation-name": ($(this).css("-webkit-animation-name") === "flipover" ? "flipback" : "flipover")
                //,
                //"-webkit-animation-delay": ""
            });

            if ($(this).css("-webkit-animation-name") === "flipback")
            {
                $(this).addClass("nodelay");
                $(this).css({ "-webkit-animation-play-state": "running" });
            }
        });
    });

}(jQuery, tessL8));