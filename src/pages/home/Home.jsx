import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(products => setProducts(products))

    }, [])



    return (
        <div className="">
            <div>
                <div className="py-6">
                    <h1 className="text-4xl text-center ">Your Product Site</h1>
                </div>
                <div className="px-24 py-12">
                    <div className="min-w-full flex justify-between gap-10">

                        <div className="w-72">
                            <select className="select select-bordered w-full max-w-xs">
                                <option disabled selected>Select Categorization</option>
                                <option>Han Solo</option>
                                <option>Greedo</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <input type="text" placeholder="Search Product" className="input input-bordered w-full " />
                        </div>
                        <div className="w-72">
                            <select className="select select-bordered w-full max-w-xs">
                                <option disabled selected>Select Sorting</option>
                                <option>Han Solo</option>
                                <option>Greedo</option>
                            </select>
                        </div>

                    </div>
                </div>
            </div>

            {/* ---------------------------------------------------------------------------------- */}

            <div className="px-20">

                <div className="grid grid-cols-3 gap-16 justify-items-center">

                    {
                        products.map(product => <ProductCard
                            key={product._id}
                            product={product}>

                        </ProductCard>)
                    }

                </div>

            </div>

        </div>
    );
};

export default Home;