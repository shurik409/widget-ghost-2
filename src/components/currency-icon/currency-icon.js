import React, { Component } from 'react';
import { withCryptoService } from '../hoc';
import ltc from '../../img/ltc.svg';
import btc from '../../img/btc.svg';
import eth from '../../img/eth.svg';
import nmc from '../../img/nmc.svg';
import dsh from '../../img/dsh.svg';
import emc from '../../img/emc.svg';
import bch from '../../img/bch.svg';
import eos from '../../img/eos.svg';
import ppc from '../../img/ppc.svg';
import ust from '../../img/ust.svg';
import xrp from '../../img/xrp.svg';
import etc from '../../img/etc.svg';
import './currency-icon.css';


export class CurrencyList extends Component {

    currency = {
        ltc,
        btc,
        eth,
        nmc,
        dsh,
        emc,
        bch,
        eos,
        ppc,
        ust,
        xrp,
        etc
    }

    render = () => {
        const { symbol } = this.props;
        
        return (
            symbol && <>
                <div className='icons'>
                    <img className='currency-icon' src={this.currency[symbol.substr(0,3).toLowerCase()]} alt=''/>
                    <img className='currency-icon' src={this.currency[symbol.substr(3,3).toLowerCase()]} alt=''/>
                </div>
            </>
        );
    }
}
export default withCryptoService()(CurrencyList);