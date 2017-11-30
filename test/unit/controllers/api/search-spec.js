const expect = require('chai').expect;
const sinon = require('sinon');
const sampleTweet = require('../../../sample-tweet.json');

const SearchController = require('../../../../server/controllers/api/search');

describe('search controller', function() {

  describe('when q param is missing', function() {
    it('should return an error', async function() {
      const json = sinon.stub();
      const searchController = SearchController(null);
      await searchController({query: {}}, {json});
      expect(json.calledOnce).to.be.true;
      const payload = json.firstCall.args[0];
      expect(payload).to.not.be.null;
      expect(payload.error).to.equal('Missing required parameter `q`');
    });
  });

  describe('when twitter lib throws', function() {
    it('should return an error', async function() {
      const json = sinon.spy();
      const twitter = {
        search: sinon.stub().rejects('Error')
      };
      const searchController = SearchController(twitter);
      await searchController({query: {q:'keyword'}}, {json});
      expect(json.calledOnce).to.be.true;
      const resp = json.firstCall.args[0];
      expect(resp).to.not.be.null;
      expect(resp.error).to.be.an.instanceof(Error);
    });
  });

  describe('when twitter lib finds tweets', function() {
    it('should return an array of tweets', async function() {
      const json = sinon.spy();
      const twitter = {
        search: () => [sampleTweet]
      };
      const searchController = SearchController(twitter);
      await searchController({query: {q:'keyword'}}, {json});
      expect(json.calledOnce).to.be.true;
      const resp = json.firstCall.args[0];
      expect(resp).to.not.be.null;
      expect(resp).to.be.an.instanceof(Array);
      expect(resp.length).to.equal(1);
      expect(resp[0].id).to.equal(sampleTweet.id_str);
    });
  });

});