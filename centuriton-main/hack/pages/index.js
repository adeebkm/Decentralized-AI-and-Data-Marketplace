import React, { Component } from "react";
import factory from "../ethereum/factory";
import {
Card,
Button,
Segment,
Divider,
Grid,
Image,
Container,
Header,
} from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CompetitionIndex extends Component {
static async getInitialProps() {
const competitions = await factory.methods.getDeployedCompetitions().call();
return { competitions };
}

renderCompetitions() {
const items = this.props.competitions.map((address) => {
return {
description: (
<div background="#481a58" display="inline">
<Card style={{ display:"inline"}}>
<Card.Content>
<Image
floated="right"
size="medium"
src="https://i.ibb.co/TMmVTz3/ai-writing.png"
/>
<Card.Header>Steve Sanders</Card.Header>
<br/>
<Card.Meta style={{ fontSize: "40px",color:"black" }} >{address}</Card.Meta>
<Card.Description>
Possible solutions to the problem of combining classifiers can be divided into three categories according to the levels of information available from the various classifiers. Four approaches based on different methodologies are proposed for solving this problem. One is suitable for combining individual classifiers such as Bayesian, k-nearest-neighbor, and various distance classifiers. The other three could be used for combining any kind of individual classifiers. On applying these methods to combine several classifiers for recognizing totally unconstrained handwritten numerals, the experimental results show that the performance of individual classifiers can be improved significantly. For example, on the US zipcode database, 98.9% recognition with 0.90% substitution and 0.2% rejection can be obtained, as well as high reliability with 95% recognition, 0% substitution, and 5% rejection.< ></>
{/* <strong>Data Marketplace</strong> */}
</Card.Description>
</Card.Content>
<Card.Content extra>
<div className="ui two buttons">
<Button basic color="green">
<br />
<Link route={`/competitions/${address}`}>
<a><h5>View Service</h5></a>
</Link>{" "}
</Button>
</div>
</Card.Content>
</Card>
</div>
),
fluid: true,
};
});
return <Card.Group items={items}/>;
}

render() {
return (
<Layout style={{ margin: "20px", padding: "25px" , width:"80"}}>
<Segment style={{ margin: "20", background: "black", padding: "50px" }}>
<Grid columns={2} style={{ padding: "0" }}>
<Grid.Column style={{ background: "#481a58" }} align="center">
<Image
src="https://i.ibb.co/zfxd19D/landing-Page2.jpg"
size="large"
align="center"
/>
</Grid.Column>
<Grid.Column style={{ background: "#481a58", color: "white" }}>
<Header
as="h1"
style={{
color: "white",
paddingLeft: "13px",
fontFamily: "Rockwell",
}}
>
Overview
</Header>
<Segment
style={{
background: "#481a58",
color: "white",
textAlign: "justify",
}}
>
Artificial Intelligence (AI) and blockchain are two disruptive
technologies proving to be a powerful combination, improving
virtually every industry. Research in Artificial Intelligence
has come a long way, with many corporations, organizations and
individuals greatly benefiting from Machine Learning services.
However, corporations, organizations and individuals with
problems AI can solve are hesitant to solicit services from
third-party agents by sharing their private data to obtain those
valuable predictions. Further, research on improving Machine
Learning models suggests utilizing larger datasets to obtain
better working models. However, handling the labelling of a
sufficient amount of data with limited in-house resources is a
time-consuming and costly operation. Consequently, businesses
prefer crowdsourcing options when labelling data to train
Machine Learning models. Also, protecting the business's data is
as imperative as protecting the customer's data. It is not in
favour of businesses to share their Machine Learning models with
those they offer services to, as these models may be
proprietary. This proposal focuses on creating a community of
machine learning practitioners who can contribute to AI
businesses by building models and datasets in a blockchain
environment in exchange for a reward. It also permits agents and
organizations with problems that could be solved with AI to
solicit solutions without sharing their data.
</Segment>
</Grid.Column>
</Grid>

</Segment>



<br />

<Container style={{ width: "100%", background: "#EFF5F5" }}>
<Grid>
<Grid.Column
floated="left"
width={5}
style={{
margin: "20px",
fontSize: "25px",
fontFamily: "Rockwell",
}}
>
Services

</Grid.Column>
<Grid.Column
floated="right"
width={5}
style={{ marginRight: "20px" }}
>
<Link route="/competitions/new">
<a>
<Button
floated="right"
content="Create Service"
icon="add circle"
color="purple"
/>
</a>
</Link>
</Grid.Column>
</Grid>
</Container>

<br />
<Segment style={{background:"#481a58"}}>
  

       {this.renderCompetitions()}

</Segment>

      

</Layout>
);
}
}


export default CompetitionIndex;

  const projectHeadings = document.querySelectorAll(".project-heading");

  projectHeadings.forEach((heading) => {
    heading.addEventListener("click", () => {
      const description = heading.nextElementSibling;
      description.classList.toggle("show-description");
    });
  });