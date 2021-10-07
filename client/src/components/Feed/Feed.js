import { ExitToApp, ExpandMoreOutlined, Search } from '@material-ui/icons';
import './feed.css';
import { Image } from '@material-ui/icons';
import {gql, useMutation, useQuery} from '@apollo/client';
import {useState} from 'react';
import { Send } from '@material-ui/icons';
import Post from '../Post/Post';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../context/auth';
import CreatePost from '../createPost/CreatePost';

function Feed() {
const {logout,user} = useContext(AuthContext);
const history = useHistory();


const FETCH_POSTS = gql`
query getPosts{
  getPosts {
  text
image
post_id
title
user_id
profilepic
name
created_at  
  }
}
`



const logoutFunc = e => {
  e.preventDefault();
  logout()
  history.push('/')
}

const {data,loading} = useQuery(FETCH_POSTS);

if(loading) return 'loading...'

    return (
        <div className="feed">

<div className="topbar">


<div className="currentUser">
<div className="currentUserContainer">
<div className="userImage">
    <img src={user.profilepic} alt=""/>
</div>
<div className="userInformation">
<h4>{user.name}</h4>
<span>{user.age}</span>
</div>
</div>

<a className="logout" onClick={logoutFunc}>
<ExitToApp/>
</a>
</div>

</div>

<div className="postContainer">
<CreatePost personal={true}/>

{data?.getPosts.map(post => (
    <Post key={post.post_id} post_id={post.post_id} createdAt={post.created_at} name={post.name} profilePic={post.profilepic} title={post.title} text={post.text} image={post?.image}/>
))}

</div>


        </div>
    )
}

export default Feed
