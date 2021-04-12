import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: {
        confirmed, recovered, deaths, lastUpdate,
      },
    } = await axios.get(changeableUrl);

    const modifyData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };

    return modifyData;
  } catch (e) {
    console.log(e);
  }
};

export const fetchDailyDate = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifyDate = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifyDate;
  } catch (e) {
    console.log(e);
  }
};

export const fetchCountries = async () => {
  try {
    const { data: { countries } } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (e) {
    console.log(e);
  }
};
