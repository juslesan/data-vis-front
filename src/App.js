import React, { Component } from 'react';
import './index.css'
import Results from './components/Results.js'
import Plots from './components/Plots';
import Indicators from './components/Indicators'
import Years from './components/Years'
import Countries from './components/Countries'
import {getAll, getIndicator} from './utils/requests'
import {indexer, resultFilter, validateSelectedCountries} from './utils/jsonUtils'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      country: null,
      perCapita: false,
      indicators: [],
      data: {},
      selectedIndicators: [],
      countries: [],
      selectedCountries: [],
      years: [{name: "All Years", id: 0}],
      selectedYears: [],
      chartType: ""
    }
    this.countryRender = React.createRef()
    this.plotSelect = React.createRef()

  }

  componentDidMount() {
    getAll().then(data =>
      this.setState({
        data,
        indicators: indexer(Object.keys(data)),
      })
    )
  }

  // Handles change in per capita check button
  perCapitaHandler = () => {
    this.setState({perCapita: !this.state.perCapita})
  }

  onIndicatorSelect = (selectedList, selectedItem) => {
    if (validateSelectedCountries(Object.keys(this.state.data[selectedItem.name]), this.state.selectedCountries)) {
      this.setState({
        selectedIndicators: selectedList,
        countries: indexer(Object.keys(this.state.data[selectedList[0].name])),
      })
    } else {
      this.resetCountries()
      this.setState({
        selectedIndicators: selectedList,
        selectedCountries: [],
        countries: indexer(Object.keys(this.state.data[selectedList[0].name]))
      })
    }
  }
     
  resetCountries() {
    if (this.countryRender.current.multiselectRef) {
      this.countryRender.current.multiselectRef.current.resetSelectedValues()
    }
  }

  resetPlotSelect() {
    if (this.plotSelect.current.multiselectRef) {
      this.plotSelect.current.multiselectRef.current.resetSelectedValues()
    }
  }

  onIndicatorRemove = (selectedList, removedItem) => {
    this.setState({
      selectedIndicators: selectedList,
    })
  }

  onCountrySelect = (selectedList, selectedItem) => {
    this.setState({
      selectedCountries: selectedList,
      years: indexer(Object.keys(this.state.data[this.state.selectedIndicators[0].name][selectedList[0].name]), {name: "All Years", id: 0}),
    })
  }
 
  onCountryRemove = (selectedList, removedItem) => {
    if (selectedList.length === 0) {
      this.setState({
        selectedCountries: selectedList,
        years: [{name: "All Years", id: 0}]
      })

    } else {
      this.setState({selectedCountries: selectedList})
    }
  }
  onYearSelect = (selectedList, selectedItem) => {
    if (this.state.selectedYears[0] && (selectedItem.id === 0 && this.state.selectedYears[0].id !== 0)) {
      this.resetPlotSelect()
      this.setState({
        selectedYears: selectedList,
        chartType: "column"
      })
    }
    else if (this.state.selectedYears[0] && (selectedItem.id !== 0 && this.state.selectedYears[0].id === 0)) {
      this.resetPlotSelect()
      this.setState({
        selectedYears: selectedList,
        chartType: "column"
      })
    } else {
      this.setState({
        selectedYears: selectedList,
      })
    }
  }

  onYearRemove = (selectedList, removedItem) => {
    this.resetPlotSelect()
    this.setState({
      selectedYears: selectedList,
    })
  }

  onPlotSelect = (selectedList, selectedItem) => {
    this.setState({
      chartType: selectedItem.name
    })
  }

  onPlotRemove = (selectedList, removedItem) => {
    this.setState({
      chartType: ""
    })
  }

  render() {
    return (
      <div className="container">
        <div className="headerDiv">
          <h1 className="header">Data visualisations</h1>
          {Object.keys(this.state.data).length === 0 ?
          <p>Waiting for data to be loaded or the server to start. Server boot may take up to a minute.</p>
          :
          <p style={{textAlign: "left"}}>
            1. First select an indicator <br/>
            2. Next select the demographics (Countries, continents etc.) you wish to visualise <br/>
            3. Select all years or a specific year to be visualised <br/>
            4. Select the type of visualisation you want to be used <br/>
            If an empty graph is displayed select another year or country. <br/> 
          </p>
          }
          <Indicators options={this.state.indicators} onIndicatorSelect={this.onIndicatorSelect} onIndicatorRemove={this.onIndicatorRemove}/>
          <Countries ref={this.countryRender} options={this.state.countries} onIndicatorSelect={this.onCountrySelect} onIndicatorRemove={this.onCountryRemove}/>
          <Years options={this.state.years} onYearSelect={this.onYearSelect} onYearRemove={this.onYearRemove}/>

          {this.state.selectedYears.length === 0 || this.state.selectedYears[0].id === 0 ? 
            <Plots ref={this.plotSelect} options={[{"name": "line", "id": 0}, {"name": "column", "id": 1}]} onSelect={this.onPlotSelect} onRemove={this.onPlotRemove}/>
          :
            <Plots ref={this.plotSelect} options={[{"name": "pie", "id": 0}, {"name": "bar", "id": 1}, {"name": "column", "id": 2}]} onSelect={this.onPlotSelect} onRemove={this.onPlotRemove}/>
          }
        </div>
        <Results type={this.state.chartType} label={this.state.selectedIndicators[0]} data={resultFilter(this.state.data, this.state.selectedIndicators, this.state.selectedCountries, this.state.selectedYears)}/>
      </div>
    );
  }
}

export default App;
