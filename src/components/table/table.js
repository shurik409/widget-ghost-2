import React from 'react';
import './table.css';
import {
    withCryptoService
} from '../hoc';

const Table = (props) => {
    
    if (!props.lastBidAsk) return null;

    const {
        lastBidAsk: [{
            Asks,
            Bids,
            BestBid,
            BestAsk
        }]
    } = props;

    return (
        <>
            {
                <table className='col-md-12'>
                    <tbody>
                        {
                            Bids.map((data, index) => 
                                <tr key={index} className='info-row'>
                                    <td>{data.Volume}</td>
                                    <td>{data.Price}</td>
                                    <td>{Asks[index].Price}</td>
                                    <td>{Asks[index].Volume}</td>
                                </tr>
                            )
                        }
                        <tr className='bold-row'>
                            <td>{BestBid.Volume}</td>
                            <td>{BestBid.Price}</td>
                            <td>{BestAsk.Price}</td>
                            <td>{BestAsk.Volume}</td>
                        </tr>
                    </tbody>
                </table>
            }
        </>
    )
}
export {
    Table
};

export default withCryptoService()(Table);