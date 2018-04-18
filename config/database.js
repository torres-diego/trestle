if(process.env.NODE_ENV === 'production'){
    module.exports = { mongoURI: 'mongodb://diegotorres:HUNT_park1@ds257627.mlab.com:57627/trestle-prod'}
} else {
    module.exports = { mongoURI: 'mongodb://localhost/trestle-devEnv'}
}