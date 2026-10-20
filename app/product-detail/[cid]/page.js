import { Suspense } from 'react';
import ProductDetail from './ProductDetail';

export default function Page(){
  return (
    <Suspense fallback={<p className="container mt-5">Loading product...</p>}>
      <ProductDetail />
    </Suspense>
  );
}