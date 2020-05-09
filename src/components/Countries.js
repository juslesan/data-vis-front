import React, {Component} from 'react'
import { Multiselect } from 'multiselect-react-dropdown';


// Renders per capita checkbutton

class Countries extends Component {
  constructor(props) {
      super(props)    
      this.state = {
      }
      this.multiselectRef = React.createRef();

  }
   
    render(){
      return(
        <Multiselect
          placeholder={"Select demographic"}
          id="countries"
          options={this.props.options} // Options to display in the dropdown
          onSelect={this.props.onIndicatorSelect} // Function will trigger on select event
          onRemove={this.props.onIndicatorRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
          ref={this.multiselectRef}
          className="searchBar"
        />
    )} 
}

export default Countries