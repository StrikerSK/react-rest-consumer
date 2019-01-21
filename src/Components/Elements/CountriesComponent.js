import * as React from "react";

/**
 * Trieda načitajuca možnosti výberu štátu
 */
class CountriesComponent extends React.Component {

    render() {
        const countries = ["Czech republic", "Germany", "Hungary", "Poland", "Slovakia", "Ukraine"];

        return (
            countries.map(country => <option key={country} value={country}>{country}</option>)
        )
    }
} export default CountriesComponent;