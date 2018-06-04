
import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        // backgroundColor: "pink",
        // flex: 0,
        flex: 0,
    },
    labelText:{
        color: color.white,
        fontSize: fontSize.small,
        fontFamily: fontFamily.light,
        marginLeft: padding * 2,
        marginTop: 15,
    },
    bottom:{
        width: "100%",
        flexDirection: 'row',
    },
    timerComponent:{
        width: "50%",
        marginLeft: padding * 2,
        flexDirection: 'row',
        justifyContent:"flex-start",
        alignItems:"flex-start",
    },
    timerContainer:{
        justifyContent:"center",
        alignItems:"center",
    },
    timeNumber:{
        fontSize: fontSize.title - 2,
        fontFamily: fontFamily.medium,
        color: color.white,
    },
    timeLabel:{
        fontSize: 20,
        fontFamily: fontFamily.regular,        
        color: color.white,
    },
    buttonComponent:{
        width: "50%",
        alignItems:"flex-end",
        justifyContent:"center",
    },
    buttonQuiz:{
        width: "90%",
        borderRadius: 15,
        borderColor: color.white,
        borderWidth: 2,
        //backgroundColor: color.black,
        justifyContent:"center",
        alignItems:"center",
        padding: 2,
        marginRight: padding * 2,
        
    },
    disabledQuiz:{
        width: "90%",
        borderRadius: 15,
        borderColor: color.white,
        borderWidth: 2,
        //backgroundColor: color.black,
        justifyContent:"center",
        alignItems:"center",
        padding: 2,
        opacity: 0.5,
        marginRight: padding * 2,
    },
    quizText:{
        color: color.white,
        fontFamily: fontFamily.regular,
    },
    codeContainer:{
        marginTop: 15,
        paddingTop: 10,
        borderTopColor: color.white,
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: padding * 2,
        marginBottom: 15,
    }
});

export default styles;