import React, { Component } from 'react';
import './app.css';
import CurrencyList from '../currency-list';

class App extends Component {
    render = () => {
        return (
            <CurrencyList />
        );
    };
}

export default App;