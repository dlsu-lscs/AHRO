import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, TouchableHighlight, FlatList, Modal, ImageBackground } from 'react-native';

import { Button, ListItem } from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { constants, actions as home } from "../../index"
const { createTeam, getTeam, sendInvite } = home;

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
            error: error,
            modalCreateTeamVisible: false,
            modalAddMemberVisible: false,
        }

        // this.renderItem = this.renderItem.bind(this);
        this.setModalCreateTeamVisible = this.setModalCreateTeamVisible.bind(this);
        this.setModalAddMemberVisible = this.setModalAddMemberVisible.bind(this);
        this.onSubmitModalCreateTeam = this.onSubmitModalCreateTeam.bind(this);
        this.onSubmitModalAddMember = this.onSubmitModalAddMember.bind(this);
        // this.pressRow = this.pressRow.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    setModalCreateTeamVisible(visible) {
        this.setState({modalCreateTeamVisible: visible});
    }

    setModalAddMemberVisible(visible) {
        this.setState({modalAddMemberVisible: visible});
    }

    componentWillMount() {
        this.getItems();
    }

    componentDidMount() {
        this.getItems();
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

        this.props.sendInvite(null, this.onSuccess, this.onError);

    }
    // renderItem(item){
    //     console.log(item);
    //     console.log(typeof item);
    //     return (
    //         <TouchableHighlight onPress={() => {
    //             this.pressRow(item);
    //         }}>
    //             {/* <ListItem item={item} /> */}
    //             <View style={styles.list}>
    //                 <Text style={styles.listText}>{item}</Text>
    //             </View>
    //         </TouchableHighlight>
    //     );
    // }

    onSuccess(team) {
        console.log("@TeamProfile.js : Success");

        var members = [];
        Object.keys(team.users).forEach(function(key) {
            members.push( {
                name: team.users[key].fname + ' ' + team.users[key].lname,
            });
        });

        this.setState({members, loading: false, team: constants.STATE_USER_TEAM });
        console.log(this.state);
        console.log("done success func");
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
        // }
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

                    {/* <Modal
                        animationType="fade"
                        transparent={ false }
                        visible={this.state.modalCreateTeamVisible}
                        onRequestClose={() => {
                            console.log("hide add member modal");
                        }}>
                        <View style={styles.modalContainer}>
                            <View>
                                <Text>Enter the name of your new team below:</Text>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalCreateTeamVisible(!this.state.modalCreateTeamVisible);
                                    }}>
                                    <Text>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal> */}

                    {/* Add member modal */}
                    <CustomModal fields={addMemberFields}
                        modalText={"Enter the username of the user you want to add to your team:"}
                        onSubmit={this.onSubmitModalAddMember}
                        modalVisible={this.state.modalAddMemberVisible}
                        setVisible={this.setModalAddMemberVisible}
                        error={this.state.error}/>

                    <View style={styles.content}>
                        <View style={styles.topContent}>
                            <Text style={styles.title}>My Team Profile</Text>

                            {this.state.team === constants.STATE_USER_TEAM &&
                                <Button 
                                    onPress={() => {
                                        this.setModalAddMemberVisible(!this.state.modalAddMemberVisible)
                                    }}
                                    title="Add Member"
                                    buttonStyle={[styles.button]}
                                    borderRadius={4}
                                />
                            }

                            {this.state.team === constants.STATE_USER_TEAM_NONE &&
                                <Button 
                                    onPress={() => {
                                        this.setModalCreateTeamVisible(!this.state.modalCreateTeamVisible)
                                    }}
                                    title="Create Team"
                                    buttonStyle={[styles.button]}
                                    borderRadius={4}
                                />
                            }
                            
                            {/* <ScanQR /> */}
                        </View>
                            <FlatList
                                data={this.state.members}
                                // renderItem={this.renderItem}
                                renderItem={({ item }) => (
                                    <ListItem
                                        title={`${item.name}`}
                                        // rightTitle={'right'}
                                        titleStyle={[styles.liTitle]}
                                        hideChevron={true}
                                    />
                                )}
                                keyExtractor={item => item.name}
                            />
                    </View>
                    <NavigationBar />
                </ImageBackground>
            );
        }
    }
}
export default connect(null, { createTeam, getTeam, sendInvite })(TeamProfile);
