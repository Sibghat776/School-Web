import react, { useEffect, useState } from "react"
import axios from "axios"



const useFetch = (url) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                let res = await axios.get(url)
                setData(res)
            } catch (error) {
                console.log(error)
                setError(true)
            }
            setLoading(false)
        }

    }, [url])

    fetchData()
    const reFetch = async () => {
        setLoading(true)
        try {
            const res = await axios.get(url)
            setData(res)
        } catch (error) {
            console.log(error)
            setError(true)
        }
        setLoading(false)
    }

    return { data, loading, error, reFetch }
}

export default useFetch