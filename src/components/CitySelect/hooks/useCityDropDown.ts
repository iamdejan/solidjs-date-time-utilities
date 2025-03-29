import { createSignal, Setter } from "solid-js";
import { SelectChangeEvent } from "@suid/material/Select";
import { Accessor } from "solid-js";
import City from "../../../types/City";
import sortedCityList from "../cityList";
import Props from "../Props";

type HookOutput = {
  // eslint-disable-next-line no-unused-vars
  handleTimeZoneSelectChange: (ev: SelectChangeEvent) => void;

  searchText: Accessor<string>;
  setSearchText: Setter<string>;
  displayedCityList: () => City[];
};

export default function useCityDropDown(props: Props): HookOutput {
  const [searchText, setSearchText] = createSignal("");

  function handleTimeZoneSelectChange(ev: SelectChangeEvent) {
    const key = ev.target.value;
    props.setSelectedCityKey(key);
  }

  function displayedCityList(): City[] {
    const cityList = sortedCityList();
    if (searchText() === "") {
      return [cityList[0]];
    }

    return cityList.filter((city) => {
      return (
        city.name.toLowerCase().includes(searchText().toLowerCase()) ||
        city.country.toLowerCase().includes(searchText().toLowerCase())
      );
    });
  }

  return {
    handleTimeZoneSelectChange,
    searchText,
    setSearchText,
    displayedCityList,
  };
}
