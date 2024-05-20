import express from "express";
import { request } from "http";
const app = express();
const PORT = 9090;
app.use(express.json());

//Initialize data
const hallData =[
    {
        id:"1",
        numberofSeats: 100,
        additionalItems: ["AC","chairs","discolights"],
        price: 15000,
        ifBooked: "true",
        customerName: "vijay",
        date: "15-may-2024",
        startTime: "20-may-2024 at 12PM",
        endTime: "21-may-2024 at 11am",
        RoomNo: 1,
        RoomName: "Duplex",
    },
    {
        id:"2",
        numberofSeats: 100,
        additionalItems: ["AC","chairs","discolights"],
        price: 15000,
        ifBooked: "false",
        customerName: "",
        date: "",
        startTime: "",
        endTime: "",
        RoomNo: 2,
        RoomName: "Duplex",
    },
    {
        id:"3",
        numberofSeats: 50,
        additionalItems: ["AC","chairs"],
        price: 8000,
        ifBooked: "false",
        customerName: "",
        date: "",
        startTime: "",
        endTime: "",
        RoomNo: 3,
        RoomName: "Classic",
    },
    {
        id:"4",
        numberofSeats: 100,
        additionalItems: ["AC","chairs","discolights"],
        price: 15000,
        ifBooked: "true",
        customerName: "Virat",
        date: "16-may-2024",
        startTime: "22-may-2024 at 12PM",
        endTime: "23-may-2024 at 11am",
        RoomNo: 4,
        RoomName: "Duplex",
    },
    {
        id:"5",
        numberofSeats: 200,
        additionalItems: ["AC","chairs","discolights", "buffet"],
        price: 20000,
        ifBooked: "true",
        customerName: "Ronaldo",
        date: "20-may-2024",
        startTime: "25-may-2024 at 12PM",
        endTime: "26-may-2024 at 11am",
        RoomNo: 5,
        RoomName: "Suite",
    },
];

//get request

app.get("/hall-details", (request, response) => {

    const {ifBooked, numberofSeats } = request.query;
    console.log(request.query,ifBooked);
    console.log(request.query,numberofSeats);
    let filteredHall = hallData;
    if(ifBooked) {
        filteredHall=filteredHall.filter((halls)=> halls.ifBooked === ifBooked);
    }
    if(numberofSeats) {
        filteredHall=filteredHall.filter((halls)=> halls.numberofSeats >= +numberofSeats);
    }
    response.send(filteredHall);
})

//get Id

app.get("/hall-details/:id",(request, response) => {

    const { id } =request.params;
    console.group(id);

    const halls = hallData.find((hall) => hall.id === id);
    response.send(halls);
});

//posting new hall

app.post("/hall-details", (req,res) => {
    const newHall = {
        id: hallData.length+1,
        numberofSeats: req.body.numberofSeats,
        additionalItems: req.body.additionalItems,
        price: req.body.price,
        RoomNo: req.body.RoomNo,
    };
    hallData.push(newHall);
    res.send(newHall);
});


//updating not booked new hall
app.put("/hall-details/:id",(req, res) => {
    const {id} = req.params;
    const halls = hallData.find((hall) => hall.id === id);

    if (halls.ifBooked === "true") {
        res.status(400).send("sorry, This room is already booked");
        return;
    } else halls.customerName=req.body.customerName;
    halls.date = req.body.date;
    halls.startTime = req.body.startTime;
    halls.endTime = req.body.endTime;
    res.send(halls);
});

//delivering the port address

app.listen(PORT, () => {
    console.log(`Server started in PORT : ${PORT}
      listening in http://localhost:${PORT}`);
  });
