import React, { Component } from 'react';
import './app.css';
import { withFXOpenService } from '../hoc';

class App extends Component {

    componentDidMount = () => {
        const { fxopenService } = this.props;

        fxopenService.getAvailablePublicSymbols()
            .then(symbols => console.log(symbols));
    }

    render = () => {
        return (
            <div>App</div>
        );
    };
}

export default withFXOpenService()(App);