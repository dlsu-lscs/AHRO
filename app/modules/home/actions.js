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

export function getPoints(callback){
    return (dispatch) => {
        api.getPoints((newKey, valtype) => {
            dispatch({type: valtype.type, key: newKey});
        });
        callback();
    }
}
export function getLeaderBoard(callback){
    return (dispatch) => {
        api.getLeaderBoard(function(teams,users){
            mixedarr = []
            teamsarr = []
            solosarr = []
            title = {rank: "RANK", points: "POINTS", title: "NAME", lname: "", teamName: "NAME"};
            mixedarr.push(title);
            teamsarr.push(title);
            solosarr.push(title);
            /*
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
            */
            Object.keys(users).map(function(key){
                if(users[key].team == null){
                    if(users[key].rewards != null){
                        Object.keys(users[key].rewards).map(function(key2){
                            aPoint = users[key].rewards[key2].point;
                            if(users[key].points == null){
                                users[key].points = aPoint;
                            }
                            else{
                                users[key].points += aPoint;
                            }
                        })
                    }
                    if(users[key].points == null){
                        users[key].points = 0;
                    }
                    //usersarr.push({...users[key]});
                    users[key].title = users[key].fname+" "+users[key].lname;
                    if(users[key].team == null){
                        solosarr.push({...users[key]});
                        mixedarr.push({...users[key]});
                    }
                }
            })
            Object.keys(teams).map(function(key){
                if(teams[key].rewards != null){
                    Object.keys(teams[key].rewards).map(function(key2){
                        aPoint = teams[key].rewards[key2].point;
                        if(teams[key].points == null){
                            teams[key].points = aPoint;
                            console.log("GOT 1");
                        }
                        else{
                            teams[key].points += aPoint;
                        }
                    })
                }
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
export function getTime(callback){
    api.getTime((time) => {
        callback();
    });
}

export function createTeam(data, successCB, errorCB) {
    return (dispatch) => {
        api.createTeam(data, function (success, data, error) {
            if (success) successCB(data);
            else if (error) errorCB(error)
        });
    };
}

export function getTeam(data, successCB, errorCB) {
    return (dispatch) => {
        api.getTeam(data, function (success, data, error) {
            if (success) successCB(data);
            else if (error) errorCB(error)
        });
    };
}
export function getServerTime(callback){
    return (dispatch) =>{
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
            callback();
        }, function(error){
            console.log(error);
        });
    }
}

export function getTimeInterval(nextQuiz,callback,offset,quizes){
    if(nextQuiz != null){
        nowTime = Math.floor(Date.now()/1000)+28800+offset;
        timeLeft = nextQuiz.timeend - nowTime;
        timeHas = nextQuiz.timestart - nowTime;
        if(timeLeft > 0 && timeHas <= 0){
            hoursLeft = Math.floor(timeLeft/3600); //divide per hour (60secs * 60 mins)
            minsLeft = Math.floor((timeLeft - hoursLeft*3600)/60); //divide per seconds
            secsLeft = (timeLeft - hoursLeft*3600 - minsLeft*60); 
            if(hoursLeft <= 9) hoursLeft = "0"+hoursLeft;
            if(minsLeft <= 9) minsLeft = "0"+minsLeft;
            if(secsLeft <= 9) secsLeft = "0"+secsLeft;
            if(quizes[nextQuiz.key].answered != null) callback(hoursLeft, minsLeft, secsLeft, true, false);
            else callback(hoursLeft, minsLeft, secsLeft, true, true);
        }
        else{
            callback(null, null, null, false, false);
        }
    }
    else{
        callback(null, null, null, false, false);
    }
}