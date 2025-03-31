import { createLink } from "@tanstack/solid-router";
import { JSX } from "solid-js";

type BasicLinkProps = JSX.IntrinsicElements["a"];

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

export default CreatedLinkComponent;
