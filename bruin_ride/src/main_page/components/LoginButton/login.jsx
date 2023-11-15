import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';


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
    try {
      // Replace with your Firebase Cloud Function URL
      const cloudFunctionUrl = 'https://us-central1-bruinride-41c8c.cloudfunctions.net/signup';

      // Replace with actual user credentials
      const userCredentials = {
        email: 'bulentil@g.ucla.edu',
        password: 'password123',
      };

      const response = await fetch(cloudFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        },
        body: JSON.stringify(userCredentials),
      });

      console.log (response.body)

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
      } else {
        console.error('Error:', response.json());
      }
    } catch (error) {
      console.error('Error during button click:', error);
    }
  };

  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? 'Loading…' : 'Sign Up'}
    </Button>
  );
};

export default LoadingButton;