import React, {useState, useEffect} from 'react';
import useAuth from '../useAuth';
import {Container, Form} from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import SongList from './SongList'
import SongPlayer from './SongPlayer';

const spotifyApi = new SpotifyWebApi({
    clientId: '56afc0de5cca4e72856d0075eeadbf96',
})


export default function Dashboard({code}){
    const accessToken = useAuth(code)
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] =useState([]);
    const [currentTrack, setCurrentTrack] = useState();
    

    function chooseTrack(track){
        setCurrentTrack(track);
        // setSearch('');
    }

    useEffect(()=>{
        if(!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    },[accessToken])
    
    useEffect(()=>{
        if(!search) return setSearchResult([]);
        if(!accessToken) return ;
        let cancelRequest = false;
        spotifyApi.searchTracks(search).then(res=>{
            if(cancelRequest) return;
            setSearchResult(res.body.tracks.items.map(track=>{
                //If smallest image is required then this.
                // const smallestAlbumImage = track.album.images.reduce((smallest,image)=>{
                //     if(image.height < smallest.height) return image;
                //     return smallest;
                // }, track.album.images[0])

                return{
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: track.album.images[1],
                }
            }))
        })
        return ()=> cancelRequest=true
    },[search, accessToken])

    return (
        <Container className="d-flex flex-column py-2" style={{ height:"100vh"}}>
          <header>
            <div className="overlay">
             <h1>Moonlight Music</h1>
		    </div>
          </header>
            <Form.Control 
                type='search' 
                placeholder='Search Songs/Artists' 
                value={search} 
                onChange={ e => setSearch(e.target.value)} 
            />
            <div className="row flex-grow-1 my-2 flex-row" style={{overflowY: "auto"}}>
                {searchResult.map(track => (
              
                    <SongList track={track} key={track.uri} chooseTrack ={chooseTrack}/>
              
                ))}
            </div>
            <div>
                <SongPlayer
                    accessToken={accessToken}
                    trackUri ={currentTrack?.uri}
                />
            </div>
        </Container>
    );
}