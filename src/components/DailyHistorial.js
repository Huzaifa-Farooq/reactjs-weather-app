import React, { Fragment } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import API from '../api/api';


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        if (label instanceof Date) {
            label = label.toLocaleDateString();
        }
        return (
            <div className="custom-tooltip" style={{ width: '200px' }}>
                <p className="label" style={{ color: 'white' }} >{label}</p>
                <div>
                    {
                        payload.map((pld) => {
                            return (
                                <div style={{ display: "inline-block", fontSize: '12px' }}>
                                    <div style={{ color: pld.fill }}>{pld.dataKey}: {pld.value}</div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    return null;
};


class DailyHistorial extends React.Component {
    constructor(props) {
        super(props);

        this.dailyParams = [
            'time', 'precipitation_sum', 'temperature_2m_max', 'temperature_2m_min', 'temperature_2m_mean',
            'apparent_temperature_max', 'apparent_temperature_min', 'apparent_temperature_mean'
        ]
        this.temperatureParams = [
            'temperature_2m_max',
            'temperature_2m_min',
            'temperature_2m_mean',
            // 'apparent_temperature_max', 
            // 'apparent_temperature_min',
            // 'apparent_temperature_mean'
        ];
        this.temperatureParamsColors = [
            '#ff0000', '#00ff00', '#0000ff',
            '#ff0000', '#00ff00', '#0000ff'
        ];
        this.fieldsTitles = {
            'time': 'Time',
            'precipitation_sum': 'Precipitation',
            'temperature_2m_max': 'Max Temperature',
            'temperature_2m_min': 'Min Temperature',
            'temperature_2m_mean': 'Mean Temperature',
            'apparent_temperature_max': 'Max Apparent Temperature',
            'apparent_temperature_min': 'Min Apparent Temperature',
            'apparent_temperature_mean': 'Mean Apparent Temperature'
        }


        this.state = {
            historicalData: null,
            startDate: new Date(new Date().setDate(new Date().getDate() - 21)),
            endDate: new Date(new Date().setDate(new Date().getDate() - 7))
        }
    }

    componentDidMount() {
        this.loadComponentWithData();
    }
    componentDidUpdate(prevProps, prevState) {
        const currStartDate = this.state.startDate;
        const currEndDate = this.state.endDate;
        const prevStartDate = prevState.startDate;
        const prevEndDate = prevState.endDate;
        
        // if currendDate is greater than currstartDate
        if (currEndDate <= currStartDate) {
            return;
        }

        if (currStartDate !== prevStartDate || currEndDate !== prevEndDate) {
            this.loadComponentWithData();
        }
    }

    loadComponentWithData = () => {
        const { latitude, longitude, units } = this.props;
        const { startDate, endDate } = this.state;

        API.getDailyHistoricalData(
            latitude,
            longitude,
            startDate,
            endDate,
            this.dailyParams.filter((param) => param != 'time'),
            this.handleHistorialData,
            units
        );
    }

    handleHistorialData = (response) => {
        const historicalData = [];
        // Similar to ZIP in python
        for (var i = 0; i < response.daily.time.length; i++) {
            var obj = {};
            for (const param of this.dailyParams) {
                if (param in response.daily) {
                    obj[param] = response.daily[param][i];
                }
            }
            historicalData.push(obj);
        }
        // Changing time to Date object
        historicalData.forEach((item) => {
            item.time = new Date(item.time * 1000);
        }
        );
        this.setState({
            historicalData: historicalData
        });
    };


    handleStartDateChange = (date) => {
        this.setState({
            startDate: date
        });
    }

    handleEndDateChange = (date) => {
        this.setState({
            endDate: date
        });
    }

    render() {
        const data = this.state.historicalData;
        const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        return (
            <Fragment>
                <div className="row">
                    <div className="white-text col-md-3">
                    <DayPicker
                        mode="single"
                        selected={this.state.startDate}
                        onSelect={this.handleStartDateChange}
                        toDate={yesterday}
                        footer={<p>Start Date</p>}
                    />
                    </div>
                    <div className="col-md-1"></div>
                    <div className=" white-text col-md-3">

                    <DayPicker
                        mode="single"
                        selected={this.state.endDate}
                        toDate={yesterday}
                        onSelect={this.handleEndDateChange}
                        footer={<p>End Date</p>}
                    />
                        
                    </div>
                </div>
                <div className="gray-bg">
                    <div>dsfsdfsd</div>
                    <div className="dark-bg">
                    {
                        data && <DailyHistoricalChart
                            data={data}
                            temperatureParams={this.temperatureParams}
                            temperatureParamsColors={this.temperatureParamsColors}
                        />
                    }
                    </div>
                </div>
            </Fragment>
        )

    }
}


const DailyHistoricalChart = ({ data, temperatureParams, temperatureParamsColors }) => {
    const dateFormatter = (date) => {
        return date.toLocaleDateString();
    };

    return (
        <LineChart
            width={1000}
            height={400}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey='time'
                scale="time"
                domain={['auto', 'auto']}
                tickFormatter={dateFormatter}
            />
            <YAxis />
            <Legend />
            {
                temperatureParams.map((param, index) => {
                    return (
                        <Line
                            type="monotone"
                            dataKey={param}
                            stroke={temperatureParamsColors[index]}
                            activeDot={{ r: 4 }}
                            dot={false}
                        />
                    );
                })
            }
            <Tooltip content={<CustomTooltip />} />
        </LineChart>
    );
}

export default DailyHistorial;