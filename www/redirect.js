// www.alpinedigital.com.au → alpinedigital.com.au with a 301, keeping the path and the query.
export default {
  fetch(request) {
    const url = new URL(request.url);
    url.protocol = "https:";
    url.hostname = "alpinedigital.com.au";
    url.port = "";
    return Response.redirect(url.href, 301);
  },
};
