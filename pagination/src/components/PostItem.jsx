import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from 'react-router-dom';
import '../styles/Utils.css'

const PostItem = (props) => {
    const router = useNavigate()

    const goto = () => {
        if (props.post.id.toString().indexOf('(') !== -1) {
            let state={
                id:props.post.id,
                title:props.post.title,
                body:props.post.body,
                img:props.post.img
            }
            router(`/posts/${props.post.id}`, {state: JSON.stringify(state)}) //New
        } else {
            router(`/posts/${props.post.id}`, {state: '-1'}) //Old
        }
    }

    return (
        <div className="App">
            <div className="post">

                <div className="post__mask">
                    <img className="post_img" src={props.post.img}/>
                </div>

                <div className="post__info">
                    <div className="post__content">
                        <strong>
                            {props.post.id}. {props.post.title}
                        </strong>
                        <div>
                            {props.post.body}
                        </div>
                    </div>

                    <div className="post__btns">
                        <MyButton
                            onClick={goto}>Открыть
                        </MyButton>
                        <br/>
                        <MyButton
                            onClick={() => props.remove(props.post)}>Удалить
                        </MyButton>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PostItem;