import * as React from "react";

class CountriesComponent extends React.Component {

    getCountries(){
        const countries = ["Czech republic", "Germany", "Hungary", "Poland", "Slovakia", "Ukraine"];

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