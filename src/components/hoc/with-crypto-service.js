import React from 'react';
import { СryptoServiceConsumer } from '../crypto-service-context';

const withCryptoService = () => (Wrapper) => {
    return (props) => {
        return (
            <СryptoServiceConsumer>
                {(cryptoService) => {
                    return <Wrapper {...props} cryptoService={cryptoService} />
                }}
            </СryptoServiceConsumer>
        );
    };
};

export default withCryptoService;