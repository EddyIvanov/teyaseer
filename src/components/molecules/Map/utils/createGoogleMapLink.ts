/* Documentation: https://developers.google.com/maps/documentation/urls/get-started */
const createGoogleMapLink = (address: any) => {
  const query = `${address.name} ${address.shortAddress}`;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
};

export default createGoogleMapLink;
