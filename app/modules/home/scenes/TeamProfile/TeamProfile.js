import React from 'react';
var { View, TouchableOpacity, Text, StyleSheet, Alert, TouchableHighlight, ListView } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as home } from "../../index"
const { createTeam, getTeam } = home;

//Components
import ScanQR from "../../components/ScanQR"
import NavigationBar from '../../components/NavigationBar/NavigationBar';

class TeamProfile extends React.Component {
    constructor(){
        super();

        let ds = new ListView.DataSource({ rowHasChanged:(r1, r2) => r1 != r2});
        this.state = {
            itemDataSource: ds
        }

        this.renderRow = this.renderRow.bind(this);
        this.pressRow = this.pressRow.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    componentWillMount() {
        this.getItems();
    }

    componentDidMount() {
        this.getItems();
    }

    getItems(){
        let members = [{ username: 'rapM0N' }, { username: 'j-Hope' }, { username: 'suga' }, { username: 'JungKook' }, { username: 'Jimin' }, { username: 'jin_' }, { username: 'taeV' }];

        this.setState({
            itemDataSource: this.state.itemDataSource.cloneWithRows(members)
        });
    }

    pressRow(item){
        console.log(item);
        this.props.getTeam(null, this.onSuccess, this.onError)
    }

    renderRow(item){
        return (
            <TouchableHighlight onPress={() => {
                this.pressRow(item);
            }}>
                <View style={styles.list}>
                    <Text style={styles.listText}>{item.username}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    onSuccess(user) {
        console.log("@TeamProfile.js : Success");
    }
    
    onError(error) {
        console.log("@TeamProfile.js : Error");
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.topContent}>
                        <Text style={styles.title}>My Team Profile</Text>
                        <ScanQR />
                    </View>
                    <ListView
                        dataSource={this.state.itemDataSource}
                        renderRow={this.renderRow}
                    />
                </View>
                <NavigationBar />
            </View>
        );
    }
}
export default connect(null, { createTeam, getTeam })(TeamProfile);
