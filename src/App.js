import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import Student from "./Components/Student";
import Welcome from "./Components/Welcome";
import WelcomePage from "./Components/WelcomePage";
import RestPost from "./Components/RestPost";

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            students: []
        }
    }

    componentDidMount() {
        fetch("https://springhelloworldapp.herokuapp.com/REST/getStudents")
        // fetch("http://localhost:8080/REST/getStudents")
            .then(response => response.json())
            .then((result) => this.setState({ students: result }))
    }

  render() {
    return (
      <BrowserRouter>
          <div className="App">
              <Switch>
                  <Route exact strict path="/" render={() => <WelcomePage students={this.state.students} /> }/>
                  <Route exact strict path="/student/:studentId" component={Student}/>
                  <Route exact strict path="/welcome/:name" component={Welcome}/>
                  <Route exact strict path="/post" component={RestPost}/>
                  <Redirect to="/"/>
              </Switch>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
