'use client'
import { LoginForm } from "@/components/loginForm";
import { ProductsList } from "@/components/productsList";
import { auth } from "@/firebase/client";
import { routes } from "@/routes";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function ProductsPage() {
  const [loading, setLoading] = useState(true);

  const productsToShow = useSelector(state=>state.products.value)

  useEffect(() => {
    // Agregar un observador para verificar el estado de autenticación del usuario
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Si el usuario no está autenticado, redirigirlo a la página de inicio
        window.location.href = routes.HOME;
      } else {
        setLoading(false);
      }
    });
    // Asegúrate de detener el observador cuando se desmonte el componente
    return () => {
      unsubscribe();
    };
  }, []);
  return (
      <main className="Home flex min-h-screen flex-col items-center justify-between p-24 text-white">
        <>{!loading && <pre>{JSON.stringify(productsToShow,null,2)}</pre>}</>
      </main>
  );
}