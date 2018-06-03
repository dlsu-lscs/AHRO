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

    topRightContainer:{
        flexDirection: "row",
        alignItems: "flex-end",
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
        marginBottom: 30, 
    },

    midContent:{
        paddingLeft: padding * 3,
    },

    bottomContent:{
        position: "absolute",
        bottom: 0,
    },

    title:{
        color: color.white,
        fontSize: fontSize.large,
        fontFamily: fontFamily.regular,
    },

    button:{
        backgroundColor: color.mainGreen,
    },

    listTitle:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
        color: color.mainGreen,
        marginBottom: 10,
    },

    liContainer:{
        borderBottomWidth: 0,
        paddingVertical: 12,
        paddingLeft: 0,
        marginLeft: 0,
    },

    liTitleLight:{
        color: color.white,
        fontSize: fontSize.large - 2,
        fontFamily: fontFamily.regular,
        marginLeft: 0,
    },

    liTitleDark:{
        color: color.black,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
    },

    scoresContainer: {
        marginBottom: padding * 3,
    },

    rowContainer: {
        flexDirection: "row",
        paddingVertical: 2,
        alignItems: "center",
    },

    regular:{
        fontFamily: fontFamily.regular,
        fontSize: fontSize.regular,
    },

    bold:{
        fontFamily: fontFamily.bold,
        fontSize: fontSize.regular,
    },

    white:{
        color: color.white,
    },

    accent:{
        color: color.mainGreen,
    },

    // MODAL STUFF
    modalContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000060",
    },

    modalWindowContainer:{
        marginTop: (Platform.OS) === 'ios' ? 0 : 24,
        width: windowWidth - 40,
        height: "50%",
        borderRadius: 4,
        backgroundColor: color.white,
        paddingVertical: padding * 4,
        paddingHorizontal: padding * 3,
    },

    modalTitle:{
        fontSize: fontSize.large,
        fontFamily: fontFamily.medium,
        marginBottom: 10,
    },

    modalLowerContainer:{

    },

    modalButtonContainer:{

    },

    // CARD STUFF
    cardContainer:{
        // flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        // flex: 1,
        width: "100%",
        borderWidth: 0,
        // backgroundColor: "red",
        margin: 0,
        padding: 0,
        marginBottom: 10,
        borderWidth: 0,
    },

    cardTextLeft:{
        flex: 3,
        fontFamily: fontFamily.regular,
        fontSize: fontSize.regular,
        // backgroundColor: "orange",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        padding: 0,
        margin: 0,
    },

    cardRightButtonView:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "flex-end",
        flex:4,
        // backgroundColor: color.rainbowBlueGreen,
    },

    filledButton:{
        borderRadius: 4,
        paddingHorizontal: 7,
        paddingVertical: 4,
        backgroundColor: color.mainGreen,
        borderWidth: 1,
        borderColor: color.mainGreen,
        width: "48%",
    },

    filledButtonText:{
        color: color.white,
    },

    transparentButton:{
        borderRadius: 4,
        borderWidth: 1,
        paddingHorizontal: 7,
        paddingVertical: 4,
        borderColor: color.grey,
        width: "48%",               
    },

    transparentButtonText:{
        color: color.grey, 
    },

    toButton:{
        width: "100%",
    }
});

export default styles;