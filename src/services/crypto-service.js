class СryptoService {

    _apiBase = 'https://cryptottlivewebapi.fxopen.net:8443/';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        console.log(`${this._apiBase}${url}`)
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

    async getLevel2FilterBySymbol(symbol, depth) {
        return await this.getResource(`/api/v1/public/level2/${symbol}?depth=${depth}`);
    }

    async getQuoutehistoryBySymbol(symbol, count) {
        const date = Date.now();
        return await this.getResource(`/api/v1/public/quotehistory/${symbol}/level2?timestamp=${date}&count=${-count}`);
    }
}

export default СryptoService;