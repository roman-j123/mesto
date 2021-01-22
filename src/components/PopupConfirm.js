import Popup from './Popup.js';
export default class PopupConfirm extends Popup {
    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__button').addEventListener('click', () => {
            this._handleSubmitCallback();
        });
    }
    setSubmitAction(submitAction) {
       this._handleSubmitCallback = submitAction;
    }
}