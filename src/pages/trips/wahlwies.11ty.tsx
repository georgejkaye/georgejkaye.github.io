interface Service {
  id: string;
  operator: string;
  origin: string;
  dep?: Date;
  depHourOffset?: number
  destination: string;
  arr?: Date;
  arrHourOffset?: number,
  seat?: string
}

const ServiceCard = ({ service }: { service: Service }) => {
  const depHourGb = !service.dep ? undefined : new Date(service.dep.getTime())
  if (depHourGb) {
    depHourGb.setHours(depHourGb.getHours() - (service.depHourOffset ?? 0))
  }
  const arrHourGb = !service.arr ? undefined : new Date(service.arr.getTime())
  if (arrHourGb) {
    arrHourGb.setHours(arrHourGb.getHours() - (service.arrHourOffset ?? 0))
  }
  const duration = !arrHourGb || !depHourGb ? undefined : arrHourGb.getTime() - depHourGb.getTime()
  return (
    <div className="flex flex-col gap-2 rounded-xl">
      <div className="flex flex-row items-center">
        <div className="text-2xl w-20">{!service.dep ? "xx:xx" : service.dep.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</div>
        <div className="text-xl font-bold">{service.origin}</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="text-2xl w-20">{!service.arr ? "xx:xx" : service.arr.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</div>
        <div className="text-xl font-bold">{service.destination}</div>
      </div>
      <div className="flex flex-row gap-2">
        {duration && (
          <>
            <div>{Math.floor(duration / 3600000)}h {Math.floor(duration / 60000 % 60)}m</div>
            <div>•</div>
          </>)}
        <div>{service.operator}</div>
        <div>•</div>
        <div>{service.id}</div>
        {service.seat && (
          <>
            <div>•</div>
            <div>{service.seat}</div>
          </>)}
      </div>
    </div>
  )
}

const ConnectionCard = ({ incomingArr, outgoingDep }: { incomingArr: Date, outgoingDep: Date }) => {
  const connectionTime = outgoingDep.getTime() - incomingArr.getTime()
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

const TicketList = ({ tickets, advice }: { tickets: Ticket[], advice?: string }) => (
  <div>
    <h4>Tickets</h4>
    <div className="flex flex-col gap-4">
      {advice && <div>{advice}</div>}
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
      {services.map((service, i) => {
        const nextService = i >= services.length ? undefined : services[i + 1]
        return (
          <>
            <ServiceCard key={service.id} service={service} />
            {service.arr && nextService && nextService.dep && <ConnectionCard incomingArr={service.arr} outgoingDep={nextService.dep} />}
          </>
        )
      })}
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
        price: 28.95
      },
      {
        name: "Eurostar Standard",
        start: "London St Pancras International",
        end: "Paris Nord",
        price: 90,
        seat: "Coach 13 Seat 14"
      },
      {
        name: "Tarif Standard Seconde",
        start: "Paris Est",
        end: "Strasbourg",
        price: 53.53
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
        price: 48.52
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
        destination: "Radolfzell",
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
        destination: "Zurich HB",
        arr: new Date(2026, 6, 6, 11, 23),
        arrHourOffset: 1
      }
    ]
  const mondayContinentalTrainTickets =
    [
      {
        name: "Super Sparpreis Europa",
        start: "Wahlwies",
        end: "Zurich HB",
        price: 19.85
      }
    ]
  const mondayPlanes = [
    {
      id: "BA8768",
      operator: "British Airways",
      origin: "Zurich",
      dep: new Date(2026, 6, 6, 19, 15),
      depHourOffset: 1,
      destination: "London City",
      arr: new Date(2026, 6, 6, 19, 50),
      arrHourOffset: 0
    }]
  const mondayPlaneTickets =
    [
      {
        name: "Economy",
        start: "Zurich",
        end: "London City",
        price: 96
      }
    ]
  const mondayGbTrains = [
    {
      id: "DLR",
      operator: "TfL",
      origin: "London City Airport",
      destination: "Bank"
    },
    {
      id: "Northern",
      operator: "TfL",
      origin: "Bank",
      destination: "Euston"
    },
    {
      id: "W02001",
      operator: "Avanti West Coast",
      origin: "London Euston",
      dep: new Date(2026, 6, 6, 21, 29),
      depHourOffset: 0,
      destination: "Birmingham New Street",
      arr: new Date(2026, 6, 6, 23, 2),
      arrHourOffset: 0
    }]
  const mondayGbTrainTickets =
    [{
      name: "Zones 1-3",
      start: "London City Airport",
      end: "Euston",
      price: 3.30
    },
    {
      name: "Off-Peak Single",
      start: "London Euston",
      end: "Birmingham New Street",
      price: 33.60
    }]
  return (
    <div>
      <div>Prices obtained using the appropriate booking-fee-free sites, converting EUR to GBP where appropriate using the Monzo rate. National Rail services have 26-30 railcard applied.</div>
      <h2>Thursday 02 July</h2>
      <h3>Birmingham to Strasbourg</h3>
      <ServiceList services={thursdayTrains} />
      <div></div>
      <TicketList tickets={thursdayTickets} advice={"Book via your preferred National Rail ticket provider, Eurostar, and SNCF Connect."} />
      <h2>Friday 03 July</h2>
      <h3>Strasbourg to Wahlwies</h3>
      <div>Book via DB Navigator app.</div>
      <ServiceList services={fridayTrains} />
      <TicketList tickets={fridayTickets} advice={"Book via teh DB Navigator app."} />
      <h2>Monday 06 July</h2>
      <h3>Wahlwies to Zurich</h3>
      <ServiceList services={mondayTrains} />
      <TicketList tickets={mondayContinentalTrainTickets} advice={"Book via the DB Navigator app."} />
      <h3>Zurich to London City</h3>
      <ServiceList services={mondayPlanes} />
      <TicketList tickets={mondayPlaneTickets} />
      <h3>London City to Birmingham New Street</h3>
      <ServiceList services={mondayGbTrains} />
      <TicketList tickets={mondayGbTrainTickets} />
      <h2>Total</h2>
      <div className="text-2xl font-bold">£{(thursdayTickets.reduce((acc, cur) => acc + cur.price, 0)
        + fridayTickets.reduce((acc, cur) => acc + cur.price, 0)
        + mondayContinentalTrainTickets.reduce((acc, cur) => acc + cur.price, 0)
        + mondayPlaneTickets.reduce((acc, cur) => acc + cur.price, 0)
        + mondayGbTrainTickets.reduce((acc, cur) => acc + cur.price, 0)).toFixed(2)
      }</div>
    </div>
  );
};
