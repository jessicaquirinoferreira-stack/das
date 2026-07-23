export interface ShippingOption {
  id: 'pac' | 'sedex';
  name: string;
  deliveryTime: string;
  price: number;
  originalPrice: number;
  isFree: boolean;
}

export function calculateCorreiosShipping(
  cep: string,
  stateUf: string = 'SP',
  subtotal: number,
  freeThreshold: number = 299
): ShippingOption[] {
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length < 8) return [];

  const uf = (stateUf || 'SP').toUpperCase();
  const qualifiesForFree = subtotal >= freeThreshold;

  // Correios Regional Pricing & Estimated Delivery Rules
  let pacBase = 22.90;
  let pacDays = '4 a 6 dias úteis';
  let sedexBase = 32.90;
  let sedexDays = '1 a 2 dias úteis';

  if (['SP'].includes(uf)) {
    pacBase = 18.90;
    pacDays = '2 a 4 dias úteis';
    sedexBase = 24.90;
    sedexDays = '1 a 2 dias úteis';
  } else if (['RJ', 'MG', 'PR', 'SC', 'RS', 'ES'].includes(uf)) {
    pacBase = 24.90;
    pacDays = '4 a 7 dias úteis';
    sedexBase = 34.90;
    sedexDays = '2 a 3 dias úteis';
  } else if (['DF', 'GO', 'MS', 'MT', 'BA'].includes(uf)) {
    pacBase = 29.90;
    pacDays = '5 a 8 dias úteis';
    sedexBase = 42.90;
    sedexDays = '2 a 4 dias úteis';
  } else {
    // Norte e Nordeste
    pacBase = 36.90;
    pacDays = '7 a 12 dias úteis';
    sedexBase = 58.90;
    sedexDays = '3 a 5 dias úteis';
  }

  const pacOption: ShippingOption = {
    id: 'pac',
    name: 'Correios PAC',
    deliveryTime: pacDays,
    price: qualifiesForFree ? 0 : pacBase,
    originalPrice: pacBase,
    isFree: qualifiesForFree
  };

  const sedexOption: ShippingOption = {
    id: 'sedex',
    name: 'Correios SEDEX Express',
    deliveryTime: sedexDays,
    price: qualifiesForFree ? Math.max(0, sedexBase - pacBase) : sedexBase,
    originalPrice: sedexBase,
    isFree: false
  };

  return [pacOption, sedexOption];
}
