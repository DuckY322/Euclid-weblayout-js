import Swiper from '../node_modules/swiper/swiper-bundle.esm.browser.min.js';

const swiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    autoplay: {
        delay: 3000,
    },
});

let zeroElements = [{
    position: '.zero-block',
    element: '.zero-block__title',
    child: null,
    effect: 'active-element',
    played: false,
}, {
    position: '.zero-block',
    element: '.zero-block__subTitle',
    child: null,
    effect: 'active-element-reverse',
    played: false,
}, {
    position: '.zero-block',
    element: '.zero-block__building-images',
    child: '.zero-block__building-image',
    effect: 'active-child-element',
    childEffect: ['active-child-element-down-1', 'active-child-element-down-2', 'active-child-element-down-3', 'active-child-element-down-4', 'active-child-element-down-5'],
    played: false,
}];

let mainElements = [{
    element: '.section-design-solutions',
    child: null,
    effect: 'active-element-up',
    played: false,
}, {
    element: '.section-about-us__sub-title',
    child: null,
    effect: 'active-element',
    played: false,
}, {
    element: '.section-about-us__example',
    child: null,
    effect: 'active-element',
    played: false,
}, {
    element: '.section-about-us__double-cards',
    child: '.section-about-us__card',
    effect: 'active-child-element',
    childEffect: ['active-child-element-up-5', 'active-child-element-down-5'],
    played: false,
}, {
    element: '.section-how-we-work__info',
    child: null,
    effect: 'active-element',
    played: false,
}, {
    element: '.section-how-we-work__photo',
    child: null,
    effect: 'active-element-reverse',
    played: false,
}, {
    element: '.section-questions',
    child: '.section-questions__item',
    effect: 'active-child-element',
    childEffect: ['active-child-element-1', 'active-child-element-2', 'active-child-element-3', 'active-child-element-4', 'active-child-element-5'],
    played: false,
}];

let animlements = zeroElements.length + mainElements.length;

document.addEventListener('DOMContentLoaded', function() {

    document.body.classList.remove('body-noScroll');
    document.querySelector('.load-block').classList.add('off');

    showElements(zeroElements);

    if (window.pageYOffset > 0) {
        showElements(mainElements);
    };

    let openQuestion;

    function showHideMenu() {
        document.querySelector('.header__list').classList.toggle('header__list_active');
        document.querySelector('.header__button_burger').classList.toggle('header__button_burger_active');
    };

    function showElements(elements) {
        for (let obj of elements) {
            if (!obj.played) {
                let item = document.querySelector(obj.element);
                var br = item.getBoundingClientRect();
                let brTop = Math.round(br.top - window.innerHeight) + pageYOffset;
                if (brTop < window.pageYOffset) {
                    if (obj.child === null) {
                        item.classList.add('active-element');
                        item.classList.add(obj.effect);
                    } else {
                        item.querySelectorAll(obj.child).forEach((el, i) => {
                            el.classList.add('active-element');
                            el.classList.add(obj.childEffect[i]);
                        });
                    }
                    obj.played = true;
                    animlements--;
                }
            } else {
                continue;
            }
        }
    };

    window.addEventListener('scroll', function() {
        if (animlements > 0) {
            showElements(mainElements);
        }
    });

    document.querySelector('.header__button_burger').addEventListener('click', function() {
        showHideMenu();
    });

    document.querySelectorAll('.header__link').forEach(el => {
        el.addEventListener('click', function(e) {
            if (document.querySelector('.header__list').classList.contains('header__list_active')) {
                showHideMenu();
            }

            e.preventDefault();
            let scrollto = this.getAttribute('scrollto');
            const scrollTarget = document.querySelector(scrollto);
            const topOffset = 50;
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;
            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    document.querySelectorAll('.section-how-we-work__step').forEach(el => {
        el.addEventListener('click', function() {
            const path = this.dataset.path;

            document.querySelectorAll('.section-how-we-work__step').forEach(tabBtn => {
                tabBtn.classList.remove('section-how-we-work__step_active');
            });

            el.classList.add('section-how-we-work__step_active');

            document.querySelectorAll('.section-how-we-work__content').forEach(tabContent => {
                tabContent.classList.remove('section-how-we-work__content_active');
            });

            document.querySelector(`[data-target="${path}"]`).classList.add('section-how-we-work__content_active');
        })
    });

    document.querySelectorAll('.section-questions__item').forEach(el => {
        el.addEventListener('click', function() {
            let question = this.querySelector('.section-questions__button');

            document.querySelectorAll('.section-questions__button').forEach(item => {
                item.classList.remove('section-questions__button_active');
                item.nextElementSibling.style.maxHeight = null;
            });

            if (this === openQuestion) {
                question.classList.remove('section-questions__button_active');
                question.nextElementSibling.style.maxHeight = null;
                openQuestion = null;
            } else {
                openQuestion = this;
                question.classList.add('section-questions__button_active');
                let answer = question.nextElementSibling;
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            }
        });
    });
});