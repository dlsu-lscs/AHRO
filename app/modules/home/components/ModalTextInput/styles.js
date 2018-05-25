import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const { windowWidth, fontSize, fontFamily, normalize, color } = theme;

const styles = StyleSheet.create({
    container:{
        marginBottom: 15,
        width: "100%",
        backgroundColor: "orange",
        // paddingTop: 15,
        flexDirection: "row",
        padding: 0,
    },

    inputStyles:{
        // width: windowWidth - 80,
        // width: "100%",
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
        color: "#fff",
    }, 

    containerStyle:{
        backgroundColor: "pink",
        width: windowWidth - 150,
        height: normalize(45),
        paddingLeft: 10,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: color.light_grey,
        margin: 0,
        // flex: 1,
    },
});

export default styles;