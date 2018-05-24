import React from 'react';
var { Text, View, StyleSheet, Alert, Image } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"

import { actions as homeauth } from "../../index";
const { updatePoints } = homeauth;

const { color } = theme;

import { Constants, BarCodeScanner, Permissions } from 'expo';

class Scanning extends React.Component {
    constructor(props){
        super(props);
        /*
        setInterval(() => {
          this.setState({qrValue: ''});
        }, 1000);
        */
    }
    state = {
        hasCameraPermission: null,
        qrValue: '',
        response: 'Scan a QR code'
    };

    componentDidMount() {
        this._requestCameraPermission();
    }
    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
          hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = data => {
        //console.log(JSON.stringify(data))
        this.setState({
          qrValue: data,
        })
        if(this.props.rewards[data.data] != null){
            if(this.props.rewards[data.data].type === "multiplechoice"){
                Actions.multipleChoice({reward: this.props.rewards[data.data], rewardkey: data.data});
            }
            else if(this.props.rewards[data.data].type === "Identification" ){
                Actions.Identification({reward: this.props.rewards[data.data], rewardkey: data.data});
            }
            else{
                const newReward = {key: data.data, points: this.props.rewards[data.data].points};
                this.props.updatePoints( newReward , () => {},() => {},() => {});
            }
        }

    };

    



    render() {
        let responseText = this.state.qrValue.data ==  null ? this.state.response: this.state.response;
        return (
            <View style={styles.container}>
                <View style = {styles.mainbackground}>
                    {this.state.hasCameraPermission === null ?
                        <Text>Requesting for camera permission</Text> :
                     this.state.hasCameraPermission === false ?
                        <Text>Camera permission is not granted</Text> :
                        <View style = {styles.topBox}>
                            <BarCodeScanner
                              onBarCodeRead={this._handleBarCodeRead}
                              style={styles.barCode}
                              //torchMode = {"on"}
                              //type = 'front'
                            />
                            <Image 

                            source = {require('../../../../assets/images/crosshair.png')} 
                            style = {styles.crossHair} 

                            />
                            
                        </View>
                    }
                    <View style ={styles.bottomBox}>
                            <Text style = {styles.textStyle}> 
                                {responseText}
                            </Text>
                    </View>
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
  return { rewards: state.homeReducer.rewards, user: state.authReducer.user };

};
export default connect(mapStateToProps, { updatePoints })(Scanning);
