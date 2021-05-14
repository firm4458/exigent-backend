import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Transform } from "class-transformer"
import { Document, Types } from "mongoose"

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

  /* 
        waiting for AudiosModule
        @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Audio' )
        receivers: Audio;
    */
  @Prop({ type: Types.ObjectId })
  audio: Types.ObjectId
}

export class ScheduleResponseObject extends Schedule {
  constructor(schedule: Schedule) {
    super()
    this.name = schedule.name
    this.time = schedule.time
    this.receivers = schedule.receivers
    this.audio = schedule.audio
    this.id = schedule.id
  }
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule)
