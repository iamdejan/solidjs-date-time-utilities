import { createSignal, Setter } from "solid-js";
import City from "./City";
import sortedCityList from "./cityList";
import { SelectChangeEvent } from "@suid/material/Select";
import { Accessor } from "solid-js";

export const zeroULID = "00000000000000000000000000";

function getLocalTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

type HookOutput = {
  selectedTZDropDown: Accessor<string>;
  // eslint-disable-next-line no-unused-vars
  handleTimeZoneSelectChange: (ev: SelectChangeEvent) => void;

  chosenTimeZones: Accessor<City[]>;
  addChosenTimeZone: () => void;
  // eslint-disable-next-line no-unused-vars
  removeChosenTimeZone: (key: string) => void;

  searchText: Accessor<string>;
  setSearchText: Setter<string>;
  displayedCityList: () => City[];
};

export default function useCityDropDown(): HookOutput {
  const [selectedTZDropDown, setSelectedTZDropDown] = createSignal<string>("");
  const [chosenTimeZones, setChosenTimeZones] = createSignal<City[]>([
    {
      key: zeroULID,
      timeZone: getLocalTimeZone(),
      name: "(User's Location)",
      country: "",
    },
  ]);

  function handleTimeZoneSelectChange(ev: SelectChangeEvent) {
    const key = ev.target.value;
    setSelectedTZDropDown(key);
  }

  function addChosenTimeZone() {
    const selectedKey = selectedTZDropDown();
    if (selectedKey) {
      const found = sortedCityList().find((city) => city.key === selectedKey);
      if (!found) {
        return;
      }

      const alreadyExists = chosenTimeZones().find(
        (city) => city.key === selectedKey,
      );
      if (alreadyExists) {
        return;
      }

      setChosenTimeZones([...chosenTimeZones(), found]);
      setSelectedTZDropDown("");
    }
  }

  function removeChosenTimeZone(key: string) {
    const found = chosenTimeZones().filter((city) => city.key === key);
    if (!found) {
      return;
    }

    if (found[0].key === zeroULID) {
      return;
    }

    setChosenTimeZones(chosenTimeZones().filter((city) => city.key !== key));
  }

  const [searchText, setSearchText] = createSignal("");
  function displayedCityList(): City[] {
    return sortedCityList().filter((city) => {
      return (
        city.timeZone.toLowerCase().includes(searchText().toLowerCase()) ||
        city.name.toLowerCase().includes(searchText().toLowerCase()) ||
        city.country.toLowerCase().includes(searchText().toLowerCase())
      );
    });
  }

  return {
    selectedTZDropDown,
    handleTimeZoneSelectChange,
    chosenTimeZones,
    addChosenTimeZone,
    removeChosenTimeZone,
    searchText,
    setSearchText,
    displayedCityList,
  };
}
