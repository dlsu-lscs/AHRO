import React from 'react';
var { Text, View, StyleSheet, Alert, Image, KeyboardAvoidingView, FlatList } = require('react-native');

import {Button, FormInput} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"

import { actions as homeauth } from "../../index";
import { FontAwesome } from "@expo/vector-icons"

class ConfirmedScan extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.result);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(){
        Actions.Main();
    }

    render() {

        return (
            <View style={styles.container}>
                <View style = {styles.IconView}>
                    <View style = {styles.IconImage}>
                        {
                        this.props.result == "win" ?
                        <FontAwesome name = "check-circle" size={220} color= "#00d080"  />:
                        this.props.result == "done" ?
                        <FontAwesome name = "check-circle" size={220} color= "#FFC800"  />:
                        <FontAwesome name = "error" size={220} color= "red" />
                        }
                    </View>
                </View>
                <View style = {styles.content}>
                    {this.props.result == "win" ?
                        <Text style = {[styles.generalText, styles.topText]}>QR Code Scanned Successfully </Text>:
                     this.props.result == "done" ?
                        <Text style = {[styles.generalText, styles.doneText]}>Points were already rewarded </Text>:
                        <Text style = {[styles.generalText, styles.errorText]}>There was a technical error </Text>

                    }
                    <Text style = {styles.generalText}>Code: {this.props.rewardKey}</Text>
                    <Text style = {[styles.generalText, styles.nextText]}>Points are automatically added </Text>
                    <Text style = {styles.generalText}> to the Score.</Text>

                    <Button
                        title = "BACK TO HOME"
                        buttonStyle = {styles.backButton}
                        borderRadius={4}
                        onPress={this.onSubmit}
                    />
                </View>
            </View>
        );
    }
}
export default (ConfirmedScan);

