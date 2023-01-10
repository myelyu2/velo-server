const { readFileSync, writeFileSync } = require('fs')

class Database {
    cache = {
        mapNames: ['any', 'ascent', 'bind', 'breeze', 'fracture', 'haven', 'icebox', 'pearl', 'split'],
        abilities: {
            'astra': ['Gravity_Well', 'Nebula_Dissipate', 'Nova_Pulse', 'Cosmic_Divide'],
            'breach': ['Aftershock', 'Fault_Line', 'Flashpoint', 'Rolling_Thunder'],
            'brimstone': ['Sky_Smoke', 'Incendiary', 'Orbital_Strike'],
            'chamber': ['Trademark', 'Rendezvous'],
            'cypher': ['Trapwire', 'Spycam', 'Cyber_Cage'],
            'fade': ['Seize', 'Prowler', 'Haunt', 'Nightfall'],
            'harbor': ['Reckoning', 'High_Tide', 'Cove', 'Cascade'],
            'kayo': ['Zero_Point', 'Frag_Ment', 'Flash_Drive'],
            'killjoy': ['Turret', 'Nanoswarm', 'Lockdown', 'Alarmbot'],
            'neon': ['Relay_Bolt', 'Fast_Lane'],
            'omen': ['Shrouded_Step', 'Paranoia', 'Dark_Cover'],
            'phoenix': ['Hot_Hands'],
            'raze': ['Paint_Shells', 'Boom_Bot'],
            'sage': ['Slow_Orb', 'Barrier_Orb'],
            'sova': ['Shoc_Bolt', 'Recon_Bolt', 'Owl_Drone', 'Hunters_Fury'],
            'viper': ['Vipers_Pit','Toxic_Screen', 'Snake_Bite', 'Poison_Cloud'],
            'yoru': ['Blindside', 'Fakeout', 'Gatecrash'],
        },
        lineups: {}
    }

    setAdditionalData(source, agent, map, videoUrl, key, value) {
        try {
            this.cache.lineups[source][agent][map][videoUrl][key] = value
            writeFileSync(__dirname + '/db.json', JSON.stringify(this.cache, null, 4))
            return true
        }
        catch(e) {
            console.error('Error setAdditionalData', source, agent, map, videoUrl, e)
            return false
        }
    }

    reloadCache() {
        this.cache.lineups = this.getLineups()
    }

    getLineups() {
        const db = JSON.parse(readFileSync(__dirname + '/db.json'))
        return db.lineups
    }

    markFavorite(source, agent, map, videoUrl, favorite) {
        try {
            this.cache.lineups[source][agent][map][videoUrl].favorite = favorite
            writeFileSync(__dirname + '/db.json', JSON.stringify(this.cache, null, 4))
            return true
        }
        catch(e) {
            console.error('Error marking favorite', source, agent, map, videoUrl, e)
            return false
        }
    }
}

module.exports = new Database()