import React, { Component } from 'react';
import { withCryptoService } from '../hoc';

export class CurrencyList extends Component {

    render = () => {
        const { symbols, selectOtherSymbolCallback } = this.props;

        
        return (
            <select onChange={ selectOtherSymbolCallback }>
                {symbols.map(({ Symbol: symbol }) => {
                    return symbol.indexOf('_') < 0 ? <option key={symbol}>{symbol}</option> : <></>
                })}
            </select>
        );
    }
}
export default withCryptoService()(CurrencyList);