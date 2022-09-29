const myHeader = document.querySelector(".header");
window.onscroll = function () { 
    if (document.body.scrollTop >= 200 || document.documentElement.scrollTop >= 200 ) {
        myHeader.classList.add("header-colored");
        myHeader.classList.remove("header-transparent");
    } 
    else {
        myHeader.classList.add("header-transparent");
        myHeader.classList.remove("header-colored");
    }
};