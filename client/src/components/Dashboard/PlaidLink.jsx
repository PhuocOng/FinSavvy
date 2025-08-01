import React, { useCallback, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';

const PlaidLink = ({ onLinkSuccess }) => {
  const [linkToken, setLinkToken] = useState(null);

  // 1. Fetch a link_token from your server
  const generateToken = useCallback(async () => {
    try {
      const authToken = localStorage.getItem('token'); // Get JWT from storage
      const response = await axios.post('/api/plaid/create_link_token', {}, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      setLinkToken(response.data.link_token);
    } catch (error) {
      console.error('Failed to create link token', error);
    }
  }, []);

  useEffect(() => {
    generateToken();
  }, [generateToken]);

  // 2. Handle a successful link
  const onSuccess = useCallback(async (public_token, metadata) => {
    try {
      const authToken = localStorage.getItem('token');
      await axios.post('/api/plaid/exchange_public_token', { public_token }, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      // Notify the parent component that linking was successful
      if (onLinkSuccess) {
        onLinkSuccess();
      }
    } catch (error) {
      console.error('Failed to exchange public token', error);
    }
  }, [onLinkSuccess]);

  const config = {
    token: linkToken,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <button onClick={() => open()} disabled={!ready}>
      Link Bank Account
    </button>
  );
};

export default PlaidLink;