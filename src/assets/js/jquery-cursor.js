/* 
$(function () {
    var cursor;
    $("#cmd, #std-out").click(function () {
        $("input").focus();
        cursor = window.setInterval(function () {
            if ($("#cursor").css("visibility") === "visible") {
                $("#cursor").css({
                    visibility: "hidden",
                });
            } else {
                $("#cursor").css({
                    visibility: "visible",
                });
            }
        }, 500);
    });

    $("input").keyup(function () {
        $("#cmd span").text("> " + $(this).val());
    });

    $("input").blur(function () {
        clearInterval(cursor);
        $("#cursor").css({
            visibility: "visible",
        });
    });
});
 */
