import React from "react";
import {NavLink, withRouter} from "react-router-dom";

const mainCol = {
    width: '80%'
};

const cols = {
    width: '10%'
};

/**
 * Komponenta nacita list studentov pre uzivatela
 */
class StudentList extends React.Component{

    constructor(props) {
        super(props);
        this.state = { students: [] };

        this.deleteStudent = this.deleteStudent.bind(this);
        this.getStudents = this.getStudents.bind(this);
    }

    componentDidMount() {
        this.getStudents();
    }

    /**
     * Metoda pomocou fetchu prebere hodnoty studntov pre dalsie spracovanie
     */
    getStudents(){
        fetch("https://springhelloworldapp.herokuapp.com/REST/getStudents")
        // fetch("http://localhost:8080/REST/getStudents")
            .then(response => response.json())
            .then((result) => this.setState({ students: result }))
    }

    /**
     * Metoda odstranuje uzivatela z DB cez REST Delete
     * @param event - objekt udalosti ktory ma urcite vlastnosti
     */
    deleteStudent(event) {
        const id = event.target.value;
        const newRequest = "https://springhelloworldapp.herokuapp.com/REST/deleteStudent/" + id;
        // const newRequest = "http://localhost:8080/REST/deleteStudent/" + id;

        alert("Deleting student with id: " + id);

        fetch(newRequest, {
            method: "DELETE",
        }).then(this.getStudents);
    }


    render() {
        const students = this.state.students;

        return (
            <div>
                <h2>Student list</h2>

                <table>
                    <tbody>
                        {students.map(item => (
                            <tr key={item.id}>
                                <td style={mainCol}><p>{item.firstName} {item.lastName}</p></td>
                                <td style={cols}><p><NavLink to={`/student/${item.id}`}>Detail</NavLink></p></td>
                                <td style={cols}><p><NavLink to={`/studentEdit/${item.id}`}>Edit</NavLink></p></td>
                                <td style={cols}><button onClick={this.deleteStudent} value={item.id}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex-container">
                    <h3><NavLink to={'/post'}>Create student</NavLink></h3>
                </div>
            </div>
        );
    }
}

export default withRouter(StudentList);