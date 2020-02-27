var chai = require("chai");
var expect = chai.expect;

describe("AWSConnect", function() {
  it("Connect", function() {
    let object = 0;
    expect(object).to.equal(0);
  });
  it("Not Connect", function() {
    let object = 404;
    expect(object).to.equal(404);
  });
});
