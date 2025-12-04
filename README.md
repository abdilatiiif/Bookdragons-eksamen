# Payload Blank Template

This template comes configured with the bare minimum to get started on anything you need.

## Quick start

This template can be deployed directly from our Cloud hosting and it will setup MongoDB and cloud S3 object storage for media.

## Quick Start - local setup

To spin up this template locally, follow these steps:

### Clone

After you click the `Deploy` button above, you'll want to have standalone copy of this repo on your machine. If you've already cloned this repo, skip to [Development](#development).

### Development

1. First [clone the repo](#clone) if you have not done so already
2. `cd my-project && cp .env.example .env` to copy the example environment variables. You'll need to add the `MONGODB_URI` from your Cloud project to your `.env` if you want to use S3 storage and the MongoDB database that was created for you.

3. `pnpm install && pnpm dev` to install dependencies and start the dev server
4. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

#### Docker (Optional)

If you prefer to use Docker for local development instead of a local MongoDB instance, the provided docker-compose.yml file can be used.

To do so, follow these steps:

- Modify the `MONGODB_URI` in your `.env` file to `mongodb://127.0.0.1/<dbname>`
- Modify the `docker-compose.yml` file's `MONGODB_URI` to match the above `<dbname>`
- Run `docker-compose up` to start the database, optionally pass `-d` to run in the background.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).

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
- problemet var å migrere DB riktig så kunne jeg legge til riktig
- lagger en felles api.ts for repeterende kode
- sletting av kunder er implementert på admin siden tredjefane

- Søkeinput felt skal
