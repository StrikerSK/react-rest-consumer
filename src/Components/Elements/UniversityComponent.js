import * as React from "react";

class UniversityComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {universities: []};
    }

    componentDidMount() {
        // fetch("http://localhost:8080/university/getUniversities")
        fetch("https://springhelloworldapp.herokuapp.com/university/getUniversities")
            .then(response => response.json())
            .then(result => this.setState({universities: result}));
    }

    render() {
        const universities = this.state.universities;

        return (
            universities.map(item => <option key={item.university_id} value={item.university_id}>{item.universityName}</option>)
        )
    }
} export default UniversityComponent