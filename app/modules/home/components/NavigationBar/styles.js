import { Platform, StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({

    bottomNav:{
        flex: 1,
        backgroundColor: color.white,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },

    navIconContainer:{
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",    
        width: windowWidth / 5,
        height: "100%",    
    },

    navIconContainerTest:{
        // flex: 1,
        backgroundColor: "yellow",
        justifyContent: "center",
        alignItems: "center",    
        width: windowWidth / 5,  
        height: "100%",  
    },

    toIcon:{
        justifyContent: "center",
        alignItems: "center",
    },

    navIconLabel:{
        fontFamily: fontFamily.regular,
    },
  
    bottomContainer:{
        backgroundColor:"white",
        paddingVertical: padding * 3,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center"
    }
});

export default styles;