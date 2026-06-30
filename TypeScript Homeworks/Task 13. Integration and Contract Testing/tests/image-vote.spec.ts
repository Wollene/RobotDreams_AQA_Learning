import { expect } from 'chai';
import { API_KEY, BASE_URL } from '../globals';
import { generateRandomNumber } from './helpers/data-generators';

describe('Image -> Vote Positive Verification:', () => {
    let image_id: string;
    let image_url: string;
    let vote_id: number;
    const value = 10;

    it('Fetching Any Image -> GET /images/search', async () => {
        const response = await fetch(`${BASE_URL}/images/search`, {
            method: 'GET',
            headers: {
                'x-api-key': `${API_KEY}`
            }
        });
        const images = await response.json();

        expect(images).is.an('array').and.not.to.be.empty;
        expect(images[0].id).to.exist;
        image_id = images[0].id;
        image_url = images[0].url;
    });

    it('Adding Vote to the Image -> POST /votes', async () => {
        const body = {
            image_id: `${image_id}`,
            sub_id: 'test',
            value: value
        };
        const response = await fetch(`${BASE_URL}/votes`, {
            method: 'POST',
            headers: {
                'x-api-key': `${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const votes = await response.json();

        expect(votes).is.an('object').and.not.to.be.empty;
        expect(votes.message).to.equal('SUCCESS');
        expect(votes.image_id).to.equal(image_id);
        expect(votes.value).to.equal(value);
        expect(response.status).to.equal(201);
        vote_id = votes.id;
    });

    it('Checking by Vote ID -> GET /v1/votes/:vote_id', async () => {
        const response = await fetch(`${BASE_URL}/votes/${vote_id}`, {
            method: 'GET',
            headers: {
                'x-api-key': `${API_KEY}`
            }
        });
        const votes = await response.json();

        expect(votes).is.an('object').and.not.to.be.empty;
        expect(votes.image).to.exist.and.to.be.an('object');
        expect(votes.image.id).to.equal(image_id);
        expect(votes.image.url).to.equal(image_url);
        expect(votes.value).to.equal(value);
        expect(response.status).to.equal(200);
    });

    it('Vote Cleanup -> DELETE /v1/votes/:vote_id', async () => {
        const response = await fetch(`${BASE_URL}/votes/${vote_id}`, {
            method: 'DELETE',
            headers: {
                'x-api-key': `${API_KEY}`
            }
        });
        const votes = await response.json();

        expect(votes).is.an('object').and.not.to.be.empty;
        expect(votes.message).to.equal('SUCCESS');
        expect(response.status).to.equal(200);
    });

    after(async () => {
        if (vote_id) {
            await fetch(`${BASE_URL}/votes/${vote_id}`, {
                method: 'DELETE',
                headers: {
                    'x-api-key': `${API_KEY}`
                }
            });
        };
    });
});

describe('Image -> Vote Negative Verification:', () => {
    const image_id = generateRandomNumber();
    const vote_id = generateRandomNumber();

    it('Providing non-existing Image ID -> POST /votes', async () => {
        const body = {
            image_id: `${image_id}`,
            sub_id: 'test'
        };
        const response = await fetch(`${BASE_URL}/favourites`, {
            method: 'POST',
            headers: {
                'x-api-key': `${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        expect(response.status).to.equal(404);
    });

    it('Providing non-existing Vote ID -> GET /v1/votes/:vote_id', async () => {
        const response = await fetch(`${BASE_URL}/votes/${vote_id}`, {
            method: 'GET',
            headers: {
                'x-api-key': `${API_KEY}`
            }
        });

        expect(response.status).to.equal(404);
    });
});
