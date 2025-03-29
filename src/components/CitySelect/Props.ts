import { Accessor, Setter } from "solid-js";

type Props = {
  selectedCityKey: Accessor<string>;
  setSelectedCityKey: Setter<string>;
};

export default Props;
