pragma solidity ^0.5.0;

contract AdvancedStorage{

    uint[] public ids;

    
    function add(uint id) public {
        ids.push(id);    
    } 
    
    function get(uint position) view public returns(uint){ // simple types no need to specify memory location
        return ids[position];
    }
    
    function getAll()view public returns(uint[] memory){ // complex types of returns need to specify memory location
        return ids;
    }
    
    function length()view public returns(uint){
        return ids.length;
    }

}