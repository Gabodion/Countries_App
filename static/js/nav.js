const lightDarkTheme = document.querySelector(".theme-switch");


themeSwitcher();
// get theme color from local storage
let themeColour = localStorage.getItem("theme");
if (themeColour === "light"){
    document.body.classList.remove("active");
}else{
    document.body.classList.add("active");
}

// light and dark mode switcher
function themeSwitcher(){
    lightDarkTheme.addEventListener("click", () =>{
        if (document.body.classList.contains("active")){
            document.body.classList.remove("active");
            localStorage.setItem("theme", "light");
        }else{
            document.body.classList.add("active");
            localStorage.setItem("theme", "dark");
        }
        
    })
}

