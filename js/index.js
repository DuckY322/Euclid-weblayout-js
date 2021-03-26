import Swiper from '../node_modules/swiper/swiper-bundle.esm.browser.min.js';

const swiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

document.addEventListener('DOMContentLoaded', function() {

    showElement('.zero-block', '.zero-block__title', null, 'active-element');
    showElement('.zero-block', '.zero-block__subTitle', null, 'active-element-reverse');
    showElement('.zero-block', '.zero-block__building-image', null, 'active-child-element');
    showElement('.zero-block', '.zero-block__building-image', 0, 'active-child-element-up-1');
    showElement('.zero-block', '.zero-block__building-image', 1, 'active-child-element-up-2');
    showElement('.zero-block', '.zero-block__building-image', 2, 'active-child-element-up-3');
    showElement('.zero-block', '.zero-block__building-image', 3, 'active-child-element-up-4');
    showElement('.zero-block', '.zero-block__building-image', 4, 'active-child-element-up-5');

    let openQuestion;

    function showHideMenu() {
        document.querySelector('.header__list').classList.toggle('header__list_active');
        document.querySelector('.header__button_burger').classList.toggle('header__button_burger_active');
    }

    function showElement(position, element, number, effect) {
        if (number === null) {
            document.querySelector(position).querySelectorAll(element).forEach(el => {
                if (!el.classList.contains(effect)) {
                    var br = el.getBoundingClientRect();
                    let brTop = Math.round(br.top - window.screen.height);

                    if (brTop < 0) {
                        el.classList.add(effect);
                    }
                } else {
                    return;
                }
            });
        } else {
            let item = document.querySelector(position).querySelectorAll(element)[number];
            if (!item.classList.contains(effect)) {
                var br = item.getBoundingClientRect();
                let brTop = Math.round(br.top - window.screen.height);

                if (brTop < 0) {
                    item.classList.add(effect);
                }
            } else {
                return;
            }
        };
    }

    window.addEventListener('scroll', function() {
        showElement('main', '.section-design-solutions', null, 'active-element-up');
        showElement('main', '.section-about-us', null, 'active-element-reverse');
        showElement('main', '.section-how-we-work', null, 'active-element');
        showElement('main', '.section-questions', null, 'active-element-down');
        showElement('.section-questions', '.section-questions__item', null, 'active-child-element');
        showElement('.section-questions', '.section-questions__item', 0, 'active-child-element-1');
        showElement('.section-questions', '.section-questions__item', 1, 'active-child-element-2');
        showElement('.section-questions', '.section-questions__item', 2, 'active-child-element-3');
        showElement('.section-questions', '.section-questions__item', 3, 'active-child-element-4');
        showElement('.section-questions', '.section-questions__item', 4, 'active-child-element-5');
    });

    document.querySelector('.header__button_burger').addEventListener('click', function() {
        showHideMenu();
    })

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