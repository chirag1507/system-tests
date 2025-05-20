import { Property } from "../../acceptance/dsl/models/property";

export class PropertyBuilder {
  private data: Property = {
    id: "",
    address: "123 Test St",
    suburb: "Richmond",
    state: "VIC",
    postcode: "3121",
    price: 1000000,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "House",
  };

  withId(id: string) {
    this.data.id = id;
    return this;
  }

  withAddress(address: string) {
    this.data.address = address;
    return this;
  }

  withSuburb(suburb: string) {
    this.data.suburb = suburb;
    return this;
  }

  withState(state: string) {
    this.data.state = state;
    return this;
  }

  withPostcode(postcode: string) {
    this.data.postcode = postcode;
    return this;
  }

  withPrice(price: number) {
    this.data.price = price;
    return this;
  }

  withBedrooms(bedrooms: number) {
    this.data.bedrooms = bedrooms;
    return this;
  }

  withBathrooms(bathrooms: number) {
    this.data.bathrooms = bathrooms;
    return this;
  }

  withPropertyType(propertyType: string) {
    this.data.propertyType = propertyType;
    return this;
  }

  build(): Property {
    return { ...this.data };
  }
}
