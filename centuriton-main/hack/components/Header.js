import React from "react";
import { Menu,Header,Image,Segment, Grid, Container,Button } from "semantic-ui-react";
import { Link } from "../routes";

const pageHeader = () => {
  return (
    // const HeaderExampleImage = () => (style={{paddingTop:'10px',paddingLeft:'10px'}
  <Segment clearing style={{background:"#481a58"}}>
  <Menu style={{padding:"0",margin:"0"}}>
  <Menu.Item as='h1' textAlign='left' floated="left" style={{padding:"0",margin:"0"}}>
    <Image circular src='https://i.ibb.co/myWvvGp/Untitled-design-20-1.png' size="tiny" style={{background:"#481a58"}}/><Container text style={{padding:"20px"}}>DIAM</Container>  </Menu.Item>
  
        <Menu.Item position="right">
         <Link route="/competitions/new">
                         <a>
                        <Button color="purple">Create Service</Button>
                          {/* floated="right"
                          content="Create Project"
                          icon="add circle" */}
                          
                          {/* /> */}
                          </a>
                        </Link>
        </Menu.Item>

        {/* <Menu.Item>
          Reviews
        </Menu.Item>

        <Menu.Item>
          
        </Menu.Item> */}
      </Menu>
  </Segment>

 

/* // export default HeaderExampleImage */
    /* <Menu style={{ marginTop: "30px" }}>
    <Link route="/">
        <a className="item">Securing Data in AI</a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Projects</a>
        </Link>

        <Link route="/competitions/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu> */
  );
};

export default pageHeader;
