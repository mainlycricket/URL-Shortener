const URL = require('../model/URL')
const dns = require('dns')
const urlModule = require('url')

const createURL = async (req, res) => {

    const { url } = req.body

    if (verifyUrl(url, res)) {

        let currentURLCount = (await URL.find({})).length
    
        const createdURL = await URL.create({'url': url, 'id': ++currentURLCount})
    
        res.json({'original_url': url, 'short_url': createdURL.id})

    }


}

const redirectURL = async (req, res) => {

    const {id} = req.params

    const urlData = await URL.findOne({'id': id})

    urlData['url'] = urlData['url'].replace(/^(https:\/\/)|^(http:\/\/)/g, '')

    // res.json(urlData)
    res.status(301).redirect(`//${urlData['url']}`)
}


// other utility functions

const verifyUrl = (urlTemp, res) => {

    if (!urlTemp || !urlTemp.trim()) {
        return res.status(400).json({ error: 'Please provide an URL' })
    }

    const urlObj = urlModule.parse(urlTemp, true)

    dns.lookup(urlObj.host, function (err, addresses, family) {

        if (err) {
            console.log(err)
            return res.status(500).json({ urlTemp, success: false })
        }

        if (!addresses) {
            return res.status(400).json({ error: 'invalid url' })
        }

    })

    return true

}



module.exports = { createURL, redirectURL }