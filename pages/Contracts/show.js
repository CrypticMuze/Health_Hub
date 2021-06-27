import React, {Component} from "react";
import { Card,Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import CreateData from '../../components/CreateData'
import {Link} from '../../routes'


class ContractShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary(0).call();
    
    return { 
      address: props.query.address,
      description: summary[0],
      manager: summary[1],
      requestsMadeCount: summary[2] 
    };
  }

  renderCards() {
    const {
      description,
      manager,
      requestsMadeCount
    } = this.props;

    const items = [{
      header: manager,
      meta: 'Address of manager',
      description: 'The manager created this data and is open to requests!',
      style: { overflowWrap: 'break-word' }
    },
  {
    header: description,
    meta: 'Description',
    description: 'Description of the request made'
  },
  {
    header: requestsMadeCount,
    meta: 'requests made count',
    description: 'Total requests made for this data'
  }
]

    return <Card.Group items={items} />;
  }

  render() {
    return (
    <Layout>
      <h2>Contracts show!</h2>
      <CreateData address={this.props.address} />
      {this.renderCards()}

      <Link route={`/Contracts/${this.props.address}/requests`}>
        <a>
          <br/>
          <Button>View Requests</Button>
        </a>
      </Link>
    </Layout>
    )
  }
}

export default ContractShow;

