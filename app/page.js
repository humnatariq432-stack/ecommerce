'use client';

import Card from "@/components/card/card";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(function() {
    axios.get('/api/product').then((resp) => {
      setProducts(resp.data.products);
    });
  }, []);

  return (
    <section className="d-flex flex-wrap" style={{ display: 'flex', justifyContent: 'space-around' }}>
      {products.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          price={product.price}
          title={product.title}
          description={product.description}
          /* DummyJSON products use .thumbnail for card previews */
          img={product.thumbnail || product.images?.[0]} 
        />
      ))}
    </section>
  );
}

  {/* agar component m data pass krna to us component kay tag per attributes lgyi jyen
       aur component waley function kay parameter m use pakar lijega
      */}