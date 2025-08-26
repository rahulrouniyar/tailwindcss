import { useState } from 'react';
import { Category } from '@/types';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORY_RESOURCE_KEY } from '@/lib/constants';
import { deleteCategory } from '@/lib/api';

// export default function useDelete() {
//   const queryClient = useQueryClient();

//   const [deleting, setDeleting] = useState<string | null>(null);//id of the item to delete
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);//controls dialog visibility
//   const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);//category object to delete
  
//   const handleDeleteClick = (category: Category) => {
//       setCategoryToDelete(category);
//       setShowDeleteDialog(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!categoryToDelete) return;
//     const { id, name } = categoryToDelete;
//     setDeleting(id);
    
//     return useMutation({
//       mutationFn: ()=>deleteCategory(id),
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: [CATEGORY_RESOURCE_KEY] });
//         setShowDeleteDialog(false);
//         setCategoryToDelete(null);



  

  
//   const handleDeleteCancel = () => {
//     setShowDeleteDialog(false);
//     setCategoryToDelete(null);
//   };

//   return {
//     deleting,
//     setDeleting,
//     showDeleteDialog,
//     setShowDeleteDialog,
//     categoryToDelete,
//     setCategoryToDelete,
//     handleDeleteClick,
//     handleDeleteCancel
//   };
// }


type DeleteHookOptions = {
  //API endpoint or delete function
  mutationFn?: (id: number | string) => Promise<void>;
  //Query keys to invalidate after deletion
  invalidateKeys?: (string | unknown)[];
  //Callbacks
  onSuccess?: () => void;
  onError?: () => void;
  onSettled?: () => void;
};

export function useDelete<T extends {id: string | number, name?: string }>({
  mutationFn,
  invalidateKeys = [],
  onSuccess,
  onError,
  onSettled,
}: DeleteHookOptions) {
  const queryClient = useQueryClient();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);//controls dialog visibility
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);//category object to delete
  
  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      if (Array.isArray(invalidateKeys) && invalidateKeys.length > 0) {
        invalidateKeys.forEach(key => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      } else {
        queryClient.invalidateQueries({ queryKey: [CATEGORY_RESOURCE_KEY] });
      }
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
    onSettled: () => {
      setItemToDelete(null);
      setShowDeleteDialog(false);
      if (onSettled) onSettled();
    }
  });

  const handleDeleteClick = (item: T) => {
    setItemToDelete(item);
    setShowDeleteDialog(true);
    mutation.mutate(item.id);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    const { id, name } = itemToDelete;

    
  }

  const handleDeleteCancel = async () => {
    setItemToDelete(null);
    setShowDeleteDialog(false);
  }

  return {
    itemToDelete,
    showDeleteDialog,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    mutation
  };
}