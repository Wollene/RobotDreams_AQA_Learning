export class ApiService {
    private readonly baseUrl: string;
    private readonly apiKey: string;

    public constructor(baseUrl: string, apiKey = 'NO API KEY') {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    public get getDefaultHeaders(): HeadersInit {
        return {
            'x-api-key': this.apiKey
        };
    }

    private async parseBody<T>(response: Response): Promise<T> {
        const text = await response.text();
        try {
            return JSON.parse(text) as T;
        } catch {
            return { message: text } as T;
        }
    }

    public async getRequest<T>(path: string, customHeaders?: HeadersInit): Promise<{ data: T, status: number}> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'GET',
            headers: {...this.getDefaultHeaders, ...customHeaders}
        });
        return { data: await this.parseBody<T>(response), status: response.status };
    }

    public async postRequest<T>(path: string, body: object | FormData, customHeaders?: HeadersInit): Promise<{ data: T, status: number}> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'POST',
            headers: {...this.getDefaultHeaders, ...customHeaders},
            body: body instanceof FormData ? body : JSON.stringify(body)
        });
        return { data: await this.parseBody<T>(response), status: response.status };
    }

    public async deleteRequest<T>(path: string, customHeaders?: HeadersInit): Promise<{ data: T, status: number}> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'DELETE',
            headers: {...this.getDefaultHeaders, ...customHeaders}
        });
        return { data: await this.parseBody<T>(response), status: response.status };
    }
}
