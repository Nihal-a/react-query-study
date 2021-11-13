import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const fetchPost = async () => {
    try {
        const {data} = await axios.get('https://gorest.co.in/public/v1/posts')

        return data
    } catch (error) {

        throw Error("Enable to fetch Posts.")
    }
}

function Home() {

    const {data , isLoading , error , isError}  = useQuery("Posts" , fetchPost)

    console.log(data);

    return (
        <div>
            
        </div>
    )
}

export default Home
