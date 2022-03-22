import React from 'react';
import axios from 'axios';

export default function LoginRoot() {
  return (
    <div>
      <h1>Sign in</h1>
      <a className="button google" href="/login/federated/google">Sign in with Google</a>
    </div>
  );
}
