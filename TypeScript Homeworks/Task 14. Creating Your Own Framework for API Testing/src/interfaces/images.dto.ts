import { IGetBreedResponse } from './breeds.dto';

export interface IPostImageResponse {
    id: string,
    url: string,
    width?: number,
    height?: number,
    original_filename?: string,
    pending?: number,
    approved?: number
}

export interface IGetImageResponse {
    id: string,
    url: string,
    breeds: IGetBreedResponse[],
    width?: number,
    height?: number
}
