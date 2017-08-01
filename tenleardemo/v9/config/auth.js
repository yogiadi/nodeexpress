module.exports = {  
  facebookAuth: {
    clientID: 'YOUR-FB-CLIENT-ID',
    clientSecret: 'YOUR-FB-CLIENT-SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
  },
  twitterAuth: {
    consumerKey: 'YOUR-TWITTER-CONSUMER-KEY',
    consumerSecret: 'YOUR-TWITTER-CONSUMER-SECRET',
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
  },
  //project name - tenleardemo
  //cliend id -tenleardemo
  
  googleAuth: {
    // clientID: '1057910514863-kjknpua2o2bmtf7oj1td7jgua0sglaos.apps.googleusercontent.com',
    clientID: '1057910514863-00g0jks59a3ntghfuv4el6t9to2rttvp.apps.googleusercontent.com',
    // clientSecret: 'X33AcrynlnDmrIrJ72sBjrpU',
      clientSecret: 'o_8my8TGjBzBKi0MBeI85L4K',
    // callbackURL: 'https://webdevbootcamp-yogiadi.c9users.io/google/callback/',
    callbackURL: 'https://nameless-coast-84682.herokuapp.com/google/callback/',
  },
};