(function() {
    "use strict";

    const LIGHT_THEME = "light";
    const DARK_THEME = "dark";

    function getSystemTheme() {
        return window.matchMedia("(prefers-color-scheme: light)").matches ? LIGHT_THEME : DARK_THEME;
    }

    function getSelectedTheme() {
        return localStorage.getItem("selected-theme");
    }

    function setSelectedTheme(theme) {
        localStorage.setItem("selected-theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }

    function getCurrentTheme() {
        return document.querySelector("html").getAttribute("data-theme");
    }

    function loadTheme() {
        const selectedTheme = getSelectedTheme();
        const themeString = selectedTheme ? selectedTheme : getSystemTheme();

        document.querySelector("html").setAttribute("data-theme", themeString);
    }
    window.addEventListener("DOMContentLoaded", loadTheme);

    const themeToggle = document.querySelector("#ThemeToggle")
    themeToggle.addEventListener("click", () => {
      const newTheme = getCurrentTheme() === DARK_THEME ? LIGHT_THEME : DARK_THEME;

      document.querySelector("html").setAttribute("data-theme", newTheme);
      setSelectedTheme(newTheme);
    });

    const preloader = document.querySelector("#Preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.remove();
        });
    }

    let scrollTop = document.querySelector("#ScrollTop");
    function toggleScrollTop() {
        if (scrollTop) {
            window.scrollY > 100 ? scrollTop.classList.add("active") : scrollTop.classList.remove("active");
        }
    }

    scrollTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    window.addEventListener("load", toggleScrollTop);
    document.addEventListener("scroll", toggleScrollTop);

    function aosInit() {
        AOS.init({
            duration: 600,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    }
    window.addEventListener("load", aosInit);

    const selectTyped = document.querySelector(".typed");
    if (selectTyped) {
        let typedItems = selectTyped.getAttribute("data-typed-items");
        typedItems = typedItems.split(",");
        new Typed(".typed", {
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
        selector: ".glightbox",
        moreLength: 0
    });

    document.querySelectorAll(".isotope-layout").forEach(function(isotopeItem) {
        let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
        let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
        let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

        let initIsotope;
        imagesLoaded(isotopeItem.querySelector(".isotope-container"), function() {
          initIsotope = new Isotope(isotopeItem.querySelector(".isotope-container"), {
            itemSelector: ".isotope-item",
            layoutMode: layout,
            filter: filter,
            sortBy: sort
          });
        });

        isotopeItem.querySelectorAll(".isotope-filters > *").forEach(function(filters) {
          filters.addEventListener("click", function() {
            isotopeItem.querySelector(".isotope-filters .active").classList.remove("active");
            this.classList.add("active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter")
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          }, false);
        });
    });

    window.addEventListener("load", function(e) {
    if (window.location.hash) {
        if (document.querySelector(window.location.hash)) {
            setTimeout(() => {
                let section = document.querySelector(window.location.hash);
                let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
                window.scrollTo({
                    top: section.offsetTop - parseInt(scrollMarginTop),
                    behavior: "smooth"
                });
            }, 100);
        }
    }
  });

    function initSwiper() {
        document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
            const config = {
                "loop": true,
                "speed": 600,
                "autoplay": {
                    "delay": 12000
                },
                "slidesPerView": "auto",
                "pagination": {
                    "el": ".swiper-pagination",
                    "type": "bullets",
                    "clickable": true
                }
            }

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