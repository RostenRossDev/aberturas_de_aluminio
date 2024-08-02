//document.addEventListener("DOMContentLoaded", function() {
//    var navbarToggler = document.querySelector('.navbar-toggler');
//    var navbarCollapse = document.querySelector('#navbarNav');
//
//    if (navbarToggler && navbarCollapse) {
//        navbarToggler.addEventListener('click', function() {
//            navbarCollapse.classList.toggle('show');
//        });
//    }
//});

//document.addEventListener("DOMContentLoaded", function() {
//    var navbarToggler = document.querySelector('.navbar-toggler');
//    var navbarCollapse = document.querySelector('#navbarNav');
//
//    if (navbarToggler && navbarCollapse) {
//        navbarToggler.addEventListener('click', function() {
//            var isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
//            console.log("aria expanded: " + isExpanded);
//            navbarToggler.setAttribute('aria-expanded', !isExpanded);
//            if (isExpanded) {
//                console.log("remover show");
//                navbarCollapse.classList.remove('show');
//                navbarCollapse.classList.add('collapse');
//            } else {
//                console.log("remover collapse");
//                navbarCollapse.classList.add('show');
//                navbarCollapse.classList.remove('collapse');
//            }
//        });
//    }
//});