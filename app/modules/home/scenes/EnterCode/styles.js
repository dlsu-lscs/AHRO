import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: "column",
        height: "100%",
        width: "100%",
        justifyContent:"center",
        alignItems:"center",
    },
  
    

    mainbackground:{
        backgroundColor: '#000000',
        alignItems:"center",
        flex: 1,
        height: "100%",
        width: "100%",

    },

    topview:{
        justifyContent:"center",
        alignItems:"center",
        width: "100%",
        marginBottom: 10,

    },

    bottomview:{
        width: "100%",
        margin: 10,
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputstyle:{
        //flex: 1,
        //alignSelf: 'stretch',
        //height: 10,
        width: (windowWidth-90),
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    submitbutton:{
        margin: 5,
        alignItems: "center", 
        width: "100%",

    },
    submitbutton2:{
        //flex: 1,
        //alignSelf: 'stretch',
        backgroundColor: '#00d080',
        //height: 10,
        width: (windowWidth-90),
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize:fontSize.large + 5,
        lineHeight:fontSize.large + 7,
        fontFamily: fontFamily.medium,
        color: color.mainGreen,
        letterSpacing: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
});

export default styles;