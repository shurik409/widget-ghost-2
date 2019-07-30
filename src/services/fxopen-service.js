class FXOpenService {

    _apiBase = 'https://cryptottlivewebapi.fxopen.net:8443/';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }

        return await res.json();
    }

    async getAvailablePublicSymbols() {
        const res = await this.getResource('/api/v1/public/symbol/');

        return res;
    }
}

export default FXOpenService;