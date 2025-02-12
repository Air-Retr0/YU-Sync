import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import UserSync from './auth/users';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-7n5k4nc1nc8i2yev.ca.auth0.com"
      clientId="UIJrCQDJjATGIjZYF2hj0V04qrVSaUBL"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      cacheLocation='localstorage'
    >
      <UserSync />
      <App />
    </Auth0Provider>,
  </React.StrictMode>
);