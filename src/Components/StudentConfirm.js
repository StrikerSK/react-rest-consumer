import React from "react";
import {NavLink} from "react-router-dom";

const tableWidth = {
    width: "75%"
};

/**
 * Komponenta pre potvrdenie uzivatela
 */
class StudentConfirm extends React.Component{
    constructor(props) {
        super(props);
        this.state = { firstName: "", lastName: "", country: "", university: "" , faculty: "",
            knownLanguages: [], spokenLanguages: [], favoriteLanguage: ''};
    }

    listTableLanguages = (language) =>{
        if(language.length === 0){
            return (<tr><td>No language!</td></tr>)
        } else {
            return language.map(item => <tr key={item}><td>{item}</td></tr>)
        }
    };

    render() {
        const { firstName, lastName, country, typeOfStudy, grade, university, faculty, knownLanguages, spokenLanguages} = this.props.student.data;

        return (
            <div>
                <div className={"student-details"}>
                    <div className={"flex-container"}>
                        <table style={tableWidth}>
                            <tbody>
                            <tr>
                                <th>First name:</th>
                                <td>{firstName}</td>
                            </tr>
                            <tr>
                                <th>Last name:</th>
                                <td>{lastName}</td>
                            </tr>
                            <tr>
                                <th>Country of origin:</th>
                                <td>{country}</td>
                            </tr>
                            <tr>
                                <th>University:</th>
                                <td>{university}</td>
                            </tr>
                            <tr>
                                <th>Faculty:</th>
                                <td>{faculty}</td>
                            </tr>
                            <tr>
                                <th>Type of study:</th>
                                <td>{typeOfStudy}</td>
                            </tr>
                            <tr>
                                <th>Grade of study:</th>
                                <td>{grade}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <table>
                            <thead>
                                <tr>
                                    <th>Programming languages</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.listTableLanguages(knownLanguages)}
                            </tbody>
                        </table>
                    </div>
                    <div className="column">
                        <table>
                            <thead>
                                <tr>
                                    <th>Spoken languages</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.listTableLanguages(spokenLanguages)}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={"flex-container"}>
                    <NavLink to={"/"}>Back</NavLink>
                </div>
            </div>
        );
    }
}

export default StudentConfirm;