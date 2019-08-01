import React, { PureComponent } from 'react';
import './price-boxes.css';
import { withFXOpenService } from '../hoc';


export class PriceBoxes extends PureComponent {

    render = () => {
        const { lastBidAsk } = this.props;
        console.log(123, lastBidAsk);

        return (
            lastBidAsk && 
                <div className='box-wrapper row mt-3 mb-3'>
                    <div className='box bid-box col-md-6'>
                        <p className="box-name">BID</p>
                        <p className="box-price">{lastBidAsk[0].BestBid.Price}</p>
                        <button className="box-button box-gray">SELL</button>
                    </div>
                    <div className='box ask-box col-md-6'>
                        <p className="box-name">ASK</p>
                        <p className="box-price">{lastBidAsk[0].BestAsk.Price}</p>
                        <button className="box-button box-green">BUY</button>
                    </div>
                    <div className='box-spread'>
                        <p>{Math.round(Math.abs(lastBidAsk[0].BestAsk.Price - lastBidAsk[0].BestBid.Price) * 100 *10) / 10}</p>
                    </div>
                </div>
        )
    }

}

export default withFXOpenService()(PriceBoxes);