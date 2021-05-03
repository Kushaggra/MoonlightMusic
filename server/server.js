const express =require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/refresh', (req,res)=>{
    console.log('Token refreshed');
    const refreshToken = req.body.refreshToken
    const spotifyApi= new SpotifyWebApi({
        redirectUri : "http://localhost:3000",
        clientId: '',
        clientSecret: '',
        refreshToken
    })

    spotifyApi.refreshAccessToken().then(
    (data)=> {
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn
        })
    }).catch(()=>{
        res.sendStatus(400)
    })
})

app.post('/login', (req,res)=>{
    const code = req.body.code
    const spotifyApi= new SpotifyWebApi({
        redirectUri : "http://localhost:3000",
        clientId: '',
        clientSecret: ''
    })
    spotifyApi.authorizationCodeGrant(code)
    .then(data=>{
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    })
    .catch((err)=>{
        console.error(err)
        res.sendStatus(400)
    })
})

app.listen(3001)