import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles'

export default class extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    {/* <Image style={styles.image} source={{uri: ""}}/> */}
                    <Image 
                            source={ require('../../assets/images/ahro-logo.png') }
                            style={styles.logo} />
                    {/* <Text style={styles.title}>Quotes</Text> */}
                </View>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        );
    }
}