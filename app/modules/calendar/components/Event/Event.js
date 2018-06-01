import React from 'react';

import {Text, View, TouchableOpacity, ActionSheetIOS, TouchableWithoutFeedback} from 'react-native';

import { Icon } from 'react-native-elements'
import moment from "moment";

import styles from "./styles"
import { connect } from "react-redux";

import { actions, theme } from "../../index"
import { Actions } from "react-native-router-flux";

const { deleteQuote, toggleLove } = actions;
const { normalize } = theme;

class Event extends React.Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        const { user, events, index } = this.props;
        const event = events[index];
        const { message, author, time, color, userId, date, name } = event;
        return (
            <TouchableWithoutFeedback style={styles.cardImage} onPress={() => Actions.viewEvent({event: event})}>

            <View style={[styles.container]}>
                <View style={[styles.wrapper, {backgroundColor: color, borderColor: color}]}>
                    <View style={[styles.quote]}>
                        <Text numberOfLines={1} style={[styles.text1]}>
                            {name}
                        </Text>
                        <Text numberOfLines={1} style={[styles.text]}>
                            {date}
                        </Text>
                    </View>
                </View>
            </View></TouchableWithoutFeedback>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        events: state.calendarReducer.events
    }
}

export default connect(mapStateToProps, {})(Event);