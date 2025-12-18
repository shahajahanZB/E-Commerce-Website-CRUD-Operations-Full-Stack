
const Navigation=()=>
{
    return(
        <>
        <nav className="nav-bar">
            <h2 className="nav-logo">Menu</h2>
            <ul className ="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/products-page">Products Page</a></li>
                <li><a href="/create-product-page">Create Product</a></li>
                <li><a href="/Profile">Profile</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/update-product-page/1">Update Product</a></li>
            </ul>
        </nav>
        
        </>
    )
}
export default Navigation;