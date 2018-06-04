
import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const { windowWidth, fontSize, fontFamily, normalize, color } = theme;

const styles = StyleSheet.create({
    container:{
        marginBottom: 15,
    },

    inputContainer:{
        width: windowWidth - 80,
        height: normalize(45),
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
        paddingLeft: 20,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: color.white,
        color: color.light_grey,
    },
    viewContainer:{
        width: windowWidth - 80,
        height: normalize(45),
        flexDirection: "row",
        padding: 0,
    },
    emailContainer:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
        color: color.light_grey,
        
    },
    containerStyle:{
        margin: 0,
        width: "60%",
        height: normalize(45),
        height: "100%",
        borderColor: color.white,
        borderRadius: 6,
        borderWidth: 2,
        paddingLeft: 20,
        marginLeft: 0,
    },
    textLabelContainer:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
        color: color.light_grey,
        justifyContent: "center",
    },
    centerme:{
        justifyContent: "center",
        width: "40%",
    }
});

export default styles;