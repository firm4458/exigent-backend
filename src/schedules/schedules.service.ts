import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { StandardResponse } from "../common/standardResponse"
import { CreateScheduleDto } from "./dto/create-schedule.dto"
import { Schedule, ScheduleDocument, ScheduleResponseObject } from "./entities/schedule.entity"

@Injectable()
export class SchedulesService {
  constructor(@InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>, private eventEmitter: EventEmitter2) {}

  public static readonly eventNameSpace = "schedule"

  async create(createScheduleDto: CreateScheduleDto) {
    const schedule = new this.scheduleModel(createScheduleDto)
    const evt = ".created"
    await schedule.save()
    this.eventEmitter.emit(SchedulesService.eventNameSpace + evt, schedule as Schedule)
    return new StandardResponse(HttpStatus.CREATED, "Schedule Created", new ScheduleResponseObject(schedule))
  }

  async findAll() {
    const query = this.scheduleModel.find().populate("audio")
    const schedules = await query.exec()
    const responses = schedules.map((schedule) => new ScheduleResponseObject(schedule))
    return new StandardResponse(HttpStatus.OK, "Ok", responses)
  }

  async findOne(id: string) {
    const schedule = await this.scheduleModel.findById(id).populate("audio")
    if (!schedule) throw new NotFoundException()
    return new StandardResponse(HttpStatus.OK, "Ok", new ScheduleResponseObject(schedule))
  }

  async removeOne(id: string) {
    const schedule = await this.scheduleModel.findByIdAndDelete(id)
    if (!schedule) throw new NotFoundException()
    return new StandardResponse(HttpStatus.OK, "Deleted")
  }

  async removeAll() {
    await this.scheduleModel.deleteMany({})
    return new StandardResponse(HttpStatus.OK, "Deleted")
  }
}
