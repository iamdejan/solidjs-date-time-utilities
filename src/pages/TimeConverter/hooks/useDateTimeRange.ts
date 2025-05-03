import { TZDate } from "@date-fns/tz";
import { MdSlider } from "@material/web/all";
import { addMinutes, differenceInHours, format, startOfDay } from "date-fns";
import { Accessor, createSignal, Setter } from "solid-js";

export const min = 0;
export const max = 96;

function startOfToday(referenceTimeZone: string): TZDate {
  const now = new TZDate(new Date(), referenceTimeZone);
  return startOfDay(now);
}

function calculateInitialStartValue(referenceTimeZone: string): number {
  const now = new TZDate(new Date(), referenceTimeZone);
  const todayStart = startOfDay(now);
  const hoursSinceStartOfDay = differenceInHours(now, todayStart);
  return Math.floor((hoursSinceStartOfDay * 60) / 15);
}

function calculateInitialEndValue(referenceTimeZone: string): number {
  return calculateInitialStartValue(referenceTimeZone) + 4;
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

export default function useDateTimeRange(
  referenceTimeZone: Accessor<string>,
): HookOutput {
  const [startValue, setStartValue] = createSignal<number>(
    calculateInitialStartValue(referenceTimeZone()),
  );
  const [endValue, setEndValue] = createSignal<number>(
    calculateInitialEndValue(referenceTimeZone()),
  );

  function start(): Date {
    const result = addMinutes(
      startOfToday(referenceTimeZone()),
      startValue() * 15,
    );
    return result;
  }

  function startValueLabel(): string {
    return format(start(), "HH:mm");
  }

  function end(): Date {
    const result = addMinutes(
      startOfToday(referenceTimeZone()),
      endValue() * 15,
    );
    return result;
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
