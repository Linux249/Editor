import { Router } from "express"
const router = Router()

router.get('/text', async (req, res) => {

    const textId = 1
    try {
        const text = await req.db.collection('text').findOne({id: textId})
        res.json(text)
    } catch(err) {
        // TODO proper error handling
        res.json(err)
    }
})

router.post('/text', async (req, res) => {
    // text id for finding this later
    const textId = 1
    try {
        const doc = {
            id: textId,
            text: req.body.text || "Not text while saving - report this please"
        }
        const text = req.body.text || "Not text while saving - report this please"
        const { result } = await req.db.collection('text').updateOne({id: textId}, {$set: {text: text}}, {upsert: true})
        res.json(result)
    } catch(err) {
        // TODO proper error handling
        res.json(err)
    }
})

export default router