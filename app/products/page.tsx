'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const router = useRouter();

  const fetchProducts = async (url = 'http://localhost:8000/api/products/') => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data: PaginatedResponse = await res.json();
      setProducts(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      setProducts([]);
      setNextPage(null);
      setPrevPage(null);
      console.error(error);
      toast.error('Failed to fetch products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteDialog(true);
  };


  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
  
    const { slug, name } = productToDelete;
    setDeleting(slug);
  
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/products/${slug}/`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }
  
      toast.success(`Product "${name}" deleted successfully`);
  
      // Remove the deleted product from local state
      // setProducts((prev) => prev.filter((product) => product.slug !== slug));
      // setCurrentPage(currentPage);
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(`Failed to delete product "${name}". Please try again.`);
    } finally {
      setDeleting(null);
      setProductToDelete(null);
      setShowDeleteDialog(false); // close dialog after action
      fetchProducts(currentPage);// so that the page size stays the same after deletion
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setProductToDelete(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <button
        onClick={() => router.push('/products/new')}
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
                {products.map(product => (
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
                        onClick={() => router.push(`/products/${product.slug}/edit`)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        disabled={deleting === product.slug}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                        {deleting === product.slug ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
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

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
