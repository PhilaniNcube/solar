// write a function to format a number as a currency
const formatCurrency = (value: number): string => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'ZAR',
  })
}

export default formatCurrency
