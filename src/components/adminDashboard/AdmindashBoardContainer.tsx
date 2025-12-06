import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import AddBook from './AddBook'
import Bestillinger from './Bestillnger'
import BrukerListe from './BrukerListe'

export function AdmindashBoardContainer() {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger className="md:text-2xl">Legg til Bøker</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <AddBook />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="md:text-2xl">Innkommende bestilling</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <Bestillinger />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="md:text-2xl">Brukere</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <BrukerListe />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
