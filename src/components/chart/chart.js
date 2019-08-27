import React, { PureComponent } from 'react';
import './chart.css';
import { withCryptoService } from '../hoc';
import { LineSeries, XYPlot, makeWidthFlexible } from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

export class Chart extends PureComponent {

    state = {
        chartData: null,
        spread: null
    }

    getData = () => {
        const { chartData, symbols, currentSymbol } = this.props;

        
        
        if (chartData) {
            const spread = chartData.Ticks.map((data) => {
                return {
                    spread: Math.round(Math.abs(data.BestAsk.Price - data.BestBid.Price) * Math.pow(10, symbols.get(currentSymbol).Precision - 1 ) *10) / 10,
                    time: data.Timestamp
                }
            });
    
            this.setState({ chartData: chartData.Ticks, spread: spread })
        }
    }

    componentDidUpdate = (prevProps) => {
        const { chartData } = this.props;

        if(prevProps.chartData !== chartData){
            this.getData();
        }
    }

    render = () => {
        const { chartData, spread } = this.state;

        return (
            chartData && spread && (           
                <FlexibleXYPlot  width={185} height={20} margin={{left: 0, right: 0, top: 0, bottom: 0}}>
                    <LineSeries 
                        data={spread.map(({time: x, spread: y}) => ({x, y}))}
                        opacity={1}
                        stroke="#1ebb84"
                        strokeStyle="solid"
                        strokeWidth={1}
                    />
                </FlexibleXYPlot>
            )
        );
    }
}

export default withCryptoService()(Chart);