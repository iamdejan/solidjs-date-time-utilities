import City from "../../types/City";
import cityListJSON from "./cityList.json";

const cityList: City[] = cityListJSON;

const sortedCityList: City[] = [
  {
    key: "",
    name: "(User's Location)",
    timeZone: "",
    country: "",
  },
  ...cityList.sort(
    (a, b) =>
      a.country.localeCompare(b.country) || a.name.localeCompare(b.name),
  ),
];

export default sortedCityList;
