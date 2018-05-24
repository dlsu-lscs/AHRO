import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import {Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import styles from "./styles";

class ScanQR extends Component {
    constructor(props) {
        super(props);
        /*
        const { fields, error } = props;

        this.state = this.createState(fields, error);

        //bind functions
        this.onChange = this.onChange.bind(this);
        */
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(){
        Actions.Scanning();
    }
    render() {
        const { user } = this.props;

        return (
            <Button 
                onPress={this.onSubmit}
                title="SCAN QR CODE"
                buttonStyle={[styles.scanButton]}
                borderRadius={4}
            />
        );
    }
}

ScanQR.propTypes = {
/*
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    onChangeText: PropTypes.func.isRequired,
    secureTextEntry: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
*/
}

ScanQR.defaultProps = {
/*
    autoFocus: false,
    secureTextEntry: false
*/
}

export default ScanQR;