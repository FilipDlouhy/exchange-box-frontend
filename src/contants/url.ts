const STATIC_URL: string = "http://localhost:3000/";

function generateUrl(inputString: string): string {
  return STATIC_URL + inputString;
}

export default generateUrl;
