const ProductsPage = (props) => {
  return (
    <>
      {" "}
      Products Page
      <div>
        {props.searchedProducts.map((searchedProduct) => {
          return (
            <div key={searchedProduct.id}>
              <h3>{searchedProduct.title}</h3>
              <h5>{searchedProduct.description}</h5>
              <button onClick={() => console.log(searchedProduct.id)}>
                Add to Cart
              </button>
              <button>Buy Now</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductsPage;
