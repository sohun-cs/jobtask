import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useLoaderData } from "react-router-dom";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const { count } = useLoaderData()

    // console.log('myProducts', myProducts);

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(products => setProducts(products))

    }, [currentPage, itemsPerPage]);


    console.log("products", products);
    // const count = products.length;

    const searchedProducts = products.filter(product => product.product_name.toLowerCase().includes(searchQuery.toLowerCase()));

    const numberOfPages = Math.ceil(count / itemsPerPage);

    const pages = [...Array(numberOfPages).keys()];

    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        setItemsPerPage(val);
        setCurrentPage(0);
    };


    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };


    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handleSearchProducts = e => {
        setSearchQuery(e.target.value);
    };





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
                            <input
                                type="text"
                                onChange={handleSearchProducts}
                                value={searchQuery}
                                placeholder="Search Product"
                                className="input input-bordered w-full " />
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

            <div className="px-20 py-24">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 justify-items-center">

                    {
                        searchedProducts.map(product => <ProductCard
                            key={product._id}
                            product={product}>

                        </ProductCard>)
                    }

                </div>

            </div>

            <div className="pb-20">

                <div className="text-center space-x-3">

                    <button onClick={handlePrevPage}>Prev</button>

                    {
                        pages.map(page => <button
                            onClick={() => setCurrentPage(page)}
                            key={page}
                            className={`px-4 py-2  rounded-md 
                            ${currentPage === page ? 'bg-green-300' : 'bg-slate-300'}`}
                        >{page + 1}</button>)

                        

                    }

                    

                    <button onClick={handleNextPage}>Next</button>


                    <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPage}
                        name="" id="">

                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>

                    </select>

                </div>

            </div>


        </div>
    );
};

export default Home;


