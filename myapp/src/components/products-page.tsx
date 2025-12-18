import React from 'react';
import {ProductList} from './productList.tsx';
const ProductsPage=()=>
{
    return(
        <>

        <div>
                <main>
                <ProductList/>

                </main>
                <footer style={{textAlign: "center", padding: "16px", backgroundColor: "#f3f4f6"}}>
                    <p>Footer content comes here</p>
                </footer>
        </div>
        </>
    )
}
export default ProductsPage;