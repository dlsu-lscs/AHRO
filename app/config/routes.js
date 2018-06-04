import React from 'react';
import { Scene, Router, ActionConst, Stack, Modal, Tabs } from 'react-native-router-flux';

//Splash Component
import Splash from '../modules/splash/Splash';

//Authentication Scenes
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import Login from '../modules/auth/scenes/Login';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';
import VerifyEmail from '../modules/auth/scenes/VerifyEmail';

//Authenticated Scenes
import Home from '../modules/home/scenes/Home';
import Scanning from '../modules/home/scenes/Scanning';
import TeamProfile from '../modules/home/scenes/TeamProfile';
import multipleChoice from '../modules/home/scenes/multipleChoice';
import Identification from '../modules/home/scenes/Identification';
import ConfirmedScan from '../modules/home/scenes/ConfirmedScan';
import EnterCode from '../modules/home/scenes/EnterCode';
import Leaderboard from '../modules/home/scenes/Leaderboard';
//Import Store, actions
import store from '../redux/store'
import { checkLoginStatus, testquery } from "../modules/auth/actions";
import { getRewards, getQuizes, getInvitations, getServerTime, getPoints, getCodes, setCameraState } from "../modules/home/actions";

import { color, navTitleStyle } from "../styles/theme";



import Notifications1 from '../modules/notifications/scenes/Notifications/Notifications';
import Map       from '../modules/map/scenes/Map/Map';
import Calendar       from '../modules/calendar/scenes/Calendar/Calendar';
import ViewEvent from '../modules/map/scenes/ViewEvent/ViewEvent';
import {StatusBar, Text, View} from "react-native";
//import * as StatusBar from "react-native";


import { Ionicons } from '@expo/vector-icons';
import styles from "../modules/home/components/NavigationBar/styles";


//not yet moved to other folder. But is only used by the tab scene here
class TabIcon extends React.Component {
    render() {
        let src = "";
        switch(this.props.title){
            case 'Home': src = 'ios-person-outline'; break;
            case 'Team Profile': src = 'ios-people-outline'; break;
            case 'Scan': src = 'ios-calendar-outline'; break;
            case 'Map': src = 'ios-map-outline'; break;
            case 'Notifications': src = 'ios-notifications-outline'; break;
        }

        let title = this.props.title;
        return (
            <View style={styles.navIconContainer}>
                <Ionicons name={src} size={36} color="#000" />
                <Text style={styles.navIconLabel}>{title}</Text>
            </View>
        );
    }
}

class TabIconInner extends React.Component {
    render() {
        let title = this.props.title;
        return (
            <View style={styles.navIconContainer}>
                <Text style={styles.navIconLabel}>{title}</Text>
            </View>
        );
    }
}




export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            timeReady: false,
            rewardsReady: false,
            quizesReady: false,
            codesReady: false,
            isLoggedIn: false,
            pointsReady: false,
        }

        this.camerisOn = this.camerisOn.bind(this);
        this.cameraisOff = this.cameraisOff.bind(this);

    }

    // componentWillMount(hidden, animation) {
    //     StatusBar.setHidden(true, animation);
    // }
    componentDidMount() {



        let _this = this;
        store.dispatch(testquery());
        store.dispatch(getServerTime(() => {
            _this.setState({timeReady: true});
        }));
        store.dispatch(checkLoginStatus((isLoggedIn) => {
            _this.setState({isReady: true, isLoggedIn});
            if(isLoggedIn){
                console.log("logged in");
                store.dispatch(getPoints(() => {
                    this.setState({pointsReady: true});
                }));
            }
            else{
                this.setState({pointsReady: true});
            }
        }));
        store.dispatch(getRewards(() => {
            console.log("rewards ready");
            _this.setState({rewardsReady: true});

        }));

        store.dispatch(getQuizes(() => {
            console.log("quizes ready");
            _this.setState({quizesReady: true});

        }));
        store.dispatch(getCodes(() => {
            console.log("codes ready");
            _this.setState({codesReady: true});
            
        }));
    }


    render() {
        if (!this.state.isReady || !this.state.rewardsReady || !this.state.quizesReady || !this.state.timeReady ||  !this.state.pointsReady || !this.state.codesReady)
            return <Splash/>

        return (
            <Router>
                <Scene key="root" hideNavBar
                       navigationBarStyle={{backgroundColor: "rgba(0,0,0,0.5)"}}
                       titleStyle={navTitleStyle}
                       backButtonTintColor={color.black}>
                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                        <Scene key="Register" component={Register} title="Register" hideNavBar/>
                        <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username" back={false}/>
                        <Scene key="Login" component={Login} title="Login" hideNavBar/>
                        <Scene key="VerifyEmail" component={VerifyEmail} title = "Verify your Email address" back = {false}/>
                        <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>

                    </Stack>

                    <Stack key="Main" initial={this.state.isLoggedIn}

                    >

                        <Scene key="Leaderboard" component={Leaderboard} title="Leaderboard"  />

                        <Scene key="MainTabs"
                               tabs
                               tabBarStyle={{backgroundColor: '#fff'}}
                               tabBarPosition='bottom'
                               showLabel = {false}
                               activeBackgroundColor = '#ddd' initial>
                            <Scene key="Home" icon={TabIcon}

                                   component={Home} title="Home" initial={true} type={ActionConst.REPLACE}/>
                            <Scene key="TeamProfile" component={TeamProfile} title="Team Profile" icon={TabIcon}/>
                            <Scene icon={TabIcon} key="Scanning" component={Scanning} title="Scan" onExit = {this.cameraisOff}/>

                            <Scene key='map'
                                   title='Map' icon={TabIcon}
                                   tabs
                                   tabBarStyle={{backgroundColor: '#fff'}}
                                   activeBackgroundColor = '#ddd'
                                   tabBarPosition='bottom'
                                showLabel={false}>
                                <Scene key='List'
                                       component={Calendar}
                                       title='Event List' icon={TabIconInner}
                                       initial tabBarLabel = "Event List">
                                </Scene>
                                <Scene key = 'mapInnerTab' title = "Map"
                                       component={Map}  icon={TabIconInner} hideNavBar>
                                </Scene>


                            </Scene>
                            <Scene key='Notifications'
                                   component={Notifications1}

                                   title='Notifications' icon={TabIcon}>

                            </Scene>
                        </Scene>
                        <Scene key="EnterCode" component={EnterCode} title="EnterCode"/>
                        <Scene key="multipleChoice" component={multipleChoice} title="Answer the quiz"/>
                        <Scene key="Identification" component={Identification} title="Answer the quiz"/>
                        <Scene key="ConfirmedScan" component={ConfirmedScan} title="ConfirmedScan"/>
                    </Stack>
                        

                    <Scene key = 'viewEvent' title = 'modal' component = {ViewEvent} hideNavBar
                           direction = "vertical">

                    </Scene>

                </Scene>

            </Router>
        )
    }
}
