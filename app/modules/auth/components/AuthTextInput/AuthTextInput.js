import React, {Component} from 'react';
import PropTypes from 'prop-types'

import { View, Text } from 'react-native';

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { isEmpty } from '../../utils/validate'
import styles from "./styles"

class AuthTextInput extends Component {
    render() {
        const { showLabel, placeholder, autoFocus, onChangeText, secureTextEntry } = this.props;

        return (
            <View style={styles.container}>
                {
                    (showLabel) &&
                    <FormLabel>{this.props.label}</FormLabel>
                }
                {
                (this.props.label != null && this.props.label == "Email Address") ?
                (
                    <View style = {styles.viewContainer}>
                        <FormInput
                            autoCapitalize='none'
                            clearButtonMode='while-editing'
                            underlineColorAndroid={"#ffffff00"}
                            placeholder={placeholder}
                            placeholderTextColor={"#ededed"}
                            autoFocus={autoFocus}
                            onChangeText={onChangeText}
                            secureTextEntry={secureTextEntry}
                            inputStyle={styles.emailContainer}
                            containerStyle={styles.containerStyle}
                            value={this.props.value}/>
                            <View style = {styles.centerme}>
                                <Text style = {styles.textLabelContainer}>@dlsu.edu.ph</Text>
                            </View>
                    </View>
                ):
                <FormInput
                    autoCapitalize='none'
                    clearButtonMode='while-editing'
                    underlineColorAndroid={"#ffffff00"}
                    placeholder={placeholder}
                    placeholderTextColor={"#ededed"}
                    autoFocus={autoFocus}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    inputStyle={styles.inputContainer}

                    value={this.props.value}/>
                }
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

AuthTextInput.propTypes = {
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

AuthTextInput.defaultProps = {
    autoFocus: false,
    secureTextEntry: false
}

export default AuthTextInput;