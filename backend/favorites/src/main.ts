import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

const GLOBAL_PREFIX = "/api/favorites";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);
    app.enableCors();
    app.set("trust proxy", true);
    app.setGlobalPrefix(GLOBAL_PREFIX);
    app.useGlobalPipes(new ValidationPipe());

    // OpenAPI config (only for dev environment)
    if (configService.get("NODE_ENV", "development") === "development") {
        const config = new DocumentBuilder()
            .setTitle("Favorites microservice")
            .setDescription("This service handles user's favorite list")
            .build();
        const doc = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup(`${GLOBAL_PREFIX}/docs`, app, doc);
    }

    await app.listen(3000);
}
bootstrap();
