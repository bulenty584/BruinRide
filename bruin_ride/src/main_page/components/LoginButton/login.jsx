import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { db, auth } from '../../../login/SignInOut';
import { getFirestore, collection, query, orderBy, onSnapshot, doc, setDoc, where, getDocs } from 'firebase/firestore';


function LoadingButton() {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = async () => {
    setLoading(true);
  };


  return (
    <NavLink to='/signIn' >
      <Button
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? 'Loading…' : 'Sign Up Now!'}
      </Button>
    </NavLink>
  );
};

export default LoadingButton;