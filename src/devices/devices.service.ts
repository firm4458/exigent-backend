import { Injectable, NotFoundException } from "@nestjs/common"
import { OnEvent } from "@nestjs/event-emitter"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { CreateDeviceDto } from "./dto/create-device.dto"
import { Device, DeviceDocument } from "./entities/device.entity"

@Injectable()
export class DevicesService {
  constructor(@InjectModel(Device.name) private readonly deviceModel: Model<DeviceDocument>) {}

  @OnEvent("device.online")
  async deviceOnline(client_id: string) {
    const device = await this.deviceModel.findOne({ mqtt_client_id: client_id })
    if (!device) return
    device.last_online = new Date()
    await device.save()
  }

  create(createDeviceDto: CreateDeviceDto) {
    const device = new this.deviceModel(createDeviceDto)
    return device.save()
  }

  findAll() {
    return this.deviceModel.find()
  }

  async findOne(id: string) {
    const device = await this.deviceModel.findById(id)
    if (!device) throw new NotFoundException()
    return device
  }

  async remove(id: string) {
    const device = await this.deviceModel.findByIdAndDelete(id)
    if (!device) throw new NotFoundException()
    return device
  }
}
