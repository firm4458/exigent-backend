import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common"
import { SchedulesService } from "./schedules.service"
import { CreateScheduleDto } from "./dto/create-schedule.dto"

@UseInterceptors(ClassSerializerInterceptor)
@Controller("schedules")
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto)
  }

  @Get()
  findAll() {
    return this.schedulesService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.schedulesService.findOne(id)
  }

  @Delete(":id")
  removeOne(@Param("id") id: string) {
    return this.schedulesService.removeOne(id)
  }

  @Delete("")
  removeAll() {
    return this.schedulesService.removeAll()
  }
}
