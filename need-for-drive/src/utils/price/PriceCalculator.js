export default class PriceCalculator {
  constructor(tariffDays, tariffMinutes) {
    this.tariffDays = tariffDays;
    this.tariffMinutes = tariffMinutes;
  }

  calcPrice(rentalTime, tariff, extraServices) {
    let price = 0;
    let days, minutes;
    switch (tariff) {
      case "day":
        console.log('day')
        days = rentalTime[0] === 0 ? 1 : (rentalTime[1] > 0 || rentalTime[2] > 0)? rentalTime[0] + 1 : rentalTime[0];
        price =
          days * this.tariffDays +
          extraServices.reduce(function(sum, current) {
            return (sum += current);
          }, 0);
        return price;
      case "minute":
        console.log("minutes")
        minutes = rentalTime[0] * 24 * 60 + rentalTime[1] * 60 + rentalTime[2];
        price =
          minutes * this.tariffMinutes +
          extraServices.reduce(function(sum, current) {
            return (sum += current);
          }, 0);
        return price;
      default:
        return 0;
    }
  }
}
