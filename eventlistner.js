clear_input.addEventListener("click" , function(){
    input_search.value = "" 
    clear_input.classList.remove("active"); 
})



input_search.addEventListener("input", function () {
    if (input_search.value.length > 0) {
        clear_input.classList.add("active");  
    } else {
        clear_input.classList.remove("active"); 
    }
});


search_btn.addEventListener("click" , function(){
    if (input_search.value.length > 0){
        get_weather_in_search(input_search.value)
        
    }else{
        get_location()
    }
    input_search.value = "" 
    clear_input.classList.remove("active"); 
})

search_btn.addEventListener("mouseenter", function () {
    message_search.classList.add("active");
});

search_btn.addEventListener("mouseleave", function () {
    message_search.classList.remove("active");
});