import {getResource} from '../services/services';

function cards() {

   class AddCart {
      constructor(cardNum, img, name, descr, price, alt, ...classes) {
         this.img = img;     
         this.name = name;
         this.descr = descr;
         this.price = price;
         this.alt = alt;
         this.classes = classes;
         this.cart = document.querySelector(cardNum); 
         this.valute = 27; 
         this.changeValute(); 
         this.changeHtml(); 
      }

      changeHtml() {
         const element = document.createElement('div'); 

         if (this.classes.length === 0) { 
            // тогда присваеваем menu__item
            this.element = 'menu__item';
            element.classList.add(this.element);
         } else {
            this.classes.forEach(className => element.classList.add(className));                        
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
         this.cart.append(element);  
      }

      changeValute() {
         this.price = +this.price * this.valute;
      }

      removePrevious() {
         this.cart.innerHTML = '';
      }
   }
   getResource('http://localhost:3000/menu')
      .then(data => {
         data.forEach(({ img, title, descr, price, alt }) => { 
            new AddCart('.menu__field .container', img, title, descr, price, alt);
         });
      });

}

export default cards;