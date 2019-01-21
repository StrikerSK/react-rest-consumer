import * as React from "react";

class RadioComponent extends React.Component{

    render(){
        const options = this.props.options;

        return options.map(item => <li key={item}><label><input type={"radio"} name={"favoriteLanguage"} value={item} onChange={this.props.onChange} required={true}/>{item}</label></li>)
    }

} export default RadioComponent