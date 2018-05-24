import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        height: "100%",
        width: "100%",

    },
  
    

    mainbackground:{
        backgroundColor: '#000000',
        alignItems:"center",
        flex: 1,
        height: "100%",
        width: "100%",

    },

    topview:{
        flex:2,
        justifyContent:"center",
        alignItems:"center",
        height: "100%",
        width: "100%",
        backgroundColor: '#000000',
    },

    bottomview:{
        flex:1,
        flexDirection: 'row',
        height: "100%",
        width: "100%",
    },

    leftview:{
        flex: 1,
        height: "100%",
        width: "100%",

    },

    somethingview:{
        flex:1,
        height: "100%",
        width: "100%",
        alignSelf: 'stretch',
        margin: 2,

    },
    choices:{
        height: "100%",
        width: "100%",
        borderColor: '#d6d7da',
        backgroundColor: '#00d080',
    },
    title: {
        fontSize:fontSize.large + 5,
        lineHeight:fontSize.large + 7,
        fontFamily: fontFamily.medium,
        color: "#FF553F",
        letterSpacing: 1,
    },
});

export default styles;