import { Outlet } from "react-router-dom";
import { Header, Footer } from "./";
import { useSelector } from "react-redux";


const Layout = () => {
    const store = useSelector(state => state.store)
    const { cart } = store 
    return (
        <div className={`w-full  items-center ${cart ? '' : 'flex flex-col'}`}>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Layout