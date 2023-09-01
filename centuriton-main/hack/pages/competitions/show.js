import React, { Component } from "react";
import { Card, Grid, Button, Table,Image, Segment,Header, Container,Icon,Divider,Tab ,Label,Input,Form} from "semantic-ui-react";
import Layout from "../../components/Layout";
import Competition from "../../ethereum/competition";
import web3 from "../../ethereum/web3";
import ContributeDataForm from "../../components/ContributeDataForm";
import ContributeModelForm from "../../components/ContributeModelForm";
import { Link } from "../../routes";
import { CodeBlock } from "react-code-blocks";
import RequestRow from "../../components/RequestRow";
import { saveAs } from "file-saver";



class CompetitionShow extends Component {
  
  static async getInitialProps(props) {
    console.log("PAGE ", props.query.address);
    const competition = Competition(props.query.address);

    const summary = await competition.methods.getSummary().call();
    console.log(summary);

    const submissionCount = await competition.methods.submissionCount().call();

    const requests = await Promise.all(
      Array(parseInt(submissionCount))
        .fill()
        .map((element, index) => {
          return competition.methods.dataParticpants(index).call();
        })
    );


    return {
      address: props.query.address,
      minimumPayment: summary[0],
      balance: summary[1],
      submissionCount: summary[2],
      organizer: summary[3],
      nameProblem: summary[4],
      description: summary[5],
      sampleData: summary[6],
      evalFunc: summary[7],
      submissionCount: submissionCount,
      requests: requests
    };
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

  renderCards() {
    const {
      balance,
      organizer,
      minimumPayment,
      submissionCount,
      nameProblem,
      description,
      sampleData,
      evalFunc,
    } = this.props;

    const items = [
      {
        header: organizer,
        meta: "Address of Organizer",
        description:
          " The Organizer provides encrypted ML as a service and creates a competition where participats can submit data samples and improved models.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumPayment,
        meta: "Fee to submit data samples (wei)",
        description:
          "Minimum payment participant must make to submit data. This amount will be refunded to the participant with incentives.",
      },
      {
        header: submissionCount,
        meta: "Number of Participants",
        description: "",
      },

     
    ];

    return <Card.Group items={items} />;
  }
  
  
   
  render() {
    
    const { nameProblem, description, sampleData, evalFunc } = this.props;
    const { Header, Row, HeaderCell, Body } = Table;
    

    console.log(sampleData, "eva;",evalFunc);
    const saveFile = () => {
      
      saveAs(
        evalFunc,
        "Inference"
      );
    };
    
    
    
    return (
      <Segment style={{background:"#481a58"}}>
      <Layout>
        <Segment>
        <Grid>
          <Grid.Column width={4}>
            <Image src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
          </Grid.Column>
          <Grid.Column width={12}>
            {/* <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /> */}
            <Segment>
              <Header
                as='h2'
                content='Name of the Service'
                attach to="top"
              />
              <Container>Team Keanu</Container>
            </Segment>
               <Card.Group>
                <Card>
                  <Card.Content>
                    <Card.Header>Overview</Card.Header>
                    <Card.Meta>Friends of Elliot</Card.Meta>
                    <Card.Description>
                      Steve wants to add you to the group <strong>best friends</strong>
                    </Card.Description>
                  </Card.Content>
                </Card>
                 <Card>
                  <Card.Content>
                    <Card.Header>Project Details</Card.Header>
                    <Card.Meta>Friends of Elliot</Card.Meta>
                    <Card.Description>
                      Steve wants to add you to the group <strong>best friends</strong>
                    </Card.Description>
                  </Card.Content>
                </Card>
                </Card.Group>
          </Grid.Column>
        </Grid>
        </Segment>
          
        <Segment raised>
        <h1 style={{color: "#D43790"}}>{nameProblem}</h1>
        <p>{description}</p>
        <br />
        <Grid>
          <Grid.Row>
            <Grid.Column width={20} style={{margin: 'auto'}}>{this.renderCards()}</Grid.Column>
          </Grid.Row>
        </Grid>
        </Segment>
        
        <Segment raised>

        <Container style={{width:"100%"}}>
          {/* <Segment>
          <Segment style={{alignItems:"center"}}>
          <Grid.Row>
            <Grid.Column width={20}>
              {" "}
              <h1 style={{color: "#D43790"}}>Examples of Data</h1>
              <br />
              <figure>
                <img src={sampleData} alt="images" width="800" />
              </figure>
            </Grid.Column>
          </Grid.Row>
          </Segment> */}
          <Segment raised style={{background:"#481a58"}}>
           <Divider horizontal>
      <Header as='h2'>
        <Icon name='bar chart'color='white' />
        <font color="white">contributions</font>
      </Header>
    </Divider>
            <br/>
    <Grid columns={2} divided>
    <Grid.Row>
      <Grid.Column >
        <Segment text style={{textAlign:"center",fontSize:"20px"}}>AI Models</Segment>
        <Card.Group itemsPerRow="2" centered>
              <Card>
                <Label attached='top'>AI Model</Label>
    <Card.Content header='Name:' />
    {/* <Card.Content header='Description:' /> */}
    <Card.Content description={description} />

    <Card.Content header="Price" >Price<Button basic color="green" style={{maxWidth:"20",float:"right"}}>$45</Button></Card.Content>
    
    <Link route="/competitions/checkout/amodels">
    <a align="center">
      <Button
      color= 'purple'
      icon='cart'
      content= 'Checkout'
      iconPosition='center'
     style={{align:"center"}}/>
    </a>
</Link>

    <Card.Content extra>
      <Icon name='user' />25 contributors
    </Card.Content>
  </Card>
         <Card>
           <Label attached='top'>AI Model</Label>
    <Card.Content header='Name:' />
    {/* <Card.Content header='Description:' /> */}
   <Card.Content description={description} />

    <Card.Content header="Price" >Price<Button basic color="green" style={{maxWidth:"20",float:"right"}}>$45</Button></Card.Content>
 
       <Link route="/competitions/new/amodels">
    <a align="center">
      <Button
      color= 'purple'
      icon='cart'
      content= 'Checkout'
      iconPosition='center'
     style={{align:"center"}}/>
    </a>
</Link>
    <Card.Content extra>
      <Icon name='user' />25 contributors
    </Card.Content>
  </Card>
    <Card>
       <Label attached='top'>AI Model</Label>
    <Card.Content header='Name:' />
    {/* <Card.Content header='Description:' /> */}
    <Card.Content description={description} />

    <Card.Content header="Price" >Price<Button basic color="green" style={{maxWidth:"20",float:"right"}}>$45</Button></Card.Content>
 
      <Link route="/competitions/new/amodels">
    <a align="center">
      <Button
      color= 'purple'
      icon='cart'
      content= 'Checkout'
      iconPosition='center'
     style={{align:"center"}}/>
    </a>
</Link>
    <Card.Content extra>
      <Icon name='user' />25 contributors
    </Card.Content>
  </Card>
  <Card>
     <Label attached='top'>AI Model</Label>
    <Card.Content header='Name:' />
    {/* <Card.Content header='Description:' /> */}
 <Card.Content description={description} />

    <Card.Content header="Price" >Price<Button basic color="green" style={{maxWidth:"20",float:"right"}}>$45</Button></Card.Content>
 
      <Link route="/competitions/new/amodels">
    <a align="center">
      <Button
      color= 'purple'
      icon='cart'
      content= 'Checkout'
      iconPosition='center'
     style={{align:"center"}}/>
    </a>
</Link>
    <Card.Content extra>
      <Icon name='user' />25 contributors
    </Card.Content>
  </Card>
  <Card>
     <Label attached='top'>AI Model</Label>
    <Card.Content header='Name:'/>
    {/* <Card.Content header='Description:' /> */}
 <Card.Content description={description} />

    <Card.Content header="Price" >Price<Button basic color="green" style={{maxWidth:"20",float:"right"}}>$45</Button></Card.Content>
 
    <Link route="/competitions/new/amodels">
    <a align="center">
      <Button
      color= 'purple'
      icon='cart'
      content= 'Checkout'
      iconPosition='center'
     style={{align:"center"}}/>
    </a>
</Link>
    <Card.Content extra>
      <Icon name='user' />25 contributors
    </Card.Content>
      </Card>
      </Card.Group>
      </Grid.Column>

      <Grid.Column>
          <Segment text style={{textAlign:"center",fontSize:"20px"}}>Data Sets</Segment>
         <Card.Group itemsPerRow="2" centered>
              <Card background="#e8e8e8">
                 <Label attached='top' style={{background:"white"}}>Data Set</Label>
    <Card.Content header='Name:' style={{background:"#e8e8e8"}} />
    {/* <Card.Content header='Description:' /> */}
     <Card.Content style={{background:"#e8e8e8"}} description={description} />

    <Card.Content header="Price" style={{background:"#e8e8e8"}} >Price<Button basic color="green" style={{maxWidth:"20",float:"right",background:"e8e8e8"}}>$45</Button></Card.Content>
 
     <Link route="/competitions/checkout/datasets">
    <a align="center" style={{background:"#e8e8e8",paddingBottom:"5px"}} >
      <Button
      color= 'purple'
      icon='cart'
      content= 'Checkout'
      iconPosition='center'
     style={{align:"center"}}/>
    </a>
</Link>
    <Card.Content extra>
      <Icon name='user' />25 contributors
    </Card.Content>
  </Card>
         <Card>
                 <Label attached='top'style={{background:"white"}}>Data Set</Label>
    <Card.Content header='Name:' style={{background:"#e8e8e8"}} /> 
    <Card.Content description={description}  style={{background:"#e8e8e8"}}/>
    <Card.Content header="Price" style={{background:"#e8e8e8"}} >Price<Button basic color="green" style={{maxWidth:"20",float:"right"}}>$45</Button></Card.Content >
 
      <Link route="/competitions/checkout/datasets">
    <a align="center" style={{background:"#e8e8e8",paddingBottom:"5px"}}>
      <Button
      color= 'purple'
      icon='cart'
      content= 'Checkout'
      iconPosition='center'
     style={{align:"center"}}/>
    </a>
</Link>
    <Card.Content extra>
      <Icon name='user' />25 contributors
    </Card.Content>
  </Card>
    <Card>
           <Label attached='top' style={{background:"white"}}>Data Set</Label>
    <Card.Content header='Name:' style={{background:"#e8e8e8"}}/> 
    <Card.Content description={description} style={{background:"#e8e8e8"}}/>

    <Card.Content header="Price" style={{background:"#e8e8e8"}} >Price<Button basic color="green" style={{maxWidth:"20",float:"right"}}>$45</Button></Card.Content>
  <Link route="/competitions/checkout/datasets">
    <a align="center" style={{background:"#e8e8e8",paddingBottom:"5px"}}>
      <Button
      color= 'purple'
      icon='cart'
      content= 'Checkout'
      iconPosition='center'
     style={{align:"center"}}/>
    </a>
</Link>
    <Card.Content extra>
      <Icon name='user' />25 contributors
    </Card.Content>
  </Card>
  <Card>
                 <Label attached='top'style={{background:"white"}}>Data Set</Label>
    <Card.Content header='Name:'style={{background:"#e8e8e8"}} />
    <Card.Content description={description} style={{background:"#e8e8e8"}}/>

    <Card.Content header="Price" style={{background:"#e8e8e8"}}>Price<Button basic color="green" style={{maxWidth:"20",float:"right"}}>$45</Button></Card.Content>
 
       <Link route="/competitions/checkout/datasets">
    <a align="center" style={{background:"#e8e8e8",paddingBottom:"5px"}}>
      <Button
      color= 'purple'
      icon='cart'
      content= 'Checkout'
      iconPosition='center'
     style={{align:"center"}}/>
    </a>
</Link>
    <Card.Content extra>
      <Icon name='user' />25 contributors
    </Card.Content>
  </Card>
  <Card>
                 <Label attached='top' style={{background:"white"}}>Data Set</Label>
    <Card.Content header='Name:' style={{background:"#e8e8e8"}}/>
 <Card.Content description={description} style={{background:"#e8e8e8"}} />

    <Card.Content header="Price" style={{background:"#e8e8e8"}}>Price<Button basic color="green" style={{maxWidth:"20",float:"right"}}>$45</Button></Card.Content>
  <Link route="/competitions/checkout/datasets">
    <a align="center" style={{background:"#e8e8e8",paddingBottom:"5px"}}>
      <Button
      color= 'purple'
      icon='cart'
      content= 'Checkout'
      iconPosition='center'
     style={{align:"center"}}/>
    </a>
</Link>
    <Card.Content extra>
      <Icon name='user' />25 contributors
    </Card.Content>
      </Card>
      </Card.Group>
      </Grid.Column>
    </Grid.Row>
    </Grid>
   
      </Segment>       
      </Container>
      </Segment>
        

    <Container style={{width:"100%"}}>
    <Segment style={{margin:"0"}}>
    <Grid columns={2} divided>
    <Grid.Row style={{magin:"0",padding:"0"}}>
      <Segment style={{width:"50%",margin:"0",background:"#481a58"}}>
      <Grid.Column >
       <Segment raised>
        <Form>
            <h1 style={{color: "#481a58"}}>Public</h1>
            <h3 style={{color: "black"}}>Data Model</h3>
            <Form.Field>
            <label>Name </label>
            <input placeholder='Name of the model' />
            </Form.Field><Form.Field>
            <label>Description</label>
            <input placeholder='Description' />
            </Form.Field>
             <ContributeDataForm address={this.props.address} />
        </Form>
        </Segment>
        <Segment raised>
        <Form>
            <h3 style={{color: "black"}}>DataSet</h3>
            <Form.Field>
            <label>Name </label>
            <input placeholder='Name of the DataSet' />
            </Form.Field><Form.Field>
            <label>Description</label>
            <input placeholder='Description' />
            </Form.Field>
             <ContributeModelForm />
            {/* <Grid.Row>
            <Segment>
            <Grid.Column width={6}>
              <ContributeDataForm address={this.props.address} />
            </Grid.Column>
            </Segment>
          </Grid.Row> */}
        </Form>
        </Segment>
        
      </Grid.Column>
      </Segment>

      <Segment style={{width:"50%",margin:"0",background:"#481a58"}}>
      <Grid.Column>
        <Segment raised>
        <Form>
              <h1 style={{color: "#481a58"}}>Private</h1>

              <ContributeModelForm />
        </Form>
        </Segment>
      </Grid.Column>
      </Segment>

    </Grid.Row>
    </Grid>
  </Segment>   
  </Container>
{/* 
          <h1 style={{color: "#D43790"}}>Data Submissions</h1>
        <Link route={`/competitions/${this.props.address}/requests/new`}>
          <a></a>
        </Link>
        */}
        {/* </Segment> */}
        {/* </Container> */}


          
        {/* <Table>
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
        </Table> */}
          <Grid.Row>
            <Grid.Column width={16}>
              <br />
              <h1 style={{color: "white"}}>Encrypted Inference</h1>
              <p><font color="pink">

              Encrypted inference can be served via smart contracts which contains the code of the inference function. It is utilised by the users in exchange for a payment to the AI Service Publisher. MPC represents the secure multi-party computation (SMPC) technique used for encrypted Machine Learning services.
              {" "}
              </font>
              </p>
              <Button color="blue"  primary onClick={saveFile} style={{padding:"30px" ,background:"white"}}>
                <font size="20px" color="#481a58">Download script to request private predictions</font>
              </Button>
              <br /> <br />
            
            </Grid.Column>
          </Grid.Row>
        <br/>   <br/>   <br/>

          <Grid.Row>
            <Grid.Column>
            <br/>   <br/>
              <Link route={`/competitions/${this.props.address}/requests`}>
                <a>
                </a>
              </Link>
              <br/>   <br/>   <br/><br/>   <br/>   <br/>
            </Grid.Column>
          </Grid.Row>
       
        {/* </Segment> */}
      </Layout>
    </Segment>
    );
  }
}

export default CompetitionShow;
