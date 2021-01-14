import Popup from '../components/Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector, zoomingImageSelector, zoomingFigcaptionSelector) {
    super(popupSelector);
    this._zoomingImage = document.querySelector(zoomingImageSelector);
    this._zoomingFigcaption = document.querySelector(zoomingFigcaptionSelector);
  }
  open(name, link) {
    this._zoomingImage.src = link;
    this._zoomingImage.alt = name;
    this._zoomingFigcaption.textContent = name;
    super.open();
  }
}
