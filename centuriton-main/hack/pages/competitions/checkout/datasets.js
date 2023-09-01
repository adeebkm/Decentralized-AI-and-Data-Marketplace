import React, { Component } from "react";
import { Card, Grid, Button, Table,Image, Segment,Header,Reveal, Container,Icon,Divider,Tab ,Label,Input,Form,Statistic} from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Competition from "../../../ethereum/competition";
import RequestRow from "../../../components/RequestRow";
import { saveAs } from "file-saver";


class datmodels extends Component {
  
  // static async getInitialProps(props) {
  //   console.log("PAGE ", props.query.address);
  //   const competition = Competition(props.query.address);

  //   const summary = await competition.methods.getSummary().call();
  //   console.log(summary);

    // const submissionCount = await competition.methods.submissionCount().call();

    // const requests = await Promise.all(
    //   Array(parseInt(submissionCount))
    //     .fill()
    //     .map((element, index) => {
    //       return competition.methods.dataParticpants(index).call();
    //     })
    // );


  //   return {
  //     address: props.query.address,
  //     minimumPayment: summary[0],
  //     balance: summary[1],
  //     submissionCount: summary[2],
  //     organizer: summary[3],
  //     nameProblem: summary[4],
  //     description: summary[5],
  //     sampleData: summary[6],
  //     evalFunc: summary[7],
  //     submissionCount: submissionCount,
  //     requests: requests
  //   };
  // }
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
      <Layout>
        <Segment>
       <Grid columns={2} >
          <Grid.Row stretched>
              <Grid.Column style={{width:"70%"}}>
                <Segment>
                  <component><h1>Name of the Service : Business Data Set</h1></component>
                    <Grid>
                      <Grid.Column floated='left' width={13} style={{margin:"0",textAlign:"justify"}}>
                      <br/>
                        <component style={{margin:"0",padding:"0"}}><h4>Description of the Service: </h4>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                          Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</component>
                      </Grid.Column>
                      <Grid.Column floated='right' width={3} style={{margin:"0",padding:"5"}}>
                        <Card style={{width:"100%"}}>
                          <Card.Content>
                            <Card.Header>Author</Card.Header>
                            <Card.Meta>Team keanu</Card.Meta>
                            <Card.Description>
                              Steve wants to add you to the group <strong>best friends</strong>
                            </Card.Description>
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    </Grid>
                </Segment>
              </Grid.Column>
              <Grid.Column style={{width:"30%",padding:"3",margin:"0" ,alignItems:"center"}}>
              <Segment style={{margin:"0",padding:"0"}}>
                <Card style={{padding:"0",margin:"0"}}>
                <Label attached='top'>Data Sets</Label>
                <Card.Content header='Name: Steve Model' />
                <Card.Content description={description} />
                {/* <Card.Content header="Price" >Price<Button basic color="green" style={{maxWidth:"20",float:"right"}}>$45</Button></Card.Content> */}
               <div align='center'>
                  <Button as='div' labelPosition='left'>
                    <Label as='a' basic color='red' pointing='right'>
                      Price
                    </Label>
                    <Button color='red'>
                      <Icon name='money bill alternate' />
                      10
                    </Button>
                    
                  </Button>
    </div>
                  <Card.Content extra>
                    <Icon name='user' />Team keanu
                  </Card.Content>
                </Card>
          </Segment>

          <Segment style={{width:"68%",alignItems:"center",padding:"5",margin:"5",textAlign:"center"}}>
             <Statistic style={{padding:"0",alignItems:"center",margin:"0",textAlign:"center"}}>
    <Statistic.Value>5,550</Statistic.Value>
    <Statistic.Label>Downloads</Statistic.Label>
  </Statistic>
          </Segment>
        </Grid.Column>
        </Grid.Row>
        </Grid>
             {/* <Segment>
              <Header
                as='h2'
                content='Name of the Service'
                attach to="top"
              />
              <Container>Team Keanu</Container>
            </Segment>
            {/* <Image src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' /> */}
          {/* </Grid.Column>
          <Grid.Column width={12}> */}
            {/* <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /> */}
            <Segment>
              <Form>
                <Form.Field>
                  <Container style={{width:"35%",alignItems:"center",textAlign:"center"}}>
                  <label><h3>Demo Data Set</h3></label>
                     <Input label="data" type="file" labelPosition="right" />
                  </Container>
                  </Form.Field>
                  
                         <Table>
                          <Table.Header>
      <Table.Row>
        <Table.HeaderCell singleLine>Year</Table.HeaderCell>
        <Table.HeaderCell>Institutional_sector_name</Table.HeaderCell>
        <Table.HeaderCell>Institutional_sector_code</Table.HeaderCell>
        <Table.HeaderCell>Descriptor</Table.HeaderCell>
        <Table.HeaderCell>SNA08TRANS</Table.HeaderCell>
        <Table.HeaderCell>Values</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Header as='h2' textAlign='center'>
            2008.03 
          </Header>
        </Table.Cell>
        <Table.Cell singleLine>Corporate business enterprises</Table.Cell>
        <Table.Cell>
          141
        </Table.Cell>
        <Table.Cell >
            Capital Account Opening balances Produced non-financial
        </Table.Cell>
         <Table.Cell>
          898efef
        </Table.Cell>
        <Table.Cell>
          89879
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h2' textAlign='center'>
            2009.03 
          </Header>
        </Table.Cell>
        <Table.Cell singleLine>Corporate business enterprises</Table.Cell>
        <Table.Cell>
          146
        </Table.Cell>
        <Table.Cell >
            Capital Account Opening balances Produced non-financial
        </Table.Cell>
         <Table.Cell>
          89879545
        </Table.Cell>
        <Table.Cell>
          89149
        </Table.Cell>
      </Table.Row>
      
      <Table.Row>
        <Table.Cell>
          <Header as='h2' textAlign='center'>
            2008.03 
          </Header>
        </Table.Cell>
        <Table.Cell singleLine>Corporate business enterprises</Table.Cell>
        <Table.Cell>
          149
        </Table.Cell>
        <Table.Cell >
            Capital Account Opening balances Produced non-financial
        </Table.Cell>
         <Table.Cell>
          89879rggr
        </Table.Cell>
        <Table.Cell>
          85479
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
                      {/* </Reveal.Content>
                    </Reveal>
                   */}
              </Form>
            </Segment>
              
              
                    <Container align="center">
                      <a align="center">
                   <Button
                      color= 'purple'
                      icon='cart'
                      content= 'Buy Now'
                      iconPosition='center'
                    style={{align:"center",padding:"20px 40px 20px 40px",margin:"0"}}/>
                    </a>
                    </Container>
                
                
          {/* </Grid.Column>
        </Grid> */}
        </Segment>
      </Layout>
    );
  }
}

export default datmodels;
