import React from 'react';
var { View, StyleSheet, Alert, Text } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;
import {actions as homeauth} from "../../index"
const { color } = theme;

//Components
import ScanQR from "../../components/ScanQR"

class Home extends React.Component {
    constructor(props){
        super(props);
        this.onSignOut = this.onSignOut.bind(this);
        this.onLeaderboard = this.onLeaderboard.bind(this);
    }

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        Actions.reset("Auth")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }
    onLeaderboard(){
        Actions.Leaderboard();
    }

    render() {
        return (
            <View style={styles.container}>
                <ScanQR />
                <Button
                    raised
                    borderRadius={4}
                    title={'LOG OUT'}
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.button]}
                    textStyle={styles.buttonText}
                    onPress={this.onSignOut}/>
                <Button
                    raised
                    borderRadius={4}
                    title={'Leaderboard'}
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.button]}
                    textStyle={styles.buttonText}
                    onPress={this.onLeaderboard}/>
            </View>
        );
    }
}
/*
const mapStateToProps = state => {
  return { count: state.homeReducer.count };
};
*/
export default connect(null, { signOut })(Home);