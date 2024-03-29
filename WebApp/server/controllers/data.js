'use strict'

const db = require('../database/database')

//GET 

const getPlaylists = (request, response) =>{
    db.query('CALL get_playlists_list', (error, results)=>{
        if(error){
            console.log(error);
        }
        else{
            response.status(200).json(results)
        }
    })
}

const getSongsByPlaylist = (request, response) =>{

    let sql = "CALL get_songs_by_playlistId(?)"

    db.query(sql, request.params.id, (error, results)=>{
        if(error){
            throw error
        }
        else{
            response.status(200).json(results)
        }
    })
}


const getSongs = (request, response) =>{
    
    db.query("CALL get_songs_user(?)", request.params.id, (error, results)=>{
        if(error){
            throw error;
        }
        else{
            response.status(200).json(results);
        }
    })
}



//POST

const createPlaylist = (request, response) =>{
    let data = request.body;

    db.query("INSERT INTO tb_playlists SET ?", [data], (error,results)=>{
        if(error){
            response.send(error);
        }
        else{
            response.status(200).json(results);
        }
    });

}


const insertSong = (request, response) =>{
    let data = request.body;

    db.query("INSERT INTO tb_musics_playlists SET ?", [data], (error,results)=>{
        if(error){
            response.send(error);
        }
        else{
            response.status(200).json(results);
        }
    });

}

/*
EXEMPLE DE REQUETE FINALE avec express validator


const insertStudent = (request,response,next)=>{
    const data = request.body;


    try{
        const errors = validationResult(request);

        if(!errors.isEmpty()){
            return response.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        
        dataStudent(data,(err,results)=>{
            if(err){
                response.send(err);
            }
            else{
                response.status(200).json(results);
            }
        });

    }

    catch(error){
        console.log(error);
        next(error);
    }

}

*/



module.exports = {
    getPlaylists,
    createPlaylist,
    insertSong,
    getSongsByPlaylist,
    getSongs
}