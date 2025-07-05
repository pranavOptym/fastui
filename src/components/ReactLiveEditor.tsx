"use client"

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import LivePlayground from './LivePlayground';
interface ReactLiveEditorProps {
  componentType: 'button' | 'tabBar';
}

export const ReactLiveEditor: React.FC<ReactLiveEditorProps> = ({ componentType }) => {
  
  const defaultCode = {
    button: `<RmaxButton
  variant="contained"
  size="large"
  className="gradient glow"
  leftIcon={<Star />}
  rightIcon={<ArrowForward />}
  onClick={() => alert('Button clicked!')}
>
  Premium Button
</RmaxButton>`,
    form: `<div style={{ 
  padding: '32px', 
  backgroundColor: 'white', 
  borderRadius: '16px', 
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px'
}}>
  <h1 style={{ 
    marginBottom: '24px', 
    color: '#00bcd4', 
    textAlign: 'center', 
    fontSize: '24px', 
    fontWeight: 'bold' 
  }}>
    Contact Form
  </h1>
  <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
        Name
      </label>
      <input 
        type="text" 
        required 
        style={{
          width: '100%',
          padding: '12px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          fontSize: '16px'
        }} 
      />
    </div>
    <div>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
        Email
      </label>
      <input 
        type="email" 
        required 
        style={{
          width: '100%',
          padding: '12px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          fontSize: '16px'
        }} 
      />
    </div>
  </form>
</div>`,
    login: `<div style={{ 
  padding: '32px', 
  backgroundColor: 'white', 
  borderRadius: '16px', 
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px'
}}>
  <h1 style={{ 
    marginBottom: '24px', 
    color: '#00bcd4', 
    textAlign: 'center', 
    fontSize: '24px', 
    fontWeight: 'bold' 
  }}>
    Login
  </h1>
  <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
        Email
      </label>
      <input 
        type="email" 
        required 
        style={{
          width: '100%',
          padding: '12px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          fontSize: '16px'
        }} 
      />
    </div>
    <div>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
        Password
      </label>
      <input 
        type="password" 
        required 
        style={{
          width: '100%',
          padding: '12px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          fontSize: '16px'
        }} 
      />
    </div>
  </form>
</div>`,
tabBar: `<RmaxTabBar
  tabs={[{ label: 'Tab 1', value: 'tab1' }, { label: 'Tab 2', value: 'tab2' }]}
  value="tab1"
  onChange={(event, value) => console.log(value)}
  actions={{
    actions: [
      { icon: <Settings />, onClick: () => console.log('settings'), color: 'white', tooltip: 'Settings' },
      { icon: <Upload />, onClick: () => console.log('upload') },
      { icon: <Help />, onClick: () => console.log('help') },
      { icon: <Cached />, onClick: () => console.log('cached') },
    ]
  }}
/>`
  };


  const [code, setCode] = useState(defaultCode[componentType]);

  useEffect(() => {
    setCode(defaultCode[componentType]);
  }, [componentType]);

  return (
    <Box sx={{ height: '80vh' }}>
      <LivePlayground code={code} onChange={setCode} />
    </Box>
  );
};

export default ReactLiveEditor; 