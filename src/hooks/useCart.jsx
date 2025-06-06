import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateToCart, getCart, removeFromCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useCart() {
    const { uid } = useAuthContext();
    const queryClient = useQueryClient();

    const cartQuery  = useQuery({
            queryKey: ['carts', uid || ''], // 쿼리 키
            queryFn: () => getCart(uid), // 쿼리 함수
            enabled: !!uid,
    });
    
    const addOrUpdateItem = useMutation({
            mutationFn: (product) => addOrUpdateToCart(uid, product),
            onSuccess: () => {
                queryClient.invalidateQueries(['carts', uid]);
            }
    });

    const removeItem = useMutation({
        mutationFn: (id) => removeFromCart(uid, id),
        onSuccess: () => {
            queryClient.invalidateQueries(['carts', uid]);
        }
    });

    return { cartQuery, addOrUpdateItem, removeItem}
}
