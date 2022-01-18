import { useEffect, useState } from 'react'
import fakeApi from '../fake-api';

const useArea = (id) => {
    const [area, setArea] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                setLoading(true);
                const data = await fakeApi.get(`/areas/${id}`);
                setArea(data)
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        fetchAreas();
    }, [id]);

    return [area, loading];
}

export default useArea;
