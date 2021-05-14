import { Type } from "class-transformer"
import { IsArray, IsDate, IsMongoId, IsString, ValidateNested } from "class-validator"
import { Types } from "mongoose"

export class CreateScheduleDto {
  @IsString()
  name: string

  @Type(() => Date)
  @IsDate()
  time: Date

  /* 
        waiting for DevicesModule
        @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }] })
        receivers: Array<Device>;
    */
  @IsArray()
  @IsMongoId({ each: true })
  receivers: Array<string>

  /* 
        waiting for AudiosModule
        @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Audio' )
        receivers: Audio;
    */
  @IsMongoId()
  audio: string
}
