const PORT = 3000
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
require('dotenv').config()

const {GoogleGenerativeAI} = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY)

app.post('/gemini', async(req, res) => {
    console.log(req.body.history)
    console.log(req.body.message)
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})

    const chat = model.startChat({
        history: req.body.history,

    })

    const msg = req.body.message

    const result = await model.generateContent(msg)
    const text = result.response.text()
    res.send(text)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))