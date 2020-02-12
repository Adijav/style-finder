import React from 'react';
import {connect} from 'react-redux';


const CountryDetails = (props) => {
    return (
        <div>
            <div>You have selected: {props.selectedCountry}</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedCountry: state.selectedCountry
    }
}

export default connect(mapStateToProps)(CountryDetails);