const http = require('http');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {expect} = chai;
const sampleTweet = require('../sample-tweet.json');

chai.use(chaiHttp);

const App = require('../../server/app');

const twitter = {
  search: q => Promise.resolve([sampleTweet])
};

describe('app', function() {

  const server = http.createServer(App(twitter));
  const request = chai.request(server);

  after(done => server.close(done));

  describe('/search/api', function() {

    describe('when q is given', function() {
      it('should return tweets payload', function(done) {
        request
          .get('/api/search')
          .query({q: 'nodejs'})
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.instanceof(Array);
            expect(res.body[0].id).to.equal(sampleTweet.id_str);
            done();
          });
      });
    });

    describe('when q is missing', function() {
      it('should return error payload', function(done) {
        request
          .get('/api/search')
          .query({})
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.error).to.equal('Missing required parameter `q`');
            done();
          });
      });
    });

  });

  describe('invalid route', function() {
    it('should return 404', function(done) {
      request
        .get('/api/bogus')
        .query({q: 'nodejs'})
        .end((err, res) => {
          expect(err).to.be.not.null;
          expect(res).to.have.status(404);
          done();
        });
    });
  });

});