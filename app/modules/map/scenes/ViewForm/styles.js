import {StyleSheet} from 'react-native';
import {theme} from "../../index"

const {padding, color, fontSize, windowWidth, normalize} = theme;

const resizeMode = 'contain';


var {Dimensions} = require('react-native')

const {width, height} = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

const styles = StyleSheet.create({
    container: {
        //overflow: "scroll",
        flex: 1,
    },
    image: {
        width: width,
        height: height / 3,
    },
    title: {
        color: '#000',
        fontSize: 22,
        fontWeight: '600',
        lineHeight: 50
    },
    description: {
        color: '#333',
        fontSize: 14
    },
    body: {
        flex: 1,
        padding: 15
    },
    closeText: {
        color: 'white',
        backgroundColor: 'transparent'
    },
    closeButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'white',
        borderRadius: 5
    }
});

export default styles;