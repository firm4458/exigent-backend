import { Module } from "@nestjs/common"
import { AudiosService } from "./audios.service"
import { AudiosController } from "./audios.controller"
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { Audio, AudioSchema } from "./entities/audio.entity"

@Module({
  imports: [MongooseModule.forFeature([{ name: Audio.name, schema: AudioSchema }]), ConfigModule],
  controllers: [AudiosController],
  providers: [AudiosService],
})
export class AudiosModule {}
