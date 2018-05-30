import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { actions as auth } from "../../index"
const { createUser } = auth;

var {ImageBackground } = require('react-native');
import Form from "../../components/Form"

const fields = [
    {
        key: 'username',
        label: "Username",
        placeholder: "Username",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text"
    },
    {
        key: 'fname',
        label: "First Name",
        placeholder: "First Name",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text"
    },
    {
        key: 'lname',
        label: "Last Name",
        placeholder: "Last Name",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text"
    },
    {
        key: 'idnumber',
        label: "I.D. number",
        placeholder: "I.D. number",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text"
    },

];

const error = {
    general: "",
    username: "",
    fname: "",
    lname: "",
    idnumber: ""
}

class CompleteProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages

        //attach user id
        const { user } = this.props;
        data['uid'] = user.uid;
        
        this.props.createUser(data, this.onSuccess, this.onError)
    }

    onSuccess() {
        Actions.Main()
    }

    onError(error) {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }

        this.setState({error: errObj});
    }

    render() {
        return (
            <ImageBackground 
                source = {require('../../../../assets/images/theme-bg.png')}
                style = {{width: "100%", height: "100%"}}>
                <Form fields={fields}
                      showLabel={false}
                      onSubmit={this.onSubmit}
                      buttonTitle={"CONTINUE"}
                      error={this.state.error}/>
            </ImageBackground>
        );
    }
}

export default connect(null, { createUser })(CompleteProfile);
