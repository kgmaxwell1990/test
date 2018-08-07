import React, { Component } from 'react';

class PlayGameContainer extends Component {
    state= {
        score: 0,
        timesPlayed: 0,
        };

    componentDidMount() {
        this.gameLoop();
    }
    
    gameLoop = () => {
        if (this.state.timesPlayed >= 1) {
        //------ Styling ------ //
        document.getElementById('c_answer').classList.remove('btn_green');
        document.getElementById('c_answer').classList.add('hover');
        document.getElementById('icon_correct').innerHTML="";
        
        let wrong_answers = document.getElementsByClassName('w_answer');
        for (let i = 0; i <= wrong_answers.length -1; i++) {
            wrong_answers[i].classList.remove('btn_red');
            wrong_answers[i].classList.add('hover');
        }
        let all_answers = document.getElementsByClassName('answer_btn');
        for (let i = 0; i <= all_answers.length -1; i++) {
            all_answers[i].disabled = false;
            all_answers[i].classList.add('hover');
        }
        
        let answers_text = document.getElementsByClassName('answers_text');
        for (let i = 0; i <= answers_text.length -1; i++) {
            answers_text[i].classList.remove('color_white');
        }
        
        let answers_icon = document.getElementsByClassName('icon_wrong');
        for (let i = 0; i <= answers_icon.length -1; i++) {
            answers_icon[i].innerHTML="";
        }
        //------------ //
        }



        const qa = this.props.qa;
        const i = this.state.timesPlayed

        const all_answers_array = []

        all_answers_array.push(qa[i]['correct_answer'])
        all_answers_array.push(qa[i]['wrong_answer1'])
        all_answers_array.push(qa[i]['wrong_answer2'])
        all_answers_array.push(qa[i]['wrong_answer3'])

        qa[i]['all_answers'] = all_answers_array.sort(function(a, b){return 0.5 - Math.random()});
        const qa2 = [qa[i]]

        let qaPost = qa2.map(q => {
            return(
                <div className="row" key={q.id}>
                    <h5 className="question_text">{q.question}</h5>
                    {q.all_answers.map(a => {
                        return(
                        <div className="col s6 answer_box_outer" onClick={this.handleGuess.bind(this, q, a)}>
                        {a === q.correct_answer ? 
                            <button className="answer_btn answer_box_inner hover" id="c_answer"><h6 className="answers_text">{a}<i className="material-icons right" id="icon_correct"></i></h6></button>:
                            <button className="answer_btn answer_box_inner hover w_answer"><h6 className="answers_text">{a}<i className="material-icons right icon_wrong"></i></h6></button>}
                        </div>
                        );
                    })}

                </div>
            );
        })
        
        this.setState({ qa: qaPost, timesPlayed: this.state.timesPlayed + 1});
    }
    
    handleGuess = (q, a) => {
        
        // ------ Styling ------ //
        document.getElementById('c_answer').classList.add('btn_green');
        document.getElementById('c_answer').classList.remove('hover');
        document.getElementById('icon_correct').innerHTML="check";
        
        let wrong_answers = document.getElementsByClassName('w_answer');
        for (let i = 0; i <= wrong_answers.length -1; i++) {
            wrong_answers[i].classList.add('btn_red');
            wrong_answers[i].classList.remove('hover');
        }
        let all_answers = document.getElementsByClassName('answer_btn');
        for (let i = 0; i <= all_answers.length -1; i++) {
            all_answers[i].disabled = true;
            all_answers[i].classList.remove('hover');
        }
        
        let answers_text = document.getElementsByClassName('answers_text');
        for (let i = 0; i <= answers_text.length -1; i++) {
            answers_text[i].classList.add('color_white');
        }
        
        let answers_icon = document.getElementsByClassName('icon_wrong');
        for (let i = 0; i <= answers_icon.length -1; i++) {
            answers_icon[i].innerHTML="clear";
        }
        // ------------ //
        

        if (q.correct_answer === a) {
            this.setState({score: this.state.score + 1 });
        }
    }


    render() {
        return (
            <div>
                <h4>Question {this.state.timesPlayed}/5</h4>
                
                {this.state.qa}
                { this.props.qa.length === this.state.timesPlayed ? 
                <button className="waves-effect waves-light btn btn-small" id="next_button" onClick={this.props.endGame.bind(this, this.state.score)}><i className="material-icons right">send</i>Check Score</button>
                :
                <button className="waves-effect waves-light btn btn-small" id="next_button" onClick={this.gameLoop}><i className="material-icons right">send</i>Next Question</button>
                }


            </div>
        );
    }
}

export default PlayGameContainer;