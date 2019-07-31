import React, { Component } from 'react';
import './app.css';
import CurrencyList from '../currency-list';
import Chart from '../chart';
import Table from '../table';
import PriceBoxes from '../price-boxes';
import { withFXOpenService } from '../hoc';

export class App extends Component {
    state = {
        symbols: [],
        currentSymbol: '',
        chartData: null,
        lastBidAsk: null
    };

    getSymbols = async () => {
        const { fxopenService } = this.props;

        let data = await fxopenService.getAvailableSymbols();
        this.setState({ symbols: data, currentSymbol: data[0].Symbol })
        this.getChartData(data[0].Symbol);
        this.getlastBidAsk(data[0].Symbol);
    }

    getChartData = async (symbol) => {
        const { fxopenService } = this.props;
        
        let data = await fxopenService.getQuoutehistoryBySymbol(symbol, 100);

        this.setState({ chartData: data })
    }

    getlastBidAsk = async (symbol) => {
        const { fxopenService } = this.props;
        
        let data = await fxopenService.getLevel2FilterBySymbol(symbol, 5);

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
                <CurrencyList symbols={symbols} selectOtherSymbolCallback={this.selectOtherSymbol}/>
                <Chart currentSymbol={currentSymbol} chartData={chartData}/>
                <Table currentSymbol={currentSymbol} lastBidAsk={lastBidAsk}/>
                <PriceBoxes currentSymbol={currentSymbol} lastBidAsk={lastBidAsk}/>
            </>
        );
    };
}

export default withFXOpenService()(App);