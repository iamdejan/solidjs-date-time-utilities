import { Accessor, createSignal } from "solid-js";
import City from "../../../types/City";
import sortedCityList from "../../../components/CitySelect/cityList";

export const zeroULID = "00000000000000000000000000";

function getLocalTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

type HookOutput = {
  chosenTimeZones: Accessor<City[]>;
  // eslint-disable-next-line no-unused-vars
  addChosenTimeZone: (key: string) => void;
  // eslint-disable-next-line no-unused-vars
  removeChosenTimeZone: (key: string) => void;
};

export default function useChosenTimeZones(): HookOutput {
  const [chosenTimeZones, setChosenTimeZones] = createSignal<City[]>([
    {
      key: zeroULID,
      timeZone: getLocalTimeZone(),
      name: "(User's Location)",
      country: "",
    },
  ]);

  function addChosenTimeZone(key?: string) {
    if (!key) {
      return;
    }

    const found = sortedCityList.find((city) => city.key === key);
    if (!found) {
      return;
    }

    const alreadyExists = chosenTimeZones().find((city) => city.key === key);
    if (alreadyExists) {
      return;
    }

    setChosenTimeZones([...chosenTimeZones(), found]);
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

  return {
    chosenTimeZones,
    addChosenTimeZone,
    removeChosenTimeZone,
  };
}
