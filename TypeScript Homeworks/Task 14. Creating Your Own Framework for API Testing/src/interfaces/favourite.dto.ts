import { IInnerImage } from './common.dto';

export interface IPostFavouriteRequest {
    image_id: string,
    sub_id: string
}

export interface IPostFavouriteResponse {
    message: string,
    id: number
}

export interface IGetFavouriteResponse {
    id: number,
    user_id: string,
    image_id: string,
    sub_id?: string,
    created_at?: string,
    image: IInnerImage
}

export interface IDeleteFavouriteResponse {
    message: string
}
