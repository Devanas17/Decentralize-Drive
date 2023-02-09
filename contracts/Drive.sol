// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

contract Drive {
    struct Image {
        uint256 id;
        string name;
        string imgUrl;
    }

    struct Access {
        address user;
        bool access;
    }

    Image[] public imageArray;
    mapping(address => Image[]) public images;
    mapping(address => mapping(address => bool)) public ownerShip;
    mapping(address => Access[]) public accessList;
    mapping(address => mapping(address => bool)) previousData;
    uint256 dataId = 0;

    function addMedia(string memory _name, string memory _imgUrl) public {
        images[msg.sender].push(Image(dataId, _name, _imgUrl));
        imageArray.push(Image(dataId, _name, _imgUrl));
        dataId++;
    }

    function giveAccess(address _user) external {
        if (!ownerShip[msg.sender][_user]) {
            ownerShip[msg.sender][_user] = true;
            if (previousData[msg.sender][_user]) {
                for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
                    if (accessList[msg.sender][i].user == _user) {
                        accessList[msg.sender][i].access = true;
                        break;
                    }
                }
            } else {
                accessList[msg.sender].push(Access(_user, true));
                previousData[msg.sender][_user] = true;
            }
        }
    }

    function removeAccess(address _user) external {
        if (ownerShip[msg.sender][_user]) {
            ownerShip[msg.sender][_user] = false;
            for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == _user) {
                    accessList[msg.sender][i].access = false;
                    break;
                }
            }
        }
    }
}
