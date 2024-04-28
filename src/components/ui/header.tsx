import {
  Language,
  LanguageContext,
  getLanguageName,
  useLanguage,
} from '@/LocalizationProvider';
import MoireLogo from '../../assets/moireLogo.svg';
import { Link } from 'react-router-dom';
import { Switch } from './switch';
import { Label } from './label';
import { useContext, useEffect, useState } from 'react';
import { decodeCombined } from '@/lib/utils';
export const Header = () => {
  const localizationContext = useContext(LanguageContext);
  const [buttons, setButtons] = useState<{ label: string; href: string }[]>([]);
  useEffect(() => {
    setButtons(getButtons(localizationContext.language));
  }, [localizationContext.language]);

  const getButtons = (language: Language) => [
    {
      label: decodeCombined('[en]Plots[es]Parcelas', language),
      href: '/',
    },
    {
      label: decodeCombined('[en]Nodes[es]Nodos', language),
      href: '/nodes',
    },
    {
      label: decodeCombined('[en]Sensors[es]Sensores', language),
      href: '/sensors',
    },
    {
      label: decodeCombined('[en]Settings[es]Ajustes', language),
      href: '/settings',
    },
  ];

  return (
    <div className="flex flex-row justify-between position-sticky top-0 bg-black text-white h-auto align-center shadow-lg">
      <img src={MoireLogo} alt="Moire Logo" className="h-16 mr-5 p-1 invert" />
      <div className="grow" />
      {buttons.map((button, index) => (
        <Link
          key={button.label + index}
          to={button.href}
          className="btn btn-primary p-4 self-center h-auto hover:transform hover:scale-105 transition duration-100 ease-in-out hover:bg-black"
        >
          {button.label}
        </Link>
      ))}
      <div className="flex items-center space-x-2 pl-10 pr-3">
        <Switch
          id="enes"
          checked={localizationContext.language === 'es'}
          onClick={() =>
            localizationContext.setLanguage(
              localizationContext.language === 'es' ? 'en' : 'es',
            )
          }
        />
        <Label htmlFor="enes">{getLanguageName(localizationContext)}</Label>
      </div>
      <div className="w-5" />
    </div>
  );
};
