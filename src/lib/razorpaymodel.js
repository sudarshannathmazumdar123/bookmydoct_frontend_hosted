'use client'

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

export async function displayRazorpay(options) {

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
        toast.error('Razropay failed to load!!')
        return
    }
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}
