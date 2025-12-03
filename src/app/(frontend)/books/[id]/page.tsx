import { getBook } from '@/ACTIONS/GET/getBook'
import BookDetail from '@/components/books/BookDetail'

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const book = await getBook(id)

  if (!book) {
    return (
      <div className="py-25 px-10 z-20 flex flex-col w-full items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Boken ble ikke funnet</h1>
      </div>
    )
  }

  return (
    <div className="py-25 px-10 z-20 flex flex-col w-full">
      <BookDetail book={book} />
    </div>
  )
}
export default page
