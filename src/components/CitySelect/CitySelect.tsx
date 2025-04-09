import {
  FormControl,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from "@suid/material";
import { JSX, For, createSignal } from "solid-js";
import useCityDropDown from "./hooks/useCityDropDown";
import Props from "./Props";
import { formatCity } from "../../types/City";
import { accessorDebounced } from "solidjs-use";

export default function CitySelect(props: Props): JSX.Element {
  const {
    handleTimeZoneSelectChange,
    searchText,
    setSearchText,
    displayedCityList,
  } = useCityDropDown(props);

  const cityListDebounced = accessorDebounced(displayedCityList, 500);

  const [windowWidth, setWindowWith] = createSignal<number>(window.innerWidth);
  window.addEventListener("resize", () => {
    setWindowWith(window.innerWidth);
  });
  function formWidth(): string {
    return windowWidth() >= 1000 ? "300px" : "175px";
  }

  return (
    <FormControl
      sx={{
        // minWidth: "50px",
        // maxWidth: "300px",
        width: formWidth(),
      }}
    >
      <Select
        value={props.selectedCityKey()}
        MenuProps={{ autoFocus: false }}
        onChange={handleTimeZoneSelectChange}
      >
        {/* ref: https://stackoverflow.com/a/70918883 */}
        <ListSubheader>
          <TextField
            fullWidth
            label="Search by city or country"
            value={searchText()}
            autoFocus
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Escape") {
                // Prevents autoselecting item while typing (default Select behaviour)
                e.stopPropagation();
              }
            }}
          />
        </ListSubheader>
        <For each={cityListDebounced()}>
          {(city) => <MenuItem value={city.key}>{formatCity(city)}</MenuItem>}
        </For>
      </Select>
    </FormControl>
  );
}
