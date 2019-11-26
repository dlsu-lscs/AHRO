import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: "100%",
    },
  
    cardStyle:{
        // flex: 1,
        // width: "100%",
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        // backgroundColor: color.grey,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,
    },
    rankStyle:{
        //justifyContent:"center",
        alignItems:"center",
        // width: "33%",
        flex: 3,
    },
    pointStyle:{
        //justifyContent:"center",
        alignItems:"center",
        // width: "33%",
        flex: 3,
    },
    nameStyle:{
        // width: "33%",
        flex: 6,
    },
    genText:{
        color: color.white,
        fontFamily: fontFamily.regular,
        fontSize: fontSize.regular,
    },
    headerText:{
        color: color.white,
        fontFamily: fontFamily.light,
        fontSize: fontSize.small,
        paddingVertical: 5,
    }
});

export default styles;