import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1
    },
  
    

    mainbackground:{
        backgroundColor: '#000000',
        alignItems:"center",
        flex: 1

    },

    textStyle: {
    	color: "#FFF", 
    	backgroundColor: '#00d080', 
    	height: 45, width: '90%', 
    	alignItems: "center", 
    	textAlign: "center",
    	justifyContent: 'center', 
    	lineHeight: 45,
    	
    },
    bottomBox: {
    	flex: 1, 
    	width: "100%", 
    	alignItems: "center",
		margin: 25
    },

    crossHair:{
    	position: 'absolute', 
    	width: '90%', 
    	height: '100%',
    	resizeMode: 'contain'
    },
    topBox: {
    	flex: 5, 
    	alignSelf: 'stretch',
    	margin: 25,
    	alignItems:"center"
    },
    barCode:{
    	flex: 1, 
    	alignSelf: 'stretch'
    }

});

export default styles;