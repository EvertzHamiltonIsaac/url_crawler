const {crawlPage} = require('./modules/crawl.js')

function main(){
    if(process.argv.length < 3){
        console.log("No Website Provied.");
        process.exit(1);
    }
    if(process.argv.length > 3){
        console.log("too many command line args");
        process.exit(1);
    }

    const baseURL = process.argv[2];
    console.log(`starting Crawl of ${baseURL}`)
    crawlPage(baseURL);
}

main();