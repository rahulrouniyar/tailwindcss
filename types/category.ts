export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
};

// export type Category = Omit<ApiCategory, "id">;
// export type Category = ApiCategory;
export type Category = Omit<ApiCategory, "category_id"> & {
  id: string;
};