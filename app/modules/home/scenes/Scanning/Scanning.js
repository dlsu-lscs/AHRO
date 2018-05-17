import React from 'react';
var { Text, View, StyleSheet, Alert, Image } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"


const { color } = theme;

import { Constants, BarCodeScanner, Permissions } from 'expo';

class Home extends React.Component {
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
        console.log(JSON.stringify(data))
        this.setState({
          qrValue: data,
        })
    };



    render() {
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
                              //type = 'front'
                            />
                            <Image 

                            source = {require('../../../../assets/images/crosshair.png')} 
                            style = {styles.crossHair} 

                            />
                            
                        </View>
                    }
                    <View style ={styles.bottomBox}>
                            {this.state.qrValue.data == null ?
                                <Text style = {styles.textStyle}> 
                                    Scan a QR code
                                </Text>:
                                <Text style = {styles.textStyle}> 
                                    {`${this.state.qrValue.data}`}
                                </Text>
                                
                            }
                    </View>
                </View>
            </View>
        );
    }
}

export default Home;