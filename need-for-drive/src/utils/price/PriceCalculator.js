export default class PriceCalculator {
  constructor(tariffDays, tariffMinutes, tariffWeeks) {
    this.tariffDays = tariffDays;
    this.tariffMinutes = tariffMinutes;
    this.tariffweeks = tariffWeeks;
  }

  calcPrice(rentalTime, tariff, extraServices) {
    let price = 0;
    let days, minutes, weeks, tail;
    switch (tariff) {
      case "day":
        days =
          rentalTime[0] === 0
            ? 1
            : rentalTime[1] > 0 || rentalTime[2] > 0
            ? rentalTime[0] + 1
            : rentalTime[0];
        price =
          days * this.tariffDays +
          extraServices.reduce(function(sum, current) {
            return (sum += current);
          }, 0);
        return price;
      case "minute":
        minutes = rentalTime[0] * 24 * 60 + rentalTime[1] * 60 + rentalTime[2];
        price =
          minutes * this.tariffMinutes +
          extraServices.reduce(function(sum, current) {
            return (sum += current);
          }, 0);
        return price;
      case "week":
        weeks = Math.floor(rentalTime[0] / 7);
        tail = rentalTime[0] % 7 + rentalTime[1] + rentalTime[2];
        if (tail === 0) {
          return weeks * this.tariffweeks;
        } else {
          return (weeks + 1) * this.tariffweeks;
        }
      default:
        return 0;
    }
  }
}
