import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { View, Text } from 'react-native';
import {Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import styles from "./styles";
import { getRank } from '../../actions';

class TeamCard extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(){
        Actions.Leaderboard();
    }
    render() {
        const { rank, points, title } = this.props;
        if(rank == 'RANK') {
            return (
                <View style = {styles.cardStyle}>
                    <View style = {styles.rankStyle}> 
                        <Text style = {styles.headerText}>{rank}</Text>
                    </View>
                    <View style = {styles.pointStyle}>
                        <Text style = {styles.headerText}>{points}</Text>
                    </View>
                    <View style = {styles.nameStyle}>
                        <Text style = {styles.headerText}>{title}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style = {styles.cardStyle}>
                    <View style = {styles.rankStyle}> 
                        <Text style = {styles.genText}>{rank}</Text>
                    </View>
                    <View style = {styles.pointStyle}>
                        <Text style = {styles.genText}>{points}</Text>
                    </View>
                    <View style = {styles.nameStyle}>
                        <Text style = {styles.genText}
                        adjustsFontSizeToFit = {true}
                        numberOfLines={1}>{title}</Text>
                    </View>
                </View>
            );
            
        }
        // return (
        //     <View style={styles.container}>
        //         {(rank == 'RANK') ? 
        //             <View style = {styles.cardStyle}>
        //                 <View style = {styles.rankStyle}> 
        //                     <Text style = {styles.headerText}>{rank}</Text>
        //                 </View>
        //                 <View style = {styles.pointStyle}>
        //                     <Text style = {styles.headerText}>{points}</Text>
        //                 </View>
        //                 <View style = {styles.nameStyle}>
        //                     <Text style = {styles.headerText}>{title}</Text>
        //                 </View>
        //             </View>
        //             :
        //             <View style = {styles.cardStyle}>
        //                 <View style = {styles.rankStyle}> 
        //                     <Text style = {styles.genText}>{rank}</Text>
        //                 </View>
        //                 <View style = {styles.pointStyle}>
        //                     <Text style = {styles.genText}>{points}</Text>
        //                 </View>
        //                 <View style = {styles.nameStyle}>
        //                     <Text style = {styles.genText}
        //                     adjustsFontSizeToFit = {true}
        //                     numberOfLines={1}>{title}</Text>
        //                 </View>
        //             </View>
        //         }
        //     </View>
        // );
    }
}

TeamCard.propTypes = {
/*
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    onChangeText: PropTypes.func.isRequired,
    secureTextEntry: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
*/
    rank: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    points: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    title: PropTypes.string,
}

TeamCard.defaultProps = {
/*
    autoFocus: false,
    secureTextEntry: false
*/
}

export default TeamCard;