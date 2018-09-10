const audiencesState = [{
  id: '000001',
  name: 'audiences_one',
  status: 'Ready',
  activationScheduled: {
    created_at: 'Thu Sep 10 2018 14:00:00 GMT+0000 (UTC)',
    next_run_date: 'Thu Sep 17 2018 14:00:00 GMT+0000 (UTC)',
    interval: 'WEEKLY'
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
      created_at: 'Thu Sep 10 2018 14:00:00 GMT+0000 (UTC)',
      next_run_date: 'Thu Sep 17 2018 14:00:00 GMT+0000 (UTC)',
      interval: 'BI-WEEKLY'
    }
  }, 15000);

addingAudience(
  {
    id: '000001',
    name: 'audiences_four',
    status: 'Ready',
    activationScheduled: {
      created_at: 'Thu Sep 10 2018 14:00:00 GMT+0000 (UTC)',
      next_run_date: 'Thu Sep 17 2018 14:00:00 GMT+0000 (UTC)',
      interval: 'WEEKLY'
    }
  }, 25000);

addingAudience(
  {
    id: '000001',
    name: 'audiences_four',
    status: 'Ready',
    activationScheduled: {
      created_at: 'Thu Sep 10 2018 14:00:00 GMT+0000 (UTC)',
      next_run_date: 'Thu Sep 17 2018 14:00:00 GMT+0000 (UTC)',
      interval: 'WEEKLY'
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