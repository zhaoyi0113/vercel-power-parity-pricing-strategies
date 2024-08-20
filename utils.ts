export function getDiscountedPrice(price: number, discount = 0): string {
  return Number(price * ((100 - discount) / 100)).toLocaleString('en-US', {
    currency: 'USD',
  })
}
