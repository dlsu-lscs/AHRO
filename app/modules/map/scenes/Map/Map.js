import React, {Component} from 'react';
import {View, Text, ImageBackground, FlatList, ActivityIndicator, Animated} from 'react-native';
import {connect} from "react-redux";

import styles from "./styles"
import MapEvent from "../../components/MapEvent"
import {actions as map} from "../../index"

const {getEvents} = map;

import MapView from "react-native-maps";
import {Actions} from "react-native-router-flux";

var {Dimensions} = require('react-native')

const {width, height} = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class Map extends Component {


    constructor() {
        super();
        this.state = {};

        this.state.overlay = {
            bounds: [[14.5649894, 120.9935028],
                [14.5749894, 121.0035028]],
            image: "../../../../assets/icons/map-overlay.png",
        }

        this.renderItem = this.renderItem.bind(this);
        console.log("hallo from Calendar.js constructor");
    }

    componentDidMount() {


        this.state.region = {
            latitude: 14.5649894,
            longitude: 120.9935028,
            latitudeDelta: 0.04864195044303443 / 15,
            longitudeDelta: 0.040142817690068 / 15,
            bearing: 270
        }


        this.index = 0;
        this.animation = new Animated.Value(0.2);


        this.props.getEvents((error) => alert(error.message))

        this.animation.addListener(({value}) => {
            let index = Math.floor(value / CARD_WIDTH + 0.1); // animate 30% away from landing on the next item
            if (index >= this.props.events.length) {
                index = this.props.events.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }//14.5642894//120.9932028

            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const {coordinate} = this.props.events[index];
                    this.map.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: this.state.region.latitudeDelta,
                            longitudeDelta: this.state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });


        this.state.opacity = new Animated.Value(0)

    }

    ListEmptyView = () => {
        return (
            <View style={styles.MainContainer}>

                <Text style={{textAlign: 'center'}}> No events happening today</Text>

            </View>
        );

    }

    renderItem({item, index}) {
        return <MapEvent event={item} index={index}/>
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator animating={true}/>
                </View>
            )
        } else {
            const interpolations = this.props.events.map((marker, index) => {
                const inputRange = [
                    (index - 1) * CARD_WIDTH,
                    index * CARD_WIDTH,
                    ((index + 1) * CARD_WIDTH),
                ];
                const scale = this.animation.interpolate({
                    inputRange,
                    outputRange: [1, 2.5, 1],
                    extrapolate: "clamp",
                });
                const opacity = this.animation.interpolate({
                    inputRange,
                    outputRange: [0.35, 1, 0.35],
                    extrapolate: "clamp",
                });
                return {scale, opacity};
            });
            return (
                <ImageBackground style={styles.container}
                                 source={require("../../../../assets/images/theme-bg.png")}>


                    <View style={styles.container}>
                        <MapView
                            //showsMyLocationButton
                            showsUserLocation
                            //scrollEnabled={false}
                            //zoomEnabled={false}
                            ref={map => this.map = map}
                            initialRegion={this.state.region}
                            style={styles.container}
                            mapType='standard'

                        >
                            {/*<MapView.Overlay*/}
                            {/*bounds={[[14.5649894,120.9935028],*/}
                            {/*[14.5549894,121.0035028]]}*/}
                            {/*image={require("../../../../assets/icons/map-overlay.png")}*/}
                            {/*/>*/}
                            {this.props.events.map((marker, index) => {
                                const scaleStyle = {
                                    transform: [
                                        {
                                            scale: interpolations[index].scale,
                                        },
                                    ],
                                };
                                const opacityStyle = {
                                    opacity: interpolations[index].opacity,
                                };
                                return (
                                    <MapView.Marker key={index} coordinate={marker.coordinate}>
                                        <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                            <Animated.View style={[styles.ring, scaleStyle]}/>
                                            <View style={styles.marker}/>
                                        </Animated.View>
                                    </MapView.Marker>
                                );
                            })}
                        </MapView>
                        <AnimatedFlatList
                            horizontal
                            scrollEventThrottle={1}
                            showsHorizontalScrollIndicator={false}
                            ref='listRef'
                            data={this.props.events}
                            renderItem={this.renderItem}
                            ListEmptyComponent={this.ListEmptyView}
                            initialNumToRender={5}
                            keyExtractor={(item, index) => index.toString()}
                            snapToInterval={CARD_WIDTH}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                x: this.animation,
                                            },
                                        },
                                    },
                                ],
                                {useNativeDriver: true}
                            )}
                            style={styles.scrollView}
                            contentContainerStyle={styles.endPadding}

                        />
                    </View>
                </ImageBackground>


            );
        }
    }
}
;

function

mapStateToProps(state, props) {
    return {
        isLoading: state.mapReducer.isLoading,
        events: state.mapReducer.events
    }
}

export default connect(mapStateToProps, {getEvents})(Map);