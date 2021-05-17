import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { Transport } from "@nestjs/microservices"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.setGlobalPrefix("api")

  /*const microservice = app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: "mqtt://mqtt.netpie.io",
      clientId: "90caf4de-9608-4ae4-b66f-6fb7f92e0bb5",
      username: "jCe4wHLtegfiswm1MyxiDs4maJsXvZeP",
      password: "GiocwK-w-gQ0o(gCpH0brab8Rk#vnv#J",
    },
  })*/

  //await app.startAllMicroservicesAsync()
  await app.listen(3000)
}
bootstrap()
