const cron = require('cron');

const audiences = [{
  name: 'audiences_one',
  status: 'Ready',
  scheduled: '2018-09-06'
},
{
  name: 'audiences_two',
  status: 'InProgress'
}];


const processAudience = (...args) => {
  setTimeout(() => {
    audiences.push({
      name: args[0],
      status: args[1],
      scheduled: args[2]
    });
  }, args[3]);
}

processAudience('audience_three', 'Ready', '2018-09-06', 15000);
processAudience('audience_four', 'Ready', '2018-09-06', 30000);
processAudience('audience_five', 'InProgress', '', 10000);
processAudience('audience_six', 'Ready', '2018-09-06', 40000);

const fetchAudiences = () => {
  return audiences.filter(x => (x.status !== 'InProgress' && x.scheduled));
}

const activateAudiences = (audience) => {
  audience.status = 'InProgress';
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

let i = 0;
const job = new cron.CronJob('*/10 * * * * *', function () {
  console.log(`${++i} hour running...`);
  const date = new Date();
  console.log(`fetching Audiences ...`);
  const pendindAudiences = fetchAudiences();
  console.log(pendindAudiences);
  const formatDate = getDate(date.toDateString());
  pendindAudiences.forEach(element => {
    console.log(`Scheduled date ${element.scheduled}`);
    console.log(`Today date ${formatDate}`);
    if (element.scheduled === formatDate) {
      console.log(`Activating Audience ...`);
      activateAudiences(element);
    } else {
      console.log(`Audience not able to activate ...`);
    }
  });
  console.log(`********************** End Activation ******************************`);
  console.log(`Audiences Array`);
  console.log(audiences);
  console.log(`*******************************************************************`);
  console.log(`********************** End Iteration ******************************`);
  console.log(`*******************************************************************`);
});

job.start();

