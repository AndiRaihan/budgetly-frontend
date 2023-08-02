import { Link } from 'react-router-dom';
import MoneyBagSVG from '../assets/money-bag.svg';

import {useSelector } from "react-redux";
import { RootState } from "../redux/store";


export default function Logo() {
  const { darkMode } = useSelector((state: RootState) => state);


  return (
    <Link to='/' className='flex'>
        <img src={MoneyBagSVG} alt="Money Bag" className="w-8 h-8" />
        <h1 className={`text-2xl font-bold ml-3 ${darkMode.isDarkMode ? "text-background-dark-200" : ""}`}>Budgetly</h1>
    </Link>
  )
}
