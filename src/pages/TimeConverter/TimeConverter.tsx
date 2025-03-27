import { createSignal, JSX } from "solid-js";
import "@material/web/slider/slider.js";
import { Box, Grid, Typography } from "@suid/material";
import { MdSlider } from "@material/web/slider/slider.js";
import { addMinutes, formatISO9075, startOfToday } from "date-fns";

const style = {
  display: "flex",
  flexGrow: "1",
} as CSSStyleDeclaration;

export default function TimeConverter(): JSX.Element {
  const [startValue, setStartValue] = createSignal<number>(32);
  const [endValue, setEndValue] = createSignal<number>(64);

  const startValueLabel = (): string => {
    const start = addMinutes(startOfToday(), startValue() * 15);
    return formatISO9075(start);
  };

  const endValueLabel = (): string => {
    const end = addMinutes(startOfToday(), endValue() * 15);
    return formatISO9075(end);
  };

  function handleChange(ev: Event) {
    const target = ev.target as MdSlider;
    if (target.valueStart) {
      setStartValue(target.valueStart);
    }
    if (target.valueEnd) {
      setEndValue(target.valueEnd);
    }

    target.valueLabelStart = startValueLabel();
    target.valueLabelEnd = endValueLabel();
  }

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Time Converter
      </Typography>

      <Box
        sx={{
          marginTop: "2rem",
          justifyContent: "center",
          width: "clamp(50vw, 100vw, 100vw)",
        }}
      >
        <md-slider
          range={true}
          min={0}
          max={96}
          labeled={true}
          ticks={true}
          valueLabelStart={startValueLabel()}
          ariaLabelStart={startValueLabel()}
          valueLabelEnd={endValueLabel()}
          ariaLabelEnd={endValueLabel()}
          valueStart={startValue()}
          valueEnd={endValue()}
          style={style}
          onChange={handleChange}
          onPointerMove={handleChange}
        />
      </Box>

      <Grid container>
        <Grid item container sx={{ justifyContent: "space-between" }}>
          <Grid item>Start: {startValueLabel()}</Grid>
          <Grid item>{endValueLabel()}</Grid>
        </Grid>
        <Grid item container sx={{ justifyContent: "space-between" }}>
          <Grid item>Start: {startValueLabel()}</Grid>
          <Grid item>{endValueLabel()}</Grid>
        </Grid>
      </Grid>
    </>
  );
}
