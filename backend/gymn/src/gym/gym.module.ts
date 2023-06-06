import { Module } from "@nestjs/common";
import { GymController } from "./gym.controller";
import { GymService } from "./gym.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Gym, GymSchema } from "src/schemas/gym.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Gym.name, schema: GymSchema }])],
    controllers: [GymController],
    providers: [GymService],
})
export class GymModule {}
