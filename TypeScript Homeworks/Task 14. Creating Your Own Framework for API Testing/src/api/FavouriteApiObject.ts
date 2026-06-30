import { ApiService } from '../services/ApiService';
import { IGetFavouriteResponse, IPostFavouriteResponse, IDeleteFavouriteResponse, IPostFavouriteRequest } from '../interfaces/favourite.dto';

export class FavouriteApiObject {
    private apiService: ApiService;

    public constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    public async getFavourites(): Promise<{ data: IGetFavouriteResponse[], status: number}> {
        return this.apiService.getRequest('/favourites');
    }

    public async getFavouriteById(id: number): Promise<{ data: IGetFavouriteResponse, status: number}> {
        return this.apiService.getRequest(`/favourites/${id}`);
    }

    public async postFavourite(body: IPostFavouriteRequest, customHeaders?: HeadersInit): Promise<{ data: IPostFavouriteResponse, status: number}> {
        return this.apiService.postRequest('/favourites', body, customHeaders);
    }

    public async deleteFavourite(id: number): Promise<{ data: IDeleteFavouriteResponse, status: number}> {
        return this.apiService.deleteRequest(`/favourites/${id}`);
    }
}
