import React from 'react';
import {Scene, Router, ActionConst, Stack, Modal, Tabs} from 'react-native-router-flux';

//Splash Component
import Splash from '../modules/splash/Splash';

//Homepage Tabs
import Account from '../modules/account/Account';
import Calendar from '../modules/calendar/Calendar';
import Game from '../modules/game/Game';
import Map from '../modules/map/Map';
import Notifications from '../modules/notifications/Notifications'

//Authentication Scenes
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import Login from '../modules/auth/scenes/Login';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';
import Home from '../modules/home/scenes/Home';
// import VerifyEmail from '../modules/auth/scenes/VerifyEmail';


//Import Store, actions
import store from '../redux/store'
import {checkLoginStatus} from "../modules/auth/actions";
import {color, navTitleStyle} from "../styles/theme";
import Text from "react-native-elements/src/text/Text";

//used to supress the warning: isMounted()
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'M' +
'odule RCTImageLoader']);


//not yet moved to other folder. But is only used by the tab scene here
class TabIcon extends React.Component {
    render() {
        let color = this.props.selected ? '#00f240' : '#301c2a'
        let title = this.props.title;
        return (
            <Text style={{color: color, fontSize: 12}}>Log</Text>

        );
    }
}


export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false
        }
    }

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus((isLoggedIn) => {
            _this.setState({isReady: true, isLoggedIn});
        }));
    }

    render() {
        if (!this.state.isReady)
            return <Splash/>

        return (
            <Router>
                <Scene key="root" >
                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        /*this welcome scene should be replaced by the scene named also "Welcome" below*/
                        <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                        <Scene key="Register" component={Register} title="Register" back/>
                        <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username" back={false}/>
                        <Scene key="Login" component={Login} title="Login"/>
                        <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>

                        <Scene key='Welcome1' //<- change this to Welcome and delete the previous "Welcome" scene above
                               tabs
                               tabBarStyle={{backgroundColor: '#fff'}}
                               tabBarPosition = 'bottom'>
                            <Scene key='account'
                                   component={Account}
                                   title='Account' icon={TabIcon}
                                   hideNavBar>

                            </Scene>
                            <Scene key='calendar'
                                   component={Calendar}
                                   title='Calendar' icon={TabIcon}
                                   hideNavBar>

                            </Scene>
                            <Scene key='game' //The game is also a team and team scoreboard page
                                   component={Game}
                                   title='Game'
                                   initial icon={TabIcon}
                                   hideNavBar>

                            </Scene>
                            <Scene key='map'
                                   component={Map}
                                   title='Map' icon={TabIcon}
                                   hideNavBar>

                            </Scene>
                            <Scene key='Notifications'
                                   component={Notifications}
                                   title='Notifications' icon={TabIcon}
                                   hideNavBar>

                            </Scene>
                        </Scene>

                    </Stack>

                    <Stack key="Main" initial={this.state.isLoggedIn}>
                        <Scene key="Home" component={Home} title="Home" initial={true} type={ActionConst.REPLACE}/>
                        /*<Scene key="Scanning" component={Scanning} title="Scanning" />*/
                    </Stack>


                </Scene>
            </Router>
        )
    }
}