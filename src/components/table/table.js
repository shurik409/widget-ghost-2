import React, {PureComponent} from 'react';
import './table.css';
import {
    withCryptoService
} from '../hoc';

export class Table extends PureComponent {

    trRef = React.createRef();

    getVolume = (volume) => {
        if (volume >= Math.pow(10,5)) {
            return `${Math.round(volume / Math.pow(10,6) * 10) / 10}m`;
        }
        else {
            return volume;
        }
    }

    getStyle = (data, maxVP) => {
        if(this.trRef.current){
            let maxWidth = this.trRef.current.offsetWidth - 1;
            let width = data.Volume * data.Price / maxVP * maxWidth;

            return {
                width: width
            }
        }
    }

    getMaxBidVP = (bids) => {
        let maxVP = 0;

        bids.forEach(bid => {
            let vp = bid.Volume * bid.Price;
            if (maxVP <= vp) maxVP = vp;
        })

        return maxVP;
    }

    getMiddleValues = (bidAsks) => {
        const { symbols, currentSymbol } = this.props;
        let volumeSum = 0;
        let volumePriceSum = 0;
        let precision = Math.pow(10, symbols.get(currentSymbol).Precision);

        bidAsks.forEach(bidAsks => {
            volumeSum += bidAsks.Volume;
            volumePriceSum += bidAsks.Volume * bidAsks.Price;
        });

        volumeSum = Math.round(volumeSum * precision) / precision

        return { volumeSum, volumePriceSum, price: Math.round(volumePriceSum / volumeSum * precision) / precision };
    }

    render = () =>{
        const { lastBidAsk } = this.props;

        if (!lastBidAsk) return null;

        const [{ Asks, Bids }] = lastBidAsk;

        return (
            <>
                <table className='col-md-6'>
                    <tbody>
                        {
                            Bids.map((data, index) => 
                                <React.Fragment key={index}>
                                    <tr ref={this.trRef}>
                                        <td className='volume'>{this.getVolume(data.Volume)}</td>
                                        <td className='price'>{Math.round(data.Price * Math.pow(10, 5)) / Math.pow(10,5)}</td>
                                        {/* <td>{Asks[index].Price}</td>
                                        <td>{this.getVolume(Asks[index].Volume)}</td> */}
                                    </tr>
                                    <tr className='bid-line' style={this.getStyle(data, this.getMaxBidVP(Bids))}></tr>
                                </React.Fragment>
                            )
                        }
                        <tr className='bold-row'>
                            <td className='volume'>{this.getVolume(this.getMiddleValues(Bids).volumeSum)}</td>
                            <td className='price'>{this.getMiddleValues(Bids).price}</td>
                            {/* <td>{BestAsk.Price}</td>
                            <td>{this.getVolume(BestAsk.Volume)}</td> */}
                        </tr>
                    </tbody>
                </table>
                <table className='col-md-6'>
                    <tbody>
                        {
                            Bids.map((data, index) => 
                                <React.Fragment key={index}>
                                    <tr className='info-row'>
                                        {/* <td>{this.getVolume(data.Volume)}</td>
                                        <td>{data.Price}</td> */}
                                        <td className='price'>{Math.round(Asks[index].Price * Math.pow(10, 5)) / Math.pow(10,5)}</td>
                                        <td className='volume'>{this.getVolume(Asks[index].Volume)}</td>
                                    </tr>
                                    <tr className='ask-line' style={this.getStyle(Asks[index], this.getMaxBidVP(Asks))}></tr>
                                </React.Fragment>
                            )
                        }
                        <tr className='bold-row'>
                            {/* <td>{this.getVolume(BestBid.Volume)}</td>
                            <td>{BestBid.Price}</td> */}
                            <td className='price'>{this.getMiddleValues(Asks).price}</td>
                            <td className='volume'>{this.getVolume(this.getMiddleValues(Asks).volumeSum)}</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }
}

export default withCryptoService()(Table);