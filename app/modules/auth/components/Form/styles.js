import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     // backgroundColor: color.white,
    // },

    wrapper:{
        // width: "100%",
        // backgroundColor: "palegoldenrod",
        paddingHorizontal: padding,
        justifyContent:"flex-start",
        alignItems:"center"
    },

    errorText:{
        color: color.red,
        width: (windowWidth - 45),
        marginTop: 20,
    },

    containerView:{
        width: windowWidth - 80,
        marginVertical: padding,
    },

    socialButton:{
        height: normalize(55),
        borderRadius:4,
        marginTop:0,
        marginBottom:0
    },

    button:{
        // backgroundColor: "#FF553F",
        backgroundColor: "rgba(6,200,128,1.0)",
        height: normalize(55),
        paddingHorizontal: 20,
    },

    buttonText:{
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium,
    },

    forgotText:{
        textAlign:"center",
        color: color.white,
        marginBottom: padding,
        fontSize: fontSize.regular + 1,
        fontFamily: fontFamily.regular,
        textDecorationLine: "underline",
        marginTop: padding,
    }
});


export default styles;