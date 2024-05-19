export interface Event {
    "Date": string,
    "Music Start Time": string,
    "Bar or Venue Name": string,
    "Band/DJ/Musician Name": string,
    "Cost Select": string;
    Cost: string,
    "Date Select": Date
    '"Specials" at Venue': string,
    id: string;
    /* List of linked records from the "Venues" table
     * currently configured to be a single linked record,
     * will be undefined if no linked record is present
     */
    Venue?: [string]
}

export interface Venue {
    id: string;
    "Bar or Venue Name": string,
    "Street Address": string,
    "City": string,
    "Zip Code": number,
    State: string,
    "Phone Number": string,
    Website: string,
    "Has Calendar Of Events": string,
    "Facebook Page": string,
    "Instagram": string,
    "Twitter Account": string,
}

export interface VenueNameLookup {
    [key: string]: Venue;
}

export interface VenueIdLookup {
    [key: string]: Venue;
}

export interface VenueLookup {
    byName: VenueNameLookup;
    byId: VenueIdLookup;
}