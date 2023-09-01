import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Competition from "../ethereum/competition";
import web3 from "../ethereum/web3";
import { Link } from "../routes";
import S3 from 'react-aws-s3';


import { create } from 'ipfs-http-client'
const projectId = '2G821LGudGM2c8B36WGrJUcmFwB';
const projectSecret = '21ca10b8ce3bcb0b556832bebb150eee';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

class ContributeDataForm extends Component {
  state = {
    value: "",
    loading: false,
    minimimPayment: "",
    labelField: "",
    fileSampleData: null,
    urlArrSampleData: [],
  };
  static async getInitialProps(props) {
    const competition = Competition(this.props.address);
    this.state.minimimPayment =
      (await competition.methods.minimumPayment().call()) + 100;
  }

  retrieveFileSampleData = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      console.log("Buffer data: ", Buffer(reader.result));
      this.setState({ fileSampleData: Buffer(reader.result) });
    };
    e.preventDefault();
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    console.log(this.props.address);

    const competition = Competition(this.props.address);
    try {
      


      let urlImage = ''
      let result =await client.add(this.state.fileSampleData)
  .then(result => {
    console.log("w"+result.path);
    urlImage= 'https://ml.infura-ipfs.io/ipfs/'+ result.path;


  });
  console.log(urlImage)

      const accounts = await web3.eth.getAccounts();
      await competition.methods.submitData("0", urlImage, this.state.labelField).send({
        from: accounts[0],
        value: "105",
      });
    } catch (err) {
      console.log("Error",err);
    }
    this.setState({ loading: false });

  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Upload Data Sample</label>
          <Input
            onChange={this.retrieveFileSampleData}
            label="data"
            type="file"
            labelPosition="right"
          />
        </Form.Field>
        <Form.Field>
          <label>Label </label>
          <Input
            value={this.state.labelField}
            onChange={(event) =>
              this.setState({ labelField: event.target.value })
            }
            label="data"
            labelPosition="right"
          />
        </Form.Field>
        <Button loading={this.state.loading} primary>Contribute!</Button>
      </Form>
    );
  }
}

export default ContributeDataForm;
