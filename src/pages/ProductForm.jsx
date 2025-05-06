import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

function ProductForm() {
    const [producto, setProducto] = useState({
        nombre_producto: "",
        stock: 0,
        tipo_producto: "",
        descripcion_producto: "",
        precio: 0,
        img: ""
    });

    const handleChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "products"), producto);
            alert("Producto agregado!");
            setProducto({
                nombre_producto: "",
                stock: 0,
                tipo_producto: "",
                descripcion_producto: "",
                precio: 0
            });
        } catch (e) {
            console.error("Error al agregar documento: ", e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="nombre_producto" placeholder="Nombre del producto" value={producto.nombre_producto} onChange={handleChange} /><br />
            <input name="stock" type="number" placeholder="Stock" value={producto.stock} onChange={handleChange} /><br />
            <input name="tipo_producto" placeholder="Tipo" value={producto.tipo_producto} onChange={handleChange} /><br />
            <input name="img" placeholder="URL de la imagen" value={producto.img} onChange={handleChange} /><br />
            <textarea name="descripcion_producto" placeholder="Descripción" value={producto.descripcion_producto} onChange={handleChange}></textarea><br />
            <input name="precio" type="number" step="0.01" placeholder="Precio" value={producto.precio} onChange={handleChange} /><br />
            <button type="submit">Agregar Producto</button>
        </form>
    );
}

export default ProductForm;
