import * as t from '../../actionTypes';

import { AsyncStorage } from 'react-native';

export function something() {
    return (dispatch) => {
        dispatch({type:t.TEST_ACTION});
    };
}