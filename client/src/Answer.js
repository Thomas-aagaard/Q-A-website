import React,{Component} from 'react';

class Answer extends Component{

    // API url from the file '.env' OR the file '.env.development'.
    // The first file is only used in production.
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props){
        super(props);
        this.state = {
            answers : [
                {votes:0}
            ]
        }
    }

    async GetData() {
        let url = `${this.API_URL}/questions`; // URL of the API.

        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            questions: json
        })
    }
    vote (i) {
        let newVote = [...this.state.answers];
        newVote[i].votes++;
        function swap(array, i, j) {
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        this.setState({answers: newVote});
    }
    onChange(event) {
        this.setState({
            votes: this.vote()
        });
    }
    onSubmit(event) {
        this.props.AddVoting(this.props.id, this.prop.votes
    );
    }


    render(){
        return(
            <>
                <div className="answers">
                    {
                        this.state.answers.map((lang, i) =>
                            <div key={i} className="answers">
                                <div className="voteCount">
                                    {lang.votes}
                                </div>
                                <div>
                                </div>
                                 <button onClick={_ => this.onSubmit()}>GIVE A VOTE</button>
                                <button onClick={this.vote.bind(this, i)}>Click Here</button>

                            </div>
                        )
                    }
                </div>

            </>
        );
    }
}
export default Answer;