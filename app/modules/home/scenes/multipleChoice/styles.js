import { StyleSheet, Platform } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        height: "100%",
        width: "100%",
        paddingTop: (Platform.OS) === 'ios' ? 0 : 24,
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
        alignSelf: "center",
        // backgroundColor: color.red,
    },
    mainView:{
        // height: "100%",
        // width: "100%",
        flex: 1,
        // padding: 25,
        // paddingTop: 60,
    },
    topView:{
        // height: "40%",
        // width: "100%",
        flex: 3,
        alignItems: 'flex-end',
        justifyContent:"flex-end",
        color: color.light_black,
        marginHorizontal: padding * 3,
        padding: 10,        
    },
    midView:{
        flex: 8,
        marginBottom: padding * 4,
        marginHorizontal: padding * 3,
        // height: "60%",
        // width: "100%",
        //backgroundColor: 'rgb(255,255,255)',
        borderRadius: 5,
        padding: 10,
    },
    buttonContainer:{
        flex: 1,
        marginBottom: padding,
        width: "100%",
        // backgroundColor: color.mainGreen,
        // height:"90%",
    },
    buttonView:{
        width: "100%",
        // height: "25%",
        flex: 3,
        // padding: 5,
    },
    buttonStyle:{
        width: "100%",
        height: "100%",
        //backgroundColor: 'rgb(190,200,190)',
        //borderRadius: 10,
        // padding: 10,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems:"center",
        paddingVertical: padding + padding / 2,
        paddingHorizontal: padding * 4,
        // backgroundColor: 'rgb(220,220,220)',
        // backgroundColor: color.white,
        
    },
    buttonTop:{
        borderTopColor: color.white,
        borderTopWidth: 1,
        borderBottomColor: color.white,
        borderBottomWidth: 0.5,
    },
    buttonMid:{
        borderTopColor: color.white,
        borderTopWidth: 0.5,
        borderBottomColor: color.white,
        borderBottomWidth: 0.5,
    },
    buttonBottom:{
        borderTopColor: color.white,
        borderTopWidth: 0.5,
        borderBottomColor: color.white,
        borderBottomWidth: 1,
    },
    optionStyle:{
    },
    selectedStyle:{
        //backgroundColor: color.mainGreen,
        // borderRightWidth: 5,
        // borderColor: color.mainGreen,
        backgroundColor: "#FFFFFF40",
        // backgroundColor: "#8defc9",
    },
    autoFit:{
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.regular,
        color: color.white,
        alignItems: 'center',
        flex: 1,
        flexWrap: 'wrap',
        justifyContent:"center",
    },
    botView:{
        flex: 2,
        // paddingLeft: 5,
        // paddingRight: 5,
        width: "100%",
        // backgroundColor: "yellow",
        justifyContent: "flex-end",
        alignItems: "center",
        // height:"10%",
    },
    submitBotton:{
        // width: "100%",
        // height: "100%",
        // flex: 1,
        alignItems: 'center',
        justifyContent:"center",
        width: "100%",
        //borderRadius: 10,
        // padding: 5,
        backgroundColor: color.mainGreen,
    },
    submitbutton:{
        backgroundColor: color.mainGreen,
        // width: "100%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    points:{
        fontFamily: fontFamily.light,
        fontSize: fontSize.regular,
        color: color.light_grey,
        alignSelf: "center",
        textAlign: "center",
        marginBottom: 10,
    },
    title: {
        fontSize:fontSize.larger,
        // lineHeight:fontSize.large + 7,
        fontFamily: fontFamily.medium,
        color: color.white,
        alignSelf: "flex-end",
        textAlign: "center",
        marginBottom: padding,
        // letterSpacing: 1,
    },
    letterChoice: {
        color: color.mainGreen,
        fontFamily: fontFamily.bold,
        fontSize: fontSize.regular + 2,
        marginRight: padding * 4,
    }
});

export default styles;