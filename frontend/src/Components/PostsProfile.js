import "../styles/community.css";
import React from "react";




export const PostsProfile = ({post}) => {
    return (
        <>

        <div className="postContainer">
            <div className="postHeader">
                <div className="userCredentialsOnPost">
                    <div
                    style={{
                        width: "50px",
                        height: "50px",
                        backgroundImage: `url(${post.userPic})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    className="profilePictureOnPost"
                    ></div>
                    <div className="nameAndDate">
                        <div className="postUsernameContainer">
                            <h5 className="postUsername">{post.username}</h5>
                        </div>
                    </div>
                </div>
            </div>
            {post.picture && (
            <div className="d-flex justify-content-center postPictureContainer">
                <div
                    style={{
                    backgroundImage: `url(${post.picture})`,
                    width: "100%",
                    height: "30rem",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    }}
                    className="postPicture"
                ></div>
            </div>
            )}
            <div className="postTextContainer">
                <h5 className="postText">{post.text}</h5>
            </div>
        </div>

        

        </>
  );
    
}
