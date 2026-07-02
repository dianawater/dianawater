/*====================================================
    DIANA WATER
    SCRIPT.JS
    PART 1
=====================================================*/

"use strict";

/*==============================
CACHE DOM ELEMENTS
==============================*/

const header = document.getElementById("header");
const preloader = document.getElementById("preloader");

const menuButton = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

const navItems = document.querySelectorAll(".nav-links a");

/*==============================
PRELOADER
==============================*/

window.addEventListener("load", () => {

    if (!preloader) return;

    setTimeout(() => {

        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";

        setTimeout(() => {

            preloader.remove();

        }, 600);

    }, 800);

});

/*==============================
SMOOTH SCROLL
==============================*/

navItems.forEach(link => {

    link.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        if (!href.startsWith("#")) return;

        const target = document.querySelector(href);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    });

});

/*==============================
MOBILE MENU
==============================*/

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("show");
        menuButton.classList.toggle("active");

    });

    navItems.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");
            menuButton.classList.remove("active");

        });

    });

    document.addEventListener("click", (e) => {

        if (

            !menuButton.contains(e.target) &&
            !navLinks.contains(e.target)

        ) {

            navLinks.classList.remove("show");
            menuButton.classList.remove("active");

        }

    });

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            navLinks.classList.remove("show");
            menuButton.classList.remove("active");

        }

    });

}

/*==============================
SCROLL TO QUALITY BUTTON
==============================*/

const scrollButton = document.querySelector(".scroll-down");

if (scrollButton) {

    scrollButton.addEventListener("click", (e) => {

        e.preventDefault();

        const section = document.querySelector("#quality");

        if (section) {

            section.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

}

/*==============================
GLOBAL SCROLL EVENTS
==============================*/

window.addEventListener("scroll", () => {

    /* Sticky Header */

    if (window.scrollY > 60) {

        header?.classList.add("active");

    } else {

        header?.classList.remove("active");

    }

});

/*====================================================
    DIANA WATER
    SCRIPT.JS
    PART 2
=====================================================*/

/*==============================
SCROLL REVEAL
==============================*/

const revealItems = document.querySelectorAll(
`
.section-heading,
.feature-card,
.product-card,
.showcase-image,
.showcase-content,
.timeline-item,
.gallery-item,
.stat-card,
.industry-card,
.contact-card,
.contact-form,
.cta-content
`
);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");

        revealObserver.unobserve(entry.target);

    });

}, {

    threshold:0.15

});

revealItems.forEach(item => {

    item.classList.add("fade-up");

    revealObserver.observe(item);

});


/*==============================
COUNTER ANIMATION
==============================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.target);

        let value = 0;

        const increment = Math.max(1, target / 80);

        function update(){

            value += increment;

            if(value < target){

                counter.textContent = Math.ceil(value);

                requestAnimationFrame(update);

            }

            else{

                counter.textContent = target + "+";

            }

        }

        update();

        counterObserver.unobserve(counter);

    });

},{

    threshold:.35

});

counters.forEach(counter => counterObserver.observe(counter));


/*==============================
BACK TO TOP
==============================*/

const backTop = document.getElementById("backToTop");

if(backTop){

    backTop.style.opacity = "0";

    backTop.style.visibility = "hidden";

    backTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}


/*==============================
ACTIVE NAVIGATION
==============================*/

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll",()=>{

    /* Back To Top */

    if(backTop){

        if(window.scrollY > 500){

            backTop.style.opacity="1";

            backTop.style.visibility="visible";

        }

        else{

            backTop.style.opacity="0";

            backTop.style.visibility="hidden";

        }

    }

    /* Active Navigation */

    let current = "";

sections.forEach(section => {

    const top = section.offsetTop - 140;

    if (window.scrollY >= top) {

        current = section.id;

    }

});

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});


/*==============================
FLOATING ICONS
==============================*/

document.querySelectorAll(

".feature-icon,.timeline-icon,.industry-card i"

).forEach((icon,index)=>{

    icon.animate(

    [

        {

            transform:"translateY(0)"

        },

        {

            transform:"translateY(-8px)"

        },

        {

            transform:"translateY(0)"

        }

    ],

    {

        duration:4200 + (index * 150),

        iterations:Infinity,

        easing:"ease-in-out"

    });

});


/*==============================
BUTTON RIPPLE
==============================*/

document.querySelectorAll(

".primary-btn,.product-btn,.nav-btn"

).forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        ripple.className = "ripple";

        ripple.style.left = (e.clientX - rect.left) + "px";

        ripple.style.top = (e.clientY - rect.top) + "px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});


/*==============================
SCROLL PROGRESS BAR
==============================*/

const progressBar = document.createElement("div");

progressBar.className = "progress-bar";

document.body.appendChild(progressBar);

window.addEventListener("scroll",()=>{

    const totalHeight =

        document.documentElement.scrollHeight -

        window.innerHeight;

    const percentage =

        (window.scrollY / totalHeight) * 100;

    progressBar.style.width = percentage + "%";

});


/*==============================
IMAGE FADE
==============================*/

document.querySelectorAll("img").forEach(img=>{

    if(img.complete){

        img.style.opacity="1";

    }

    else{

        img.addEventListener("load",()=>{

            img.style.opacity="1";

        });

    }

});


/*==============================
CONSOLE
==============================*/

console.log(

"%cDiana Packaged Drinking Water",

"color:#0D6EFD;font-size:20px;font-weight:bold;"

);

console.log(

"%cPremium website powered by Diana Water",

"color:#38C7F5;font-size:14px;"

);