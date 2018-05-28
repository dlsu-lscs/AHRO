import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: "column",
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
        //flexDirection: 'row',
        //backgroundColor: '#000000',
        width: "100%",
        height: "100%",
        margin: 10,
        marginBottom: 25,
    },
    inputstyle:{
        flex: 1,
        alignSelf: 'stretch',
        //backgroundColor: '#FFFF00',
        height: "80%",
        width: (windowWidth-90),
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        //width: windowWidth - 40,
        //height: normalize(65),
        //fontSize: fontSize.regular + 2,
        //fontFamily: fontFamily.bold,
        //borderBottomColor: "#A5A7A9"
    },
    submitbutton:{
        flex: 1,
        //backgroundColor: '#FF0000',
        alignItems: "center", 
        width: "100%",
        height: "100%",

    },
    submitbutton2:{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#00d080',
        height: "70%",
        width: (windowWidth-90),
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize:fontSize.large + 5,
        lineHeight:fontSize.large + 7,
        fontFamily: fontFamily.medium,
        color: "#FF553F",
        letterSpacing: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
});

export default styles;