const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Drive", () => {
  let drive;
  let deployer, user1, user2, user3;

  beforeEach(async () => {
    const Drive = await ethers.getContractFactory("Drive");
    drive = await Drive.deploy();
    await drive.deployed();
    [deployer, user1, user2, user3] = await ethers.getSigners();
  });

  describe("Add Media", async () => {
    beforeEach(async () => {
      await drive.addMedia("Jerry", "Jerry257-url");
    });

    it("Should match the ImageId", async () => {
      const result = await drive.getDataId();
      expect(result.toString()).to.be.equal("1");
    });

    it("Should Match the username", async () => {
      const result = await drive.display(await deployer.address);
      expect(result[0].name).to.be.equal("Jerry");
    });

    it("Should Math the ImageUrl", async () => {
      const result = await drive.display(await deployer.address);
      expect(result[0].imgUrl).to.be.equal("Jerry257-url");
    });
  });

  describe("Give Access", async () => {
    beforeEach(async () => {
      await drive.giveAccess(await user1.address);
    });
    it("Ownership should be true", async () => {
      const result = await drive.ownerShip(
        await deployer.address,
        await user1.address
      );
      expect(result).to.equal(true);
    });

    it("Should be equal to the user1 address", async () => {
      const result = await drive.getAccessList();
      expect(result[0].user).to.equal(await user1.address);
    });

    it("Access should be true", async () => {
      const result = await drive.getAccessList();
      expect(result[0].access).to.equal(true);
    });

    it("Should be equal to true", async () => {
      const result = await drive.previousData(
        await deployer.address,
        await user1.address
      );
      expect(result).to.be.equal(true);
    });
  });

  describe("Remove Access", async () => {
    beforeEach(async () => {
      await drive.removeAccess(await user1.address);
    });

    it("Ownership should be false", async () => {
      const result = await drive.ownerShip(
        await deployer.address,
        await user1.address
      );
      expect(result).to.equal(false);
    });

    it("Should be equal to false", async () => {
      const result = await drive.previousData(
        await deployer.address,
        await user1.address
      );
      expect(result).to.be.equal(false);
    });
  });
});
