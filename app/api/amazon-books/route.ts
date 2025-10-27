import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { keywords = 'children books', ageRange, page = 1 } = body

    // Build search keywords
    let searchKeywords = keywords
    if (ageRange) {
      searchKeywords = `${keywords} ages ${ageRange}`
    }

    // Amazon PA-API configuration
    const accessKey = process.env.AMAZON_ACCESS_KEY!
    const secretKey = process.env.AMAZON_SECRET_KEY!
    const partnerTag = process.env.AMAZON_PARTNER_TAG!
    const host = 'webservices.amazon.com'
    const region = 'us-east-1'

    // Generate timestamp
    const amzDate = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, '')
    const target = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems'

    // Request payload
    const payload = {
      PartnerTag: partnerTag,
      PartnerType: 'Associates',
      Keywords: searchKeywords,
      SearchIndex: 'Books',
      ItemCount: 10,
      ItemPage: page,
      Resources: [
        'Images.Primary.Large',
        'Images.Primary.Medium',
        'ItemInfo.Title',
        'ItemInfo.ByLineInfo',
        'ItemInfo.ContentInfo',
        'ItemInfo.Features',
        'ItemInfo.Classifications',
        'Offers.Listings.Price'
      ]
    }

    const payloadString = JSON.stringify(payload)

    // Import crypto dynamically
    const crypto = await import('crypto')

    // Generate signature
    const dateStamp = amzDate.split('T')[0]
    const canonicalUri = '/paapi5/searchitems'
    const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${host}\nx-amz-date:${amzDate}\nx-amz-target:${target}\n`
    const signedHeaders = 'content-type;host;x-amz-date;x-amz-target'
    const payloadHash = crypto.createHash('sha256').update(payloadString).digest('hex')

    const canonicalRequest = `POST\n${canonicalUri}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`
    const credentialScope = `${dateStamp}/${region}/ProductAdvertisingAPI/aws4_request`
    const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${credentialScope}\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`

    const kDate = crypto.createHmac('sha256', 'AWS4' + secretKey).update(dateStamp).digest()
    const kRegion = crypto.createHmac('sha256', kDate).update(region).digest()
    const kService = crypto.createHmac('sha256', kRegion).update('ProductAdvertisingAPI').digest()
    const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest()
    const signature = crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex')

    const authorization = `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`

    // Make request to Amazon
    const response = await fetch(`https://${host}/paapi5/searchitems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Amz-Date': amzDate,
        'X-Amz-Target': target,
        'Authorization': authorization,
        'Host': host
      },
      body: payloadString
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Amazon API Error:', data)
      throw new Error(data.Errors?.[0]?.Message || 'Amazon API error')
    }

    // Transform response
    const books = data.SearchResult?.Items?.map((item: any) => ({
      asin: item.ASIN,
      title: item.ItemInfo?.Title?.DisplayValue || 'No title',
      author: item.ItemInfo?.ByLineInfo?.Contributors?.[0]?.Name || 'Unknown Author',
      image: item.Images?.Primary?.Large?.URL || item.Images?.Primary?.Medium?.URL || '',
      description: item.ItemInfo?.Features?.DisplayValues?.join(' ') || '',
      pageCount: item.ItemInfo?.ContentInfo?.PagesCount?.DisplayValue || 'N/A',
      ageRange: item.ItemInfo?.Classifications?.AgeRange?.DisplayValue || 'N/A',
      binding: item.ItemInfo?.Classifications?.Binding?.DisplayValue || 'N/A',
      price: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || 'N/A',
      detailPageURL: item.DetailPageURL || ''
    })) || []

    return NextResponse.json({
      success: true,
      totalResults: data.SearchResult?.TotalResultCount || 0,
      books
    })

  } catch (error: any) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch books'
    }, { status: 500 })
  }
}
