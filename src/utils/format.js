export const formatMoney = (amount, currency = "NGN") => 
new Intl.NumberFormat("en-NG", {style: "currency", currency}).format(amount) ;