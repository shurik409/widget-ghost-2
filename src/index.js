import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import CryptoService from './services/crypto-service';
import { CryptoServiceProvider } from './components/crypto-service-context';

const cryptoService = new CryptoService();

ReactDOM.render(
    <CryptoServiceProvider value={cryptoService}>
        <App />
    </CryptoServiceProvider>,
    document.getElementById('root')
);