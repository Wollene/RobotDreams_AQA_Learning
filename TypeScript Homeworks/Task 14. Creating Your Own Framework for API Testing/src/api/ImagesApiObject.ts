import { ApiService } from '../services/ApiService';
import { IGetImageResponse, IPostImageResponse } from '../interfaces/images.dto';

export class ImagesApiObject {
    private apiService: ApiService;

    public constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    public async getImages(): Promise<{ data: IGetImageResponse[], status: number}> {
        return this.apiService.getRequest('/images/search');
    }

    public async getImageById(id: string): Promise<{ data: IGetImageResponse, status: number}> {
        return this.apiService.getRequest(`/images/${id}`);
    }

    public async postImage(body: FormData, customHeaders?: HeadersInit): Promise<{ data: IPostImageResponse, status: number}> {
        return this.apiService.postRequest('/images/upload', body, customHeaders);
    }

    public async deleteImage<T>(id: string): Promise<{ data: T, status: number }> {
        return this.apiService.deleteRequest(`/images/${id}`);
    }
}
