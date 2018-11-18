import * as React from "react";
import CountriesComponent from "./CountriesComponent";
import CheckboxComponents from "./CheckboxComponents";
import RadioComponent from "./RadioComponent";

class RestPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = { firstName: "", lastName: "", country: "", university: "" , faculty: "",
            faculties: [], universities: [], lang: ["C", "C++", "C#", "Java", "PHP", "HTML", "CSS"], knownLanguages: [],
            spokenLanguages: [], favoriteLanguage: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeUni = this.handleChangeUni.bind(this);
    }

    componentDidMount(){
        fetch("http://localhost:8080/university/getUniversities")
            .then(response => response.json())
            .then(result => this.setState({universities: result}));
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({ [name]: target.value });
    }

    handleChangeUni(event) {
        const university = event.target.value;

        fetch("http://localhost:8080/university/getFaculties?uniId=" + university)
            .then(response => response.json())
            .then(result => this.setState({faculties: result}));

        this.setState({ university: university });
    }

    handleSubmit() {
        alert(`User created ${this.state.lastName}`);
        this.createBlogPost();
    }

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

        console.log(this.state.knownLanguages);
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

        console.log(this.state.spokenLanguages);
    }

    handleRadio(e) {
        this.setState({ favoriteLanguage: e.target.value })
    }

    createBlogPost() {
        const { firstName, lastName, university, faculty, country, knownLanguages, spokenLanguages, favoriteLanguage} = this.state;

        return fetch("http://localhost:8080/REST/saveStudent", {
            method: "POST",
            body: JSON.stringify({
                firstName,
                lastName,
                country,
                university,
                faculty,
                knownLanguages,
                spokenLanguages,
                favoriteLanguage
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res)
            .catch(err => err);
    }

    render() {
        const programmingLanguages = ["C", "C++", "C#", "Java", "PHP", "HTML", "CSS"];
        const spokenLanguages = ["Czech", "Slovak", "Ukrainian", "Russian", "English", "French", "German"];

        return (
            <div className={"newUser"}>
                <h1>Create new student</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <strong>First name:</strong>
                    </label>
                    <input name="firstName" type={"text"} value={this.state.firstName} onChange={this.handleChange} />
                    <br />
                    <label>
                        <strong>Last name:</strong>
                        <input name="lastName" type={"text"} value={this.state.lastName} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        <strong>Country:</strong>
                        <select name="country" value={this.state.country} onChange={this.handleChange}>\
                            <option value={""} hidden={true}>Choose one</option>
                            <CountriesComponent/>
                        </select>
                    </label>
                    <br />
                    <label>
                        <strong>University:</strong>
                        <select name="university" value={this.state.university} onChange={this.handleChangeUni}>
                            <option hidden="hidden">Choose one</option>
                            {this.state.universities.map(uni => <option value={uni.university_id}>{uni.universityName}</option>)}
                        </select>
                    </label>
                    <br />
                    <label>
                        <strong>Faculties:</strong>
                        <select name="faculty" value={this.state.faculty} onChange={this.handleChange}>
                            <option hidden="hidden">Choose one</option>
                            {this.state.faculties.map(faculty => <option value={faculty.facultyId}>{faculty.facultyName}</option>)}
                        </select>
                    </label>
                    <br/>
                    <div className={"favLanguages"}>
                        <strong>Select favorite programming language:</strong>
                        <RadioComponent options={programmingLanguages} onChange={this.handleRadio.bind(this)}/>
                    </div>
                    <br/>
                    <div className={"progLanguages"}>
                        <strong>Select programming languages:</strong>
                        <CheckboxComponents languages={programmingLanguages} onChange={this.changeProgrammingLanguage.bind(this)}/>
                    </div>
                    <br/>
                    <div className={"spokenLanguages"}>
                        <strong>Select spoken languages:</strong>
                        <CheckboxComponents languages={spokenLanguages} onChange={this.changeSpokenLanguage.bind(this)}/>
                    </div>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default RestPost;