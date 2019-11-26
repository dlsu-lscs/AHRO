
import { Platform, StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        // flex:1,
        backgroundColor: '#000000',
        flex:1,
        paddingTop: (Platform.OS) === 'ios' ? 0 : 24,
        justifyContent: "center",
        alignItems: "center",
    },
    content:{
    	justifyContent: "center",
        alignItems: "center",
        margin: padding * 4,
    },
    topText:{
    	marginTop: 20,
    	// fontWeight: 'bold',
        color: color.mainGreen,
        fontFamily: fontFamily.bold,
        fontSize: fontSize.large,
        width: windowWidth - windowWidth / 4,
        
    },
    doneText:{
        marginTop: 20,
        // fontWeight: 'bold',
        color: color.warning,
        fontFamily: fontFamily.bold,
        fontSize: fontSize.large,
        width: windowWidth - windowWidth / 4,
    },
    errorText:{
        marginTop: 20,
        // fontWeight: 'bold',
        color: color.red,
        fontFamily: fontFamily.bold,
        fontSize: fontSize.large,
        width: windowWidth - windowWidth / 4,
    },
    nextText: {
    	marginTop: 40,
    },
    IconView: {
        width:"100%",
    	justifyContent:"center",
        alignItems:"center",
    },
    IconImage: {
    	width: 220,
    	height: 220,
        justifyContent:"center",
        alignItems:"center",
    },
    generalText:{
        color: color.white,
        fontFamily: fontFamily.regular,
        fontSize: fontSize.regular,
        textAlign: "center",
    },

    winnerText:{
        fontSize: 25,
    },
    backButton: {
    	backgroundColor: color.mainGreen,
    	width: 150,
    	marginTop: 20

    },
    confTop:{
        marginTop: 0,
    }

});

export default styles;