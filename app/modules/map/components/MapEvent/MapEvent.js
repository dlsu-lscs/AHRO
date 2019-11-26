import React from 'react';

import {Text, View, StyleSheet, Image, LayoutAnimation, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

import {Icon, Title} from 'react-native-elements'
import moment from "moment";

import styles from "./styles"
import {connect} from "react-redux";

import {actions, theme} from "../../index"
import {Actions} from "react-native-router-flux";


const {deleteQuote, toggleLove} = actions;
const {normalize} = theme;

var { Dimensions } = require('react-native')

class MapEvent extends React.Component {
    constructor() {
        super();
        this.state = {};
    }


    render() {
        const {user, events, index} = this.props;
        const event = events[index];
        //console.log(event)
        const {description, color, name,form, picture_url} = event;
        return (

            <View style={styles.card} key={index}>
                <TouchableWithoutFeedback style={styles.cardImage} onPress={() => Actions.viewEvent({event: event})}>
                    <Image
                        source={{uri: event.picture_url}}
                        style={styles.cardImage}
                        resizeMode="cover"

                    /></TouchableWithoutFeedback>

                <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardtitle}>{event.name}</Text>
                    <Text numberOfLines={1} style={styles.cardDescription}>
                        {event.date}
                    </Text>
                </View>
            </View>
        );

    }
}



MapEvent.defaultProps = {
    index: 0,
    onPress: () => {}
};

function mapStateToProps(state, props) {
    return {
        events: state.mapReducer.events
    }
}

export default connect(mapStateToProps, {deleteQuote, toggleLove})(MapEvent);