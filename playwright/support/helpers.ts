export function generateOrderCode() {
    const prefix = 'VLO-';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234223';
    let randomPart = '';
  
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      randomPart += letters[randomIndex];
    }
  
    return prefix + randomPart;
  }