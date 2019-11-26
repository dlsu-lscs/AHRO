import { Platform, StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

var { Dimensions } = require('react-native')


const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: (Platform.OS) === 'ios' ? 0 : 24,
    },
    loader:{
        width: "300%", 
        height: "300%",
        position: 'absolute', 
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    activityIndicator: {
        position: 'absolute',
        top: height * 2 / 3,
        left: width / 2 - 13,
    },
    
    content:{
        // flex: 0,
        flex: 1,
        padding: padding,  
        // height: "100%",
        // backgroundColor: 'powderblue',
    },

    topContainer: {
        flexDirection: 'row',
        paddingTop: 30,
        paddingBottom: 20,
        // alignItems: 
    },

    leftContainer: {
        flex: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    rightContainer: {
        flex: 7,
    },

    userInfoContainer: {
        marginBottom: 10,
    },

    avatar:{
        width: "100%",
        resizeMode: "contain",
    },

    pointContainer: {
        flexDirection: 'row',
    },

    pointLabel: {
        fontFamily: fontFamily.bold,
        fontSize: fontSize.regular,
        color: color.white,
    },

    points:{
        fontFamily: fontFamily.regular,
        fontSize: fontSize.regular,        
        color: color.white,
    },

    pointEmphasis:{
        color: color.mainGreen,
    },

    signOutText: {
        color: color.mainGreen,
        fontFamily: fontFamily.regular,
        fontSize: fontSize.regular + 2,
    },

    emphasis:{
        fontFamily: fontFamily.bold,
        color: color.white,
    },

    name:{
        fontSize: fontSize.large,
    },

    username:{
        color: color.grey,
        fontFamily: fontFamily.regular,
        fontSize: fontSize.regular,
    },
   
    
    // LEADERBOARD
    topNav:{
        width: "100%",
        //backgroundColor: color.red,
        borderBottomColor: color.white,
        borderBottomWidth: 1,
        flexDirection: 'row',
        margin: 5,
    },

    leaderBoardContainer: {
        flex: 1,
        
    },
    leaderContainer:{
        flexDirection: 'row',
    },
    refreshStyle: {
        marginLeft: 5,
        justifyContent:"center",
        alignItems:"center",
    },

    leaderBoardText:{
        color: color.white,
        fontSize: fontSize.large,
        fontFamily: fontFamily.regular,
        marginLeft: padding * 2,
    },

    filterView:{
        flexDirection: 'row',
        paddingTop: 10,
        alignItems: 'flex-end',
        justifyContent:"flex-end",
        alignSelf: 'flex-end',
        padding: 0,
        flex: 0,
        marginHorizontal: padding * 2,
        // width: "50%",
    },
    buttonView:{
        //width: 100,
        flex: 1,
        margin: 0,
        borderColor: color.white,
        borderWidth: 1,
        //backgroundColor: color.black,
        // width: "33%",
        
    },
    
    filterButton:{
        backgroundColor: color.white,
        height: 30,
        margin: 0,
        width: "100%",
        justifyContent:"center",
        alignItems:"center",
    },
    offButton:{
        //backgroundColor: color.black,
        height: 30,
        margin: 0,
        width: "100%",
        justifyContent:"center",
        alignItems:"center",
    },
    buttonText:{
        color: color.white,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
    },
    itemText:{
        color: color.black,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
    },
    board: {
        borderBottomColor: color.white,
        borderBottomWidth: 1,
        justifyContent:"center",
        alignItems:"center",
        // width: "100%",
        marginHorizontal: padding * 2,
        flex: 1,
        // height: 200,
    },
    check: {
        color: color.mainGreen,
        
    }
});

export default styles;