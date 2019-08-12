import { getMatchsByCompetition } from '../services/getMatchsByCompetition';

export const getMatches = competition => {
  return dispatch => {
    getMatchsByCompetition(competition).then(result => {
      console.log(result);
    })
  };
};

const setMatches = data => ({
  type: "SET_MATCHES",
  payload: {
    ...data
  }
});
