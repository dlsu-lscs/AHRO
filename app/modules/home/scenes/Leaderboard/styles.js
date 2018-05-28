
import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        height: "100%",
        width: "100%",
        backgroundColor: color.black,
        padding: 25,
        flex: 1,

    },
    topNav:{
        width: "100%",
        //backgroundColor: color.red,
        borderBottomColor: color.white,
        borderBottomWidth: 1,
        flexDirection: 'row',
        margin: 5,
    },
    leaderBoardTextView:{
        flex: 1,
        width: "50%",
    },
    leaderBoardText:{
        color: color.white,
        fontSize: 25,
    },
    filterView:{
        flexDirection: 'row',
        paddingTop: 10,
        alignItems: 'flex-end',
        justifyContent:"flex-end",
        alignSelf: 'flex-end',
        padding: 0,
        flex: 1,
        width: "50%",
    },
    ButtonView:{
        //width: 100,
        margin: 0,
        borderColor: color.white,
        borderWidth: 1,
        backgroundColor: color.black,
        width: "33%",
    },
    
    filterButton:{
        backgroundColor: color.white,
        height: 30,
        margin: 0,
        width: "100%",
        justifyContent:"center",
        alignItems:"center",
    },
    offButton:{
        backgroundColor: color.black,
        height: 30,
        margin: 0,
        width: "100%",
        justifyContent:"center",
        alignItems:"center",
    },
    buttonText:{
        color: color.white,
        fontSize: 9,
    },
    itemText:{
        color: color.black,
        fontSize: 10,
    },
    Board: {
        borderBottomColor: color.white,
        borderBottomWidth: 1,
        justifyContent:"center",
        alignItems:"center",
        width: "100%",
        height: 200,
    }
});

export default styles;