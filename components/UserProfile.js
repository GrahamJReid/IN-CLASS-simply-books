import Image from 'next/image';
import React from 'react'
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import{ useAuth } from '../utils/context/authContext'

export default function UserProfile() {
  const {user} = useAuth();
  console.warn(user);
  return (
    <div>
      <Image src={user.photoURL} height='100' width='100' />
     <p>{user.displayName}</p>
     <p>{user.email}</p>
     <p>{user.metadata.lastSignInTime}</p>
     <Button type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  )
}
