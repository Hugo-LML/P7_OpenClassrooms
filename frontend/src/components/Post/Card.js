import React from 'react';

const Card = ({ post }) => {
    console.log(post);
    return (
        <li>{post.id}</li>
    );
};

export default Card;