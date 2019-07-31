import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import CryptoService from './services/crypto-service';
import { СryptoServiceProvider } from './components/crypto-service-context';

const cryptoService = new CryptoService();

ReactDOM.render(
    <СryptoServiceProvider value={cryptoService}>
        <App />
    </СryptoServiceProvider>,
    document.getElementById('root')
);