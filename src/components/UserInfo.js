
export default class UserInfo {
  constructor({userName, userDescription, userAvatar}) {
    this._userName = userName;
    this._userDescription = userDescription;
    this._userAvatar = userAvatar;
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
    }
  }
  setUserInfo(item) {
    this._userName.textContent = item.name;
    this._userDescription.textContent = item.about;
    this._userAvatar.src = item.avatar;
    this._userAvatar.alt = item.name;
  }

}
