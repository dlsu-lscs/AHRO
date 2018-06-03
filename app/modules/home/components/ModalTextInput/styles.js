import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const { windowWidth, fontSize, fontFamily, normalize, color } = theme;

const styles = StyleSheet.create({
    container:{
        marginBottom: 15,
        width: "100%",
        // backgroundColor: "orange",
        // paddingTop: 15,
        flexDirection: "row",
        padding: 0,
        paddingLeft: 0,
    },

    inputStyle:{
        // width: windowWidth - 80,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
    }, 

    containerStyle:{
        // backgroundColor: "pink",
        marginLeft: 0,
        // width: windowWidth - 150,
        width: "100%",
        height: normalize(45),
        paddingLeft: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: color.darker_grey,
        margin: 0,
        // flex: 1,
    },
});

export default styles;