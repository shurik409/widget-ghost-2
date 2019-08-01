import React from 'react';

const {
    Provider: CryptoServiceProvider,
    Consumer: CryptoServiceConsumer
} = React.createContext();

export {
    CryptoServiceProvider,
    CryptoServiceConsumer
};