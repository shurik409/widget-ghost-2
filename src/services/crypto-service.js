class СryptoService {

    _apiBase = 'https://cryptottlivewebapi.fxopen.net:8443/';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }

        return await res.json();
    }

    async getAvailableSymbols() {
        return await this.getResource(`/api/v1/public/symbol/`);
    }

    async getFilteredLevel2Ticks(filter) {
        return await this.getResource(`/api/v1/public/symbol/${filter}`);
    }
}

export default СryptoService;