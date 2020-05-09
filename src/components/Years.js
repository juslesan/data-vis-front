import React from 'react'
import { Multiselect } from 'multiselect-react-dropdown';


// Renders per capita checkbutton

const Years = (props) => {
    return (
      
      <Multiselect
        placeholder={"Select year"}
        id="years"
        singleSelect={true}
        // selectedValues={{name: "All Years", id: 0}}
        options={props.options} // Options to display in the dropdown
        onSelect={props.onYearSelect} // Function will trigger on select event
        onRemove={props.onYearRemove} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
        className="searchBar"
      />
 
    )
}

export default Years