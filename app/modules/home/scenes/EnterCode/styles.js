import { Platform, StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const styles = StyleSheet.create({
    container:{
        // flex:1,
        // flexDirection: "column",
        // height: "100%",
        // width: "100%",
        // justifyContent:"center",
        // alignItems:"center",
        flex:1, // child must have defined sizes
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS) === 'ios' ? 0 : 24,
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
    },

    bottomContainer:{
        // backgroundColor:"green",
        flex: 10,
        paddingVertical: padding,
        width: windowWidth,
        // paddingHorizontal: padding * 3,
        // shadowColor: "#000000",
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // shadowOffset: {
        //     height: 1,
        //     width: 0
        // },
        justifyContent: "flex-start",
        alignItems: "center",
    },

    bottomContainer:{
        // backgroundColor:"green",
        flex: 10,
        paddingVertical: padding,
        width: windowWidth,
        // paddingHorizontal: padding * 3,
        // shadowColor: "#000000",
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // shadowOffset: {
        //     height: 1,
        //     width: 0
        // },
        justifyContent: "flex-start",
        alignItems: "center",
    },

    buttonContainer:{
        // backgroundColor: "pink",
        width: windowWidth - 60,
        justifyContent:"center",
        alignItems:"center"
    },

    titleContainer:{
        width: "100%",
        paddingHorizontal: 12,
        // backgroundColor: "powderblue",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginBottom: padding + 18,
    },

    title:{
        // fontSize: fontSize.large + 2,
        fontSize: fontSize.larger,
        lineHeight: fontSize.larger + 5,
        fontFamily: fontFamily.heavy,
        color:color.white,
        marginBottom: 5,
    },


    bottom:{
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        marginTop: padding * 2,
    },

    // mainbackground:{
    //     backgroundColor: '#000000',
    //     alignItems:"center",
    //     flex: 1,
    //     height: "100%",
    //     width: "100%",

    // },

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
    // title: {
    //     fontSize:fontSize.large + 5,
    //     lineHeight:fontSize.large + 7,
    //     fontFamily: fontFamily.medium,
    //     color: color.mainGreen,
    //     letterSpacing: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     textAlign: 'center',
    // },
});

export default styles;