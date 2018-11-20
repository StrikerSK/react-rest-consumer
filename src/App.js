import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import Student from "./Components/Student";
import Welcome from "./Components/Welcome";
import StudentList from "./Components/StudentList";
import RestPost from "./Components/RestPost";

class App extends PureComponent {
    render() {
        return (
          <BrowserRouter>
              <div className="App">
                  <Switch>
                      <Route exact strict path="/" component={StudentList}/>
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
