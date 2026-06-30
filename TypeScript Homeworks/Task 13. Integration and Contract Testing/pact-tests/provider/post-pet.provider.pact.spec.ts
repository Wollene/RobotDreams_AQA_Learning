import { Verifier } from '@pact-foundation/pact';
import path from 'path';

describe('Pet -> Provider Positive Verification:', () => {
    it('Successful Validation of Petstore-Consumer', async () => {
        const verifier = new Verifier({
            provider: 'petstore-provider',
            providerBaseUrl: 'https://petstore.swagger.io/v2',
            pactUrls: [
                path.resolve(__dirname, '../../pacts/petstore-consumer-petstore-provider.json')
            ],
            stateHandlers: {
                'ready to create a pet': async () => {}
            }
        });

        return verifier.verifyProvider();
    });
});
