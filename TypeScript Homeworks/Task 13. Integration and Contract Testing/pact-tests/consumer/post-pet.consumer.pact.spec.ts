import { MatchersV3, PactV3 } from '@pact-foundation/pact';
import { expect } from 'chai';
import { PetStoreClient } from '../client/classes/PetStoreClient';
import { Pet } from '../client/interfaces/pet.interfaces';
import path from 'path';

const { like, eachLike } = MatchersV3;

const provider = new PactV3({
    consumer: 'petstore-consumer',
    provider: 'petstore-provider',
    dir: path.resolve(__dirname, '../../pacts'),
    port: 8989
});

const expected: Pet = {
    id: 1,
    category: {
        id: 1,
        name: 'cats'
    },
    name: 'Fluffy',
    photoUrls: [
        'https://example.com/images/fluffy.jpg'
    ],
    tags: [
        {
            id: 1,
            name: 'Favorites'
        }
    ],
    status: 'available'
};

describe('Pet -> Consumer Positive Verification:', () => {
    it('Successful Pet Creation -> POST /pet', async () => {
        await provider
            .addInteraction({
                states: [{ description: 'ready to create a pet' }],
                uponReceiving: 'a request for creating new pet',
                withRequest: {
                    method: 'POST',
                    path: '/pet',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        id: like(1),
                        category: like({ id: like(1), name: like('cats')}),
                        name: like('Fluffy'),
                        photoUrls: eachLike('https://example.com/images/fluffy.jpg'),
                        tags: eachLike({ id: like(1), name: like('Favorites')}),
                        status: like('available')
                    }
                },
                willRespondWith: {
                    status: 200,
                    body: {
                        name: like('Fluffy'),
                        photoUrls: eachLike('https://example.com/images/fluffy.jpg')
                    }
                }
            })
            .executeTest(async (mockServer) => {
                const client = new PetStoreClient(mockServer.url);
                const pet = await client.createPet(expected);
                expect(pet.name).to.equal(expected.name);
            });
    });
});
