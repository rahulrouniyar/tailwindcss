'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Product = {
  product_id: number;
  slug: string;
  name: string;
  description?: string;
  detail?: Record<string, any>;
  base_price: string;
  available_colors: any[];
  available_sizes: any[];
  category: number;
};

type PaginatedResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
};

export default function CategoryProductsTable({ categoryId }: { categoryId: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchProducts = async (url?: string) => {
    setLoading(true);

    const endpoint =
      url || `http://localhost:8000/api/categories/${categoryId}/products`;
    console.log(endpoint);

    const res = await fetch(endpoint);
    if (!res.ok) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const data: PaginatedResponse = await res.json();
    setProducts(data.results);
    setNextPage(data.next);
    setPrevPage(data.previous);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Products in Category {categoryId}</h2>

      <button
        onClick={() => router.push(`/products/new?category=${categoryId}`)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add New Product
      </button>

      {loading && <p>Loading...</p>}

      {!loading && products.length === 0 && <p>No products found.</p>}

      {!loading && products.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Slug</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Base Price</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.product_id} className="border-b border-gray-300">
                    <td className="px-4 py-2">{product.product_id}</td>
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">{product.slug}</td>
                    <td className="px-4 py-2">{product.description || '-'}</td>
                    <td className="px-4 py-2">{product.base_price}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => router.push(`/products/${product.slug}`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => router.push(`/products/${product.product_id}/edit`)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              disabled={!prevPage}
              onClick={() => prevPage && fetchProducts(prevPage)}
              className={`px-4 py-2 rounded ${
                prevPage
                  ? 'bg-gray-800 text-white hover:bg-gray-900'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Previous
            </button>

            <button
              disabled={!nextPage}
              onClick={() => nextPage && fetchProducts(nextPage)}
              className={`px-4 py-2 rounded ${
                nextPage
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
