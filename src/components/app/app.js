import React, { Component } from 'react';
import './app.css';
import CurrencyList from '../currency-list';
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
                    <div className="row justify-content-center">
                        <div className="col-md-4 ">
                            <div className='row mt-3 mb-3'>
                                <div className='col-md-6'>
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
                    </div>
                </div>
            </>
        );
    };
}

export default withCryptoService()(App);