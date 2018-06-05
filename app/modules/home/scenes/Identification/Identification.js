import React from 'react';
var { Text, View, StyleSheet, Alert, Image, KeyboardAvoidingView, ImageBackground, TouchableOpacity, Keyboard } = require('react-native');

import {Button, FormInput} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"

import { actions as homeauth } from "../../index";
const { updatePoints } = homeauth;
import { Ionicons } from '@expo/vector-icons';




class Identification extends React.Component {
    constructor(props){
        super(props);

        Keyboard.dismiss();

        this.state = {answered: false, text: ""};
        this.onSubmit = this.onSubmit.bind(this);
        this.onPointSubmit = this.onPointSubmit.bind(this);
    }

    onSubmit(){
        //yeahhh idk how to synchronoze this yet xd.. 
        //so people can press choices alot of times before it redirects
        const answer = this.state.text;
        
        if(!this.state.answered){
            this.setState({answered: true});
            var newReward = {};
            if(answer == this.props.reward.answer){
                newReward = {key: this.props.rewardkey, points: this.props.reward.points, rewardType: this.props.rewardType};
            }
            else{
                newReward = {key: this.props.rewardkey, points: 0, rewardType: this.props.rewardType, fail: true};
            }
            this.props.updatePoints(newReward, this.onPointSubmit);
        }

   }

    onPointSubmit(result, rewardKey, rewardPoints){
       //Actions.replace({sceneKey: "ConfirmedScan", props: {result: result, rewardKey: rewardKey, rewardPoints: rewardPoints}})
       Actions.ConfirmedScan({result: result, rewardKey: rewardKey, rewardPoints: rewardPoints});
    }

    render() {
        const { state, goBack } = this.props.navigation;        // https://stackoverflow.com/questions/45489343/react-navigation-back-and-goback-not-working
        const params = state.params || {};  
        let thereward  = this.props.reward;

        return (
           <KeyboardAvoidingView style={styles.kav} behavior="padding" enabled>
            <ImageBackground 
                source = {require('../../../../assets/images/theme-bg.png')}
                style={styles.container}>
                <View style={styles.topContainer}>
                    <TouchableOpacity hitSlop={{top: 20, bottom: 20, left: 40, right: 40}}
                        onPress={ () => {
                        goBack();
                    }}>
                        <Ionicons name="ios-arrow-back" size={24} color="#fff" /> 
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <View style = {styles.topview}>
                        <Text style={styles.points}>{thereward.points} POINTS</Text>                    
                        <Text style={styles.title}>{thereward.question}</Text>
                    </View>

                    <View style = {styles.bottomview}>
                            <View style = {styles.submitbutton}>
                                <FormInput
                                    autoCapitalize='none'
                                    clearButtonMode='while-editing'
                                    underlineColorAndroid={"#fff"}
                                    placeholder={""}
                                    autoFocus={true}
                                    onChangeText={(text) => this.setState({text})}
                                    secureTextEntry={false}
                                    inputStyle={[styles.inputstyle]}

                                    value={this.state.text}
                                />
                            </View> 
                            <View style = {styles.submitbutton}>
                                <Button 
                                    onPress={() => this.onSubmit()}
                                    title= {"SUBMIT"}
                                    buttonStyle={[styles.submitbutton2]}
                                    borderRadius={4}
                                />
                            </View> 
                    </View>
                </View>

            </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}
const mapStateToProps = state => {
  return { rewards: state.homeReducer.rewards, user: state.authReducer.user };

};
export default connect(mapStateToProps, { updatePoints })(Identification);

