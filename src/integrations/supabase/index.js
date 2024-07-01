import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### products

| name       | type    | format | required |
|------------|---------|--------|----------|
| id         | integer | number | true     |
| name       | text    | string | true     |
| description| text    | string | false    |
| price      | numeric | number | true     |
| image_url  | text    | string | false    |

### shopping_cart

| name       | type    | format | required |
|------------|---------|--------|----------|
| id         | integer | number | true     |
| user_id    | uuid    | string | true     |
| product_id | integer | number | true     |
| quantity   | integer | number | true     |

*/

// Hooks for products table
export const useProducts = () => useQuery({
    queryKey: ['products'],
    queryFn: () => fromSupabase(supabase.from('products').select('*')),
});

export const useProduct = (id) => useQuery({
    queryKey: ['products', id],
    queryFn: () => fromSupabase(supabase.from('products').select('*').eq('id', id).single()),
});

export const useAddProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProduct) => fromSupabase(supabase.from('products').insert([newProduct])),
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedProduct) => fromSupabase(supabase.from('products').update(updatedProduct).eq('id', updatedProduct.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('products').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        },
    });
};

// Hooks for shopping_cart table
export const useShoppingCart = () => useQuery({
    queryKey: ['shopping_cart'],
    queryFn: () => fromSupabase(supabase.from('shopping_cart').select('*')),
});

export const useShoppingCartItem = (id) => useQuery({
    queryKey: ['shopping_cart', id],
    queryFn: () => fromSupabase(supabase.from('shopping_cart').select('*').eq('id', id).single()),
});

export const useAddShoppingCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newItem) => fromSupabase(supabase.from('shopping_cart').insert([newItem])),
        onSuccess: () => {
            queryClient.invalidateQueries('shopping_cart');
        },
    });
};

export const useUpdateShoppingCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedItem) => fromSupabase(supabase.from('shopping_cart').update(updatedItem).eq('id', updatedItem.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('shopping_cart');
        },
    });
};

export const useDeleteShoppingCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('shopping_cart').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('shopping_cart');
        },
    });
};