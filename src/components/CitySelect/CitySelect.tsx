import {
  FormControl,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from "@suid/material";
import { JSX, For } from "solid-js";
import useCityDropDown from "./hooks/useCityDropDown";
import Props from "./Props";

export default function CitySelect(props: Props): JSX.Element {
  const {
    handleTimeZoneSelectChange,
    searchText,
    setSearchText,
    displayedCityList,
  } = useCityDropDown(props);

  return (
    <FormControl
      sx={{
        minWidth: "clamp(50px, 200px, 250px)",
      }}
    >
      <Select
        value={props.selectedTZDropDown()}
        MenuProps={{ autoFocus: false }}
        onChange={handleTimeZoneSelectChange}
      >
        {/* ref: https://stackoverflow.com/a/70918883 */}
        <ListSubheader>
          <TextField
            label="Keyword"
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
        <For each={displayedCityList()}>
          {(city) => (
            <MenuItem value={city.key}>
              {city.name}, {city.country}
            </MenuItem>
          )}
        </For>
      </Select>
    </FormControl>
  );
}
