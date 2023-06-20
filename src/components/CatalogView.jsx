import { useEffect, useState } from "react";
import { getProduct } from "../services/productServices";
import { ProductCardView } from "./ProductCardView";

export const CatalogView = ({handler}) => {
    
    const [products, setProducts] = useState([]);

    useEffect(
        () => {
            setProducts(getProduct());

        }, []//Se ejecuta siempre cuando cree componentes, pero sólo la primera vez
    );

    return (
        <>
            <div className="row">
                {products.map(prod => (

                    <div className="col-4 my-2" 
                        key={prod.id}>
                        <ProductCardView
                            handler ={ handler }
                            id={prod.id}
                            name = {prod.name} 
                            description={prod.description} 
                            price = {prod.price} 
                        />
                    </div>
                ))}
            </div>
        </>
    );
}