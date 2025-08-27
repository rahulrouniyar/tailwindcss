import { config } from "@/lib/config";
import { PaginatedResponse, ApiCategory, Category} from "@/types";
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from "@/lib/constants";
import { toast } from "sonner";
import { mapApiCategoriesToCategories } from "@/lib/mappers/category";

const API_URL = config.apiUrl;



export const fetchCategories = async (pageNumber: number = DEFAULT_PAGE, itemsPerPage: number = DEFAULT_ITEMS_PER_PAGE):Promise<PaginatedResponse<Category>> => {
    const url = `${API_URL}/categories?page=${pageNumber}&page_size=${itemsPerPage}`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        // console.log(data); 

        return data;
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch categories. Please try again.');
    }
};

// const handleDeleteConfirm = async () => {
//   if (!categoryToDelete) return;

//   const { id, name } = categoryToDelete;
//   setDeleting(id);

//   try {
//     const res = await fetch(`http://127.0.0.1:8000/api/categories/${id}/`, {
//       method: "DELETE",
//     });

//     if (!res.ok) {
//       throw new Error(`Failed with status ${res.status}`);
//     }

//     toast.success(`Category "${name}" deleted successfully`);

//     // Remove the deleted category from local state
//     // setCategories((prev) => prev.filter((cat) => cat.category_id !== category_id));
//     // setCurrentPage(currentPage);// so that the page size stays the same after deletion
//   } catch (error: any) {
//     console.error("Delete error:", error);
//     toast.error(`Failed to delete category "${name}". Please try again.`);
//   } finally {
//     setDeleting(null);
//     setCategoryToDelete(null);
//     setShowDeleteDialog(false); // close dialog after action
//     fetchCategories(currentPageNumber, itemsPerPage); // Refresh the list after deletion
//   }
// };


export const deleteCategory = async (id: string): Promise<void> => {
  if (!id) throw new Error("Category ID is required");

  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text(); // read server error message if any
    throw new Error(`Failed to delete category: ${res.status} ${errorText}`);
  }
  return Promise.resolve();
};