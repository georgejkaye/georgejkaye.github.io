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
    <div className="flex flex-col gap-2 rounded-xl bg-pink-800 p-4">
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
    <div className="rounded-xl px-4 py-2 bg-blue-900">
      {Math.floor(connectionTime / 3600000)} hour {Math.floor(connectionTime / 60000 % 60)} minute connection
    </div>
  )

}

const ServiceList = ({ services }: { services: Service[] }) => (
  <div className="flex flex-col gap-4">
    <h4>Itinerary</h4>
    {services.map((service, i) => (
      <>
        <ServiceCard key={service.id} service={service} />
        {i !== services.length - 1 && <ConnectionCard first={service} second={services[i + 1]} />}
      </>
    ))}
  </div>
)

interface Data {
  permalink: string;
}

export default ({ permalink }: Data) => {
  return (
    <div>
      <h2>Thursday 02 July</h2>
      <h3>Birmingham to Strasbourg</h3>
      <ServiceList services={
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
      } />
    </div>
  );
};

// #### Tickets

// | Ticket | Origin | Destination | Price |
// | :- | :- | :- | :- |
// | Advance Single | Birmingham New Street | London Euston | £25.60 |
// | Eurostar Standard | London St Pancras International | Paris Nord | £136.50 |
// | Tarif Standard Seconde | Paris Est | Strasbourg | £56.60 |
// | **Total** | | | £218.70 |

// ## Friday 03 July

// ### Strasbourg to Wahlwies

// #### Itinerary

// | Service | Operator | Origin | Dep | Destination | Arr |
// | :- | :- | :- | :- | :- | :- |
// | SCF 87431 | SNCF | Strasbourg | **13:22** | Offenburg | **13:52** |
// | RE 4727 |  DB Regio AG Baden-Württemberg | Offenburg | **13:58** | Radolfzell | **15:59** |
// | S S61 |  DB Regio AG Baden-Württemberg | Radolfzell | **16:18** | Wahlwies | **16:31** |

// #### Tickets

// | Ticket | Origin | Destination | Price |
// | :- | :- | :- | :- |
// | Normalpreis Europa | Strasbourg | Wahlwies | £51.00 |

// ## Monday 06 July

// ### Wahlwies to Zurich

// #### Itinerary

// | Service | Operator | Origin | Dep | Destination | Arr |
// | :- | :- | :- | :- | :- | :- |
// | S S61 | DB Regio AG Baden-Württemberg | Wahlwies | **09:53** | Radolfzell | **10:04** |
// | S S6 | SBB GmbH | Radolfzell | **10:16** | Singen (Hohentwiel) | **10:26** |
// | IC 183 | DB Fernverkehr AG | Singen (Hohentwiel) | **10:32** | Zurich HB | **11:23** |

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
