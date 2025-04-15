import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts as fetchProducts, addNewProduct } from '../api/firebase';

export default function useProducts(){
    const queryClient = useQueryClient();

    const getProducts = useQuery({
            queryKey: ['products'],
            queryFn: () => fetchProducts(),
    });

    const addProduct = useMutation({
        mutationFn: ({ product, url }) => addNewProduct(product, url),
        onSuccess: async () => queryClient.invalidateQueries(['products'])
    });

    return {getProducts, addProduct};
}