const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const greetings = require("../intents/greetings.js");

describe("Intents", () => {
  it("Check Greetings", () => {
    const expected = [
      "Hello!",
      "Hi :)",
      "Hey, nice to see you.",
      "Hi, how can I help you?"
    ];
    const actual = greetings();
    expect(actual).to.be.oneOf(expected);
  });
});
