import { Controller, Get, HttpStatus, Param } from "@nestjs/common"
import { StandardResponse } from "../common/standardResponse"
import { TasksService } from "./tasks.service"

@Controller("Tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll() {
    return this.tasksService.findAll()
  }

  @Get("schedule-response/:id")
  async getScheduleResponse(@Param("id") id: string) {
    const responses = await this.tasksService.getScheduleResponse(id)
    return new StandardResponse(HttpStatus.OK, "Ok", responses)
  }
}
