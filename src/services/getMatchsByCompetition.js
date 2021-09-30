import axiosInstance from "../axios";

export const getMatchsByCompetition = competition => {
  return new Promise((resolve, reject) => {
    const timeNow = Date.now();
    const lastSync =
      localStorage.getItem(`lastSync${competition}Matches`) || timeNow;

    if (timeNow === lastSync || timeNow - lastSync > (60000 * 30)) {
      axiosInstance.get(`/competitions/${competition}/matches`).then(res => {
        localStorage.setItem(`lastSync${competition}Matches`, Date.now());
        localStorage.setItem(`${competition}Matches`, JSON.stringify(res.data));
        resolve(res.data);
      });
    } else {
      resolve(JSON.parse(localStorage.getItem(`${competition}Matches`)));
    }
  });
};
