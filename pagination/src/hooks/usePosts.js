import {useMemo} from "react";

export const useSortedPosts = (posts,sort,typeSort) => {
    return useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts;
    }, [sort, posts]);
}

export const usePosts = (posts,sort,query,typeSort) =>{
    const sortedPosts = useSortedPosts(posts,sort,typeSort);
    return useMemo(() => {
        return sortedPosts.filter(posts => posts.title.toLowerCase().includes(query))
    }, [query, sortedPosts]);
}
