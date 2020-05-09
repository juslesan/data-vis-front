import React, {Component} from 'react'
import ReactChartkick, { LineChart, PieChart, BarChart, ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'



import './Results.css'

class Results extends Component {
    constructor(props) {
        super(props)    
        this.state = {
        }
        ReactChartkick.addAdapter(Chart)
    }

    chart = (data, chartType, label) => {
        if (chartType === "line") {
            return (
                <LineChart dataset={{radius: 1.5}} curve={false} data={data} messages={{empty: "No data"}} ytitle={label}/>
            )
        }
        if (chartType === "pie") {
            return (
                <PieChart dataset={{radius: 1.5}} data={data} messages={{empty: "No data"}} ytitle={label}/>
            )
        }
        if (chartType === "bar") {
            return (
                <BarChart dataset={{radius: 1.5}} data={data} messages={{empty: "No data"}} ytitle={label}/>
            )
        }
        if (chartType === "column") {
            return (
                <ColumnChart dataset={{radius: 1.5}} data={data} messages={{empty: "No data"}} ytitle={label}/>
            )
        }

    } 

    render () {
        console.log(this.props.data)
        return (
            <div className="resultsWrapper">
                {this.props.data && this.props.label ? 
                    this.chart(this.props.data, this.props.type, this.props.label.name)
                :
                <div></div>
                }
            </div>
        )
    }
}

export default Results