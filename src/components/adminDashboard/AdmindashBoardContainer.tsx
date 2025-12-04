import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function AdmindashBoardContainer() {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger className="md:text-2xl">Legg til Bøker</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          input felt for boktittel, forfatter, pris, beskrivelse, kategori, bilde-URL
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Innkommende bestilling</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          liste over alle Innkommende bestillinger med detaljer som kundeinfo, bestilte bøker,
          totalbeløp, bestillingsdato, status (behandles, sendt, levert)
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Brukere</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          liste over alle registrerte brukere
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
