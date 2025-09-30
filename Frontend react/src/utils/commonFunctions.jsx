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

/**
 * @param {string} number - e.g. "03152779033"
 * @param {boolean} isWhatsapp - true if number is on WhatsApp
 * @returns {string|null} - WhatsApp URL or null
 */
export function getWhatsappLink(number, isWhatsapp = true) {
    if (!isWhatsapp) return null;
    // Remove spaces, dashes, +, etc.
    const cleaned = number.replace(/[^\d]/g, "");
    // Remove leading zero
    const final = cleaned.startsWith("0") ? cleaned.slice(1) : cleaned;
    return `https://wa.me/92${final}`;
}
