import { ICarDetails } from '../interfaces/cardetails.interfaces';
import { IVehicle } from '../interfaces/vehicle.interfaces';
import { BaseVehicle } from './BaseVehicle';

export class Car extends BaseVehicle {
    public model: string;
    public vehicleClass: string;
    public hasTrunk: boolean;
    private behaviorByClass: Map<string, () => void> = new Map<string, () => void>([
        ['A', () => {
            for (let i = 0; i < 3; i++) console.log('Trying to start...');
        }],
        ['C', () => console.log('Turning the PREMIUM key...')],
        ['S', () => console.log('Pushing the START button...')]
    ]);

    public constructor(vehicle: IVehicle, carDetails: ICarDetails) {
        super(vehicle);
        this.model = carDetails.model;
        this.vehicleClass = carDetails.vehicleClass;
        this.hasTrunk = carDetails.hasTrunk;
    }

    public startEngine(): void {
        if (!this._isRunning) {
            const start = this.behaviorByClass.get(this.vehicleClass);
            start();
            this._isRunning = true;
        } else {
            console.log('The engine is already running.');
        }
    }
}
