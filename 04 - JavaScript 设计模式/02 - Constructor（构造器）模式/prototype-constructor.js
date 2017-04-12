function Car (model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}

Car.prototype = {
  toString: function () {
    return this.model + ' has done ' + this.miles + ' miles';
  },
  changeYear: function (miles) {
    return this.miles = miles;
  }
};

const myCar = new Car('Honda Civic', 2009, 20000);

console.log(myCar.toString());  // Honda Civic has done 20000 miles
console.log(myCar.changeYear(50000));  // 50000
