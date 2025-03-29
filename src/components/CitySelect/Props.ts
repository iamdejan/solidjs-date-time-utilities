import { Accessor, Setter } from "solid-js";

type Props = {
  selectedTZDropDown: Accessor<string>;
  setSelectedTZDropDown: Setter<string>;
};

export default Props;
