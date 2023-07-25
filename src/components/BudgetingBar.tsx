export default function BudgetingBar() {
// TODO: Bikin props untuk ngatur persen/angka, judulnya, max-nya, dan jumlah saat ini
  return (
    <div className='w-11/12 flex items-center justify-between rounded-md bg-primary-100 px-3 m-5 relative z-10'>
        <div className='absolute bg-primary-200 w-[50%] h-full z-20 rounded-md top-0 left-0'></div>
        <div className='text-white z-30'>
            Budgeting
        </div>
        <div className='text-black z-30'>
            50%
        </div>
    </div>
  )
}
