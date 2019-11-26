import React from 'react';
var { Text, View, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView, ImageBackground } = require('react-native');

import {Button, FormInput} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

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
        const { state, goBack } = this.props.navigation;        // https://stackoverflow.com/questions/45489343/react-navigation-back-and-goback-not-working
        const params = state.params || {};  
        let thereward  = this.props.reward;

        return (
        //    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
           
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

                <View style={styles.bottomContainer}>
                    <View style={[styles.buttonContainer]}>
                        <View style={[styles.titleContainer]}>
                            <Text style={[styles.title]}>Enter hidden code:</Text>
                        </View>
                        <FormInput
                            autoCapitalize='none'
                            clearButtonMode='while-editing'
                            // underlineColorAndroid={"#fff"}
                            underlineColorAndroid={"#ffffff00"}
                            placeholder={"Hidden Code"}
                            // autoFocus={true}
                            onChangeText={(text) => this.setState({text})}
                            secureTextEntry={false}
                            inputStyle={[styles.inputContainer]}

                            value={this.state.text}
                        />
                        <Button 
                            onPress={() => this.onSubmit()}
                            title= {"SUBMIT"}
                            buttonStyle={[styles.submitbutton2]}
                            borderRadius={4}
                        />
                    </View>
                    <View style={styles.bottom}>
                    {/* test multiple choice */}
                        {/* <TouchableOpacity onPress={ () => {
                            var mc = {
                                a: "College of Business",
                                answer: "c",
                                b: "College of Liberal Arts",
                                c: "College of Computer Science",
                                d: "Gokongwei College of Engineering",
                                points: 100,
                                question: "Which college is NOT part of De La Salle University?",
                                type: "multiplechoice",
                            };
                            Actions.multipleChoice({reward: mc, rewardkey: 'kekekkeke', rewardType: t.SUBMIT_REWARD});
                        }
                        }>
                            <Text style={styles.signInText}>
                                Test multiple choice
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                </View>

                {/* <View style={styles.bottomContainer}> */}
                {/* <KeyboardAvoidingView style={styles.container} behavior="padding" enabled> */}
                    {/* <View style = {styles.topview}>
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
                    </View> */}
                    
                {/* </KeyboardAvoidingView> */}
                {/* </View> */}

            </ImageBackground>
        );
    }
}
const mapStateToProps = state => {
return { rewards: state.homeReducer.rewards, codes: state.homeReducer.codes};

};
export default connect(mapStateToProps, { updatePoints })(EnterCode);

//lmao