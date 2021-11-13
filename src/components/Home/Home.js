import { Button } from "@chakra-ui/button";
import { Container, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useParams , useHistory} from "react-router-dom"

const fetchPost = async (id) => {
  try {
    const { data } = await axios.get(`https://gorest.co.in/public/v1/posts?page=${id}`);

    return data;
  } catch (error) {
    throw Error("Enable to fetch Posts.");
  }
};

function Home() {

    const {id} = useParams()
    const history = useHistory()

    const pageId = parseInt(id)

  const { data, isLoading } = useQuery(["Posts",pageId],()=> fetchPost(pageId), {
      keepPreviousData:true,
    onError: (error) => {
      toast({ status: "error", title: error.message });
    },
  });
  const toast = useToast();

  return (
    <Container maxW="1300px" mt="4">
      {isLoading ? (
        <Grid placeItems="center" height="100vh">
          <Spinner />
        </Grid>
      ) : (
        <>
        <Flex justify="space-between" mb="4">
            <Button 
            colorScheme="red" 
            onClick={() => {
                if(data.meta.pagination.links.previous !== null ){
                    history.push(`/${pageId - 1}`)
                }
            }}
            disabled={data.meta.pagination.links.previous == null }
            >Prev</Button>
            <Text>Current page : {pageId}</Text>
            <Button colorScheme="green" onClick={() => {
                history.push(`/${pageId + 1}`)
            }}>Next</Button>
        </Flex>
          {data.data.map((post) => (
            <Stack
              p="4"
              boxShadow="md"
              borderRadius="x1"
              border="1px solid #ccc"
              key={post.id}
              mb="4"
            >
              <Flex justify="space-between">
                <Text>UserId : {post.user_id}</Text>
                <Text>PostId : {post.id}</Text>
              </Flex>
              <Heading fontSize="2xl">{post.title}</Heading>
              <Text>{post.body}</Text>
            </Stack>
          ))}
        </>
      )}
    </Container>
  );
}

export default Home;
