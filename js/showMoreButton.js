$(document).ready(function () {
    $(".content").slice(0, 2).show();
    $("#showMore").on("click", function (e) {
        e.preventDefault();
        $(".content:hidden").slice(0, 5).slideDown();
        if ($(".content:hidden").length == 0) {
            $("#showMore").text("Mais nada para mostrar").addClass("noContent");
        }
    });
});