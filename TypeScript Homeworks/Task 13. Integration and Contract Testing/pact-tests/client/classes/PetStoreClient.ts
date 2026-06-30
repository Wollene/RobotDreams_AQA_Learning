import { Pet } from '../interfaces/pet.interfaces';

export class PetStoreClient {
    private readonly baseUrl: string;

    public constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async createPet(pet: Pet): Promise<Pet> {
        const promise = fetch(`${this.baseUrl}/pet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pet)
        });
        return (await promise).json();
    }
}
