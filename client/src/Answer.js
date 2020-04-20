import React, {Component} from "react";


export default class Answer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: ""
        };
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    onSubmit(event) {
        this.props.postAnswer(this.props.id, this.state.input);
    }
    async GetData() {
        const url = 'http://localhost:8080/api/questions';
        const response = await fetch(url);
        const data = await response.json();
        // setting the data and insert in our empty array tasks
        this.setState({
            questions: data
        });}





    render() {
        return(
            <>
                <label htmlFor="post-Answer">
                    Get you questions answered
                </label>
                <input id="post-Answer" name="input" onChange={event => this.handleChange(event)} type="text"/>
                <button onClick={_ => this.onSubmit()}>Post Answer</button>



            </>
        );
    }

}
