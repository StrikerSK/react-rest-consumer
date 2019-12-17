import * as React from "react";

/**
 * Komponenta vytvori pole radiobuttons ktore si uzivatel bude nsatavovat
 */
const StudentEditRadiobutton = ({options, language, onChange}) => {

    return options.map(item =>
        <li key={item}>
            <label><input type={"radio"} name={"favoriteLanguage"} value={item} onChange={onChange} checked={language === item}/>{item}</label>
        </li>
    )

};
export default StudentEditRadiobutton