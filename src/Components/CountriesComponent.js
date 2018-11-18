import * as React from "react";

class CountriesComponent extends React.Component {

    getCountries(){
        const countries = ["Slovakia", "Czech republic", "Poland", "Germany", "Hungary", "Ukraine"];

        return(
            countries.map(country => <option value={country}>{country}</option>)
        )
    }

    render() {
        return (
            this.getCountries()
        )
    }
} export default CountriesComponent;