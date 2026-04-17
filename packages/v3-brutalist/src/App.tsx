import { Route, Routes } from 'react-router-dom';
import { HomePage } from './routes/Home.tsx';
import { ListingPage } from './routes/Listing.tsx';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/propiedad/:id" element={<ListingPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
