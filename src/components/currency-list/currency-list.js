import React, { Component } from 'react';
import { withCryptoService } from '../hoc';

export class CurrencyList extends Component {

    // state = {
    //     symbols: []
    // };

    // componentDidMount = () => {
    //     const { fxopenService } = this.props;

    //     fxopenService.getAvailableSymbols()
    //         .then(symbols => this.setState({ symbols }));
    // }

    render = () => {
        const { symbols, selectOtherSymbolCallback } = this.props;

        console.log(symbols);
        
        return (
            <select onChange={ selectOtherSymbolCallback }>
                {symbols.map(({ Symbol: symbol }) => {
                    return <option key={symbol}>{symbol}</option>
                })}
            </select>
        );
    }
}
export default withCryptoService()(CurrencyList);