function open(modalSelector, timeOut) {  
   const modal = document.querySelector(modalSelector);
   modal.classList.add('show');
   modal.classList.remove('hide');
   document.body.style.overflow = 'hidden';

   console.log(timeOut);
   if (timeOut) {
      clearInterval(timeOut); 
   }
}



function close(modalSelector) {
   const modal = document.querySelector(modalSelector);                             
   modal.classList.add('hide');
   modal.classList.remove('show');
   document.body.style.overflow = '';
}



function modal(modalSelector, triggerSelector, timeOut) {
     const modal = document.querySelector(modalSelector);
     const modalOpen = document.querySelectorAll(triggerSelector);
     modalOpen.forEach((element) => {
        element.addEventListener('click', () => open(modalSelector, timeOut)); 
     })
     document.addEventListener('keyup', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
           close(modalSelector);
        }
     });
     modal.addEventListener('click', (event) => { 
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
           close(modalSelector);
        }
     });
     function scrollModal() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
           document.documentElement.scrollHeight) { 
           open(modalSelector, timeOut);
           window.removeEventListener('scroll', scrollModal);
        }
     }
     window.addEventListener('scroll', scrollModal); 
}

export default modal;   
export {close};
export {open};
