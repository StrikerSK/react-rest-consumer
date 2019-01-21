import * as React from "react";
import CountriesComponent from "./Elements/CountriesComponent";
import CheckboxComponents from "./CheckboxComponents";
import RadioComponent from "./RadioComponent";
import {withRouter} from "react-router-dom";

/**
 * Komponenta pre vytvaranie studenta v aplikacii
 */
class StudentAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = { faculties: [], universities: []};

        this.handleChangeUni = this.handleChangeUni.bind(this);
    }

    componentDidMount(){
        // fetch("http://localhost:8080/university/getUniversities")
        fetch("https://springhelloworldapp.herokuapp.com/university/getUniversities")
            .then(response => response.json())
            .then(result => this.setState({universities: result}));
    }

    /**
     * Komponenta nastavi Univerzitu pre tvoreneho studenta a nastavi moznosti fakult
     */
    handleChangeUni(event) {
        const university = event.target.value;

        fetch("https://springhelloworldapp.herokuapp.com/university/getFaculties?uniId=" + university)
        // fetch("http://localhost:8080/university/getFaculties?uniId=" + university)
            .then(response => response.json())
            .then(result => this.setState({faculties: result}));

        this.props.student.data.university = university;
    }

    render() {
        const programmingLanguages = ["C", "C++", "C#", "Java", "PHP", "Ruby","HTML", "CSS", "Javascript", "PL/SQL"];
        const spokenLanguages = ["Czech", "Slovak", "Ukrainian", "Russian", "English", "French", "German", "Chinese", "Spanish", "Italian"];
        const student = this.props.student;

        return (
            <div className={"newUser"}>
                <h2>Create new student</h2>
                <form onSubmit={student.submitStudent}>
                    <label>
                        <strong>First name:</strong>
                    </label>
                    <input name="firstName" type={"text"} value={student.data.firstName} onChange={student.onChange} required={true}/>
                    <br />
                    <label>
                        <strong>Last name:</strong>
                        <input name="lastName" type={"text"} value={student.data.lastName} onChange={student.onChange} required={true}/>
                    </label>
                    <br />
                    <label>
                        <strong>Country:</strong>
                        <select name="country" value={student.data.country} onChange={student.onChange} required={true}>
                            <option value={""} hidden={true}>Choose one</option>
                            <CountriesComponent/>
                        </select>
                    </label>
                    <br />
                    <label>
                        <strong>University:</strong>
                        <select name="university" value={student.data.university} onChange={this.handleChangeUni} required={true}>
                            <option hidden="hidden">Choose one</option>
                            {this.state.universities.map(uni => <option key={uni.university_id} value={uni.university_id}>{uni.universityName}</option>)}
                        </select>
                    </label>
                    <br />
                    <label>
                        <strong>Faculties:</strong>
                        <select name="faculty" value={student.data.faculty} onChange={student.onChange} required={true}>
                            <option hidden="hidden">Choose one</option>
                            {this.state.faculties.map(faculty => <option value={faculty.facultyId}>{faculty.facultyName}</option>)}
                        </select>
                    </label>
                    <br/>
                    <label>
                        <strong>Type of study:</strong>
                        <select name="typeOfStudy" value={student.data.typeOfStudy} onChange={student.onChange} required={true}>
                            <option hidden="hidden">Choose one</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Masters">Masters</option>
                            <option value="PhD student">PhD student</option>
                        </select>
                    </label>
                    <br/>
                    <label>
                        <strong>Grade:</strong>
                        <select name="grade" value={student.data.grade} onChange={student.onChange} required={true}>
                            <option hidden="hidden">Choose one</option>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                            <option value="3rd">3rd</option>
                            <option value="Extended">Extended</option>
                        </select>
                    </label>
                    <br/>
                    <fieldset className={"checkbox-select"}>
                        <div className={"favLanguages"}>
                            <strong>Select favorite programming language:</strong>
                            <ul className={"checkbox-grid"}>
                                <RadioComponent options={programmingLanguages} onChange={student.onChangeRadio}/>
                                <li><label><input type={"radio"} name={"favoriteLanguage"} value="None" onChange={this.props.onChange} required={true}/>None</label></li>
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

                    <div className={"flex-container"}>
                        <input type="submit" value="Create student"/>
                    </div>
                </form>
            </div>
        );
    }
}export default withRouter(StudentAdd);