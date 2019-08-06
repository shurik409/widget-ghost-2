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

    getData = async () => {
        const { chartData } = this.props;
        
        if(chartData){
            let spread = chartData.Ticks.map((data, index) => {
                return {
                    spread: Math.abs(data.BestAsk.Price - data.BestBid.Price) * 100,
                    time: data.Timestamp
                }
            })
    
            console.log(spread);
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
            chartData && <div>
                {
                    spread && 
                    <FlexibleXYPlot  width={185} height={20} margin={{left: 0, right: 0, top: 0, bottom: 0}}>
                        <LineSeries 
                            data={spread.map(value => ({
                                x: value.time,
                                y: value.spread,
                            }))}
                            opacity={1}
                            stroke="#1ebb84"
                            strokeStyle="solid"
                            strokeWidth={1}
                        />
                </FlexibleXYPlot>
                }
            </div>
        )
    }
}

export default withCryptoService()(Chart);