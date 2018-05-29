import React from 'react';
var { Text, View, StyleSheet, Alert, Image, KeyboardAvoidingView, FlatList,TouchableOpacity, ImageBackground } = require('react-native');

import {Button, FormInput} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"

import { actions as homeauth } from "../../index";
const { getLeaderBoard } = homeauth;

import moment from 'moment' 

//Components
import TeamCard from "../../components/TeamCard"

import QuizComponent from "../../components/QuizComponent"

class Leaderboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            solos: [],
            teams: [],
            mixed: [],
            isTeam: 3,
            data: [],
        }
        
        this.gotLeaderBoard = this.gotLeaderBoard.bind(this);
        this.textPress = this.textPress.bind(this);
    }
    componentDidMount() {
        this.props.getLeaderBoard(this.gotLeaderBoard);
    }

    gotLeaderBoard(results){
        this.setState({solos: results[0]});
        this.setState({teams: results[1]});
        this.setState({mixed: results[2]});
        this.setState({data: this.state.mixed});
        
    }
    textPress(){
        console.log("TEXT PRESSED");
    }
    render() {
        return (
            <ImageBackground 
                source = {require('../../../../assets/images/theme-bg.png')}
                style={styles.container}>
                <View style = {styles.topNav}>
                    <View style = {styles.leaderBoardTextView}>
                        <Text 
                            style = {styles.leaderBoardText}
                            onPress = {this.textPress}
                        >Leaderboard</Text>
                    </View>
                    <View style = {styles.filterView}>
                        <View style = {styles.ButtonView}>
                            {(this.state.isTeam == 1) ?
                                (<TouchableOpacity
                                    style = {styles.filterButton}
                                    onPress = {() => {this.setState({ isTeam: 1})}}
                                >
                                <Text style = {styles.itemText}> Individual </Text>
                                </TouchableOpacity> ):
                                (<TouchableOpacity
                                    style = {styles.offButton}
                                    onPress = {() => {this.setState({ isTeam: 1})}}
                                >
                                <Text style = {styles.buttonText}> Individual </Text>
                                </TouchableOpacity>)
                            }
                        </View>
                        <View style = {styles.ButtonView}>
                            {(this.state.isTeam == 2) ? (
                            <TouchableOpacity
                                style = {styles.filterButton}
                                onPress = {() => {this.setState({ isTeam: 2})}}
                            >
                            <Text style = {styles.itemText}> Teams </Text>
                            </TouchableOpacity> ):
                            (<TouchableOpacity
                                style = {styles.offButton}
                                onPress = {() => {this.setState({ isTeam: 2})}}
                            >
                            <Text style = {styles.buttonText}> Teams </Text>
                            </TouchableOpacity> )
                            }
                        </View>
                        <View style = {styles.ButtonView}>
                            {(this.state.isTeam == 3) ? (
                            <TouchableOpacity
                                style = {styles.filterButton}
                                onPress = {() => {this.setState({ isTeam: 3})}}
                            >
                                <Text style = {styles.itemText}> Mixed </Text>
                            </TouchableOpacity> ):
                            (<TouchableOpacity
                                style = {styles.offButton}
                                onPress = {() => {this.setState({ isTeam: 3})}}
                            >
                                <Text style = {styles.buttonText}> Mixed </Text>
                            </TouchableOpacity>)
                            }
                        </View>
                    </View>
                </View>

                <View style = {styles.Board} >
                        {(this.state.isTeam == 1) ?
                        <FlatList
                            data = {this.state.solos}
                            renderItem = {({item}) => 
                                <TeamCard
                                    rank = {item.rank}
                                    points  = {item.points}
                                    title = {item.title}
                                />
                                //<Text styles = {styles.itemText}>{item.points} {item.fname}{item.lname} </Text>
                            }
                        />:
                        (this.state.isTeam == 2) ?
                        <FlatList
                            data = {this.state.teams}
                            renderItem = {({item}) => 
                                <TeamCard
                                    rank = {item.rank}
                                    points  = {item.points}
                                    title = {item.title}
                                />
                                //<Text styles = {styles.itemText}>{item.points} {item.fname}{item.lname} </Text>
                            }
                        />:
                        <FlatList
                            data = {this.state.mixed}
                            renderItem = {({item}) => 
                                <TeamCard
                                    rank = {item.rank}
                                    points  = {item.points}
                                    title = {item.title}
                                />
                                //<Text styles = {styles.itemText}>{item.points} {item.fname}{item.lname} </Text>
                            }
                        />
                        }
                </View>
                <QuizComponent />
            </ImageBackground>
        );
    }
}
export default connect(null, {getLeaderBoard})(Leaderboard);

