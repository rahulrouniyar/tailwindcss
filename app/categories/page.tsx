'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { Pagination } from '@/components/ui/pagination';


type Category = {
  category_id: number;
  name: string;
  slug: string;
  description?: string;
};

type PaginatedResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState<number | undefined>(1);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState<number | null>(0);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const API_URL = "http://127.0.0.1:8000/api"
  const router = useRouter();

  const fetchCategories = async () => {
    setLoading(true);
    const url = `${API_URL}/categories/?page=${currentPageNumber}&page_size=${itemsPerPage}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data: PaginatedResponse = await res.json();
      setCategories(data.results);
      setTotalItems(data.count);
      setNextPage(data.next);
      // setCurrentPageNumber(1);
      setPrevPage(data.previous);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setShowDeleteDialog(true);
  };


  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;
  
    const { category_id, name } = categoryToDelete;
    setDeleting(category_id);
  
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/categories/${category_id}/`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }
  
      toast.success(`Category "${name}" deleted successfully`);
  
      // Remove the deleted category from local state
      // setCategories((prev) => prev.filter((cat) => cat.category_id !== category_id));
      // setCurrentPage(currentPage);// so that the page size stays the same after deletion
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(`Failed to delete category "${name}". Please try again.`);
    } finally {
      setDeleting(null);
      setCategoryToDelete(null);
      setShowDeleteDialog(false); // close dialog after action
      fetchCategories();
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setCategoryToDelete(null);
  };

  // useEffect(() => {
  //   fetchCategories();
  // }, []);
  
  useEffect(() => {
    if (currentPageNumber !== undefined) {
    
      console.log("Fetching categories for page:", currentPageNumber);
      fetchCategories();
    }
  }, [currentPageNumber, itemsPerPage]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <button
      onClick={() => router.push('/categories/new')}
      className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Add New Category
    </button>

      {loading && <p>Loading...</p>}

      {!loading && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Slug</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.category_id} className="border-b border-gray-300">
                    <td className="px-4 py-2">{cat.category_id}</td>
                    <td className="px-4 py-2">{cat.name}</td>
                    <td className="px-4 py-2">{cat.slug}</td>
                    <td className="px-4 py-2">{cat.description || '-'}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => router.push(`/categories/${cat.category_id}`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => router.push(`/categories/${cat.category_id}/edit`)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(cat)}
                        disabled={deleting === cat.category_id}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                        {deleting === cat.category_id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            totalItems={totalItems || 0}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            onPageChange={(page) => {
              setCurrentPageNumber(page);
            }}
            currentPageNumber={currentPageNumber || 1}
            setCurrentPageNumber={setCurrentPageNumber}
          />
        </>
      )}

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
