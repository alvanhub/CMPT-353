import React, { useState, useEffect } from 'react';

const Comment = ({ comment, user, handleDeleteComment, handleDeleteUser, handleFetchChildren, setParent, oldParent }) => {
    const [child, setChild] = useState([]);
    //console.log(oldParent)

    useEffect(() => {
        if (!comment.children) { // Perform the request only if children are not fetched
            handleFetchChildren(setChild, oldParent, comment.id);
        }
    }, [child, handleFetchChildren, oldParent, comment.children]);
    //console.log(comment.children);
    // if (comment.children){
    //     children = JSON.parse(comment.children);
    // }else{

   const children = comment.children ? JSON.parse(comment.children) : child;
    //console.log(oldParent)

  const handleReply = (commentId) => {
    setParent(commentId); // Set the parent comment ID for the reply
    //console.log(commentId);
  };

  return (
    <div className="post-box" key={comment.id}>
      <p>Sender: {comment.userName}</p>
      <p>Comment ID: {comment.id}</p>
      <p>Content: {comment.text}</p>
      {comment.image && (
        <img
          src={`http://localhost:5000/uploads/${comment.image}`}
          alt="Comment Image"
          style={{ width: '200px', height: '150px' }}
        />
      )}
      {children && children.length > 0 && (
        <div className="nested-comments">
          {children.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              user={user}
              handleDeleteComment={handleDeleteComment}
              handleDeleteUser={handleDeleteUser}
              handleFetchChildren={handleFetchChildren}
              setParent={setParent}
              oldParent={comment.id}
            />
          ))}
        </div>
      )}
      <button onClick={() => handleReply(comment)}>Reply</button>
      {user.isAdmin ? (
            <div>
            <button onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button>
            <button onClick={() => handleDeleteUser(comment.userName)}>Delete User</button>
            </div>
        ) : (
            <div>
            {/* Render something else or nothing */}
            </div>
        )}
    </div>
  );
};

export default Comment;
