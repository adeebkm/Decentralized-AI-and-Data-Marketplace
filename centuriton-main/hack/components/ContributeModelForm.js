import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";

class ContributeModelForm extends Component {
  render() {
    return (
      <Form>
        <Form.Field>
          <label>Submit Updated Model</label>
         
          <Input label="data" type="file" labelPosition="right" />
        </Form.Field>
        <Form.Field>
          <label>Accuracy</label>
         
          <Input label="data" type="text" labelPosition="right" />
        </Form.Field>
        <Button primary>Upload!</Button>
      </Form>
    );
  }
}

export default ContributeModelForm;
