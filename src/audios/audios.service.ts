import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateAudioDto } from "./dto/create-audio.dto"
import { WaveFile } from "wavefile"
import * as fs from "fs"
import { InjectModel } from "@nestjs/mongoose"
import { AudioDocument } from "./entities/audio.entity"
import { ConfigService } from "@nestjs/config"
import { Model } from "mongoose"
import { Audio } from "./entities/audio.entity"
const path = require("path")

@Injectable()
export class AudiosService {
  constructor(@InjectModel(Audio.name) private readonly audioModel: Model<AudioDocument>, private readonly configService: ConfigService) {}

  async create(file: Express.Multer.File, createAudioDto: CreateAudioDto) {
    const wav = new WaveFile(file.buffer)
    wav.toBitDepth("8")
    wav.toSampleRate(16000, { method: "sinc" })
    const audio = new this.audioModel(createAudioDto)
    const fullPath = path.join(this.configService.get("UPLOAD_DEST"), audio.id + ".wav")
    fs.writeFileSync(fullPath, wav.toBuffer())
    audio.full_path = fullPath
    return await audio.save()
  }

  async findAll() {
    return this.audioModel.find()
  }

  async getFilePath(id: string) {
    const audio = await this.audioModel.findById(id)
    if (!audio) throw new NotFoundException()
    return audio.full_path
  }

  async findOne(id: string) {
    const audio = await this.audioModel.findById(id)
    if (!audio) throw new NotFoundException()
    return audio
  }

  async removeOne(id: string) {
    const audio = await this.audioModel.findByIdAndDelete(id)
    if (!audio) throw new NotFoundException()
  }

  async removeAll() {
    await this.audioModel.deleteMany({})
  }
}
