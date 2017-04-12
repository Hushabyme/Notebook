function Car (model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;

  this.toString = function () {
    return this.model + ' has done ' + this.miles + ' miles';
  }
}

const myCar = new Car('Honda Civic', 2009, 20000);

console.log(myCar.toString());  // Honda Civic has done 20000 miles
