
// Objet Api pour faire l'appel à la basse de donnée

class Api {
    constructor(url) {
        this._url = url
    }
    async get() {
        return fetch(this._url)
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log('an error occurs', err))
    }

}


class KanapApi extends Api {
    constructor(url) {
        super(url)
    }
    async getKanap() {
        return await this.get()
    }
}

