
import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        //backgroundColor: color.black,

    },
    labelText:{
        color: color.white,
        fontSize: 13,
    },
    bottom:{
        width: "100%",
        flexDirection: 'row',
    },
    timerComponent:{
        width: "50%",
        flexDirection: 'row',
        justifyContent:"center",
        alignItems:"center",
    },
    timerContainer:{
        justifyContent:"center",
        alignItems:"center",
    },
    timeNumber:{
        fontSize: 30,
        color: color.white,
    },
    timeLabel:{
        fontSize: 20,
        color: color.white,
    },
    buttonComponent:{
        width: "50%",
        justifyContent:"center",
        alignItems:"center",
    },
    buttonQuiz:{
        width: "100%",
        borderRadius: 10,
        borderColor: color.white,
        borderWidth: 2,
        backgroundColor: color.black,
        justifyContent:"center",
        alignItems:"center",
        padding: 2,
        
    },
    disabledQuiz:{
        width: "100%",
        borderRadius: 10,
        borderColor: color.white,
        borderWidth: 2,
        backgroundColor: color.black,
        justifyContent:"center",
        alignItems:"center",
        padding: 2,
        opacity: 0.5,
        
    },
    quizText:{
        color: color.white,
    }
});

export default styles;