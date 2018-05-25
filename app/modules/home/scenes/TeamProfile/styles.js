import { Platform, StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: (Platform.OS) === 'ios' ? 0 : 24,
        justifyContent: "center",
        alignItems: "center",
    },

    content:{
        flex: 8,
        // backgroundColor: "black",   
        width: windowWidth - 60,
        paddingVertical: padding * 2,
        // paddingHorizontal: padding / 3,
    },

    topContent:{
        // backgroundColor: color.rainbowBlueBlue,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title:{
        color: color.white,
        fontSize: fontSize.large,
        fontFamily: fontFamily.regular,
    },

    button:{
        backgroundColor: color.mainGreen,
    },

    liTitle:{
        color: color.white,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
    },

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
    },

    modalLowerContainer:{

    },

    modalButtonContainer:{

    },

    modalText:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
    }
});

export default styles;