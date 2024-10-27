const express = require('express');
const bodyParser = require("body-parser")
const app = express();
const port = 3008;
const path = require('path')

// function middleware(req,res,next){
//     var c = req.headers.counter3;
//     var d = req.headers.counter2;
//     console.log("c is" +c +" d" +d);
//     next();
// }
app.use(bodyParser.json());
// app.use(middleware);
// app.use(middleware);


// Function to calculate the sum of numbers from 1 to counter
function sum(counter) {
    let sum = 0;
    for (let i = 1; i <= counter; i++) {
        sum += i;
    }
    return sum;
}
function mul(counter) {
    let mul = 1;
    for (let i = 1; i <= counter; i++) {
        mul *= i;
    }
    return mul;
}

// Function to handle HTTP requests
function handlerequest(req, res) {
    // var value = req.body.counter;
    var value = req.query.counter;
    if(value<100){
    var obj = {
        "sum":sum(value),
        "multiplication":mul(value)
    }
    
    res.send(obj);
    // res.json(obj);another way to send an response
    }
    else{
        res.status(411).send("you have a big number");
    }
}




function page(req,res){
    res.sendFile(path.join(__dirname, 'index.html'));
}
app.get('/',page);




// Route to handle GET requests at the root
// app.get('/handle', handle);
app.get('/handle2', handlerequest);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


