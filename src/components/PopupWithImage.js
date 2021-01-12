import Popup from '../components/Popup.js';
import * as data from '../utils/config.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(name, link) {
    data.zoomingImage.src = link;
    data.zoomingImage.alt = name;
    data.zoomingFigcaption.textContent = name;
    super.open();
  }
}
