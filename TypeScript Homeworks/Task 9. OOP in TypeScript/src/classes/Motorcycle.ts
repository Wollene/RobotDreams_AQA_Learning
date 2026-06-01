import { IMotorcycleDetails } from '../interfaces/motorcycledetails.interfaces';
import { IVehicle } from '../interfaces/vehicle.interfaces';
import { BaseVehicle } from './BaseVehicle';

export class Motorcycle extends BaseVehicle {
    public motorcycleType: string;
    public seats: number;
    public tires: string;
    private behaviorByType: Map<string, () => void> = new Map<string, () => void>([
        ['Chopper', () => console.log('Turning the chopper key...')],
        ['Sport', () => console.log('Turning the PREMIUM key...')],
        ['Dirt', () => console.log('Turning the dirt bike key...')]
    ]);

    public constructor(vehicle: IVehicle, motorcycleDetails: IMotorcycleDetails) {
        super(vehicle);
        this.motorcycleType = motorcycleDetails.motorcycleType;
        this.seats = motorcycleDetails.seats;
        this.tires = motorcycleDetails.tires;
    }

    public startEngine(): void {
        if (!this._isRunning) {
            const start = this.behaviorByType.get(this.motorcycleType);
            start();
            this._isRunning = true;
        } else {
            console.log('The engine is already running.');
        }
    }
}
