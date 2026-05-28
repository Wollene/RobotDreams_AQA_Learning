import { IMotorcycleDetails } from '../interfaces/motorcycledetails.interfaces';
import { IVehicle } from '../interfaces/vehicle.interfaces';
import { BaseVehicle } from './BaseVehicle';

export class Motorcycle extends BaseVehicle {
    public motorcycleType: string;
    public seats: number;
    public tires: string;

    public constructor(vehicle: IVehicle, motorcycleDetails: IMotorcycleDetails) {
        super(vehicle);
        this.motorcycleType = motorcycleDetails.motorcycleType;
        this.seats = motorcycleDetails.seats;
        this.tires = motorcycleDetails.tires;
    }

    public startEngine(): void {
        if (!this._isRunning) {
            switch (this.motorcycleType) {
                case 'Chopper':
                    console.log('Turning the chopper key...')
                    break;
                case 'Sport':
                    console.log('Turning the PREMIUM key...');
                    break;
                case 'Dirt':
                    console.log('Pushing the dirt bike key...');
                    break;
                default:
                    console.log('Turning the key...');
            }
            this._isRunning = true;
        } else {
            console.log('The engine is already running.');
        }
    }
}
