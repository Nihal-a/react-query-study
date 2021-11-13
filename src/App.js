import React from 'react'
import { QueryClientProvider, QueryClient } from "react-query"
import { ChakraProvider , Heading} from "@chakra-ui/react"

function App() {
    const queryClient = new QueryClient()
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <Heading>hello </Heading>
            </QueryClientProvider>
        </ChakraProvider>
    )
}

export default App
