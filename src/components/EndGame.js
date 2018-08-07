import React, { Component } from 'react';

class EndGame extends Component {

  render() {
  
    return (
      <div className="row">
      <div className="col s6">
        <h3>{ this.props.score <2 ? "Unlucky ": "" }
            { this.props.score >=2 && this.props.score <3 ? "Keep trying ": "" }
            { this.props.score >=3 && this.props.score <=4? "Well Done ": "" }
            { this.props.score === 5 ? "Top Marks ": "" }
            {this.props.username}! </h3>
        <h4>Your final score is: {this.props.score} / 5 </h4>

        <button className="waves-effect waves-light btn btn-small orange" onClick={this.props.home}>Home<i className="material-icons right">home</i></button>
        <button className="waves-effect waves-light btn btn-small" onClick={this.props.playGame}>Play Again<i className="material-icons right">autorenew</i></button>
      </div>
      <div className="col s6">
        <h5>The Leaderboard </h5>
      
      </div>
      </div>
    );
  }
}

export default EndGame;