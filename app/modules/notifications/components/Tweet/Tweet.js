import React from 'react';

import { Text, View, TouchableOpacity, ActionSheetIOS } from 'react-native';

import { Icon } from 'react-native-elements'
import moment from "moment";

import styles from "./styles"
import { connect } from "react-redux";

import { actions, theme } from "../../index"
import { Actions } from "react-native-router-flux";
import HyperlinkedText from "react-native-hyperlinked-text";

const { deleteQuote, toggleLove } = actions;
const { normalize } = theme;

class Tweet extends React.Component {
    constructor() {
        super();
        this.state = {}

        this.onOption = this.onOption.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onToggleLove = this.onToggleLove.bind(this);

        this.renderLoveButton = this.renderLoveButton.bind(this);
    }

    onOption(){
        const { tweets, index } = this.props;
        const tweet = tweets[index];

        ActionSheetIOS.showActionSheetWithOptions({
                options: ['Edit', 'Delete', 'Cancel'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 2,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) Actions.NewQuote({ edit:true, quote: tweet })
                else if (buttonIndex === 1) this.onDelete();
            });
    }

    onDelete(){
        const { quotes, index } = this.props;
        const quote = quotes[index];

        this.props.deleteQuote(quote, (error) =>  alert(error.message))
    }

    onToggleLove(){
        const { user, quotes, index } = this.props;
        const quote = quotes[index];

        const data = { quote };

        this.props.toggleLove(data, (error) =>  alert(error.message))
    }

    renderOptionButton(){
        return(
            <View style={styles.right}>
                <TouchableOpacity onPress={this.onOption}>
                    <View style={styles.buttonContainer}>
                        <Text>option</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderLoveButton(){
        const { user, quotes, index } = this.props;
        const quote = quotes[index];
        const { loves } = quote;

        return(
            <TouchableOpacity onPress={this.onToggleLove}>
                <View style={styles.buttonContainer}>
                    <Text>love</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderTweet({tweet}){

        return (

            <View style={[styles.container]}>
                <View style={[styles.wrapper]}>

                    <View style={[styles.quote]}>
                        <Text numberOfLines={3} style={[styles.text1]}>
                            DLSU University Mision Vision Week
                        </Text>
                        <HyperlinkedText style={[styles.text]}
                            linkStyle={{color: '#fff6ce'}}
                        >
                            {tweet.message}
                        </HyperlinkedText>

                    </View>


                </View>

            </View>
        );
    }

    render() {
        const { user, tweets, index } = this.props;
        const quote = tweets[index];
        const { message, author, time, color, userId, picture_url } = quote;

        return (<View>{picture_url && this.renderTweet({tweet:quote})}</View>);

    }
}

function mapStateToProps(state, props) {
    return {
        tweets: state.notificationsReducer.tweets
    }
}

export default connect(mapStateToProps, { deleteQuote, toggleLove })(Tweet);