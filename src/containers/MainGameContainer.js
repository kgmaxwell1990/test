import React, { Component } from 'react';
import axios from 'axios';
import Home from '../components/HomeScreen';
import PlayGameContainer from '../containers/PlayGameContainer';
import EndGame from '../components/EndGame';

class MainGameContainer extends Component {
    state = {
        home: true,
        playGame: false,
        endGame: false,
        username: '',
        qa: [],
        score: 0,
        leaderboard: []
    }

    componentDidMount() {
        this.setState({qa:[
            {
                'question':'What is the capital of Ireland?',
                'correct_answer':'Dublin',
                'wrong_answer1': 'London',
                'wrong_answer2': 'Paris',
                'wrong_answer3': 'Berlin'},
            {
                'question':'What is the capital of England?',
                'correct_answer':'London',
                'wrong_answer1': 'Dublin',
                'wrong_answer2': 'Paris',
                'wrong_answer3': 'Berlin'
            },
            {
                'question':'What is the capital of France?',
                'correct_answer':'Paris',
                'wrong_answer1': 'Dublin',
                'wrong_answer2': 'London',
                'wrong_answer3': 'Berlin'
            },
            {
                'question':'What is the capital of France?',
                'correct_answer':'Paris',
                'wrong_answer1': 'Dublin',
                'wrong_answer2': 'London',
                'wrong_answer3': 'Berlin'
            },
            {
                'question':'What is the capital of France?',
                'correct_answer':'Paris',
                'wrong_answer1': 'Dublin',
                'wrong_answer2': 'London',
                'wrong_answer3': 'Berlin'
            },
        ]})
            
    }

    resetAll = () => {
        this.setState({ score: 0 });
    }

    getUsername = (event, name) => {
        event.preventDefault();
        document.getElementById("greeting").innerHTML = "<h3>Hi " + name + ", press play to start the Quiz!</h3>";
        document.getElementById('play_button').classList.remove('display_none');
        this.setState({ username: name });
    }

    home = () => {
        this.resetAll()
        this.setState({ endGame: false, home: true, playGame: false });
    }

    playGame = () => {
        this.setState({ endGame: false, home: false, playGame: true });
    }

    endGame = (score) => {
        const username = this.state.username;
        const data = {
            username: username,
            score: score
        }
        this.setState({ leaderboard: [...this.state.leaderboard, data] })
        this.setState({ home: false, playGame: false, endGame: true, score: score });
    }

    render() {
        return (
            <div>
                {this.state.home === true ? <Home getUsername={this.getUsername} playGame={this.playGame}/>: ""}
                {this.state.playGame === true ? <PlayGameContainer endGame={this.endGame} timesPlayed={this.state.timesPlayed} qa={this.state.qa} />: ""}
                {this.state.endGame === true ? <EndGame home={this.home} playGame={this.playGame} leaderboard={this.state.leaderboard} score={this.state.score} username={this.state.username}/>: ""}
            </div>
        );
    }
}

export default MainGameContainer;
