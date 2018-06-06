export const FIRST_ACTION = 'main/FIRST_ACTION';

export const GET_REWARDS = "home/GET_REWARDS";

export const GET_QUIZES = "home/GET_QUIZES";

export const GET_CODES = "home/GET_CODES";

export const CHANGE_TIME_OFFSET = "home/CHANGE_TIME_OFFSET";

export const CHANGE_CAMERA = "home/CHANGE_CAMERA";

export const UPDATE_LEADERBOARD = "home/UPDATE_LEADERBOARD";

//^^API FUNCTS^^

export const SUBMIT_REWARD = "home/SUBMIT_REWARD"; //too lazy to comment na

export const SUBMIT_QUIZ = "home/SUBMIT_QUIZ"; //change quiz to win in reducer

export const GET_POINTS = "home/GET_POINTS"; //get points from reducer

export const RESET_POINTS = "home/RESET_POINTS"; //Reset points

export const REWARD_TYPE_ACTION = "reward"; //point is a reward

export const QUIZ_TYPE_ACTION = "quiz"; //point is a quiz

export const ERROR_TYPE = "error"; //technical error

export const WIN_TYPE = "win"; //user just wont the game

export const DONE_TYPE = "done"; //user ALREADY won the game

export const LOSE_TYPE = "fail"; //user submitted the wrong answer


//below are the types of tasks//
export const POINT_MULTIPLECHOICE = "multiplechoice";

export const POINT_IDENTIFICATION = "Identification";

export const POINT_INSTANT = "instant";


//Game levels
export const MAX_PLAYERS_PER_TEAM = 3;

export const TEAM_TYPE = "team";
export const SOLO_TYPE = "solo";