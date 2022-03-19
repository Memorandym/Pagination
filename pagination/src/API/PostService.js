import axios from "axios";
import {faker} from '@faker-js/faker';

export default class PostService {

    static async getAll(limit = 10, page = 1) {
        return await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        }).then(response => (this.getImage(response)));
    }

    static getImage(props){
        for (let i = 0; i < props.data['length']; i++) {
            props.data[i]['img'] = faker.image.image(800, 600, true)
        }
        return props
    }

    static async getById(id) {
        return await axios.get('https://jsonplaceholder.typicode.com/posts/' + id);
    }

    static async getCommentsByPostId(id) {
        return await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    }

    static async getImagePost(){
        return  faker.image.image(400, 300, true)
    }

    static async getRndFullImagePost(){
        return faker.image.image(1000, 600, true)
    }

}

