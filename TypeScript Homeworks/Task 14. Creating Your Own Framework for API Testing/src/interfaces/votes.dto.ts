import { IInnerImage } from './common.dto';

export interface IPostVoteRequest {
    image_id: string,
    sub_id: string,
    value: number
}

export interface IPostVoteResponse {
    message: string,
    id: number
    image_id: string,
    sub_id?: string,
    value: number,
    country_code: string
}

export interface IGetVoteResponse {
    id: number,
    user_id: string,
    image_id: string,
    sub_id?: string,
    created_at?: string,
    value: number,
    country_code: string,
    image: IInnerImage
}

export interface IDeleteVoteResponse {
    message: string
}
