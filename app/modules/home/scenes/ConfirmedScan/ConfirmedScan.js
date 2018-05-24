import React from 'react';
var { Text, View, StyleSheet, Alert, Image, KeyboardAvoidingView, FlatList } = require('react-native');

import {Button, FormInput} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"

import { actions as homeauth } from "../../index";


class ConfirmedScan extends React.Component {
    constructor(props){
        super(props);
    }

    render() {

        return (
            <View style={styles.container}>
                <View style = {styles.IconView}>
                    <View style = {styles.IconImage}>
                    </View>
                </View>
                <View style = {styles.content}>
                    <Text style = {[styles.generalText, styles.topText]}>QR Code Scanned Successfully </Text>
                    <Text style = {styles.generalText}>Code: </Text>
                    <Text style = {[styles.generalText, styles.nextText]}>Points are automatically added </Text>
                    <Text style = {styles.generalText}> to the Score.</Text>

                    <Button
                        title = "BACK TO HOME"
                        buttonStyle = {styles.backButton}
                        borderRadius={4}
                    />
                </View>
            </View>
        );
    }
}
export default (ConfirmedScan);

