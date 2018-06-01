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
        width: "100%",
        flexDirection: 'row',
        //backgroundColor: color.red,
    },
    rankStyle:{
        //justifyContent:"center",
        alignItems:"center",
        width: "33%",
    },
    pointStyle:{
        //justifyContent:"center",
        alignItems:"center",
        width: "33%",
    },
    nameStyle:{
        width: "33%",
    },
    genText:{
        color: color.white,
    },
});

export default styles;