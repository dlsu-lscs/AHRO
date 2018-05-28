import React from 'react';
var { Text, View, StyleSheet, Alert, Image } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"

import { actions as homeauth } from "../../index";
const { updatePoints } = homeauth;



class multipleChoice extends React.Component {
    constructor(props){
        super(props);
        this.state = {answered: false};
        this.onSubmit = this.onSubmit.bind(this);
        this.onPointSubmit = this.onPointSubmit.bind(this);
    }

    onSubmit(answer){
        //yeahhh idk how to synchronoze this yet xd.. 
        //so people can press choices alot of times before it redirects
        if(!this.state.answered){
            this.setState({answered: true});
            var newReward = {};
            if(answer == this.props.reward.answer){
                newReward = {key: this.props.rewardkey, points: this.props.reward.points, rewardType: this.props.rewardType};
            }
            else{
                newReward = {key: this.props.rewardkey, points: 0, rewardType: this.props.rewardType};
            }
            this.props.updatePoints(newReward, this.onPointSubmit);
        }
       
        //console.log("GG");
        //Actions.Main();
   }

    onPointSubmit(result, rewardKey){
       Actions.ConfirmedScan({result: result, rewardKey: rewardKey});
    }
    render() {
        let thereward  = this.props.reward;

        return (
            <View style={styles.container}>
                <View style = {styles.topview}>
                    <Text style={styles.title}>{thereward.question}</Text>
                </View>

                <View style = {styles.bottomview}>
                    <View style = {styles.leftview}>
                        <View style = {styles.somethingview}>
                        <Button 
                            onPress={() => this.onSubmit("a")}
                            title=  {thereward.a}
                            buttonStyle={[styles.choices]}
                            borderRadius={4}
                        />
                        </View>
                        <View style = {styles.somethingview}>
                        <Button 
                            onPress={() => this.onSubmit("b")}
                            title= {thereward.b}
                            buttonStyle={[styles.choices]}
                            borderRadius={4}
                        />
                        </View>
                    </View>

                    <View style = {styles.leftview}>
                        <View style = {styles.somethingview}>
                        <Button 
                            onPress={() => this.onSubmit("c")}
                            title= {thereward.c}
                            buttonStyle={[styles.choices]}
                            borderRadius={4}
                        />
                        </View>
                        <View style = {styles.somethingview}>
                        <Button 
                            onPress={() => this.onSubmit("d")}
                            title= {thereward.d}
                            buttonStyle={[styles.choices]}
                            borderRadius={4}
                        />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
  return { rewards: state.homeReducer.rewards, user: state.authReducer.user };

};
export default connect(mapStateToProps, { updatePoints })(multipleChoice);

