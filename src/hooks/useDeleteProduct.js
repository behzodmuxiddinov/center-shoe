import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useNotify } from "./"
import { BASE_URL } from "../api/Base_URL"
import { useTranslation } from "react-i18next"
import axios from 'axios'
import Swal from 'sweetalert2'

const useDeleteProduct = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    let { notify } = useNotify()
    const [isPending, setIsPending] = useState(false)
    const refreshToken = localStorage?.getItem('refreshToken')
    const deleteProduct = async (id) => {
        Swal.fire({
            title: t("sure"),
            text: t("revert"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: t("confirmdelete"),
            cancelButtonText: t("cancel")
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsPending(true)
                await axios.delete(`${BASE_URL}/products/delete/${id}`, {
                    headers : {
                        Authorization : `Bearer ${refreshToken}`
                    }
                })
                .then(res => {
                    setIsPending(false)
                    navigate('/')
                    notify(t("deleted"), "success")
                })
                .catch(err => {
                    setIsPending(false)
                    notify(err.message, "error")
                })
            }
        });
        
    }
    return { isPending, deleteProduct }
}

export default useDeleteProduct