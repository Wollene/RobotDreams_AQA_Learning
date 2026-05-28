import { ICarDetails } from './interfaces/cardetails.interfaces';
import { IMotorcycleDetails } from './interfaces/motorcycledetails.interfaces';
import { IVehicle } from './interfaces/vehicle.interfaces';
import { Car } from './classes/Car';
import { Motorcycle } from './classes/Motorcycle';

const vehicleCar: IVehicle = {
    type: 'Sedan',
    engine: 'V6 3.0L',
    fuel: 'Gasoline',
    year: 2022,
    maxSpeed: 240
};

const carDetails: ICarDetails = {
    model: 'BMW 3 Series',
    class: 'C',
    hasTrunk: true
};

const vehicleMotorcycle: IVehicle = {
    type: 'Sport Bike',
    engine: 'Inline-4 1.0L',
    fuel: 'Gasoline',
    year: 2016,
    maxSpeed: 280
};

const motorcycleDetails: IMotorcycleDetails = {
    motorcycleType: 'Sport',
    seats: 2,
    tires: 'Michelin Pilot Power'
};

const car = new Car(vehicleCar, carDetails);
const motorcycle = new Motorcycle(vehicleMotorcycle, motorcycleDetails);

function testVehicle(vehicle: Car | Motorcycle): void {
    console.log(`\n-==========- ${vehicle.type} TESTING -==========-
        \rEngine: ${vehicle.engine}
        \rFuel: ${vehicle.fuel}
        \rMaximum Speed: ${vehicle.maxSpeed}
        \rYear: ${vehicle.year}
        \r\n-==========- RUNNING TESTS -==========-`);
    vehicle.startEngine();
    for (let i = 0; i < 10; i++) {
        vehicle.accelerate();
    }
    for (let i = 0; i < 10; i++) {
        vehicle.brake();
    }
    vehicle.stopEngine();
}

testVehicle(car);
testVehicle(motorcycle);
