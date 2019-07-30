import React, { Component } from 'react';

import './currency-list-item.css'

import btc from '../../assets/images/currency/btc.svg';
import ltc from '../../assets/images/currency/ltc.svg';
import dsh from '../../assets/images/currency/dsh.svg';
import usd from '../../assets/images/currency/usd.svg';

const currency = {
    btc, ltc, dsh, usd
};

class CurrencyListItem extends Component {
    render = () => {
        const { symbol, marginCurrencyName, profitCurrencyName } = this.props;

        return (
            <div className="currency-list-item">
                <div className="currency-list-item__logo">
                    <img src={currency[marginCurrencyName.toLowerCase()]} />
                    <img src={currency[profitCurrencyName.toLowerCase()]} />
                </div>
                <div className="currency-list-item__text">{symbol}</div>
            </div>
        );
    };
}

export default CurrencyListItem;