import React, { PureComponent } from 'react';
import './price-boxes.css';
import { withCryptoService } from '../hoc';


export class PriceBoxes extends PureComponent {

    boxArray = [
        {
            label: 'BestBid',
            title: 'Sell'
        },
        {
            label: 'BestAsk',
            title: 'Buy'
        }
    ];

    render = () => {
        const { lastBidAsk } = this.props;

        if (!lastBidAsk) return null;

        const lastBid = lastBidAsk[0];
        
        return (
            <div className='box-wrapper row mt-3 mb-3'>
                <div className='box-spread'>
                    <p>{Math.round(Math.abs(lastBid.BestAsk.Price - lastBid.BestBid.Price) * 100 *10) / 10}</p>
                </div>
                {this.boxArray.map( ({label, title}) => (
                    <div className={`box ${lastBid[label].Type.toLowerCase()}-box col-md-6`}>
                        <p className="box-name">{lastBid[label].Type}</p>
                        <p className="box-price">{lastBid[label].Price}</p>
                        <button className="box-button box-gray">{title}</button>
                    </div>
                ))}
            </div>
        )
    }

}

export default withCryptoService()(PriceBoxes);