
import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#000000',

    },
    content:{
    	justifyContent:"center",
        alignItems:"center",
    },
    topText:{
    	marginTop: 40,
    	fontWeight: 'bold',
    	color: color.mainGreen,
    },
    doneText:{
        marginTop: 40,
        fontWeight: 'bold',
        color: color.warning,
    },
    errorText:{
        marginTop: 40,
        fontWeight: 'bold',
        color: color.red,
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
    },

    backButton: {
    	backgroundColor: color.mainGreen,
    	width: 150,
    	marginTop: 20

    }

});

export default styles;