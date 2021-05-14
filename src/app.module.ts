import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { MongooseModule } from "@nestjs/mongoose"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { SchedulesModule } from "./schedules/schedules.module"

@Module({
  imports: [
    EventEmitterModule.forRoot({ wildcard: true, delimiter: "." }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
