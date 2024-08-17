
const ProductCard = ({ product }) => {

    const { _id, product_name, product_brand_name, image, description, price, category, ratings, date } = product;


    // console.log("product", product);

    return (
        <div>
            <div className="card bg-base-100 h-[500px] w-96 shadow-xl">
                <figure>
                    <img
                        src={image}
                        className="h-72"
                        alt="" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product_name}</h2>
                    <div className="my-2 text-sm font-medium">
                        <p>Brand: {product_brand_name}</p>
                        <p>Category: {category}</p>
                    </div>

                    <p>{description}</p>

                    <div className="card-actions justify-end my-2">
                        <div className="badge badge-outline bg-lime-200">$ {price}</div>
                        <div className="badge badge-outline bg-yellow-100">{ratings}</div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default ProductCard;