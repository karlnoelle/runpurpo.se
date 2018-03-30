import passport from 'passport';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import env from '../../config/local.env';

export function setup(User, config) {
  passport.use(new TwitterStrategy({
    consumerKey: env.TWITTER_ID,
    consumerSecret: env.TWITTER_SECRET,
    callbackURL: env.DOMAIN + '/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done) {
    profile._json.id = `${profile._json.id}`;
    profile.id = `${profile.id}`;

    User.findOne({'twitter.id': profile.id}).exec()
      .then(user => {
        if(user) {
          return done(null, user);
        }

        user = new User({
          name: profile.displayName,
          username: profile.username,
          role: 'user',
          provider: 'twitter',
          twitter: profile._json
        });
        user.save()
          .then(savedUser => done(null, savedUser))
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }));
}
