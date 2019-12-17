import * as React from "react";

const RadioComponent = ({options, onChange}) => {

	return options.map(item =>
		<li key={item}>
			<label><input type={"radio"} name={"favoriteLanguage"} value={item} onChange={onChange} required={true}/>{item}</label>
		</li>
	)

};
export default RadioComponent