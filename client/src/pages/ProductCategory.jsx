import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const decodedCategory = decodeURIComponent(category || "").toLowerCase();

  const filteredProducts = products.filter(
    (product) => product.category?.toLowerCase() === decodedCategory
  );

  return (
    <div className="mt-16">
      <div className="flex flex-col items-end w-max">
        <h1 className="text-3xl md:text-4xl font-medium">
          {decodedCategory.toUpperCase()}
        </h1>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-3xl md:text-4xl font-medium">No products found</h1>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
