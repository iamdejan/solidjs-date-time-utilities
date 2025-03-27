import { createSignal } from "solid-js";
import City from "./City";
import sortedCityList from "./cityList";
import { SelectChangeEvent } from "@suid/material/Select";
import { Accessor } from "solid-js";

function getLocalTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

type HookOutput = {
  selectedTZDropDown: Accessor<string>;
  // eslint-disable-next-line no-unused-vars
  handleTimeZoneSelectChange: (ev: SelectChangeEvent) => void;

  chosenTimeZones: Accessor<City[]>;
  addChosenTimeZone: () => void;
};

export default function useCityDropDown(): HookOutput {
  const [selectedTZDropDown, setSelectedTZDropDown] = createSignal<string>("");
  const [chosenTimeZones, setChosenTimeZones] = createSignal<City[]>([
    {
      key: "00000000000000000000000000",
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

      setChosenTimeZones([...chosenTimeZones(), found]);
      setSelectedTZDropDown("");
    }
  }

  return {
    selectedTZDropDown,
    handleTimeZoneSelectChange,
    chosenTimeZones,
    addChosenTimeZone,
  };
}
