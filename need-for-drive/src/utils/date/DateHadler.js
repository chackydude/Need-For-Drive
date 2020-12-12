export default class DateHandler {
  calcDateDiff(dateFrom, dateTo) {
    if (dateFrom === null || dateFrom === "" || dateTo === "" || dateTo === null) return [];
    let currentTimeZoneOffsetInHours = new Date().getTimezoneOffset() / 60;
    let date1 = new Date(dateFrom);
    let date2 = new Date(dateTo);
    let dayDiff = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    let hoursDiff =
      new Date(date2 - date1).getHours() + currentTimeZoneOffsetInHours;
    if (hoursDiff < 0) hoursDiff = 24 + hoursDiff;
    let minutesDiff =
      new Date(date2 - date1).getMinutes();
    return [dayDiff, hoursDiff, minutesDiff];
  }
}
