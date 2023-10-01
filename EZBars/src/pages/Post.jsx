import React, { useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';


const Post = () => {
  let {id} = useParams()
  const [postObject, setPostObject] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/users/byId/${id}`).then((response) => {
        setPostObject(response.data);
    });
    })
  return (
    <div>{postObject.id}{postObject.useremail}{postObject.userpassword}</div>
  )
}

export default Post