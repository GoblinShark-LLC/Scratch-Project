import React from 'react'; 

const Comment = ({ id, avatar, author, edited, createdAt, lastUpdated, body}) => {
  return (
    <div>
      id : {id}
      avatar : {avatar}
      author : {author}
      edited : {edited}
      createdAt : {createdAt}
      lastUpdated : {lastUpdated}
    </div>
  )
}

export default Comment; 