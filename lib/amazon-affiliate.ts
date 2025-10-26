/**
 * Amazon Affiliate Link Helper
 * Appends affiliate tag to Amazon product URLs
 */

const AFFILIATE_TAG = "summerchang0a-20"

/**
 * Adds affiliate tag to Amazon product URLs
 * @param url - Original Amazon product URL
 * @returns URL with affiliate tag appended
 */
export function addAffiliateTag(url: string): string {
  if (!url || !url.includes("amazon.com")) {
    return url
  }

  try {
    const urlObj = new URL(url)

    // Add or update the tag parameter
    urlObj.searchParams.set("tag", AFFILIATE_TAG)

    return urlObj.toString()
  } catch (error) {
    // If URL parsing fails, append tag manually
    const separator = url.includes("?") ? "&" : "?"
    return `${url}${separator}tag=${AFFILIATE_TAG}`
  }
}

/**
 * Processes an array of resources and adds affiliate tags to Amazon links
 * @param resources - Array of resource objects with link property
 * @returns Resources with affiliate tags added to Amazon links
 */
export function addAffiliateTagsToResources<T extends { link: string }>(resources: T[]): T[] {
  return resources.map((resource) => ({
    ...resource,
    link: addAffiliateTag(resource.link),
  }))
}
