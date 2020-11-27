export default class DateHandler {
  calcDateDiff(dateFrom, dateTo) {
    let currentTimeZoneOffsetInHours = new Date().getTimezoneOffset() / 60;
    let date1 = new Date(dateFrom);
    let date2 = new Date(dateTo);
    let dayDiff = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
    let hoursDiff =
      new Date(date2 - date1).getHours() + currentTimeZoneOffsetInHours;
    return [dayDiff, hoursDiff];
  }
}
