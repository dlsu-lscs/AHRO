import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1
    },
  
    

    scanButton:{
        backgroundColor: color.mainGreen,
        alignSelf: 'flex-end'

    }
});

export default styles;