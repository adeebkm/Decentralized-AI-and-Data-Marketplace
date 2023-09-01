import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Competition from "../ethereum/competition";
import { Router } from "../routes";
import competition from "../ethereum/competition";

class RequestRow extends Component {
  constructor(props) {
    super(props);
    this.state = {flag: 0};
  }

  
  onApprove = async () => {
    const competition = Competition(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await competition.methods.approveData(this.props.id).send({
      from: accounts[0],
    });
    Router.replaceRoute(`/competitions/${this.props.address}`);
  };


  onFinalize = async () => {
    const competition = Competition(this.props.address);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0])

    await competition.methods.evaluateData(this.props.id).send({
      from: accounts[0],
      value: '1000'
    });
    Router.replaceRoute(`/competitions/${this.props.address}`);

    this.setState({flag:1})
  };

  

  render() {
    const { Row, Cell } = Table;
    const { id, request, submissionCount } = this.props;

    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{request.participant}</Cell>
        <Cell> <img src={request.data} alt="images" width="100" /></Cell>
        <Cell style={{textAlign:"Center"}}>{request.datalabel}</Cell>
        <Cell>
          {request.approvalCount}/{submissionCount}
        </Cell>

        {request.status ? (
       <Cell>Approved</Cell>
      ) : 
      (
          this.state.flag ==1 ?       <Cell>Rejected</Cell>
          : <Cell>Ongoing</Cell>
          
      )}
    

       
        <Cell>
          <Button color="green" basic onClick={this.onApprove}>
            Approve
          </Button>
        </Cell>
        <Cell>
          <Button color="teal" basic onClick={this.onFinalize} >
            Finalize
          </Button>
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
