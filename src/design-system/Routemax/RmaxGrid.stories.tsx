import RmaxGrid from './RmaxGrid';

const meta = {
  title: 'Design System/Routemax/RmaxGrid',
  component: RmaxGrid,
  tags: ['autodocs'],
};
export default meta;

export const Default = {
  args: {
    columns: [
      { headerName: 'Make', field: 'make' },
      { headerName: 'Model', field: 'model' },
      { headerName: 'Price', field: 'price' },
    ],
    rows: [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
    ],
    height: 300,
  },
}; 