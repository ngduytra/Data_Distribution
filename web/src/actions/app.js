import { 
    getRanking as getRankingAPI, 
    getHomeSongs as getHomeSongsAPI,
    getHotUsers as getHotUsersAPI,
    getFindDataList as getFindDataAPI
} from '../api/userAPI'


export function getHotUsers(){
    return (dispatch) => {
        getHotUsersAPI()
        .then((hotUserData) => {
            dispatch(get_hot_user_successful(hotUserData))
        })
        .catch((err) => {
            console.log("Error at get getHotUsersAPI: " + err)
        });
    }
}

export function getFindDataList(){
    return (dispatch) => {
        getFindDataAPI()
        .then(async (data) => {
                await Promise.all( data.map(element => {
                  return fetch(`https://ipfs.jumu.tk/${element.characteristicHash}`)
                  .then(response => response.json())
                  .then((jsonData) => {
                    element.IPFS = jsonData
                    return element
                  })
                }))
                let random = data.sort(() => 0.5 - Math.random()).slice(0,3)
                dispatch(get_hot_hunt_successful(random))
              })
        .catch((err) => {
            console.log("Error at get getHuntUsersAPI: " + err)
        });
    }
}

export function get_hot_user_successful(hotUserData){
    return {
        type: 'GET_HOT_USER_SUCCESSFUL',
        hotUserData,
    }
}

export function get_hot_hunt_successful(hotHuntData){
    return {
        type: 'GET_HOT_HUNT_SUCCESSFUL',
        hotHuntData,
    }
}



export function getHomeSongs(){
    return (dispatch) => {
        dispatch(get_home_data_start())
        getHomeSongsAPI()
        .then((homeData) => {
            dispatch(get_home_data_successful(homeData))
        })
        .catch((err) => {
            dispatch(get_home_data_fail(err))
        });
    }
}

export function get_home_data_start(){
    return {
        type: 'GET_HOME_DATA_START',
    }
}
export function get_home_data_successful(homeData){
    return {
        type: 'GET_HOME_DATA_SUCCESSFUL',
        homeData,
    }
}
export function get_home_data_fail(err){
    return {
        type: 'GET_HOME_DATA_FAIL',
        err,
    }
}
export function get_home_data_hanlde_error(){
    return {
        type: 'GET_HOME_DATA_HANLDE_ERROR',
    }
}
export function get_home_data_reset(){
    return {
        type: 'GET_HOME_DATA_RESET',
    }
}



export function set_music_selected(musicSelected){
    return {
        type: 'SET_MUSIC_SELECTED',
        musicSelected: musicSelected
    }
}
export function set_ranking(rankingdata){
    return {
        type: 'SET_RANKING',
        rankingdata,
    }
}

export function set_err(err){
    return {
        type: 'SET_ERR',
        err,
    }
}

export function ranking_start(){
    return {
        type: 'RANKING_START'
    }
}
export function getRanking(){
    return (dispatch) => {
        dispatch(ranking_start())
        getRankingAPI()
        .then((data) => {
            // console.log('Trgahahahhaaa')
            // console.log(data)
            dispatch(set_ranking(data))
        })
        .catch((err) => {
            dispatch(set_err(err))
        });
    }
}