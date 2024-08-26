export default function Pagination({ lastIndex, total, currentPage, lastPage, onPageChange }) {
  return(
    <div className='flex align-center justify-between pt-6 pb-4'>
      <span>
        Showing <b>{lastIndex}</b> of <b>{total}</b> Entries
      </span>

      <nav className='flex'>
        <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => onPageChange(currentPage - 1)}>
          Previous
        </button>

        <button className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => onPageChange(currentPage + 1)}>
          Next
        </button>
      </nav>
    </div>
  );
}