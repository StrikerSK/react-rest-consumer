import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import Student from "./Components/Student";
import Welcome from "./Components/Welcome";
import StudentList from "./Components/StudentList";
import RestPost from "./Components/RestPost";
import ConfirmStudent from "./Components/ConfirmStudent";
import InitForm from "./Components/InitForm";

class App extends PureComponent {
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
          <BrowserRouter>
              <InitForm>
                  {form => (
                      <div className="App">
                          <Switch>
                              <Route exact strict path="/" render={() => <StudentList students={this.state.students}/>}/>
                              <Route exact strict path="/student/:studentId" component={Student}/>
                              <Route exact strict path="/welcome/:name" component={Welcome}/>
                              <Route exact strict path="/post" render={() => <RestPost student={form}/>}/>
                              <Route exact strict path="/confirmStudent" render={() => <ConfirmStudent student={form}/>}/>
                              <Redirect to="/"/>
                          </Switch>
                      </div>
                  )}
              </InitForm>
          </BrowserRouter>
        );
    }
}

export default App;
