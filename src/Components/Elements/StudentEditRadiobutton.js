import * as React from "react";

/**
 * Komponenta vytvori pole radiobuttons ktore si uzivatel bude nsatavovat
 */
class StudentEditRadiobutton extends React.Component{

    render(){
        const options = this.props.options;

        return options.map(item => <li key={item}><label><input type={"radio"} name={"favoriteLanguage"} value={item} onChange={this.props.onChange} checked={this.props.language === item}/>{item}</label></li>)
    }

} export default StudentEditRadiobutton