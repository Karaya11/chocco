// modal-menu
const body = document.querySelector('body')
const btn = document.querySelector('.hamburger');
const modal = document.querySelector('.fullscreen-menu');
const close = document.querySelector('.fullscreen-menu__close');

btn.addEventListener("click", function(open) {
  modal.classList.add('fullscreen-menu--active');
  body.classList.add('body__hide-overflow');
  open.preventDefault();
});

close.addEventListener('click', function(close){
 if (modal.classList.contains('fullscreen-menu--active')) {
  modal.classList.remove('fullscreen-menu--active') || body.classList.remove('body__hide-overflow');
  close.preventDefault();
 }
})
