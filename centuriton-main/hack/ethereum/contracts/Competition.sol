pragma solidity ^0.4.17;

contract CompetitionFactory {
    address[] public deployedCompetitions;

    function createCompetition(uint256 minimum,string name,string description, string sampleData,string model) public payable {
       address newCompetition = new Competition(minimum,name,description,sampleData,model, msg.sender);
        deployedCompetitions.push(newCompetition);
    }

    function getDeployedCompetitions() public view returns (address[]) {
        return deployedCompetitions;
    }
}

contract Competition {

    struct DataSubmission {
        address organizer;
        mapping(address => bool) approvals;
        string data;
        string datalabel;
        uint approvalCount;
        string participantId;
        bool status;
        address participant;
        uint payment;
    }

    struct ModelSubmission {
        address organizer;
        string model;
        string participantId;
        address participant;
        uint accuracy;
    }

    address public organizer;
    uint public minimumPayment;
    uint public initialDeposit;
    string public name;
    string public description;
    string public sampleData;
    string public evalFunc;

    //count of participants 
    uint public submissionCount;
    //Participants of the competition who participate by submitting a model 
    ModelSubmission[] public modelParticipants;
   
    //Participants of the competition who participate by submitting data samples
    DataSubmission[] public dataParticpants;


    modifier restricted() {
        require(msg.sender == organizer);
        _;
    }

    function Competition(uint minimum,string n, string d, string s, string m,  address creator) public   {
        organizer = creator;
        minimumPayment = minimum;
        name = n;
        description = d;
        sampleData = s;
        evalFunc = m;
        initialDeposit = 100;
        submissionCount = 0 ;
    }
    
    function submitModel(string participantId, string model) public {
        ModelSubmission memory newModelSubmission = ModelSubmission({
            organizer: organizer,
            model: model,
            participantId: participantId,
            participant: msg.sender,
            accuracy: 0
            });
       
        submissionCount++;
        modelParticipants.push(newModelSubmission);
    }

    function submitData(string participantId, string data, string datalabel) public payable {
        require(msg.value > minimumPayment);
        DataSubmission memory newDataSubmission = DataSubmission({
            organizer: organizer,
            data: data,
            datalabel: datalabel,
            participantId: participantId,
            approvalCount: 0,
            participant: msg.sender,
            status: false,
            payment: msg.value
            });
        submissionCount++;
     //   newDataSubmission.organizer.transfer(msg.value);
        dataParticpants.push(newDataSubmission);
    }

    function approveData() public  {
        DataSubmission storage submission = dataParticpants[index];
        require(!submission.approvals[msg.sender]);
        submission.approvals[msg.sender] = true;
        submission.approvalCount++;
    }    


        function requestData() public payable {

        }

    function evaluateData(uint index) public payable restricted  {
        DataSubmission storage submission = dataParticpants[index];
        require(!submission.status);
        if( submission.approvalCount > (submissionCount / 2)){
            submission.status = true;
            submission.participant.transfer(submission.payment+1000);
        }
        else if(submission.approvals[organizer]){
            submission.status = true;
            submission.participant.transfer(submission.payment+1000);
        }
        
    }

    function getSummary() public view returns (
      uint, uint, uint, address, string, string, string, string
      ) {
        return (
            initialDeposit,
            address(this).balance,
            submissionCount,
            organizer,
            name,
            description,
            sampleData,
            evalFunc
        );
    }
}

