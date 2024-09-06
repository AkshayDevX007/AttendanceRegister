import { createFileRoute } from '@tanstack/react-router'
import UserAttendance from '../../pages/userAttendance'

export const Route = createFileRoute('/attendance/$id')({
  component: UserAttendance
})