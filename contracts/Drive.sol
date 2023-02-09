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

    // Events
    event ImageAdded(string name, string imgUrl);
    event AccessGiven(address user, bool access);

    Image[] private imageArray;
    mapping(address => Image[]) private images;
    mapping(address => mapping(address => bool)) public ownerShip;
    mapping(address => Access[]) private accessList;
    mapping(address => mapping(address => bool)) public previousData;
    uint256 private dataId = 0;

    function addMedia(string memory _name, string memory _imgUrl) public {
        images[msg.sender].push(Image(dataId, _name, _imgUrl));
        imageArray.push(Image(dataId, _name, _imgUrl));
        dataId++;
        emit ImageAdded(_name, _imgUrl);
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
            emit AccessGiven(_user, true);
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
            emit AccessGiven(_user, false);
        }
    }

    function display(address _user) external view returns (Image[] memory) {
        require(
            msg.sender == _user || ownerShip[_user][msg.sender],
            "You don't have access!"
        );
        return images[_user];
    }

    function getAccessList() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }

    function getDataId() public view returns (uint256) {
        return dataId;
    }
}
