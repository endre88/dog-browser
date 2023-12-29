import '../css/contentComponent.css';

export default class ContentComponent {
  displayError(message) {
    this.clearErrors();
    const popupMessage = document.createElement('h2');
    popupMessage.classList.add('error-message');
    popupMessage.textContent = message;
    document.querySelector('.errors').appendChild(popupMessage);
  }
  clearErrors() {
    const errors = document.querySelector('.errors');
    errors.innerHTML = '';
  }
  clearDogs() {
    const Dogs = document.querySelector('#content');
    Dogs.innerHTML = '';
  }
}
