import * as t from './actionTypes';
import * as api from './api';
//import { getRank } from './actions';
import { AsyncStorage } from 'react-native';


export function getRewards(callback) {
    return (dispatch) => {
    	api.getRewards((newkey, rewards) => {
    		dispatch({type:t.GET_REWARDS, data: rewards, key: newkey});
    	});
        callback();
    };
}

export function getQuizes(callback) {
    return (dispatch) => {
    	api.getQuizes((newkey, quizes) => {
    		dispatch({type:t.GET_QUIZES, data: quizes, key: newkey});
    		callback();
    	});
        callback();
    };
}


export function getLeaderBoard(callback){
    return (dispatch) => {
        api.getLeaderBoard(function(points,teams,users){
            mixedarr = []
            teamsarr = []
            solosarr = []
            title = {rank: "RANK", points: "POINTS", title: "NAME", lname: "", teamName: "NAME"};
            mixedarr.push(title);
            teamsarr.push(title);
            solosarr.push(title);
            Object.keys(points).map(function(key){
                const point = points[key].point;
                const user = points[key].user;
                const team = points[key].team;
                console.log(points[key]);
                if(users[user].points == null){
                    users[user].points = point;
                }
                else{
                    users[user].points+=point;
                }

                if(team != null){
                    if(teams[team].points == null) teams[team].points = point;
                    else teams[team].points += point;
                }
            })
            Object.keys(users).map(function(key){
                if(users[key].points == null){
                    users[key].points = 0;
                }
                //usersarr.push({...users[key]});
                users[key].title = users[key].fname+" "+users[key].lname;
                if(users[key].team == null){
                    solosarr.push({...users[key]});
                    mixedarr.push({...users[key]});
                }
            })
            Object.keys(teams).map(function(key){
                if(teams[key].points == null){
                    teams[key].points = 0;
                }
                teams[key].title = teams[key].teamName
                teamsarr.push(teams[key]);
                mixedarr.push(teams[key]);
            })
            

            mixedarr.sort(function(a, b){
                return b.points - a.points;
            });
            teamsarr.sort(function(a, b){
                return b.points - a.points;
            });
            solosarr.sort(function(a, b){
                return b.points - a.points;
            });
            getRank(mixedarr);
            getRank(teamsarr);
            getRank(solosarr);
            results = [solosarr,teamsarr,mixedarr];
            callback(results);
        })
    }
}

export function getRank(arr){
    for(var i = 1; i < arr.length; i++){
        if(i == 1){
            arr[i].rank = 1;
        }
        else{
            if(arr[i-1].points == arr[i].points) {
                arr[i].rank = arr[i-1].rank;
            }
            else{
                arr[i].rank = (arr[i-1].rank)+1;
            }
        }
    }
}
export function updatePoints(reward, callback){
    return (dispatch) => {
        api.updatePoints(reward, callback);
    }
}
export function getServerTime(){
    return (dispatch) =>{
        console.log("I RAN");
        var timePromise = fetch("http://www.convert-unix-time.com/api?timestamp=now");
        timePromise.then(function(responseJson){
            return responseJson.json();
        }).then((responseTime) => {
            nowTime = Math.floor(Date.now()/1000)+28800; //gets time in utc to ph time
            serverTime = responseTime.timestamp+28800; //convert utc to ph time
            console.log(serverTime);
            console.log(nowTime);
            var offset = serverTime - nowTime;
            dispatch({type:t.CHANGE_TIME_OFFSET, data: offset});
        });
    }
}
