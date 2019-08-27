import React, { Component } from 'react';
import { withCryptoService } from '../hoc';
import './currency-list.css';
import CurrencyElement from '../currency-element';

export class CurrencyList extends Component {

    state = {
        currencyOpen: false
    }

    openList = () => {
        // this.setState((prevState) => ({currencyOpen: !prevState.currencyOpen}))
        // document.getElementById('currencySelect').classList.toggle('hidden')
    }

    selectCurrency = (symbol) => {
        const { selectOtherSymbolCallback } = this.props;

        document.getElementById('currencySelect').classList.add('hidden');
        selectOtherSymbolCallback(symbol);
    }

    render = () => {
        const { symbols, currentSymbol } = this.props;
        // const { currencyOpen } = this.state;
        
        return (
            <>
                {/* <select onChange={ selectOtherSymbolCallback }>
                    {symbols.map(({ Symbol: symbol }) => {
                        return !symbol.includes('_') && <option key={symbol}>{symbol}</option>
                    })}
                </select> */}
                <div className='currency-selected' id='currencyList'>
                    <div className='selected-info' onClick={() => this.openList()}>
                            <CurrencyElement symbol={currentSymbol}/>
                        <div className='selected-arrow'/>
                    </div>
                    <div className='menu hidden' id='currencySelect'>
                        {/* <div className='input-wrapper'>
                            <div className='search-icon'/>
                            <input className='currency-input' placeholder='Type a currency'/>
                            <div className='search-cancel'/>
                        </div> */}
                        <ul>
                        {Array.from(symbols.values()).map(({ Symbol: symbol }) => {
                            return !symbol.includes('_') && 
                            <li key={symbol}>
                                <div className='currency-element'>
                                    <CurrencyElement symbol={symbol} callback={this.selectCurrency}/>
                                </div>
                            </li>
                        })}
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}
export default withCryptoService()(CurrencyList);