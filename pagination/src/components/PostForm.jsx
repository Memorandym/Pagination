import React, {useEffect, useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import MyTextarea from "./UI/textArea/MyTextarea";
import '../styles/Components.css'
import PostService from "../API/PostService";

const PostForm = ({create,posts}) => {

    const [post,setPost] = useState({title:'', body:''})
    const [img,setImg] = useState('https://placekitten.com/800/600')

    const addNewPost = (e) => {
        e.preventDefault() //Отключаем перезагрузку формы из за типа submit
        posts++
        const newPost = {
            ...post, id:`${posts}(${Date.now()% 10000})` ,img
        }

        create(newPost)
        setPost({title:'',body:''})
    }

    const addNewPicture = (e)=>{
        e.preventDefault()
        const responseImagePost = PostService.getImagePost();
        responseImagePost.then(responseImagePost=>(setImg(responseImagePost)))
    }

    return (
        <form>
            <div>
                <div className="post__preview">
                    <img src={img} alt="Првеью поста"/>
                </div>
                <div className="post__body">

                    <MyInput
                        style={{backgroundColor: "white"}}
                        value={post.title}
                        onChange={e => setPost({...post, title: e.target.value})}
                        type="text"
                        placeholder="Название поста"
                    />

                    <div className="post__text">
                        <MyTextarea
                            style={{backgroundColor: "white"}}
                            value={post.body}
                            onChange={e => setPost({...post, body: e.target.value})}
                            type="text"
                            placeholder="Описание поста"
                        />
                    </div>

                    <div className="post__btn">
                        <MyButton
                            onClick={addNewPost}>Создать пост
                        </MyButton>

                        <MyButton
                            onClick={addNewPicture}>Сменить картинку
                        </MyButton>

                    </div>
                </div>
            </div>
        </form>
    );
};

export default PostForm;