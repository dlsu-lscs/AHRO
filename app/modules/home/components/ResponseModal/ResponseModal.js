import React from 'react';
import PropTypes from 'prop-types'

import {Text, View, Modal, TouchableHighlight } from 'react-native';
import {Button} from 'react-native-elements'
import { LinearGradient } from 'expo';

import {isEmpty, validate} from '../../utils/validate'

import styles from "./styles"

import ModalTextInput from "../ModalTextInput"

class ResponseModal extends React.Component {
    constructor(props) {
        super(props);

        const { type, modalVisible } = props;

        this.state = {modalVisible};

        //bind functions
        // this.modalVisible = this.modalVisible.bind(this);
    }
    render() {
        const { type, modalText } = this.props;
        
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
                        <Text style={styles.modalText}
                        adjustsFontSizeToFit = {true}
                        numberOfLines={10}>{ modalText }</Text>
                        <View style={styles.modalLowerContainer}>
                            <TouchableHighlight
                                onPress={() => {
                                    console.log("POP");
                                    this.props.setVisible( !this.props.modalVisible );
                                }}>
                                <Text style={styles.submitModal}>Close</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
            
        );
    }
}

ResponseModal.propTypes = {
    modalText: PropTypes.string,
    type: PropTypes.string,
    setVisible: PropTypes.func,
    modalVisible: PropTypes.bool,
}

export default ResponseModal;