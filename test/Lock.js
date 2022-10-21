const { expect, assert } = require("chai");
const { ethers, network, deployments } = require("hardhat");



describe("FastPlug", function () {

  let fastPlugFactory, plug 
  const usdtadr = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
  

  beforeEach(async function () {
    accounts = await ethers.getSigners()
    fastPlugFactory = await ethers.getContractFactory(
      "FastPlug"
    )
    plug = await fastPlugFactory.deploy()
  });
    it("Constructor working correctly", async function () {
      owner = await plug.whosOwner()
      assert.notEqual(owner, 0)
      erc20 = await plug.whosErc20()
      assert.equal(erc20.toString(), usdtadr)
    });
})