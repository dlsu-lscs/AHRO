import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Font, FontAwesome, AppLoading } from 'expo';

import Router from './app/config/routes'
import store from './app/redux/store';

import MaterialIcons  
from './node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
        }
    }

    
    async _loadAssetsAsync() {
        const fontAssets = cacheFonts([
            // {RobotoExtraBold: require('./app/assets/fonts/Roboto-Black.ttf')},
            // {RobotoBold: require('./app/assets/fonts/Roboto-Bold.ttf')},
            // {RobotoMedium: require('./app/assets/fonts/Roboto-Medium.ttf')},
            // {RobotoRegular: require('./app/assets/fonts/Roboto-Regular.ttf')},
            // {RobotoLight: require('./app/assets/fonts/Roboto-Light.ttf')},
            {FuturaPTBold: require('./app/assets/fonts/FuturaPTBold.otf')},
            {FuturaPTBook: require('./app/assets/fonts/FuturaPTBook.otf')},
            {FuturaPTExtraBold: require('./app/assets/fonts/FuturaPTExtraBold.otf')},
            {FuturaPTHeavy: require('./app/assets/fonts/FuturaPTHeavy.otf')},
            {FuturaPTLight: require('./app/assets/fonts/FuturaPTLight.otf')},
            {FuturaPTMedium: require('./app/assets/fonts/FuturaPTMedium.otf')},
            
        ]);

        await Font.loadAsync({
            // FontAwesome,
            MaterialIcons
        });

        // await Font.loadAsync({
        //     FontAwesome,
        //     MaterialIcons,
        //     Ionicons
        //   });

        await Promise.all([...fontAssets]);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({isReady: true})}
                    onError={console.warn}
                />
            );
        }
        
        return (
            <Provider store={store}>
                    <Router/>
            </Provider>
        );
    }
}