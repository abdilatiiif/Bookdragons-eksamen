import Book from './Book'
import SideBarBtn from './SideBarBtn'
import { SidebarTrigger } from '../ui/sidebar'

import { getBooks } from '@/ACTIONS/GET/GetBooks'

async function BooksSection() {
  console.log('BooksSection - server-side')

  const books = await getBooks()

  console.log(`Fetched ${books.length} books`)
  console.log(books[0])

  return (
    <div className="py-25 px-10 z-20 flex flex-col w-full">
      <SideBarBtn />
      <SidebarTrigger className="fixed left-6 z-10" />
      <div className=" w-full flex flex-wrap gap-6 justify-center items-center">
        {books.map((book) => (
          <Book book={book} key={book.id} />
        ))}
      </div>
    </div>
  )
}
export default BooksSection
