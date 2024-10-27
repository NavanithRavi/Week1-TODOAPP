const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require("body-parser")
const app = express();
const port = 3000;
const path = require('path');
app.use(bodyParser.json());
app.use(cors());
function checkFileArray(data){
    if(data.trim()===""){
      return true;
    }
    return data;
}
function checkFile(data,res){
      if(data.trim()===""){
        res.status(404).send("File is Empty");
      }
      
      else{
        return true;
      }
}

app.put('/update',(req,res)=>{
    var items = req.body;
    var oldid = req.body.oldid;
 //    var newid = req.body.newid;
 // //    console.log(oldid);
 // //    console.log(newid);
    fs.readFile('file.json','utf-8',(err,data)=>{
     var check =checkFile(data, res);
     if(check===true){
         var jsonData = JSON.parse(data);
         var index = jsonData.findIndex(value => value.id===oldid );
         if(index!=-1){
         // jsonData[index].id=newid;
         for(let key in items){
             jsonData[index][key]=items[key];
         }
         var jsonstring = JSON.stringify(jsonData,null,2);
         fs.writeFile('file.json',jsonstring,(err)=>{
             res.send("updated");
         })
         }
         else{
             res.send("invalid Index");
         }
     }
    })
});
app.delete('/delete',(req,res)=>{
    // console.log("I am inside the delete function");
    var id = req.body.id;
    console.log(id);
    fs.readFile('file.json','utf-8',(err,data)=>{
        var check = checkFile(data,res);
        if(check===true){
            // console.log(id);
            // console.log("I am inside the delete function");
            // console.log(data);
            var jsonData = JSON.parse(data);
            var index = jsonData.findIndex(value => value.id===id);
            if(index!=-1){
                console.log("I am inside the delete function");
                jsonData.splice(index,1);
                var updatedjson = JSON.stringify(jsonData,null,2);

                fs.writeFile('file.json',updatedjson,(err)=>{
                    if(err){
                        res.send("error");
                    }
                    else{
                        res.send("deleted");

                    }

                })
            }
            else{
                res.send("Invalid Index");
            }
        }
    })
});

app.get('/getList',(req,res)=>{
    fs.readFile('file.json', 'utf8',(err,data)=>{
        if(err){
                console.error("Error reading file:", err);
                res.status(500).send("Error reading file");
                return;
        }
        else{
            var check =checkFile(data, res);
            if(check===true){
                var jsonData = JSON.parse(data);
                res.send(jsonData);
            }
        }
        });
})
app.post('/put',(req,res)=>{
    let jsonData =[];
    fs.readFile('file.json', 'utf8',(err,data)=>{
            jsonData=checkFileArray(data);
            if(jsonData===true){
            jsonData=[];
            }
            else{
            jsonData = JSON.parse(data);
            }
            jsonData.push(req.body);
            const jsonDatastring = JSON.stringify(jsonData, null, 2);
            fs.writeFile('file.json', jsonDatastring,(err)=>{
                if(err){
                    res.send("error occured");
                }
                else{
                    res.send("Pushed");
                }
            });
    });
});
function page(req,res){
    res.sendFile(path.join(__dirname, 'index.html'));
}
app.get('/',page);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
