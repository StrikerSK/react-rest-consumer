import React from "react";
import {NavLink} from "react-router-dom";

class StudentList extends React.Component{
    render() {
        const students = this.props.students;

        return (
            <div>
                <h1>This is a running application of ReactJS</h1>
                <h4>Student list:</h4>
                <ul className="student-links">
                    {students.map(item => (
                        <li key={item.id}><NavLink to={`/student/${item.id}`}>{item.firstName} {item.lastName}</NavLink></li>
                    ))}
                </ul>
                <h3><NavLink to={'/post'}>Create user</NavLink></h3>
            </div>
        );
    }
}

export default StudentList;