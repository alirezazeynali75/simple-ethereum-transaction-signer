import { AxiosInstance } from "axios";

export class GasTracker {
    getGasLimit() {
      throw new Error('Method not implemented.');
    }
    private httpClient: AxiosInstance;

    constructor(httpClient: AxiosInstance) {
        this.httpClient = httpClient;
    }

    public async getGasDetails() {
        const resp = await this.httpClient.get('/')
        return resp.data
    }
}