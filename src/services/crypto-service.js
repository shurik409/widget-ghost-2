class СryptoService {

    _apiBase = 'https://cryptottlivewebapi.fxopen.net:8443/';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        console.log(`${this._apiBase}${url}`)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }

        return res.json();
    }

    getAvailableSymbols() {
        return this.getResource(`/api/v1/public/symbol/`);
    }

    getFilteredLevel2Ticks(filter) {
        return this.getResource(`/api/v1/public/symbol/${filter}`);
    }

    getLevel2FilterBySymbol(symbol, depth) {
        return this.getResource(`/api/v1/public/level2/${symbol}?depth=${depth}`);
    }

    getQuoutehistoryBySymbol(symbol, count) {
        const date = Date.now();
        return this.getResource(`/api/v1/public/quotehistory/${symbol}/level2?timestamp=${date}&count=${-count}`);
    }
}

export default СryptoService;