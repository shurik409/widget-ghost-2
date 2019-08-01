import React, { PureComponent } from 'react';
import './table.css';
import { withFXOpenService } from '../hoc';


export class Table extends PureComponent {

    state = {
        askBid: null
    }

    render = () => {
        const { lastBidAsk } = this.props;
        // console.log(askBid);
        return (
            <>
            {
                lastBidAsk && 
                    <table className='col-md-12'>
                        {
                            lastBidAsk[0].Bids.map((data, index) => 
                                <tr>
                                    <td>{data.Volume}</td>
                                    <td>{data.Price}</td>
                                    <td>{lastBidAsk[0].Asks[index].Price}</td>
                                    <td>{lastBidAsk[0].Asks[index].Volume}</td>
                                </tr>
                            )
                        }
                        <tr className='bold-row'>
                            <td>{lastBidAsk[0].BestBid.Volume}</td>
                            <td>{lastBidAsk[0].BestBid.Price}</td>
                            <td>{lastBidAsk[0].BestAsk.Price}</td>
                            <td>{lastBidAsk[0].BestAsk.Volume}</td>
                        </tr>
                    </table>
            }
            </>
        )
    }
}

export default withFXOpenService()(Table);