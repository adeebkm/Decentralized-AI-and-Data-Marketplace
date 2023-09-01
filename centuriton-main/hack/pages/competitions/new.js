import React, { Component } from "react";
import { Form, Button, Input, Message, Dropdown,Select, TextArea,Image,Radio, Segment, Container} from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

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
class CompetitionNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false,
    label: "",
    name: "",
    description: "",
    fileSampleData: null,
    fileEvalFunction: null,
    urlArrSampleData:"",
    urlArrEvalFunction:"",
  };

 
  
  onSubmit = async (event) => {
    
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    try {

      let urlImage = ''
      let result =await client.add(this.state.fileSampleData)
  .then(result => {
    console.log("w"+result.path);
    urlImage= 'https://ml.infura-ipfs.io/ipfs/'+ result.path;
    this.setState({ urlArrSampleData:urlImage});
    console.log(urlImage)

  });
console.log(result)

  let urlFunc = ''
  let result2 = await client.add(this.state.fileEvalFunction)
  .then(result => {
    console.log(result.path);
    urlFunc= 'https://ml.infura-ipfs.io/ipfs/'+ result.path;
    this.setState({ urlArrEvalFunction:urlFunc});
  });




  console.log("Ss"+urlImage,urlFunc)

      try {
        const accounts = await web3.eth.getAccounts();
        console.log("loggg it"+ this.state.urlArrSampleData+this.state.urlArrEvalFunction)

        await factory.methods
          .createCompetition(this.state.minimumContribution, this.state.name, this.state.description, this.state.urlArrSampleData ,this.state.urlArrEvalFunction)
          .send({
            value: "100",
            from: accounts[0],
          });
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      
    } catch (error) {
      console.log(error.message);
    }
    this.setState({ loading: false });
  };

  retrieveFileSampleData = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      console.log("Buffer data: ", Buffer(reader.result));
      this.setState({ fileSampleData: Buffer(reader.result)})
    }
    e.preventDefault();  
  }

  retrieveFileEvalFunction = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);


    reader.onloadend = () => {
      console.log("Buffer data: ", Buffer(reader.result));
      this.setState({ fileEvalFunction: Buffer(reader.result)})
    }

    e.preventDefault();  
  }

   state = {}
  handleChange = (e, { value }) => this.setState({ value })
  
  render() {
    return ( 
       
      <Layout style={{ background:"#481a58"}}>
        <Container style={{background:"#481a58",width:"100%",padding:"50px 50px 50px 50px"}}> 
        <Segment raised style={{maxWidth: "15 rem",margin:"0 200px 200px 200px",background:"#EFF5F5"}}>
         <Form style={{ padding:"20px"}}>
          <h2><font color="#481a58">Create Project</font></h2>
           <Form.Field>
            <label><h4>Name</h4></label>
            <Input
              placeholder="Name of the Service"
              type="text"
              onChange={this.retrieveFileSampleData}
              />
            </Form.Field>
            <Form.Field>
            <label><h4>Description</h4></label>
              <Input
                placeholder="Description of the Service"
                type="textarea"
                onChange={this.retrieveFileSampleData}
              />
            </Form.Field> 
            
            <Form.Field>
              <label><h4>Upload Service Banner</h4></label>
              <Input
                label="Image"
                labelPosition="right"
              type="file"
              onChange={this.retrieveFileSampleData}
              />
          </Form.Field>
    <Form.Group widths={2}>
      <Form.Field>
            <label><h4>Accuracy</h4></label>
            <Input
              label="Percentage"
              labelPosition="right"
              type="number"
              onChange={this.retrieveFileSampleData}
              />
          </Form.Field>
    <Form.Field>
            <label><h4>Upload Inference Function</h4></label>
            <Input label="model" labelPosition="right" type="file"  onChange={this.retrieveFileEvalFunction} />
          </Form.Field>
  </Form.Group>  
      
        <Form.Field>
            <label><h4>Deposit number</h4></label>
            <Input
              label="wei"
              labelPosition="right"
              type="number"
              onChange={this.retrieveFileSampleData}
              />
          </Form.Field>

        <Form.Group>
        <Form.Field>
          <h4>Selected value: <font color="blue"><b>{this.state.value}</b></font></h4>
        </Form.Field>
        <Form.Field>
          <Radio
            label='Image'
            name='radioGroup'
            value='Image'
            checked={this.state.value === 'Image'}
            onChange={this.handleChange}
            />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Text'
            name='radioGroup'
            value='Text'
            checked={this.state.value === 'Text'}
            onChange={this.handleChange}
            />
        </Form.Field>
        </Form.Group>
        <Form.Field>
            <label><h4>Upload Sample Data</h4></label>
            <Input
              label="Sample Data"
              labelPosition="right"
              type="file"
              onChange={this.retrieveFileSampleData}
              />
          </Form.Field>

        <Form.Field>
            <label><h4>Deposit number</h4> </label>
            <Input
              label="wei"
              labelPosition="right"
              type="number"
              onChange={this.retrieveFileSampleData}
              />
          </Form.Field>

        <Button loading={this.state.loading} primary>
            Create!
            </Button>
            <br /> <br /> <br /> 
        
          
    {/* <Form>
      <Input
      icon='tags'
      iconPosition='left'
      label={{ tag: true, content: 'Add Tag' }}
      labelPosition='right'
      placeholder='Enter tags'
      />
      <Form.Field
      id='form-button-control-public'
      control={Button}
      content='Add Tag'
      
      />
    </Form> */}
  </Form>




        {/* <p>
        A project is a collaborative environment where AI businesses can offer encrypted Machine Learning services, and crowdsource data and models.
        </p>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <br />
        <Form.Field>
        <label>Name</label>
        <Input
        labelPosition="right"
        value={this.state.name}
        onChange={(event) => this.setState({ name: event.target.value })}
        />
        </Form.Field>
        <Form.Field>
        <label>Description</label>
        <Input
        labelPosition="right"
        value={this.state.description}
        onChange={(event) =>
          this.setState({ description: event.target.value })
        }
        />
        </Form.Field>
        <Form.Field>
        <label>Reward Funds</label>
        <Input
        label="wei"
        labelPosition="right"
        value={this.state.minimumContribution}
        onChange={(event) =>
          this.setState({ minimumContribution: event.target.value })
        }
        />
        </Form.Field>
        <br /> <br />
        <Form.Field>
        <label>Upload Example Data</label>
        <Input
        label="data"
        labelPosition="right"
          type="file"
          onChange={this.retrieveFileSampleData}
          />
          </Form.Field>
          
          <br /> <br />
          <Form.Field>
          <label>Upload Inference Function</label>
          <p>
          </p>
          <Input label="model" labelPosition="right" type="file"  onChange={this.retrieveFileEvalFunction} />
          </Form.Field>
        <br /> */}
          {/* <Message error header="Oops!" content={this.state.errorMessage} /> */}
          
          {/* </Form> */} 
        </Segment>
      </Container>
      </Layout>
    );
  }
}

export default CompetitionNew;
