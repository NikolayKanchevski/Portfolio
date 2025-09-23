(function() {
    "use strict";

    const headerToggleButton = document.querySelector('.Toggle');
    function headerToggle() {
        document.querySelector('#Header').classList.toggle('header-show');
        headerToggleButton.classList.toggle('bi-list');
        headerToggleButton.classList.toggle('bi-x');
    }
    headerToggleButton.addEventListener('click', headerToggle);

    document.querySelectorAll('#Navmenu a').forEach(navmenu => {
        navmenu.addEventListener('click', () => {
          if (document.querySelector('.header-show')) {
              headerToggle();
          }
        });
    });

    document.querySelectorAll('#NavMenu .toggle-dropdown').forEach(navmenu => {
        navmenu.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentNode.classList.toggle('active');
            this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
            e.stopImmediatePropagation();
        });
    });

    let skillsAnimation = document.querySelectorAll('.skills-animation');
    skillsAnimation.forEach((item) => {
        new Waypoint({
            element: item,
            offset: '80%',
            handler: function(direction) {
                let progress = item.querySelectorAll('.ProgressBox .Progress');
                progress.forEach(el => {
                    el.style.width = el.getAttribute('aria-valuenow') + '%';
                });
            }
        });
    });

    let navMenuLinks = document.querySelectorAll('#NavMenu a');
    function navmenuScrollspy() {
        navMenuLinks.forEach(navMenuLink => {
            if (!navMenuLink.hash) return;

            let section = document.querySelector(navMenuLink.hash);
            if (!section) return;

            let position = window.scrollY + 200;
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                document.querySelectorAll('#NavMenu a.active').forEach(link => link.classList.remove('active'));
                navMenuLink.classList.add('active');
            }
            else {
                navMenuLink.classList.remove('active');
            }
        })
    }
    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);
})();