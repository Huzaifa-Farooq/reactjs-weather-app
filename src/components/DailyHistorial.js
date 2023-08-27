import React, { Fragment } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label
} from "recharts";

import { DayPicker } from 'react-day-picker';
import '../css/tooltip.css'

import API from '../api/api';


const CustomTooltip = ({ active, payload, label, tempUnit }) => {
    if (active && payload && payload.length) {
        if (label instanceof Date) {
            label = label.toLocaleDateString();
        }
        return (
            <div className="custom-tooltip gray-bg white-text" >
                <span className="label">{label}</span>
                <div>
                    {
                        payload.map((pld) => {
                            return (
                                <><span style={{ color: pld.fill }}>{pld.dataKey}: {pld.value}{tempUnit}</span><br /></>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    return null;
};


const formatDateFormat = (date) => {
    // date in YYYY-MM-DD format without using toISO
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


class DailyHistorial extends React.Component {
    constructor(props) {
        super(props);

        this.fieldsTitles = {
            'precipitation_sum': 'Precipitation',
            'temperature_2m_max': 'Max Temperature',
            'temperature_2m_min': 'Min Temperature',
            'temperature_2m_mean': 'Mean Temperature',
            'apparent_temperature_max': 'Max Apparent Temperature',
            'apparent_temperature_min': 'Min Apparent Temperature',
            'apparent_temperature_mean': 'Mean Apparent Temperature'
        }
        this.dailyParams = [
            'time', 'precipitation_sum', 'temperature_2m_max', 'temperature_2m_min', 'temperature_2m_mean',
            'apparent_temperature_max', 'apparent_temperature_min', 'apparent_temperature_mean'
        ]
        this.temperatureParams = [
            'Max Temperature',
            'Min Temperature',
            'Mean Temperature',
            'Max Apparent Temperature',
            'Min Apparent Temperature',
            'Mean Apparent Temperature'
        ];
        this.temperatureParamsColors = {
            'Max Temperature': '#ff0000',
            'Min Temperature': '#00ff00',
            'Mean Temperature': '#0000ff',
            // different colors
            'Max Apparent Temperature': '#ff00ff',
            'Min Apparent Temperature': '#00ffff',
            'Mean Apparent Temperature': '#ffff00'
        }

        this.state = {
            historicalData: null,
            startDate: new Date(new Date().setDate(new Date().getDate() - 21)),
            endDate: new Date(new Date().setDate(new Date().getDate() - 7)),
            showStartDatePicker: false,
            showEndDatePicker: false,
            selectedTemepratureParams: this.temperatureParams.map(
                (param) => { return { "name": param, "selected": !param.includes("Apparent") } }
            )
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
            formatDateFormat(startDate),
            formatDateFormat(endDate),
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
                    const key = this.fieldsTitles[param] || param;
                    obj[key] = response.daily[param][i];
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

    handleSelectedTemperatureParamsChange = (name, selected) => {
        const newParams = this.state.selectedTemepratureParams.map((param) => {
            if (param.name === name) {
                param.selected = !selected;
            }
            return param;
        });

        this.setState({
            selectedTemepratureParams: newParams
        });
    }

    render() {
        const data = this.state.historicalData;
        const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        const selectedTemperatureParams = this.state.selectedTemepratureParams.filter((param) => param.selected);

        return (
            <Fragment>
                <div style={{ marginLeft: '30px' }} className="row mb-3" >
                    <div className="white-text">
                        <div className="mb-3">
                            <h2>Historical Data</h2>
                        </div>
                        <hr style={{ width: '80%' }} />
                        <form className="form historical-form">
                            <div className="form-row row mb-3">
                                <div className="form-group col-md-2">
                                    <label htmlFor="startDate" className="form-label">Start Date: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        onChange={() => { }}
                                        value={this.state.startDate.toISOString().split('T')[0]}
                                        onClick={
                                            () => this.setState({ showStartDatePicker: !this.state.showStartDatePicker, showEndDatePicker: false })
                                        }
                                    />
                                    {
                                        this.state.showStartDatePicker && (
                                            <DayPicker
                                                mode="single"
                                                selected={this.state.startDate}
                                                onSelect={this.handleStartDateChange}
                                                toDate={yesterday}
                                            />
                                        )
                                    }
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="endDate" className="form-label">End Date: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        onChange={() => { }}
                                        value={formatDateFormat(this.state.endDate)}
                                        onClick={() => this.setState({ showEndDatePicker: !this.state.showEndDatePicker, showStartDatePicker: false })}
                                    />
                                    {this.state.showEndDatePicker && (
                                        <DayPicker
                                            mode="single"
                                            selected={this.state.endDate}
                                            toDate={yesterday}
                                            onSelect={this.handleEndDateChange}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="form-row row mb-3">
                                {
                                    this.state.selectedTemepratureParams.map((param) => (
                                        <div className="form-check col-md-4">
                                            <input
                                                onChange={() => this.handleSelectedTemperatureParamsChange(param.name, param.selected)}
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                checked={param.selected}
                                            />
                                            <label
                                                className={`form-check-label ${!param.selected ? 'gray-text' : ''}`}
                                                onClick={() => this.handleSelectedTemperatureParamsChange(param.name, param.selected)}

                                            >
                                                {param.name}
                                            </label>
                                        </div>
                                    ))
                                }

                            </div>
                        </form>

                    </div>
                </div>

                <div className="gray-bg mb-3 historical-chart-container">
                    <div className="dark-bg">
                        {
                            data && <DailyHistoricalChart
                                data={data}
                                temperatureParams={selectedTemperatureParams.map((param) => param.name)}
                                temperatureParamsColors={this.temperatureParamsColors}
                                tempUnit={this.props.temperature_unit}
                            />
                        }
                    </div>
                </div>
            </Fragment>
        )

    }
}


const DailyHistoricalChart = ({ data, temperatureParams, temperatureParamsColors, tempUnit }) => {
    const dateFormatter = (date) => {
        return date.toLocaleDateString();
    };

    console.log(data);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }} >
            <h3 className="white-text" style={{ margin: '0 auto 0 auto', marginBottom: '10px' }} >Temperature v/s Time</h3>
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
            >
            </XAxis>
            <YAxis 
                tickFormatter={(val) => (val + tempUnit)}
            >
            </YAxis>
            <Legend />
            {
                temperatureParams.map((param) => {
                    return (
                        <Line
                            type="monotone"
                            dataKey={param}
                            stroke={temperatureParamsColors[param]}
                            activeDot={{ r: 4 }}
                            dot={false}
                        />
                    );
                })
            }
            <Tooltip content={<CustomTooltip tempUnit={tempUnit} />} />
        </LineChart>
        </div>
    );
}

export default DailyHistorial;