document.addEventListener('DOMContentLoaded', (event) => {
    // Highlight current section in navigation
    const sections = document.querySelectorAll('.grid-section');
    const navItems = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').slice(1) === current) {
                li.classList.add('active');
            }
        });
    });

    // Add click effect to logo
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
        logo.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            logo.style.transform = 'rotate(0deg)';
        }, 500);
    });
});

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  '#000000'
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
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


//reduce opaticty of circle when social media icon is hovered
const socialIcons = document.querySelectorAll('.social-icons a');

document.addEventListener('mousemove', (e) => {
    circles.forEach((circle) => {
        circle.style.left = `${e.clientX}px`;
        circle.style.top = `${e.clientY}px`;
    });
});

socialIcons.forEach((icon) => {
    icon.addEventListener('mouseover', () => {
        circles.forEach((circle) => {
            circle.style.opacity = '0.1'; // Change opacity on hover
        });
    });

    icon.addEventListener('mouseout', () => {
        circles.forEach((circle) => {
            circle.style.opacity = '1'; // Revert opacity when not hovering
        });
    });
});