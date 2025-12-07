# 📚 Bookdragons - Online Bokhandel

En fullstack nettbutikk for brukte bøker bygget med **Next.js 15**, **Payload CMS 3**, **TypeScript** og **Tailwind CSS**.

## 🚀 Kom i gang

### Forutsetninger

- **Node.js**: `^18.20.2` eller `>=20.9.0`
- **pnpm**: `^9` eller `^10`
- **PostgreSQL**: Database (lokal eller ekstern)

### Installasjon

1. **Klon prosjektet** -https://github.com/abdilatiiif/Bookdragons-eksamen

# 1. Installer avhengigheter

pnpm install

# 2. Opprett .env fil (kopier fra .env.example)

# Fyll inn DATABASE_URI, PAYLOAD_SECRET, og NEXT_PUBLIC_SERVER_URL

Opprett `.env` fil i root:

# 3. Kjør database migrasjoner

pnpm payload migrate

# 4. Seed database med bøker (viktig!)

npx tsx script/seed-bookdragons.tsx

# 5. Start utviklingsserver

pnpm dev

## 6 Åpne appen\*\*

- Frontend: `http://localhost:3000`
- Admin Panel: `http://localhost:3000/admin`

### admin-bruker

brukernavn: latif_1995@test.no
passord: 123456

## 📦 Teknologier og Pakker

### **Core Framework**

- **Next.js 15.4.7** - React framework med App Router
- **React 19.1.0** - UI bibliotek
- **TypeScript 5.7.3** - Type-sikkerhet

### **CMS & Database**

- **Payload CMS 3.65.0** - Headless CMS
- **@payloadcms/db-sqlite** - SQLite database adapter
- **@payloadcms/richtext-lexical** - Rich text editor
- **PostgreSQL** - Produksjonsdatabase (via DATABASE_URI)

### **Styling**

- **Tailwind CSS 4.1.17** - Utility-first CSS
- **Radix UI** - Headless UI komponenter
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-navigation-menu`
  - `@radix-ui/react-accordion`
  - `@radix-ui/react-tooltip`
- **lucide-react** - Ikoner
- **animate.css** - Animasjoner
- **next-themes** - Dark/Light mode

### **Utilities**

- **clsx** + **tailwind-merge** - Conditional styling
- **class-variance-authority** - Variant styles
- **csv-parser** - CSV import for books
- **sharp** - Image optimization

### **Testing**

- **Vitest 3.2.3** - Unit/Integration tests
- **Playwright 1.56.1** - End-to-end tests
- **@testing-library/react** - Component testing

### **Development Tools**

- **ESLint** - Linting
- **Prettier** - Code formatting
- **cross-env** - Cross-platform env variables

## 🗂️ Prosjektstruktur

## 🔧 Scripts

```bash
# Utvikling
pnpm dev                # Start dev server
pnpm devsafe            # Reset .next og start dev

# Bygging
pnpm build              # Build for produksjon
pnpm start              # Kjør produksjonsserver


## 🗄️ Collections

### **Users**

- Roller: `admin`, `customer`
- Autentisering med JWT
- HTTP-only cookies for sikkerhet

### **Books**

- Tittel, forfatter, ISBN, pris, lager
- Sjangre: fiction, crime, fantasy, scifi, romance, thriller, biography, history, children, youth, skrekk, mythology
- Innbinding: pocket, hardcover, audiobook, ebook
- Språk: norwegian, english, other
- Signert/usignert
- Tilstand: like-new, very-good, good, acceptable

### **Media**

- Opplasting av bilder
- har ikke blitt brukt

## 🎨 Features

### **Frontend**

- ✅ Bokoversikt med søk og filtrering
- ✅ Detaljert bokvisning
- ✅ Handlekurv (localStorage)
- ✅ Brukerautentisering
- ✅ Responsive design (mobile-first)

### **Admin Dashboard**

- ✅ Legg til/rediger/slett bøker
- ✅ Brukerhåndtering
- ✅ Ordreadministrasjon
- ✅ CSV import av bøker

### **API**

- ✅ RESTful endpoints via Payload
- ✅ Server Actions for data mutations
- ✅ Type-safe med TypeScript
- ✅ Sentraliserte API utilities (`src/lib/api.ts`)

## 🚢 Deploy

// logg:

#1.des
start av payload prosjekt - git init

- Laster ned tailwind, shadcn, icons
- Mobile first utvikling
- navbar klar desktop & mobil versjon
- hjemmesiden ferdig, og nav ferdig for desktop og mobil
- DarkMood (ikke aktivert enda)

- Oppstart av books pages.
- pages skal gjøres ferdig før, data blir hentet fra DB.
- Oppretter collections for books
- viser fram fra, legger inn books i DB , Seeding?

-Payload anbefaler og som unngår feil, migrasjonsproblemer og databasekræsj. payload LOCAL api

##2.des

- lager ferdig filter componenten, både mobil og desktop
- lager slugs books , legger til collections
- skal lage cvs fill med data som skal importeres til databasen.
- Sørger for at filteret og slugs databasen matcher
- importerer csv fil også til data

legge inn books inni i data basen:
-pnpm payload migrate:create
-pnpm payload migrate
-pnpm tsx script/seed-bookdragons.tsx

- Prøver å skille mellom hva er client server og action server
- prøver å hente data fra DB for å vise inn på siden før jeg lager filter funksjon
- Alle bøkene vises , men uten bilde - bruke random bilde basert på random ISBN nr.
- "https://picsum.photos/400/500"
- BUG : Z-index på knappene til filter fikset
-

- Endre FilterSidebar til å oppdatere URL params
- Endre BooksSection til å lese params og sende til getBooks()
- Gjøre BooksSection til en client component som fetcher data
- Filter funksjonen skal funke, må trykke bruk filter knapp
- https://www.norli.no/boker - componenten

  ###3.des

- filter funksjonalitet utbedres
- sjanger filter funker ikke, må legge til manuelt via admin
- filter skal funke på alle bøker nå
- book segment utarbeides til egen side
- auth - hvem er logget inn, admin eller bruker - egen dashboard basert på det
-
- bruker kjøp / admin leggger til bøker
- components er laget ferdig.
- lager bruker collection, slugs user inn på database
- auth funker, bruker kan opprettes, logg inn og ut blir lagret og fjernet som tokens, cookies
- har begrenset rettigheter på brukere gjennom collections
- eksperimentere på slugs kjøp/behandling/status på bøkene, admin rettigheter

####4.des

- debugg imgrasjons feil pga endring i user, orders, slugproblemer
- bruker skal klikke på kjøp som tar med videre til handlekurv,
- prøver å legge til hindring at man ikke kan kjøpe mer enn det som er på lager, laget stock prop
- lage update order action
- når bruker betaler skal det kkomme under ordere, som vises på siden
- du må nå være logget inn for å kunne kjøpe, du blir referert tilbake til logginsiden
-

ERROR: query: 'INSERT INTO `__new_payload_locked_documents_rels`("id", "order", "parent_id", "path", "users_id", "media_id", "books_id", "orders_id", "wishlist_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "books_id", "orders_id", "wishlist_id" FROM `payload_locked_documents_rels`;',
params: [],
payloadInitError: true,
digest: '3927969799',
[cause]: [Error [LibsqlError]: SQLITE_ERROR: no such column: wishlist_id] {
code: 'SQLITE_ERROR',
rawCode: 1,
[cause]: [SqliteError: no such column: wishlist_id] {
code: 'SQLITE_ERROR',
rawCode: 1
}
}

- får dette opp hver gang jeg starter dev, men etter noen sekunder går den bort.

- debugging av feil, data import og export filer. prøver å segregere action & client components
- prøver at data og props flytter seg ned over til under elementer
- omdiringering til admin dashboard hvis role er admin
- gjorde om på nav - ingen kurv eller kjøp på admin bruker. og bruker knappen skal til den bestemte userRole - /admin eller /bruker
- Accordion fra shadcn for admin siden
- lager admin dashboard med å legge til bok, med samme info som slugs, component først uten funksjoner
- laget innkommende besttlinger uten fuksjoner, det skal kunne sortes etter status på varene
- og siste tab med bruker liste over alle kundene butikken har. så kan de slette brukere etter ønske
- compoentene funker fint med eksempel orders og virker som det skal
- de er klar tilbruk
- må lage action servers for å håndere api calls

- lager add book funksjon - inni add book på admin -> Addbook.
- ny bok kan nå legges til av admin.
- laget server action for henting av alle ordere av kundene, det må filtreres ut etter status på orderen
- hadde problemer som jeg slet med lenge NEXT_PUBLIC_SERVER_URL, men i updateOrderStatus brukes NEXT_PUBLIC_PAYLOAD_URL
- .env filene kom aldri opp på error , fikk bare 500 status
- DB krasjet, [npx tsx script/seed-bookdragons.tsx] - den hadde wishlist som hindret ID. måtte starte på nytt
- Nå får kundene oppdatert status om boka er klar til henting eller kanselert
- Error! får ikke lagt til ny bok via admin

  5.des

- problemet var å migrere DB riktig så kunne jeg legge til riktig
- lagger en felles api.ts for repeterende kode
- sletting av kunder er implementert på admin siden tredjefane

  6.des

- sjanger ble ikke med på cvs fill, mååte om skrive filtersider section
- add host name to next js config,
- bugg sjanger/genre passa ikke med cvs filen, collections, filter, og add book filter

tiltenkt funksjonalitet : når bok behandles ferdig , skal skal antallet trekkes fra lager status antallet
```
