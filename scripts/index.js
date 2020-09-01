let profileName = document.querySelector('.profile__name'); // Находим блок с именем
let profileDesc = document.querySelector('.profile__description'); // Находим блок с описанием
let popup = document.querySelector('.popup'); // Находим блок popup
let openPopupButton = document.querySelector('.profile__button_type_edit'); // Находим кнопку для открытия popup
let closePopupButton = popup.querySelector('.popup__close'); // Находим кнопку для закрытия popup
let formElement = popup.querySelector('.popup__form'); // Находим форму в DOM
let popupInput = formElement.querySelectorAll('.popup__input'); // Находим input в DOM
let popupSaveButton = popup.querySelector('.popup__button');

function openPopup() {
  popup.classList.add('popup_open');
  if(popup.classList.contains('popup_open')) {
    popupInput[0].value = profileName.textContent;
    popupInput[1].value = profileDesc.textContent;
  }
}
function closePopup() {
  return popup.classList.remove('popup_open')
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupInput[0].value;
  profileDesc.textContent = popupInput[1].value;
  closePopup();
}

openPopupButton.addEventListener('click', openPopup); // Вешаем обработчик клика на кнопку открытия popup
closePopupButton.addEventListener('click', closePopup); // Вешаем обработчик клика на кнопку закрытия popup
formElement.addEventListener('submit',formSubmitHandler);

/*
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
  popup.classList.toggle('popup_open');
  //Проверяем, если popup содержит popup_open: вытягиваем данные из profileName, profileDesc
  if(popup.classList.contains('popup_open')) {
    saveData(); // Выполняем функцию сохранения данных
  }
}
// Обработчик отправки формы
function formSubmitHandler (evt) {
  evt.preventDefault(); // Отмена стандартной отправки формы
  updateData(); // Вызываем функцию обновления данных
  togglePopup(); // Вызываем функцию переключения класса
}
*/
