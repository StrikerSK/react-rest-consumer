import React from "react";
import {NavLink} from "react-router-dom";

// const API = `http://localhost:8080/REST/getStudent?id=`;
const API = `https://springhelloworldapp.herokuapp.com/REST/getStudent?id=`;

const tableWidth = {
    width: "75%"
};

/**
 * Komponenta zobrazuje detail studenta
 */
class StudentDetail extends React.Component{
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

    /**
     * Metoda nastavi list na zobrazenie udajov uzivatela
     */
    listTableLanguages = (language) => {
        if(language.length === 0){
            return (<tr><td>No language!</td></tr>)
        } else {
            return language.map(item => <tr key={item}><td>{item}</td></tr>)
        }
    };

    /**
     * Metoda odstranuje uzivatela z DB
     */
    deleteStudent(event) {
        const id = event.target.value;
        // const newRequest = "http://localhost:8080/REST/deleteStudent/" + id;
        const newRequest = "https://springhelloworldapp.herokuapp.com/REST/deleteStudent/" + id;

        alert("Deleting student with id: " + id);

        fetch(newRequest, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => this.props.history.push("/"));
    }

    render() {
        console.log(this.state.student);
        const {student, knownLanguages, spokenLanguages} = this.state;

        return (
            <div>
                <div className={"student-details"}>
                    <h2>{student.firstName} {student.lastName}</h2>
                    <div className={"flex-container"}>
                        <table style={tableWidth}>
                            <tbody>
                                <tr>
                                    <th>First name:</th>
                                    <td>{student.firstName}</td>
                                </tr>
                                <tr>
                                    <th>Last name:</th>
                                    <td>{student.lastName}</td>
                                </tr>
                                <tr>
                                    <th>Country of origin:</th>
                                    <td>{student.country}</td>
                                </tr>
                                <tr>
                                    <th>University:</th>
                                    <td>{student.university}</td>
                                </tr>
                                <tr>
                                    <th>Faculty:</th>
                                    <td>{student.faculty}</td>
                                </tr>
                                <tr>
                                    <th>Type of study:</th>
                                    <td>{student.typeOfStudy}</td>
                                </tr>
                                <tr>
                                    <th>Grade of study:</th>
                                    <td>{student.grade}</td>
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
                    <div className="inline-boxes">
                        <button value={student.id} onClick={this.deleteStudent}>Delete</button>
                    </div>
                    <div className="inline-boxes">
                        <NavLink to={"/studentEdit/" + student.id}>Edit</NavLink>
                    </div>
                    <div className="inline-boxes">
                        <NavLink to={"/"}>Main menu</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}export default StudentDetail;