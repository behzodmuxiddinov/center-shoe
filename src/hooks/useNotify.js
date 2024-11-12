import { useSelector } from "react-redux"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

const useNotify = _ => {
    const store = useSelector(state => state.store)
    const { light } = store 
    const { t } = useTranslation()

    const notify = (text, type) => {
        toast(t(text), {
            position: "top-right",
            type: type,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: `${light ? "light" : "dark"}`,
        })
    } 
    return { notify }
}

export default useNotify