import React from 'react';
import PropTypes from 'prop-types'

import {Text, View, Modal, TouchableHighlight } from 'react-native';
import {Button} from 'react-native-elements'
import { LinearGradient } from 'expo';

import {isEmpty, validate} from '../../utils/validate'

import styles from "./styles"

import ModalTextInput from "../ModalTextInput"

class CustomModal extends React.Component {
    constructor(props) {
        super(props);

        const { fields, error, modalVisible } = props;

        this.state = this.createState(fields, error, modalVisible);

        //bind functions
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.modalVisible = this.modalVisible.bind(this);
    }

    createState(fields, error) {
        //create the state
        const state = {};
        fields.forEach((field) => {
            let {key, type, value} = field;
            state[key] = {type: type, value: value};
        })

        state["error"] = error;
        return state;
    }

    onSubmit() {
        const data = this.state;
        const result = validate(data);

        console.log(this.state);
        console.log("onSubmit");
        console.log(data);

        if (!result.success) 
            this.setState({error: result.error});
        else 
            this.props.onSubmit(this.extractData(data));
    }

    extractData(data) {
        const retData = {};

        Object.keys(data).forEach(function (key) {
            if (key !== "error") {
                let {value} = data[key];
                retData[key] = value;
            }
        });

        return retData;
    }

    onChange(key, text) {
        const state = this.state;
        state[key]['value'] = text;
        this.setState(state);
    }

    render() {
        const { fields, modalText, } = this.props;
        
        return (
            <Modal
                animationType="fade"
                transparent={ true }
                visible={ this.props.modalVisible }
                onRequestClose={() => {
                    console.log("hide add member modal");
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalFormContainer}>
                        <Text style={styles.modalText}>{ modalText }</Text>
                        <View style={styles.modalForm}>
                            {
                                (!isEmpty(this.state.error['general'])) &&
                                <Text style={styles.errorText}>{this.state.error['general']}</Text>
                            }

                            {
                                fields.map((data, idx) => {
                                    let {key, label, placeholder, autoFocus, secureTextEntry} = data;
                                    return (
                                        <ModalTextInput
                                                        key={key}
                                                        label={label}
                                                        placeholder={placeholder}
                                                        autoFocus={autoFocus}
                                                        onChangeText={(text) => this.onChange(key, text)}
                                                        secureTextEntry={secureTextEntry}
                                                        value={this.state[key]['value']}
                                                        error={this.state.error[key]}/>
                                    )
                                })
                            }
                        </View>
                        <View style={styles.modalLowerContainer}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.props.setVisible( !this.props.modalVisible );
                                }}>
                                <Text style={styles.hideModal}>Close</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={() => {
                                    this.onSubmit();
                                    this.props.setVisible( !this.props.modalVisible );
                                }}>
                                <Text style={styles.submitModal}>Submit</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
            
        );
    }
}

CustomModal.propTypes = {
    fields: PropTypes.array,
    modalText: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    modalVisible: PropTypes.bool,
    setVisible: PropTypes.func,
    error: PropTypes.object
}

export default CustomModal;