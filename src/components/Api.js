export default class Api {
    constructor({address, token, groupId}) {
        this._address = address;
        this._token = token;
        this._group = groupId;
    }
    getCards() {
        return fetch(`${this._address}/v1/${this._group}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }
    getUser() {
        return fetch(`${this._address}/v1/${this._group}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }
    updateUser(item) {
        return fetch(`${this._address}/v1/${this._group}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'                
            },
            body: JSON.stringify({
                name: item.name,
                about: item.description
            })
        }).then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }
    addNewCard(name, link) {
        return fetch(`${this._address}/v1/${this._group}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }
    removeCard(id) {
        return fetch(`${this._address}/v1/${this._group}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
    }
}