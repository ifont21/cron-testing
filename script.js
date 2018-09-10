const cron = require('cron');
const { audiencesState } = require('./data');

const { AudienceService } = require('./audience-service');

const audienceService = new AudienceService();


let i = 0;
const today = new Date();
const job = new cron.CronJob('*/1 * * * * *', async function () {
  today.setHours(today.getHours() + 1);
  console.log('*****************************************************************');
  console.log(`${++i} hours running...`);
  console.log(`at this Moment ${today}`);
  console.log('*****************************************************************');

  console.log(`fetching Audiences ...`);
  const pendindAudiences = audienceService.fetchAudiences(audiencesState);

  const formatDate = audienceService.getFormatDate(today.toDateString());

  pendindAudiences.forEach(async element => {
    if (audienceService.getFormatDate
      (
      element.activationScheduled.next_run_date) === formatDate ||
      element.status === 'Failure'
    ) {
      try {
        response = await audienceService.activateAudiences(element, today);
        if (response === 'activated') audienceService.restoreStatus(element);
      } catch (err) {
        audienceService.restoreStatus(element, 'Failure', 0);
      }
    }
  });
  console.log(`Audiences In Progress`);
  console.log(audiencesState
    .map(x => ({ name: x.name, status: x.status, nextRun: x.activationScheduled ? x.activationScheduled.next_run_date : '' }))
    .filter(x => x.status === 'InProgress'));
  console.log(`Audiences Ready`);
  console.log(audiencesState
    .map(x => ({ name: x.name, status: x.status }))
    .filter(x => x.status === 'Ready'));
  console.log(`Audiences Failure`);
  console.log(audiencesState
    .map(x => ({ name: x.name, status: x.status }))
    .filter(x => x.status === 'Failure'));
  console.log(`*******************************************************************`);
  console.log(`********************** End Hour Verification ******************************`);
  console.log(`*******************************************************************`);
});

job.start();

