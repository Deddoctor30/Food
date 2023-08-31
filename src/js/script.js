'use strict';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import slider from './modules/slider';
import forms from './modules/forms';
import {open} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
   // Вызов модального окна через n милисекунд
   const timeOut = setTimeout(() => open('.modal', timeOut), 500000)

   tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active'); 
   modal('.modal', '[data-open]', timeOut); 
   timer('.timer', '2022-06-01T00:00:00');
   cards(); 
   calc(); 
   slider({
      container: '.offer__slider',
      slide: '.offer__slide',
      nextArrow: '.offer__slider-next',
      prevArrow: '.offer__slider-prev',
      totalCounter: '#total',
      currentCounter: '#current',
      wrapper: '.offer__slider-wrapper',
      field: '.offer__slider-inner'
   }); 
   forms('form', timeOut); 
});

