import { MdSlider } from "@material/web/all";
import { addMinutes, differenceInHours, format, startOfToday } from "date-fns";
import { Accessor, createSignal, Setter } from "solid-js";

export const min = 0;
export const max = 96;

function calculateInitialStartValue(): number {
  const now = new Date();
  const startOfDay = startOfToday();
  const hoursSinceStartOfDay = differenceInHours(now, startOfDay);
  return Math.floor((hoursSinceStartOfDay * 60) / 15);
}

function calculateInitialEndValue(): number {
  return calculateInitialStartValue() + 4;
}

export type HookOutput = {
  start: Accessor<Date>;
  end: Accessor<Date>;

  startValue: Accessor<number>;
  setStartValue: Setter<number>;
  endValue: Accessor<number>;
  setEndValue: Setter<number>;

  startValueLabel: Accessor<string>;
  endValueLabel: Accessor<string>;

  // eslint-disable-next-line no-unused-vars
  handleSliderChange: (ev: Event) => void;
};

export default function useDateTimeRange(): HookOutput {
  const [startValue, setStartValue] = createSignal<number>(
    calculateInitialStartValue(),
  );
  const [endValue, setEndValue] = createSignal<number>(
    calculateInitialEndValue(),
  );

  function start(): Date {
    return addMinutes(startOfToday(), startValue() * 15);
  }

  function startValueLabel(): string {
    return format(start(), "HH:mm");
  }

  function end(): Date {
    return addMinutes(startOfToday(), endValue() * 15);
  }

  function endValueLabel(): string {
    return format(end(), "HH:mm");
  }

  function handleSliderChange(ev: Event) {
    const target = ev.target as MdSlider;
    if (!target) {
      return;
    }

    if (target.valueStart === undefined) {
      target.valueStart = min;
    }
    setStartValue(target.valueStart);
    target.valueLabelStart = startValueLabel();

    if (target.valueEnd === undefined) {
      target.valueEnd = max;
    }
    setEndValue(target.valueEnd);
    target.valueLabelEnd = endValueLabel();
  }

  return {
    start,
    end,
    startValue,
    setStartValue,
    endValue,
    setEndValue,
    startValueLabel,
    endValueLabel,
    handleSliderChange,
  };
}
