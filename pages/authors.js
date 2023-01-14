import React, { useEffect, useState } from 'react'
import{ useAuth } from '../utils/context/authContext'
import {getAuthors} from '../api/authorData'
import AuthorCard from '../components/AuthorCard';
import { useRouter } from 'next/router';


export default function ShowAuthors() {
  const [authors, setAuthors] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(()=>{
    getAuthors(user.uid).then(setAuthors);
  }, []);
  return (
    <div>{authors.map((author)=> (
     < AuthorCard key={author.firebaseKey} authorObj={author} />
     ) )}</div>
  )
}
