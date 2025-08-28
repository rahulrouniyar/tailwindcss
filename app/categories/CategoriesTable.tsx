// 'use client';

// import { useState } from 'react';
// import { useQuery} from "@tanstack/react-query";
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { Trash2 } from 'lucide-react';
// import ConfirmDialog from '@/components/ui/ConfirmDialog';
// import { Pagination } from '@/components/ui/pagination';
// import { fetchCategories } from '@/lib/api/categories';
// import { Category } from '@/types';
// import { mapApiCategoriesToCategories } from '@/lib/mappers';
// import { CATEGORY_RESOURCE_KEY } from '@/lib/constants';

// type CategoriesTableProps = {
//   pageNumber: number;
//   itemsPerPage: number;
// };

// export default function CategoriesTable({pageNumber, itemsPerPage}: CategoriesTableProps) {
//   const [currentPageNumber, setCurrentPageNumber] = useState<number>(pageNumber);
//   const [pageSize, setPageSize] = useState<number>(itemsPerPage);

//   const [deleting, setDeleting] = useState<string | null>(null);//id of the item to delete
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);//controls dialog visibility
//   const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);//category object to delete

//   const router = useRouter();

//   const handleDeleteClick = (category: Category) => {
//     setCategoryToDelete(category);
//     setShowDeleteDialog(true);
//   };


//   const handleDeleteConfirm = async () => {
//     if (!categoryToDelete) return;
  
//     const { id, name } = categoryToDelete;
//     setDeleting(id);
  
//     try {
//       const res = await fetch(`http://127.0.0.1:8000/api/categories/${id}/`, {
//         method: "DELETE",
//       });
  
//       if (!res.ok) {
//         throw new Error(`Failed with status ${res.status}`);
//       }
  
//       toast.success(`Category "${name}" deleted successfully`);
  
//       // Remove the deleted category from local state
//       // setCategories((prev) => prev.filter((cat) => cat.category_id !== category_id));
//       // setCurrentPage(currentPage);// so that the page size stays the same after deletion
//     } catch (error: any) {
//       console.error("Delete error:", error);
//       toast.error(`Failed to delete category "${name}". Please try again.`);
//     } finally {
//       setDeleting(null);
//       setCategoryToDelete(null);
//       setShowDeleteDialog(false); // close dialog after action
//       fetchCategories(currentPageNumber, itemsPerPage); // Refresh the list after deletion
//     }
//   };

//   const handleDeleteCancel = () => {
//     setShowDeleteDialog(false);
//     setCategoryToDelete(null);
//   };

//   const { data, isLoading, isError } = useQuery({
//     queryKey: [CATEGORY_RESOURCE_KEY, currentPageNumber, pageSize],
//     queryFn: () => fetchCategories(currentPageNumber, pageSize),
//   });

//   // Extract categories, totalItems, nextPage, previousPage from data with type annotation
//   const categories: Category[] = mapApiCategoriesToCategories(data?.results)?? [];
//   const totalItems: number = data?.count ?? 0;
//   // const nextPage: number | null = data?.next ? currentPageNumber! + 1 : null;
//   // const previousPage: number | null = data?.previous ? currentPageNumber! - 1 : null;
//   console.log(data);
//   return (
//     <>
//         <h1 className="text-2xl font-bold mb-4">Categories</h1>

//         <button
//           onClick={() => router.push('/categories/new')}
//           className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Add New Category
//         </button>

//         {isLoading && <p>Loading...</p>}

//         {!isLoading && (
//         <>
//             <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-300">
//                 <thead>
//                 <tr className="bg-gray-100 border-b border-gray-300">
//                     <th className="px-4 py-2 text-left">ID</th>
//                     <th className="px-4 py-2 text-left">Name</th>
//                     <th className="px-4 py-2 text-left">Slug</th>
//                     <th className="px-4 py-2 text-left">Description</th>
//                     <th className="px-4 py-2 text-left">Actions</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {categories.map((cat) => (
//                     <tr key={cat.id} className="border-b border-gray-300">
//                     <td className="px-4 py-2">{cat.id}</td>
//                     <td className="px-4 py-2">{cat.name}</td>
//                     <td className="px-4 py-2">{cat.slug}</td>
//                     <td className="px-4 py-2">{cat.description || '-'}</td>
//                     <td className="px-4 py-2 space-x-2">
//                         <button
//                         onClick={() => router.push(`/categories/${cat.id}`)}
//                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                         >
//                         Details
//                         </button>
//                         <button
//                         onClick={() => router.push(`/categories/${cat.id}/edit`)}
//                         className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                         >
//                         Edit
//                         </button>
//                         <button
//                         onClick={() => handleDeleteClick(cat)}
//                         disabled={deleting === cat.id}
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
//                         >
//                         <Trash2 size={14} />
//                         {deleting === cat.id ? 'Deleting...' : 'Delete'}
//                         </button>
//                     </td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//             </div>

//             <Pagination
//             totalItems={totalItems}
//             itemsPerPage={pageSize}
//             setItemsPerPage={setPageSize}
//             onPageChange={(page) => {
//                 setCurrentPageNumber(page);
//             }}
//             currentPageNumber={currentPageNumber}
//             />
//         </>
//         )}

//         <ConfirmDialog
//         isOpen={showDeleteDialog}
//         onClose={handleDeleteCancel}
//         onConfirm={handleDeleteConfirm}
//         title="Delete Category"
//         message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
//         confirmText="Delete"
//         cancelText="Cancel"
//         variant="danger"
//         />
//     </>
//   );
// }





'use client';

import { useState } from 'react';
import { useQuery, useQueryClient} from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { Pagination } from '@/components/ui/pagination';
import { fetchCategories, deleteCategory } from '@/lib/api/categories';
import { Category } from '@/types';
import { mapApiCategoriesToCategories } from '@/lib/mappers';
import { CATEGORY_RESOURCE_KEY } from '@/lib/constants';
import { useDelete } from '@/hooks/use-delete';

type CategoriesTableProps = {
  pageNumber: number;
  itemsPerPage: number;
};

export default function CategoriesTable({pageNumber, itemsPerPage}: CategoriesTableProps) {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(pageNumber);
  const [pageSize, setPageSize] = useState<number>(itemsPerPage);
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: [CATEGORY_RESOURCE_KEY, currentPageNumber, pageSize],
    queryFn: () => fetchCategories(currentPageNumber, pageSize),
    // staleTime: 1000 * 60 * 5,
  });

  // console.log(queryClient.getQueryData([CATEGORY_RESOURCE_KEY, currentPageNumber, pageSize]));

  const allCategoryData = queryClient.getQueriesData({
  queryKey: [CATEGORY_RESOURCE_KEY],
});
  console.log("component data: " , allCategoryData);
  const {
    showDeleteDialog,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    itemToDelete,
    mutation
  } = useDelete<Category>({
    mutationFn: deleteCategory,
    invalidateKeys: [CATEGORY_RESOURCE_KEY],
    onSuccess: () => {
      toast.success(`Category deleted successfully`);
    },
    onError: () => {
      // toast.error(`Failed to delete category. Please try again.`);
    },
    onSettled: () => {
      // fetchCategories(currentPageNumber, itemsPerPage); // Refresh the list after deletion
    }
  });


  // Extract categories, totalItems, nextPage, previousPage from data with type annotation
  const categories: Category[] = mapApiCategoriesToCategories(data?.results)?? [];
  const totalItems: number = data?.count ?? 0;
  // const nextPage: number | null = data?.next ? currentPageNumber! + 1 : null;
  // const previousPage: number | null = data?.previous ? currentPageNumber! - 1 : null;
  // console.log(data);
  return (
    <>
        <h1 className="text-2xl font-bold mb-4">Categories</h1>

        <button
          onClick={() => router.push('/categories/new')}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Category
        </button>

        {isLoading && <p>Loading...</p>}

        {!isLoading && (
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
                    <tr key={cat.id} className="border-b border-gray-300">
                    <td className="px-4 py-2">{cat.id}</td>
                    <td className="px-4 py-2">{cat.name}</td>
                    <td className="px-4 py-2">{cat.slug}</td>
                    <td className="px-4 py-2">{cat.description || '-'}</td>
                    <td className="px-4 py-2 space-x-2">
                        <button
                        onClick={() => router.push(`/categories/${cat.id}`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                        Details
                        </button>
                        <button
                        onClick={() => router.push(`/categories/${cat.id}/edit`)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                        Edit
                        </button>
                        <button
                        onClick={() => {handleDeleteClick(cat)
                        }}
                        // disabled={mutation.isPending}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                        <Trash2 size={14} />
                        {/* {mutation.isPending? 'Deleting...' : 'Delete'} */}
                        Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            <Pagination
            totalItems={totalItems}
            itemsPerPage={pageSize}
            setItemsPerPage={setPageSize}
            onPageChange={(page) => {
                setCurrentPageNumber(page);
            }}
            currentPageNumber={currentPageNumber}
            />
        </>
        )}

        <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message={`Are you sure you want to delete "${itemToDelete?.name}"? This action cannot be undone.`}
        confirmText={mutation.isPending? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        variant="danger"
        />
    </>
  );
}
