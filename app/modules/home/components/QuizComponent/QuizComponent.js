import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { View, Text, TouchableOpacity } from 'react-native';
import {Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import styles from "./styles";
import {connect} from 'react-redux';
import {getTimeInterval} from '../../actions';
import * as t from '../../actionTypes';
class QuizComponent extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.syncTime = this.syncTime.bind(this);
        var nextQuiz = this.props.quiz;
        this.state = {
            quiz: nextQuiz,
            canAnswer: false, //is within timerange
            playerAnswered: false, //ths user/team already answered
            hrs: "00",
            mins: "00",
            secs: "00",
        }
        
        this.timer = setInterval(() => {
            nextQuiz = this.props.quiz;
            getTimeInterval(nextQuiz,this.syncTime,props.offset,props.quizes);
        }, 1000);
        
    }
    syncTime(hrs,mins,secs,canAnswer, playerAnswered){
       try{
            this.setState({canAnswer: canAnswer});
            if(canAnswer){
                this.setState({hrs:hrs,mins:mins,secs:secs, playerAnswered: playerAnswered});
            }
            return true;
        }
        catch(error){

        }
    }
    componentWillUnmount(){
        if(this.timer != null){
            clearInterval(this.timer);
        }
    }
    onSubmit(){
        if(this.props.quiz && this.props.quizes[this.props.quiz.key] != null && this.props.quizes[this.props.quiz.key].answred == null){
            if(this.props.quiz.type === t.POINT_MULTIPLECHOICE){
                Actions.multipleChoice({reward: this.props.quiz, rewardkey: this.props.quiz.key, rewardType: t.SUBMIT_QUIZ});
            }
            else if(this.props.quiz.type === t.POINT_IDENTIFICATION){
                Actions.Identification({reward: this.props.quiz, rewardkey: this.props.key, rewardType: t.SUBMIT_QUIZ});
            }
            else{
                const newReward = {key: this.props.quiz.key, points: this.props.quiz.points, rewardType: t.SUBMIT_QUIZ};
                this.props.updatePoints( newReward , this.onPointSubmit);
            }
        }
    }

    render() {
        const { user } = this.props;

        return (
            <View style = {styles.container}>
                {this.state.canAnswer ? 
                    <Text style = {styles.labelText}>ANSWER BEFORE IT EXPIRES IN:</Text>:
                    <Text style = {styles.labelText}>Stay tuned for the next quiz</Text>
                }
                {this.state.canAnswer ?
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
                        {this.state.playerAnswered ?
                            (<TouchableOpacity style = {styles.buttonQuiz} onPress = {this.onSubmit}>
                                    <Text style = {styles.quizText}>TAKE THE QUIZ</Text>
                            </TouchableOpacity>):
                            (<TouchableOpacity style = {styles.disabledQuiz} disabled = {true} activeOpacity = { .5 } >
                                    <Text style = {styles.quizText}>ALREADY ANSWERED</Text>
                            </TouchableOpacity>)
                        }
                    </View>
                    
                </View>:
                <View>
                    
                </View>
                }
                <View style={styles.codeContainer}>
                    <TouchableOpacity style={styles.buttonQuiz}onPress={() => { Actions.EnterCode(); }}>
                        <Text style={styles.quizText}>ENTER A CODE</Text>
                    </TouchableOpacity>
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
    return { offset: state.homeReducer.offset, quiz: state.homeReducer.currQuiz, quizes: state.homeReducer.quizes };
  
};
export default connect(mapStateToProps, null)(QuizComponent);