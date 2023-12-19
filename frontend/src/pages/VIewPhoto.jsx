import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ViewPhoto = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const url = queryParams.get('url');
  console.log(url);
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh' }}>
      <img height="200px" src={url}/>
    </div>
  );
};

export default ViewPhoto;
