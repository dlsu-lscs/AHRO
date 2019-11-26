import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList,
    ActivityIndicator,
    Animated,
    Button,
    Image,
    TouchableOpacity, ScrollView
} from 'react-native';
import {connect} from "react-redux";

import styles from "./styles"

import {Actions} from "react-native-router-flux";

var {Dimensions} = require('react-native')

const {width, height} = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class ViewNotif extends Component {


    constructor() {
        super();
    }

    componentDidMount() {
        console.log("view notif!!!!\n\n\n\n")
    }

    renderFormButton(){
        return(<View>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => Actions.viewEvent({event: event})}
            >
                <Text style={styles.closeText}>REGISTER NOW!!!</Text>
            </TouchableOpacity>
        </View>);
    }



    render() {
        const {picture_url, name, description, date, form} = this.props.notif;
        console.log(form)
        return (
            <View style={{flex:1}}>
                <ScrollView>
                    <Image
                        source={{uri: picture_url}}
                        style={styles.image}
                        resizeMode="cover"
                    />

                    <View style={styles.body}>
                        <Text style={styles.title}>
                            {name}
                        </Text>
                        <Text style={styles.description}>
                            {description}
                        </Text>

                        {/*{form && this.renderFormButton({event:this.props.event})}*/}

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => Actions.pop()}
                        >
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView></View>
        );
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

export default connect(mapStateToProps, {})(ViewNotif);


//notifs should view the "register" is ever
//notifs should display the image
// notifs should be handled. Actions.key(). switch used
// |--> get type and switch
// bonus: notif should display all images

/*
notifs handling
team invitation

public event reminder
private event reminder





 */