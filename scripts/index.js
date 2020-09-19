const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const elementsList = document.querySelector('.elements__list'); // Находим блок списка карточек
const profileName = document.querySelector('.profile__name'); // Находим блок с именем
const profileDesc = document.querySelector('.profile__description'); // Находим блок с описанием
const popup = document.querySelector('.popup'); // Находим блок popup
const openPopupButton = document.querySelector('.profile__button_type_edit'); // Находим кнопку для открытия popup
const closePopupButton = popup.querySelector('.popup__close'); // Находим кнопку для закрытия popup
const formElement = popup.querySelector('.popup__form'); // Находим форму в DOM
const popupInput = formElement.querySelectorAll('.popup__input'); // Находим input в DOM

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
// Функция добавления карточек при помощи JS`c
const addCards = () => {
  initialCards.map(function (el) {
    const cardTemplate = document.querySelector('#template-card').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.elements__image').setAttribute('src', el.link);
    cardElement.querySelector('.elements__header').textContent = el.name;
    elementsList.append(cardElement);
    console.log(cardElement);
  })
}

addCards();
openPopupButton.addEventListener('click', openPopup); // Вешаем обработчик клика на кнопку открытия popup
closePopupButton.addEventListener('click', togglePopup); // Вешаем обработчик клика на кнопку закрытия popup
formElement.addEventListener('submit',formSubmitHandler);


