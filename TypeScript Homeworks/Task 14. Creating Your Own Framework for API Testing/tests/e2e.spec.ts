import { expect } from 'chai';
import { API_KEY, BASE_URL } from '../globals';
import { readFile } from 'node:fs/promises';
import { ApiService } from '../src/services/ApiService';
import { ImagesApiObject } from '../src/api/ImagesApiObject';
import { FavouriteApiObject } from '../src/api/FavouriteApiObject';
import { VotesApiObject } from '../src/api/VotesApiObject';

describe('End-to-End (Image, Favourite, Vote) Verification:', () => {
    const apiService = new ApiService(BASE_URL, API_KEY);
    const imageApiObject = new ImagesApiObject(apiService);
    const favouriteApiObject = new FavouriteApiObject(apiService);
    const votesApiObject = new VotesApiObject(apiService);

    let image_id: string;
    let image_url: string;
    let vote_id: number;
    let favourite_id: number;
    const value = 10;

    it('Upload an Image -> POST /v1/images/upload', async () => {
        const body = new FormData();
        const blob = new Blob([await readFile('./tests/fixtures/cat.jpg')], {type: 'image/jpeg'});
        body.set('file', blob, 'cat.jpg');
        const images = await imageApiObject.postImage(body);
        expect(images.data).is.an('object').and.not.to.be.empty;
        expect(images.status).to.equal(201);
        image_id = images.data.id;
        image_url = images.data.url;
    });

    it('Checking by Image ID -> GET /v1/images/:image_id', async () => {
        const images = await imageApiObject.getImageById(image_id);
        expect(images.data).is.an('object').and.not.to.be.empty;
        expect(images.data.id).to.equal(image_id);
        expect(images.status).to.equal(200);
    });

    it('Making Image a Favourite -> POST /favourites', async () => {
        const body = {
            image_id: `${image_id}`,
            sub_id: 'my-user-1234'
        };
        const favourites = await favouriteApiObject.postFavourite(body, {'Content-Type': 'application/json'});
        expect(favourites.data).is.an('object').and.not.to.be.empty;
        expect(favourites.data.message).to.equal('SUCCESS');
        expect(favourites.data.id).to.be.a('number').and.to.exist;
        expect(favourites.status).to.equal(200);
        favourite_id = favourites.data.id;
    });

    it('Checking by Favourite ID -> GET /v1/favourites/:favourite_id', async () => {
        const favourites = await favouriteApiObject.getFavouriteById(favourite_id);
        expect(favourites.data).is.an('object').and.not.to.be.empty;
        expect(favourites.data.image).to.exist.and.to.be.an('object');
        expect(favourites.data.image.id).to.equal(image_id);
        expect(favourites.data.image.url).to.equal(image_url);
        expect(favourites.status).to.equal(200);
    });

    it('Adding Vote to the Image -> POST /votes', async () => {
        const body = {
            image_id: `${image_id}`,
            sub_id: 'my-user-1234',
            value: value
        };
        const votes = await votesApiObject.postVote(body, {'Content-Type': 'application/json'});
        expect(votes.data).is.an('object').and.not.to.be.empty;
        expect(votes.data.message).to.equal('SUCCESS');
        expect(votes.data.image_id).to.equal(image_id);
        expect(votes.data.value).to.equal(value);
        expect(votes.status).to.equal(201);
        vote_id = votes.data.id;
    });

    it('Checking by Vote ID -> GET /v1/votes/:vote_id', async () => {
        const votes = await votesApiObject.getVoteById(vote_id);
        expect(votes.data).is.an('object').and.not.to.be.empty;
        expect(votes.data.image).to.exist.and.to.be.an('object');
        expect(votes.data.image.id).to.equal(image_id);
        expect(votes.data.image.url).to.equal(image_url);
        expect(votes.data.value).to.equal(value);
        expect(votes.status).to.equal(200);
    });

    it('Favourite Cleanup -> DELETE /v1/favourites/:favourite_id', async () => {
        const favourites = await favouriteApiObject.deleteFavourite(favourite_id);
        expect(favourites.data).is.an('object').and.not.to.be.empty;
        expect(favourites.data.message).to.equal('SUCCESS');
        expect(favourites.status).to.equal(200);
    });

    it('Vote Cleanup -> DELETE /v1/votes/:vote_id', async () => {
        const votes = await votesApiObject.deleteVote(vote_id);
        expect(votes.data).is.an('object').and.not.to.be.empty;
        expect(votes.data.message).to.equal('SUCCESS');
        expect(votes.status).to.equal(200);
    });

    it('Image Cleanup -> DELETE /v1/images/:image', async () => {
        const response = await imageApiObject.deleteImage(image_id);
        expect(response.status).to.equal(204);
    });

    it('Verifying Deletion After Cleanup -> GET /v1/images/:image_id', async () => {
        const response = await imageApiObject.getImageById(image_id);
        expect(response.status).to.equal(400);
    });

    after(async () => {
        if (favourite_id) {
            await favouriteApiObject.deleteFavourite(favourite_id);
        };

        if (vote_id) {
            await votesApiObject.deleteVote(vote_id);
        };

        if (image_id) {
            await imageApiObject.deleteImage(image_id);
        };
    });
});
