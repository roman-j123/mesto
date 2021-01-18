export default class Api {
    constructor({address, token, groupId}) {
        this._address = address;
        this._token = token;
        this._group = groupId;
    }
    getCards() {
        return fetch(`${this._address}/v1/${this._group}/cards`, {
        headers: {
            authorization: this._token,
        }
        }).then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }
}