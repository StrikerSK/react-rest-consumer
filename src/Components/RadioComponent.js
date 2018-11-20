import * as React from "react";

class RadioComponent extends React.Component{

    render(){
        const options = this.props.options;

        return options.map(item => <li><label><input type={"radio"} name={"favLanguage"} value={item} onChange={this.props.onChange}/>{item}</label></li>)
    }

} export default RadioComponent