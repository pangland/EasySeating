import moment from 'moment';

export const defaultInputs = () => {
  if (window.searchParams) {
    // window.searchParams.search = "";
    return window.searchParams;
  } else {
    return ({
      seats: "2",
      date: moment().tz("America/New_York").format("YYYY-MM-DD"),
      time: "7:30 AM",
    });
  }
};
