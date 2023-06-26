const { JSDOM } = require("jsdom");

async function crawlPage(currentURL) {
  console.log(`actively crawling: ${currentURL}`);
  try {
    const resp = await fetch(currentURL);
    
    if(resp.status > 399){
        console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`);
        return
    }

  } catch (error) {
    console.log(`error in fetch: ${error.message}, on page: ${currentURL}`)
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const link of linkElements) {
    if (link.href.slice(0, 1) === "/") {
      //* Relative Path
      try {
        const UrlObject = new URL(`${baseURL}${link.href}`);
        urls.push(UrlObject.href);
      } catch (error) {
        console.log(`Error with relative url: ${error.message}`);
      }
    } else {
      //* Absolute Path
      try {
        const UrlObject = new URL(`${baseURL}${link.href}`);
        urls.push(UrlObject.href);
      } catch (error) {
        console.log(`Error with absolute url: ${error.message}`);
      }
    }
  }
  return urls;
}

function UrlNormalizer(url) {
  const urlObj = new URL(url);
  const urlNormalized = `${urlObj.hostname}${urlObj.pathname}`;
  if (urlNormalized.length > 0 && urlNormalized.slice(-1) === "/") {
    return urlNormalized.slice(0, -1);
  }
  return urlNormalized;
}

module.exports = { UrlNormalizer, getURLsFromHTML, crawlPage };
