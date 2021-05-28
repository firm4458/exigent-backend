import { Types } from "mongoose"
import { TaskType } from "../entities/task.entity"

export class CreateTaskDto {
  type: TaskType
  schedule_id: string
  receiver_id: string
  audio_id: string
  time: Date
  finished: boolean
  published: boolean
  received: boolean
}
