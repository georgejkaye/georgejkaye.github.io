interface ServiceCardProps {
  id: string;
  operator: string;
  origin: string;
  dep: Date;
  destination: string;
  arr: Date;
}

const ServiceCard = ({
  id,
  operator,
  origin,
  dep,
  destination,
  arr,
}: ServiceCardProps) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div>{id}</div>
  </div>
);

interface Data {
  permalink: string;
}

export default ({ permalink }: Data) => {
  return (
    <div>
      <h1>Wahlwies</h1>
      <h2>Thursday 02 July</h2>
      <h3>Birmingham to Strasbourg</h3>
      <h4>Itinerary</h4>
      <ServiceCard
        id="VT07520"
        operator="Avanti West Coast"
        origin="Birmingham New Street"
        dep={new Date(2026, 7, 2, 8, 17)}
        destination="London Euston"
        arr={new Date(2026, 7, 4, 9, 41)}
      />
      <ServiceCard
        id="9022"
        operator="Eurostar"
        origin="London St Pancras International"
        dep={new Date(2026, 7, 2, 11, 31)}
        destination="Paris Nord"
        arr={new Date(2026, 7, 2, 14, 49)}
      />
      <ServiceCard
        id="9577"
        operator="TGV INOUI"
        origin="Paris Est"
        dep={new Date(2026, 7, 2, 15, 55)}
        destination="Paris Nord"
        arr={new Date(2026, 7, 2, 17, 41)}
      />
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
