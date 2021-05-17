import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"
import { Audio } from "../../audios/entities/audio.entity"
import { Device } from "../../devices/entities/device.entity"
import { Schedule } from "../../schedules/entities/schedule.entity"

export type TaskType = "Download" | "Play"
export type TaskDocument = Task & Document

@Schema()
export class Task {
  @Prop({ type: String, enum: ["Download", "Play"] })
  type: TaskType
  @Prop()
  schedule_id: Types.ObjectId
  @Prop()
  receiver_id: Types.ObjectId
  @Prop()
  audio_id: Types.ObjectId
  @Prop()
  time: Date
  @Prop()
  finished: boolean
  @Prop()
  published: boolean
}

export const TaskSchema = SchemaFactory.createForClass(Task)
