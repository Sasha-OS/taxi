// var {Client} = require("pg")
// var connectionString = "postgres://postgres:postgres@localhost:5433/first";
//
// const client = new Client({
//     connectionString:connectionString
// })
//
//
// function connect(reqest) {
//     client.connect()
//         .then(() => console.log("connected successfuly"))
//         .then(() => client.query(reqest))
//         .then(results => console.table(results.rows))
//         .then(results => client.end())
// }
//
//
class Data {
    static db = [
        {
            DriverId: "1",
            name: "Alex",
            available: "Kyiv center",
            time: "now",
        },
        {
            DriverId: "2",
            name: "Daniel",
            available: "Kyiv center",
            time: "23/11/2021 06:00 am",
        },
        {
            DriverId: "3",
            name: "Josh",
            available: "Zhytomurska station",
            time: "now",
        },
        {
            DriverId: "4",
            name: "Steve",
            available: "Heroyiv Dnipra station",
            time: "now"
        },
        {
            DriverId: "5",
            name: "Richard",
            available: "Holosiivska station",
            time: "now"
        },
    ]
}
const http = require('http')
const url = require('url')

http.createServer((request,response) =>{
    response.setHeader('Content-Type', 'application/json');
    let urlReqest = url.parse(request.url, true)
    //console.log(execute(r))
    execute(response, urlReqest.query.test);
}).listen(9000);


http.createServer((request,response) =>{
    response.setHeader('Content-Type', 'application/json');
    let urlReqest = url.parse(request.url, true)
    //console.log(execute(r))
    console.log("Connected successfully.")
    //await client.query("insert into employees values (1, 'John')")
    console.log(JSON.stringify(Data.db))
    if (urlReqest.path === '/search?query=') {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        response.end(JSON.stringify(Data.db))
        console.log("Client disconnected successfully.")
    } else if (urlReqest.path.includes('/details/')) {
        let count = urlReqest.path.replace('/details/', '')
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        response.end(JSON.stringify(Data.db[parseInt(count)]))
    }
}).listen(3000);


//execute()

async function execute(responce, url) {
    const {Client} = require('pg')
    const client = new Client({
        user: "postgres",
        password: "uhb,by.r",
        host: "localhost",
        port: 5432,
        database: "taxi"
    })
    try{
        await client.connect()
        console.log("Connected successfully.")
        //await client.query("insert into employees values (1, 'John')")
        console.log(url)
        const {rows} = await client.query(url)
        console.log(rows)
        responce.setHeader('Access-Control-Allow-Origin', '*');
        responce.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        responce.end(JSON.stringify(rows))
        await client.end()
         //await client.end()
         console.log("Client disconnected successfully.")
    }
    catch (ex)
    {
        console.log(`Something wrong happend ${ex}`)
    }
}