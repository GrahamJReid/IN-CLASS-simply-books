import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createAuthor, updateAuthor } from '../../api/authorData';
import { Router, useRouter } from 'next/router';

const initialState ={
first_name:'',
last_name:'',
email:'',
image:'',
favorite:false,
}
export default function AuthorForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e)=> {
    const {name,value} = e.target;
    setFormInput((prevState)=> ({
...prevState,
[name]:value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateAuthor(formInput)
        .then(() => router.push(`/author/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAuthor(payload).then(() => {
        router.push('/');
      });
    }
  };
  
  return (

    <Form onSubmit ={handleSubmit}>
     <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Author</h2>

     <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a First Name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Last Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Last Name"
          name="last_name"
          value={formInput.last_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Email" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Author Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="favorite"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
          favorite: e.target.checked,
          }));
        }}
      />
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Author</Button>
      </Form>
    

  );




}


AuthorForm.propTypes = {
  obj:PropTypes.shape ({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    image:PropTypes.string,
    favorite:PropTypes.bool,

  })
};

AuthorForm.defaultProps = {
obj: initialState,
}
