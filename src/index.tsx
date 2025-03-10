/* @refresh reload */
import { render } from 'solid-js/web';

import { createRouter, RouterProvider } from '@tanstack/solid-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
})

// Register the router instance for type safety
declare module '@tanstack/solid-router' {
  // eslint-disable-next-line no-unused-vars
  interface Register {
    router: typeof router
  }
}

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <RouterProvider router={router} />, root!);
