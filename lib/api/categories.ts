import { config } from "@/lib/config";
import { PaginatedResponse, ApiCategory, Category} from "@/types";
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from "@/lib/constants";
import { toast } from "sonner";
import { mapApiCategoriesToCategories } from "@/lib/mappers/category";

const API_URL = config.apiUrl;

export const fetchCategories = async (pageNumber: number = DEFAULT_PAGE, itemsPerPage: number = DEFAULT_ITEMS_PER_PAGE) => {
    const url = `${API_URL}/categories?page=${pageNumber}&page_size=${itemsPerPage}`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data: PaginatedResponse<ApiCategory> = await res.json();
        // console.log(data); 

        return data;
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch categories. Please try again.');
    }
};