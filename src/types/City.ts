type City = {
  key: string;
  timeZone: string;
  name: string;
  country: string;
};

export function formatCity(city: City): string {
  if (city.country === "") {
    return city.name;
  }

  return city.name + ", " + city.country;
}

export default City;
