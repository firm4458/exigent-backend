import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Exclude } from "class-transformer"

export type AudioDocument = Audio & Document

@Schema()
export class Audio {
  id: string
  @Prop()
  name: string
  @Prop()
  full_path: string
}

export class AudioResponseObject extends Audio {
  @Exclude()
  full_path: string
  constructor(audio: Audio) {
    super()
    this.id = audio.id
    this.name = audio.name
  }
}

export const AudioSchema = SchemaFactory.createForClass(Audio)
