import { expect } from 'chai';
import { API_KEY, BASE_URL } from '../globals';
import { generateRandomString } from './helpers/data-generators';

describe('Breed -> Image Positive Verification:', () => {
    let image_id: string;
    let breed_name: string;

    it('Fetching Any Breed -> GET /breeds', async () => {
        const response = await fetch(`${BASE_URL}/breeds`, {
            method: 'GET',
            headers: {
                'x-api-key': `${API_KEY}`
            }
        });
        const breeds = await response.json();

        expect(breeds).is.an('array').and.not.to.be.empty;
        expect(breeds[0].name).to.exist;
        expect(breeds[0].reference_image_id).to.exist;
        expect(response.status).to.equal(200);
        breed_name = breeds[0].name;
        image_id = breeds[0].reference_image_id;
    });

    it('Checking Breed by Image ID -> GET /v1/images/:image_id', async () => {
        const response = await fetch(`${BASE_URL}/images/${image_id}`, {
            method: 'GET',
            headers: {
                'x-api-key': `${API_KEY}`
            }
        });
        const images = await response.json();

        expect(images).is.an('object').and.not.to.be.empty;
        expect(images.id).to.equal(image_id);
        expect(images.breeds).to.be.an('array').and.to.exist;
        expect(images.breeds.map((breed: {name: string}) => breed.name)).to.include(breed_name);
        expect(response.status).to.equal(200);
    });
});

describe('Breed -> Image Negative Verification:', () => {
    const image_id = generateRandomString();

    it('Providing non-existing Image ID -> GET /v1/images/:image_id', async () => {
        const response = await fetch(`${BASE_URL}/images/${image_id}`, {
            method: 'GET',
            headers: {
                'x-api-key': `${API_KEY}`
            }
        });

        expect(response.status).to.equal(400);
    });
});
