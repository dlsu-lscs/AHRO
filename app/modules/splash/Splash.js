import React from 'react';
import {View, Text, ActivityIndicator, Image, ImageBackground} from 'react-native';

import styles from './styles'

export default class extends React.Component {
    render() {
        return (
            <ImageBackground style={styles.container}
                             source={ require('../../assets/images/splash-screen.png') }
            >
                <View style={{flex:1}}>
                    <ActivityIndicator style={styles.activityIndicator}
                                       animating={true}
                                       size="large" color="#17cba6"/>
                </View>
            </ImageBackground>
        );
    }
}