import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"
import { Audio, AudioResponseObject } from "../../audios/entities/audio.entity"
import { Device, DeviceResponseObject } from "../../devices/entities/device.entity"

export type ScheduleDocument = Schedule & Document

@Schema()
export class Schedule {
  id: string
  @Prop()
  name: string

  @Prop()
  time: Date

  @Prop({ type: [{ type: Types.ObjectId, ref: "Device" }] })
  receivers: Array<Device>

  @Prop({ type: Types.ObjectId, ref: "Audio" })
  audio: Audio
}

export class ScheduleResponseObject extends Schedule {
  audio: AudioResponseObject
  receivers: Array<DeviceResponseObject>
  constructor(schedule: Schedule) {
    super()
    this.name = schedule.name
    this.time = schedule.time
    this.receivers = schedule.receivers.map((device) => new DeviceResponseObject(device))
    this.audio = new AudioResponseObject(schedule.audio)
    this.id = schedule.id
  }
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule)
