import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useLoaderData } from "react-router-dom";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, Infinity]);
    const [sortCriteria, setSortCriteria] = useState(''); // Added sort criteria state

    const { count } = useLoaderData();

    useEffect(() => {
        fetch(`https://product-site-server.vercel.app/products?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(products => setProducts(products));
    }, [currentPage, itemsPerPage]);

    // Filter products based on search, brand, category, and price range
    const filteredProducts = products.filter(product => {
        const matchesSearchQuery = product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesBrand = selectedBrand ? product.product_brand_name === selectedBrand : true;
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];

        return matchesSearchQuery && matchesBrand && matchesCategory && matchesPriceRange;
    });

    // Sort products based on sort criteria
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortCriteria === 'priceLowToHigh') {
            return a.price - b.price;
        } else if (sortCriteria === 'priceHighToLow') {
            return b.price - a.price;
        } else if (sortCriteria === 'dateNewestFirst') {
            return new Date(b.date) - new Date(a.date);
        }
        return 0; // Default no sorting
    });

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
    };

    const handleSearchProducts = e => {
        setSearchQuery(e.target.value);
    };

    const handleBrandChange = e => {
        setSelectedBrand(e.target.value);
    };

    const handleCategoryChange = e => {
        setSelectedCategory(e.target.value);
    };

    const handlePriceRangeChange = e => {
        const [min, max] = e.target.value.split('-').map(Number);
        setPriceRange([min, max]);
    };

    const handleSortChange = e => {
        setSortCriteria(e.target.value);
    };

    return (
        <div className="">
            <div>
                <div className="py-16">
                    <h1 className="text-2xl lg:text-4xl text-center font-bold text-indigo-700">Welcome to ElectroHub!</h1>
                </div>
                <div className="lg:px-24 lg:py-12">
                    <div className="min-w-full mx-auto flex flex-col lg:flex-row lg:justify-between gap-10">
                        <div className="w-72 mx-auto">
                            <select
                                className="select select-bordered w-full max-w-xs"
                                onChange={handleBrandChange}
                                value={selectedBrand}
                            >
                                <option value="">Select Brand</option>
                                <option value="Dell">Dell</option>
                                <option value="Bose">Bose</option>
                                <option value="JBL">JBL</option>
                                <option value="Sony">Sony</option>
                                <option value="iRobot">iRobot</option>
                                <option value="Samsung">Samsung</option>
                                <option value="Canon">Canon</option>
                                <option value="Apple">Apple</option>
                                <option value="LG">LG</option>
                            </select>
                        </div>
                        <div className="w-72 mx-auto">
                            <select
                                className="select select-bordered w-full max-w-xs"
                                onChange={handleCategoryChange}
                                value={selectedCategory}
                            >
                                <option value="">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Home Appliances">Home Appliances</option>
                                <option value="Computers">Computers</option>
                                <option value="Kitchen Appliances">Kitchen Appliances</option>
                            </select>
                        </div>
                        <div className="w-72 mx-auto">
                            <select
                                className="select select-bordered w-72 max-w-xs"
                                onChange={handlePriceRangeChange}
                                value={priceRange.join('-')}
                            >
                                <option value="0-Infinity">All Prices</option>
                                <option value="0-50">Up to $50</option>
                                <option value="51-100">$51 to $100</option>
                                <option value="101-200">$101 to $200</option>
                                <option value="201-500">$201 to $500</option>
                                <option value="501-1000">$501 to $1000</option>
                                <option value="1001-2000">$1001 to $2000</option>
                                <option value="2001-5000">$2001 to $5000</option>
                            </select>
                        </div>
                        <div className="w-72 mx-auto">
                            <select
                                className="select select-bordered w-full max-w-xs"
                                onChange={handleSortChange}
                                value={sortCriteria}
                            >
                                <option value="">Sort By</option>
                                <option value="priceLowToHigh">Price: Low to High</option>
                                <option value="priceHighToLow">Price: High to Low</option>
                                <option value="dateNewestFirst">Date Added: Newest First</option>
                            </select>
                        </div>
                        <div className=" lg:w-full px-10">
                            <input
                                type="text"
                                onChange={handleSearchProducts}
                                value={searchQuery}
                                placeholder="Search Product"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------------------------------------------------------------------------------- */}

            <div className="px-20 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 justify-items-center">
                    {sortedProducts.map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            </div>

            <div className="pb-20">
                <div className="text-center space-x-2 space-y-3 lg:space-y-0 lg:space-x-3">
                    <button onClick={handlePrevPage} className="text-sm lg:text-base text-indigo-700">Prev</button>
                    {pages.map(page => (
                        <button
                            onClick={() => setCurrentPage(page)}
                            key={page}
                            className={`px-3 py-1 lg:px-4 lg:py-2 text-sm lg:text-base rounded-md 
                            ${currentPage === page ? 'bg-indigo-300' : 'bg-slate-300'}`}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button onClick={handleNextPage} className="text-sm lg:text-base text-indigo-700">Next</button>
                    <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPage}
                        className="text-sm lg:text-base text-indigo-700"
                    >
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
