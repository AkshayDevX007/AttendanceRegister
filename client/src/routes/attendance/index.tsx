import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/attendance/')({
  component: () => <div>Hello /attendance/!</div>
})