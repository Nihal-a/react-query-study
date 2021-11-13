import React from 'react'
import { QueryClientProvider, QueryClient } from "react-query"
import { ChakraProvider , Heading} from "@chakra-ui/react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Home from  "./components/Home/Home"
import {ReactQueryDevtools} from "react-query/devtools"

function App() {
    const queryClient = new QueryClient()
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Switch>
                        <Route exact path="/:id">
                            <Home/>
                        </Route>
                    </Switch>
                </Router>
                <ReactQueryDevtools/>
            </QueryClientProvider>
        </ChakraProvider>
    )
}

export default App
