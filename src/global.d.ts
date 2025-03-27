// reference: https://stackoverflow.com/a/78627418

/* eslint-disable no-unused-vars */
import "@material/web/all";

type WithAnyChildrenAndClasses =
  | { children: any }
  | {}
  | { onChange: ((this: GlobalEventHandlers, ev: Event) => any) | null }
  | { onPointerMove: ((this: GlobalEventHandlers, ev: Event) => any) | null }
  | { class?: string; classList?: Record<string, boolean> };

type SolidInterface = {
  [P in keyof HTMLElementTagNameMap]:
    | HTMLElementTagNameMap[P]
    | WithAnyChildrenAndClasses;
};

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements extends SolidInterface {}
  }
}
