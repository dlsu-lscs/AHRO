import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity, Text } from 'react-native';
import {Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import styles from "./styles";

import { Ionicons } from '@expo/vector-icons';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {

        return (
            <View style={styles.bottomNav}>
                <View style={styles.navIconContainer}>
                    <TouchableOpacity style={styles.toIcon}  onPress={ () => {
                        Actions.Scanning();
                    }}>
                        <Ionicons name="ios-map-outline" size={36} color="#000" /> 
                        <Text style={styles.navIconLabel}>Map</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.navIconContainer}>
                    <TouchableOpacity style={styles.toIcon} onPress={ () => {
                        // goBack();
                    }}>
                        <Ionicons name="ios-notifications-outline" size={36} color="#000" /> 
                        <Text style={styles.navIconLabel}>Alerts</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.navIconContainer}>
                    <TouchableOpacity style={styles.toIcon} onPress={ () => {
                        // Actions.popTo("TeamProfile");
                        Actions.TeamProfile();
                    }}>
                        <Ionicons name="ios-people-outline" size={36} color="#000" /> 
                        <Text style={styles.navIconLabel}>Team</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.navIconContainer}>
                    <TouchableOpacity style={styles.toIcon} onPress={ () => {
                        // goBack();
                    }}>
                        <Ionicons name="ios-person-outline" size={36} color="#000" /> 
                        <Text style={styles.navIconLabel}>Profile</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.navIconContainer}>
                    <TouchableOpacity style={styles.toIcon} onPress={ () => {
                        // goBack();
                    }}>
                        <Ionicons name="ios-calendar-outline" size={36} color="#000" /> 
                        <Text style={styles.navIconLabel}>Events</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

NavigationBar.propTypes = {

}

NavigationBar.defaultProps = {

}

export default NavigationBar;