const express = require('express')
const cors = require('cors')
const path = require('path')

const db = require('./db')

const app = express()
const port = process.env.PORT || 3002

const agentPasses = {
    'sova': 'hunter',
    'omen': 'dead',
    'sage': 'wall',
    'yoru': 'tp',
    'OTHER': 'pass'
}

async function setup() {

    app.use(cors({ origin: '*' }))
    app.use(express.json({limit: '50mb'}))

    app.post('/setAdditionalData', (req, res) => {
        const { source, agent, map, videoUrl, key, value } = req.body
        const success = db.setAdditionalData(source, agent, map, videoUrl, key, value)
        res.json({ success })
    })

    app.get('/reloadcache', (req, res) => {
        const success = db.reloadCache()
        res.json({ success })
    })

    app.get('/lineups', (req, res) => {
        res.json(db.cache.lineups)
    })

    app.get('/mapNames', (req, res) => {
        res.json(db.cache.mapNames)
    })

    app.get('/abilities', (req, res) => {
        res.json(db.cache.abilities)
    })

    app.post('/agentPassValidator', (req, res) => {
        const { agent, value } = req.body

        if (agentPasses.hasOwnProperty(agent)) {
            res.json({ success: agentPasses[agent] === value })
        }
        else {
            res.json({ success: agentPasses['OTHER'] === value })
        }
    })

    app.post('/markFavorite', (req, res) => {
        const { source, agent, map, videoUrl, favorite, agentFavPass } = req.body

        if (agentPasses.hasOwnProperty(agent)) {
            if (agentPasses[agent] !== agentFavPass) return res.json({ success: false })
        }
        else {
            if (agentPasses['OTHER'] !== agentFavPass) return res.json({ success: false })
        }

        const success = db.markFavorite(source, agent, map, videoUrl, favorite)
        res.json({ success })
    })

    db.reloadCache()

    app.listen(port, () => {
        console.log(`Valo server listening on port ${port}`)
    })
}

setup()