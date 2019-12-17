import * as React from "react";

const CheckBox = ({id, value, onChange}) => {
	return (
		<input type="checkbox" id={id} value={value} onChange={onChange}/>
	)
};

/**
 * Komponenta checkbox pre pripravenie poli checkboxov
 */
const CheckboxComponents = ({languages, onChange}) => {

	return (
		languages.map(item =>
			<li key={item}><label><CheckBox id={item} value={item} onChange={onChange}/>{item}</label></li>
		)
    )

};

export default CheckboxComponents