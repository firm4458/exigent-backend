import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { MongooseModule } from "@nestjs/mongoose"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { SchedulesModule } from "./schedules/schedules.module"
import { AudiosModule } from "./audios/audios.module"
import { DevicesModule } from "./devices/devices.module"
import { TasksModule } from "./tasks/tasks.module"
import { ScheduleModule as CronModule } from "@nestjs/schedule"
import { ValidateRef } from "./common/validateRef"

@Module({
  imports: [
    EventEmitterModule.forRoot({ wildcard: true, delimiter: "." }),
    CronModule.forRoot(),
    ConfigModule.forRoot({ envFilePath: [".env", ".env.development"] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get("MONGO_URI"),
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
    SchedulesModule,
    AudiosModule,
    DevicesModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, ValidateRef],
})
export class AppModule {}
