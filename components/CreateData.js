import React, {Component} from 'react';
import { Form,Button,Input,Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import {Router} from '../routes'

class ContributeForm extends Component {
  state = {
    value: '',
    errorMsg: '',
    loading: false
  };
  
  onSubmit = async (event) => {
    this.setState({loading: true, errorMsg: ''});

    event.preventDefault();
    const campaign = Campaign(this.props.address);
    
    try{
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createData(this.state.value).send({
      from: accounts[0]
      });

      Router.replaceRoute(`/Contracts/${this.props.address}`);
    } catch (err) {
      this.setState({errorMsg: err.message});
    }

    this.setState({loading: false, value: ''});

  };
 
  render() {
    return(
    <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
      <Form.Field>
        <label>Upload your details here</label>
        <Input 
        value={this.state.value}
        onChange={event => this.setState({ value: event.target.value})}
        label='description' labelPosition='right'/>
      </Form.Field>
      <Message error header="Oops!" content={this.state.errorMsg} />
      <Button loading={this.state.loading} primary>Create Data!</Button>
      <br/><br/><br/>
    </Form>
    );
  }
}

export default ContributeForm;


