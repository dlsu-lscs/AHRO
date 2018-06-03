import { StyleSheet } from 'react-native';

import { color, fontFamily, padding, fontSize } from "../../styles/theme"


var { Dimensions } = require('react-native')


const {width, height} = Dimensions.get("window");

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: color.white
    },

    wrapper:{
        paddingHorizontal:15,
        paddingBottom: padding * 2,
        justifyContent:"center",
        alignItems:"center"
    },

    image:{
        height: 100,
        width: 100,
        backgroundColor: color.grey,
        marginBottom: padding,
        resizeMode
    },

    title: {
        fontSize:fontSize.large + 5,
        lineHeight:fontSize.large + 7,
        fontFamily: fontFamily.medium,
        color: "#FF553F",
        letterSpacing: 1
    },

    activityIndicatorContainer: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",

    },

    activityIndicator: {
        position: 'absolute',
        top: height * 2 / 3,
        left: width / 2 - 13,
    },
    
    logo:{
        width: "55%",
        resizeMode: "contain",
    },
});


export default styles;