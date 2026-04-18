import { useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './routes/Home.tsx';
import { ListingPage } from './routes/Listing.tsx';

export function App() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/propiedad/:id" element={<ListingPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
