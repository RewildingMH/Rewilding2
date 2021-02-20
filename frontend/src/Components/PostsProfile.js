import React from 'react'

export const PostsProfile = ({post}) => {
    return (
        <div>
            <p>{post.text}</p>
            <p>{post.likes.length}</p>

        </div>
    )
}
