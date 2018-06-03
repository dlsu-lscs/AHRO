import React from 'react';
import {Text, View, TouchableOpacity, Image, ImageBackground, KeyboardAvoidingView, ScrollView} from 'react-native';

import {Button, Divider} from 'react-native-elements';
import { LinearGradient } from 'expo';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {actions as auth} from "../../index"
import Form from "../../components/Form"

// const {} = auth;

import styles from "./styles"

const { register } = auth;

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
    },
    {
        key: 'confirm_password',
        label: "Confirm Password",
        placeholder: "Confirm Password",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        type: "confirm_password"
    }
];

const error = {
    general: "",
    email: "",
    password: "",
    confirm_password: ""
}

class Welcome extends React.Component {
    constructor() {
        // super();
        // this.state = {}
        super();
        this.state = {
            error: error
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages

        this.props.register(data, this.onSuccess, this.onError)
    }

    onSuccess(user) {
        Actions.VerifyEmail({user});
        //Actions.CompleteProfile({ user })
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
        return (
            <ImageBackground 
                source={ require('../../../../assets/images/theme-bg.png')}
                style={styles.container}>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                
                {/* <LinearGradient
                    colors={['rgba(21,87,153,0.7)', 'rgba(21,153,87,0.7)']} 
                    style={styles.linearGradient}> */}
                    <View style={{flexDirection:'row', justifyContent:"center"}}>

                        <View style={styles.logoContainerLeft}>
                            <Image
                                source={ require('../../../../assets/images/ahro-logo-white.png') }
                                style={styles.logo} />
                    </View>
                        <View style = {styles.logoContainerRight}>
                        <Image style={styles.logoRight}
                            source={ require('../../../../assets/images/usg-wlogo.png') }
                        />
                        <Image style={{width: 55,
                            height: 55,
                            resizeMode: "contain"}}
                            source={ require('../../../../assets/images/lscs-wlogo.png') }
                        /></View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={[styles.buttonContainer]}>

                            <View style={[styles.titleContainer]}>
                                <Text style={[styles.title]}>University Vision-Mission Week 2018</Text>
                                <Text style={[styles.subTitle]}>AHRO: Aim high, reach out</Text>
                            </View>
                            <Form fields={fields}
                                showLabel={false}
                                onSubmit={this.onSubmit}
                                buttonTitle={"SIGN ME UP!"}
                                error={this.state.error}/>
                        </View>
                        <View style={styles.bottom}>
                            <TouchableOpacity onPress={Actions.Login}>
                                <Text style={styles.bottomText}>
                                    Already have an account?
                                </Text>
                                {/* <Text style={styles.signInText}>
                                    Sign in
                                </Text> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                {/* </LinearGradient> */}
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}


export default connect(null, { register })(Welcome);