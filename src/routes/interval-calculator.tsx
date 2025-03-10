import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/interval-calculator')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/interval-calculator"!</div>
}
