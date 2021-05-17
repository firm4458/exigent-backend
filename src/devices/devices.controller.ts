import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from "@nestjs/common"
import { StandardResponse } from "../common/standardResponse"
import { DevicesService } from "./devices.service"
import { CreateDeviceDto } from "./dto/create-device.dto"
import { DeviceResponseObject } from "./entities/device.entity"

@Controller("devices")
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    const response = new DeviceResponseObject(await this.devicesService.create(createDeviceDto))
    return new StandardResponse(HttpStatus.CREATED, "Device created", response)
  }

  @Get()
  async findAll() {
    const devices = await this.devicesService.findAll()
    const responses = devices.map((device) => new DeviceResponseObject(device))
    return new StandardResponse(HttpStatus.OK, "Ok", responses)
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const response = new DeviceResponseObject(await this.devicesService.findOne(id))
    return new StandardResponse(HttpStatus.CREATED, "Device created", response)
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.devicesService.remove(id)
    return new StandardResponse(HttpStatus.OK, "Device Deleted")
  }
}
