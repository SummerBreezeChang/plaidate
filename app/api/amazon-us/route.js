import aws4 from "aws4";

export async function GET(request) {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("q") || "design books";

  const accessKey = process.env.AMAZON_US_ACCESS_KEY;
  const secretKey = process.env.AMAZON_US_SECRET_KEY;
  const associateTag = process.env.AMAZON_US_ASSOCIATE_TAG;
  const region = "us-east-1";
  const host = "webservices.amazon.com";

  const endpoint = `https://${host}/paapi5/searchitems`;

  const body = JSON.stringify({
    Keywords: keyword,
    PartnerTag: associateTag,
    PartnerType: "Associates",
    Marketplace: "www.amazon.com",
    Resources: [
      "Images.Primary.Small",
      "Images.Primary.Medium",
      "Images.Primary.Large",
      "Images.Variants.Medium",
      "ItemInfo.Title",
      "Offers.Listings.Price",
      "DetailPageURL"
    ]
  });

  const opts = {
    host,
    path: "/paapi5/searchitems",
    service: "ProductAdvertisingAPI",
    region,
    method: "POST",
    body,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  };

  aws4.sign(opts, { accessKeyId: accessKey, secretAccessKey: secretKey });

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: opts.headers,
      body,
    });

    const data = await response.json();

    // Optional: log to see if images are returned
    console.log(JSON.stringify(data, null, 2));

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Amazon API error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch from Amazon API" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
