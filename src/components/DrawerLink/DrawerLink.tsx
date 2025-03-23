import { ListItem } from "@suid/material";
import { JSX } from "solid-js";
import { grey } from "@suid/material/colors";
import useMode from "../../hooks/useMode";
import CreatedLinkComponent from "./CreatedLinkComponent";
import { FileRoutesByPath } from "@tanstack/solid-router";

type Props = {
  to: keyof FileRoutesByPath;
  text: string;
};

export default function DrawerLink(props: Props): JSX.Element {
  const mode = useMode((state) => state.mode);
  function hoverColor(): string {
    return mode() === "light" ? grey[200] : grey[800];
  }

  return (
    <CreatedLinkComponent to={props.to}>
      <ListItem
        sx={{
          "&:hover": {
            backgroundColor: hoverColor(),
          },
        }}
      >
        {props.text}
      </ListItem>
    </CreatedLinkComponent>
  );
}
