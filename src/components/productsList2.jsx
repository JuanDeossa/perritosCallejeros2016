"use client";
import { getAllProducts } from "@/firebase/services";
import React, { useEffect } from "react";
import { ProductCard } from "./productCard";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productsSlice";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { ProductCar2, ProductCard2 } from "./productCard2";
import { PruebaCard } from "./pruebaCard";
import { openModal } from "@/redux/modalStatesSlice";

export const ProductsList2 = () => {
  const dispatch = useDispatch();
  const productsFromStore = useSelector((state) => state.products.value);
  const [productsFSS, setProductsFSS] = useSessionStorage(
    "products",
    []
  );
  // const orden = useSelector((state) => state.orderProductsList.value);

  const updateAllProducts = async () => {
    const productsFromAPI=await getAllProducts()
    dispatch(setProducts(productsFromAPI));
    setProductsFSS(productsFromAPI);
  };
  useEffect(() => {
    const productsAlreadyExists = productsFSS.length;
    if (productsAlreadyExists) {
      dispatch(setProducts(productsFSS));
    } else {
      updateAllProducts();
    }
  }, []);
  useEffect(() => {
    console.log("Cambio la tienda");
  }, [productsFromStore]);
  return (
    <div className="flex flex-wrap gap-5 h-fit">
      {productsFromStore?.map((product) => (
        <PruebaCard key={product?.id} product={product}>
          <ProductCardUpdateButtons product={product}/>
        </PruebaCard>
      ))}
    </div>
  );
};

const ProductCardUpdateButtons = ({product}) => {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    dispatch(
      openModal({
        modalKey: "openModal1",
        productID: id,
        name: product.name,
      })
    );
  };
  const handleEdit = async (productObj) => {
    // console.log("productObj: ",productObj);
    dispatch(
      openModal({
        modalKey: "openModal2",
        productID: productObj.id,
        name: productObj.name,
        price: productObj.price,
        description: productObj.description,
        category: productObj.category_id,
      })
    );
  };

  return (
    <div className="w-full flex justify-between">
      {/* <button></button> */}
      {/* <button></button> */}
      <span
        onClick={() => handleEdit(product)}
        className="w-8 h-8 bg-t1-gray-100 text-xl grid place-content-center hover:opacity-75 cursor-pointer rounded-md"
      >
        <span>✏️</span>
      </span>
      <span
        onClick={() => handleDelete(product.id)}
        className="w-8 h-8  bg-t1-gray-100 text-xl grid place-content-center hover:opacity-75 cursor-pointer rounded-md"
      >
        <span>❌</span>
      </span>
    </div>
  );
};