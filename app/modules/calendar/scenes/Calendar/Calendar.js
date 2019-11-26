import React, {Component} from 'react';
import {View, ImageBackground, FlatList, ActivityIndicator, Text} from 'react-native';
import {connect} from "react-redux";

import styles from "./styles"
import Event from "../../components/Event"

import {actions as calendar} from "../../index"

const {getEvents} = calendar;


class Calendar extends Component {


    constructor() {
        super();
        this.state = {}

        this.renderItem = this.renderItem.bind(this);
        console.log("hallo from Calendar.js constructor");
    }

    componentDidMount() {
        this.props.getEvents((error) => alert(error.message))
    }

    renderItem({item, index}) {
        return <Event index={index}/>
    }

    ListEmptyView = () => {
        return (
            <View style={styles.EmptyListContainer}>

                <Text style={{paddingTop: 100, textAlign: 'center', color:"#eee"}}> No available events</Text>

            </View>
        );

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
                            data={this.props.events}
                            renderItem={this.renderItem}
                            ListEmptyComponent={this.ListEmptyView}
                            initialNumToRender={5}
                            keyExtractor={(item, index) => index.toString()}/>
                        </ImageBackground>
            );
        }
    }
};

function mapStateToProps(state, props) {
    return {
        isLoading: state.calendarReducer.isLoading,
        events: state.calendarReducer.events
    }
}

export default connect(mapStateToProps, {getEvents})(Calendar);