import { useQuery } from '@tanstack/react-query';

const useProduct = () => {
    const { data: products = [], error, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('http://localhost:3000/products');
            return res.json();
        },
    });
    return { products, error, isLoading, refetch };
};

export default useProduct;