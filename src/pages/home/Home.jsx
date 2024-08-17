import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useLoaderData } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [sortOption, setSortOption] = useState('dateAdded');
    const { count } = useLoaderData();

    useEffect(() => {
        const fetchProducts = async () => {
            const query = new URLSearchParams({
                page: currentPage,
                size: itemsPerPage,
                search: searchTerm,
                category: selectedCategory,
                brand: selectedBrand,
                priceRange: priceRange,
                sort: sortOption
            }).toString();

            const response = await fetch(`https://product-site-server.vercel.app/products?${query}`);
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, [currentPage, itemsPerPage, searchTerm, selectedCategory, selectedBrand, priceRange, sortOption]);

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const handleItemsPerPage = e => {
        setItemsPerPage(parseInt(e.target.value));
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

    return (
        <div className="">
            <div>
                <div className="py-6">
                    <h1 className="text-4xl text-center ">Your Product Site</h1>
                </div>
                <div className="px-24 py-12">
                    <div className="min-w-full flex justify-between gap-10">
                        <div className="w-72">
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                            >
                                <option value="">Select Brand</option>
                                <option value="ElectroMax">ElectroMax</option>
                                <option value="SoundWave">SoundWave</option>
                                <option value="TechGiant">TechGiant</option>
                                <option value="MobilityPlus">MobilityPlus</option>
                                <option value="KitchenCraft">KitchenCraft</option>
                            </select>
                        </div>
                        <div className="w-72">
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Audio">Audio</option>
                                <option value="Computers">Computers</option>
                                <option value="Cameras">Cameras</option>
                                <option value="Mobile Phones">Mobile Phones</option>
                                <option value="Wearables">Wearables</option>
                                <option value="Home Appliances">Home Appliances</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <input
                                type="text"
                                placeholder="Search Product"
                                className="input input-bordered w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="w-72">
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="dateAdded">Sort by Date Added: Newest First</option>
                                <option value="priceAsc">Sort by Price: Low to High</option>
                                <option value="priceDesc">Sort by Price: High to Low</option>
                            </select>
                        </div>
                        <div className="w-72">
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                            >
                                <option value="">Select Price Range</option>
                                <option value="0-50">$0 - $50</option>
                                <option value="51-100">$51 - $100</option>
                                <option value="101-200">$101 - $200</option>
                                <option value="201-500">$201 - $500</option>
                                <option value="500+">$500+</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-20 py-24">
                <div className="grid grid-cols-3 gap-16 justify-items-center">
                    {products.map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            </div>

            <div className="space-x-3">
                <button onClick={handlePrevPage}>Prev</button>
                {pages.map(page => (
                    <button
                        onClick={() => setCurrentPage(page)}
                        key={page}
                        className={`px-4 py-2 bg-slate-300 rounded-md ${currentPage === page && 'bg-green-300'}`}
                    >
                        {page + 1}
                    </button>
                ))}
                <button onClick={handleNextPage}>Next</button>
                <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPage}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
};

export default Home;
