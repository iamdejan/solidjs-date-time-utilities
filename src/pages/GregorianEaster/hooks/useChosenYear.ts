import { createWithSignal } from "solid-zustand";

type YearState = {
  chosenYear: number;
  // eslint-disable-next-line no-unused-vars
  setChosenYear: (year: number) => void;
  clearYear: () => void;
};

const localStorageKey = "chosen-year";

const useChosenYear = createWithSignal<YearState>((set) => ({
  chosenYear: Number.parseInt(localStorage.getItem(localStorageKey) || "0"),
  setChosenYear: (year: number) =>
    set(() => {
      localStorage.setItem(localStorageKey, year.toString());
      return { chosenYear: year };
    }),
  clearYear: () =>
    set(() => {
      localStorage.removeItem(localStorageKey);
      return { chosenYear: 0 };
    }),
}));

export default useChosenYear;
