import { ListItem } from "@suid/material";
import { createLink } from "@tanstack/solid-router";
import { JSX } from "solid-js";
import { useThemeOption } from "../../pages/Home/hooks/useThemeOption";
import { grey } from "@suid/material/colors";

type Props = {
  to: string;
  text: string;
};

type BasicLinkProps = JSX.IntrinsicElements["a"];

export default function DrawerLink(props: Props): JSX.Element {
  const { mode } = useThemeOption();
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
