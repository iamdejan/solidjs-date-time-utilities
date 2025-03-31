import { createWithSignal } from "solid-zustand";

type YearState = {
  chosenYear: number;
  // eslint-disable-next-line no-unused-vars
  setChosenYear: (year: number) => void;
};

const localStorageKey = "chosen-year";

const useChosenYear = createWithSignal<YearState>((set) => ({
  chosenYear: Number.parseInt(localStorage.getItem(localStorageKey) || "0"),
  setChosenYear: (year: number) =>
    set(() => {
      localStorage.setItem(localStorageKey, year.toString());
      return { chosenYear: year };
    }),
}));

export default useChosenYear;
