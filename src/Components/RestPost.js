import * as React from "react";
import CountriesComponent from "./CountriesComponent";

class CheckBox extends React.Component {

    render() {
        return (
            <input type="checkbox" id={this.props.id} value={this.props.value} onChange={this.props.onChange} />
        )
    }

}

class RestPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = { firstName: "", lastName: "", country: "", university: "" , faculty: "",
            faculties: [], universities: [], lang: ["C", "C++", "C#", "Java", "PHP", "HTML", "CSS"], knownLanguages: []
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

    changeEvent(event) {

        let checkedArray = this.state.knownLanguages;
        const selectedValue = event.target.value;

        if (event.target.checked === true) {

            checkedArray.push(selectedValue);
            this.setState({
                knownLanguages: checkedArray
            });

        } else {

            const valueIndex = checkedArray.indexOf(selectedValue);
            checkedArray.splice(valueIndex, 1);

            this.setState({
                knownLanguages: checkedArray
            });

        }

        console.log(this.state.knownLanguages);
    }

    createBlogPost() {
        const { firstName, lastName, university, faculty, country, knownLanguages } = this.state;

        return fetch("http://localhost:8080/REST/saveStudent", {
            method: "POST",
            body: JSON.stringify({
                firstName,
                lastName,
                country,
                university,
                faculty,
                knownLanguages
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res)
            .catch(err => err);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    First name:{" "}
                    <input name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Last name:{" "}
                    <input name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Country
                    <select name="country" value={this.state.country} onChange={this.handleChange}>\
                        <option value={""} hidden={true}>Choose one</option>
                        <CountriesComponent/>
                    </select>
                </label>
                <br />
                <label>
                    University
                    <select name="university" value={this.state.university} onChange={this.handleChangeUni}>
                        <option hidden="hidden">Choose one</option>
                        {this.state.universities.map(uni => <option value={uni.university_id}>{uni.universityName}</option>)}
                    </select>
                </label>
                <br />
                <label>
                    Faculties
                    <select name="faculty" value={this.state.faculty} onChange={this.handleChange}>
                        <option hidden="hidden">Choose one</option>
                        {this.state.faculties.map(faculty => <option value={faculty.facultyId}>{faculty.facultyName}</option>)}
                    </select>
                </label>
                <br/>
                    {this.state.lang.map(item => <label><CheckBox id={item} value={item} onChange={this.changeEvent.bind(this)}/>{item}</label>)}
                <br/>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default RestPost;