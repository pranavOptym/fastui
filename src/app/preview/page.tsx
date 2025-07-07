'use client';

import React, { useState } from 'react';
import { Box, Grid, Avatar } from '@mui/material';
import type { NavItem } from '@/hooks/useNavState';
import RmaxTabBar from '@/design-system/Routemax/RmaxTabBar';
import RmaxButton from '@/design-system/Routemax/RmaxButton';
import RmaxGrid from '@/design-system/Routemax/RmaxGrid';
import DonutChart from '@/design-system/DonutChart';
import MultiRingGauge from '@/design-system/MultiRingGauge';
import PieChart from '@/design-system/PieChart';
import SliderChart from '@/design-system/SliderChart';
import LivePlayground from '@/components/LivePlayground';
import ReactLiveEditor from '@/components/ReactLiveEditor';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { FigmaDesignTokens } from '@/components/FigmaDesignTokens';
import * as Icons from '@mui/icons-material';

const navData: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Icons.Dashboard /> },
  {
    id: 'components',
    label: 'Components',
    icon: <Icons.Extension />,
    children: [
      { id: 'charts', label: 'Charts', icon: <Icons.BarChart /> },
      { id: 'tables', label: 'Tables', icon: <Icons.TableChart /> },
      { id: 'forms', label: 'Forms', icon: <Icons.Edit /> },
    ],
  },
  { id: 'settings', label: 'Settings', icon: <Icons.Settings /> },
];

export default function PreviewDashboard() {
  const [tabValue, setTabValue] = useState<string | number>('overview');

  const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'age', headerName: 'Age' },
  ];
  const rows = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35 },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Tab Bar */}
        <RmaxTabBar
          tabs={[
            { label: 'Overview', value: 'overview' },
            { label: 'Reports', value: 'reports' },
            { label: 'Analytics', value: 'analytics' },
          ]}
          value={tabValue}
          onChange={(_, v) => setTabValue(v)}
          leftContent={<Avatar sx={{ bgcolor: 'primary.main' }}>F</Avatar>}
          actions={{
            actions: [
              {
                icon: <Icons.Settings />,
                onClick: () => alert('Settings clicked'),
                tooltip: 'Settings',
                color: 'white',
                hoverColor: '#47A9F6',
                key: 'settings',
              },
            ],
            iconSize: 'small',
            gap: 1,
          }}
          sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        />

        {/* Main Content */}
        <Box sx={{ p: 3, flex: 1, overflow: 'auto' }}>
          <ThemeSwitcher />

          <Grid container spacing={4}>
            {/* Charts */}
            <Grid item xs={12} md={4}>
              <DonutChart
                segments={[
                  { value: 30, color: '#47A9F6' },
                  { value: 45, color: '#34D399' },
                  { value: 25, color: '#F59E0B' },
                ]}
                label="Sales"
                subLabel="$120k"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PieChart
                segments={[
                  { value: 40, color: '#EF4444' },
                  { value: 30, color: '#3B82F6' },
                  { value: 30, color: '#10B981' },
                ]}
                label="Users"
                subLabel="1.2k"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MultiRingGauge
                rings={[
                  { progress: 0.72, color: '#47A9F6' },
                  { progress: 0.55, color: '#F59E0B' },
                  { progress: 0.32, color: '#34D399' },
                ]}
                label="Overall"
                subLabel="72%"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SliderChart
  size={280}
  min={0}
  max={120}
  pointerColor="#3C8EF2"
  ticks={[0,30,60,90,120]}
              formatSubLabel={(v) => `${v.toFixed(0)} min`}
              label="Time Spent"
            />
            </Grid>

            {/* Action Button & Table */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RmaxButton
                variant="primary"
                size="large"
                leftIcon={<Icons.PlayArrow />}
                rightIcon={<Icons.ArrowForward />}
                onClick={() => alert('Primary Action')}
              >
                Run Analysis
              </RmaxButton>
            </Grid>
            <Grid item xs={12}>
              <RmaxGrid columns={columns} rows={rows} height={400} />
            </Grid>

            {/* Live Playground & Editor */}
            <Grid item xs={12} md={6}>
              <ReactLiveEditor componentType="button" />
            </Grid>
            <Grid item xs={12} md={6}>
              <LivePlayground code={`<RmaxButton variant="primary" onClick={() => alert('Hello!')}>Live Button</RmaxButton>`} />
            </Grid>

            {/* Design Tokens Showcase */}
            <Grid item xs={12}>
              <FigmaDesignTokens />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
