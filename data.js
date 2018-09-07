const audiencesState = [{
  id: '000001',
  name: 'audiences_one',
  status: 'Ready',
  activationScheduled: {
    created_at: 'Thu Sep 07 2018 14:00:00 GMT+0000 (UTC)',
    next_run_date: 'Thu Sep 14 2018 14:00:00 GMT+0000 (UTC)',
    scheduled: {
      interval: 'ww',// ww->weekly, MM->monthly, yy->yearly,
      dayOfWeek: null //0-6
    }
  }
},
{
  id: '000001',
  name: 'audiences_two',
  status: 'InProgress',
  activation_scheduled: null
}];

const addingAudience = (args, time) => {
  const { id, name, status, activationScheduled } = args;
  setTimeout(() => {
    audiencesState.push({
      id,
      name,
      status,
      activationScheduled
    });
  }, time);
}


addingAudience(
  {
    id: '000001',
    name: 'audiences_three',
    status: 'Ready',
    activationScheduled: {
      created_at: 'Thu Sep 07 2018 14:00:00 GMT+0000 (UTC)',
      next_run_date: 'Thu Sep 14 2018 14:00:00 GMT+0000 (UTC)',
      scheduled: {
        interval: 'ww-2',
        dayOfWeek: null
      }
    }
  }, 15000);

addingAudience(
  {
    id: '000001',
    name: 'audiences_four',
    status: 'Ready',
    activationScheduled: {
      created_at: 'Thu Sep 07 2018 14:00:00 GMT+0000 (UTC)',
      next_run_date: 'Thu Sep 14 2018 14:00:00 GMT+0000 (UTC)',
      scheduled: {
        interval: 'ww',
        dayOfWeek: null
      }
    }
  }, 25000);

addingAudience(
  {
    id: '000001',
    name: 'audiences_four',
    status: 'Ready',
    activationScheduled: {
      created_at: 'Thu Sep 07 2018 14:00:00 GMT+0000 (UTC)',
      next_run_date: 'Thu Sep 14 2018 14:00:00 GMT+0000 (UTC)',
      scheduled: {
        interval: 'ww',
        dayOfWeek: null
      }
    }
  }, 20000);

addingAudience(
  {
    id: '000001',
    name: 'audiences_five',
    status: 'InProgress',
    activationScheduled: null
  }, 20000);

module.exports = {
  audiencesState
}