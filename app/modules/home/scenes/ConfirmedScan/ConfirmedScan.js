import React from 'react';
var { Text, View, StyleSheet, Alert, Image, KeyboardAvoidingView, FlatList } = require('react-native');

import {Button, FormInput} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"

import { actions as homeauth } from "../../index";
import { FontAwesome, MaterialCommunityIcons, Entypo } from "@expo/vector-icons"
import { Ionicons } from '@expo/vector-icons';


import * as t from "../../actionTypes";
class ConfirmedScan extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.result);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(){
        Actions.Home();
    }

    render() {

        return (
            <View style={styles.container}>
                <View style = {styles.IconView}>
                    <View style = {styles.IconImage}>
                        {
                        this.props.result == t.WIN_TYPE ?
                        // <FontAwesome name = "check-circle" size={220} color= "#00d080"  />:
                        <Ionicons name="ios-checkmark-circle" size={220} color="#00d080" />:
                        
                        this.props.result == t.DONE_TYPE ?
                        // <FontAwesome name = "check-circle" size={220} color= "#FFC800"  />:
                        <Ionicons name="ios-checkmark-circle" size={220} color="#FFC800" />:
                        
                        this.props.result == t.LOSE_TYPE ?
                        // <Entypo name = "circle-with-cross" size = {220} color = "red" />:
                        <Ionicons name="ios-close-circle" size={220} color="red" />:
                        

                        //<FontAwesome name = "error" size={220} color= "red"  />:
                        // <MaterialCommunityIcons name = "emoticon-sad" size={220} color= "red" />
                        <Ionicons name="ios-sad-outline" size={220} color="red" />
                        
                        }
                    </View>
                </View>
                <View style = {styles.content}>
                    {this.props.result == t.WIN_TYPE ?
                        (
                        <View style = {styles.content}>
                        <Text style = {[styles.generalText, styles.topText, styles.winnerText]}> +{this.props.rewardPoints} Points</Text>
                        <Text style = {[styles.generalText, styles.topText, styles.confTop]}>Your account has been rewarded! </Text>
                        </View>
                        ):
                     this.props.result == t.DONE_TYPE  ?
                        <Text style = {[styles.generalText, styles.doneText]}>You have already finished this task </Text>:
                    this.props.result == t.LOSE_TYPE ?
                        <Text style = {[styles.generalText, styles.errorText]}> Dang! you submitted the wrong answer </Text>:
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

