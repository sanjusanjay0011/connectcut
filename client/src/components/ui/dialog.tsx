import React from 'react';

const Dialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', width: '300px', margin: '10px auto' }}>
      <h2>Dialog</h2>
      {children}
    </div>
  );
};

export default Dialog;
