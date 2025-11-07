import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./Navigation";
import Countries from "./Countries";
import BitCoininfo from "./Bitcoininfo";


const router = createBrowserRouter([
  { path : '/' , 
    element : <Navigation/> ,
    children : [
      { path : '/' , element : <Home/> },
      { path : '/Countries' , element : <Countries/> },
      { path : '/Bitcoininfo' , element : <BitCoininfo/> }
    ] }
]);

const queryClient = new QueryClient();

export default function App(){
   return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
      );
}