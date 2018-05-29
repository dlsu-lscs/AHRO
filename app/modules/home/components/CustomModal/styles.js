import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    
    modalContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000060",
    },

    modalFormContainer:{
        width: windowWidth - 50,
        borderRadius: 4,
        backgroundColor: color.white,
        paddingVertical: padding * 4,
        paddingHorizontal: padding * 3,
        backgroundColor: "powderblue",
    },

    modalForm:{
        marginTop: 20,
        backgroundColor: "yellow",
        justifyContent:"flex-start",
        alignItems:"flex-start",
    },

    modalLowerContainer:{

    },

    modalButtonContainer:{

    },

    modalText:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
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
});


export default styles;