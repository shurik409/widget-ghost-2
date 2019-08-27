import  CryptoJS  from 'crypto-js';

const webApi = {
    id: 'eeb62ec4-31fd-4bf6-b580-be81e22ddc5c',
    key: 'DHKfZEtAWNhWNy9n',
    secret: 'eZDE6MNHJGP5zWSEDXFMgF2PZ6JqtkdxRD82HNQma9A84fH86m36DmsH8YPabxnz'
}

class СryptoService {

    _apiBase = 'https://ttlivewebapi.fxopen.net:8443';

    async getResource(url) {
        
        const res = await fetch(`${this._apiBase}${url}`, {
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "accept-encoding": "gzip, deflate",
                "authorization": this.getAutorizationHMAC(url)
            }
        });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }

        return res.json();
    }

    getAutorizationHMAC(url) {
        const time = Date.now();
        const signature = `${time}${webApi.id}${webApi.key}GET${this._apiBase}${url}`
        const Base64HMACSignature  = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(signature, webApi.secret));

        return `HMAC ${webApi.id}:${webApi.key}:${time}:${Base64HMACSignature}`;
    }

    getAvailableSymbols() {
        return this.getResource(`/api/v1/symbol`);
    }

    getFilteredLevel2Ticks(filter) {
        return this.getResource(`/api/v1/symbol/${filter}`);
    }

    getLevel2FilterBySymbol(symbol, depth) {
        return this.getResource(`/api/v1/level2/${symbol}?depth=${depth}`);
    }

    getQuoutehistoryBySymbol(symbol, count) {
        const date = Date.now();
        return this.getResource(`/api/v1/quotehistory/${symbol}/ticks?timestamp=${date}&count=${count}`);
    }
}

export default СryptoService;
