import React, { Component } from 'react';
import './app.css';
import CurrencyList from '../currency-list';
import CurrencyIcon from '../currency-icon';
import Chart from '../chart';
import Table from '../table';
import PriceBoxes from '../price-boxes';
import { withCryptoService } from '../hoc';

export class App extends Component {
    state = {
        symbols: [],
        currentSymbol: '',
        chartData: null,
        lastBidAsk: null
    };

    getSymbols = async () => {
        const { cryptoService } = this.props;

        let data = await cryptoService.getAvailableSymbols();
        this.setState({ symbols: data, currentSymbol: data[0].Symbol })
        this.getChartData(data[0].Symbol);
        this.getlastBidAsk(data[0].Symbol);
    }

    getChartData = async (symbol) => {
        const { cryptoService } = this.props;
        
        let data = await cryptoService.getQuoutehistoryBySymbol(symbol, 100);
        console.log(data);

        this.setState({ chartData: data })
    }

    getlastBidAsk = async (symbol) => {
        const { cryptoService } = this.props;
        
        let data = await cryptoService.getLevel2FilterBySymbol(symbol, 5);

        this.setState({ lastBidAsk: data })
    }

    selectOtherSymbol = (event) => {
        this.setState({currentSymbol: event.target.value})
        this.getChartData(event.target.value);
        this.getlastBidAsk(event.target.value);
    }

    componentDidMount = () =>  {
        this.getSymbols();
    }

    render = () => {
        const { symbols, currentSymbol, chartData, lastBidAsk } = this.state;

        return (
            <>
                <div className='container'>
                <div className='d-flex justify-content-center'>
                        <div className='company'></div>
                        <div className='company'></div>
                        <div className='company'></div>
                        <div className='company'></div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className='account'></div>
                        <div className='account'></div>
                        <div className='account'></div>
                        <div className='account'></div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-4 left">
                            <div className='left-block'></div>
                            <div className='left-block'></div>
                        </div>
                        <div className="col-md-4">
                            <div className='row widget-header'>
                                <div className='col-md-6 d-flex'>
                                    <div className='mr-2 d-flex'>
                                        <CurrencyIcon symbol={currentSymbol}/>
                                    </div>
                                    <CurrencyList symbols={symbols} selectOtherSymbolCallback={this.selectOtherSymbol}/>
                                </div>
                                <div className='col-md-6'>
                                    <Chart currentSymbol={currentSymbol} chartData={chartData}/>
                                </div>
                            </div>
                            <PriceBoxes currentSymbol={currentSymbol} lastBidAsk={lastBidAsk}/>
                            <div className="row">
                                <Table currentSymbol={currentSymbol} lastBidAsk={lastBidAsk}/>
                            </div>
                        </div>
                        <div className="col-md-4 right">
                            <div className='right-block'></div>
                            <div className='right-block'></div>
                            <div className='right-block'></div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
}

export default withCryptoService()(App);
