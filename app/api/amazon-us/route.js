const body = JSON.stringify({
  Keywords: keyword,
  PartnerTag: associateTag,
  PartnerType: "Associates",
  Marketplace: "www.amazon.com",
  Resources: [
    "Images.Primary.Medium",
    "ItemInfo.Title",
    "Offers.Listings.Price"
  ]
});
