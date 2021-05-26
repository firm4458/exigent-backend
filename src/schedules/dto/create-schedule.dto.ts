import { Type } from "class-transformer"
import { IsArray, IsDate, IsMongoId, IsString, Validate } from "class-validator"
import { ValidateRef } from "../../common/validateRef"

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
  @Validate(ValidateRef, ["Device"], { each: true })
  @IsMongoId({ each: true })
  receivers: Array<string>

  /* 
        waiting for AudiosModule
        @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Audio' )
        receivers: Audio;
    */
  @Validate(ValidateRef, ["Audio"])
  @IsMongoId()
  audio: string
}
