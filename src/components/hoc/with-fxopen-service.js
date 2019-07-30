import React from 'react';
import { FXOpenServiceConsumer } from '../fxopen-service-context';

const withFXOpenService = () => (Wrapper) => {
    return (props) => {
        return (
            <FXOpenServiceConsumer>
                {(fxopenService) => {
                    return <Wrapper {...props} fxopenService={fxopenService} />
                }}
            </FXOpenServiceConsumer>
        );
    };
};

export default withFXOpenService;