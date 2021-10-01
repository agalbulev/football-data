import { getMatchsByCompetition } from '../services/getMatchsByCompetition';

export const getMatches = competition => {
  return dispatch => {
    getMatchsByCompetition(competition).then(result => {
      const matchDays = [];
      let matchday = 0;

      result.matches.forEach((match, index) => {
        if (index === 0 || match.matchday !== result.matches[index - 1].matchday) {
          matchDays.push([match]);

          if (index !== 0) {
            matchday++;
          }
        } else {
          matchDays[matchday] = [...matchDays[matchday], match];
        }
      })

      dispatch(setMatches({ competition, matchDays }));
      
      if (result.matches.length !== 0 && result.matches[0]) {
        dispatch(setCurrentMatchDay({ competition, number: result.matches[0].season.currentMatchday }))
      }
    })
  };
};

const setMatches = data => ({
  type: "SET_MATCHES",
  matches: {
    ...data
  }
});

const setCurrentMatchDay = current => ({
  type: 'SET_CURRENT_MATCHDAY',
  current
})
