import { expect } from 'chai';
import { API_KEY, BASE_URL } from '../globals';
import { generateRandomNumber } from './helpers/data-generators';

describe('Image -> Favourite Positive Verification:', () => {
    let image_id: string;
    let favourite_id: number;
    let image_url: string;

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
        expect(response.status).to.equal(200);
        image_id = images[0].id;
        image_url = images[0].url;
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
        expect(favourites.image).to.exist.and.to.be.an('object');
        expect(favourites.image.id).to.equal(image_id);
        expect(favourites.image.url).to.equal(image_url);
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

    after(async () => {
        if (favourite_id) {
            await fetch(`${BASE_URL}/favourites/${favourite_id}`, {
                method: 'DELETE',
                headers: {
                    'x-api-key': `${API_KEY}`
                }
            });
        };
    });
});

describe('Image -> Favourite Negative Verification:', () => {
    const image_id = generateRandomNumber();
    const favourite_id = generateRandomNumber();

    it('Providing non-existing Image ID -> POST /favourites', async () => {
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

    it('Providing non-existing Favourite ID -> GET /v1/favourites/:favourite_id', async () => {
        const response = await fetch(`${BASE_URL}/favourites/${favourite_id}`, {
            method: 'GET',
            headers: {
                'x-api-key': `${API_KEY}`
            }
        });

        expect(response.status).to.equal(404);
    });
});
