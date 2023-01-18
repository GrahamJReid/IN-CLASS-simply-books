import React, { useEffect, useState } from 'react'
import { getFavoriteAuthors } from '../api/authorData';
import AuthorCard from '../components/AuthorCard';
import { useAuth } from '../utils/context/authContext';

export default function favoriteAuthors() {
  const {user} = useAuth();
  const [authors, setAuthors ] = useState([]);
const getAllFavoriteAuthors = ()=>{
  getFavoriteAuthors(user.uid).then(setAuthors)
}
  useEffect(() => {
    getFavoriteAuthors(user.uid).then(setAuthors);
  }, [])
  
  return (
    <div>{authors.map((authors)=> (
      <AuthorCard key={authors.firebaseKey} authorObj ={authors}/>
    ))}</div>
  )
}
