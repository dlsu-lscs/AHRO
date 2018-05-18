import React from 'react';

import {Actions} from 'react-native-router-flux';

import {Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { LinearGradient } from 'expo';
import {connect} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import {actions as auth} from "../../index"

import Form from "../../components/Form"

const {login} = auth;
import styles from "../Welcome/styles"

const fields = [
    {
        key: 'email',
        label: "Email Address",
        placeholder: "Email Address",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "email"
    },
    {
        key: 'password',
        label: "Password",
        placeholder: "Password",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        type: "password"
    }
];

const error = {
    general: "",
    email: "",
    password: ""
}

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.needVerify = this.needVerify.bind(this);
    }

    static navigationOptions = {
        header: null
    }

    onForgotPassword() {
        Actions.ForgotPassword()
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages

        this.props.login(data, this.onSuccess, this.onError, this.needVerify)
    }

    onSuccess({exists, user}) {
        if (exists) Actions.Main()
        else Actions.CompleteProfile({user})
    }
    needVerify(user){
        Actions.VerifyEmail({user});
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
            //       showLabel={false}
            //       onSubmit={this.onSubmit}
            //       buttonTitle={"LOG IN"}
            //       error={this.state.error}
            //       onForgotPassword={this.onForgotPassword}/>
            <ImageBackground 
                source={ require('../../../../assets/images/compass.jpg')}
                style={styles.container}
                blurRadius={1}>
                <LinearGradient
                    colors={['rgba(21,87,153,0.7)', 'rgba(21,153,87,0.7)']} 
                    style={styles.linearGradient}>

                    <View style={styles.topContainer}>
                        <TouchableOpacity onPress={ () => {
                            goBack();
                        }}>
                            <Ionicons name="ios-arrow-back" size={24} color="#fff" /> 
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomContainer}>
                        <View style={[styles.buttonContainer]}>
                            <View style={[styles.titleContainer]}>
                                <Text style={[styles.title]}>Login</Text>
                            </View>
                            <Form fields={fields}
                                showLabel={false}
                                onSubmit={this.onSubmit}
                                buttonTitle={"LOG IN"}
                                error={this.state.error}
                                onForgotPassword={this.onForgotPassword}/>
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
                </LinearGradient>
            </ImageBackground>
        );
    }
}

export default connect(null, {login})(Login);