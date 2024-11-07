const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require("./Models/Employee")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const { MongoClient } = require("mongodb")

const app = express()
app.use(express.json())
app.use(cors(
    // {
    //     origin: ["https://hanelytics-visionsoft-frontend.onrender.com"],
    //     methods: ["GET", "POST"],
    //     credentials: true
    // }
))
app.use(cookieParser())




const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
        return res.json("The token was not available!")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) return res.json("Token is wrong!")
            next()
        })
    }
}

async function fetchData() {


}

app.get("/getInventoryData", async (req, res) => {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri)

    try {
        await client.connect()

        const database = client.db("database_of_inventory_details")
        const collection = database.collection("predicted_data")

        const allDocuments = await collection.find().toArray()
        return res.json(allDocuments)
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
})

app.get("/getRevenueData", async (req, res) => {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri)

    try {
        await client.connect()

        const database = client.db("revenue_dataset")
        const collection = database.collection("revenue_results")

        const allDocuments = await collection.find().toArray()
        return res.json(allDocuments)
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
})

app.get("/getEquipmentData", async (req, res) => {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri)

    try {
        await client.connect()

        const database = client.db("Equipment_Data_With_Random_Regressor")
        const collection = database.collection("predicted_cycles")

        const allDocuments = await collection.find().toArray()
        return res.json(allDocuments)
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
})

app.get("/getClinicalData", async (req, res) => {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri)

    try {
        await client.connect()

        const database = client.db("clinical_data")
        const collection = database.collection("predicted_clinical_data")

        const allDocuments = await collection.find().toArray()
        return res.json(allDocuments)
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
})

app.get("/home", verifyUser, (req, res) => {
    return res.json("Successful")
})

app.get("/logout", (req, res) => {
    res.clearCookie("token")
    return res.json("Logout Successful!")
})

app.post("/login", (req, res) => {
    const { email, password } = req.body
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email }, "jwt-secret-key", { expiresIn: "1d" })
                        res.cookie("token", token)
                        // localStorage.setItem("Token", token)
                        res.json("Login Successful!")
                    }
                    else {
                        res.json("Password is Incorrect.")
                    }
                })
            } else {
                res.json("User doesn't exist, Register and try Login again!")
            }
        })
})

app.post('/register', (req, res) => {

    const { name, email, password } = req.body
    bcrypt.hash(password, 10)
        .then(hash => {
            EmployeeModel.create({ name, email, password: hash })
                .then(employees => res.json(employees))
                .catch(err => res.json(err))
        }).catch(err => console.log(err.message))

})

app.get("/", (req, res) => {
    res.send("API is Working");
})

const port = 3002;

// mongodb+srv://chandaluri210:R7032318398r@cluster0.ik42i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const connectToMongoDB = async () => {

    await mongoose.connect("mongodb://127.0.0.1:27017/Visionsoft")
        .then(() => {
            console.log("Connected to MongoDB is Successful!")
        }).catch((err) => {
            console.log(err)
        })
    app.listen(port, () => {
        console.log(`Server is started on http://localhost:${port}`)
    })
}

connectToMongoDB()