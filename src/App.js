import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/REST/getStudents")
            .then(response => response.json())
            .then((result) => this.setState({ students: result }))
    }

    render() {
        return (
            <ul>{this.state.students.map(item => <li key={item.id}><strong>{item.firstName} {item.lastName}</strong> from <strong>{item.country}</strong></li>)}</ul>
        );
    }
}

export default App;