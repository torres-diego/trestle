let closeBtn = document.querySelector('.close');
let message = document.querySelector('.msg');
closeBtn.addEventListener('click', function() {
    message.classList.add('hide');
});