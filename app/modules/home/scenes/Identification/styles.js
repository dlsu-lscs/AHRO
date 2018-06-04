import { StyleSheet, Platform } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;
import { Ionicons } from '@expo/vector-icons';

const resizeMode = 'contain';

const styles = StyleSheet.create({
    kav: {
        height: "100%",
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    container:{
        // flex:1,
        // flexDirection: "column",
        // height: "100%",
        // width: "100%",
        // justifyContent:"center",
        // alignItems:"center",
        flex:1,
        // height: "100%",
        // width: "100%",
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: (Platform.OS) === 'ios' ? 0 : 24,
        
    },

    points:{
        fontFamily: fontFamily.light,
        fontSize: fontSize.regular,
        color: color.light_grey,
        alignSelf: "center",
        textAlign: "center",
        marginBottom: 10,
    },
  
    content:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    
    topContainer:{
        marginTop: 12,
        paddingHorizontal: 12,
        // flex:1,
        height: 50,
        justifyContent:"center",
        alignItems:"flex-start",
        // backgroundColor: "#FF553F",
        width: windowWidth - 60,
        // backgroundColor: color.red,
    },

    mainbackground:{
        backgroundColor: '#000000',
        alignItems:"center",
        flex: 1,
        height: "100%",
        width: "100%",

    },

    topview:{
        // justifyContent:"center",
        // alignItems:"center",
        // width: "100%",
        // margin: 15,
        alignItems: 'flex-end',
        justifyContent:"flex-end",
        color: color.light_black,
        marginHorizontal: padding * 3,
        padding: 10,  
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
        fontSize:fontSize.larger,
        // lineHeight:fontSize.large + 7,
        fontFamily: fontFamily.medium,
        color: color.white,
        // letterSpacing: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
});

export default styles;