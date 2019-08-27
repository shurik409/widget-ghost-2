import React, { PureComponent } from 'react';
import './price-boxes.css';
import { withCryptoService } from '../hoc';


export class PriceBoxes extends PureComponent {

    boxArray = [
        {
            label: 'BestBid',
            title: 'SELL'
        },
        {
            label: 'BestAsk',
            title: 'BUY'
        }
    ];

    getSpread = (lastBid) => {
        const { symbols, currentSymbol } = this.props;

        return Math.round(Math.abs(lastBid.BestAsk.Price - lastBid.BestBid.Price) * Math.pow(10, symbols.get(currentSymbol).Precision - 1 ) *10) / 10;
    }

    render = () => {
        const { lastBidAsk } = this.props;

        if (!lastBidAsk) return null;
        const lastBid = lastBidAsk[0];
        
        return (
            <div className='box-wrapper row mt-3 mb-3'>
                <div className='box-spread'>
                    <p>{this.getSpread(lastBid)}</p>
                </div>
                {this.boxArray.map( ({label, title}, index) => (
                    <div key={index} className={`box ${lastBid[label].Type.toLowerCase()}-box col-md-6`}>
                        <p className="box-name">{lastBid[label].Type.toUpperCase()}</p>
                        <p className="box-price">{lastBid[label].Price}</p>
                        <button className="box-button">{title}</button>
                    </div>
                ))}
            </div>
        )
    }

}

export default withCryptoService()(PriceBoxes);