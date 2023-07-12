import MoneyBagSVG from '../assets/money-bag.svg';

export default function Logo() {
  return (
    <a href='/' className='flex'>
        <img src={MoneyBagSVG} alt="Money Bag" className="w-8 h-8" />
        <h1 className="text-2xl font-bold ml-3">Budgetly</h1>
    </a>
  )
}
