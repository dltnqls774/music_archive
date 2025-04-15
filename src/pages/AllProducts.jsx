import React from 'react';
import ProductCard from '../component/ProductCard';
import useProducts from '../hooks/useProducts';

export default function AllProducts() {
    const {
        getProducts: { isLoading, error, data: products },
    } = useProducts();

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error.message}</p>}
            <ul className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4">
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </ul>
        </>
    );
}