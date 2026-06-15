import { expect } from 'chai';
import { API_KEY, BASE_URL } from '../globals';

describe('Image -> Vote Verification:', () => {
    let image_id: string;
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
        expect(votes.image_id).to.equal(image_id);
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
