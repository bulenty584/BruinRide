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
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
<<<<<<< HEAD
          "Access-Control-Allow-Origin": "*",
=======
          'Allow-Control-Allow-Origin': '*',
>>>>>>> 6193c28c351ad06afe45cc24959d6a57ce1a3c22
        },
        body: JSON.stringify(userCredentials),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
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