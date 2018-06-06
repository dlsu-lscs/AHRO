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
    	});
        callback();
    };
}

export function getPoints(callback){
    return (dispatch) => {
        dispatch({type: t.RESET_POINTS});
        api.getPoints((newKey, valtype) => {
            dispatch({type: valtype.type, key: newKey});
        });
        callback();
    }
}

export function getCodes(callback){
    return (dispatch) => {
        api.getCodes((newKey, codes) => {
            dispatch({type: t.GET_CODES, data: codes, key: newKey});
        });
        callback();
    }
}

export function setCameraState(val){
    return (dispatch) => {
        dispatch({data: val});
    };
}

export function getLeaderBoard2(callback){
    return(dispatch) =>{
        api.getLeaderBoard((newKey, data, type)=> {
            dispatch({key: newKey, data: data, type: type});
        });
    }
}

export function getLeaderBoard(callback){
    return (dispatch) => {
        api.getLeaderBoard(function(teams,users, meuser){
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
                        /*
                            Below could be faster if checking end and not 
                            insantiating the object again
                        */
                        if(users[key].uid == meuser.uid){
                            users[key].myTeam = true;
                            meuser.points = users[key].points;
                        }
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
                        }
                        else{
                            teams[key].points += aPoint;
                        }
                    })
                }
                if(teams[key].points == null){
                    teams[key].points = 0;
                }
                if(meuser.team != null && meuser.team == key){
                    teams[key].myTeam = true;
                    meuser.points = teams[key].points;
                }
                teams[key].title = teams[key].teamName
                teamsarr.push({...teams[key]});
                mixedarr.push({...teams[key]});
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
            mixedrank = getRank(mixedarr);
            teamsrank = getRank(teamsarr);
            solorank = getRank(solosarr);
            if(mixedarr.length > 10){
                mixedarr = mixedarr.slice(0, 11);
            }
            if(teamsarr.length > 10){
                teamsarr = teamsarr.slice(0, 11);
            }
            if(solosarr.length > 10){
                solosarr = solosarr.slice(0, 11);
            }

            meuser.allrank = mixedrank;
            if(meuser.team == null){
                meuser.secondary = "Individual"
                meuser.secondaryrank = solorank;
            }
            else{
                meuser.secondary = "Team"
                meuser.secondaryrank = teamsrank;
            }
            results = [solosarr,teamsarr,mixedarr,meuser];
            callback(results);
        })
        console.log("EVERYTHING IS DONE");
    }
}

export function getRank(arr){
    var ans = 0;
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
        if(arr[i].myTeam != null){
            ans = arr[i].rank;
        }
    }
    return ans;
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
            if (success) successCB(data, "Team successfully created!");
            else if (error) errorCB(error)
        }, function(newKey, valtype){
            dispatch({type: valtype.type, key: newKey});
        });
    };
}

export function getTeam(successCB, errorCB) {
    return (dispatch) => {
        api.getTeam(function (success, data, error) {
            if (success) successCB(data);
            else if (error) errorCB(error)
        });
    };
}

export function sendInvite(data, successCB, errorCB) {
    console.log("@sendInvite actions");
    return (dispatch) => {
        api.sendInvite(data, function (success, data, error) {
            if (success) successCB(data, "Invitation successfully sent!");
            else if (error) errorCB(error)
        });
    };
}

export function getInvites(successCB, errorCB) {
    console.log("@getInvites actions");
    return (dispatch) => {
        api.getInvites(function (success, data, error) {
            if (success) successCB(data);
            else if (error) errorCB(error)
        });
    };
}

export function acceptInvite(data, successCB, errorCB) {
    console.log("@acceptInvite actions");
    return (dispatch) => {
        api.acceptInvite(data, function (success, data, error) {
            if (success) successCB(data, "You have joined the team!");
            else if (error) errorCB(error)
        }, function(newKey, valtype){
            dispatch({type: valtype.type, key: newKey});
        });
    };
}
export function getServerTime(callback){
    return (dispatch) =>{
        //var timePromise = fetch("http://www.convert-unix-time.com/api?timestamp=now");
        var timePromise = fetch("https://ahroadmin.herokuapp.com/api/timestamp");
        timePromise.then(function(responseJson){
            return responseJson.json();
        }).then((responseTime) => {
            nowTime = Math.floor(Date.now())+28800; //gets time in utc to ph time
            serverTime = responseTime.timestamp; //convert utc to ph time
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
            if(quizes.answered != null && quizes.answered[nextQuiz.key] != null) callback(hoursLeft, minsLeft, secsLeft, true, false);
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