import React from 'react';
var { Text, View, StyleSheet, Alert, Image, KeyboardAvoidingView } = require('react-native');

import {Button, FormInput} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"

import { actions as homeauth } from "../../index";
const { updatePoints } = homeauth;



class Identification extends React.Component {
    constructor(props){
        super(props);
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
                newReward = {key: this.props.rewardkey, points: this.props.reward.points};
            }
            else{
                newReward = {key: this.props.rewardkey, points: 0};
            }
            this.props.updatePoints(newReward, this.onPointSubmit);
        }

   }

    onPointSubmit(result, rewardKey){
       Actions.ConfirmedScan({result: result, rewardKey: rewardKey});
    }

    render() {
        let thereward  = this.props.reward;

        return (
           <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={styles.container}>
                <View style = {styles.topview}>
                    <Text style={styles.title}>{thereward.question}</Text>
                </View>

                <View style = {styles.bottomview}>
                      {/*
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
                        */}
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
            </KeyboardAvoidingView>
        );
    }
}
const mapStateToProps = state => {
  return { rewards: state.homeReducer.rewards, user: state.authReducer.user };

};
export default connect(mapStateToProps, { updatePoints })(Identification);

