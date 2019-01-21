import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import StudentDetail from "./Components/StudentDetail";
import Welcome from "./Components/Welcome";
import StudentList from "./Components/StudentList";
import RestPost from "./Components/StudentAdd";
import StudentConfirm from "./Components/StudentConfirm";
import InitForm from "./Components/InitForm";
import StudentEdit from "./Components/StudentEdit";

class App extends PureComponent {

    render() {
        return (
          <BrowserRouter>
              <InitForm>
                  {form => (
                      <div className="App">
                          <Switch>
                              <Route exact strict path="/" render={() => <StudentList/>}/>
                              <Route exact strict path="/student/:studentId" component={StudentDetail}/>
                              <Route exact strict path="/studentEdit/:studentId" render={() => <StudentEdit/>}/>
                              <Route exact strict path="/welcome/:name" component={Welcome}/>
                              <Route exact strict path="/post" render={() => <RestPost student={form}/>}/>
                              <Route exact strict path="/confirmStudent" render={() => <StudentConfirm student={form}/>}/>
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
