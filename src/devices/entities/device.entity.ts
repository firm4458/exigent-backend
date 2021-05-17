import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type DeviceDocument = Device & Document

@Schema()
export class Device {
  id: string
  @Prop()
  name: string
  @Prop()
  mqtt_client_id: string
}

export const DeviceSchema = SchemaFactory.createForClass(Device)

export class DeviceResponseObject extends Device {
  constructor(device: Device) {
    super()
    this.id = device.id
    this.name = device.name
    this.mqtt_client_id = device.mqtt_client_id
  }
}
