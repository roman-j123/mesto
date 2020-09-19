let profileName = document.querySelector('.profile__name'); // Находим блок с именем
let profileDesc = document.querySelector('.profile__description'); // Находим блок с описанием
let popup = document.querySelector('.popup'); // Находим блок popup
let openPopupButton = document.querySelector('.profile__button_type_edit'); // Находим кнопку для открытия popup
let closePopupButton = popup.querySelector('.popup__close'); // Находим кнопку для закрытия popup
let formElement = popup.querySelector('.popup__form'); // Находим форму в DOM
let popupInput = formElement.querySelectorAll('.popup__input'); // Находим input в DOM

const openPopup = () => {
  popupInput[0].value = profileName.textContent;
  popupInput[1].value = profileDesc.textContent;
  return togglePopup();
}
const togglePopup = () => {
  return popup.classList.toggle('popup_open')
}
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupInput[0].value;
  profileDesc.textContent = popupInput[1].value;
  togglePopup(evt);
}

openPopupButton.addEventListener('click', openPopup); // Вешаем обработчик клика на кнопку открытия popup
closePopupButton.addEventListener('click', togglePopup); // Вешаем обработчик клика на кнопку закрытия popup
formElement.addEventListener('submit',formSubmitHandler);
