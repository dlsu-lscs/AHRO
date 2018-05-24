
import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#000000',
        color: color.white,

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
    nextText: {
    	marginTop: 40,
    },
    IconView: {
    	height: '40%',
    	width: '100%',
    	backgroundColor: color.white,
    	justifyContent:"center",
        alignItems:"center",
    },
    IconImage: {
    	backgroundColor: '#000000',
    	width: 200,
    	height: 200,
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