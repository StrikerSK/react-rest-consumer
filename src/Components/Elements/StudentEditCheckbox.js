import * as React from "react";

class CheckBox extends React.Component {

    render() {
        return (
            <input type="checkbox" id={this.props.id} checked={this.props.itemList.includes(this.props.item)} value={this.props.value} onChange={this.props.onChange}/>
        )
    }
}

/**
 * Tato Componenta poskytuje možnosti chekcboxov pre formular
 */
class StudentEditCheckbox extends React.Component{

    render(){
        const itemList = this.props.itemList;
        const languages = this.props.languages;

        return(
            languages.map(item => <li key={item}><label><CheckBox id={item} value={item} itemList={itemList} item={item} onChange={this.props.onChange}/>{item}</label></li>)
        )
    }

} export default StudentEditCheckbox