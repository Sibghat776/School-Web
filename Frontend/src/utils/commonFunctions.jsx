import { toast } from "react-toastify";

export const showToast = (message, type = "success", theme = "light") => {
    toast[type](message, {
        position: 'top-right',
        autoClose: 980,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme,
    });
};