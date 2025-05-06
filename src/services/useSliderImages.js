import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig'; // tu config de firebase

const useSliderImages = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const querySnapshot = await getDocs(collection(db, 'sliders'));
            const imageData = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(img => img.active) // solo activos si quieres
                .sort((a, b) => a.order - b.order); // ordenar por orden
            setImages(imageData);
        };

        fetchImages();
    }, []);

    return images;
};
export default useSliderImages;
