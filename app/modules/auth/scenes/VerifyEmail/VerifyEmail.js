import React from 'react';
var { View, StyleSheet, Alert } = require('react-native');

import {Button} from 'react-native-elements';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';



import styles from "./styles"

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
            <View style={styles.container}>
            	
                
                <Button
                    raised
                    borderRadius={4}
                    title={'Please verify your account'}
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.button]}
                    textStyle={styles.buttonText}
                    onPress={this.onSignOut}/>
                
            </View>
        );
    }
}

export default connect(null, {signOut, checkVerify})(VerifyEmail);