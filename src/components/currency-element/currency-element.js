import React, { PureComponent } from 'react';
import './currency-element.css';
import CurrencyIcon from '../currency-icon';
import currency from '../../utils/currency-info'
export default class CurrencyElement extends PureComponent {

    getSymbolName = (symbol) => {
        const firstCurrency = symbol.substr(0,3).toLowerCase();
        const secondCurrency = symbol.substr(3,3).toLowerCase();
        
        return `${currency[firstCurrency] ? currency[firstCurrency].name : ''}/${currency[secondCurrency] ? currency[secondCurrency].name : ''}`
    }

    render = () => {
        const { symbol, callback } = this.props;
        return <>
            <div className='d-flex' onClick={() => callback ? callback(symbol) : false}> 
                <CurrencyIcon symbol={symbol}/>
                <div className='currency-symbol'>{symbol}</div> 
                {/* <div>{this.getSymbolName(symbol)}</div> */}
            </div>
        </>
    }
}