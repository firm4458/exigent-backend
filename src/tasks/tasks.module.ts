import { Module } from "@nestjs/common"
import { TasksService } from "./tasks.service"
import { TasksController } from "./tasks.controller"
import { ClientsModule, Transport } from "@nestjs/microservices"

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "TASK_SERVICE",
        transport: Transport.MQTT,
        options: {
          url: "mqtt://mqtt.netpie.io",
          clientId: "90caf4de-9608-4ae4-b66f-6fb7f92e0bb5",
          username: "jCe4wHLtegfiswm1MyxiDs4maJsXvZeP",
          password: "GiocwK-w-gQ0o(gCpH0brab8Rk#vnv#J",
        },
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
