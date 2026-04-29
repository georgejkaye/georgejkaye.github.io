interface Service {
  id: string;
  operator: string;
  origin: string;
  dep: Date;
  depHourOffset?: number
  destination: string;
  arr: Date;
  arrHourOffset?: number
}

const ServiceCard = ({ service }: { service: Service }) => {
  const depHourGb = new Date(service.dep.getTime())
  depHourGb.setHours(depHourGb.getHours() - (service.depHourOffset ?? 0))
  const arrHourGb = new Date(service.arr.getTime())
  arrHourGb.setHours(arrHourGb.getHours() - (service.arrHourOffset ?? 0))
  const duration = arrHourGb.getTime() - depHourGb.getTime()
  return (
    <div className="flex flex-col gap-2 rounded-xl">
      <div className="flex flex-row items-center">
        <div className="text-2xl w-20">{service.dep.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</div>
        <div className="text-xl font-bold">{service.origin}</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="text-2xl w-20">{service.arr.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</div>
        <div className="text-xl font-bold">{service.destination}</div>
      </div>
      <div className="flex flex-row gap-2">
        <div>{Math.floor(duration / 3600000)}h {Math.floor(duration / 60000 % 60)}m</div>
        <div>•</div>
        <div>{service.operator}</div>
        <div>•</div>
        <div>{service.id}</div>
      </div>
    </div>
  )
}

const ConnectionCard = ({ first, second }: { first: Service, second: Service }) => {
  const connectionTime = second.dep.getTime() - first.arr.getTime()
  return (
    <div className="rounded-xl">
      {Math.floor(connectionTime / 3600000)} hour {Math.floor(connectionTime / 60000 % 60)} minute connection
    </div>
  )

}

interface Ticket {
  name: string,
  price: number
  start: string,
  end: string
}

const TicketCard = ({ ticket }: { ticket: Ticket }) => (
  <div>
    <div className="flex flex-row text-xl">
      <div className="flex-1">{ticket.name}</div>
      <div>£{ticket.price.toFixed(2)}</div>
    </div>
    <div>{ticket.start} to {ticket.end}</div>
  </div>
)

const TicketList = ({ tickets }: { tickets: Ticket[] }) => (
  <div>
    <h4>Tickets</h4>
    <div className="flex flex-col gap-4">
      {tickets.map(ticket => <TicketCard key={`${ticket.start}:${ticket.end}`} ticket={ticket} />)}
      <div className="flex flex-row">
        <div className="flex-1 text-xl font-bold">Total</div>
        <div className="text-xl font-bold">£{tickets.reduce((acc, cur) => acc + cur.price, 0).toFixed(2)}</div>
      </div>
    </div>
  </div>
)

const ServiceList = ({ services }: { services: Service[] }) => (
  <div>
    <h4>Itinerary</h4>
    <div className="flex flex-col gap-6">
      {services.map((service, i) => (
        <>
          <ServiceCard key={service.id} service={service} />
          {i !== services.length - 1 && <ConnectionCard first={service} second={services[i + 1]} />}
        </>
      ))}
    </div>
  </div>
)

interface Data {
  permalink: string;
}

export default ({ permalink }: Data) => {
  const thursdayTrains =
    [
      {
        id: "VT07520",
        operator: "Avanti West Coast",
        origin: "Birmingham New Street",
        dep: new Date(2026, 6, 2, 8, 17),
        destination: "London Euston",
        arr: new Date(2026, 6, 2, 9, 41),
      },
      {
        id: "9022",
        operator: "Eurostar",
        origin: "London St Pancras International",
        dep: new Date(2026, 6, 2, 11, 31),
        destination: "Paris Nord",
        arr: new Date(2026, 6, 2, 14, 49),
        arrHourOffset: 1
      },
      {
        id: "9577",
        operator: "TGV INOUI",
        origin: "Paris Est",
        depHourOffset: 1,
        dep: new Date(2026, 6, 2, 15, 55),
        destination: "Strasbourg",
        arr: new Date(2026, 6, 2, 17, 41),
        arrHourOffset: 1
      }
    ]
  const thursdayTickets =
    [
      {
        name: "Advance Single",
        start: "Birmingham New Street",
        end: "London Euston",
        price: 25.6
      },
      {
        name: "Eurostar Standard",
        start: "London St Pancras International",
        end: "Paris Nord",
        price: 136.5
      },
      {
        name: "Tarif Standard Seconde",
        start: "Paris Est",
        end: "Strasbourg",
        price: 56.6
      }
    ]
  const fridayTrains =
    [
      {
        id: "SCF 87431",
        operator: "SNCF",
        origin: "Strasbourg",
        dep: new Date(2026, 6, 3, 13, 22),
        depHourOffset: 1,
        destination: "Offenburg",
        arr: new Date(2026, 6, 3, 13, 52),
        arrHourOffset: 1
      },
      {
        id: "RE 4727",
        operator: "DB Regio AG Baden-Württemberg",
        origin: "Offenburg",
        dep: new Date(2026, 6, 3, 13, 58),
        depHourOffset: 1,
        destination: "Radolfzell",
        arr: new Date(2026, 6, 3, 15, 59),
        arrHourOffset: 1
      },
      {
        id: "S S61",
        operator: "DB Regio AG Baden-Württemberg",
        origin: "Radolfzell",
        depHourOffset: 1,
        dep: new Date(2026, 6, 3, 16, 18),
        destination: "Wahlwies",
        arr: new Date(2026, 6, 3, 16, 31),
        arrHourOffset: 1
      }
    ]
  const fridayTickets =
    [
      {
        name: "Normalpreis Europa",
        start: "Strasbourg",
        end: "Wahlwies",
        price: 51
      }
    ]
  const mondayTrains =
    [
      {
        id: "S S61",
        operator: "DB Regio AG Baden-Württemberg",
        origin: "Wahlwies",
        dep: new Date(2026, 6, 6, 9, 53),
        depHourOffset: 1,
        destination: "Offenburg",
        arr: new Date(2026, 6, 6, 10, 4),
        arrHourOffset: 1
      },
      {
        id: "S S6",
        operator: "SBB GmbH",
        origin: "Radolfzell",
        dep: new Date(2026, 6, 6, 10, 16),
        depHourOffset: 1,
        destination: "Singen (Hohentwiel)",
        arr: new Date(2026, 6, 6, 10, 26),
        arrHourOffset: 1
      },
      {
        id: "IC 183",
        operator: "DB Fernverkehr AG",
        origin: "Singen (Hohentwiel)",
        depHourOffset: 1,
        dep: new Date(2026, 6, 6, 10, 32),
        destination: "Wahlwies",
        arr: new Date(2026, 6, 6, 11, 23),
        arrHourOffset: 1
      }
    ]
  const mondayTickets =
    [
      {
        name: "Super Sparpreis Europa",
        start: "Wahlwies",
        end: "Zurich HB",
        price: 21
      }
    ]
  return (
    <div>
      <h2>Thursday 02 July</h2>
      <h3>Birmingham to Strasbourg</h3>
      <ServiceList services={thursdayTrains} />
      <TicketList tickets={thursdayTickets} />
      <h2>Friday 03 July</h2>
      <h3>Strasbourg to Wahlwies</h3>
      <ServiceList services={fridayTrains} />
      <TicketList tickets={fridayTickets} />
      <h2>Monday 06 July</h2>
      <h3>Wahlwies to Zurich</h3>
      <ServiceList services={mondayTrains} />
      <TicketList tickets={mondayTickets} />
      <h2>Total</h2>
      <div className="text-2xl font-bold">£{(thursdayTickets.reduce((acc, cur) => acc + cur.price, 0)
        + fridayTickets.reduce((acc, cur) => acc + cur.price, 0)
        + mondayTickets.reduce((acc, cur) => acc + cur.price, 0)).toFixed(2)
      }</div>
    </div>
  );
};

// #### Tickets

// | Ticket | Origin | Destination | Price |
// | :- | :- | :- | :- |
// | Super Sparpreis Europa | Wahlwies | Zurich HB | £21.00 |

// ### Zurich to London City Airport

// |||
// | - | - |
// |**Price**|£96.00|

// ||||
// | - | - | - |
// | Zurich | ZRH | 19:15 |
// | London City | LCY | 19:50 |
