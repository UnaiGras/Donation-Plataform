const { ethers, run, network } = require("hardhat")

async function main() {
    const FastPlugFactory = await ethers.getContractFactory(
      "FastPlug"
    )

    console.log("Deploying contract...")
    const FastPlug = await FastPlugFactory.deploy()
    await FastPlug.deployed()
    console.log(`Deployed contract to: ${FastPlug.address}`)
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
      await FastPlug.deployTransaction.wait(6)
      await verify(FastPlug.address, [])
    }
}

async function verify(contractAdress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
          address: contractAdress,
          constructorArgsParams: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
          console.log("Contract is verified.")
        } else {
          console.log(e)
        }
      }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })