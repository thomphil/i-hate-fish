export type Method = {
    name: string;
    count: number;
    level: number;
    efficiency: number;
    basePrice: number;
    costGrowFactor: number;
    costDiscountFactor: number;
    active: boolean;
    fps: number;
}
  
export const initialMethodsState = [
{
    name: 'Fishing Rod',
    count: 0,
    level: 0,
    efficiency: 0.1,
    basePrice: 10,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: true,
    fps: 0,
}, {
    name: 'Net',
    count: 0,
    level: 0,
    efficiency: 10,
    basePrice: 10_000,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: false,
    fps: 0,
}, {
    name: 'Harpoon',
    count: 0,
    level: 0,
    efficiency: 10_000,
    basePrice: 10_000_000,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: false,
    fps: 0,
}, {
    name: 'Fishing Boat',
    count: 0,
    level: 0,
    efficiency: 1_000_000,
    basePrice: 10_000_000_000,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: false,
    fps: 0,
}, {
    name: 'Fishing Fleet',
    count: 0,
    level: 0,
    efficiency: 1_000_000_000,
    basePrice: 10_000_000_000_000,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: false,
    fps: 0,
}, {
    name: 'Fishing Planet',
    count: 0,
    level: 0,
    efficiency: 1_000_000_000_000,
    basePrice: 10_000_000_000_000_000,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: false,
    fps: 0,
}, {
    name: 'Fishing Universe',
    count: 0,
    level: 0,
    efficiency: 1_000_000_000_000_000,
    basePrice: 10_000_000_000_000_000_000,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: false,
    fps: 0,
}, {
    name: 'Fishing Multiverse',
    count: 0,
    level: 0,
    efficiency: 1_000_000_000_000_000_000,
    basePrice: 10_000_000_000_000_000_000_000,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: false,
    fps: 0,
}, {
    name: 'Fishing Omniverse',
    count: 0,
    level: 0,
    efficiency: 1_000_000_000_000_000_000_000,
    basePrice: 10_000_000_000_000_000_000_000_000,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: false,
    fps: 0,
}
]