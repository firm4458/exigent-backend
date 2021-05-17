import { Injectable } from "@nestjs/common"
import { OnEvent } from "@nestjs/event-emitter"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Schedule } from "../schedules/entities/schedule.entity"
import { CreateTaskDto } from "./dto/create-task.dto"
import { Task, TaskDocument } from "./entities/task.entity"
import { Cron, Interval } from "@nestjs/schedule"
const mqtt = require("mqtt")

@Injectable()
export class TasksService {
  private readonly client
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) {
    this.client = mqtt.connect("mqtt://mqtt.netpie.io", {
      clientId: "90caf4de-9608-4ae4-b66f-6fb7f92e0bb5",
      username: "jCe4wHLtegfiswm1MyxiDs4maJsXvZeP",
    })
    this.client.subscribe("@msg/task/complete")
    this.client.on("message", (topic, message) => this.handleMessage(topic, message))
  }

  async findAll() {
    return this.taskModel.find()
  }

  async getScheduleResponse(id: string) {
    const tasks = await this.taskModel.find({ schedule_id: id, type: "Play" })
    const responses = tasks.map((task) => {
      return { receiver_id: task.receiver_id, finished: task.finished }
    })
    return responses
  }

  create(createTaskDto: CreateTaskDto) {
    const task = new this.taskModel(createTaskDto)
    return task.save()
  }

  handleMessage(topic: string, message: Buffer) {
    console.log(topic, message.toString())
    if (topic == "@msg/task/complete") {
      this.completeTask(message.toString())
    }
  }

  async completeTask(id: string) {
    const task = await this.taskModel.findById(id)
    if (!task) return
    task.finished = true
    await task.save()
  }

  @OnEvent("schedule.created")
  async createTasks(payload: Schedule) {
    for (const receiver of payload.receivers) {
      const downloadTask = await this.create({
        type: "Download",
        schedule_id: payload.id,
        audio_id: payload.audio.id,
        receiver_id: receiver.mqtt_client_id,
        time: payload.time,
        finished: false,
        published: true,
      })
      this.publishTask(downloadTask)
      await this.create({
        type: "Play",
        schedule_id: payload.id,
        audio_id: payload.audio.id,
        receiver_id: receiver.mqtt_client_id,
        time: payload.time,
        finished: false,
        published: false,
      })
    }
  }

  @Cron("0 * * * * *")
  async handleCron() {
    const tasks = await this.taskModel.find({ time: { $lte: new Date() }, published: false })
    for (const task of tasks) {
      this.publishTask(task)
      task.published = true
      await task.save()
    }
  }

  publishTask(task: Task) {
    this.client.publish("@msg/task/" + task.receiver_id, task.type + " " + task.audio_id)
  }
}
