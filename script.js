document.addEventListener('DOMContentLoaded', (event) => {
    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('.grid-section');
    const navItems = document.querySelectorAll('nav ul li a');
    const progressBar = document.querySelector('.progress-bar');

    // Function to update progress bar
    function updateProgressBar() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDistance = documentHeight - windowHeight;
        const scrollPercentage = (scrollTop / scrollDistance) * 100;
        progressBar.style.width = scrollPercentage + '%';
    }

    // Function to check scroll position and update nav
    function checkScroll() {
        let scrollPosition = window.scrollY;
        let windowHeight = window.innerHeight;
        let documentHeight = document.documentElement.scrollHeight;

        // Show nav when not at the top of the page
        if (scrollPosition > 100) {
            nav.classList.add('show-nav');
        } else {
            nav.classList.remove('show-nav');
        }

        // Highlight current section
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop - windowHeight / 2 && 
                scrollPosition < sectionTop + sectionHeight - windowHeight / 2) {
                current = section.getAttribute('id');
            }
        });

        // If we're at the bottom of the page, highlight the last section
        if (scrollPosition + windowHeight >= documentHeight - 50) {
            current = sections[sections.length - 1].getAttribute('id');
        }

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });

        // Update progress bar
        updateProgressBar();
    }

    // Check scroll on load
    checkScroll();

    // Check scroll on scroll event
    window.addEventListener('scroll', checkScroll);

    // Smooth scroll to section when nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

});

const socialIcons = document.querySelectorAll(".social-icon");


const projectItems = document.querySelectorAll(".project-item");
const experienceItems = document.querySelectorAll(".experience-item");
const navItems = document.querySelectorAll("nav ul li a");
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
const email = document.querySelector(".email");
const selectedElements = [...socialIcons, ...projectItems, ...experienceItems, ...navItems, email];

circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener("mousemove", function(e){
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;
  
    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";
    
        circle.style.scale = (circles.length - index) / circles.length;
    
        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });
 
    requestAnimationFrame(animateCircles);
}

animateCircles();

selectedElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
        circles.forEach((circle, index) => {
            if (index === 0) {
                circle.classList.add('hover');
            } else {
                circle.style.opacity = '0';
            }
        });
    });

    element.addEventListener('mouseleave', () => {
        circles.forEach((circle, index) => {
            circle.classList.remove('hover');
            circle.style.opacity = '1';
        });
    });
});


const phrases = ["Welcome to my portfolio!"];
let phraseIndex = 0;
let letterIndex = 0;
const typingSpeed = 100;
const erasingSpeed = 50;
const newPhraseDelay = 1000;
const typingElement = document.querySelector('.typing-text');

function printLetters(phrase) {
    if (letterIndex < phrase.length) {
        typingElement.textContent += phrase.charAt(letterIndex);
        letterIndex += 1;
        setTimeout(function() {
            printLetters(phrase);
        }, typingSpeed);
    } else {
        setTimeout( () => {
            if (phraseIndex < phrases.length - 1) {
                letterIndex = 0;
                phraseIndex = (phraseIndex + 1)
                printLetters(phrases[phraseIndex]);
            }
        }, newPhraseDelay
        )
    }
}

printLetters(phrases[phraseIndex]);

