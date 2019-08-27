import React, { Component } from 'react';
import { withCryptoService } from '../hoc';
import currency from '../../utils/currency-info'
import './currency-icon.css';


export class CurrencyIcon extends Component {

    render = () => {
        const { symbol } = this.props;
        const firstCurrency = symbol.substr(0,3).toLowerCase();
        const secondCurrency = symbol.substr(3,3).toLowerCase();
        return (
            symbol && <>
                <div className='icons'>
                    { ( firstCurrency.length && currency[firstCurrency] ) ? <div className='img-wrapper'><img className='currency-icon' src={currency[firstCurrency].image} alt=''/></div> : false}
                    { ( secondCurrency.length && currency[secondCurrency] ) ? <div className='img-wrapper'><img className='currency-icon' src={currency[secondCurrency].image} alt=''/></div> : false}
                </div>
            </>
        );
    }
}
export default withCryptoService()(CurrencyIcon);