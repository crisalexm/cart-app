import { useEffect, useReducer, useState } from "react";
import { getProduct } from "./services/productServices"
import { CatalogView } from "./components/CatalogView";
import { CartView } from "./components/CartView";
import { itemsReducer } from "./Reducer/itemsReducer";

//initialCartItems va a ser "JSON.parse(sessionStorage.getItem('cart'))" si contiene algo el carrito de compras, o arreglo vacío 
const initialCartItems =JSON.parse(sessionStorage.getItem('cart')) || []

export const CartApp = () => {
    
    
    const [ cartItems, dispatch] = useReducer(itemsReducer, initialCartItems);
    const handlerAddProductCart = (product) => {

        const hasItem = cartItems.find((i) => i.product.id === product.id);
        if(hasItem){
            
            dispatch(
                {
                    type: 'UpdateQuantityProductCart',
                    payload: product
                }
            );
        } else {
            dispatch({
                type: 'AddProductCart',
                payload: product,
            });
        }
    }

    const handlerDeleteProductCart = (id) => {
        dispatch(
            {
                type:'DeleteProductCart',
                payload:id
            }
        );
    }

    return (
        <>

            <div className="container">
                <h3>Cart App</h3>
                <CatalogView handler ={ product => handlerAddProductCart(product) }/>
                {cartItems?.length <= 0 || (
                    <div className="my-4 w-50">
                    <CartView items={cartItems} handlerDelete ={id => handlerDeleteProductCart (id)}/>

                </div>
                )}
                
            </div>

        </>
    )
}