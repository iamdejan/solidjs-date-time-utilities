import { ListItem } from "@suid/material";
import { createLink } from "@tanstack/solid-router";
import { JSX } from "solid-js";
import { grey } from "@suid/material/colors";
import useMode from "../../hooks/useMode";

type Props = {
  to: string;
  text: string;
};

type BasicLinkProps = JSX.IntrinsicElements["a"];

export default function DrawerLink(props: Props): JSX.Element {
  const mode = useMode((state) => state.mode);
  function hoverColor(): string {
    return mode() === "light" ? grey[200] : grey[800];
  }

  const CreatedLinkComponent = createLink((props: BasicLinkProps) => (
    <a
      style={{
        "text-decoration": "none",
        color: "inherit",
        "box-shadow": "none",
      }}
      {...props}
    />
  ));

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
