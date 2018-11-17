import * as React from "react";

class RestPost extends React.Component{

    constructor(props){
        super(props);
        this.state = {firstName: '', lastName:'', country: '', university: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const name = target.name;

        this.setState({[name]: target.value})
    }

    handleSubmit(){
        alert('User created ' + this.state.lastName);
        this.createBlogPost();
    }

    createBlogPost() {
        return fetch('http://localhost:8080/REST/saveStudent', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(err => err);
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>First name: <input name={"firstName"} value={this.state.firstName} onChange={this.handleChange}/></label>
                <br/>
                <label>Last name: <input name={"lastName"} value={this.state.lastName} onChange={this.handleChange}/></label>
                <br/>
                <label>Country
                    <select name={"country"} value={this.state.country} onChange={this.handleChange}>
                        <option hidden={"hidden"}>Choose one</option>
                        <option value={"Slovakia"}>Slovakia</option>
                        <option value={"Czech republic"}>Czech republic</option>
                        <option value={"Poland"}>Poland</option>
                        <option value={"Germany"}>Germany</option>
                        <option value={"Hungary"}>Hungary</option>
                    </select>
                </label>
                <br/>
                <label>University
                    <select name={"university"} value={this.state.university} onChange={this.handleChange}>
                        <option hidden={"hidden"}>Choose one</option>
                        <option value={"1"}>VŠE</option>
                        <option value={"2"}>UK</option>
                        <option value={"3"}>None</option>
                    </select>
                </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        )
    }

} export default RestPost