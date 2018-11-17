import React from "react";
import {NavLink} from "react-router-dom";

// const API = `http://localhost:8080/REST/getStudent?id=`;
const API = `https://springhelloworldapp.herokuapp.com/REST/getStudent?id=`;

class Student extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            student: [],
            knownLanguages: [],
            spokenLanguages: []
        }
    }

    componentDidMount() {
        const NUM = this.props.match.params.studentId;

        fetch(API + NUM)
            .then(response => response.json())
            .then((result) => this.setState({ student: result, knownLanguages: result.knownLanguages, spokenLanguages: result.spokenLanguages }));
    }

    componentWillReceiveProps(props) {
        const studentId = props.match.params.studentId;

        fetch(API + studentId)
            .then(response => response.json())
            .then((result) => this.setState({ student: result, knownLanguages: result.knownLanguages, spokenLanguages: result.spokenLanguages }));
    }

    static listLanguages(langugage){
        if(langugage.length === 0){
            return (<li>No language!</li>)
        } else {
            return langugage.map(item => <li>{item}</li>)
        }
    }

    render() {
        console.log(this.state.student);

        return (
            <div>
                <div className={"student-details"}>
                    <h1>{this.state.student.firstName} {this.state.student.lastName}</h1>
                    <p>Country of origin: <strong>{this.state.student.country}</strong></p>
                    <p>Type of study: <strong>{this.state.student.typeOfStudy}</strong></p>
                    <p>Grade of study: <strong>{this.state.student.grade}</strong></p>
                </div>
                <div className="row">
                    <div className="column">
                        <ul>
                            <lh><strong>Programming languages</strong></lh>
                            {Student.listLanguages(this.state.knownLanguages)}
                        </ul>
                    </div>
                    <div className="column">
                        <ul>
                            <lh><strong>Spoken languages</strong></lh>
                            {Student.listLanguages(this.state.spokenLanguages)}
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

export default Student;