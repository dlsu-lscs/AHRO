import { StyleSheet, Platform } from 'react-native';

import { theme } from "../../index"
const {padding, color, normalize } = theme;

var { Dimensions } = require('react-native')

const {width, height} = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

const styles = StyleSheet.create({
    container:{
        padding: padding,
        flex:1
    },

    wrapper:{
        flex:1,
        borderWidth:1,
        borderRadius: 8,
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
        letterSpacing: .5,
        flex:1
    },

    text1:{
        fontSize: normalize(17),
        lineHeight: normalize(21),
        color: color.white,
        letterSpacing: .5,
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
    },















    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 5,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    }
});


export default styles;