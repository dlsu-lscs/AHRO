import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: '100%',
        height: '100%'
    },

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center"
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },

    touchable: {
        borderWidth: 1,
        borderRadius: 4,
        margin: 8,
        padding: 8,
        width: '95%',
    }
});

export default styles;