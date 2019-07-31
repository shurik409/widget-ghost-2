import React, { PureComponent } from 'react';
import './price-boxes.css';
import { withFXOpenService } from '../hoc';


export class PriceBoxes extends PureComponent {

    render = () => {
        const { lastBidAsk } = this.props;
        console.log(123, lastBidAsk);

        return (
            lastBidAsk && 
                <div className='price-boxes'>
                    <div className='box'>
                        <h3>Bid</h3>
                        <h4>{lastBidAsk[0].BestBid.Price}</h4>
                        <button>Sell</button>
                    </div>
                    <div className='box ask-box'>
                        <h3>Ask</h3>
                        <h4>{lastBidAsk[0].BestAsk.Price}</h4>
                        <button>Buy</button>
                    </div>
                </div>
        )
    }

}

export default withFXOpenService()(PriceBoxes);