import { DOMParser } from "@xmldom/xmldom";

// Function to parse XML file and convert to JSON
async function parseXmlFileToJson(filePath: string) {
  try {
    // Read the XML file as text
    const xmlText = await Deno.readTextFile(filePath);

    // Parse the XML text using DOMParser
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    // Check for parsing errors
    const parserError = xmlDoc.getElementsByTagName("parsererror");
    if (parserError.length > 0) {
      console.error("Error parsing XML:", parserError[0].textContent);
      return;
    }

    // Convert XML document to JSON
    const json = xmlToJson(xmlDoc);
    console.log(JSON.stringify(json, null, 2));
  } catch (error) {
    console.error("Error reading or parsing the file:", error);
  }
}

// Function to convert XML to JSON
function xmlToJson(xml: any): any {
  // Create the return object
  let obj: any = {};

  if (xml.nodeType === 1) { // element
    // Do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (let j = 0; j < xml.attributes.length; j++) {
        const attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) { // text
    obj = xml.nodeValue;
  }

  // Do children
  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i);
      const nodeName = item.nodeName;
      if (typeof (obj[nodeName]) === "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof (obj[nodeName].push) === "undefined") {
          const old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

// Main execution
if (import.meta.main) {
  // Check if a file is provided as a command line argument
  if (Deno.args.length === 0) {
    console.error("tcx2json - Convert a Garmin™ TCX file to JSON.");
    console.error("No tcx file provided.");
    console.error("Usage: tcx2json TCXFILE.tcx");
    Deno.exit(1);
  }

  const filePath = Deno.args[0];

  parseXmlFileToJson(filePath);
}