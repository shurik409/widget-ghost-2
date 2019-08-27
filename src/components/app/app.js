import React, { Component } from 'react';
import './app.css';
import CurrencyList from '../currency-list';
import Chart from '../chart';
import Table from '../table';
import PriceBoxes from '../price-boxes';
import { withCryptoService } from '../hoc';
import arrows from '../../img/arrows.svg';
import mt4 from '../../img/meta-trader-4-sign@3x.png';
import mt5 from '../../img/meta-trader-5-sign@3x.png';
import tickTrader from '../../img/sign-512-x-512.svg';
import hotSpot from '../../img/1@3x.png';
import lMax from '../../img/2@3x.png';
import curreneX from '../../img/3@3x.png';
import integral from '../../img/integral@3x.png';
import leftArrow from '../../img/arrow.svg';
import downArrow from '../../img/arrow-down.svg';

const marketDepthPairList = ['EURUSD', 'USDJPY', 'GBPUSD', 'USDCHF', 'USDCAD', 'EURGBP', 'EURJPY', 'GBPJPY', 'USDRUB', 'BTCUSD'];

export class App extends Component {
    state = {
        symbols: [],
        currentSymbol: '',
        chartData: null,
        lastBidAsk: null
    };

    getSymbols = async () => {
        const { cryptoService } = this.props;
        const { currentSymbol } = this.state;
        // let data = await cryptoService.getAvailableSymbols();
        let data = await cryptoService.getFilteredLevel2Ticks(marketDepthPairList.join('%2520'));
        let symbols = new Map();
        data.forEach(symbol => symbols.set(symbol.Symbol, symbol))
        this.setState({ symbols: symbols });
        //, currentSymbol: data[0].Symbol 
        if(!currentSymbol)
            this.setState({currentSymbol: data[0].Symbol });
        await this.getInfo(currentSymbol || data[0].Symbol);
        setTimeout(() => {
            this.getSymbols();
        }, 1000);
    }

    getInfo = async (symbol) => {
        this.getChartData(symbol);
        this.getlastBidAsk(symbol);
    }

    getChartData = async (symbol) => {
        const { cryptoService } = this.props;
        
        let data = await cryptoService.getQuoutehistoryBySymbol(symbol, 50);

        this.setState({ chartData: data })
    }

    getlastBidAsk = async (symbol) => {
        const { cryptoService } = this.props;
        
        let data = await cryptoService.getLevel2FilterBySymbol(symbol, 5);

        this.setState({ lastBidAsk: data })
    }

    selectOtherSymbol = (newSymbol) => {
        this.setState({currentSymbol: newSymbol})
        this.getChartData(newSymbol);
        this.getlastBidAsk(newSymbol);
    }

    componentDidMount = () =>  {
        this.getSymbols();
    }

    hideAll = (e) => {
        // if(e.target.id !== 'currencyList');
        //     document.getElementById('currencySelect').classList.add('hidden');
    }

    render = () => {
        const { symbols, currentSymbol, chartData, lastBidAsk } = this.state;

        return (
            <>
                <div className='container d-flex justify-content-center'  onClick={(e) => this.hideAll(e)}>
                    <div className='widget-wrapper'>
                        <div className='d-flex justify-content-center'>
                            <div className='company' style={{marginLeft: 0}}>
                                <img className='company-image' src={hotSpot} alt=''/>
                                <div className='company-arrow'>
                                    <img className='mirror' src={downArrow} alt=''/>
                                </div>
                            </div>
                            <div className='company'>
                                <img className='company-image' src={lMax} alt=''/>
                                <div className='company-arrow'>
                                    <img className='mirror' src={downArrow} alt=''/>
                                </div>
                            </div>
                            <div className='company'>
                                <img className='company-image' src={curreneX} alt=''/>
                                <div className='company-arrow'>
                                    <img className='mirror' src={downArrow} alt=''/>
                                </div>
                            </div>
                            <div className='company' style={{marginRight: 0}}>
                                <img className='company-image' src={integral} alt=''/>
                                <div className='company-arrow'>
                                    <img className='mirror' src={downArrow} alt=''/>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div className='account' style={{marginLeft: 0}}>FXOPEN ACCOUNT</div>
                            <div className='account'>FXOPEN ACCOUNT</div>
                            <div className='account'>FXOPEN ACCOUNT</div>
                            <div className='account' style={{marginRight: 0}}>FXOPEN ACCOUNT</div>
                        </div>
                        <div className="row justify-content-center">
                            <div className='arrow-image'>
                                <img className='arrows-back' src={arrows} alt=''/>
                            </div>
                            {/* col-md-4  */}
                            <div className='main-wrapper'>
                                <div className="left">
                                    <div className='left-wrapper'>
                                        <div className='left-block'>
                                            <div>
                                                <img className='block-image' src={mt4} alt=''/>
                                                <div className='block-text'>
                                                    <p>FXOPEN</p>
                                                    <p>MT4</p>
                                                    <p>CLIENT</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='left-arrow'>
                                            <p>BRIDGE</p>
                                            <img src={leftArrow} alt=''/>
                                        </div>
                                    </div>
                                    <div className='left-wrapper'>
                                        <div className='left-block'>
                                            <div>
                                                <img className='block-image' src={mt5} alt=''/>
                                                <div className='block-text'>
                                                    <p>FXOPEN</p>
                                                    <p>MT5</p>
                                                    <p>CLIENT</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='left-arrow'>
                                            <p>BRIDGE</p>
                                            <img src={leftArrow} alt=''/>
                                        </div>
                                    </div>
                                </div>
                                <div className="main-part">
                                    <div className='row widget-header'>
                                        <div className='col-md-6 d-flex header-element'>
                                            {/* <div className='mr-2 d-flex'>
                                                <CurrencyIcon symbol={currentSymbol}/>
                                            </div> */}
                                            <CurrencyList symbols={symbols} selectOtherSymbolCallback={this.selectOtherSymbol} currentSymbol={currentSymbol}/>
                                        </div>
                                        <div className='col-md-6 header-element'>
                                            <Chart symbols={symbols} currentSymbol={currentSymbol} chartData={chartData}/>
                                        </div>
                                    </div>
                                    <PriceBoxes symbols={symbols} currentSymbol={currentSymbol} lastBidAsk={lastBidAsk}/>
                                    <div className="row table-row">
                                        <Table symbols={symbols} currentSymbol={currentSymbol} lastBidAsk={lastBidAsk}/>
                                    </div>
                                </div>
                                {/* col-md-4  */}
                                <div className="right">
                                    <div className='right-wrapper'>
                                        <div className='right-block'>
                                            <p>CLIENT</p>
                                            <div className='info-circle'>
                                                <div className='block-info'>
                                                    1
                                                </div>
                                            </div>
                                        </div>
                                        <div className='right-arrow'>
                                            <p>FIX</p>
                                            <img className='mirror' src={leftArrow} alt=''/>
                                            <p style={{paddingTop: 0}}>PROTOCOL</p>
                                        </div>
                                    </div>
                                    <div className='right-wrapper'>
                                        <div className='right-block'>
                                            <p>CLIENT</p>
                                            <div className='info-circle'>
                                                <div className='block-info'>
                                                    2
                                                </div>
                                            </div>
                                        </div>
                                        <div className='right-arrow'>
                                            <p>FIX</p>
                                            <img className='mirror' src={leftArrow} alt=''/>
                                            <p style={{paddingTop: 0}}>PROTOCOL</p>
                                        </div>
                                    </div>
                                    <div className='right-wrapper'>
                                        <div className='right-block'>
                                            <img className='block-image' src={tickTrader} alt=''/>
                                            <div className='block-text'>
                                                <p>TICK TRADER</p>
                                            </div>
                                        </div>
                                        <div className='right-arrow'>
                                            <p>FIX</p>
                                            <img className='mirror' src={leftArrow} alt=''/>
                                            <p style={{paddingTop: 0}}>PROTOCOL</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
}

export default withCryptoService()(App);
