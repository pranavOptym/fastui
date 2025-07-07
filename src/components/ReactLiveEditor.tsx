"use client"

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import LivePlayground from './LivePlayground';
interface ReactLiveEditorProps {
  componentType: 'button' | 'tabBar' | 'grid' | 'verticalDividerGroup' | 'donutChart' | 'pieChart' | 'multiRingGauge' | 'sliderChart';
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
tabBar: `
<RmaxTabBar
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
/>`,
verticalDividerGroup: `<VerticalDividerGroup dividerColor="red" dividerHeight={32} dividerMargin={16}>
  <div>Content 1</div>
  <div>Content 2</div>
  <div>Content 3</div>
</VerticalDividerGroup>`,
grid: `
<div style={{width: '50vh'}}>
<RmaxGrid
        columns={[
          { headerName: 'Make', field: 'make' },
          { headerName: 'Model', field: 'model' },
          { headerName: 'Price', field: 'price' },
        ]}
        rows={[
          { make: 'Toyota', model: 'Celica', price: 35000 },
          { make: 'Ford', model: 'Mondeo', price: 32000 },
        ]}
        height={300}
      />
</div>
`,
    // NEW: Donut Chart
    donutChart: `<DonutChart
  segments={[
    { value: 30, color: '#47A9F6' },
    { value: 45, color: '#34D399' },
    { value: 25, color: '#F59E0B' },
  ]}
  label="Sales"
  subLabel="$120k"
/>`,
    // NEW: Pie Chart
    pieChart: `<PieChart
  segments={[
    { value: 40, color: '#EF4444' },
    { value: 30, color: '#3B82F6' },
    { value: 30, color: '#10B981' },
  ]}
  label="Users"
  subLabel="1.2k"
/>`,
    // NEW: Multi Ring Gauge
    multiRingGauge: `<MultiRingGauge
  rings={[
    { progress: 0.72, color: '#47A9F6' },
    { progress: 0.55, color: '#F59E0B' },
    { progress: 0.32, color: '#34D399' },
  ]}
  label="Overall"
  subLabel="72%"
/>`,
    // NEW: Slider Chart
    sliderChart: `<SliderChart
  size={280}
  min={0}
  max={120}
  pointerColor="#3C8EF2"
  ticks={[0, 30, 60, 90, 120]}
  formatSubLabel={(v) => v.toFixed(0) + ' min'}
  label="Time Spent"
/>`,
  };


  const [code, setCode] = useState(defaultCode[componentType]);

  console.log(componentType, code);
  

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