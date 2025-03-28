import { atom, useAtom } from "solid-jotai";
import { Accessor } from "solid-js";

export type Mode = "light" | "dark";

function nextMode(mode: Mode): Mode {
  return mode === "light" ? "dark" : "light";
}

const modeAtom = atom((localStorage.getItem("mode") as Mode) || "dark");

const modeAtomWithPersistence = atom(
  (get) => get(modeAtom),
  (_, set, newMode: Mode) => {
    localStorage.setItem("mode", newMode);
    set(modeAtom, newMode);
  },
);

type HookOutput = {
  mode: Accessor<Mode>;
  switchMode: () => void;
};

export default function useMode(): HookOutput {
  const [mode, setMode] = useAtom(modeAtomWithPersistence);

  function switchMode() {
    setMode(nextMode(mode()));
  }

  return {
    mode,
    switchMode,
  };
}
