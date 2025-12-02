import Book from './Book'
import SideBarBtn from './SideBarBtn'
import { SidebarTrigger } from '../ui/sidebar'

function BooksSection() {
  return (
    <div className="py-25 px-10 flex flex-col w-full">
      <SideBarBtn />
      <SidebarTrigger className="absolute left-6" />
      <div className=" w-full flex flex-wrap gap-6 justify-center items-center">
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
      </div>
    </div>
  )
}
export default BooksSection
