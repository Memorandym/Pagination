import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import MyComments from "../components/UI/Comments/MyComments";

const PostIdPage = () => {

    const params = useParams()
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [isNew, setIsNew] = useState(true)

    const location = useLocation();



    useEffect(() => {
        if (JSON.parse(location.state) == -1) {
            setIsNew(false)
            fetchPostById(params.id)
            fetchComments(params.id)
        }else{
            post.id=(JSON.parse(location.state)).id
            post.body=(JSON.parse(location.state)).body
            post.img=(JSON.parse(location.state)).img
            post.title=(JSON.parse(location.state)).title
        }
    }, [])

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })

    const [img, setImg] = useState('')

    useEffect(() => {
        PostService.getRndFullImagePost().then(PostService => setImg(PostService))
    }, [post])

    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        console.log(response.data)
        setComments(response.data)
    })

    const SetComment = (newComment) => {
        setComments([...comments, newComment])
    }

    return (
        <div className="post__page">
            {isLoading
                ? <Loader/>
                : <div className="post__title">{post.id}. {post.title}</div>
            }
            <div className="cont__img">
                <img className="post__img" src={img}/>
            </div>
            <div>
                {isLoading
                    ? <Loader/>
                    : <div className="postPage__body">{post.body}</div>
                }
            </div>

                <MyComments props={SetComment}/>

            <h1>
                Коментарии
            </h1>
            {isComLoading
                ? <Loader/>
                : <div className="post__comments">
                    {comments.map(comm =>
                        <div key={comm.id} style={{marginTop: 15}}>
                            <div className="postCom__title"><h5>{comm.name}</h5> <h6>{comm.email}</h6></div>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;