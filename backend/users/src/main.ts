import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const GLOBAL_PREFIX = "/users";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);

    // OpenAPI config (only for dev environment)
    if (configService.get("NODE_ENV", "development") === "development") {
        const config = new DocumentBuilder()
            .setTitle("users microservice")
            .setDescription("This service handles user data")
            .build();
        const doc = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup(`${GLOBAL_PREFIX}/docs`, app, doc);
    }

    await app.listen(3000);
}
bootstrap();
