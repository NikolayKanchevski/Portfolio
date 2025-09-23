(function() {
    "use strict";

    const preloader = document.querySelector('#Preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }

    let scrollTop = document.querySelector('#ScrollTop');
    function toggleScrollTop() {
        if (scrollTop) {
            window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
    }

    scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);

    function aosInit() {
        AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    window.addEventListener('load', aosInit);

    const selectTyped = document.querySelector('.typed');
    if (selectTyped) {
        let typedItems = selectTyped.getAttribute('data-typed-items');
        typedItems = typedItems.split(',');
        new Typed('.typed', {
            strings: typedItems,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    new PureCounter({
        separator: true
    });

    const glightbox = GLightbox({
        selector: '.glightbox',
        moreLength: 0
    });

    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
        let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
        let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
        let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

        let initIsotope;
        imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
          initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
            itemSelector: '.isotope-item',
            layoutMode: layout,
            filter: filter,
            sortBy: sort
          });
        });

        isotopeItem.querySelectorAll('.isotope-filters > *').forEach(function(filters) {
          filters.addEventListener('click', function() {
            isotopeItem.querySelector('.isotope-filters .active').classList.remove('active');
            this.classList.add('active');
            initIsotope.arrange({
              filter: this.getAttribute('data-filter')
            });
            if (typeof aosInit === 'function') {
              aosInit();
            }
          }, false);
        });
    });

    window.addEventListener('load', function(e) {
    if (window.location.hash) {
        if (document.querySelector(window.location.hash)) {
            setTimeout(() => {
                let section = document.querySelector(window.location.hash);
                let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
                window.scrollTo({
                    top: section.offsetTop - parseInt(scrollMarginTop),
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
  });

    function initSwiper() {
        document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
            let config = JSON.parse(
                swiperElement.querySelector(".swiper-config").innerHTML.trim()
            );

            if (swiperElement.classList.contains("swiper-tab")) {
                initSwiperWithCustomPagination(swiperElement, config);
            }
            else {
                new Swiper(swiperElement, config);
            }
        });
    }
    window.addEventListener("load", initSwiper);
})();