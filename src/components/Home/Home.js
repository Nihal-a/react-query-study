import { Container, Flex, Grid, Heading, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useToast } from '@chakra-ui/toast'
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

    const {data , isLoading }  = useQuery("Posts" , fetchPost,{
        onError : (error) => {
            toast({status:"error" , title: error.message})
        }
    })
    const toast = useToast()


    return (
        <Container maxW="1300px" mt="4">
            {isLoading ? <Grid placeItems="center" height="100vh"><Spinner /></Grid> : <>{data.data.map((post) => (
                <Stack p="4" boxShadow="md" borderRadius="x1" border="1px solid #ccc" key={post.id} mb="4">
                <Flex justify="space-between">
                    <Text>UserId : {post.user_id}</Text>
                    <Text>PostId : {post.id}</Text>
                </Flex>
                <Heading fontSize="2xl">{post.title}</Heading>
                <Text>{post.body}</Text>
                </Stack>
            ))}</>}
        </Container>
    )
}

export default Home

