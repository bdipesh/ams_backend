module.exports = {
    secret: 'thisistestkey',
    optionsForDatabase: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false
    },
    url: 'mongodb://localhost:27017/amsdev'
};