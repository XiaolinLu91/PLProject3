$(document).ready(function(){
    $("a").click(function(){
        $(this).prev().toggleClass("hide");
        if ($(this).prev().attr("class") != "hide"){
            $(this).text("Show less");
        }
        else {
            $(this).text("Show more");
        }

    });
});