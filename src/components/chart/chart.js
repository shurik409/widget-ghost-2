import React, { PureComponent } from 'react';
import './chart.css';
import { withFXOpenService } from '../hoc';
import { LineSeries, XYPlot } from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';

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
                    <XYPlot  width={400} height={100}>
                        <LineSeries 
                            data={spread.map(value => ({
                                x: value.time,
                                y: value.spread,
                            }))}
                            opacity={1}
                            stroke="#1ebb84"
                            strokeStyle="solid"
                        />
                </XYPlot>
                }
            </div>
        )
    }
}

export default withFXOpenService()(Chart);