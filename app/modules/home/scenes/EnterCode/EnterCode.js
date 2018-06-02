import React from 'react';
var { Text, View, StyleSheet, Alert, Image, KeyboardAvoidingView, ImageBackground } = require('react-native');

import {Button, FormInput} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"

import { actions as homeauth } from "../../index";
const { updatePoints } = homeauth;

import * as t from "../../actionTypes";


class EnterCode extends React.Component {
    constructor(props){
        super(props);
        this.state = {answered: false, text: ""};
        this.onSubmit = this.onSubmit.bind(this);
        this.onPointSubmit = this.onPointSubmit.bind(this);
    }

    onSubmit(){
        const answer = this.state.text;
        
        this.setState({answered: true});
        var newReward = {};
        if(this.props.codes[answer] != null){
            var rkey = this.props.codes[answer].rewardid;
            if(rkey != null && this.props.rewards[rkey] != null){
                var lereward = this.props.rewards[rkey];
                if((this.props.rewards.answered == null || this.props.rewards.answered[rkey]) == null){
                    if(lereward.type === t.POINT_MULTIPLECHOICE){
                        Actions.multipleChoice({reward: lereward, rewardkey: rkey, rewardType: t.SUBMIT_REWARD});
                    }
                    else if(lereward.type === t.POINT_IDENTIFICATION ){
                        Actions.Identification({reward: lereward, rewardkey: rkey, rewardType: t.SUBMIT_REWARD});
                    }
                    else{
                        const newReward = {key: rkey, points: lereward.points, rewardType: t.SUBMIT_REWARD};
                        this.props.updatePoints( newReward , this.onPointSubmit);
                    }
                }
                else{
                    console.log("ANSWERED")
                    //already answered
                }
            }
            else{
                console.log(rkey);
            }
        }
        else{
            console.log("NOPE doesnt exist lol")
            //no code found
        }

   }

    onPointSubmit(result, rewardKey){
       Actions.ConfirmedScan({result: result, rewardKey: rewardKey});
    }

    render() {
        let thereward  = this.props.reward;

        return (
           <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            
            <ImageBackground 
                source = {require('../../../../assets/images/theme-bg.png')}
                style={styles.container}>
                <View style = {styles.topview}>
                    <Text style={styles.title}>Enter Hidden Code:</Text>
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

            </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}
const mapStateToProps = state => {
return { rewards: state.homeReducer.rewards, codes: state.homeReducer.codes};

};
export default connect(mapStateToProps, { updatePoints })(EnterCode);

//lmao