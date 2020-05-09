import React from 'react'
import { Multiselect } from 'multiselect-react-dropdown';


// Renders per capita checkbutton

const Indicators = (props) => {
    return (
      
      <Multiselect
        placeholder={"Select indicator"}
        id="indicators"
        singleSelect={true}
        options={props.options} // Options to display in the dropdown
        onSelect={props.onIndicatorSelect} // Function will trigger on select event
        onRemove={props.onIndicatorRemove} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
        className="searchBar"
      />
 
    )
}

export default Indicators