import React from 'react'
import { useSelector } from 'react-redux'

function Posts({ posts }) {
    const {loading} = useSelector(({pagination}) => pagination)
    
    if (loading) {
        return <h2>Загрузка...</h2>
    }
    return (
        <div>
            <ul className="posts">
                {posts.map(post => (
                    <li className="post">
                        {post.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Posts
