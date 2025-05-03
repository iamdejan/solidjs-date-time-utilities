import { Accessor, createMemo, createSignal } from "solid-js";
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
  referenceTimeZone: Accessor<string>;
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
    if (key === zeroULID) {
      setChosenTimeZones(
        chosenTimeZones().filter((city) => city.key !== zeroULID),
      );
      return;
    }

    const found = chosenTimeZones().filter((city) => city.key === key);
    if (!found) {
      return;
    }

    setChosenTimeZones(chosenTimeZones().filter((city) => city.key !== key));
  }

  const referenceTimeZone = createMemo(() => {
    if (!chosenTimeZones() || chosenTimeZones().length < 1) {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    return (
      chosenTimeZones()[0].timeZone ||
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
  });

  return {
    chosenTimeZones,
    addChosenTimeZone,
    removeChosenTimeZone,
    referenceTimeZone,
  };
}
