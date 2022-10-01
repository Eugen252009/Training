$("h1").after("<button>Hallo</button>");
$("button").on("click",function(){
    $("h1").slideToggle();
});