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

    topview:{
        flex:2,
        justifyContent:"center",
        alignItems:"center"
    },

    bottomview:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#000000',
    },

    leftview:{
        flex: 1

    },

    rightview:{
        flex: 1
    },

    choices:{
        margin: 10
    },
    title: {
        fontSize:fontSize.large + 5,
        lineHeight:fontSize.large + 7,
        fontFamily: fontFamily.medium,
        color: "#FF553F",
        letterSpacing: 1,
    },
});

export default styles;