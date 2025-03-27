import City from "./City";

const cityList: City[] = [
  // Australia
  {
    key: "01JQBZHTMB9E07WRPX7TQVBE2E",
    name: "Sydney",
    timeZone: "Australia/Sydney",
    country: "Australia",
  },
  {
    key: "01JQBZHTMB9E07WRPX7TQVBE2F",
    name: "Melbourne",
    timeZone: "Australia/Melbourne",
    country: "Australia",
  },
  {
    key: "01JQBZHTMB9E07WRPX7TQVBE2G",
    name: "Brisbane",
    timeZone: "Australia/Brisbane",
    country: "Australia",
  },
  {
    key: "01JQBZHTMB9E07WRPX7TQVBE2H",
    name: "Perth",
    timeZone: "Australia/Perth",
    country: "Australia",
  },
  {
    key: "01JQBZHTMB9E07WRPX7TQVBE2I",
    name: "Adelaide",
    timeZone: "Australia/Adelaide",
    country: "Australia",
  },
  {
    key: "01JQBZHTMB9E07WRPX7TQVBE2J",
    name: "Gold Coast",
    timeZone: "Australia/Brisbane",
    country: "Australia",
  },
  // China
  {
    key: "01JQBZHTMB9E07WRPX7TQVBE2K",
    name: "Beijing",
    timeZone: "Asia/Shanghai",
    country: "China",
  },
  {
    key: "01JQBZHTMB9E07WRPX7TQVBE2L",
    name: "Shanghai",
    timeZone: "Asia/Shanghai",
    country: "China",
  },
  {
    key: "01JQBZHTMB9E07WRPX7TQVBE2M",
    name: "Guangzhou",
    timeZone: "Asia/Shanghai",
    country: "China",
  },
  {
    key: "01JQBZHTMB9E07WRPX7TQVBE2N",
    name: "Shenzhen",
    timeZone: "Asia/Shanghai",
    country: "China",
  },
  {
    key: "01JQBZHTMB9E07WRPX7TQVBE2O",
    name: "Urumqi",
    timeZone: "Asia/Urumqi",
    country: "China",
  },
  {
    key: "01JQBZHTMB9E07WRPX7TQVBE2P",
    name: "Kashgar",
    timeZone: "Asia/Urumqi",
    country: "China",
  },
  // Indonesia
  {
    key: "01JQBVK368H82SWQMQ6GXJ7BGJ",
    timeZone: "Asia/Jakarta",
    name: "Jakarta",
    country: "Indonesia",
  },
  {
    key: "01JQBVK368H82SWQMQ6GXJ7BGK",
    timeZone: "Asia/Makassar",
    name: "Makassar",
    country: "Indonesia",
  },
  {
    key: "01JQBVK368H82SWQMQ6GXJ7BGM",
    timeZone: "Asia/Jayapura",
    name: "Ternate",
    country: "Indonesia",
  },
  {
    key: "01JQBVK368H82SWQMQ6GXJ7BGN",
    timeZone: "Asia/Jayapura",
    name: "Jayapura",
    country: "Indonesia",
  },
  {
    key: "01JQBZC2RM5K9RF5JV253KA8VW",
    name: "Kuala Lumpur",
    timeZone: "Asia/Kuala_Lumpur",
    country: "Malaysia",
  },
  {
    key: "01JQBZC2RM5K9RF5JV253KA8VX",
    name: "George Town",
    timeZone: "Asia/Kuala_Lumpur",
    country: "Malaysia",
  },
  {
    key: "01JQBZC2RM5K9RF5JV253KA8VY",
    name: "Kuching",
    timeZone: "Asia/Kuching",
    country: "Malaysia",
  },
  {
    key: "01JQBZC2RM5K9RF5JV253KA8VZ",
    name: "Kota Kinabalu",
    timeZone: "Asia/Kuching",
    country: "Malaysia",
  },
  // New Zealand
  {
    key: "01JQBZC2RM5K9RF5JV253KA8W0",
    name: "Auckland",
    timeZone: "Pacific/Auckland",
    country: "New Zealand",
  },
  {
    key: "01JQBZC2RM5K9RF5JV253KA8W1",
    name: "Wellington",
    timeZone: "Pacific/Auckland",
    country: "New Zealand",
  },
  {
    key: "01JQBZC2RM5K9RF5JV253KA8W2",
    name: "Christchurch",
    timeZone: "Pacific/Auckland",
    country: "New Zealand",
  },
  {
    key: "01JQBZC2RM5K9RF5JV253KA8W3",
    name: "Dunedin",
    timeZone: "Pacific/Auckland",
    country: "New Zealand",
  },
  // Singapore
  {
    key: "01JQBZQ023B2ZD09T8RJJMA4NK",
    name: "Singapore",
    timeZone: "Asia/Singapore",
    country: "Singapore",
  },
  // South Korea
  {
    key: "01JQBZQJN9AJRPT52D566RX14K",
    name: "Seoul",
    timeZone: "Asia/Seoul",
    country: "South Korea",
  },
  // Thailand
  {
    key: "01JQBZQJN9AJRPT52D566RX14N",
    name: "Bangkok",
    timeZone: "Asia/Bangkok",
    country: "Thailand",
  },
  {
    key: "01JQBZQJN9AJRPT52D566RX14O",
    name: "Chiang Mai",
    timeZone: "Asia/Bangkok",
    country: "Thailand",
  },
  {
    key: "01JQBZQJN9AJRPT52D566RX14P",
    name: "Phuket",
    timeZone: "Asia/Bangkok",
    country: "Thailand",
  },
  // United Kingdom
  {
    key: "01JQC03NTHZJRY16QBMPJ39XRK",
    name: "London",
    timeZone: "Europe/London",
    country: "United Kingdom",
  },
  {
    key: "01JQC03NTHZJRY16QBMPJ39XRL",
    name: "Edinburgh",
    timeZone: "Europe/London",
    country: "United Kingdom",
  },
  {
    key: "01JQC03NTHZJRY16QBMPJ39XRM",
    name: "Belfast",
    timeZone: "Europe/London",
    country: "United Kingdom",
  },
  {
    key: "01JQC03NTHZJRY16QBMPJ39XRO",
    name: "Manchester",
    timeZone: "Europe/London",
    country: "United Kingdom",
  },
  {
    key: "01JQC03NTHZJRY16QBMPJ39XRP",
    name: "Liverpool",
    timeZone: "Europe/London",
    country: "United Kingdom",
  },
  {
    key: "01JQC03NTHZJRY16QBMPJ39XRQ",
    name: "Birmingham",
    timeZone: "Europe/London",
    country: "United Kingdom",
  },
];

export default function sortedCityList() {
  return cityList.sort(
    (a, b) =>
      a.country.localeCompare(b.country) || a.name.localeCompare(b.name),
  );
}
