import { Platform, StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1, // child must have defined sizes
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: (Platform.OS) === 'ios' ? 0 : 20,
        // paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        paddingTop: (Platform.OS) === 'ios' ? 0 : 24,
    },

    linearGradient:{
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 0 : 24,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
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

    image:{
        height: 100,
        width: 100,
        backgroundColor: color.grey,
        marginBottom: padding,
        resizeMode
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

    subTitle:{
        // fontSize: fontSize.large + 2,
        fontSize: fontSize.regular,
        // lineHeight: fontSize.regular + 4,
        fontFamily: fontFamily.regular,
        color:color.white,
        letterSpacing: 1
    },

    subText:{
        color: "#414141",
        fontSize: fontSize.large,
        lineHeight: fontSize.large + 10,
        marginVertical:padding * 2
    },

    //===============================

    logoContainerLeft:{
        flex: 2,
        // paddingTop: padding * 3,
        //  backgroundColor: "#4d4",
        width: windowWidth - 80,
        justifyContent: "center",
        alignItems: 'center',
        height: 150
    },

    logoContainerRight:{
        height: "100%",
        flex: 1,
        width: 60,
        // paddingTop: padding * 3,
        // backgroundColor: "#d44",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },

    logoContainer:{
        flex: 3,
        paddingTop: padding * 3,
         // backgroundColor: "#fff",
        width: windowWidth,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },

    logo:{
        width: "80%",
        resizeMode: "contain",
    },
    logoRight:{
        width: 50,
        height: 50,
        resizeMode: "contain",
    },

    //===============================

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

    containerView:{
        // width: windowWidth - 40
    },

    socialButton:{
        height: normalize(55),
        borderRadius:4,
        marginTop:0,
        marginBottom:0
    },

    button:{
        backgroundColor: "#FF553F",
        height: normalize(55)
    },

    buttonText:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular
    },

    bottom:{
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        marginTop: padding * 2,
    },

    bottomText:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
        marginRight: 5,
        color: "#fff",
        textDecorationLine: "underline",
    },

    signInText:{
        fontSize: fontSize.regular,
        color: "#FF553F",
        fontFamily: fontFamily.regular
    },

    orContainer:{
        justifyContent:"center",
        alignItems:"center",
        height: 40,
        width: windowWidth
    },

    divider:{
        backgroundColor: '#D0D5DA',
        position:"absolute",
        top:19,
        left: 20,
        right: 20
    },

    orText:{
        backgroundColor: color.white,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
        color: "#414141",
        paddingHorizontal: padding
    }
});

export default styles;