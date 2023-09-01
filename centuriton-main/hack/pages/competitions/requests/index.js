import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Competition from "../../../ethereum/competition";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;

    const competition = Competition(address);
    const submissionCount = await competition.methods.submissionCount().call();

    const requests = await Promise.all(
      Array(parseInt(submissionCount))
        .fill()
        .map((element, index) => {
          return competition.methods.dataParticpants(index).call();
        })
    );

    console.log(requests);

    return { address, requests, submissionCount };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          submissionCount={this.props.submissionCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Submissions</h3>
        <Link route={`/competitions/${this.props.address}/requests/new`}>
          <a></a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Participant Address</HeaderCell>
              <HeaderCell>Data Sample</HeaderCell>
              <HeaderCell>Prediction</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Status</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
      </Layout>
    );
  }
}

export default RequestIndex;
