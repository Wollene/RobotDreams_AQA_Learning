import { ApiService } from '../services/ApiService';
import { IGetVoteResponse, IPostVoteResponse, IDeleteVoteResponse, IPostVoteRequest } from '../interfaces/votes.dto';

export class VotesApiObject {
    private apiService: ApiService;

    public constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    public async getVotes(): Promise<{ data: IGetVoteResponse[], status: number}> {
        return this.apiService.getRequest('/votes');
    }

    public async getVoteById(id: number): Promise<{ data: IGetVoteResponse, status: number}> {
        return this.apiService.getRequest(`/votes/${id}`);
    }

    public async postVote(body: IPostVoteRequest, customHeaders?: HeadersInit): Promise<{ data: IPostVoteResponse, status: number}> {
        return this.apiService.postRequest('/votes', body, customHeaders);
    }

    public async deleteVote(id: number): Promise<{ data: IDeleteVoteResponse, status: number}> {
        return this.apiService.deleteRequest(`/votes/${id}`);
    }
}
