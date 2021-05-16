import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"
import { Audio, AudioResponseObject } from "../../audios/entities/audio.entity"

export type ScheduleDocument = Schedule & Document

@Schema()
export class Schedule {
  id: string
  @Prop()
  name: string

  @Prop()
  time: Date

  /* 
        waiting for DevicesModule
        @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }] })
        receivers: Array<Device>;
    */
  @Prop([Types.ObjectId])
  receivers: Array<Types.ObjectId>

  @Prop({ type: Types.ObjectId, ref: "Audio" })
  audio: Audio
}

export class ScheduleResponseObject extends Schedule {
  audio: AudioResponseObject
  constructor(schedule: Schedule) {
    super()
    this.name = schedule.name
    this.time = schedule.time
    this.receivers = schedule.receivers
    this.audio = new AudioResponseObject(schedule.audio)
    this.id = schedule.id
  }
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule)
