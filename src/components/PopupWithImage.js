import Popup from '../components/Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector, zoomingImageSelector, zoomingFigcaptionSelector) {
    super(popupSelector);
    this._zoomingImageSelector = document.querySelector(zoomingImageSelector);
    this._zoomingFigcaptionSelector = document.querySelector(zoomingFigcaptionSelector);
  }
  open(name, link) {
    this._zoomingImageSelector.src = link;
    this._zoomingImageSelector.alt = name;
    this._zoomingFigcaptionSelector.textContent = name;
    super.open();
  }
}
