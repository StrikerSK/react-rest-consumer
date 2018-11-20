import React from "react";
import {NavLink} from "react-router-dom";

const API = `http://localhost:8080/REST/getStudent?id=`;
// const API = `https://springhelloworldapp.herokuapp.com/REST/getStudent?id=`;

class Student extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            student: [], knownLanguages: [], spokenLanguages: []
        };

        this.deleteStudent = this.deleteStudent.bind(this);
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

    static listLanguages(language){
        if(language.length === 0){
            return (<li>No language!</li>)
        } else {
            return language.map(item => <li>{item}</li>)
        }
    }

    deleteStudent(event) {
        const id = event.target.value;
        const newRequest = "http://localhost:8080/REST/deleteStudent/" + id;

        fetch(newRequest, {
            method: "DELETE",
        }).then(this.props.history.push("/"))
            .catch(err => err);
    }

    render() {
        console.log(this.state.student);
        const {student, knownLanguages, spokenLanguages} = this.state;

        return (
            <div>
                <div className={"student-details"}>
                    <h1>{this.state.student.firstName} {student.lastName}</h1>
                    <p>Country of origin: <strong>{student.country}</strong></p>
                    <p>Type of study: <strong>{student.typeOfStudy}</strong></p>
                    <p>Grade of study: <strong>{student.grade}</strong></p>
                </div>
                <div className="row">
                    <div className="column">
                        <ul>
                            <lh><strong>Programming languages</strong></lh>
                            {Student.listLanguages(knownLanguages)}
                        </ul>
                    </div>
                    <div className="column">
                        <ul>
                            <lh><strong>Spoken languages</strong></lh>
                            {Student.listLanguages(spokenLanguages)}
                        </ul>
                    </div>
                </div>
                <button value={student.id} onClick={this.deleteStudent.bind(this)}>Delete: {student.firstName} {student.lastName}</button>
                <div>
                    <NavLink to={"/"}>Back</NavLink>
                </div>
            </div>
        );
    }
}

export default Student;