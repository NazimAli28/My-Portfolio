window.addEventListener('scroll', function () {
    // code to change navbar color on scroll goes here
    if (window.scrollY > 50) {
        document.getElementById('navbar').style.backgroundColor = '#333333cf';
    } else {
        document.getElementById('navbar').style.backgroundColor = 'transparent';
    }
});


// get all navbar links
const navbarLinks = document.querySelectorAll('#navbar nav a');

// get all sections
const sections = document.querySelectorAll('section');

// get the navbar
const navbar = document.getElementById('navbar');

// function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (rect.top >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) / 4);
}

// add event listener for scroll event
window.addEventListener('scroll', function () {
    // keep track of current active navbar link
    let activeLink;

    // for each section, check if it is in viewport
    sections.forEach(function (section) {
        if (isInViewport(section)) {
            // if section is in viewport, save corresponding navbar link
            activeLink = navbar.querySelector(`[data-link=${section.id}]`);
        }
    });

    // remove active class from all navbar links
    navbarLinks.forEach(function (link) {
        link.classList.remove('active');
    });

    // add active class to current active navbar link
    if (activeLink) {
        activeLink.classList.add('active');
    }
});

// for each navbar link, add event listener for click event
navbarLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        // remove active class from all navbar links
        navbarLinks.forEach(function (link) {
            link.classList.remove('active');
        });

        // add active class to clicked navbar link
        this.classList.add('active');
    });
});
