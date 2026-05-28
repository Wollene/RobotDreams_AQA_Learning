import { ICarDetails } from '../interfaces/cardetails.interfaces';
import { IVehicle } from '../interfaces/vehicle.interfaces';
import { BaseVehicle } from './BaseVehicle';

export class Car extends BaseVehicle {
    public model: string;
    public class: string;
    public hasTrunk: boolean;

    public constructor(vehicle: IVehicle, carDetails: ICarDetails) {
        super(vehicle);
        this.model = carDetails.model;
        this.class = carDetails.class;
        this.hasTrunk = carDetails.hasTrunk;
    }

    public startEngine(): void {
        if (!this._isRunning) {
            switch (this.class) {
                case 'A':
                    for (let i = 0; i < 3; i++) {
                        console.log('Trying to start engine... Doesn\'t work...')
                    }
                    break;
                case 'C':
                    console.log('Turning the PREMIUM key...');
                    break;
                case 'S':
                    console.log('Pushing the \'START\' button...');
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
