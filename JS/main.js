
// $(document).ready(function () {
//     $(window).scroll(function () {
//         var scroll = $(window).scrollTop();
//         if (scroll > 100) {
//             $(".navbar").css("background", "red");
//         }

//         else {
//             $(".navbar").css("background", "transparent");
//         }
//     })
// })

const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
        nav.classList.add('active_nav');
    } else {
        nav.classList.remove('active_nav');
    }
})