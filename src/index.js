import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import FXOpenService from './services/fxopen-service';
import { FXOpenServiceProvider } from './components/fxopen-service-context';

const fxopenService = new FXOpenService();

ReactDOM.render(
    <FXOpenServiceProvider value={fxopenService}>
        <App />
    </FXOpenServiceProvider>,
    document.getElementById('root')
);