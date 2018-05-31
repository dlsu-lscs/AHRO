import React, {Component} from 'react';
import {View, Text, ImageBackground, FlatList, ActivityIndicator} from 'react-native';
import {connect} from "react-redux";

import styles from "./styles"
import Tweet from "../../components/Tweet"
import {actions as notifications} from "../../index"

const {getTweets} = notifications;

import {Permissions, Notifications} from 'expo';


//REMOVE THIS. REFACTOR!
import {auth, database, provider} from "../../../../config/firebase";

class Notifications1 extends Component {


    constructor() {
        super();
        this.state = {}

        this.renderItem = this.renderItem.bind(this);
        console.log("hallo from Calendar.js constructor");
    }

    componentDidMount() {
        console.log("Notifications.js componentDidMount GONNA REGISTER!!!!\n\n\n\n")
        this.registerForPushNotificationsAsync();
        var that = this;

        auth.signInWithEmailAndPassword("allyza.acuna@gmail.com", "allyza.acuna@gmail.com");
        this.props.getTweets((error) => alert(error.message))
    }

    async registerForPushNotificationsAsync(user) {
        const {status: existingStatus} = await
            Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const {status} = await
                Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }

        // Get the token that uniquely identifies this device
        let token = await
            Notifications.getExpoPushTokenAsync();

        var updates = {}
        updates["/expoToken"] = token;
        database.ref("users").child(auth.currentUser.uid).update(updates);

        console.log(token);
    }

    renderItem({item, index}) {
        return <Tweet index={index}/>
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator animating={true}/>
                </View>
            )
        } else {
            return (


                <ImageBackground style={styles.container}
                                 source={require("../../../../assets/images/theme-bg.png")}>

                    <FlatList
                        ref='listRef'
                        data={this.props.tweets}
                        renderItem={this.renderItem}
                        initialNumToRender={5}
                        keyExtractor={(item, index) => index.toString()}/>
                </ImageBackground>

            );
        }
    }
}
;

function

mapStateToProps(state, props) {
    return {
        isLoading: state.notificationsReducer.isLoading,
        tweets: state.notificationsReducer.tweets
    }
}

export default connect(mapStateToProps, {getTweets})(Notifications1);