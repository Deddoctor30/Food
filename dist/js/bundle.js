/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
   const result = document.querySelector('.calculating__result span');
   
   let sex, height, weight, age, ratio;

   if(localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
   } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
   }

   if(localStorage.getItem('ratio')) {
      sex = localStorage.getItem('ratio');
   } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
   }



   function init (selector, activeClass) {                                    // для localStorage, чтобы при заходе на страницу цеплялся localStorage
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
         elem.classList.remove(activeClass);
         
         if(elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
         }
         if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
         }
      });
   }

   init('#gender div', 'calculating__choose-item_active');                                       // вызываем функцию для блока gender
   init('.calculating__choose_big div', 'calculating__choose-item_active');                      // для блока с активностью

   function calc() {
      if(!sex || !height || !weight || !age || !ratio) {
         result.textContent = '---';
         return;
      }

      if(sex === 'female') {
         result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
         result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
   }
   calc();
   

   function getStaticInfo (selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach((elem) => {                                                                          // делегирование событий тут не подходит, т.к. есть баг при клике
         elem.addEventListener('click', (event) => {
            if (event.target.getAttribute('data-ratio')) {
               ratio = +event.target.getAttribute('data-ratio');
               localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));                     // записать значение в localStorage 
            } else {
               sex = event.target.getAttribute('id');
               localStorage.setItem('sex', event.target.getAttribute('id'));                                // записать значение в localStorage
            }
   
            elements.forEach(elem => {
               elem.classList.remove(activeClass);
            });
   
            event.target.classList.add(activeClass);
            calc();
         });
      });
   }

   getStaticInfo('#gender div', 'calculating__choose-item_active');
   getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');


   function getInput(selector) {
      const input = document.querySelector(selector);

      input.addEventListener('input', () => {

         if(input.value.match(/\D/)) {                                                 // делать красную рамку, если будет любой символ кроме числа
            input.style.border = '1px solid red';
         } else {
            input.style.border = 'none';
         }

         switch(input.getAttribute('id')) {
            case 'height':
               height = +input.value;
               break;
            case 'weight':
               weight = +input.value;
               break;
            case 'age':
               age = +input.value;
               break;
         }
         calc();
      });
   }

   getInput('#height');
   getInput('#weight');
   getInput('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function cards() {
   // Классы для карточек


   class AddCart {
      constructor(cardNum, img, name, descr, price, alt, ...classes) {                                   // ...classes - это rest (остальные знпчения перю в массив)
         this.img = img;                                                                                 // Это называется свойства
         this.name = name;
         this.descr = descr;
         this.price = price;
         this.alt = alt;
         this.classes = classes;
         this.cart = document.querySelector(cardNum);                                                    // Сюда выбираем класс к которму цепляемся (DOM)
         this.valute = 27;                                                                               // Это множитель для валюты (опционально)
         // this.removePrevious();                                                                       // Удаляем другие карточки (опционально)
         this.changeValute();                                                                            // Вызываем методы здесь или когда создаем новый
         this.changeHtml();                                                                              //    класс через точку
      }

      changeHtml() {                                                                                     // Это называется методы
         const element = document.createElement('div');                                                  // Создаем новый див, в него записываем Html содерж.

         if (this.classes.length === 0) {                                                                // Создаем дефолтное значение, если длина ...classes = 0, т.е. нет вообще классов,
            // тогда присваеваем menu__item
            this.element = 'menu__item';
            element.classList.add(this.element);
         } else {
            this.classes.forEach(className => element.classList.add(className));                         // Делаем, чтобы новые классы из ...classes добавлялись как класссы к диву
         }

         element.innerHTML = `
            <img src=${this.img} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.name}</h3>
            <div class="menu__item-descr">${this.name} - ${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
               <div class="menu__item-cost">Цена:</div>
               <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
         `;
         this.cart.append(element);                                                                      // Закидываем див в конец родителя (добавл. +1)
      }

      changeValute() {                                                                                   // Перевод из валюты (тупо умнож. на коэф.) 
         this.price = +this.price * this.valute;
      }

      removePrevious() {
         this.cart.innerHTML = '';                                                                       // Удаляем другие карточки (из html)
      }
   }



   // Подключаем базу данных вместо рукописного ниже текста 

   (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
      .then(data => {
         data.forEach(({ img, title, descr, price, alt }) => {                        // {} - это деструктуризация объекта, т.е. сразу подстановка свойств
            new AddCart('.menu__field .container', img, title, descr, price, alt);
         });
      });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");
                                                               // в этом коде используются функции close и open из другого файла, поэтому импортируем


function forms(formSelector, timeOut) {
   // Forms

   const forms = document.querySelectorAll(formSelector);                                                // Т.к. форм несколько сделаем отд. функцию для отправки

   const message = {                                                                               // Объект, чтобы выводить сообщения на экран пользователю
      loading: '/src/img/form/spinner.svg',
      sucsess: 'Все загружено',
      fail: 'Что-то пошло не так'
   }

   forms.forEach(item => {
      bindPostData(item);
   });



   function bindPostData(form) {                                                                       // Потом просто будем вызывать функцию для отправки
      form.addEventListener('submit', (event) => {                                                 // submit в событии - если будет отправка формы
         event.preventDefault();                                                                   // чтобы не было перезагрузки страницы

         const statusMessage = document.createElement('img');                                      // Создаем элемент + клсс + выводим сообщение из объекта выше
         statusMessage.src = message.loading;                                                      // создаем + задаем одновременно атрибут src и добавляем css текст
         statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
         `;

         // form.append(statusMessage);
         form.insertAdjacentElement('afterend', statusMessage);                                     // более гибкий метод, чем выше, чтобы закинуть файл не в конец формы, а сразу полсе нее


         const formData = new FormData(form);                                                      // Значение формы, которое ввел пользователь формируется для сервера 
         //(обязательно у input и др. должно быть заполнено name='', иначе работать не будет)



         // Преобразить formData в JSON (преобразовать данные полученные с формы на сайте в JSON файл)
         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {                                                                         // then будет, т.к. fetch возвращает promise и это будет вместо request.addEventListener('load', () из кода выше 
               console.log(data);
               showThanksModal(message.sucsess);
               statusMessage.remove();
            }).catch(() => {
               showThanksModal(message.fail);
            }).finally(() => {
               form.reset();                                                                           // Очистить форму после успеха
            })
      });
   }



   // Оповещение об успехе или провале в модальном окне

   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');                                                                // скрываем контент на старом модальном окне
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.open)('.modal', timeOut);                                                                                               // открываем модальное окно

      const thanksModal = document.createElement('div');                                                    // создаем див
      thanksModal.classList.add('modal__dialog');                                                           // добавляем ему клас как у старого и наполняем новым контенктом
      thanksModal.innerHTML = `                                                                             
      <div class = "modal__content">
         <div data-close class="modal__close">&times;</div>
         <div class="modal__title">${message}</div>
      </div>
      `;

      document.querySelector('.modal').append(thanksModal);                                                 // находим модальное окно, и закидываем новое в конец

      setTimeout(() => {                                                                                    // чтобы новое меню убиралось через 4 секунды
         thanksModal.remove();
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.close)('.modal');                                                                                           // закроем окно, чтобы не мешало
      }, 2000);
   }

   fetch('http://localhost:3000/menu ')
      .then(data => data.json())
   // .then(res => console.log(res));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "close": () => (/* binding */ close),
/* harmony export */   "open": () => (/* binding */ open)
/* harmony export */ });
function open(modalSelector, timeOut) {                                                        // Вынес в функцию элементы, которые внутри события выше
   const modal = document.querySelector(modalSelector);
   modal.classList.add('show');
   modal.classList.remove('hide');
   document.body.style.overflow = 'hidden';

   console.log(timeOut);
   if (timeOut) {
      clearInterval(timeOut);                                                             // Если польз. сам открыл мод. окно, оно через время само не будет всплывать
   }
}



function close(modalSelector) {                                                       // Чтобы не повторять одно и то же, делаем функц. и подст. ее
   const modal = document.querySelector(modalSelector);                             
   modal.classList.add('hide');
   modal.classList.remove('show');
   document.body.style.overflow = '';                                                 // возвращаем прокрутку сайта, когда модальное окно закрыто 
}



function modal(modalSelector, triggerSelector, timeOut) {
     // Модальное окно

     const modal = document.querySelector(modalSelector);
     const modalOpen = document.querySelectorAll(triggerSelector);
     // const modalClose = document.querySelector('[data-close]');                          // Изменим код, чтобы крестик закрытия мог закрываться и у элементов ниже по коду
  
  
     modalOpen.forEach((element) => {                                                       // сокращенный вариант верхнего
        element.addEventListener('click', () => open(modalSelector, timeOut));                       // open не должна вызывать тут функцию(в обработчиках события) т.е. без (), но нам нужно передать переменную, поэтому делаем через () => open(xxx)
     })

  
     // Закрытие окна на Escape
     document.addEventListener('keyup', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {                  // выполнить если нажат Escape и если у modal есть класс show
           close(modalSelector);
        }
     });
  
  
     // Закрытие окна на клик за модальное окно (добавлено: или на крестик)
     modal.addEventListener('click', (event) => {                                            // В css modal - родитель окна, он имеет ширину и высоту 100%, а следующая обертка за ним
        // уже фиксированные ширину и высоту => клакая на окно мы кликаем на дочку а не на родителя
        if (event.target === modal || event.target.getAttribute('data-close') == '') {       // ... || event.target... - или если есть атрибут data-close (это наш крестик)
           close(modalSelector);
        }
     });
  
  
  
     // Открытие модального окна при скролле в самый низ
     function scrollModal() {
        if (window.pageYOffset + document.documentElement.clientHeight >=                       // если ширина прокручиваемая + ширина экрана >= всей ширине
           document.documentElement.scrollHeight) {                                            // тогда выполнить код:
           open(modalSelector, timeOut);
           window.removeEventListener('scroll', scrollModal);                                  // после выполнения 1 раз удаляем обраб. события
        }
     }
  
     window.addEventListener('scroll', scrollModal);                                           // При любом скролле вызывается функция выше
   
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);                                                                          // Основной экспорт




/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
   // Slider

   const slides = document.querySelectorAll(slide),
         prev = document.querySelector(prevArrow),
         next = document.querySelector(nextArrow),
         current = document.querySelector(currentCounter),
         total = document.querySelector(totalCounter),
         slidesWrapper = document.querySelector(wrapper),
         slideField = document.querySelector(field),
         width = window.getComputedStyle(slidesWrapper).width;                                          // вытащить ширину объект
   
   let slideIndex = 1;                                                                               // нужен для счетчика слайдов
   let offset = 0;                                                                                   // отступ вправо или лево при работе транзишена

   if (slides.length < 10) {                                                                         // счетчик слайдов
      total.textContent = `0${slides.length}`;
      current.textContent = `0${slideIndex}`;
   } else {
      total.textContent = slides.length;
      current.textContent = slideIndex;
   }

   slideField.style.width = 100 * slides.length + '%';                                               // задаем ширину равной вмем слайдам через % и другие настроки для списка и плавности
   slideField.style.display = 'flex';
   slideField.style.transition = '0.5s all';
   slidesWrapper.style.overflow = 'hidden';                                                          // задаем сокрытие элементов, выходящих за границы wrapper

   slides.forEach(slide => {
      slide.style.width = width;                                                                     // задаем ширину всем элементам одинаковую, полученную с wrapper
   })


   next.addEventListener('click', () => {
      if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {                       // если клик вперед при последнем слайде - вернуть оффсет на 0 (первый слайд)
         offset = 0;
      } else {
         offset += +width.replace(/\D/g, '');                                                // иначе - просто дабавить 1 слайд
      }

      slideField.style.transform = `translateX(-${offset}px)`

      if (slideIndex == slides.length) {
         slideIndex = 1;
      } else {
         slideIndex++;     
      }

      if (slides.length < 10) {
         current.textContent = `0${slideIndex}`;
      } else {
         current.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '0.5');
      dots[slideIndex - 1].style.opacity = '1';
   });

   prev.addEventListener('click', () => {
      if (offset == 0) {
          offset = +width.replace(/\D/g, '') * (slides.length - 1);
      } else {
         offset -= +width.replace(/\D/g, '');                                                // иначе - отнять оффсет 1 слайда
      }

      slideField.style.transform = `translateX(-${offset}px)`

      if (slideIndex == 1) {
         slideIndex = slides.length;
      } else {
         slideIndex--;
      }

      if (slides.length < 10) {
         current.textContent = `0${slideIndex}`;
      } else {
         current.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '0.5');
      dots[slideIndex - 1].style.opacity = '1';
   });



   //_________________________________________________ navigation dots____________________________________________________

   const slider = document.querySelector(container);   
   slider.style.position = 'relative';                                        // делаем релатив
   const indicators = document.createElement('ol');
   indicators.classList.add('carousel-indicators');
   const dots = [];

   indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
   `;
   slider.append(indicators);

   for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);                            // задаем атрибуты со значением с цифрой от цикла for
      dot.style.cssText = `
         box-sizing: content-box;
         flex: 0 1 auto;
         width: 30px;
         height: 6px;
         margin-right: 3px;
         margin-left: 3px;
         cursor: pointer;
         background-color: #fff;
         background-clip: padding-box;
         border-top: 10px solid transparent;
         border-bottom: 10px solid transparent;
         opacity: .5;
         transition: opacity .6s ease;
      `;
      if (i == 0) {
         dot.style.opacity = '1';
      }
      indicators.append(dot);
      dots.push(dot);                                                     // пушим точки в созданный пустой массив
   }



   dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
         const slideTo = e.target.getAttribute('data-slide-to');

         slideIndex = slideTo;
         offset = rep(width) * (slideTo - 1);

         slideField.style.transform = `translateX(-${offset}px)`;

         if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
         } else {
            current.textContent = slideIndex;
         }

         dots.forEach(dot => dot.style.opacity = '0.5');
         dots[slideIndex - 1].style.opacity = '1';
      })
   })

   function rep(item) {                                                    // сделал функцию по замене рег. выражения для обрезания 200px до числа 200
      return item.replace(/\D/g, '')
   };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
      //Tabs

      const tabs = document.querySelectorAll(tabsSelector);
      const tabsContent = document.querySelectorAll(tabsContentSelector);
      const tabsParent = document.querySelector(tabsParentSelector);         // родитель табов, для делегирования
   
   
      function hideTabContent() {
         tabsContent.forEach(item => {
            item.classList.add('hide');               // чтобы скрыть все элементы - довавляем класс, который скрывает элементы через styleAdd - новый css
            item.classList.remove('show', 'fade');            // и дописываем remode показывающий, чтобы он удалялся, если был это этого. Fade - анимация
         });
   
         tabs.forEach(item => {
            item.classList.remove(activeClass);
         });
      }
   
   
      function showTabContent(i = 0) {
         tabsContent[i].classList.add('show', 'fade');      // наоборот от верхнего
         tabsContent[i].classList.remove('hide');
         tabs[i].classList.add(activeClass);
      }
   
   
   
      hideTabContent();
      showTabContent();
   
   
   
      tabsParent.addEventListener('click', (event) => {
         const target = event.target;
         if (target && target.classList.contains(tabsSelector.slice(1))) {                       // Тут не нужна точка в аргументе, слайсим - убираем перый символ
            tabs.forEach((item, i) => {
               if (target == item) {
                  hideTabContent();
                  showTabContent(i);
               }
            });
         }
      });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
   // Timer

   function getTimeRemaning(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date()),                                   // Date.parse - для работы со строкой deadline (упрощенный вариант)
         days = Math.floor(t / (1000 * 3600 * 24)),
         hours = Math.floor(t / (1000 * 3600) % 24),                                         // Взятие остатка от деления % (часов не должно быть больше 24 =)
         mitutes = Math.floor(t / (1000 * 60) % 60),
         seconds = Math.floor(t / (1000) % 60);

      return {                                                                                  // возвращаем переменные из функции, чтобы работать с ними ниже
         'total': t,
         'days': days,
         'hours': hours,
         'minutes': mitutes,
         'seconds': seconds
      };
   }

   function getZero(num) {                                                                       // Функция, чтобы перед цифрами в 1 строку ставился "0"
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }


   function setClock(selector, endtime) {                                                       // Находим и задаем переменные в html
      const timer = document.querySelector(selector),
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds'),
         timeInterval = setInterval(updateClock, 1000);                                      // Также задаем интервал обновления функции по смене чисел

      updateClock();                                                                            /* Вызываем ее заранее здесь, чтобы если обновлять странцицу старые цифры не лагали 
                                                                                                   и их не было видно 1 секунду, т.к. setInterval стоит в 1сек. и пока она пре пройдет, 
                                                                                                   старые цифры на новые не поменяются. Т.е. просто принудительно вызываем функ. заранее */

      function updateClock() {                                                                  // Функция по замене переменных из функции в начале на переменные из html
         const t = getTimeRemaning(endtime);

         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);

         if (t.total <= 0) {                                                                    // Остановка таймера когда наступен дата окончания
            clearInterval(timeInterval);
         }
      }
   }

   setClock(id, deadline);                                                                // Запуск всего
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const postData = async (url, data) => {
   const res = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-type': 'application/json'
      },
      body: data
   });

   return await res.json();
};

// Убрать вручную написанные карточки (ниже) и забирать их из бызы нанных (db.json и со включенным json-server)

const getResource = async (url) => {
   const res = await fetch(url);

   if (!res.ok) {
      throw new Error(`Could not fetch ${url}, statys: ${res.status}`);
   }

   return await res.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");











window.addEventListener('DOMContentLoaded', () => {
   // Вызов модального окна через n милисекунд
   const timeOut = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.open)('.modal', timeOut), 500000)

   ;(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active'); 
   (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('.modal', '[data-open]', timeOut); 
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-06-01T00:00:00');
   (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])(); 
   (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])(); 
   (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
      container: '.offer__slider',
      slide: '.offer__slide',
      nextArrow: '.offer__slider-next',
      prevArrow: '.offer__slider-prev',
      totalCounter: '#total',
      currentCounter: '#current',
      wrapper: '.offer__slider-wrapper',
      field: '.offer__slider-inner'
   }); 
   (0,_modules_forms__WEBPACK_IMPORTED_MODULE_6__["default"])('form', timeOut); 
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map