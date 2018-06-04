import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    
    modalContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000070",
    },

    modalFormContainer:{
        width: windowWidth - 50,
        borderRadius: 4,
        backgroundColor: color.white,
        paddingVertical: padding * 4,
        paddingHorizontal: padding * 3,
        backgroundColor: color.white,
    },

    modalForm:{
        // marginTop: 20,
        justifyContent:"flex-start",
        alignItems:"flex-start",
    },

    modalLowerContainer:{
        flexDirection: "row",
        alignItems: "flex-end",
        alignSelf: "flex-end",
    },

    modalButtonContainer:{

    },

    modalText:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
        marginBottom: 15,
    },

    errorText:{
        color: color.red,
        width: (windowWidth - 45),
    },

    containerView:{
        width: windowWidth - 80,
        marginVertical: padding,
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

    hideModal:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
        color: color.darker_grey,
    },

    submitModal:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
        marginLeft: 15,
    },
});


export default styles;