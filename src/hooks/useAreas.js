import { useEffect, useState } from 'react'
import fakeApi from '../fake-api';

const useAreas = () => {
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                setLoading(true);
                const data = await fakeApi.get('/areas');
                setAreas(data)
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        fetchAreas();
    }, []);

    return [areas, loading];
}

export default useAreas;
