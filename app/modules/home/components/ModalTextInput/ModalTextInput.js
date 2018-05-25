import React, {Component} from 'react';
import PropTypes from 'prop-types'

import { View } from 'react-native';

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { isEmpty } from '../../utils/validate'
import styles from "./styles"

class ModalTextInput extends Component {
    render() {
        const { placeholder, autoFocus, onChangeText, secureTextEntry } = this.props;

        return (
            <View style={styles.container}>
                <FormInput
                    autoCapitalize='none'
                    clearButtonMode='while-editing'
                    underlineColorAndroid={"#ffffff00"}
                    placeholder={placeholder}
                    placeholderTextColor={"#ededed"}
                    autoFocus={autoFocus}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.containerStyle}
                    value={this.props.value}/>
                {
                    (!isEmpty(this.props.error)) &&
                    <FormValidationMessage>
                        {this.props.error}
                    </FormValidationMessage>
                }
            </View>
        );
    }
}

ModalTextInput.propTypes = {
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
}

ModalTextInput.defaultProps = {
    autoFocus: false,
    secureTextEntry: false
}

export default ModalTextInput;