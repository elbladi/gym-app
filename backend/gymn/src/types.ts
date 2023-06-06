export interface ISchedule {
    openAt: number;
    closesAt: number;
}

export interface IHorario {
    Lu: ISchedule;
    Ma: ISchedule;
    Mi: ISchedule;
    Ju: ISchedule;
    Vi: ISchedule;
    Sa: ISchedule;
    Do: ISchedule;
}

export interface ILocation {
    lat: number;
    lon: number;
}
export interface IServices {
    bathroom?: boolean;
    shower?: boolean;
    food?: boolean;
    lockers?: boolean;
    wifi?: boolean;
    parking?: boolean;
    restroom?: boolean;
}
export interface IRestrictions {
    children?: boolean;
    partner?: boolean;
    pets?: boolean;
    maxNum?: number;
}

export interface INewGym {
    ownerId: string;
    name: string;
    precio: number;
    horario: IHorario;
    images?: string[];
    location?: ILocation;
    locationDesc?: string;
    description?: string;
    services: IServices;
    restrictions: IRestrictions;
}
