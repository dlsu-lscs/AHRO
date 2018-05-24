import React from 'react';
var { Text, View, StyleSheet, Alert, Image, KeyboardAvoidingView, FlatList } = require('react-native');

import {Button, FormInput} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"

import { actions as homeauth } from "../../index";


class Leaderboard extends React.Component {
    constructor(props){
        super(props);
    }

    render() {

        return (
            <View style={styles.container}>
                <View style = {styles.topNav}>
                    <Text>Leaderboard</Text>
                    <View style = {styles.filterView}>
                        <Button> Individual </Button>
                        <Button> Teams </Button>
                    </View>
                </View>

                <View style = {styles.Board} >
                    <FlatList
                        data={
                            yes:{
                                key: 1,
                                name: "something",
                            }
                        }
                        renderItem = {({item}) => 
                            <TeamCard />
                        }

                    />
                </View>
            </View>
        );
    }
}
export default (Leaderboard);

