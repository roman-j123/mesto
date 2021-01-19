
export default class UserInfo {
  constructor({userName, userDescription}) {
    this._userName = userName;
    this._userDescription = userDescription;
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
  }
}
