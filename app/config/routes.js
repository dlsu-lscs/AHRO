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

//Import Store, actions
import store from '../redux/store'
import { checkLoginStatus, testquery } from "../modules/auth/actions";
import { getRewards, getQuizes, getInvitations } from "../modules/home/actions";

import { color, navTitleStyle } from "../styles/theme";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            rewardsReady: false,
            quizesReady: false,
            isLoggedIn: false
        }
        this.readyRewards = this.readyRewards.bind(this);
        this.readyQuizes = this.readyQuizes.bind(this);
    }

    componentDidMount() {
        

        let _this = this;
        store.dispatch(testquery());
        store.dispatch(checkLoginStatus((isLoggedIn) => {
            _this.setState({isReady: true, isLoggedIn});
            
        }));
        store.dispatch(getRewards(() => {
            _this.setState({rewardsReady: true});
            
        }, () => {}));

        store.dispatch(getQuizes(() => {
            _this.setState({quizesReady: true});
            
        }, () => {}));

        store.dispatch(getInvitations(() => {
            _this.setState({quizesReady: true});
            
        }, () => {}));
        
        
    }
    readyRewards(){
        store.dispatch(getRewards(() => {
            _this.setState({rewardsReady: true});
            
        }, this.readyRewards));
    }
    readyQuizes(){
        store.dispatch(getQuizes(() => {
            _this.setState({quizesReady: true});
            
        }, this.readyQuizes));
    }


    render() {
        if (!this.state.isReady || !this.state.rewardsReady || !this.state.quizesReady)
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

                    <Stack key="Main" initial={this.state.isLoggedIn}>
                        <Scene key="Home" component={Home} title="Home" initial={true} type={ActionConst.REPLACE} hideNavBar/>
                        <Scene key="Scanning" component={Scanning} title="Scanning" />
<<<<<<< HEAD
                        <Scene key="ConfirmedScan" component={ConfirmedScan} title="ConfirmedScan" />
=======
                        <Scene key="TeamProfile" component={TeamProfile} title="Team Profile" back={false} hideNavBar/>
>>>>>>> 5241544f07e6b497b56621fa9f3ba48e32bdc52e
                    </Stack>
                    <Scene key="multipleChoice" component={multipleChoice} title="Answer the quiz" type = "reset"/>
                    <Scene key="Identification" component={Identification} title="Answer the quiz" type = "reset"/>
                    
                </Scene>
            </Router>
        )
    }
}
