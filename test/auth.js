const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
chai.use(chaiHttp)

// Agent that will keep track of your cookies
const agent = chai.request.agent(server)

const User = require('../models/user')

describe("User", function() {

    it("should not login if the user have not register", function(done) {
        agent.post('/login', {email: "wrong@wrong.com", password: 'nope'}).end(function(err, res) {
            res.status.should.equals(401)
            done()
        })
    })

    // Signup
    it('should be able to signup', function(done) {
        User.findOneAndRemove({ username: 'testone' }, function(){
            agent
                .post('/sign-up')
                .send({username: 'testone', password: 'password'})
                .end(function(err, res) {
                    console.log(res.body);
                    res.should.have.status(200)
                    agent.should.have.cookie('nToken')
                    done()
            })
        })
    })
    after(function() {
        agent.close()
    })
})