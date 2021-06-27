import React, {Component} from 'react';
import { Form,Button,Input,Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import {Router} from '../routes'

class ContributeForm extends Component {
  state = {
    value1: '',
    value2: '',
    errorMsg: '',
    loading: false
  };
  
  onSubmit = async (event) => {
    this.setState({loading: true, errorMsg: ''});

    event.preventDefault();
    const campaign = Campaign(this.props.address);
    
    try{
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.makeRequest(this.state.value1, this.state.value2).send({
      from: accounts[0]
      });

      Router.replaceRoute(`/Contracts/${this.props.address}`);
    } catch (err) {
      this.setState({errorMsg: err.message});
    }

    this.setState({loading: false, value1: '', value2: ''});

  };
 
  render() {
    return(
    <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
      <Form.Field>
        <br/><br/>
        <label>Enter your address here</label>
        <Input 
        value={this.state.value1}
        onChange={event => this.setState({ value1: event.target.value})}
        label='description' labelPosition='right'/>
        <br/>

        <label>Enter the index of data here</label>
        <Input 
        value={this.state.value2}
        onChange={event => this.setState({ value2: event.target.value})}
        label='description' labelPosition='right'/>

      </Form.Field>
      <Message error header="Oops!" content={this.state.errorMsg} />
      <Button loading={this.state.loading} primary>Make Request!</Button>
      <br/><br/><br/>
    </Form>
    );
  }
}

export default ContributeForm;


