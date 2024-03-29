import { StyleSheet, Platform } from 'react-native';

import { theme } from "../../index"
const {padding, color, normalize } = theme;

const styles = StyleSheet.create({
    container:{
        padding: padding,
        flex:1
    },

    wrapper:{
        flex:1,
        padding : normalize(8 * 2.5),

        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .4)',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 1,
            },
            android: {
                elevation: 2,
            },
        }),
    },

    quote:{
        marginBottom: padding * 2,
        flexDirection: "column"
    },

    text:{
        fontSize: normalize(12),
        lineHeight: normalize(21),
        color: color.white,
        // letterSpacing: .5,
        flex:1
    },

    text1:{
        fontSize: normalize(17),
        lineHeight: normalize(40),
        color: color.white,
        // letterSpacing: .5,
        flex:1
    },

    bottom:{
        flexDirection: "row",
        marginTop: padding * 2,
        justifyContent:"center"
    },

    left:{
        flex:1,
        justifyContent:"center"
    },

    author:{
        fontSize: normalize(14),
        lineHeight: normalize(19),
        color: color.white,
        fontWeight: "500"
    },

    publishedAt:{
        fontSize: normalize(12),
        lineHeight: normalize(17),
        color: color.white
    },

    buttonContainer:{
        paddingHorizontal:15,
        flexDirection: "row",
        alignItems:"center",
    },

    right:{
        marginRight: -(normalize(8 * 2.5)),
        justifyContent:"center",
        alignItems:"center",
        width: 54,
        height: 34,
    }
});


export default styles;