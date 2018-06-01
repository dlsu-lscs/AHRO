import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        height: "100%",
        width: "100%",

    },
    mainView:{
        height: "100%",
        width: "100%",
        padding: 25,
        paddingTop: 60,
    },
    topView:{
        height: "40%",
        width: "100%",
        alignItems: 'center',
        justifyContent:"center",
    },
    midView:{
        height: "60%",
        width: "100%",
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 5,
        padding: 10,
    },
    buttonContainer:{
        width: "100%",
        height:"90%",
    },
    buttonView:{
        width: "100%",
        height: "25%",
        padding: 5,
    },
    buttonStyle:{
        width: "100%",
        height: "100%",
        //backgroundColor: 'rgb(190,200,190)',
        //borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent:"center",

        backgroundColor: 'rgb(220,220,220)',
    },
    optionStyle:{
    },
    selectedStyle:{
        //backgroundColor: color.mainGreen,
        borderWidth: 3,
        borderColor: color.mainGreen,
    },
    autoFit:{
        fontSize: 16,
        alignItems: 'center',
        justifyContent:"center",
    },
    botView:{
        paddingLeft: 5,
        paddingRight: 5,
        width: "100%",
        height:"10%",
        
    },
    submitBotton:{
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent:"center",
        //borderRadius: 10,
        padding: 5,
        backgroundColor: color.mainGreen,
    },
    title: {
        fontSize:fontSize.large + 5,
        lineHeight:fontSize.large + 7,
        fontFamily: fontFamily.medium,
        color: color.mainGreen,
        letterSpacing: 1,
    },
});

export default styles;