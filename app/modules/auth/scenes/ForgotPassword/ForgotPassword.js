import React from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { actions as auth } from "../../index"
import { Button, Divider } from 'react-native-elements';
import { LinearGradient } from 'expo';
import {Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from "../Welcome/styles"

const { resetPassword } = auth;

import Form from "../../components/Form"

const fields = [
    {
        key:'email',
        label: "Email Address",
        placeholder:"Email",
        autoFocus:false,
        secureTextEntry:false,
        value: "",
        type: "email"
    }
];

const error = {
    general: "",
    email: ""
}

class ForgotPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    static navigationOptions = {
        header: null
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages

        this.props.resetPassword(data, this.onSuccess, this.onError)
    }

    onSuccess() {
        alert("Password Reminder Sent")
        Actions.pop();
    }

    onError(error) {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }
        
        this.setState({error: errObj});
    }
    
    render() {
        const { state, goBack } = this.props.navigation;        // https://stackoverflow.com/questions/45489343/react-navigation-back-and-goback-not-working
        const params = state.params || {};  

        return (
            // <Form fields={fields}
            //         onSubmit={this.onSubmit}
            //         buttonTitle={"SUBMIT"}
            //         error={this.state.error}/>
            <ImageBackground 
                source={ require('../../../../assets/images/theme-bg.png')}
                style={styles.container}>
                
            {/* // <ImageBackground 
            //     source={ require('../../../../assets/images/compass.jpg')}
            //     style={styles.container}
            //     blurRadius={1}> */}
                {/* <LinearGradient
                    colors={['rgba(21,87,153,0.7)', 'rgba(21,153,87,0.7)']} 
                    style={styles.linearGradient}> */}

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
                                <Text style={[styles.subTitle]}>Please enter your email to receive instructions for resetting your password.</Text>
                            </View>
                            <Form fields={fields}
                                onSubmit={this.onSubmit}
                                buttonTitle={"SUBMIT"}
                                error={this.state.error}/>
                            {/* <Button
                                raised
                                borderRadius={4}
                                title={'SIGN UP WITH E-MAIL'}
                                containerViewStyle={[styles.containerView]}
                                buttonStyle={[styles.button]}
                                textStyle={styles.buttonText}
                                onPress={Actions.Register}/> */}
                        </View>
                        <View style={styles.bottom}>
                            {/* <TouchableOpacity onPress={Actions.Login}>
                                <Text style={styles.bottomText}>
                                    Already have an account?
                                </Text>
                                <Text style={styles.signInText}>
                                    Sign in
                                </Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                {/* </LinearGradient> */}
            </ImageBackground>
        );
    }
}

export default connect(null, { resetPassword })(ForgotPassword);