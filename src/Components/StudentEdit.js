import * as React from "react";
import {withRouter} from "react-router-dom";
import CountriesComponent from "./Elements/CountriesComponent";
import UniversityComponent from "./Elements/UniversityComponent";
import StudentEditCheckbox from "./Elements/StudentEditCheckbox";
import StudentEditRadiobutton from "./Elements/StudentEditRadiobutton";

/**
 * Komponenta vytvori formular pre editaciu uzivatelov
 */
class StudentEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: null, firstName: "", lastName: "", country: "", university: "" , faculty: "",
            typeOfStudy: "", grade: "",knownLanguages: [], spokenLanguages: [], favoriteLanguage: '', faculties: []};

        this.handleChange = this.handleChange.bind(this);
        this.handleRadio = this.handleRadio.bind(this);
        this.handleChangeUni = this.handleChangeUni.bind(this);
        this.editStudent = this.editStudent.bind(this);
        this.changeSpokenLanguage = this.changeSpokenLanguage.bind(this);
        this.changeProgrammingLanguage = this.changeProgrammingLanguage.bind(this);
    }

    componentDidMount() {
        const NUM = this.props.match.params.studentId;

        fetch("https://springhelloworldapp.herokuapp.com/REST/getStudent/" + NUM)
        // fetch("http://localhost:8080/REST/getStudent/" + NUM)
            .then(response => response.json())
            .then((result) => this.setState({ id: NUM, firstName: result.firstName, lastName: result.lastName,
                country: result.country, university: result.university , faculty: result.faculty, typeOfStudy: result.typeOfStudy, grade: result.grade,
                knownLanguages: result.knownLanguages, spokenLanguages: result.spokenLanguages, favoriteLanguage: result.favoriteLanguage}))
            .then(() => this.getFaculties(this.state.university));
    }

    /**
     * Metoda nacita fakulty na zaklade vybranej univerzity
     * @param uniId - ID univerzity ktora bola vybrana
     */
    getFaculties(uniId){
        fetch("https://springhelloworldapp.herokuapp.com/university/getFaculties?uniId=" + uniId)
        // fetch("http://localhost:8080/university/getFaculties?uniId=" + uniId)
            .then(response => response.json())
            .then((result) => this.setState({ faculties: result }));
    }

    /**
     * Metoda nastavuje hodnty premennych na zaklade vstupov
     */
    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({ [name]: target.value });
    }

    /**
     * Metoda nastavuje programovacie jazyky na zaklade vyberu
     */
    changeProgrammingLanguage(event) {
        let checkedArray = this.state.knownLanguages;
        const selectedValue = event.target.value;

        if (event.target.checked === true) {
            checkedArray.push(selectedValue);
            this.setState({knownLanguages: checkedArray});
        } else {
            const valueIndex = checkedArray.indexOf(selectedValue);
            checkedArray.splice(valueIndex, 1);
            this.setState({knownLanguages: checkedArray});
        }
    }

    changeSpokenLanguage(event) {
        let checkedArray = this.state.spokenLanguages;
        const selectedValue = event.target.value;

        if (event.target.checked === true) {
            checkedArray.push(selectedValue);
            this.setState({spokenLanguages: checkedArray});
        } else {
            const valueIndex = checkedArray.indexOf(selectedValue);
            checkedArray.splice(valueIndex, 1);
            this.setState({spokenLanguages: checkedArray});
        }
    }

    /**
     * Metoda nastavi hodnotu z pola radiobutton
     */
    handleRadio(event) {
        this.setState({ [event.target.name] : event.target.value })
    }

    handleChangeUni(event) {
        const university = event.target.value;

        fetch("https://springhelloworldapp.herokuapp.com/university/getFaculties?uniId=" + university)
        // fetch("http://localhost:8080/university/getFaculties?uniId=" + university)
            .then(response => response.json())
            .then(result => this.setState({faculties: result}));

        this.setState({university: university});
    }

    /**
     * Metoda pomocu REST posiela udaje k editacii
     */
    editStudent() {
        const {id, firstName, lastName, country, university, faculty, typeOfStudy, grade, knownLanguages, spokenLanguages, favoriteLanguage} = this.state;
        console.log("Called edit student");

        return fetch("https://springhelloworldapp.herokuapp.com/REST/editStudent/" + id, {
        // return fetch("http://localhost:8080/REST/editStudent/" + id, {
            method: "PUT",
            body: JSON.stringify({
                firstName,
                lastName,
                country,
                university,
                faculty,
                typeOfStudy,
                grade,
                knownLanguages,
                spokenLanguages,
                favoriteLanguage
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(this.props.history.push("/student/" + id));
    }

    render() {
        const programmingLanguages = ["C", "C++", "C#", "Java", "PHP", "Ruby","HTML", "CSS", "Javascript", "PL/SQL"];
        const spokenLanguagesOption = ["Czech", "Slovak", "Ukrainian", "Russian", "English", "French", "German", "Chinese", "Spanish", "Italian"];
        const {id, firstName, lastName, country, university, faculty, typeOfStudy, grade, knownLanguages, spokenLanguages, favoriteLanguage} = this.state;

        return (
            <div className={"newUser"}>
                <h2>Edit student: {firstName} {lastName}</h2>
                <form onSubmit={this.editStudent}>
                    <label>
                        <strong>First name:</strong>
                    </label>
                    <input name="firstName" type={"text"} value={firstName} onChange={this.handleChange} />
                    <br />
                    <label>
                        <strong>Last name:</strong>
                        <input name="lastName" type={"text"} value={lastName} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        <strong>Country:</strong>
                        <select name="country" value={country} onChange={this.handleChange}>\
                            <CountriesComponent/>
                        </select>
                    </label>
                    <br />
                    <label>
                        <strong>University:</strong>
                        <select name="university" value={university} onChange={this.handleChangeUni}>
                            <option hidden="hidden">Choose one</option>
                            <UniversityComponent/>
                        </select>
                    </label>
                    <br />
                    <label>
                        <strong>Faculties:</strong>
                        <select name="faculty" value={faculty} onChange={this.handleChange}>
                            <option hidden="hidden">Choose one</option>
                            {this.state.faculties.map(faculty => <option key={faculty.facultyId} value={faculty.facultyId}>{faculty.facultyName}</option>)}
                        </select>
                    </label>
                    <br/>
                    <label>
                        <strong>Type of study:</strong>
                        <select name="typeOfStudy" value={typeOfStudy} onChange={this.handleChange}>
                            <option hidden="hidden">Choose one</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Masters">Masters</option>
                            <option value="PhD student">PhD student</option>
                        </select>
                    </label>
                    <br/>
                    <label>
                        <strong>Grade:</strong>
                        <select name="grade" value={grade} onChange={this.handleChange}>
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
                                <StudentEditRadiobutton options={programmingLanguages} language={favoriteLanguage} onChange={this.handleRadio}/>
                                <li><label><input type={"radio"} name={"favoriteLanguage"} value={favoriteLanguage} onChange={this.handleRadio}/>None</label></li>
                            </ul>
                        </div>
                    </fieldset>
                    <fieldset className={"checkbox-select"}>
                        <div className={"progLanguages"}>
                            <strong>Select programming languages:</strong>
                            <ul className={"checkbox-grid"}>
                                <StudentEditCheckbox itemList={knownLanguages} languages={programmingLanguages} onChange={this.changeProgrammingLanguage}/>
                            </ul>
                        </div>
                    </fieldset>
                    <fieldset className={"checkbox-select"}>
                        <div className={"spokenLanguages"}>
                            <strong>Select spoken languages:</strong>
                            <ul className={"checkbox-grid"}>
                                <StudentEditCheckbox itemList={spokenLanguages} languages={spokenLanguagesOption} onChange={this.changeSpokenLanguage}/>
                            </ul>
                        </div>
                    </fieldset>

                    <div className="flex-container">
                        <input type="submit" value="Edit student"/>
                    </div>
                </form>

                <div className="flex-container">
                    <div className={"inline-boxes"}>
                        <a href={"/student/" + id}>Back</a>
                    </div>
                    <div className={"inline-boxes"}>
                        <a href={"/"}>Main menu</a>
                    </div>
                </div>
            </div>
        );
    }
}export default withRouter(StudentEdit);