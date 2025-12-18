import React from 'react';
import {ProductList} from './productList.tsx';
const ProductsPage=()=>
{
    return(
        <>

        <div>
            <header style={{background: "linear-gradient(90deg, #1e3a8a, #2563eb)"}}>
                <h1 style={{color: "#ffffff", padding: "16px", textAlign: "center", margin: "0"}}>Products Page</h1>
            </header>
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