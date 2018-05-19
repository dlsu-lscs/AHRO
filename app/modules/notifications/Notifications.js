import React, {Component} from 'react';
import { View, StyleSheet, Text } from 'react-native';




class Notifications extends Component {

    render(){
        return (
            <View style={styles.container}>
                <Text style = {styles.welcome}>
                    Notifications
                </Text>
            </View>
        )}
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'black'
    }
})

export default Notifications