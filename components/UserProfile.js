import React from 'react'
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import{ useAuth } from '../utils/context/authContext'

export default function UserProfile() {
  const {user} = useAuth();
  return (
    <div>
     <p>{user.displayName}</p>
     <Button type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  )
}
