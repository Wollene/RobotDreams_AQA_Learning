import { IVehicle } from '../interfaces/vehicle.interfaces.js';

export abstract class BaseVehicle implements IVehicle {
    public type: string;
    public engine: string;
    public fuel: string;
    public year: number;
    public maxSpeed: number;
    protected _isRunning: boolean;
    protected _currentSpeed: number;

    public get isRunning(): boolean {
        return this.isRunning;
    }
    public get currentSpeed(): number {
        return this.currentSpeed;
    }

    public constructor(vehicle: IVehicle) {
        this.type = vehicle.type;
        this.engine = vehicle.engine;
        this.fuel = vehicle.fuel;
        this.year = vehicle.year;
        this.maxSpeed = vehicle.maxSpeed;
        this._isRunning = false;
        this._currentSpeed = 0;
    }

    public abstract startEngine(): void;
    public stopEngine(): void {
        if (this._isRunning) {
            console.log('Stopping the engine!');
            this._isRunning = false;
        } else {
            console.log('The engine is already stopped.');
        }
    }
    public accelerate(): void {
        if (this._currentSpeed + 10 > this.maxSpeed) {
            console.log('You\'re at the maximum speed!');
        } else {
            this._currentSpeed += 10;
            console.log(`Accelerating, currently moving at ${this._currentSpeed} km\\h`);
        }
    }
    public brake(): void {
        if (this._currentSpeed - 10 <= 0) {
            console.log('You\'re stopping!');
        } else {
            this._currentSpeed -= 10;
            console.log(`Breaking a little bit, currently moving at ${this._currentSpeed} km\\h`);
        }
    }
}
