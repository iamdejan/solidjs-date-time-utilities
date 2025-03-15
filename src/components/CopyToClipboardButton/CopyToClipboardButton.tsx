import { IconButton } from "@suid/material";
import { JSX } from "solid-js";
import ContentCopyIcon from "@suid/icons-material/ContentCopy";
import { useClipboard } from "solidjs-use";

type Props = {
  function: () => string;
};

export default function CopyToClipboardButton(props: Props): JSX.Element {
  const { copy } = useClipboard();

  return (
    <IconButton onClick={() => copy(props.function())}>
      <ContentCopyIcon />
    </IconButton>
  );
}
