import React, {Component} from 'react';
import { View, StyleSheet, Text } from 'react-native';




class Calendar extends Component {

    render(){
        return (
            <View style={styles.container}>
                <Text style = {styles.welcome}>
                    Calendar
                </Text>
            </View>
        )}
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255,255,255)'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'black'
    }
})

export default Calendar