import React from 'react';

export default function ErrorMessage({ error }) {
  return (
    <div className='LoginErrorMessage' style={{color: 'red'}}>
      {error}
    </div>
  );
}
