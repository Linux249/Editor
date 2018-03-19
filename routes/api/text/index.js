import { Router } from "express"
const router = Router()

router.get('/text', async (req, res) => {

    const textId = 1
    try {
        const text = await req.db.collection('text').findOne({id: textId})
        //console.log({text})
        res.json(text)
    } catch(err) {
        // TODO proper error handling
        console.error(err)
        res.json(err)
    }
})

router.post('/text', async (req, res) => {
    // text id for finding this later
    console.log(req.body)
    const {body} = req
    console.log({body})
    const textId = 1
    try {
        const doc = {
            id: textId,
            text: req.body.text || "Not text while saving - report this please"
        }
        const text = req.body.text || "Not text while saving - report this please"
        console.log(doc)
        const { result } = await req.db.collection('text').updateOne({id: textId}, {$set: {text: text}}, {upsert: true})
        console.log(result)
        res.json(result)
    } catch(err) {
        res.json(err)
    }
})

export default router