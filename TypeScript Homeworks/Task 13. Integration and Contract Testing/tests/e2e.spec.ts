import { expect } from 'chai';
import { API_KEY, BASE_URL } from '../globals';
import { readFile } from 'node:fs/promises';

describe('End-to-End (Image, Favourite, Vote) Verification:', () => {
    let image_id: string;
    let vote_id: number;
    let favourite_id: number;
    const value = 10;

    it('Upload an Image -> POST /v1/images/upload', async () => {
        const body = new FormData();
        const blob = new Blob([await readFile('./tests/fixtures/cat.jpg')], {type: 'image/jpeg'});
        body.set('file', blob, 'cat.jpg');
        const response = await fetch(`${BASE_URL}/images/upload`, {
            method: 'POST',
            headers: {
                'x-api-key': `${API_KEY}`
            },
            body: body
        });
        const images = await response.json();

        expect(images).is.an('object').and.not.to.be.empty;
        expect(images.id).to.exist;
        expect(response.status).to.equal(201);
        image_id = images.id;
    });

    it('Checking by Image ID -> GET /v1/images/:image_id', async () => {
        const response = await fetch(`${BASE_URL}/images/${image_id}`, {
            method: 'GET',
            headers: {
                'x-api-key': `${API_KEY}`
            }
        });
        const images = await response.json();

        expect(images).is.an('object').and.not.to.be.empty;
        expect(images.id).to.equal(image_id);
        expect(response.status).to.equal(200);
    });

    it('Making Image a Favourite -> POST /favourites', async () => {
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
        const favourites = await response.json();

        expect(favourites).is.an('object').and.not.to.be.empty;
        expect(favourites.message).to.equal('SUCCESS');
        expect(favourites.id).to.be.a('number').and.to.exist;
        expect(response.status).to.equal(200);
        favourite_id = favourites.id;
    });

    it('Checking by Favourite ID -> GET /v1/favourites/:favourite_id', async () => {
        const response = await fetch(`${BASE_URL}/favourites/${favourite_id}`, {
            method: 'GET',
            headers: {
                'x-api-key': `${API_KEY}`
            }
        });
        const favourites = await response.json();

        expect(favourites).is.an('object').and.not.to.be.empty;
        expect(favourites.image_id).to.equal(image_id);
        expect(response.status).to.equal(200);
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

    it('Favourite Cleanup -> DELETE /v1/favourites/:favourite_id', async () => {
        const response = await fetch(`${BASE_URL}/favourites/${favourite_id}`, {
            method: 'DELETE',
            headers: {
                'x-api-key': `${API_KEY}`
            }
        });
        const favourites = await response.json();

        expect(favourites).is.an('object').and.not.to.be.empty;
        expect(favourites.message).to.equal('SUCCESS');
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

    it('Image Cleanup -> DELETE /v1/images/:image', async () => {
        const response = await fetch(`${BASE_URL}/images/${image_id}`, {
            method: 'DELETE',
            headers: {
                'x-api-key': `${API_KEY}`
            }
        });

        expect(response.status).to.equal(204);
    });

    it('Verifying Deletion After Cleanup -> GET /v1/images/:image_id', async () => {
        const response = await fetch(`${BASE_URL}/images/${image_id}`, {
            method: 'GET',
            headers: {
                'x-api-key': `${API_KEY}`
            }
        });

        expect(response.status).to.equal(400);
    });

    after(async () => {
        if (favourite_id) {
            await fetch(`${BASE_URL}/favourites/${favourite_id}`, {
                method: 'DELETE',
                headers: {
                    'x-api-key': `${API_KEY}`
                }
            });
        };

        if (vote_id) {
            await fetch(`${BASE_URL}/votes/${vote_id}`, {
                method: 'DELETE',
                headers: {
                    'x-api-key': `${API_KEY}`
                }
            });
        };

        if (image_id) {
            await fetch(`${BASE_URL}/images/${image_id}`, {
                method: 'DELETE',
                headers: {
                    'x-api-key': `${API_KEY}`
                }
            });
        };
    });
});
