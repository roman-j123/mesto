let profileName = document.querySelector('.profile__name'); // Находим блок с именем
let profileDesc = document.querySelector('.profile__description'); // Находим блок с описанием
let popup = document.querySelector('.popup'); // Находим блок popup
let openPopupButton = document.querySelector('.profile__button_type_edit'); // Находим кнопку для открытия popup
let closePopupButton = popup.querySelector('.popup__close'); // Находим кнопку для закрытия popup
let formElement = popup.querySelector('.popup__form'); // Находим форму в DOM
let popupInput = popup.querySelectorAll('.popup__input'); // Находим input в DOM
let popupSaveButton = popup.querySelector('.popup__button');

openPopupButton.addEventListener('click', togglePopup); // Вешаем обработчик клика на кнопку открытия popup
closePopupButton.addEventListener('click', togglePopup); // Вешаем обработчик клика на кнопку закрытия popup
formElement.addEventListener('submit',formSubmitHandler);
popupSaveButton.addEventListener('click', formSubmitHandler); // Вешаем обработчик на кнопку сохранить

// Создаём функцию которая будет принимать значения textContent
function saveData() {
  popupInput[0].value = profileName.textContent; // Первому полю присвоили value = textContent
  popupInput[1].value = profileDesc.textContent; // Второму полю присвоили value = textContent
}

// Создаём функцию обновления данных
function updateData() {
  profileName.textContent = popupInput[0].value;
  profileDesc.textContent = popupInput[1].value;
}
// Создаём функицю togglePopup которая будет возвращать переключение класса
function togglePopup() {
  saveData(); // Вызываем функцию сохранения данных
  return popup.classList.toggle('popup_open');
}
// Обработчик отправки формы
function formSubmitHandler (evt) {
  evt.preventDefault(); // Отмена стандартной отправки формы
  updateData(); // Вызываем функцию обновления данных
  togglePopup(); // Вызываем функцию переключения класса
}
