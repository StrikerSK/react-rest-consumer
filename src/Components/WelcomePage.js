import React from "react";
import {NavLink} from "react-router-dom";

class WelcomePage extends React.Component{
    render() {
        return (
            <div>
                <h1>This is a running application of ReactJS</h1>
                <h4>Student list:</h4>
                <ul className="student-links">
                    {this.props.students.map(item => (
                        <li key={item.id}><NavLink to={`/student/${item.id}`}>{item.firstName} {item.lastName}</NavLink></li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default WelcomePage;