import * as React from "react";
import PropTypes from "prop-types";
import CountriesComponent from "./CountriesComponent";
import CheckboxComponents from "./CheckboxComponents";
import RadioComponent from "./RadioComponent";
import {withRouter} from "react-router-dom";

class RestPost extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { faculties: [], universities: []};

        this.handleChangeUni = this.handleChangeUni.bind(this);
    }

    componentDidMount(){
        fetch("http://localhost:8080/university/getUniversities")
            .then(response => response.json())
            .then(result => this.setState({universities: result}));
    }

    handleChangeUni(event) {
        const university = event.target.value;

        fetch("http://localhost:8080/university/getFaculties?uniId=" + university)
            .then(response => response.json())
            .then(result => this.setState({faculties: result}));

        this.props.student.data.university = university;
    }

    render() {
        const programmingLanguages = ["C", "C++", "C#", "Java", "PHP", "Ruby","HTML", "CSS", "Javascript", "PL/SQL"];
        const spokenLanguages = ["Czech", "Slovak", "Ukrainian", "Russian", "English", "French", "German", "Chinese", "Spanish", "Italian"];
        const student = this.props.student;
        const { location } = this.props;

        return (
            <div className={"newUser"}>
                <h1>Create new student</h1>
                <div>You are now at: <strong>{location.pathname}</strong></div>
                <form onSubmit={student.onSubmit}>
                    <label>
                        <strong>First name:</strong>
                    </label>
                    <input name="firstName" type={"text"} value={student.data.firstName} onChange={student.onChange} />
                    <br />
                    <label>
                        <strong>Last name:</strong>
                        <input name="lastName" type={"text"} value={student.data.lastName} onChange={student.onChange} />
                    </label>
                    <br />
                    <label>
                        <strong>Country:</strong>
                        <select name="country" value={student.data.country} onChange={student.onChange}>\
                            <option value={""} hidden={true}>Choose one</option>
                            <CountriesComponent/>
                        </select>
                    </label>
                    <br />
                    <label>
                        <strong>University:</strong>
                        <select name="university" value={student.data.university} onChange={this.handleChangeUni}>
                            <option hidden="hidden">Choose one</option>
                            {this.state.universities.map(uni => <option value={uni.university_id}>{uni.universityName}</option>)}
                        </select>
                    </label>
                    <br />
                    <label>
                        <strong>Faculties:</strong>
                        <select name="faculty" value={student.data.faculty} onChange={student.onChange}>
                            <option hidden="hidden">Choose one</option>
                            {this.state.faculties.map(faculty => <option value={faculty.facultyId}>{faculty.facultyName}</option>)}
                        </select>
                    </label>
                    <br/>
                    <fieldset className={"checkbox-select"}>
                        <div className={"favLanguages"}>
                            <strong>Select favorite programming language:</strong>
                            <ul className={"checkbox-grid"}>
                                <RadioComponent options={programmingLanguages} onChange={student.onChangeRadio}/>
                                <li><label><input type={"radio"} name={"favLanguage"} value="None" onChange={this.props.onChange}/>None</label></li>
                            </ul>
                        </div>
                    </fieldset>
                    <fieldset className={"checkbox-select"}>
                        <div className={"progLanguages"}>
                            <strong>Select programming languages:</strong>
                            <ul className={"checkbox-grid"}>
                                <CheckboxComponents languages={programmingLanguages} onChange={student.onChangeProgramming}/>
                            </ul>
                        </div>
                    </fieldset>
                    <fieldset className={"checkbox-select"}>
                        <div className={"spokenLanguages"}>
                            <strong>Select spoken languages:</strong>
                            <ul className={"checkbox-grid"}>
                                <CheckboxComponents languages={spokenLanguages} onChange={student.onChangeSpoken}/>
                            </ul>
                        </div>
                    </fieldset>
                    <input type="submit" value="Create student"/>
                </form>
            </div>
        );
    }
}export default withRouter(RestPost);