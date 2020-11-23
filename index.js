class Map {
  constructor(data) {
    this.data = data

      .split(";")
      .map((i) => i.replace(/["]/g, ``).split(","))
      .map((i) => ({
        name: [i[0].replace(/\s/g, ``), i[1]].join(","),
        latitude: i[2],
        longitude: i[3],
      }));
  }

  getCountry(side) {
    switch (side.toLowerCase()) {
      case "northernmost":
        return this.data.reduce((acc, city) =>
          acc.latitude > city.latitude ? acc : city
        ).name;
      case "southernmost":
        return this.data.reduce((acc, city) =>
          acc.latitude < city.latitude ? acc : city
        ).name;
      case "westernmost":
        return this.data.reduce((acc, city) =>
          acc.longitude > city.longitude ? acc : city
        ).name;
      case "easternmost":
        return this.data.reduce((acc, city) =>
          acc.longitude < city.longitude ? acc : city
        ).name;
      default:
        return `There is no such side of the world.
  You should choose: northernmost, southernmost, westernmost, easternmost `;
    }
  }

  getNearCity(latitude, longitude) {
    let index = 0;
    let sumCordinats = Math.abs(latitude + longitude);
    this.data.map((i, ind) => {
      let currentAbsoluteSum =
        Math.abs(+i.latitude - latitude) + Math.abs(+i.longitude - longitude);
      if (sumCordinats > currentAbsoluteSum) {
        index = ind;
        sumCordinats = currentAbsoluteSum;
      }
    });
    return this.data[index].name;
  }

  getStates() {
    return [
      ...new Set(this.data.map((i) => i.name.replace(/(\D*?) /g, ""))),
    ].join(" ");
  }
}

const cityMap = new Map(`
"Nashville, TN", 36.17, -86.78;

"New York, NY", 40.71, -74.00;

"Atlanta, GA", 33.75, -84.39;

"Denver, CO", 39.74, -104.98;

"Seattle, WA", 47.61, -122.33;

"Los Angeles, CA", 34.05, -118.24;

"Memphis, TN", 35.15, -90.05`);

console.log(cityMap.getCountry("southernmost"));
console.log(cityMap.getCountry("Westernmost"));
console.log(cityMap.getNearCity(46, -120));
console.log(cityMap.getNearCity(34, -117));
console.log(cityMap.getStates());
