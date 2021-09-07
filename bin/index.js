#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");
const open = require( "open" );

const options = yargs
  .usage("Usage: -s <search>")
  .option("s", {
    alias: "search",
    describe: "Language or Topic of Repository",
    type: "string",
    demandOption: true
  }).argv;


var get_repo = async (language, page) => {
    console.log("Loading...");
  try {
    const url =
    "https://api.github.com/search/repositories?per_page=1&page=" +
    page +
    "&q=language:" +
    language;
 
    response = await axios.get(url);

    console.log(response.data.items[0].html_url);
    open( response.data.items[0].html_url );
  } catch (e) {
      try{
        const url =
        "https://api.github.com/search/repositories?per_page=1&page=" +
        page +
        "&q=topic:" +
        language;
        response = await axios.get(url);
        console.log(response.data.items[0].html_url);
        open( response.data.items[0].html_url );
      }catch(e){
        console.log(e.message);
      }
 
  }
};

if (options.search) {
  const page = Math.floor(Math.random() * 999) + 1;

  repo = get_repo(options.search, page);
}