import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteHookOptions = {
  mutationFn?: (id: string) => Promise<void>;
  //Query keys to invalidate after deletion
  invalidateKeys?: (string | unknown)[];
  //Callbacks
  onSuccess?: () => void;
  onError?: () => void;
  onSettled?: () => void;
};

export function useDelete<T extends {id: string, name?: string }>({
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
      }
      if (onSuccess) onSuccess();
    },

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: invalidateKeys });
      console.log(id);
      const allCategoryData = queryClient.getQueriesData({
        queryKey: invalidateKeys,
      });
        console.log("hook data before deletion: ", allCategoryData);
      // Snapshot previous pages for rollback
      // const previousData: Record<string, any> = {};
      // invalidateKeys.forEach((key) => {
      //   previousData[String(key)] = queryClient.getQueryData([key]);
      //   // console.log(previousData);
      // });

      const previousData = queryClient.getQueriesData({
        queryKey: invalidateKeys,
      });

      // Optimistically remove item from cache
      // invalidateKeys.forEach((key) => {
      //   queryClient.setQueryData([key], (oldData: any) => {
      //     if (!oldData?.data) return oldData;
      //     return {
      //       ...oldData,
      //       data: oldData.data.filter((item: T) => item.id !== id),
      //     };
      //   });
      // });

      queryClient.setQueriesData({queryKey: invalidateKeys}, (oldData: any) => {
        console.log("entered setQueriesData");
        console.log("Old Data: ", oldData);
        console.log("data:", oldData?.results);
        if (!oldData?.results) return oldData;
        console.log("Main area entered");
        return {
          ...oldData,
          results: oldData.results.filter((item: T) => item.id !== id),
        }; 
        // return oldData?.results.filter((item: T) => item.id !== id);
      });
      const allCategoryData2 = queryClient.getQueriesData({
        queryKey: invalidateKeys,
      });
      console.log("hook data after deletion: ", allCategoryData2);

      return { previousData }; // context for rollback
    },



    onError: (err, id, context: any) => {
      // Rollback if mutation fails
      if (context?.previousData) {
        Object.entries(context.previousData).forEach(([key, data]) => {
          queryClient.setQueryData([key], data);
        });
      }
      if (onError) onError();
    },

    onSettled: () => {
      if (onSettled) onSettled();
      mutation.reset();
      setItemToDelete(null);
      setShowDeleteDialog(false);
    }
  });

  const handleDeleteClick = (item: T) => {
    setItemToDelete(item);
    console.log("Item to delete:", item);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    mutation.mutate(itemToDelete.id);
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