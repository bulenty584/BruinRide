import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../../../login/SignInOut';


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

    try{
      const uid  = 'XMW1w9TW8MXqhxUPshb3myfBoIL2';
      const cloudFunctionURL = 'https://us-central1-bruinride-41c8c.cloudfunctions.net/getUsers/allow-cors?uid=' + uid;
      console.log(cloudFunctionURL)
      const response = await fetch(cloudFunctionURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
      }
      else {
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error during button click:', error);
    }
    // try {
    //   // Replace with your Firebase Cloud Function URL
    //   const cloudFunctionUrl = 'https://us-central1-bruinride-41c8c.cloudfunctions.net/signup/allow-cors';

    //   // Replace with actual user credentials
    //   const userCredentials = {
    //     email: 'bulentil@y.ucla.edu',
    //     password: 'password124',
    //   };

    //   const response = await fetch(cloudFunctionUrl, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(userCredentials),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log('Success:', data);
    //   } else {
    //     const errorData = await response.json();
    //     console.error('Error:', errorData);
    //   }
    // } catch (error) {
    //   console.error('Error during button click:', error);
    // }
  };
      


  return (
    //<NavLink to='/signIn' >
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? 'Loading…' : 'Sign Up Now!'}
    </Button>
    //</NavLink>
  );
};

export default LoadingButton;