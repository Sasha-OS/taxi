
let requestToDatabase = ""

function order(username,phone,from,to, time) {
    const res = new Reservation()
    // let driverid = res.selectDriver()
    payment = 500
    // let status = res.checkStatus(driverid)
    // if (!status) {
    //     alert("На жаль, всі водії зайняті")
    // } else {
    //     res.insertData(driverid, username,phone,from,to, time, payment)
    // }
    res.selectDriver(from)
    .then(data => {
        console.log(data)
        let driverid = data
        console.log("driverid = " + driverid)
        res.checkStatus(driverid).then(datas => {
            console.log("checkstatus " + datas)
            let status = datas
            if (!status) {
                alert("На жаль, всі водії зайняті")
            } else {
                res.insertData(driverid, username,phone,from,to, time, payment)
            }
        }) 
    })
}

function showDetails(phonenumber) {
    const res = new Reservation()
    res.showInfo(phonenumber)
}

class Reservation {

    insertData = (driverid, username,phone,from,to, time, payment) => {
        let id = driverid
        requestToDatabase = "insert into requests(driverid, username, phone, _from, _to, time, payment ) VALUES('" + driverid+ "','" + username + "' ,'" + phone + "','" + from+ "','" + to +"', '" + time + "', '" + payment +"');"
        let updateColumn = "UPDATE drivers SET time=null where driverid= '"+ id+ "'"
        console.log(requestToDatabase)
        console.log(updateColumn)
        // console.log(alertID)
        JSON.stringify(DB.sendRequest('GET', DB.URL.concat(requestToDatabase)))
        JSON.stringify(DB.sendRequest('GET', DB.URL.concat(updateColumn)))
        // let result = JSON.stringify(DB.sendRequest('GET', DB.URL.concat(alertID)))
        // alert("Замовлення в роботі")
        
    }


    selectDriver = (from) => new Promise((resolve, reject) => {
        requestToDatabase = "select drivers.driverid from drivers left join requests on drivers.driverid = requests.driverid where '" + from + "' = available limit 1";
        JSON.stringify(DB.sendRequest('GET', DB.URL.concat(requestToDatabase))
        .then(data => {
            console.log("Select driver 54: =" + data[0].driverid)
            resolve(data[0].driverid)
        }))
    })

    checkStatus = (driverid) => new Promise((resolve, reject) => {
        let id = driverid
        if (id != null) {
            requestToDatabase = "select * from drivers where driverid = " + id + " and time is not null";
            alert("Замовлення в роботі")
        } else {
            alert("На жаль, всі водії зайняті")
        }
        JSON.stringify(DB.sendRequest('GET', DB.URL.concat(requestToDatabase))
        .then(data => {
        console.log("data = " + data)
        if (data.length > 0) {
            resolve(true)
        } else {
            resolve(false)
        }})
    )})

    showInfo = (phonenumber)  => {
        let alertID = "select * from requests where phone = '"+ phonenumber +"'"
        JSON.stringify(DB.sendRequest('GET', DB.URL.concat(alertID))
        .then(data => {
            let driverName = "select * from drivers where driverid = '"+ data[0].driverid +"'"
            JSON.stringify(DB.sendRequest('GET', DB.URL.concat(driverName)).then(datas => {
                alert("OrderNumber: " + data[0].requestid + ", driver: " + datas[0].name + ", From: " + data[0]._from + ", to: " + data[0]._to + ", price " + data[0].payment + ", time " + data[0].time)
            }))
        }))
    }
}
