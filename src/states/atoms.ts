import { House } from '@/types/house';
import { atom } from 'jotai';

export const houseListAtom = atom<House[]>([]);
