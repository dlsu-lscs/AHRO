import React from 'react';
var { Text, View, StyleSheet, Alert, Image, ImageBackground, TouchableOpacity, Keyboard } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"

import { actions as homeauth } from "../../index";
const { updatePoints } = homeauth;
import { Ionicons } from '@expo/vector-icons';




class multipleChoice extends React.Component {
    constructor(props){
        super(props);

        Keyboard.dismiss();

        this.state = {answered: false, option: ""};
        this.onSubmit = this.onSubmit.bind(this);
        this.onPointSubmit = this.onPointSubmit.bind(this);
        this.changeOption = this.changeOption.bind(this);
    }

    onSubmit(answer){
        //yeahhh idk how to synchronoze this yet xd.. 
        //so people can press choices alot of times before it redirects
        if(!this.state.answered && answer != ""){
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
       
        //console.log("GG");
        //Actions.Main();
   }

    onPointSubmit(result, rewardKey, rewardPoints){
       Actions.ConfirmedScan({result: result, rewardKey: rewardKey, rewardPoints: rewardPoints});
    }
    changeOption(answer){
        if(this.state.option == answer){
            this.setState({option: ""});
        }
        else{
            this.setState({option: answer});
        }
    }
    render() {
        let thereward  = this.props.reward;
        const { state, goBack } = this.props.navigation;        // https://stackoverflow.com/questions/45489343/react-navigation-back-and-goback-not-working
        const params = state.params || {};  
        return (
            <ImageBackground 
                source = {require('../../../../assets/images/theme-bg.png')}
                style={styles.container}>
                {
                /*
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
                */
                }
                <View style = {styles.mainView}>
                    <View style={styles.topContainer}>
                        <TouchableOpacity hitSlop={{top: 20, bottom: 20, left: 40, right: 40}}
                            onPress={ () => {
                            goBack();
                        }}>
                            <Ionicons name="ios-arrow-back" size={24} color="#fff" /> 
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.topView}>
                        <Text style={styles.points}>{thereward.points} POINTS</Text>
                        <Text style = {styles.title}>{thereward.question}</Text>
                    </View>
                    <View style = {styles.midView}>
                        <View style = {styles.buttonContainer}>
                            <View style = {styles.buttonView}>
                                <TouchableOpacity style = {[
                                    styles.buttonStyle,
                                    styles.buttonTop,
                                    (this.state.option == "a") ? styles.selectedStyle: styles.optionStyle
                                    ]}
                                    onPress = {() => this.changeOption("a")}
                                    >
                                    <Text style={styles.letterChoice}>A</Text>
                                    <Text style = {styles.autoFit}>{thereward.a}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {styles.buttonView}>
                                <TouchableOpacity style = {[
                                        styles.buttonStyle,
                                        styles.buttonMid,
                                        (this.state.option == "b") ? styles.selectedStyle: styles.optionStyle
                                        ]}
                                        onPress = {() => this.changeOption("b")}
                                        >
                                    <Text style={styles.letterChoice}>B</Text>
                                    <Text style = {styles.autoFit} >{thereward.b}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {styles.buttonView}>
                                <TouchableOpacity style = {[
                                        styles.buttonStyle,
                                        styles.buttonMid,                                        
                                        (this.state.option == "c") ? styles.selectedStyle: styles.optionStyle
                                        ]}
                                        onPress = {() => this.changeOption("c")}
                                        >
                                    <Text style={styles.letterChoice}>C</Text>
                                    <Text style = {styles.autoFit}>{thereward.c}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {styles.buttonView}>
                                <TouchableOpacity style = {[
                                        styles.buttonStyle,
                                        styles.buttonBottom,                                        
                                        (this.state.option == "d") ? styles.selectedStyle: styles.optionStyle
                                        ]}
                                        onPress = {() => this.changeOption("d")}
                                        >
                                    <Text style={styles.letterChoice}>D</Text>                                    
                                    <Text style = {styles.autoFit}>{thereward.d}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style = {styles.botView}>
                                <Button 
                                    // onPress={() => this.onSubmit()}
                                    onPress = {()=> {this.onSubmit(this.state.option)}}                              
                                    title= {"SUBMIT"}
                                    // containerViewStyle={{ marginLeft: 0, marginRight: 0 }}                                    
                                    buttonStyle={[styles.submitBotton]}
                                    containerViewStyle={[styles.submitBotton]}
                                    borderRadius={4}/>
                                {/* <TouchableOpacity style = {styles.submitBotton}
                                    onPress = {()=> {this.onSubmit(this.state.option)}}>
                                    <Text>
                                        SUBMIT
                                    </Text>
                                </TouchableOpacity> */}
                                
                            </View>
                        </View>
                        
                    </View>
                    
                </View>
            </ImageBackground>
        );
    }
}
const mapStateToProps = state => {
  return { rewards: state.homeReducer.rewards, user: state.authReducer.user };

};
export default connect(mapStateToProps, { updatePoints })(multipleChoice);

