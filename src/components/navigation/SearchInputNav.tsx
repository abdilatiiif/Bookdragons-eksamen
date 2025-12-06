import { Input } from '@/components/ui/input'

function SearchInputNav() {
  return (
    <Input
      placeholder="Søk etter bok..."
      className=" mx-4 bl-2 p-2 bl-2 rounded-lg bg-green-50 min-w-[140px] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  )
}
export default SearchInputNav
