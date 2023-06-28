import { Navigate, Route, Routes } from "react-router-dom"
import { CartView } from "../components/CartView"
import { CatalogView } from "../components/CatalogView"

export const CartRoutes = ({handlerAddProductCart, cartItems, handlerDeleteProductCart}) => {
    return (
        <Routes>
            <Route path="catalog"
                element={<CatalogView handler={product => handlerAddProductCart(product)} />}
            />
            <Route path="cart" element={(
                cartItems?.length <= 0 ? <div className="alert alert-warning">No hay productos en carrito de compras</div>
                    : (
                        <div className="my-4 w-50">
                            <CartView items={cartItems} handlerDelete={id => handlerDeleteProductCart(id)} />
                        </div>
                    )
            )} />
            <Route path="/" element={<Navigate to={'/catalog'} />} />

        </Routes>
    )
}