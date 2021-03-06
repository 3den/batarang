var chai = require('chai');
var expect = chai.expect;
var ROOT = '../';

var createUrl = require(ROOT + 'createUrl');

describe('createUrl', function () {
  const params = {id: 1, team_id: 2};
  const query = {page: 1, sort: 'name'};
  const urlPattern = 'https://api.com/users/:id/teams/:team_id';

  it('sets the path params only', function () {
    expect(createUrl(urlPattern, {params: params})).to.deep.equal(
      'https://api.com/users/1/teams/2'
    );
  });

  it('sets the query params only', function () {
    expect(createUrl(urlPattern, {query: query})).to.deep.equal(
      'https://api.com/users/:id/teams/:team_id?page=1&sort=name'
    );
  });

  it('sets the path and query params', function () {
    expect(createUrl(urlPattern, {params: params, query: query})).to.deep.equal(
      'https://api.com/users/1/teams/2?page=1&sort=name'
    );
  });

  it('uses custom config for query string', function () {
    const config = {
      query: {arrayFormat: 'bracket'}
    };

    expect(
      createUrl(urlPattern, {
        params: params,
        query: {foo: [1,2,3]}
      }, config)
    ).to.deep.equal(
      'https://api.com/users/1/teams/2?foo[]=1&foo[]=2&foo[]=3'
    );
  });

  it('skip encoding for params and query', function () {
    const config = { encode: false };

    expect(
      createUrl('/user/:id(.*)', {
        params: { id: 'foo/b$a' },
        query: {back: 'http://back.com'}
      }, config)
    ).to.deep.equal(
      '/user/foo/b$a?back=http://back.com'
    );
  });

  it('keeps encoding by default', function () {
    expect(
      createUrl('/user/:id(.*)', {
        params: { id: 'foo/b$a' },
        query: {back: 'http://back.com'}
      })
    ).to.deep.equal(
      '/user/foo%2Fb%24a?back=http%3A%2F%2Fback.com'
    );
  });
});
