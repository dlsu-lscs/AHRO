import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { View, Text, TouchableOpacity } from 'react-native';
import {Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import styles from "./styles";
import {connect} from 'react-redux';
class QuizComponent extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        var nextQuiz = props.quiz;
        this.state = {
            quiz: nextQuiz,
            canAnswer: false,
            hrs: "00",
            mins: "00",
            secs: "00",
        }
        
        setInterval(() => {
            nowTime = Math.floor(Date.now()/1000)+28800+props.offset;
            timeLeft = nextQuiz.timeend - nowTime;
            hoursLeft = Math.floor(timeLeft/3600); //divide per hour (60secs * 60 mins)
            minsLeft = Math.floor((timeLeft - hoursLeft*3600)/60); //divide per seconds
            secsLeft = (timeLeft - hoursLeft*3600 - minsLeft*60); 
            if(hoursLeft <= 9) hoursLeft = "0"+hoursLeft;
            if(minsLeft <= 9) minsLeft = "0"+minsLeft;
            if(secsLeft <= 9) secsLeft = "0"+secsLeft;
            this.setState({hrs: hoursLeft, mins: minsLeft, secs: secsLeft});
        }, 1000);
        this.setState({canAnswer: true});
    }
    onSubmit(){
        Actions.Leaderboard();
    }
    render() {
        const { user } = this.props;

        return (
            <View style = {styles.container}>
                <Text style = {styles.labelText}>ANSWER BEFORE IT EXPIRES IN:</Text>
                <View style = {styles.bottom}>
                    <View style = {styles.timerComponent}>
                        <View style = {styles.timerContainer}>
                            <Text style = {styles.timeNumber}>{this.state.hrs}</Text>
                            <Text style = {styles.timeLabel}>hrs</Text>
                        </View>
                        <View style = {styles.timerContainer}>
                            <Text style = {styles.timeNumber}>:</Text>
                            <Text style = {styles.timeLabel}> </Text>
                        </View>
                        <View style = {styles.timerContainer}>
                            <Text style = {styles.timeNumber}>{this.state.mins}</Text>
                            <Text style = {styles.timeLabel}>mins</Text>
                        </View>
                        <View style = {styles.timerContainer}>
                            <Text style = {styles.timeNumber}>:</Text>
                            <Text style = {styles.timeLabel}> </Text>
                        </View>
                        <View style = {styles.timerContainer}>
                            <Text style = {styles.timeNumber}>{this.state.secs}</Text>
                            <Text style = {styles.timeLabel}>sec</Text>
                        </View>
                    </View>
                    <View style = {styles.buttonComponent}>
                        <TouchableOpacity style = {styles.buttonQuiz}>
                                <Text style = {styles.quizText}>TAKE THE QUIZ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

QuizComponent.propTypes = {
/*
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    onChangeText: PropTypes.func.isRequired,
    secureTextEntry: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
*/
}

QuizComponent.defaultProps = {
/*
    autoFocus: false,
    secureTextEntry: false
*/
}
const mapStateToProps = state => {
    return { offset: state.homeReducer.offset, quiz: state.homeReducer.currQuiz };
  
};
export default connect(mapStateToProps, null)(QuizComponent);