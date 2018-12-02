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
            return language.map(item => <li key={item}>{item}</li>)
        }
    }

    static listTableLanguages(language){
        if(language.length === 0){
            return (<tr><td>No language!</td></tr>)
        } else {
            return language.map(item => <tr key={item}><td>{item}</td></tr>)
        }
    }

    deleteStudent(event) {
        const id = event.target.value;
        const newRequest = "http://localhost:8080/REST/deleteStudent/" + id;

        alert("Deleting student with id: " + id);

        fetch(newRequest, {
            method: "DELETE",
        });

        this.props.history.push("/");
    }

    render() {
        console.log(this.state.student);
        const {student, knownLanguages, spokenLanguages} = this.state;

        return (
            <div>
                <div className={"student-details"}>
                    <h1>{student.firstName} {student.lastName}</h1>
                    <p>First name: <strong>{student.firstName}</strong></p>
                    <p>Last name: <strong>{student.lastName}</strong></p>
                    <p>Country of origin: <strong>{student.country}</strong></p>
                    <p>Type of study: <strong>{student.typeOfStudy}</strong></p>
                    <p>Grade of study: <strong>{student.grade}</strong></p>
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
                                {Student.listTableLanguages(knownLanguages)}
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
                                {Student.listTableLanguages(spokenLanguages)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <button value={student.id} onClick={this.deleteStudent.bind(this)}>Delete: {student.firstName} {student.lastName}</button>
                <div>
                    <NavLink to={"/"}>Back</NavLink>
                </div>
            </div>
        );
    }
}export default Student;