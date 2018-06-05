import React from 'react';
var { View, Image, TouchableOpacity, Text, StyleSheet, Alert, ImageBackground, KeyboardAvoidingView, FlatList, TouchableOpacity } = require('react-native');

import {Button, FormInput} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {Notifications, Permissions} from "expo";

import styles from "./styles"
import { actions as auth, theme } from "../../../auth/index"
import {actions as homeauth} from "../../index"

const { getLeaderBoard } = homeauth;
const { signOut, registerForPushNotificationsAsync } = auth;
const { color } = theme;

import moment from 'moment' 

//Components
import TeamCard from "../../components/TeamCard"
import QuizComponent from "../../components/QuizComponent"



class Home extends React.Component {
    constructor(props){
        super(props);

        this.onSignOut = this.onSignOut.bind(this);
        this.onLeaderboard = this.onLeaderboard.bind(this);
{/*<<<<<<< HEAD*/}
        {/*this.onCode = this.onCode.bind(this);*/}
{/*=======*/}

        this.state = {
            solos: [],
            teams: [],
            mixed: [],
            isTeam: 3,
            data: [],
            meuser: {
                points: 0,
                fname: "",
                lname: "",
                username: "",
                points: 0,
                allrank: 0,
                secondary: "",
                secondaryrank: 0,
            }
        }
        
        this.gotLeaderBoard = this.gotLeaderBoard.bind(this);
        this.textPress = this.textPress.bind(this);
        this.onCode = this.onCode.bind(this);
    }

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        Actions.reset("Auth")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }
    onLeaderboard(){
        Actions.Leaderboard();
    }
    onCode(){
        Actions.EnterCode();
    }

    componentDidMount(){
        registerForPushNotificationsAsync();
        this.props.getLeaderBoard(this.gotLeaderBoard);
    }

    gotLeaderBoard(results){
        this.setState({solos: results[0]});
        this.setState({teams: results[1]});
        this.setState({mixed: results[2]});
        this.setState({meuser: results[3]})
        this.setState({data: {...this.state.mixed}});
    }

    textPress(){
        console.log("TEXT PRESSED");
    }

    render() {
        return (
            <ImageBackground 
                source = {require('../../../../assets/images/theme-bg.png')}
                style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.topContainer}>
                        <View style={styles.leftContainer}>
                            <Image
                                source={ require('../../../../assets/images/man.png') }
                                style={styles.avatar} />
                            <TouchableOpacity style={[styles.toButton]}                                                    
                                onPress={ this.onSignOut }>
                                <Text style={styles.signOutText}>Sign Out</Text>
                            </TouchableOpacity>
                            {/* <Button
                                raised
                                borderRadius={4}
                                title={'LOG OUT'}
                                containerViewStyle={[styles.containerView]}
                                buttonStyle={[styles.button]}
                                textStyle={styles.buttonText}
                                onPress={this.onSignOut}/> */}
                        </View>
                        <View style={styles.rightContainer}>
                            <View style={styles.userInfoContainer}>
                                <Text style={[styles.emphasis, styles.name]}>{this.state.meuser.fname} {this.state.meuser.lname}</Text>
                                <Text style={[styles.username]}>{this.state.meuser.username}</Text>
                            </View>
                            
                            <View style={styles.pointContainer}>
                                <Text style={[styles.pointLabel]}>Total Points: </Text>
                                <Text style={[styles.points]}>{this.state.meuser.points} </Text>
                            </View>
                            <View style={styles.pointContainer}>
                                <Text style={[styles.pointLabel]}>{this.state.meuser.secondary} Rank: </Text>
                                <Text style={[styles.points]}>{this.state.meuser.secondaryrank}</Text>
                            </View>
                            <View style={styles.pointContainer}>
                                <Text style={[styles.pointLabel, styles.pointEmphasis]}>OVERALL RANK: </Text>
                                <Text style={[styles.points, styles.pointEmphasis]}>{this.state.meuser.allrank}</Text>
                            </View>

                            {/* <Text style={[styles.genText]}>{this.state.meuser.secondary} Rank: {this.state.meuser.secondaryrank}</Text> */}
                            {/* <Text style={[styles.genText]}>OVERALL RANK: {this.state.meuser.allrank}</Text> */}
                            
                        </View>
                    </View>
                    <View style={styles.leaderBoardContainer}>
                    {/* <View> */}
                        <Text 
                            style={styles.leaderBoardText}
                            onPress={this.textPress}>
                            Leaderboard
                        </Text>
                        {/* <View style = {styles.topNav}> */}
                            <View style = {styles.filterView}>
                                <View style = {styles.buttonView}>
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
                                        <Text style={styles.buttonText}> Individual </Text>
                                        </TouchableOpacity>)
                                    }
                                </View>
                                <View style = {styles.buttonView}>
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
                                <View style = {styles.buttonView}>
                                    {(this.state.isTeam == 3) ? (
                                    <TouchableOpacity
                                        style = {styles.filterButton}
                                        onPress = {() => {this.setState({ isTeam: 3})}}
                                    >
                                        <Text style = {styles.itemText}> All </Text>
                                    </TouchableOpacity> ):
                                    (<TouchableOpacity
                                        style = {styles.offButton}
                                        onPress = {() => {this.setState({ isTeam: 3})}}
                                    >
                                        <Text style = {styles.buttonText}> All </Text>
                                    </TouchableOpacity>)
                                    }
                                </View>
                            </View>
                        {/* </View> */}

                        <View style = {styles.board} >
                            {(this.state.isTeam == 1) ?
                            <FlatList
                            // contentContainerStyle={ {alignItems: 'center',} }    
                            contentContainerStyle={ {width: '100%', alignItems: 'center',} }    
                                data = {this.state.solos}
                                renderItem = {({item}) => 
                                    <TeamCard
                                        rank = {item.rank}
                                        points  = {item.points}
                                        title = {item.title}
                                    />
                                }
                            />:
                            (this.state.isTeam == 2) ?
                            <FlatList
                            contentContainerStyle={ {width: '100%', alignItems: 'center',} }    
                            // contentContainerStyle={ {alignItems: 'center',} }    
                                data = {this.state.teams}
                                renderItem = {({item}) => 
                                    <TeamCard
                                        rank = {item.rank}
                                        points  = {item.points}
                                        title = {item.title}
                                    />
                                }
                            />:
                            <FlatList
                            // contentContainerStyle={ {alignItems: 'center',} }  
                            contentContainerStyle={ {width: '100%', alignItems: 'center',} }    
                                                          
                                data = {this.state.mixed}
                                renderItem = {({item}) => 
                                    <TeamCard
                                        rank = {item.rank}
                                        points  = {item.points}
                                        title = {item.title}
                                    />
                                }
                            />
                            }
                        </View>
                        <QuizComponent />
                    </View>                    
                </View>
            </ImageBackground>
        );
    }
}

export default connect(null, { signOut, getLeaderBoard })(Home);