import { Link } from 'react-router-dom';
import MoneyBagSVG from '../assets/money-bag.svg';

export default function Logo() {
  return (
    <Link to='/' className='flex'>
        <img src={MoneyBagSVG} alt="Money Bag" className="w-8 h-8" />
        <h1 className="text-2xl font-bold ml-3">Budgetly</h1>
    </Link>
  )
}
