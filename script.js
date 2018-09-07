const cron = require('cron');
const { audiencesState } = require('./data');

const fetchAudiences = (date) => {
  return audiencesState.filter(x => (x.status !== 'InProgress' && x.activationScheduled));
}

const activateAudiences = (audience) => {
  audience.status = 'InProgress';
  audience.activationScheduled.next_run_date = calculateNextRunDate(audience.activationScheduled.scheduled, Date.now());
  setTimeout(() => {
    audience.status = 'Ready';
  }, 24000);
}

const getDateValues = (notation) => {
  let values = {};
  let [value, suffix] = notation.split('-');
  switch (value) {
    case 'ww':
      if (suffix) {
        values.days = 7 * Number(suffix);
      } else {
        values.days = 7;
      }
      break;
    case 'MM':
      break;
    case 'yy':
      break;
    default:
      break;
  }

  return values;
}

const getDate = (string) => {
  const date = new Date(string);
  const stringMonth = (date.getMonth() + 1).toString();
  const month = stringMonth.length < 2 ? '0' + stringMonth : stringMonth;
  const stringDay = date.getDate().toString();
  const day = stringDay.length < 2 ? '0' + stringDay : stringDay;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

const calculateNextRunDate = (schedule, startDate) => {
  let nextRunDate;
  if (schedule.dayOfWeek) {
    // TODO: calculate with this day of week
  } else {
    const values = getDateValues(schedule.interval);
    nextRunDate = new Date(startDate);
    nextRunDate.setDate(today.getDate() + values.days);
  }
  return nextRunDate;
}


let i = 0;
const today = new Date();
const job = new cron.CronJob('*/1 * * * * *', function () {
  today.setHours(today.getHours() + 1);
  console.log('*****************************************************************');
  console.log(`${++i} hour running...`);
  console.log(`at this Moment ${today}`);
  console.log('*****************************************************************');
  console.log(`fetching Audiences ...`);
  const pendindAudiences = fetchAudiences();
  const formatDate = getDate(today.toDateString());
  pendindAudiences.forEach(element => {
    console.log(`Scheduled date ********* ${element.activationScheduled.next_run_date}`);
    console.log(`Today date *********** ${formatDate}`);
    if (getDate(element.activationScheduled.next_run_date) === formatDate) {
      console.log(`Activating Audience ...`);
      activateAudiences(element);
    } else {
      console.log(`Audience not able to activate ...`);
    }
  });
  console.log(`********************** End Activation ******************************`);
  console.log(`Audiences In Progress`);
  console.log(audiencesState.map(x => ({ name: x.name, status: x.status })).filter(x => x.status === 'InProgress'));
  console.log(`Audiences Ready`);
  console.log(audiencesState.map(x => ({ name: x.name, status: x.status })).filter(x => x.status === 'Ready'));
  console.log(`*******************************************************************`);
  console.log(`********************** End Iteration ******************************`);
  console.log(`*******************************************************************`);
});

job.start();

