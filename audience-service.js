class AudienceService {

  constructor() { }

  fetchAudiences(audiencesState) {
    return audiencesState
      .filter(x => ((x.status !== 'InProgress' || x.status === 'Failure') && x.activationScheduled));
  }

  activateAudiences(audience, today) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.success()) {
          audience.status = 'InProgress';
          audience.activationScheduled.next_run_date = this.calculateNextRunDate(audience.activationScheduled, Date.now(), today);
          resolve('activated');
        } else {
          reject('error activating');
        }
      }, 3000)
    });
  }

  restoreStatus(audience, status = 'Ready', time = 24000) {
    setTimeout(() => {
      audience.status = status;
    }, time);
  }

  getDaysByInterval(notation) {
    let values = {};
    switch (notation) {
      case 'WEEKLY':
        values.days = 7;
        break;
      case 'BI-WEEKLY':
        values.days = 7 * 2;
        break;
      case 'MONTHLY':
        break;
      default:
        break;
    }
    return values;
  }

  calculateNextRunDate(schedule, startDate, today) {
    let nextRunDate;

    const values = this.getDaysByInterval(schedule.interval);
    nextRunDate = new Date(startDate);
    nextRunDate.setDate(today.getDate() + values.days);

    return nextRunDate;
  }

  getFormatDate(string) {
    const date = new Date(string);
    const stringMonth = (date.getMonth() + 1).toString();
    const month = stringMonth.length < 2 ? '0' + stringMonth : stringMonth;
    const stringDay = date.getDate().toString();
    const day = stringDay.length < 2 ? '0' + stringDay : stringDay;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  success() {
    const result = (Math.random() > 0.5) ? 1 : 0;
    return result === 1;
  }
}

module.exports = {
  AudienceService
}