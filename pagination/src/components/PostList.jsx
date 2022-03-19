import React from 'react';
import PostItem from "./PostItem";
import { CSSTransition, TransitionGroup,} from 'react-transition-group';
import '../styles/Utils.css'

const PostList = ({posts, title, remove}) => {

    //console.log(posts)

    if (!posts.length) {
        return (
            <h1 style={{textAlign: "center"}}>
                Постов нет
            </h1>)
    }
    return (
        <div>
            <h1 className="title">
                {title}
            </h1>
            <hr className="hr"/>
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem remove={remove} number={index + 1} post={post}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostList;