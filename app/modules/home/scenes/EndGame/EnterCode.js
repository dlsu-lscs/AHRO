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


class EndGame extends React.Component {
    constructor(props){
        super(props);
        this.onPointSubmit = this.onPointSubmit.bind(this);
    }

    onPointSubmit(result, rewardKey){
       Actions.ConfirmedScan({result: result, rewardKey: rewardKey});
    }

    render() {

        return (
        //    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
           
            <ImageBackground 
                source = {require('../../../../assets/images/theme-bg.png')}
                style={styles.container}>

                <View style={styles.topContainer}>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={[styles.buttonContainer]}>
                        <View style={[styles.titleContainer]}>
                            <Text style={[styles.title]}>The game is over</Text>
                            <Text style={[styles.title]}>Thank you for participating!</Text>
                            <Text style={[styles.title]}>Winners would be announced at 8:40</Text>
                        </View>
                        
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
export default EndGame;

//lmao