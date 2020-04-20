import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostAnswer from "./PostAnswer";


export default class Question extends Component {

    render() {
       // const id = this.props.id;
      //  const question = this.props.GetQuestion(id);
        const question = this.props.GetQuestion(this.props.id);
        let content = "Loading";
        let answers = [];

        // if question is empty then replace the question with "loading" see variable content above
        if (question) {
            content = question.question;
            answers = question.answers.map(a => <li key={a}>{a.text}<strong> { "Votes: "}</strong>{ a.votes}</li>);
        }

        return (
            <>
                <h2>{content}</h2>
                <h3>Answers</h3>
                <ul>
                    {answers}
                    <input id={this.props.answers} /*onChange={() => this.props.changeDone(this.props.questions._id)}*/
                           type="checkbox"/>
                </ul>

                <br/>
                {/* PostAnswer */}
                <PostAnswer id={this.props.id} postAnswer={(id, text, votes) => this.props.postAnswer(id, text, votes)}/>

                <br/> <br/>


                <Link to="/">Go Back</Link>
                <br/>
            </>
        );
    }
}