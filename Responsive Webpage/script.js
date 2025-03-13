document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.querySelector(".menu-icon");
    const navMenu = document.querySelector("ul");

    menuIcon.addEventListener("click", () => {
        navMenu.classList.toggle("active");

        if (navMenu.classList.contains("active")) {
            menuIcon.innerHTML = "&#10006;"; 
            menuIcon.style.color = "white";  
        } else {
            menuIcon.innerHTML = "&#9776;"; 
            menuIcon.style.color = "black"; 
        }
    });

    // Close menu on scroll
    window.addEventListener("scroll", () => {
        if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            menuIcon.innerHTML = "&#9776;";
            menuIcon.style.color = "black"; 
        }
    });
});