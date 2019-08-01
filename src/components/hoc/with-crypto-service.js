import React from 'react';
import { CryptoServiceConsumer } from '../crypto-service-context';

const withCryptoService = () => (Wrapper) => {
    return (props) => {
        return (
            <CryptoServiceConsumer>
                {(cryptoService) => {
                    return <Wrapper {...props} cryptoService={cryptoService} />
                }}
            </CryptoServiceConsumer>
        );
    };
};

export default withCryptoService;