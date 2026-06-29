import { ApiService } from '../services/ApiService';
import { IGetBreedResponse } from '../interfaces/breeds.dto';

export class BreedsApiObject {
    private apiService: ApiService;

    public constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    public async getBreeds(): Promise<{ data: IGetBreedResponse[], status: number}> {
        return this.apiService.getRequest('/breeds');
    }

    public async getBreedById(id: string): Promise<{ data: IGetBreedResponse, status: number}> {
        return this.apiService.getRequest(`/breeds/${id}`);
    }
}
