import MoireLogo from '../../assets/moireLogo.svg';
import { Link } from 'react-router-dom';
export const Header = () => {
  const buttons = [
    { label: 'Plots', href: '/' },
    { label: 'Nodes', href: '/nodes' },
    { label: 'Sensors', href: '/sensors' },
    { label: 'Settings', href: '/settings' },
  ];
  return (
    <div className="flex flex-row justify-between position-sticky top-0 bg-black text-white h-auto align-center shadow-lg">
      <img src={MoireLogo} alt="Moire Logo" className="h-16 mr-5 p-1 invert" />
      <div className="grow" />
      {buttons.map((button) => (
        <Link
          key={button.label}
          to={button.href}
          className="btn btn-primary p-4 self-center h-auto hover:transform hover:scale-105 transition duration-100 ease-in-out hover:bg-black"
        >
          {button.label}
        </Link>
      ))}
      <div className="w-5" />
    </div>
  );
};
