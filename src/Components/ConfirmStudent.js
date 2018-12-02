import React from "react";
import {NavLink} from "react-router-dom";

class ConfirmStudent extends React.Component{
    constructor(props) {
        super(props);
        this.state = { firstName: "", lastName: "", country: "", university: "" , faculty: "",
            faculties: [], universities: [], knownLanguages: [],
            spokenLanguages: [], favoriteLanguage: ''
        };
    }

    listLanguages(language){
        if(language.length === 0){
            return (<li>No language!</li>)
        } else {
            return language.map(item => <li>{item}</li>)
        }
    }

    render() {
        const { firstName, lastName, country, knownLanguages, spokenLanguages} = this.props.student.data;

        return (
            <div>
                <div className={"student-details"}>
                    <h1>{firstName} {lastName}</h1>
                    <p>Country of origin: <strong>{country}</strong></p>
                    {/*<p>Type of study: <strong>{typeOfStudy}</strong></p>*/}
                    {/*<p>Grade of study: <strong>{grade}</strong></p>*/}
                </div>
                <div className="row">
                    <div className="column">
                        <ul>
                            <lh><strong>Programming languages</strong></lh>
                            {this.listLanguages(knownLanguages)}
                        </ul>
                    </div>
                    <div className="column">
                        <ul>
                            <lh><strong>Spoken languages</strong></lh>
                            {this.listLanguages(spokenLanguages)}
                        </ul>
                    </div>
                </div>
                <div>
                    <NavLink to={"/"}>Back</NavLink>
                </div>
            </div>
        );
    }
}

export default ConfirmStudent;