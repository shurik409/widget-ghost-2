import React from 'react';
import './table.css';
import { withCryptoService } from '../hoc';

const Table = ({ lastBidAsk }) => (
    <>
        {
            lastBidAsk && 
                <table className='col-md-12'>
                    <tbody>
                        {
                            lastBidAsk[0].Bids.map((data, index) => 
                                <tr key={index} className='info-row'>
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
                    </tbody>
                </table>
        }
    </>
)
export {
    Table
};

export default withCryptoService()(Table);