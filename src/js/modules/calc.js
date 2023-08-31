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

   function init (selector, activeClass) {
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

   init('#gender div', 'calculating__choose-item_active');
   init('.calculating__choose_big div', 'calculating__choose-item_active'); 

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

export default calc;