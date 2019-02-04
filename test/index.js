const app = require('../server')
const chai = require('chai')
const chatHttp = require('chai-http')
const should = chai.should()

chai.use(chatHttp)

describe('site', function () {
    // Describe what you are testing
    it("Should have home page", function (done) {
        // Describe what should happen //#endregion
        // In this case we test that the home page loads
    chai
    .request(app)
    .get('/')
    .end(function(err, res) {
        if (err) {
            return done(err)
        }
        res.status.should.be.equal(200)
        return done(); // Call done if the test completed sucessfully
        })
    })
})

module.exports = app 