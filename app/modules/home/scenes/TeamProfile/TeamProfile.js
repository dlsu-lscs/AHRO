import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, TouchableHighlight, FlatList, Modal, ImageBackground } from 'react-native';

import { Button, ListItem, Card } from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { constants, actions as home } from "../../index"
const { createTeam, getTeam, sendInvite, getInvites, acceptInvite } = home;

// import MaterialIcons  
// from '../../../../../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';

//Components
import ScanQR from "../../components/ScanQR"
import CustomModal from "../../components/CustomModal"
import NavigationBar from '../../components/NavigationBar/NavigationBar';

const addMemberFields = [
    
    {
        key: 'username',
        label: "Username",
        placeholder: "Username",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text"
    },

];

const createTeamFields = [
    
    {
        key: 'team',
        label: "Team Name",
        placeholder: "Team Name",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text"
    },
    
];

const error = {
    general: "",
    email: "",
    password: "",
    confirm_password: ""
}


class TeamProfile extends React.Component {
    constructor(){
        super();

        console.log("Initializing state @ constructor");
        this.state = {
            loading: false,
            members: [],
            invites: [],
            error: error,
            modalCreateTeamVisible: false,
            modalAddMemberVisible: false,
            modalInviteVisible: false,
        }

        this.getInvites = this.getInvites.bind(this);
        this.acceptInvite = this.acceptInvite.bind(this);

        this.setModalCreateTeamVisible = this.setModalCreateTeamVisible.bind(this);
        this.setModalAddMemberVisible = this.setModalAddMemberVisible.bind(this);
        this.setModalInviteVisible = this.setModalInviteVisible.bind(this);

        this.onSubmitModalCreateTeam = this.onSubmitModalCreateTeam.bind(this);
        this.onSubmitModalAddMember = this.onSubmitModalAddMember.bind(this);

        this.onSuccess = this.onSuccess.bind(this);
        this.onSuccessGetInvites = this.onSuccessGetInvites.bind(this);
        this.onError = this.onError.bind(this);
    }

    setModalCreateTeamVisible(visible) {
        this.setState({modalCreateTeamVisible: visible});
    }

    setModalAddMemberVisible(visible) {
        this.setState({modalAddMemberVisible: visible});
    }

    setModalInviteVisible(visible) {
        this.setState({modalInviteVisible: visible});
    }

    componentWillMount() {
        this.getItems();
    }

    componentDidMount() {
        this.getItems();
    }

    getInvites(){
        console.log("GETTING INVITES");

        this.props.getInvites(this.onSuccessGetInvites, this.onError);
    }

    acceptInvite(invite){
        console.log("ACCEPT INVITE");
        console.log(invite);

        this.props.acceptInvite(invite, this.onSuccess, this.onError);
    }

    getItems(){
        console.log("NOT initializing state @ getItems()");

        this.props.getTeam(this.onSuccess, this.onError);
    }

    onSubmitModalCreateTeam(data){
        console.log("MODAL SUBMITTED WOOP");

        this.props.createTeam(data, this.onSuccess, this.onError);
    }

    onSubmitModalAddMember(data){
        console.log("MODAL SUBMITTED :D");

        console.log("Send invite called");

        this.props.sendInvite(data, this.onSuccess, this.onError);

    }

    onSuccess(team) {
        console.log("@TeamProfile.js : Success GetTeam");

        var members = [];
        var i = 1;
        Object.keys(team.users).forEach(function(key) {
            members.push( {
                index: i,
                name: team.users[key].fname + ' ' + team.users[key].lname,
            });
            i++;
        });

        this.setState({members, loading: false, team: constants.STATE_USER_TEAM });
        console.log(this.state);
    }

    onSuccessGetInvites(teamInvites) {
        console.log("@TeamProfile.js: Success GetInvites");

        console.log(teamInvites);

        var inviteArr = [];
        Object.keys(teamInvites).forEach(function(key) {
            console.log(key);
            console.log(teamInvites[key]);
            inviteArr.push( {
                id: key,
                teamName: teamInvites[key],
            });
        });

        inviteArr.push( { id: '101', teamName: 'team sample'});

        console.log(inviteArr);
        this.setState({ invites: inviteArr });
        console.log(this.state);
    }
    
    onError(error) {
        console.log("@TeamProfile.js : Error");
        console.log(error);

        if(error['message'] === constants.ERROR_USER_NO_TEAM) {
            this.setState({ team: constants.STATE_USER_TEAM_NONE })
        }

        console.log(this.state);
    }

    render() {
        if (this.state.loading) {
            console.log("LOADING");
            return (
                <Text>Please wait...</Text>
            )
        } else {
            return (
                <ImageBackground
                    source={ require('../../../../assets/images/theme-bg.png')}
                    style={styles.container}>

                    {/* Create team modal */}
                    <CustomModal fields={createTeamFields}
                        modalText={"Enter the name of your new team below:"}
                        onSubmit={this.onSubmitModalCreateTeam}
                        modalVisible={this.state.modalCreateTeamVisible}
                        setVisible={this.setModalCreateTeamVisible}
                        error={this.state.error}/>

                    {/* Add member modal */}
                    <CustomModal fields={addMemberFields}
                        modalText={"Enter the username of the user you want to add to your team:"}
                        onSubmit={this.onSubmitModalAddMember}
                        modalVisible={this.state.modalAddMemberVisible}
                        setVisible={this.setModalAddMemberVisible}
                        error={this.state.error}/>

                    {/* View invites modal */}
                    <Modal
                        animationType="fade"
                        transparent={ true }
                        visible={ this.state.modalInviteVisible }
                        onRequestClose={() => {
                            console.log("hide invites modal");
                        }}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalWindowContainer}>
                                <Text style={styles.modalTitle}>Invitations</Text>
                                <FlatList data={this.state.invites}
                                    renderItem={({ item }) => (
                                        <Card
                                            containerStyle={[styles.cardContainer]}
                                            flexDirection="row"
                                            >
                                            <Text style={[styles.cardTextLeft]}>{ item.teamName }</Text>
                                            <View style={[styles.cardRightButtonView]}>
                                                <View style={[styles.transparentButton]}>
                                                    <TouchableOpacity style={[styles.toButton]}                                                    
                                                        onPress={ () => {
                                                        console.log("DECLINE");
                                                        
                                                    }}>
                                                        <Text style={[styles.transparentButtonText]}>Decline</Text>
                                                        
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={[styles.filledButton]}>
                                                    <TouchableOpacity style={[styles.toButton]}
                                                        onPress={ () => {
                                                        console.log("Accept")
                                                        this.acceptInvite(item);
                                                    }}>
                                                        
                                                            <Text style={[styles.filledButtonText]}>Accept</Text>
                                                        
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </Card>
                                    )}
                                    keyExtractor={item => item.id}/>
                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setModalInviteVisible(!this.state.modalInviteVisible);
                                        }}>
                                        <Text>Close</Text>
                                    </TouchableHighlight>
                            </View>
                        </View>
                        
                    </Modal>

                    <View style={styles.content}>
                        <View style={styles.topContent}>
                            <Text style={styles.title}>My Team Profile</Text>

                            {this.state.team === constants.STATE_USER_TEAM &&
                                <View style={styles.topRightContainer}>
                                    <Button 
                                        onPress={() => {
                                            this.setModalAddMemberVisible(!this.state.modalAddMemberVisible)
                                        }}
                                        title="Add Member"
                                        buttonStyle={[styles.button]}
                                        borderRadius={4}
                                    />
                                </View>
                            }

                            {this.state.team === constants.STATE_USER_TEAM_NONE &&
                                <View style={styles.topRightContainer}>
                                    <Button 
                                        onPress={() => {
                                            this.getInvites();
                                            this.setModalInviteVisible(!this.state.modalInviteVisible);
                                            console.log("invite button 2");
                                        }}
                                        title="Invites"
                                        buttonStyle={[styles.button]}
                                        borderRadius={4}
                                    />
                                    <Button 
                                        onPress={() => {
                                            this.setModalCreateTeamVisible(!this.state.modalCreateTeamVisible)
                                        }}
                                        title="Create Team"
                                        buttonStyle={[styles.button]}
                                        borderRadius={4}
                                    />
                                </View>
                            }
                        </View>
                        <View style={[styles.midContent]}>
                            <Text style={[styles.listTitle]}>Team Members</Text>
                            <FlatList
                                data={this.state.members}
                                
                                // renderItem={this.renderItem}
                                renderItem={({ item }) => (
                                    <ListItem
                                        title={`${item.index}.      ${item.name}`}
                                        containerStyle={[styles.liContainer]}
                                        // style={{borderBottomWidth: 0}}
                                        // rightTitle={'right'}
                                        titleStyle={[styles.liTitleLight]}
                                        hideChevron={true}
                                    />
                                )}
                                keyExtractor={item => item.name}
                                ListEmptyComponent={
                                    <Text>You are not part of any team!</Text>
                                }
                            />
                        </View>
                        <View style={[styles.bottomContent]}>
                            <View style={[styles.scoresContainer]}>
                                <View style={[styles.rowContainer]}>
                                    <Text style={[styles.bold, styles.white]}>CODES: </Text>
                                    <Text style={[styles.white]}>100</Text>
                                </View>
                                <View style={[styles.rowContainer]}>
                                    <Text style={[styles.bold, styles.white]}>QUIZ: </Text>
                                    <Text style={[styles.white]}>50</Text>
                                </View>
                                <View style={[styles.rowContainer]}>
                                    <Text style={[styles.bold, styles.accent]}>TOTAL POINTS: </Text>
                                    <Text style={[styles.accent]}>150</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/*<NavigationBar />*/}
                </ImageBackground>
            );
        }
    }
}
export default connect(null, { createTeam, getTeam, sendInvite, getInvites, acceptInvite })(TeamProfile);
