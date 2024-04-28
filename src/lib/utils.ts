import { Language } from '@/LocalizationProvider';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const decodeCombined = (combined: string, language: Language) => {
  // a combined string looks like [en]Hello[es]Hola. This function will return the correct string based on the language.
  //If the language is not found, it will return the first string (or all of it if the language is not found)
  const split = combined.split('[');
  const map = new Map<string, string>();
  for (const s of split) {
    const lang = s.slice(0, 2);
    const text = s.slice(3);
    map.set(lang, text);
  }
  return map.get(language) || combined;
};
