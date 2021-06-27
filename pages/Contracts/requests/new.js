import React, {Component} from 'react';
import { Card,Button,Form,Input,Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import web3 from '../../../ethereum/web3'
import Campaign from '../../../ethereum/campaign'
import {Link, Router} from '../../../routes'
import Layout from '../../../components/Layout';



class RequestIndex extends Component {

  static async getInitialProps(props) {
    const { address } = props.query;
    
    return { 
      address: address
    };
  }

  state = {
    value1: '',
    value2: '',
    desc: '',
    errorMsg: '',
    loading: false
  };
  
  onSubmit = async (event) => {
    this.setState({loading: true, errorMsg: ''});

    event.preventDefault();
    const campaign = Campaign(this.props.address);
    
    try{
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.makeRequest(this.state.desc, this.state.value1, this.state.value2).send({
      from: accounts[0]
      });

      Router.pushRoute(`/Contracts/${this.props.address}/requests`);
    } catch (err) {
      this.setState({errorMsg: err.message});
    }

    this.setState({loading: false, value1: '', value2: '', desc: ''});

  };

  render() {
    return (   
      <Layout>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
          <br/>
        <h2>Enter you details below</h2>
        <Form.Field>
          <br/>
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

          <label>Enter the description</label>
          <Input 
          value={this.state.desc}
          onChange={event => this.setState({ desc: event.target.value})}
          label='description' labelPosition='right'/>

        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMsg} />
        <Button loading={this.state.loading} primary>Make Request!</Button>
        <br/><br/><br/>
      </Form>
    </Layout>
    );
  }
}

export default RequestIndex; 