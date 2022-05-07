//logic for obtaining most current data
const dates = [
    "2018-03-01T10:30:12.000Z",
    "2018-03-01T12:11:49.000Z",
    "2018-03-12T15:54:49.000Z",
    "2018-03-09T19:12:49.000Z",
    "2018-03-03T01:41:49.000Z",
  ];
  
  const selectMostRecent = (dates) =>
    dates.sort((a, b) => new Date(b) - new Date(a))[0];
  
  console.log(selectMostRecent(dates));
  
  //logic for obtaining most current data
  
  let latestDate = dates[0];
  
  dates.forEach((e) => {
    if (e > latestDate) {
      latestDate = e;
    }
  });
  
  console.log(`Latest date is ${latestDate}`);
  