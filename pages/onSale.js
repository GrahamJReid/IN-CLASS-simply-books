import React, { useEffect, useState } from 'react'
import { booksOnSale } from '../api/bookData'
import BookCard from '../components/BookCard';
import { useAuth } from '../utils/context/authContext';

export default function onSale() {
  const {user} = useAuth();
  const [books, setBooks ] = useState([]);
const getAllBooksOnSale = ()=>{
  booksOnSale(user.uid).then(setBooks)
}
  useEffect(() => {
    booksOnSale(user.uid).then(setBooks);
  }, [])
  
  return (
    <div>{books.map((books)=> (
      <BookCard key={books.firebaseKey} bookObj ={books} onUpdate={getAllBooksOnSale}/>
    ))}</div>
  )
}
