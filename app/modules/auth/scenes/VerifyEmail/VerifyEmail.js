import React from 'react';
// var { View, StyleSheet, Alert } = require('react-native');
import {Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';

import {Button} from 'react-native-elements';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import styles from "../Welcome/styles"


import { actions as auth, theme } from "../../index";

const { signOut , checkVerify} = auth;

const { color } = theme;

class VerifyEmail extends React.Component{
	constructor(){
        super();
        this.state = { }
        this.onSignOut = this.onSignOut.bind(this);
    }

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        Actions.reset("Auth")
    }
    /*
    onVerify() {
    	const {user} = this.props;
    	this.props.checkVerify(user,this.userIsVerified.bind(this), this.userNotVerified.bind(this))
    }

    userIsVerified(user){
    	Actions.CompleteProfile({user})
    }
    userNotVerified(user){
    	Actions.CompleteProfile({user})
    }
    */

    onError(error) {
        Alert.alert('Oops!', error.message);
    }
    

    render() {
        return (
            <ImageBackground 
                source = {require('../../../../assets/images/theme-bg.png')}
                style = {{width: "100%", height: "100%", flex: 1, justifyContent: "center", alignItems: "center", }}>
                <View style={styles.completeProfileContainer}>
                    <View style={[styles.buttonContainer]}>
                        <View style={[styles.titleContainer]}>
                            <Text style={[styles.subTitle]}>Please check your email to proceed to the next step of the registration process.</Text>
                            <TouchableOpacity onPress={this.onSignOut}>
                                <Text style={[styles.toContinue]}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.bottom}>

                    </View>
                </View>
            </ImageBackground>
            // <View style={styles.container}>
            	
                
            //     <Button
            //         raised
            //         borderRadius={4}
            //         title={'Please verify your account'}
            //         containerViewStyle={[styles.containerView]}
            //         buttonStyle={[styles.button]}
            //         textStyle={styles.buttonText}
            //         onPress={this.onSignOut}/>
                
            // </View>
        );
    }
}

export default connect(null, {signOut, checkVerify})(VerifyEmail);