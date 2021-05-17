import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { CreateDeviceDto } from "./dto/create-device.dto"
import { Device, DeviceDocument } from "./entities/device.entity"

@Injectable()
export class DevicesService {
  constructor(@InjectModel(Device.name) private readonly deviceModel: Model<DeviceDocument>) {}

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
