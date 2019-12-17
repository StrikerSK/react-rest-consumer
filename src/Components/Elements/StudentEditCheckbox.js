import * as React from "react";

class CheckBox extends React.Component {

	render() {
		return (
			<input type="checkbox" id={this.props.id} checked={this.props.itemList.includes(this.props.item)}
			       value={this.props.value} onChange={this.props.onChange}/>
		)
	}
}

/**
 * Tato Componenta poskytuje možnosti chekcboxov pre formular
 */
const StudentEditCheckbox = ({itemList, languages, onChange}) => {

	return (
		languages.map(item => <li key={item}><label><CheckBox id={item} value={item} itemList={itemList} item={item} onChange={onChange}/>{item}</label></li>)
	)

};
export default StudentEditCheckbox