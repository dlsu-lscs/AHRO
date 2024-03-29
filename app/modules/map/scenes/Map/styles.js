import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, windowWidth, normalize } = theme;

const resizeMode = 'contain';



var { Dimensions } = require('react-native')

const {width, height} = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

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
    },



    EmptyListContainer : {
        justifyContent: 'center',
        flex:1,
        alignItems: "center"
    },


    MainContainer :{

        justifyContent: 'center',
        flex:1,

    },

    item: {
        padding: 10,
        fontSize: 28,
        height: 44,
    },







    container: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
        paddingLeft: CARD_WIDTH
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