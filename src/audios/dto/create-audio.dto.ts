import { IsString } from "class-validator"

export class CreateAudioDto {
  @IsString()
  name: string
}
