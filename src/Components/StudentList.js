import React from "react";
import {NavLink} from "react-router-dom";

class StudentList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            students: []
        }
    }

    componentDidMount() {
        // fetch("https://springhelloworldapp.herokuapp.com/REST/getStudents")
        fetch("http://localhost:8080/REST/getStudents")
            .then(response => response.json())
            .then((result) => this.setState({ students: result }))
    }

    render() {
        return (
            <div>
                <h1>This is a running application of ReactJS</h1>
                <h4>Student list:</h4>
                <ul className="student-links">
                    {this.state.students.map(item => (
                        <li key={item.id}><NavLink to={`/student/${item.id}`}>{item.firstName} {item.lastName}</NavLink></li>
                    ))}
                </ul>
                <h3><NavLink to={'/post'}>Create user</NavLink></h3>
            </div>
        );
    }
}

export default StudentList;