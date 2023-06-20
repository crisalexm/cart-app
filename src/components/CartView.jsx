import React, { useEffect, useState } from 'react'
import { calculateTotal } from '../services/productServices';

export const CartView = ({ handlerDelete, items }) => {

    const [total, setTotal] = useState(0);

    useEffect(()=>{
        setTotal(calculateTotal(items));

        //sessionStorage almacena los datos en la sesión del navegador, el sessionStorage viene integrada en los navegadores
        //JSON.stringify convierte los objetos de javascript a string "Cadena"
        //Acá estoy indicando que el objeto "items" se almacene en la sesión, además lo debo pasar al componente inicial, en este caso CartApp.jsx
        // lo llamo con JSON.parse() para convertirlo a un objeto como sessionStorage.getItem('cart'), "Cart" es el identificador que le paso por aquí.
        
        sessionStorage.setItem('cart',JSON.stringify(items))
    }, [ items ])

    const onDeleteProduct = ( id ) => {
        console.log('Eliminando producto...')
        handlerDelete(id);
    }

    return (
        <>

            <h3>Shopping Cart</h3>
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key ={item.product.id}>
                            <td>{item.product.name}</td>
                            <td>{item.product.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.quantity * item.product.price}</td>
                            <td><button className='btn btn-outline-danger' onClick={()=> onDeleteProduct(item.product.id)}>Eliminar</button></td>
                        </tr>)
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3" className="text-end fw-bold">Total</td>
                        <td colSpan="2" className="text-start fw-bold">{total}</td>
                    </tr>
                </tfoot>
            </table>

        </>


    )
}
