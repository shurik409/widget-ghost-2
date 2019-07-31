import React, { Component } from 'react';
import { withСryptoService } from '../hoc';
import CurrencyListItem from '../currency-list-item';

export class CurrencyList extends Component {

    state = {
        symbols: []
    };

    componentDidMount = () => {
        const { cryptoService } = this.props;

        cryptoService.getAvailableSymbols()
            .then(symbols => this.setState({ symbols }));
    }

    render = () => {
        const { symbols } = this.state;

        console.log(symbols);
        
        return (
            <div>
                {symbols.map(({ Symbol: symbol, MarginCurrency, ProfitCurrency }) => (
                    <CurrencyListItem
                        symbol={symbol} 
                        marginCurrencyName={MarginCurrency}
                        profitCurrencyName={ProfitCurrency} />
                ))}
            </div>
        );
    }
}
export default withСryptoService()(CurrencyList);