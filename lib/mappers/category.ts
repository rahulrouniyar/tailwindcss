import { ApiCategory, Category } from "@/types";

// Map a single ApiCategory → Category
export const mapApiCategoryToCategory = (apiCategory: ApiCategory): Category => {
  return {...apiCategory};
};

// Map multiple ApiCategory[] → Category[]
export const mapApiCategoriesToCategories = (
  apiCategories: ApiCategory[] | undefined
): Category[] | undefined => {
  return apiCategories?.map(mapApiCategoryToCategory);
};
