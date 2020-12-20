import Popup from './Popup.js';
import * as data from '../utils/config.js';

export default class UserInfo {
  constructor({userName, userDescription}) {
    this._userName = userName;
    this._userDescription = userDescription;
  }
  getUserInfo() {
    data.inputUserName.value = this._userName;
    data.inputUserDescription.value = this._userDescription;
  }
  setUserInfo() {
    data.profileName.textContent = data.inputUserName.value;
    data.profileDesc.textContent = data.inputUserDescription.value;
  }
}
