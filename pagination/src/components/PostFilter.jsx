import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
import '../styles/App.css'

const PostFilter = ({filter,setFilter,typeSort}) => {
    return (
        <div className="filters">
            <div >
                <MyInput
                    value={filter.query}
                    onChange={e => setFilter({...filter, query: e.target.value})}
                    placeholder={'Поиск...'}
                />
            </div>

            <div className="filterOffset">
                <MySelect
                    value={filter.sort}
                    onChange={selectedSort => setFilter({...filter, sort: selectedSort,typeSort})}
                    options={[
                        {value: 'title', name: 'По названию'},
                        {value: 'body', name: 'По описанию'},
                    ]}
                    defaultValue="Тип сортировки"
                />
            </div>
        </div>
    );
};

export default PostFilter;