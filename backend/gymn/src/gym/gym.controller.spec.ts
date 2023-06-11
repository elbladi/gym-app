import { Test, TestingModule } from "@nestjs/testing";
import { GymController } from "./gym.controller";
import { GymService } from "./gym.service";
import { getModelToken } from "@nestjs/mongoose";
import { Gym, GymDoc, GymSchema } from "../schemas/gym.schema";
import { getModel } from "../test/setup";
import { NewGymDto } from "../dto/new.gym.dto";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UpdateGymDto } from "../dto/update.gym.dto";
import { LocationDto } from "../dto/location.dto";

describe("GymController", () => {
    let controller: GymController;
    const _ownerId = "6484dcb71d71c16d6f16354d";

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GymController],
            providers: [GymService, { provide: getModelToken(Gym.name), useValue: getModel(Gym.name, GymSchema) }],
        }).compile();

        controller = module.get<GymController>(GymController);
    });

    const getGymModel = () => {
        return getModel(Gym.name, GymSchema);
    };

    const getNewGym = (ownerId = _ownerId, name = "test gym", lat = 0, lon = 0): NewGymDto => {
        return {
            ownerId,
            name,
            precio: 10,
            horario: { Lu: {}, Ma: {}, Mi: {}, Ju: {}, Vi: {}, Sa: {}, Do: {} },
            services: {},
            restrictions: {},
            location: { lat, lon },
        };
    };

    const createGym = async (name?: string, location?: LocationDto): Promise<string> => {
        const Model = getGymModel();
        const gym: GymDoc = new Model(getNewGym(_ownerId, name, location?.lat, location?.lon));
        const { _id } = await gym.save();
        return _id.toHexString();
    };

    describe("/POST create", () => {
        it("should create a provided gym", async () => {
            const gym = getNewGym();
            const resp = await controller.createGym(gym);
            expect(resp.gymId).toBeDefined();

            const GymModel = getGymModel();
            const found: GymDoc = await GymModel.findById(resp.gymId);
            expect(found).not.toBeNull();
            expect(found.name).toBe(gym.name);
            expect(found.location).toStrictEqual(gym.location);
        });
        it("should throw a bad request when invalid owner id provided", async () => {
            const gym = getNewGym("invalid Owner Id");
            try {
                await controller.createGym(gym);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.response.message).toBe(`invalid ownerId: invalid Owner Id`);
            }
        });
    });
    describe("/PUT update gym", () => {
        it("should update the gyms details", async () => {
            //Create gym & get ID
            const gymId = await createGym();

            // validate created gym has "test gym" as name
            const gym: GymDoc = await getGymModel().findById(gymId);
            expect(gym.name).toBe("test gym");

            // Update name
            const updatedGym: UpdateGymDto = { ownerId: _ownerId, gymId, name: "Updated gym name" };
            const resp = await controller.updateGym(updatedGym);
            expect(resp).toBe("ok");

            // validate gym has updated name
            const gymUpdated: GymDoc = await getGymModel().findById(gymId);
            expect(gymUpdated.name).toBe("Updated gym name");
        });
        it("throw a badrequest error when provided gym id is invalid", async () => {
            try {
                const updatedGym: UpdateGymDto = { ownerId: _ownerId, gymId: "123456", name: "X_X" };
                await controller.updateGym(updatedGym);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.response.message).toBe("invalid gymId: 123456");
            }
        });
        it("throw a badrequest error when provided owner id is invalid", async () => {
            try {
                //Create gym & get ID
                const gymId = await createGym();
                const updatedGym: UpdateGymDto = { ownerId: "not very smart uh?", gymId };
                await controller.updateGym(updatedGym);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.response.message).toBe("invalid ownerId: not very smart uh?");
            }
        });
        it("throw a not found error when provided gym id is not found", async () => {
            try {
                const updatedGym: UpdateGymDto = { ownerId: _ownerId, gymId: _ownerId };
                await controller.updateGym(updatedGym);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.response.message).toBe(`Gym ${_ownerId} not found`);
            }
        });
        it("throw an unauthorized error when provided ownerId didn't create the gym", async () => {
            //Create gym & get ID
            const gymId = await createGym();
            try {
                const updatedGym: UpdateGymDto = { ownerId: "6484dcb71d71c16d6f16355d", gymId };
                await controller.updateGym(updatedGym);
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
                expect(error.response.message).toBe(
                    `Gym owner 6484dcb71d71c16d6f16355d is not authorized to modify gym ${gymId}`,
                );
            }
        });
    });
    describe("/GET", () => {
        describe("getGymById", () => {
            it("should return the gym by ID", async () => {
                const gymId = await createGym();
                const resp = await controller.getGymById(gymId);
                expect(resp.name).toBe("test gym");
            });
            it("should throw not found when the provided gymId is not found", async () => {
                const gymId = await createGym();
                try {
                    await controller.getGymById(gymId);
                } catch (error) {
                    expect(error).toBeInstanceOf(NotFoundException);
                    expect(error.response.message).toBe(`Gym ${gymId} not found`);
                }
            });
            it("should throw unauthorized when the gymId is invalid", async () => {
                await createGym();
                try {
                    await controller.getGymById("ThisIsABadId");
                } catch (error) {
                    expect(error).toBeInstanceOf(NotFoundException);
                    expect(error.response.message).toBe("Gym ThisIsABadId not found");
                }
            });
        });
        it("should get only gyms near 1km from the user", async () => {
            const userLoc = { lat: 25.4346233, lon: -100.9617512 };
            const otherUserLoc = { lat: 25.4081346, lon: -101.0324442 };

            //G1, G2 & G3 are in a range of at least 1km to the user
            const gyms = [
                { name: "G1", location: { lat: 25.435379, lon: -100.961011 } },
                { name: "G2", location: { lat: 25.4352918, lon: -100.9607964 } },
                { name: "G3", location: { lat: 25.4346233, lon: -100.9593063 } },
                { name: "G4", location: { lat: 25.4440966, lon: -100.993524 } },
                { name: "G5", location: { lat: 25.4083239, lon: -101.0301191 } },
            ];
            for (const index in gyms) {
                const gym = gyms[index];
                await createGym(gym.name, { lat: gym.location.lat, lon: gym.location.lon });
            }
            // Validate all 5 gyms were created
            const allGyms = await getGymModel().find({});
            expect(allGyms.length).toBe(5);

            const resp = await controller.getNearGyms(userLoc.lat, userLoc.lon);
            expect(resp.farCounter).toBe(2);
            expect(resp.gyms.length).toBe(3);
            expect(resp.gyms[2].name).toBe("G3");

            const secondResp = await controller.getNearGyms(otherUserLoc.lat, otherUserLoc.lon);
            expect(secondResp.farCounter).toBe(4);
            expect(secondResp.gyms.length).toBe(1);
            expect(secondResp.gyms[0].name).toBe("G5");
        });
    });
});
