import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, HttpCode, HttpStatus, Res } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { Response } from "express"
import { StandardResponse } from "../common/standardResponse"
import { AudiosService } from "./audios.service"
import { CreateAudioDto } from "./dto/create-audio.dto"
import { AudioResponseObject } from "./entities/audio.entity"

@Controller("audios")
export class AudiosController {
  constructor(private readonly audiosService: AudiosService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateAudioDto) {
    const response = new AudioResponseObject(await this.audiosService.create(file, dto))
    return new StandardResponse(HttpStatus.CREATED, "Audio Created", response)
  }

  @Get()
  async findAll() {
    const audios = await this.audiosService.findAll()
    const response = audios.map((audio) => new AudioResponseObject(audio))
    return new StandardResponse(HttpStatus.OK, "Ok", response)
  }

  @Get(":id/file")
  async getFile(@Param("id") id: string, @Res() res: Response) {
    const path = await this.audiosService.getFilePath(id)
    res.sendFile(path)
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const audio = await this.audiosService.findOne(id)
    return new StandardResponse(HttpStatus.OK, "Ok", new AudioResponseObject(audio))
  }

  @Delete(":id")
  async removeOne(@Param("id") id: string) {
    await this.audiosService.removeOne(id)
    return new StandardResponse(HttpStatus.OK, "Ok")
  }

  @Delete()
  async removeAll() {
    await this.audiosService.removeAll()
    return new StandardResponse(HttpStatus.OK, "Ok")
  }
}
