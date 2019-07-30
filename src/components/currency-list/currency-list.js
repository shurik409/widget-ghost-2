import React, { Component } from 'react';
import { withFXOpenService } from '../hoc';

export class CurrencyList extends Component {

    state = {
        symbols: []
    };

    componentDidMount = () => {
        const { fxopenService } = this.props;

        fxopenService.getAvailableSymbols()
            .then(symbols => this.setState({ symbols }));
    }

    render = () => {
        const { symbols } = this.state;

        console.log(symbols);
        
        return (
            <select>
                {symbols.map(({ Symbol: symbol }) => {
                    return <option key={symbol}>{symbol}</option>
                })}
            </select>
        );
    }
}
export default withFXOpenService()(CurrencyList);