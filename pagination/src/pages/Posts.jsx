import React, {useEffect,  useRef, useState} from 'react'
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../components/utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import PostList from "../components/PostList";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";
import '../styles/App.css'

function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: 'title', query: ''});
    const [modal, setModal] = useState(false);
    const [typeSort, setTypeSort] = useState(true)
    const [totalPages, setTotalPages] = useState(0);
    const [limit,setLimit] = useState(10);
    const [page,setPage] = useState(1);
    const lastElement = useRef()
    const [SASP,setSASP] = useState(posts)


    const [fetchPosts,isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit,page);
        setPosts([...posts,...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount,limit))
    })

    useEffect(()=>{
        if(typeSort){
            setSASP([...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort])))
        }else{
            setSASP([...posts].sort((b, a) => a[filter.sort].localeCompare(b[filter.sort])))
        }
    },[typeSort,filter,posts])

    useObserver(lastElement, page<totalPages, isPostsLoading, ()=>{
        setPage(page+1);
    })

    useEffect(() => {
        fetchPosts(limit, page).then();
    }, [page, limit])



    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    // const changePage = (page) => {
    //     setPage(page)
    // }

    const CreateNewPost = () => {
        setModal(true)
    }


    const ChangeTypeSort = (state) => {
        switch (state) {
            case true:
                if (typeSort !== true) {
                    setTypeSort(state);
                }
                break
            case false:
                if (typeSort !== false) {
                    setTypeSort(state);
                }
                break
        }
    }



    return (
        <div className="App">

            <div className="filters">
                <MyButton  onClick={() => CreateNewPost()}>
                    Создать пост
                </MyButton>

                <PostFilter
                    filter={filter}
                    setFilter={setFilter}
                    typeSort={typeSort}
                />

                <MyButton onClick={()=>ChangeTypeSort(true)} >↑</MyButton>
                <MyButton onClick={()=>ChangeTypeSort(false)} >↓</MyButton>

                <MySelect
                    value={limit}
                    onChange={value => setLimit(value)}
                    defaultValue="Колво элементов"
                    options={[
                        {value: 5, name:'5'},
                        {value: 10, name:'10'},
                        {value: 15, name:'15'},
                        {value: -1, name:'Показать все посты'}
                    ]}
                />
            </div>
            <hr className="hr"/>

            {postError &&
                <h1>Произошла ошибка</h1>
            }

            <PostList
                remove={removePost}
                posts={SASP}
                title="Лента"
            />

            <MyModal className="modal" visible={modal} setVisible={setModal}>
                <PostForm className="modal__body" create={createPost} posts={posts.length}/>
            </MyModal>

            <div ref={lastElement} style={{height: 20, background: 'red'}}/>

            {isPostsLoading &&
                <div style={{display: "flex", justifyContent: "center", marginTop: 15}}>
                    <Loader/>
                </div>
            }
            {/*<Pagination*/}
            {/*    page={page}*/}
            {/*    changePage={changePage}*/}
            {/*    totalPages={totalPages}*/}
            {/*/>*/}
        </div>
    );
}

export default Posts;
