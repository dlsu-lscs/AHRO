
import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const { windowWidth, fontSize, fontFamily, normalize } = theme;

const styles = StyleSheet.create({
    container:{
        marginBottom: 15
    },

    inputContainer:{
        width: windowWidth - 80,
        // width: "100%",
        height: normalize(45),
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.regular,
        paddingLeft: 20,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#fff",
        color: "#fff",
    }
});

export default styles;