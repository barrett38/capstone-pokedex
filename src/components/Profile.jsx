import { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

import AuthContext from "../store/authContext";

const Profile = () => {
  const {
    state: { userId },
  } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  const getUserPosts = useCallback(() => {
    axios
      .get(`/userposts/${userId}`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);

  const mappedPosts = posts.map((post) => {
    return (
      <div key={post.id} className="post-card">
        <h2>{post.name}</h2>
        <p>{post.content}</p>
      </div>
    );
  });

  return mappedPosts.length >= 1 ? (
    <main>{mappedPosts}</main>
  ) : (
    <main>
      <h1>You haven't posted yet!</h1>
    </main>
  );
};

export default Profile;
