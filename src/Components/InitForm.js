import * as React from "react";
import {withRouter} from "react-router-dom";

/**
 * Komponenta pre presuvanie dat medzi komponentmi
 */
class InitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { firstName: "", lastName: "", country: "", university: "", typeOfStudy: "", grade: "", faculty: "", knownLanguages: [],
            spokenLanguages: [], favoriteLanguage: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRadio = this.handleRadio.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.changeSpokenLanguage = this.changeSpokenLanguage.bind(this);
        this.changeProgrammingLanguage = this.changeProgrammingLanguage.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({ [name]: target.value });
    }

    handleSubmit() {
        const {firstName, lastName} = this.state;

        alert(`User created: ${firstName} ${lastName}`);
        this.addStudent();
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

    handleRadio(event) {
        this.setState({ favoriteLanguage: event.target.value })
    }

    addStudent() {
        const { firstName, lastName, university, faculty, typeOfStudy, grade, country, knownLanguages, spokenLanguages, favoriteLanguage} = this.state;

        console.log("called add user");
        // return fetch("http://localhost:8080/REST/saveStudent", {
        return fetch("https://springhelloworldapp.herokuapp.com/REST/saveStudent", {
            method: "POST",
            body: JSON.stringify({
                firstName,
                lastName,
                country,
                university,
                typeOfStudy,
                grade,
                faculty,
                knownLanguages,
                spokenLanguages,
                favoriteLanguage
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(this.props.history.push("/confirmStudent"));
    }

    render() {
        const { children } = this.props;

        return children({
            data : this.state,
            onChange: this.handleChange,
            onChangeRadio: this.handleRadio,
            onChangeSpoken: this.changeSpokenLanguage,
            onChangeProgramming: this.changeProgrammingLanguage,
            submitStudent: this.addStudent,
            onSubmit: this.handleSubmit
        });
    }
}export default withRouter(InitForm);