import React, {PureComponent} from 'react';
import Link from 'next/link';
import {BrowserRouter, NavLink, Route, Switch, Redirect} from "react-router-dom";

import Student from "./Components/Student";
import Welcome from "./Components/Welcome";
import WelcomePage from "./Components/WelcomePage";

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            students: []
        }
    }

    componentDidMount() {
        fetch("https://springhelloworldapp.herokuapp.com/REST/getStudents")
        // fetch("http://localhost:8080/REST/getStudent s")
            .then(response => response.json())
            .then((result) => this.setState({ students: result }))
    }

  render() {
    return (
      <BrowserRouter>
          <div className="App">
              <h4>Student list:</h4>
              <ul className="student-links">
                  {this.state.students.map(item => (
                      <li key={item.id}><NavLink to={`/student/${item.id}`}>{item.firstName} {item.lastName}</NavLink></li>
                  ))}
              </ul>

              <Switch>
                  <Route exact strict path="/" component={WelcomePage}/>
                  <Route exact strict path="/student/:studentId" component={Student}/>
                  <Route exact strict path="/welcome/:name" component={Welcome}/>
                  <Redirect to="/"/>
              </Switch>

          </div>
      </BrowserRouter>
    );
  }
}

export default App;
