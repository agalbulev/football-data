import axios from 'axios';
import axiosInstance from '../axios';

export const getCompetitions = () => {
    return dispatch => {
        const timeNow = Date.now();
        const lastSync = localStorage.getItem('lastSyncCompetitions') || timeNow;

        if (timeNow === lastSync || timeNow - lastSync > 60000) {
            axios.all([
                axiosInstance.get(`/competitions/2021/standings`),
                axiosInstance.get(`/competitions/2015/standings`),
                axiosInstance.get(`/competitions/2002/standings`),
                axiosInstance.get(`/competitions/2019/standings`),
                axiosInstance.get(`/competitions/2014/standings`),
                // axiosInstance.get(`/competitions/2003/standings`),
                // axiosInstance.get(`/competitions/2017/standings`)
            ]).then(res => {
                const competitions = {};
    
                res.forEach(com => {
                    competitions[com.data.competition.code] = {
                        competition: {
                            ...com.data.competition
                        },
                        standings: [
                            ...com.data.standings[0].table
                        ]
                    };
                });
    
                dispatch(getDataSuccess(competitions));
                localStorage.setItem('lastSyncCompetitions', Date.now());
                localStorage.setItem('competitions', JSON.stringify(competitions));
            })
        } else {
            dispatch(getDataSuccess(JSON.parse(localStorage.getItem('competitions'))));
        }
    }
}

const getDataSuccess = data => ({
    type: "GET_DATA_SUCCESS",
    payload: {
        ...data
    }
})
    
