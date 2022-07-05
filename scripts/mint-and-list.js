const {ethers} = require("hardhat");

const PRICE = ethers.utils.parseEther("0.1")

const mintAndList = async () => {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const basicNft = await ethers.getContract("BasicNFT")

    const mintTx = await basicNft.mintNft();
    const mintTxReceipt = await mintTx.wait(1);
    const tokenId = mintTxReceipt.events[0].args.tokenId
    console.log("Approving")
    const approvalTx = await basicNft.approve(nftMarketplace.address ,tokenId)
    await approvalTx.wait(1)
    const tx = await nftMarketplace.listItem(basicNft.address, tokenId, PRICE)
    await tx.wait(1)
    console.log("Listed")
}

mintAndList()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })